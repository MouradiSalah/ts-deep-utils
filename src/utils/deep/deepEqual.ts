import { canHaveProperties } from '../common';

/**
 * Performs deep equality comparison between two values.
 * Recursively compares objects, arrays, and primitive values.
 *
 * @param obj1 - The first value to compare
 * @param obj2 - The second value to compare
 * @returns True if the values are deeply equal, false otherwise
 *
 * @example
 * ```typescript
 * const obj1 = { a: 1, b: { c: [1, 2, 3] } };
 * const obj2 = { a: 1, b: { c: [1, 2, 3] } };
 * deepEqual(obj1, obj2); // Returns true
 * ```
 *
 * @example
 * ```typescript
 * const arr1 = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }];
 * const arr2 = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }];
 * deepEqual(arr1, arr2); // Returns true
 * ```
 *
 * @example
 * ```typescript
 * deepEqual(null, null); // Returns true
 * deepEqual(undefined, undefined); // Returns true
 * deepEqual(NaN, NaN); // Returns true (unlike === comparison)
 * deepEqual(new Date('2023-01-01'), new Date('2023-01-01')); // Returns true
 * ```
 */
export function deepEqual(obj1: unknown, obj2: unknown, visited = new WeakMap()): boolean {
  // Handle primitive types and strict equality
  if (obj1 === obj2) {
    return true;
  }

  // Handle NaN separately since NaN !== NaN
  if (Number.isNaN(obj1) && Number.isNaN(obj2)) {
    return true;
  }

  // Handle null and undefined
  if (obj1 === null || obj1 === undefined || obj2 === null || obj2 === undefined) {
    return obj1 === obj2;
  }

  // If types are different, they're not equal
  if (typeof obj1 !== typeof obj2) {
    return false;
  }

  // Handle primitive types (string, number, boolean, bigint, symbol)
  if (typeof obj1 !== 'object') {
    return obj1 === obj2;
  }

  // Handle circular references
  if (visited.has(obj1 as object)) {
    return visited.get(obj1 as object) === obj2;
  }

  // Add to visited map to track corresponding objects
  visited.set(obj1 as object, obj2 as object);

  try {
    // Handle Date objects
    if (obj1 instanceof Date && obj2 instanceof Date) {
      return obj1.getTime() === obj2.getTime();
    }

    // Handle RegExp objects
    if (obj1 instanceof RegExp && obj2 instanceof RegExp) {
      return obj1.toString() === obj2.toString();
    }

    // Handle arrays
    if (Array.isArray(obj1) && Array.isArray(obj2)) {
      if (obj1.length !== obj2.length) {
        return false;
      }

      for (let i = 0; i < obj1.length; i++) {
        if (!deepEqual(obj1[i], obj2[i], visited)) {
          return false;
        }
      }

      return true;
    }

    // If one is array and other is not, they're different
    if (Array.isArray(obj1) || Array.isArray(obj2)) {
      return false;
    }

    // Handle objects
    if (canHaveProperties(obj1) && canHaveProperties(obj2)) {
      const keys1 = Object.keys(obj1);
      const keys2 = Object.keys(obj2);

      if (keys1.length !== keys2.length) {
        return false;
      }

      for (const key of keys1) {
        if (!Object.prototype.hasOwnProperty.call(obj2, key)) {
          return false;
        }

        if (!deepEqual(obj1[key], obj2[key], visited)) {
          return false;
        }
      }

      return true;
    }

    // For any other object types (functions, etc.), use reference equality
    return obj1 === obj2;
  } finally {
    // Clean up visited map
    visited.delete(obj1 as object);
  }
}
