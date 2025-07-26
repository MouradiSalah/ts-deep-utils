/**
 * Sets a nested property in an object using a dot-separated path.
 * Creates intermediate objects if they don't exist.
 *
 * @template T - Type of the object to modify
 * @param obj - The object to modify
 * @param path - Dot-separated path to the property (e.g., 'a.b.c')
 * @param value - The value to set at the specified path
 * @returns The modified object (same reference as input)
 *
 * @example
 * ```typescript
 * const obj = { a: { b: {} } };
 * deepSet(obj, 'a.b.c', 42);
 * // obj is now { a: { b: { c: 42 } } }
 * ```
 */
export function deepSet<T>(obj: T, path: string, value: unknown): T {
  const keys = path.split('.');
  let current = obj as Record<string, unknown>;
  for (let i = 0; i < keys.length - 1; i++) {
    if (!current[keys[i]]) current[keys[i]] = {};
    current = current[keys[i]] as Record<string, unknown>;
  }
  current[keys[keys.length - 1]] = value;
  return obj;
}
