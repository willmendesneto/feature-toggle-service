let settings: any = {};

const isOn = (key: string): boolean => {
  return !!settings[key];
};

const set = (obj: any): void => {
  settings = obj;
};

export { isOn, set };
