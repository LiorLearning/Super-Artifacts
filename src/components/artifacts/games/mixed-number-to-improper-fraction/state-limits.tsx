import { GameState } from "./game-state";

interface MixedFraction {
  whole: number;
  numerator: number;
  denominator: number;
}

export default function checkGameStateLimits(state?: Partial<GameState>): boolean {
  if (!state) return false;

  const isValidMixedFraction = (mixedFraction: MixedFraction) => {
    if (mixedFraction.whole <= 0 || mixedFraction.whole > 5) return false;
    if (mixedFraction.numerator <= 0 || mixedFraction.numerator >= mixedFraction.denominator) return false;
    if (mixedFraction.denominator <= 1 || mixedFraction.denominator > 12) return false;

    const improperNumerator = mixedFraction.whole * mixedFraction.denominator + mixedFraction.numerator;
    if (improperNumerator > 24) return false;

    return true;
  };

  if (state.state1) {
    const { mixedFraction } = state.state1;
    if (!isValidMixedFraction(mixedFraction)) return false;
  }

  if (state.state2) {
    const { mixedFraction } = state.state2;
    if (!isValidMixedFraction(mixedFraction)) return false;
  }

  if (state.state3) {
    const { mixedFraction1, mixedFraction2 } = state.state3;
    if (!isValidMixedFraction(mixedFraction1) || !isValidMixedFraction(mixedFraction2)) return false;

    const improperNumerator1 = mixedFraction1.whole * mixedFraction1.denominator + mixedFraction1.numerator;
    const improperNumerator2 = mixedFraction2.whole * mixedFraction2.denominator + mixedFraction2.numerator;
    if (Math.abs(improperNumerator1 - improperNumerator2) > 12) return false;
  }

  return true;
}