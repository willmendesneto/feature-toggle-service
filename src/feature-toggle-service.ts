let settings: { [k: string]: boolean } = {};

/**
 * Checks if Feature toggle/flag exists and it's on.
 *
 * @param key - Feature toggle/flag key to be checked
 *
 * @returns Boolean
 *
 */
const isOn = (key: string): boolean => {
  return !!settings[key];
};

/**
 * Set feature toggle/flag configuration
 *
 * @param obj - Configuration of your feature toggle/flag
 *
 * @returns void
 *
 */
const set = (obj: { [k: string]: boolean }): void => {
  settings = obj;
};

export { isOn, set };
