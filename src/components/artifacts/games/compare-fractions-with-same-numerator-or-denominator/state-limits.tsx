import { GameState } from "./game-state";

export default function checkGameStateLimits(state?: Partial<GameState>): boolean {
  if (!state) return false;

  const isValidFraction = (fraction: any) => {
    const num = parseInt(fraction.num);
    const denom = parseInt(fraction.denom);
    return num > 0 && denom > 0 && denom <= 12 && num < denom;
  };

  if (state.state1) {
    const { fraction1, fraction2 } = state.state1;
    if (!isValidFraction(fraction1) || !isValidFraction(fraction2)) return false;

    const sameNumerator = fraction1.num === fraction2.num;
    const sameDenominator = fraction1.denom === fraction2.denom;
    
    if (!sameNumerator && !sameDenominator) return false;
    if (sameNumerator && sameDenominator) return false;
    if (fraction1.num * fraction2.denom === fraction2.num * fraction1.denom) return false;
  }

  return true;
}