const UNSAFE_KEYS = new Set<string>(['__proto__', 'constructor', 'prototype']);

export function isObject(value: unknown): value is Record<PropertyKey, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function canHaveProperties(value: unknown): value is Record<PropertyKey, unknown> {
  return typeof value === 'object' && value !== null;
}

/**
 * Reports whether a split path contains a key that can reach the prototype chain.
 */
export function hasUnsafeKey(keys: string[]): boolean {
  return keys.some((key) => UNSAFE_KEYS.has(key));
}
