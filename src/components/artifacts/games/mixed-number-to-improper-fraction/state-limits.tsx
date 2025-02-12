import { GameState } from "./game-state";

interface ValidationResult {
  isValid: boolean;
  reason?: string;
}

interface MixedFraction {
  whole: number;
  numerator: number;
  denominator: number;
}

const isValidMixedFraction = (mixedFraction: MixedFraction, name: string = ""): ValidationResult => {
  if (mixedFraction.whole <= 0 || mixedFraction.whole > 5) {
    return { isValid: false, reason: `${name}Whole number (${mixedFraction.whole}) must be between 1 and 5` };
  }
  if (mixedFraction.numerator <= 0 || mixedFraction.numerator >= mixedFraction.denominator) {
    return { isValid: false, reason: `${name}Numerator (${mixedFraction.numerator}) must be positive and less than denominator (${mixedFraction.denominator})` };
  }
  if (mixedFraction.denominator <= 1 || mixedFraction.denominator > 12) {
    return { isValid: false, reason: `${name}Denominator (${mixedFraction.denominator}) must be between 2 and 12` };
  }

  const improperNumerator = mixedFraction.whole * mixedFraction.denominator + mixedFraction.numerator;
  if (improperNumerator > 24) {
    return { isValid: false, reason: `${name}Total value (${improperNumerator}/${mixedFraction.denominator}) cannot exceed 24` };
  }

  return { isValid: true };
};

export default function checkGameStateLimits(state?: Partial<GameState>): ValidationResult {
  if (!state) return { isValid: false, reason: "No game state provided" };

  if (state.state1) {
    const result = isValidMixedFraction(state.state1.mixedFraction);
    if (!result.isValid) return { isValid: false, reason: `Screen 1: ${result.reason}` };
  }

  if (state.state2) {
    const result = isValidMixedFraction(state.state2.mixedFraction);
    if (!result.isValid) return { isValid: false, reason: `Screen 2: ${result.reason}` };
  }

  if (state.state3) {
    const { mixedFraction1, mixedFraction2 } = state.state3;
    
    const result1 = isValidMixedFraction(mixedFraction1, "First fraction: ");
    if (!result1.isValid) return { isValid: false, reason: `Screen 3: ${result1.reason}` };
    
    const result2 = isValidMixedFraction(mixedFraction2, "Second fraction: ");
    if (!result2.isValid) return { isValid: false, reason: `Screen 3: ${result2.reason}` };

    const improperNumerator1 = mixedFraction1.whole * mixedFraction1.denominator + mixedFraction1.numerator;
    const improperNumerator2 = mixedFraction2.whole * mixedFraction2.denominator + mixedFraction2.numerator;
    if (Math.abs(improperNumerator1 - improperNumerator2) > 12) {
      return { 
        isValid: false, 
        reason: `Screen 3: Difference between fractions (${Math.abs(improperNumerator1 - improperNumerator2)}) cannot exceed 12` 
      };
    }
  }

  return { isValid: true };
}