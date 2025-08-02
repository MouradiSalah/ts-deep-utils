/**
 * Extracts all keys from a nested object.
 *
 * @template T - The type of the input object
 * @param obj - The object to extract keys from
 * @param options - Configuration options for key extraction
 * @param options.paths - If true, returns dot-notation paths (e.g., 'a.b.c'). If false, returns only unique key names
 * @returns An array containing keys or paths based on the configuration
 *
 * @example
 * ```typescript
 * const obj = { user: { profile: { name: 'John', age: 30 } } };
 *
 * // Get unique key names only (default)
 * deepKeys(obj);
 * // Result: ['user', 'profile', 'name', 'age']
 *
 * // Get dot-notation paths
 * deepKeys(obj, { paths: true });
 * // Result: ['user', 'user.profile', 'user.profile.name', 'user.profile.age']
 * ```
 *
 * @example
 * ```typescript
 * const obj = { a: { b: { c: 1 }, d: 2 }, e: 3 };
 *
 * // Unique keys
 * deepKeys(obj);
 * // Result: ['a', 'b', 'c', 'd', 'e']
 *
 * // Paths
 * deepKeys(obj, { paths: true });
 * // Result: ['a', 'a.b', 'a.b.c', 'a.d', 'e']
 * ```
 */
export function deepKeys<T extends Record<string, unknown>>(
  obj: T,
  options: { paths?: boolean } = {}
): string[] {
  const { paths = false } = options;
  const keys = new Set<string>();

  function collectKeys(o: Record<string, unknown>, prefix = ''): void {
    for (const key in o) {
      if (Object.prototype.hasOwnProperty.call(o, key)) {
        const currentPath = prefix ? `${prefix}.${key}` : key;

        if (paths) {
          keys.add(currentPath);
        } else {
          keys.add(key);
        }

        if (typeof o[key] === 'object' && o[key] !== null && !Array.isArray(o[key])) {
          collectKeys(o[key] as Record<string, unknown>, paths ? currentPath : '');
        }
      }
    }
  }

  collectKeys(obj);
  return Array.from(keys);
}
