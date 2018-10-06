/*global describe, before, it*/
import { set, isOn } from '../lib/feature-toggle-service';
import assert from 'assert';

describe('FeatureToggleService', () => {
  before(() => {
    set({
      enableFirstText: false,
      enableSecondText: true,
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
});
