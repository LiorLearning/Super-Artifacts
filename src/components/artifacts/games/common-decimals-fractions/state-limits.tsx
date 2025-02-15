import { GameState } from "./game-state";

export default function checkGameStateLimits(state?: Partial<GameState>): boolean {
  if (!state) return false;

  // if (state.screen && !['first', 'second', 'third'].includes(state.screen)) {
  //   return false;
  // }

  // if (state.state1) {
  //   if (typeof state.state1.step !== 'number' || state.state1.step < 0 || state.state1.step > 2) {
  //     return false;
  //   }
  //   if (typeof state.state1.variable !== 'number') {
  //     return false;
  //   }
  // }

  // if (state.state2) {
  //   if (typeof state.state2.step !== 'number' || state.state2.step < 0) {
  //     return false;
  //   }
  //   if (typeof state.state2.variable !== 'number') {
  //     return false;
  //   }
  // }

  // if (state.state3) {
  //   if (typeof state.state3.step !== 'number' || state.state3.step < 0) {
  //     return false;
  //   }
  //   if (typeof state.state3.variable !== 'number') {
  //     return false;
  //   }
  // }

  return true;
};
