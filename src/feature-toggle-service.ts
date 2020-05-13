const version = '4.1.1';

export type FeatureToggleServiceConfig = {
  [k: string]: boolean;
};

const settings: { [v: string]: FeatureToggleServiceConfig } = { [version]: {} };

/**
 * Checks if Feature toggle/flag exists and it's on.
 *
 * @param key - Feature toggle/flag key to be checked
 * @param debug - Prints configuration, version and settings for debug purposes
 *
 * @returns Boolean
 *
 */
const isOn = (key: string | null | undefined, debug?: boolean): boolean => {
  if (!!debug) {
    // tslint:disable-next-line
    console.log(`
[DEBUG] Execution Time in milliseconds: ${Date.now()} version: "${version}" key: "${key}" settings: ${JSON.stringify(
      settings,
    )}
`);
  }
  return typeof key === 'string' && !!settings[version][key];
};

/**
 * Set feature toggle/flag configuration
 *
 * @param obj - Configuration of your feature toggle/flag
 *
 * @returns void
 *
 */
const set = (obj: FeatureToggleServiceConfig): void => {
  settings[version] = obj;
};

export { isOn, set };
