let settings = {};
class FeatureToggleService {
  isOn(key) {
    return !!settings[key];
  }

  isOff(key) {
    return !this.isOn(key);
  }

  setConfigurationObject(obj) {
    settings = obj;
  }
}

module.exports = FeatureToggleService;
