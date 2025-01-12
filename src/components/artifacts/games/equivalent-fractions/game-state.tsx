

export const desc = ``;

export type GameScreen = 1 | 2 | 3 | 4;

export interface Screen1 {
  step: number
  question:{
    numerator1: number
    denominator1: number
    denominator2: number
  }
}

export interface Screen2 {
  step: number
}

export interface GameState {
  screen: 1 | 2
  state1: Screen1
  state2: Screen2
}

export const initialGameState: GameState = {
  screen: 1,

  state1: {
    step: 1,
    question: {
      numerator1: 2,
      denominator1: 3,
      denominator2: 9
    }
  },

  state2: {
    step: 1
  }
};
