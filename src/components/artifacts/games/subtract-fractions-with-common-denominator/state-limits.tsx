import { GameState, Fraction } from "./game-state";

export default function checkGameStateLimits(state?: Partial<GameState>): boolean {
  if (!state) return false;

  const isValidFraction = (fraction: Fraction) => {
    if (fraction.numerator <= 0 || fraction.denominator <= 0) return false;
    if (fraction.denominator > 12) return false;
    if (fraction.numerator >= fraction.denominator) return false;
    return true;
  };

  const isValidSubtraction = (fraction1: Fraction, fraction2: Fraction) => {
    if (fraction1.denominator !== fraction2.denominator) return false;
    if (fraction1.numerator <= fraction2.numerator) return false;
    return true;
  };

  if (state.state1) {
    const { fraction1, fraction2 } = state.state1;
    if (!isValidFraction(fraction1) || !isValidFraction(fraction2)) return false;
    if (!isValidSubtraction(fraction1, fraction2)) return false;
  }

  if (state.state2) {
    const { fraction1, fraction2 } = state.state2;
    if (!isValidFraction(fraction1) || !isValidFraction(fraction2)) return false;
    if (!isValidSubtraction(fraction1, fraction2)) return false;
  }

  return true;
}