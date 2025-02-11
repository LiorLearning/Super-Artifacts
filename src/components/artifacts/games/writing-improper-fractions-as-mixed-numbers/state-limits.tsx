import { GameState, Fraction } from "./game-state";

export default function checkGameStateLimits(state?: Partial<GameState>): boolean {
  if (!state) return false;

  const isValidFraction = (fraction: Fraction) => {
    if (fraction.numerator <= 0 || fraction.denominator <= 0) return false;
    if (fraction.denominator > 12) return false;
    if (fraction.numerator <= fraction.denominator) return false;
    if (fraction.numerator > fraction.denominator * 3) return false;
    return true;
  };

  const isValidDenomOptions = (options: number[], correctDenom: number) => {
    if (options.length !== 3) return false;
    if (!options.includes(correctDenom)) return false;
    if (options.some(opt => opt <= 0 || opt > 12)) return false;
    if (new Set(options).size !== options.length) return false;
    return true;
  };

  if (state.state1) {
    const { fraction, denomOptions } = state.state1;
    if (!isValidFraction(fraction)) return false;
    if (!isValidDenomOptions(denomOptions, fraction.denominator)) return false;
  }

  if (state.state2) {
    const { fraction, denomOptions } = state.state2;
    if (!isValidFraction(fraction)) return false;
    if (!isValidDenomOptions(denomOptions, fraction.denominator)) return false;
  }

  if (state.state3) {
    const { fraction } = state.state3;
    if (!isValidFraction(fraction)) return false;
  }

  return true;
}