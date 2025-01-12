

export const desc = ``;

export type GameScreen = 1 | 2 | 3 | 4;

export interface Screen1 {
  question:{
    numerator1: number
    denominator1: number
    denominator2: number
  }
}

export interface GameState {
  step: {
    id: number,
    text: string
  },
  selectedKnife: number | null,
  selectedPieces: number,
  screen: 1 | 2
  state1: Screen1
}

export const initialGameState: GameState = {
  screen: 1,

  step: {
    id: 1,
    text: "CREATE 9 PIECES "
  },

  selectedKnife: null,
  selectedPieces: 0,

  state1: {
    question: {
      numerator1: 2,
      denominator1: 3,
      denominator2: 9
    }
  },
};

