/**
 * Safely retrieves a nested property from an object using a dot-separated path.
 * Returns undefined if any part of the path doesn't exist.
 *
 * @template T - Type of the object (must extend Record<string, unknown>)
 * @param obj - The object to retrieve the value from
 * @param path - Dot-separated path to the property (e.g., 'a.b.c')
 * @returns The value at the specified path, or undefined if not found
 *
 * @example
 * ```typescript
 * const obj = { a: { b: { c: 42 } } };
 * const value = deepGet(obj, 'a.b.c'); // Returns 42
 * const missing = deepGet(obj, 'a.b.x'); // Returns undefined
 * ```
 */
export function deepGet<T>(obj: T, path: string): unknown {
  return path
    .split('.')
    .reduce<unknown>(
      (acc, key) =>
        acc !== null && typeof acc === 'object' && key in acc
          ? (acc as Record<string, unknown>)[key]
          : undefined,
      obj
    );
}
