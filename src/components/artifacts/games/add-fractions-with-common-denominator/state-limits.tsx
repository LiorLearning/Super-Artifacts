import { GameState } from "./game-state";

interface ValidationResult {
  isValid: boolean;
  reason?: string;
}

const validateScreenState = (screenState: any): ValidationResult => {
  if (!screenState) return { isValid: true };
  
  const { fraction1, fraction2 } = screenState;
  
  if (fraction1.denominator !== fraction2.denominator) {
    return { 
      isValid: false, 
      reason: `Invalid state: Denominators must be equal (first: ${fraction1.denominator}, second: ${fraction2.denominator})`
    };
  }

  if (fraction1.numerator >= fraction1.denominator || fraction2.numerator >= fraction2.denominator) {
    return { 
      isValid: false, 
      reason: `Invalid state: Numerators (${fraction1.numerator}, ${fraction2.numerator}) must be less than their denominators (${fraction1.denominator}, ${fraction2.denominator})`
    };
  }

  if (fraction1.numerator + fraction2.numerator > fraction1.denominator) {
    return { 
      isValid: false, 
      reason: `Invalid state: Sum of numerators (${fraction1.numerator + fraction2.numerator}) cannot exceed denominator (${fraction1.denominator})`
    };
  }
  
  return { isValid: true };
};

export default function checkGameStateLimits(state?: Partial<GameState>): ValidationResult {
  if (!state) return { isValid: false, reason: "No game state provided" };
  
  const screenStates = [state.state1, state.state2];
  for (let i = 0; i < screenStates.length; i++) {
    const result = validateScreenState(screenStates[i]);
    if (!result.isValid) {
      return {
        isValid: false,
        reason: `Validation failed for screen ${i + 1}: ${result.reason}`
      };
    }
  }
  return { isValid: true };
}