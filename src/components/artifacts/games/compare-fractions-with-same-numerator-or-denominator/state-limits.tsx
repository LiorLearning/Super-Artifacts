import { GameState } from "./game-state";

interface ValidationResult {
  isValid: boolean;
  reason?: string;
}

const isValidFraction = (fraction: any): ValidationResult => {
  const num = parseInt(fraction.num);
  const denom = parseInt(fraction.denom);
  
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

export default function checkGameStateLimits(state?: Partial<GameState>): ValidationResult {
  if (!state) return { isValid: false, reason: "No game state provided" };

  if (state.state1) {
    const { fraction1, fraction2 } = state.state1;
    
    const fraction1Result = isValidFraction(fraction1);
    if (!fraction1Result.isValid) return { isValid: false, reason: `Screen 1: ${fraction1Result.reason}` };

    const fraction2Result = isValidFraction(fraction2);
    if (!fraction2Result.isValid) return { isValid: false, reason: `Screen 1: ${fraction2Result.reason}` };

    const sameNumerator = fraction1.num === fraction2.num;
    const sameDenominator = fraction1.denom === fraction2.denom;
    
    if (!sameNumerator && !sameDenominator) {
      return { isValid: false, reason: "Screen 1: Fractions must have either same numerator or same denominator" };
    }
    if (sameNumerator && sameDenominator) {
      return { isValid: false, reason: "Screen 1: Fractions cannot be identical" };
    }
    if (fraction1.num * fraction2.denom === fraction2.num * fraction1.denom) {
      return { isValid: false, reason: "Screen 1: Fractions cannot be equivalent" };
    }
  }

  return { isValid: true };
}