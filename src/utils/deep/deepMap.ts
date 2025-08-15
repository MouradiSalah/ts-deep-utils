import { canHaveProperties } from '../common';

/**
 * Recursively maps over all values in a nested object structure.
 * Applies a transformation function to every value while preserving the object structure.
 *
 * @template T - Type of the input object
 * @param obj - The object to map over
 * @param callback - Function to apply to each value. Receives (value, key, path)
 * @param currentPath - Internal parameter for tracking the current path (used in recursion)
 * @returns A new object with the same structure but transformed values
 *
 * @example
 * ```typescript
 * const obj = { a: 1, b: { c: 2, d: 3 } };
 * const doubled = deepMap(obj, (value) => typeof value === 'number' ? value * 2 : value);
 * // Result: { a: 2, b: { c: 4, d: 6 } }
 * ```
 *
 * @example
 * ```typescript
 * const obj = { user: { name: 'john', age: 30 }, settings: { theme: 'dark' } };
 * const uppercase = deepMap(obj, (value) =>
 *   typeof value === 'string' ? value.toUpperCase() : value
 * );
 * // Result: { user: { name: 'JOHN', age: 30 }, settings: { theme: 'DARK' } }
 * ```
 */
export function deepMap<T>(
  obj: T,
  callback: (value: unknown, key: PropertyKey, path: string) => unknown,
  currentPath = ''
): T {
  // Handle null, undefined, and non-object types
  if (!canHaveProperties(obj)) {
    return callback(obj, '', currentPath) as T;
  }

  // Handle arrays
  if (Array.isArray(obj)) {
    return obj.map((item, index) => {
      const itemPath = currentPath ? `${currentPath}.${index}` : String(index);
      return deepMap(item, callback, itemPath);
    }) as T;
  }

  // Handle special object types (Date, RegExp, etc.) as primitives
  if (obj instanceof Date || obj instanceof RegExp || typeof obj === 'function') {
    return callback(obj, '', currentPath) as T;
  }

  // Handle objects
  const result = {} as Record<PropertyKey, unknown>;

  // Handle both string/number keys and symbol keys
  const keys = [...Object.keys(obj), ...Object.getOwnPropertySymbols(obj)];

  for (const key of keys) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key as keyof T];
      const valuePath = currentPath ? `${currentPath}.${String(key)}` : String(key);

      if (
        canHaveProperties(value) &&
        !(value instanceof Date) &&
        !(value instanceof RegExp) &&
        typeof value !== 'function'
      ) {
        // Recursively map nested objects
        result[key] = deepMap(value, callback, valuePath);
      } else {
        // Apply callback to primitive values and special objects
        result[key] = callback(value, key, valuePath);
      }
    }
  }

  return result as T;
}
