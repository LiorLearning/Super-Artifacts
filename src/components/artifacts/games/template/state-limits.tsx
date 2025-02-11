import { GameState } from "./game-state";
import { BaseStateValidator } from "./utils/state-validator";

class TemplateStateValidator extends BaseStateValidator<GameState> {
  constructor() {
    super(
      ['first', 'second', 'third'],
      {
        first: 2,
        second: 5,
        third: 3
      }
    );
  }

  validateState(state?: Partial<GameState>): boolean {
    if (!state) return false;

    // Screen validation
    if (state.screen && !this.validateScreen(state.screen)) {
      return false;
    }

    // State1 validation  
    if (state.state1) {
      if (!this.validateStep(state.state1.step, 'first')) return false;
      if (typeof state.state1.variable !== 'number') return false;
    }

    // State2 validation
    if (state.state2) {
      if (!this.validateStep(state.state2.step, 'second')) return false;
      if (typeof state.state2.variable !== 'number') return false;
    }

    // State3 validation
    if (state.state3) {
      if (!this.validateStep(state.state3.step, 'third')) return false;
      if (typeof state.state3.variable !== 'number') return false;
    }

    return true;
  }
}

const validator = new TemplateStateValidator();
export default function checkGameStateLimits(state?: Partial<GameState>): boolean {
  return validator.validateState(state);
}
