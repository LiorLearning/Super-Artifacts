import { GameState, Fraction } from "./game-state";

export default function checkGameStateLimits(state?: Partial<GameState>): boolean {
  if (!state) return false;

  // Validate that a fraction is a proper, positive fraction with a reasonable denominator
  const isValidFraction = (fraction: Fraction) => {
    const num = parseInt(fraction.numerator);
    const denom = parseInt(fraction.denominator);
    
    if (num <= 0 || denom <= 0) return false;
    if (denom > 12) return false;
    if (num >= denom) return false;
    
    return true;
  };

  // Check if two fractions represent the same value
  const areEquivalentFractions = (f1: Fraction, f2: Fraction) => {
    const num1 = parseInt(f1.numerator);
    const denom1 = parseInt(f1.denominator);
    const num2 = parseInt(f2.numerator);
    const denom2 = parseInt(f2.denominator);
    
    return (num1 * denom2) === (num2 * denom1);
  };

  // Check state1
  if (state.state1) {
    if (!isValidFraction(state.state1.fraction1) || !isValidFraction(state.state1.fraction2)) {
      return false;
    }
  }

  // Check state2
  if (state.state2) {
    const { fraction1, fraction2, chocolateFractions1, chocolateFractions2, chocolatesWithSameDenominator } = state.state2;
    
    if (!isValidFraction(fraction1) || !isValidFraction(fraction2)) return false;
    
    if (!chocolateFractions1.every(f => isValidFraction(f) && areEquivalentFractions(f, fraction1))) return false;
    if (!chocolateFractions2.every(f => isValidFraction(f) && areEquivalentFractions(f, fraction2))) return false;
    
    if (chocolatesWithSameDenominator.length === 0) return false;
  }

  // Check state3
  if (state.state3) {
    const { fraction1, fraction2, gcd } = state.state3;
    
    if (!isValidFraction(fraction1) || !isValidFraction(fraction2)) return false;
    
    const denom1 = parseInt(fraction1.denominator);
    const denom2 = parseInt(fraction2.denominator);
    if (gcd <= 0 || gcd > Math.min(denom1, denom2)) return false;
  }

  // Check state4
  if (state.state4) {
    const { fraction1, fraction2, lcd, ecd } = state.state4;
    
    if (!isValidFraction(fraction1) || !isValidFraction(fraction2)) return false;
    
    const denom1 = parseInt(fraction1.denominator);
    const denom2 = parseInt(fraction2.denominator);
    
    if (lcd <= 0 || lcd > denom1 * denom2) return false;
    if (ecd !== denom1 * denom2) return false;
  }

  // Check state5 and state6
  if (state.state5) {
    const { fraction1, fraction2, lcd, ecd } = state.state5;
    
    if (!isValidFraction(fraction1) || !isValidFraction(fraction2)) return false;
    
    const denom1 = parseInt(fraction1.denominator);
    const denom2 = parseInt(fraction2.denominator);
    
    if (lcd <= 0 || lcd > denom1 * denom2) return false;
    if (ecd !== denom1 * denom2) return false;
  }

  if (state.state6) {
    const { fraction1, fraction2, lcd, ecd } = state.state6;
    
    if (!isValidFraction(fraction1) || !isValidFraction(fraction2)) return false;
    
    const denom1 = parseInt(fraction1.denominator);
    const denom2 = parseInt(fraction2.denominator);
    
    if (lcd <= 0 || lcd > denom1 * denom2) return false;
    if (ecd !== denom1 * denom2) return false;
  }
  
  return true;
}