import { GameState, Fraction } from "./game-state";

interface ValidationResult {
  isValid: boolean;
  reason?: string;
}

const isValidFraction = (fraction: Fraction): ValidationResult => {
  if (fraction.numerator <= 0 || fraction.denominator <= 0) {
    return { isValid: false, reason: `Invalid state: Numerator and denominator must be positive (got ${fraction.numerator}/${fraction.denominator})` };
  }
  if (fraction.denominator > 12) {
    return { isValid: false, reason: `Invalid state: Denominator (${fraction.denominator}) cannot exceed 12` };
  }
  if (fraction.numerator >= fraction.denominator) {
    return { isValid: false, reason: `Invalid state: Numerator (${fraction.numerator}) must be less than denominator (${fraction.denominator})` };
  }
  return { isValid: true };
};

const isValidSubtraction = (fraction1: Fraction, fraction2: Fraction): ValidationResult => {
  if (fraction1.denominator !== fraction2.denominator) {
    return { isValid: false, reason: `Invalid state: Denominators must be equal (got ${fraction1.denominator} and ${fraction2.denominator})` };
  }
  if (fraction1.numerator <= fraction2.numerator) {
    return { isValid: false, reason: `Invalid state: First numerator (${fraction1.numerator}) must be greater than second numerator (${fraction2.numerator})` };
  }
  return { isValid: true };
};

export default function checkGameStateLimits(state?: Partial<GameState>): ValidationResult {
  if (!state) return { isValid: false, reason: "No game state provided" };

  if (state.state1) {
    const { fraction1, fraction2 } = state.state1;
    
    const fraction1Result = isValidFraction(fraction1);
    if (!fraction1Result.isValid) return { isValid: false, reason: `Screen 1: ${fraction1Result.reason}` };
    
    const fraction2Result = isValidFraction(fraction2);
    if (!fraction2Result.isValid) return { isValid: false, reason: `Screen 1: ${fraction2Result.reason}` };
    
    const subtractionResult = isValidSubtraction(fraction1, fraction2);
    if (!subtractionResult.isValid) return { isValid: false, reason: `Screen 1: ${subtractionResult.reason}` };
  }

  if (state.state2) {
    const { fraction1, fraction2 } = state.state2;
    
    const fraction1Result = isValidFraction(fraction1);
    if (!fraction1Result.isValid) return { isValid: false, reason: `Screen 2: ${fraction1Result.reason}` };
    
    const fraction2Result = isValidFraction(fraction2);
    if (!fraction2Result.isValid) return { isValid: false, reason: `Screen 2: ${fraction2Result.reason}` };
    
    const subtractionResult = isValidSubtraction(fraction1, fraction2);
    if (!subtractionResult.isValid) return { isValid: false, reason: `Screen 2: ${subtractionResult.reason}` };
  }

  return { isValid: true };
}