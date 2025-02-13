import { GameState } from "./game-state";

interface ValidationResult {
  isValid: boolean;
  reason?: string;
}

const isValidFraction = (fraction: any): ValidationResult => {
  const num = parseInt(fraction.numerator);
  const denom = parseInt(fraction.denominator);
  
  if (num <= 0 || denom <= 0) {
    return { isValid: false, reason: `Invalid state: Numerator and denominator must be positive (got ${num}/${denom})` };
  }
  if (denom > 12) {
    return { isValid: false, reason: `Invalid state: Denominator (${denom}) cannot exceed 12` };
  }
  if (num >= denom) {
    return { isValid: false, reason: `Invalid state: Numerator (${num}) must be less than denominator (${denom})` };
  }
  return { isValid: true };
};

const validateScreenState = (screenState: any): ValidationResult => {
  if (!screenState) return { isValid: true };

  const { question } = screenState;
  const { fraction1, fraction2 } = question;

  const fraction1Result = isValidFraction(fraction1);
  if (!fraction1Result.isValid) return fraction1Result;

  const fraction2Result = isValidFraction(fraction2);
  if (!fraction2Result.isValid) return fraction2Result;

  if (fraction1.numerator * fraction2.denominator === fraction2.numerator * fraction1.denominator) {
    return { 
      isValid: false, 
      reason: `Invalid state: Fractions ${fraction1.numerator}/${fraction1.denominator} and ${fraction2.numerator}/${fraction2.denominator} are equal` 
    };
  }

  return { isValid: true };
};

export default function checkGameStateLimits(state?: Partial<GameState>): ValidationResult {
  if (!state) return { isValid: false, reason: "No game state provided" };
  
  const screenStates = [state.state1, state.state2, state.state3];
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