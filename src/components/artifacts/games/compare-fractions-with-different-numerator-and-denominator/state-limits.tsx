import { GameState } from "./game-state";

export default function checkGameStateLimits(state?: Partial<GameState>): boolean {
  if (!state) return false;

  const isValidFraction = (fraction: any) => {
    const num = parseInt(fraction.numerator);
    const denom = parseInt(fraction.denominator);
    return num > 0 && denom > 0 && denom <= 12 && num < denom;
  };

  if (state.state1) {
      const { question } = state.state1;
      const { fraction1, fraction2 } = question;
    if (!isValidFraction(fraction1) || !isValidFraction(fraction2)) return false;
    if (fraction1.numerator * fraction2.denominator === fraction2.numerator * fraction1.denominator) return false;
  }

  if (state.state2) {
    const { question } = state.state2;
    const { fraction1, fraction2 } = question;
    if (!isValidFraction(fraction1) || !isValidFraction(fraction2)) return false;
    if (fraction1.numerator * fraction2.denominator === fraction2.numerator * fraction1.denominator) return false;
  }

  if (state.state3) {
    const { question } = state.state3;
    const { fraction1, fraction2 } = question;
    if (!isValidFraction(fraction1) || !isValidFraction(fraction2)) return false;
    if (fraction1.numerator * fraction2.denominator === fraction2.numerator * fraction1.denominator) return false;
  }

  return true;
}