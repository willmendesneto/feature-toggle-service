const version = '4.0.1';

let settings: {
  [v: string]: { [k: string]: boolean }
} = { [version]: {} };

/**
 * Checks if Feature toggle/flag exists and it's on.
 *
 * @param key - Feature toggle/flag key to be checked
 * @param debug - Prints configuration, version and settings for debug purposes
 *
 * @returns Boolean
 *
 */
const isOn = (key: string, debug: boolean): boolean => {
  if (debug === true) {
    console.log(`
[DEBUG] Execution Time in milliseconds: ${Date.now()} version: "${version}" key: "${key}" settings: ${JSON.stringify(settings)}
`);
  }
  return !!settings[version][key];
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
  settings[version] = obj;
};

export { isOn, set };
