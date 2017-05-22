/*global describe, before, it*/
import FeatureToggleService from '../src/feature-toggle-service';
import assert from 'assert';

describe('FeatureToggleService', () => {
  let featureToggleServiceProvider;

  before(() => {
    featureToggleServiceProvider = new FeatureToggleService();
    featureToggleServiceProvider.setConfigurationObject({
      enableFirstText: false,
      enableSecondText: true
    });
  });

  it('should be defined defined', () => {
    assert.equal(featureToggleServiceProvider !== undefined, true);
  });

  it('should return false if value is undefined or null', () => {
    assert.equal(featureToggleServiceProvider.isOn(undefined), false);
    assert.equal(featureToggleServiceProvider.isOn(null), false);
  });

  it('should return false if value was not added', () => {
    assert.equal(featureToggleServiceProvider.isOn('nonAddedValue'), false);
  });

  it('should return false if given value is false', () => {
    assert.equal(featureToggleServiceProvider.isOn('enableFirstText'), false);
  });

  it('should return true if given value is true', () => {
    assert.equal(featureToggleServiceProvider.isOn('enableSecondText'), true);
  });


  it('should return true if value is undefined or null', () => {
    assert.equal(featureToggleServiceProvider.isOff(undefined), true);
    assert.equal(featureToggleServiceProvider.isOff(null), true);
  });

  it('should return true if value was not added', () => {
    assert.equal(featureToggleServiceProvider.isOff('nonAddedValue'), true);
  });

  it('should return true if given value is true', () => {
    assert.equal(featureToggleServiceProvider.isOff('enableFirstText'), true);
  });

  it('should return false if given value is false', () => {
    assert.equal(featureToggleServiceProvider.isOff('enableSecondText'), false);
  });
});
