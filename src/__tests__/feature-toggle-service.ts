import { set, isOn } from '../feature-toggle-service';

describe('FeatureToggleService', () => {
  beforeEach(() => {
    set({
      enableFirstText: false,
      enableSecondText: true,
    });
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
});
