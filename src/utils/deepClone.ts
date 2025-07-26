/**
 * Creates a deep copy of an object using JSON serialization.
 * Note: This method has limitations with functions, undefined, symbols, and circular references.
 *
 * @template T - Type of the object to clone
 * @param obj - The object to clone
 * @returns A deep copy of the input object
 *
 * @example
 * ```typescript
 * const original = { a: 1, b: { c: 2 } };
 * const cloned = deepClone(original);
 * // cloned is a separate object with the same structure
 * ```
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}
