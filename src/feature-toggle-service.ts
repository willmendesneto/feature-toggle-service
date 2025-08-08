const version = '7.0.0' as const;

export interface FeatureToggleServiceConfig {
  readonly [key: string]: boolean;
}

const settings = new Map<string, FeatureToggleServiceConfig>();
settings.set(version, Object.freeze({}));

const getCurrentSettings = (): FeatureToggleServiceConfig => {
  return settings.get(version) || Object.freeze({});
};

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

  if (typeof key !== 'string' || (typeof key === 'string' && key.trim() === '')) {
    return false;
  }

  const currentSettings = getCurrentSettings();
  return Boolean(currentSettings[key]);
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
  if (!obj || typeof obj !== 'object') {
    return;
  }

  const currentSettings = getCurrentSettings();

  const newSettings = Object.freeze({
    ...currentSettings,
    ...obj,
  });

  settings.set(version, newSettings);
};

export { isOn, set };
