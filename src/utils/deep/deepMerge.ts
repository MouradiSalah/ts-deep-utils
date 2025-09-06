/**
 * Recursively merges two objects, combining properties from both source and target.
 * When properties conflict, source properties take precedence.
 *
 * @template T - Type of the target object
 * @template U - Type of the source object
 * @param target - The target object to merge into
 * @param source - The source object to merge from
 * @returns A new object with merged properties of type T & U
 *
 * @example
 * ```typescript
 * const target = { a: 1, b: { x: 1 } };
 * const source = { b: { y: 2 }, c: 3 };
 * const result = deepMerge(target, source);
 * // Result: { a: 1, b: { x: 1, y: 2 }, c: 3 }
 * ```
 */
export function deepMerge<T, U>(target: T, source: U): T & U {
  if (typeof target !== 'object' || typeof source !== 'object' || !target || !source) {
    return source as T & U;
  }

  const result = { ...target } as Record<string, unknown>;

  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const targetValue = result[key];
      const sourceValue = source[key];

      if (
        typeof targetValue === 'object' &&
        typeof sourceValue === 'object' &&
        targetValue !== null &&
        sourceValue !== null &&
        !Array.isArray(targetValue) &&
        !Array.isArray(sourceValue)
      ) {
        result[key] = deepMerge(
          targetValue as Record<string, unknown>,
          sourceValue as Record<string, unknown>
        );
      } else {
        result[key] = sourceValue;
      }
    }
  }

  return result as T & U;
}
