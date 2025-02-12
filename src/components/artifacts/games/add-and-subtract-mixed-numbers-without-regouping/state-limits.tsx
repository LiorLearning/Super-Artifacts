import { GameState } from "./game-state";

interface ValidationResult {
  isValid: boolean;
  reason?: string;
}

const validateFractionLimits = (fraction1: any, fraction2: any): ValidationResult => {
  if (fraction1.whole > 5) {
    return { 
      isValid: false, 
      reason: `Invalid state: First fraction's whole number (${fraction1.whole}) exceeds maximum limit of 5` 
    };
  }
  
  if (fraction2.whole > 5) {
    return { 
      isValid: false, 
      reason: `Invalid state: Second fraction's whole number (${fraction2.whole}) exceeds maximum limit of 5` 
    };
  }
  
  if (fraction1.numerator >= fraction1.denominator) {
    return { 
      isValid: false, 
      reason: `Invalid state: First fraction's numerator (${fraction1.numerator}) must be less than denominator (${fraction1.denominator})` 
    };
  }

  if (fraction2.numerator >= fraction2.denominator) {
    return { 
      isValid: false, 
      reason: `Invalid state: Second fraction's numerator (${fraction2.numerator}) must be less than denominator (${fraction2.denominator})` 
    };
  }

  return { isValid: true };
};

const checkFractionSum = (f1: any, f2: any): ValidationResult => {
  if (f1.denominator !== f2.denominator) {
    return { 
      isValid: false, 
      reason: `Invalid state: Denominators must be equal (first: ${f1.denominator}, second: ${f2.denominator})` 
    };
  }
  
  const sum = f1.numerator + f2.numerator;
  if (sum > f1.denominator) {
    return { 
      isValid: false, 
      reason: `Invalid state: Sum of numerators (${sum}) cannot exceed denominator (${f1.denominator})` 
    };
  }
  
  return { isValid: true };
};

const validateScreenState = (screenState: any): ValidationResult => {
  if (!screenState) return { isValid: true };
  
  const { fraction1, fraction2 } = screenState;
  
  const fractionLimitsResult = validateFractionLimits(fraction1, fraction2);
  if (!fractionLimitsResult.isValid) return fractionLimitsResult;

  const fractionSumResult = checkFractionSum(fraction1, fraction2);
  if (!fractionSumResult.isValid) return fractionSumResult;

  return { isValid: true };
};

export default function checkGameStateLimits(state?: Partial<GameState>): ValidationResult {
  if (!state) return { isValid: false, reason: "No game state provided" };

  const screenStates = [state.state1, state.state2, state.state3, state.state4];
  
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