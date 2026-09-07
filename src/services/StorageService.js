/**
 * StorageService implements encapsulated, safe client-side persistent storage.
 * Demonstrates:
 * - Encapsulation: Keys are namespaced with private #prefix and validated against #allowedKeys.
 * - Defensive Resilience: Handles Safari private browsing mode and quota exceptions gracefully.
 */
export class StorageService {
  #prefix;
  #allowedKeys;

  constructor(prefix = 'nova_') {
    this.#prefix = String(prefix);
    this.#allowedKeys = Object.freeze(
      new Set([
        'theme',
        'sound_enabled',
        'workspace_config',
        'trial_info',
        'activity_dismissed',
      ])
    );
  }

  /**
   * Resolves namespaced key.
   * @param {string} key
   * @returns {string}
   */
  #resolveKey(key) {
    return `${this.#prefix}${key}`;
  }

  /**
   * Verifies if a key belongs to the whitelist.
   * @param {string} key
   * @returns {boolean}
   */
  #isKeyAllowed(key) {
    return this.#allowedKeys.has(key);
  }

  /**
   * Safe retrieval of item with fallback value.
   * @template T
   * @param {string} key
   * @param {T} [defaultValue=null]
   * @returns {T}
   */
  get(key, defaultValue = null) {
    if (typeof window === 'undefined' || !this.#isKeyAllowed(key)) {
      return defaultValue;
    }

    try {
      const raw = localStorage.getItem(this.#resolveKey(key));
      if (raw === null) return defaultValue;

      try {
        return JSON.parse(raw);
      } catch {
        // Return raw string if not JSON
        return /** @type {T} */ (raw);
      }
    } catch {
      return defaultValue;
    }
  }

  /**
   * Safe storage of values with serialization.
   * @param {string} key
   * @param {unknown} value
   * @returns {boolean} Success status
   */
  set(key, value) {
    if (typeof window === 'undefined' || !this.#isKeyAllowed(key)) {
      return false;
    }

    try {
      const serialized = typeof value === 'string' ? value : JSON.stringify(value);
      localStorage.setItem(this.#resolveKey(key), serialized);
      return true;
    } catch {
      // Handle storage quota exceeded or disabled storage
      return false;
    }
  }

  /**
   * Removes an item safely.
   * @param {string} key
   * @returns {boolean}
   */
  remove(key) {
    if (typeof window === 'undefined' || !this.#isKeyAllowed(key)) {
      return false;
    }

    try {
      localStorage.removeItem(this.#resolveKey(key));
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Checks if an item exists in storage.
   * @param {string} key
   * @returns {boolean}
   */
  has(key) {
    return this.get(key) !== null;
  }
}

// Export singleton storage service
export const storageService = new StorageService();
export default storageService;
