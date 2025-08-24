import { canHaveProperties } from '../common';

/**
 * Creates a new object by picking specific properties from a nested object using dot-notation paths.
 * Similar to Lodash's pick function but supports deep property paths.
 *
 * @template T - Type of the source object
 * @param obj - The source object to pick properties from
 * @param paths - Array of dot-notation property paths to pick (e.g., ['a', 'b.c', 'd.e.f'])
 * @returns A new object containing only the specified properties
 *
 * @example
 * ```typescript
 * const obj = { a: 1, b: { c: 2, d: 3 }, e: 4 };
 * const picked = deepPick(obj, ['a', 'b.c']);
 * // Result: { a: 1, b: { c: 2 } }
 * ```
 *
 * @example
 * ```typescript
 * const user = {
 *   id: 1,
 *   profile: { name: 'John', email: 'john@example.com' },
 *   settings: { theme: 'dark', notifications: true }
 * };
 * const result = deepPick(user, ['id', 'profile.name', 'settings.theme']);
 * // Result: { id: 1, profile: { name: 'John' }, settings: { theme: 'dark' } }
 * ```
 */
export function deepPick<T extends Record<PropertyKey, unknown>>(
  obj: T,
  paths: string[]
): Partial<T> {
  // Handle invalid inputs gracefully
  if (!canHaveProperties(obj) || !Array.isArray(paths)) {
    return {} as Partial<T>;
  }

  const result = {} as Record<PropertyKey, unknown>;

  for (const path of paths) {
    if (typeof path !== 'string' || path === '') {
      continue;
    }

    const keys = path.split('.');
    let currentSource: unknown = obj;

    // First, validate that the entire path exists
    let pathExists = true;
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];

      if (
        !canHaveProperties(currentSource) ||
        !Object.prototype.hasOwnProperty.call(currentSource, key)
      ) {
        pathExists = false;
        break;
      }

      currentSource = currentSource[key];
    }

    // Only proceed if the path exists
    if (!pathExists) {
      continue;
    }

    // Now build the result object for this valid path
    currentSource = obj;
    let currentTarget = result;

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const isLastKey = i === keys.length - 1;

      if (isLastKey) {
        // Set the final value
        currentTarget[key] = (currentSource as Record<PropertyKey, unknown>)[key];
      } else {
        // Create intermediate object if it doesn't exist
        if (!canHaveProperties(currentTarget[key])) {
          currentTarget[key] = {};
        }

        // Move to next level
        currentSource = (currentSource as Record<PropertyKey, unknown>)[key];
        currentTarget = currentTarget[key] as Record<PropertyKey, unknown>;
      }
    }
  }

  return result as Partial<T>;
}
