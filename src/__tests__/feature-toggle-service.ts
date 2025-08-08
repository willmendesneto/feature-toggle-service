import { set, isOn } from '../feature-toggle-service';

const settings = {
  enableFirstText: false,
  enableSecondText: true,
};

describe('FeatureToggleService', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log');
    set(settings);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return false if value is undefined or null', () => {
    expect(isOn(undefined)).toEqual(false);
    expect(isOn(null)).toEqual(false);
  });

  it('should return false if value was not added', () => {
    expect(isOn('nonAddedValue')).toEqual(false);
  });

  it('should return false if given value is false', () => {
    expect(isOn('enableFirstText')).toEqual(false);
  });

  it('should return true if given value is true', () => {
    expect(isOn('enableSecondText')).toEqual(true);
  });

  it('should combine feature flags for the same package version', () => {
    set({
      enableFirstText: true,
      enableSecondText: true,
    });

    expect(isOn('enableFirstText')).toEqual(true);
    expect(isOn('enableSecondText')).toEqual(true);
    expect(isOn('enableThirdText')).toEqual(false);

    set({
      enableThirdText: true,
    });

    expect(isOn('enableFirstText')).toEqual(true);
    expect(isOn('enableSecondText')).toEqual(true);
    expect(isOn('enableThirdText')).toEqual(true);
  });

  it('should add correct `settings` info on console.log when debug is true', () => {
    const key = 'enableSecondText';
    isOn(key, true);

    expect(console.log).toHaveBeenCalledTimes(1);

    const debugMessage = (console.log as any).mock.calls[0][0];
    expect(debugMessage).toContain(`[DEBUG] Execution Time in milliseconds:`);
    expect(debugMessage).toContain(
      `version: "7.0.1" key: "${key}" settings: ${JSON.stringify({ ...settings, enableThirdText: true })}`,
    );
  });
});
