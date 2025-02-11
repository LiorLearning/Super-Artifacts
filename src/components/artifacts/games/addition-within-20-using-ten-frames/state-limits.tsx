import { GameState } from "./game-state";

export default function checkGameStateLimits(state?: Partial<GameState>): boolean {
  const { screen, state1, state2 } = state || {};

  if (state1) {
    if (state1.maxGreenMarbles < 0 || state1.maxGreenMarbles > 10) return false;
    if (state1.maxBlueMarbles < 0 || state1.maxBlueMarbles > 10) return false;
    if (state1.maxGreenMarbles + state1.maxBlueMarbles > 20) return false;
  }

  if (state2) {
    if (state2.maxGreenMarbles < 0 || state2.maxGreenMarbles > 10) return false;
    if (state2.maxBlueMarbles < 0 || state2.maxBlueMarbles > 10) return false;
    if (state2.maxGreenMarbles + state2.maxBlueMarbles > 20) return false;
  }

  return true;
};