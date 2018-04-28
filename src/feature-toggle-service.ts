let settings: any = {};

const isOn = (key: string): boolean => {
  return !!settings[key];
};

const setConfigurationObject = (obj: any): void => {
  settings = obj;
}

export {
  isOn,
  setConfigurationObject
};
