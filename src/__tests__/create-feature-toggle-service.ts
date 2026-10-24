import { createFeatureToggleService, isOn, set } from '../feature-toggle-service';

describe('createFeatureToggleService()', () => {
  it('should start with the initial configuration', () => {
    const service = createFeatureToggleService({ enabled: true, disabled: false });

    expect(service.isOn('enabled')).toBe(true);
    expect(service.isOn('disabled')).toBe(false);
    expect(service.isOn('missing')).toBe(false);
  });

  it('should start empty without initial configuration', () => {
    expect(createFeatureToggleService().getAll()).toEqual({});
  });

  it('should not keep a reference to the initial configuration object', () => {
    const initialConfig = { enabled: true };
    const service = createFeatureToggleService(initialConfig);

    (initialConfig as { enabled: boolean }).enabled = false;

    expect(service.isOn('enabled')).toBe(true);
  });

  it('should merge configurations on `set()`', () => {
    const service = createFeatureToggleService({ first: true });

    service.set({ second: true });

    expect(service.getAll()).toEqual({ first: true, second: true });
  });

  it('should ignore invalid configurations on `set()`', () => {
    const service = createFeatureToggleService({ first: true });

    service.set(null as never);
    service.set('invalid' as never);

    expect(service.getAll()).toEqual({ first: true });
  });

  it('should return false for inherited object keys', () => {
    const service = createFeatureToggleService({ enabled: true });

    expect(service.isOn('constructor')).toBe(false);
    expect(service.isOn('toString')).toBe(false);
    expect(service.isOn('hasOwnProperty')).toBe(false);
  });

  it('should return a frozen configuration that keeps its reference until it changes', () => {
    const service = createFeatureToggleService({ enabled: true });
    const snapshot = service.getAll();

    expect(Object.isFrozen(snapshot)).toBe(true);

    service.set({ enabled: true });
    expect(service.getAll()).toBe(snapshot);

    service.set({ enabled: false });
    expect(service.getAll()).not.toBe(snapshot);
  });

  describe('subscribe()', () => {
    it('should notify listeners when the configuration changes', () => {
      const service = createFeatureToggleService({ enabled: false });
      const listener = vi.fn();
      service.subscribe(listener);

      service.set({ enabled: true });
      service.set({ another: true });

      expect(listener).toHaveBeenCalledTimes(2);
    });

    it('should not notify listeners when nothing changes', () => {
      const service = createFeatureToggleService({ enabled: true });
      const listener = vi.fn();
      service.subscribe(listener);

      service.set({ enabled: true });
      service.set({});

      expect(listener).not.toHaveBeenCalled();
    });

    it('should stop notifying after unsubscribing', () => {
      const service = createFeatureToggleService();
      const listener = vi.fn();
      const unsubscribe = service.subscribe(listener);

      unsubscribe();
      service.set({ enabled: true });

      expect(listener).not.toHaveBeenCalled();
    });
  });

  // Scenarios validated with reactor-feature-toggle: they leaked with the global service
  describe('isolation scenarios', () => {
    it('should keep sibling instances isolated (e.g. sibling React providers)', () => {
      const first = createFeatureToggleService({ shared: true });
      const second = createFeatureToggleService({ shared: false });

      expect(first.isOn('shared')).toBe(true);
      expect(second.isOn('shared')).toBe(false);
    });

    it('should not leak toggles between server requests', () => {
      const requestA = createFeatureToggleService({ beta: true });
      const requestB = createFeatureToggleService({ other: true });

      expect(requestA.isOn('beta')).toBe(true);
      expect(requestB.isOn('beta')).toBe(false);
    });

    it('should let a child change the toggles and notify the subscribed parent', () => {
      const service = createFeatureToggleService({ childFeature: false });
      const parentListener = vi.fn(() => service.isOn('childFeature'));
      service.subscribe(parentListener);

      // A child component calling `set()`
      service.set({ childFeature: true });

      expect(parentListener).toHaveBeenCalledTimes(1);
      expect(parentListener).toHaveReturnedWith(true);
    });

    it('should not change the default service', () => {
      set({ isolationDefault: false });
      createFeatureToggleService({ isolationDefault: true });

      expect(isOn('isolationDefault')).toBe(false);
    });
  });
});
