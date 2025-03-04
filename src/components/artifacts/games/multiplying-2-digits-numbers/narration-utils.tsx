import { narrations as defaultNarrations } from './narrations';

/**
 * Gets the merged narrations by combining default narrations with any overrides from localStorage
 * @param gameKey The key of the current game
 * @returns The merged narrations object
 */
export function getMergedNarrations(gameKey: string) {
  const narrationStorageKey = `${gameKey}-narrations`;
  const savedNarrationsString = localStorage.getItem(narrationStorageKey);
  
  // If no overrides exist, return the default narrations
  if (!savedNarrationsString) {
    return defaultNarrations;
  }
  
  try {
    // Parse the saved narration overrides
    const savedNarrations = JSON.parse(savedNarrationsString);
    
    // Create a deep copy of the default narrations
    const mergedNarrations = { ...defaultNarrations };
    
    // Apply any overrides from localStorage
    Object.keys(savedNarrations).forEach(key => {
      if (mergedNarrations[key]) {
        // Merge the override with the default narration
        mergedNarrations[key] = { ...mergedNarrations[key], ...savedNarrations[key] };
      } else {
        // This is a new narration that doesn't exist in defaults
        mergedNarrations[key] = savedNarrations[key];
      }
    });
    
    return mergedNarrations;
  } catch (e) {
    console.error('Error parsing saved narrations:', e);
    return defaultNarrations;
  }
} 