/**
 * Deeply merges `update` into `base`, but only for keys that already exist in `base`.
 * - If `update` is a primitive or array, it replaces the base entirely.
 * - If `update` is an object, only merge existing keys from `base`.
 * - Keys in `update` that do not exist in `base` are ignored.
 */
function deepMergeExistingOnly<T>(base: T, update: Partial<T>): T {
  // If update is null, a primitive, or an array, replace the base entirely
  if (
    update === null ||
    typeof update !== 'object' ||
    Array.isArray(update)
  ) {
    // Cast `update` to T to overwrite
    return update as T;
  }

  // Both base and update are objects
  // Create a shallow copy of base
  const result = { ...base } as Record<string, unknown>;

  // Go through keys in the update object
  for (const key of Object.keys(update)) {
    // Only merge if base also has this key
    if (Object.prototype.hasOwnProperty.call(base, key)) {
      const baseVal = (base as Record<string, unknown>)[key];
      const updateVal = (update as Record<string, unknown>)[key];
      // Recursively merge
      result[key] = deepMergeExistingOnly(baseVal as T, updateVal as Partial<T>);
    }
    // If base doesn't have the key, do nothing (skip).
  }

  return result as T;
}

// Helper function to specifically handle a GameState merge
export function mergeGameState<T>(prevState: T, partialState: Partial<T>): T {
  return deepMergeExistingOnly(prevState, partialState);
}
