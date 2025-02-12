import { GameState } from "./game-state";

interface ValidationResult {
  isValid: boolean;
  reason?: string;
}

export default function checkGameStateLimits(state?: Partial<GameState>): ValidationResult {
  if (!state) return { isValid: false, reason: "No game state provided" };

  if (state.screen && !['first', 'second', 'third'].includes(state.screen)) {
    return { isValid: false, reason: `Invalid state: Screen must be 'first', 'second', or 'third' (got '${state.screen}')` };
  }

  if (state.state1) {
    if (typeof state.state1.step !== 'number' || state.state1.step < 0 || state.state1.step > 2) {
      return { isValid: false, reason: `Screen 1: Step must be a number between 0 and 2 (got ${state.state1.step})` };
    }
    if (typeof state.state1.variable !== 'number') {
      return { isValid: false, reason: "Screen 1: Variable must be a number" };
    }
  }

  if (state.state2) {
    if (typeof state.state2.step !== 'number' || state.state2.step < 0) {
      return { isValid: false, reason: `Screen 2: Step must be a non-negative number (got ${state.state2.step})` };
    }
    if (typeof state.state2.variable !== 'number') {
      return { isValid: false, reason: "Screen 2: Variable must be a number" };
    }
  }

  if (state.state3) {
    if (typeof state.state3.step !== 'number' || state.state3.step < 0) {
      return { isValid: false, reason: `Screen 3: Step must be a non-negative number (got ${state.state3.step})` };
    }
    if (typeof state.state3.variable !== 'number') {
      return { isValid: false, reason: "Screen 3: Variable must be a number" };
    }
  }

  return { isValid: true };
}
