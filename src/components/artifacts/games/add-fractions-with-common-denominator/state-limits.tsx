import { GameState } from "./game-state";

export default function checkGameStateLimits(state?: Partial<GameState>): boolean {
  const { screen, state1, state2 } = state || {};

  if (state1) {
    if (state1.fraction1.denominator !== state1.fraction2.denominator) return false;
    if (state1.fraction1.numerator >= state1.fraction1.denominator || state1.fraction2.numerator >= state1.fraction2.denominator) return false;
    if (state1.fraction1.numerator + state1.fraction2.numerator > state1.fraction1.denominator) return false;
  }

  if (state2) {
    if (state2.fraction1.denominator !== state2.fraction2.denominator) return false;
    if (state2.fraction1.numerator >= state2.fraction1.denominator || state2.fraction2.numerator >= state2.fraction2.denominator) return false;
    if (state2.fraction1.numerator + state2.fraction2.numerator > state2.fraction1.denominator) return false;
  }
  
  return true;
};