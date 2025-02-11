import { GameState, Fraction } from "./game-state";

export default function checkGameStateLimits(state?: Partial<GameState>): boolean {
  if (!state) return false;

  const isValidFraction = (fraction: Fraction) => {
    if (fraction.numerator <= 0 || fraction.numerator > 12) return false;
    if (fraction.denominator <= 0 || fraction.denominator > 12) return false;
    
    if (fraction.numerator >= fraction.denominator) return false;
    
    return true;
  };

  const isValidWhole = (whole: number) => {
    return whole >= 1 && whole <= 5;
  };

  const isValidProduct = (whole: number, fraction: Fraction) => {
    return whole * fraction.numerator <= 24;
  };

  if (state.state1) {
    const { fraction, whole } = state.state1;
    if (!isValidFraction(fraction)) return false;
    if (!isValidWhole(whole)) return false;
    if (!isValidProduct(whole, fraction)) return false;
  }

  if (state.state2) {
    const { fraction, whole } = state.state2;
    if (!isValidFraction(fraction)) return false;
    if (!isValidWhole(whole)) return false;
    if (!isValidProduct(whole, fraction)) return false;
  }

  if (state.state3) {
    const { questions } = state.state3;
    
    if (!questions.length) return false;
    
    for (const question of questions) {
      if (!isValidFraction(question.fraction)) return false;
      if (!isValidWhole(question.whole)) return false;
      if (!isValidProduct(question.whole, question.fraction)) return false;
    }
  }

  return true;
}