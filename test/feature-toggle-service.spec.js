/*global describe, before, it*/
import { setConfigurationObject, isOff, isOn } from '../dist/feature-toggle-service';
import assert from 'assert';

describe('FeatureToggleService', () => {

  before(() => {
    setConfigurationObject({
      enableFirstText: false,
      enableSecondText: true
    });
  });

  it('should return false if value is undefined or null', () => {
    assert.equal(isOn(undefined), false);
    assert.equal(isOn(null), false);
  });

  it('should return false if value was not added', () => {
    assert.equal(isOn('nonAddedValue'), false);
  });

  it('should return false if given value is false', () => {
    assert.equal(isOn('enableFirstText'), false);
  });

  it('should return true if given value is true', () => {
    assert.equal(isOn('enableSecondText'), true);
  });


  it('should return true if value is undefined or null', () => {
    assert.equal(isOff(undefined), true);
    assert.equal(isOff(null), true);
  });

  it('should return true if value was not added', () => {
    assert.equal(isOff('nonAddedValue'), true);
  });

  it('should return true if given value is true', () => {
    assert.equal(isOff('enableFirstText'), true);
  });

  it('should return false if given value is false', () => {
    assert.equal(isOff('enableSecondText'), false);
  });
});
