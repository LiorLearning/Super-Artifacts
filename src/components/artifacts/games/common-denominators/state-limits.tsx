import { GameState, Fraction } from "./game-state";

interface ValidationResult {
  isValid: boolean;
  reason?: string;
}

const isValidFraction = (fraction: Fraction): ValidationResult => {
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

const areEquivalentFractions = (f1: Fraction, f2: Fraction): ValidationResult => {
  const num1 = parseInt(f1.numerator);
  const denom1 = parseInt(f1.denominator);
  const num2 = parseInt(f2.numerator);
  const denom2 = parseInt(f2.denominator);
  
  if ((num1 * denom2) !== (num2 * denom1)) {
    return { isValid: false, reason: `Invalid state: Fractions ${num1}/${denom1} and ${num2}/${denom2} are not equivalent` };
  }
  return { isValid: true };
};

export default function checkGameStateLimits(state?: Partial<GameState>): ValidationResult {
  if (!state) return { isValid: false, reason: "No game state provided" };

  if (state.state1) {
    const fractionResult1 = isValidFraction(state.state1.fraction1);
    if (!fractionResult1.isValid) return { isValid: false, reason: `Screen 1: ${fractionResult1.reason}` };
    
    const fractionResult2 = isValidFraction(state.state1.fraction2);
    if (!fractionResult2.isValid) return { isValid: false, reason: `Screen 1: ${fractionResult2.reason}` };
  }

  if (state.state2) {
    const { fraction1, fraction2, chocolateFractions1, chocolateFractions2, chocolatesWithSameDenominator } = state.state2;
    
    const fractionResult1 = isValidFraction(fraction1);
    if (!fractionResult1.isValid) return { isValid: false, reason: `Screen 2: ${fractionResult1.reason}` };
    
    const fractionResult2 = isValidFraction(fraction2);
    if (!fractionResult2.isValid) return { isValid: false, reason: `Screen 2: ${fractionResult2.reason}` };
    
    for (const f of chocolateFractions1) {
      const validResult = isValidFraction(f);
      if (!validResult.isValid) return { isValid: false, reason: `Screen 2: ${validResult.reason}` };
      
      const equivResult = areEquivalentFractions(f, fraction1);
      if (!equivResult.isValid) return { isValid: false, reason: `Screen 2: ${equivResult.reason}` };
    }
    
    for (const f of chocolateFractions2) {
      const validResult = isValidFraction(f);
      if (!validResult.isValid) return { isValid: false, reason: `Screen 2: ${validResult.reason}` };
      
      const equivResult = areEquivalentFractions(f, fraction2);
      if (!equivResult.isValid) return { isValid: false, reason: `Screen 2: ${equivResult.reason}` };
    }
    
    if (chocolatesWithSameDenominator.length === 0) {
      return { isValid: false, reason: "Screen 2: No common denominator options provided" };
    }
  }

  if (state.state3) {
    const { fraction1, fraction2, gcd } = state.state3;
    
    const fractionResult1 = isValidFraction(fraction1);
    if (!fractionResult1.isValid) return { isValid: false, reason: `Screen 3: ${fractionResult1.reason}` };
    
    const fractionResult2 = isValidFraction(fraction2);
    if (!fractionResult2.isValid) return { isValid: false, reason: `Screen 3: ${fractionResult2.reason}` };
    
    const denom1 = parseInt(fraction1.denominator);
    const denom2 = parseInt(fraction2.denominator);
    if (gcd <= 0 || gcd > (denom1*denom2)) {
      return { isValid: false, reason: `Screen 3: Invalid LCM value (${gcd}) for denominators ${denom1} and ${denom2}` };
    }
  }

  if (state.state4) {
    const { fraction1, fraction2, lcd, ecd } = state.state4;
    
    const fractionResult1 = isValidFraction(fraction1);
    if (!fractionResult1.isValid) return { isValid: false, reason: `Screen 4: ${fractionResult1.reason}` };
    
    const fractionResult2 = isValidFraction(fraction2);
    if (!fractionResult2.isValid) return { isValid: false, reason: `Screen 4: ${fractionResult2.reason}` };
    
    const denom1 = parseInt(fraction1.denominator);
    const denom2 = parseInt(fraction2.denominator);
    
    if (lcd <= 0 || lcd > denom1 * denom2) {
      return { isValid: false, reason: `Screen 4: Invalid LCD value (${lcd}) for denominators ${denom1} and ${denom2}` };
    }
    if (ecd !== denom1 * denom2) {
      return { isValid: false, reason: `Screen 4: Invalid ECD value (${ecd}), expected ${denom1 * denom2}` };
    }
  }

  if (state.state5) {
    const { fraction1, fraction2, lcd, ecd } = state.state5;
    
    const fractionResult1 = isValidFraction(fraction1);
    if (!fractionResult1.isValid) return { isValid: false, reason: `Screen 5: ${fractionResult1.reason}` };
    
    const fractionResult2 = isValidFraction(fraction2);
    if (!fractionResult2.isValid) return { isValid: false, reason: `Screen 5: ${fractionResult2.reason}` };
    
    const denom1 = parseInt(fraction1.denominator);
    const denom2 = parseInt(fraction2.denominator);
    
    if (lcd <= 0 || lcd > denom1 * denom2) {
      return { isValid: false, reason: `Screen 5: Invalid LCD value (${lcd}) for denominators ${denom1} and ${denom2}` };
    }
    if (ecd !== denom1 * denom2) {
      return { isValid: false, reason: `Screen 5: Invalid ECD value (${ecd}), expected ${denom1 * denom2}` };
    }
  }

  if (state.state6) {
    const { fraction1, fraction2, lcd, ecd } = state.state6;
    
    const fractionResult1 = isValidFraction(fraction1);
    if (!fractionResult1.isValid) return { isValid: false, reason: `Screen 6: ${fractionResult1.reason}` };
    
    const fractionResult2 = isValidFraction(fraction2);
    if (!fractionResult2.isValid) return { isValid: false, reason: `Screen 6: ${fractionResult2.reason}` };
    
    const denom1 = parseInt(fraction1.denominator);
    const denom2 = parseInt(fraction2.denominator);
    
    if (lcd <= 0 || lcd > denom1 * denom2) {
      return { isValid: false, reason: `Screen 6: Invalid LCD value (${lcd}) for denominators ${denom1} and ${denom2}` };
    }
    if (ecd !== denom1 * denom2) {
      return { isValid: false, reason: `Screen 6: Invalid ECD value (${ecd}), expected ${denom1 * denom2}` };
    }
  }
  
  return { isValid: true };
}