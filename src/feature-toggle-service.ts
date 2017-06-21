let settings: any = {};

const isOn = (key: string): boolean => {
  return !!settings[key];
};

const isOff = (key: string): boolean => {
  return !isOn(key);
};

const setConfigurationObject = (obj: any): void => {
  settings = obj;
}

export {
  isOn,
  isOff,
  setConfigurationObject
};
