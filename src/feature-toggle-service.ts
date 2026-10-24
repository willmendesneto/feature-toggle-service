const version = '8.0.0' as const;

export interface FeatureToggleServiceConfig {
  readonly [key: string]: boolean;
}

export interface FeatureToggleService {
  /**
   * Checks if Feature toggle/flag exists and it's on.
   *
   * @param key - Feature toggle/flag key to be checked
   * @param debug - Prints configuration, version and settings for debug purposes
   *
   * @returns Boolean
   *
   */
  isOn: (key: string | null | undefined, debug?: boolean) => boolean;
  /**
   * Set feature toggle/flag configuration. It's merged with the current configuration.
   *
   * @param obj - Configuration of your feature toggle/flag
   *
   * @returns void
   *
   */
  set: (obj: FeatureToggleServiceConfig) => void;
  /**
   * Returns the current configuration. The returned object is frozen and keeps the
   * same reference until the configuration changes.
   */
  getAll: () => FeatureToggleServiceConfig;
  /**
   * Calls `listener` every time the configuration changes.
   *
   * @returns a function to remove the listener
   */
  subscribe: (listener: () => void) => () => void;
}

const hasOwn = (obj: object, key: string): boolean => Object.prototype.hasOwnProperty.call(obj, key);

const isConfig = (obj: unknown): obj is FeatureToggleServiceConfig => !!obj && typeof obj === 'object';

/**
 * Creates an isolated feature toggle/flag service, e.g. one per app, per React tree
 * or per server request.
 *
 * @param initialConfig - Initial configuration of your feature toggle/flag
 *
 * @returns FeatureToggleService
 *
 */
export const createFeatureToggleService = (initialConfig?: FeatureToggleServiceConfig): FeatureToggleService => {
  let settings: FeatureToggleServiceConfig = Object.freeze(isConfig(initialConfig) ? { ...initialConfig } : {});
  const listeners = new Set<() => void>();

  const isOn = (key: string | null | undefined, debug?: boolean): boolean => {
    if (debug) {
      console.log(`
[DEBUG] Execution Time in milliseconds: ${Date.now()} version: "${version}" key: "${key}" settings: ${JSON.stringify(
        settings,
      )}
`);
    }

    if (typeof key !== 'string' || key.trim() === '') {
      return false;
    }

    return hasOwn(settings, key) && Boolean(settings[key]);
  };

  const set = (obj: FeatureToggleServiceConfig): void => {
    if (!isConfig(obj)) {
      return;
    }

    // Skipping no-op updates keeps `getAll()` stable and avoids notifying listeners
    const hasChanges = Object.keys(obj).some(key => !hasOwn(settings, key) || settings[key] !== obj[key]);
    if (!hasChanges) {
      return;
    }

    settings = Object.freeze({
      ...settings,
      ...obj,
    });
    listeners.forEach(listener => listener());
  };

  const getAll = (): FeatureToggleServiceConfig => settings;

  const subscribe = (listener: () => void): (() => void) => {
    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    };
  };

  return { isOn, set, getAll, subscribe };
};

const defaultService = createFeatureToggleService();

/**
 * Checks if Feature toggle/flag exists and it's on, using the default service.
 *
 * @param key - Feature toggle/flag key to be checked
 * @param debug - Prints configuration, version and settings for debug purposes
 *
 * @returns Boolean
 *
 */
const isOn = defaultService.isOn;

/**
 * Set feature toggle/flag configuration of the default service.
 *
 * @param obj - Configuration of your feature toggle/flag
 *
 * @returns void
 *
 */
const set = defaultService.set;

export { isOn, set };
