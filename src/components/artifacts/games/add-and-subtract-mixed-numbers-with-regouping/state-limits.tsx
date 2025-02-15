import { GameState } from "./game-state";

export default function checkGameStateLimits(state?: Partial<GameState>): {isValid: boolean, reason?: string} {
  return {isValid: true}
};