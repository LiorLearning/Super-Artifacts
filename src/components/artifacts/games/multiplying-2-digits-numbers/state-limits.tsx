import { GameState } from "./game-state";

interface ValidationResult {
  isValid: boolean;
  reason?: string;
}

export default function checkGameStateLimits(state?: Partial<GameState>): ValidationResult {
 

  if (!state) return { isValid: false, reason: 'No state provided' };


  return { isValid: true, reason: '' };
};
