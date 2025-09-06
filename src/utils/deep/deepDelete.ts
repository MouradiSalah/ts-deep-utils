/**
 * Deletes a property from an object at a specified path.
 * @param obj The object to delete the property from.
 * @param path The path to the property to delete.
 * @returns The modified object.
 */
export function deepDelete<T>(obj: T, path: string): T {
  const keys = path.split('.');
  let current = obj as Record<string, unknown>;
  for (let i = 0; i < keys.length - 1; i++) {
    if (!current[keys[i]]) return obj;
    current = current[keys[i]] as Record<string, unknown>;
  }
  const lastKey = keys[keys.length - 1];
  if (lastKey in current) {
    delete current[lastKey];
  }
  return obj;
}
