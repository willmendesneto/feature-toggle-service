let settings = {};
let instance = null;

class FeatureToggleService {
  constructor() {
    if(!instance){
      instance = this;
    }
    return instance;
  }

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
