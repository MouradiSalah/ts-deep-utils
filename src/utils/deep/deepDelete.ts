import { hasUnsafeKey } from '../common';

/**
 * Deletes a property from an object at a specified path.
 *
 * Paths containing `__proto__`, `constructor` or `prototype` are rejected and the
 * object is returned unmodified, to prevent tampering with the prototype chain.
 *
 * @param obj The object to delete the property from.
 * @param path The path to the property to delete.
 * @returns The modified object.
 */
export function deepDelete<T extends Record<string, unknown>>(obj: T, path: string): T {
  const keys = path.split('.');
  if (hasUnsafeKey(keys)) return obj;

  let current = obj as Record<string, unknown>;
  for (let i = 0; i < keys.length - 1; i++) {
    if (!Object.prototype.hasOwnProperty.call(current, keys[i]) || !current[keys[i]]) return obj;
    current = current[keys[i]] as Record<string, unknown>;
  }
  const lastKey = keys[keys.length - 1];
  if (Object.prototype.hasOwnProperty.call(current, lastKey)) {
    delete current[lastKey];
  }
  return obj;
}
