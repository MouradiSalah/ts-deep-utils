import { isObject, canHaveProperties } from '../common';

/**
 * Checks if a nested property exists in an object using a dot-separated path.
 * Returns true if the property exists, false otherwise.
 *
 * @template T - Type of the object
 * @param obj - The object to check
 * @param path - Dot-separated path to the property (e.g., 'a.b.c')
 * @returns True if the property exists, false otherwise
 *
 * @example
 * ```typescript
 * const obj = { a: { b: { c: 42 } } };
 * const exists = deepHas(obj, 'a.b.c'); // Returns true
 * const notExists = deepHas(obj, 'a.b.x'); // Returns false
 * ```
 *
 * @example
 * ```typescript
 * const obj = { user: { profile: null, settings: { theme: 'dark' } } };
 * deepHas(obj, 'user.profile'); // Returns true (null is a valid value)
 * deepHas(obj, 'user.settings.theme'); // Returns true
 * deepHas(obj, 'user.settings.language'); // Returns false
 * ```
 */
export function deepHas<T>(obj: T, path: string): boolean {
  if (!isObject(obj)) {
    return false;
  }

  if (typeof path !== 'string' || path === '') {
    return false;
  }

  const keys = path.split('.');
  let current: unknown = obj;

  for (const key of keys) {
    if (canHaveProperties(current) && Object.prototype.hasOwnProperty.call(current, key)) {
      current = current[key];
    } else {
      return false;
    }
  }

  return true;
}
