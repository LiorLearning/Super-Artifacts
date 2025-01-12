export const desc = ``;

export type GameScreen = 1 | 2 | 3 | 4;

export interface Screen1 {
  step: {
    id: number,
    text: string
  },
  question:{
    numerator1: number
    denominator1: number
    denominator2: number
  },
  selectedKnife: number | null,
  selectedPieces: number,
}

export interface Screen2 {
  step: {
    id: number,
    text: string
  },
  substep: number,
  selectedKnife: number | null,
  selectedHoney: number | null,
  selectedPieces1: number,
  selectedPieces2: number,

  question: {
    numerator1: number
    denominator1: number
    denominator2: number
    denominator3: number
  },
}

export interface Screen3 {
  step: 0
  fraction1: {
    numerator: number
    denominator: number
  }
  fraction2: {
    numerator: number
    denominator: number
  }
  fraction3: {
    numerator: number
    denominator: number
  }
  question: {
    numerator1: number
    denominator1: number
    denominator2: number
    denominator3: number
  }
}

export interface GameState {
  level: number,
  screen1: Screen1,
  screen2: Screen2,
  screen3: Screen3,
}

export const initialGameState: GameState = {
  level: 3,
  screen1: {
    step: {
      id: 1,
      text: "CREATE 9 PIECES"
    },
    question:{
      numerator1: 2,
      denominator1: 3,
      denominator2: 9
    },
    selectedKnife: null,
    selectedPieces: 0,
  },
  screen2: {
    step: {
      id: 1,
      text: "CREATE 9 PIECES"
    },
    substep: 0,
    selectedKnife: null,
    selectedHoney: null,
    selectedPieces1: 0,
    selectedPieces2: 0,
    question: {
      numerator1: 4,
      denominator1: 6,
      denominator2: 12,
      denominator3: 3
    }
  },
  screen3: {
    step: 0,
    fraction1: {
      numerator: 4,
      denominator: 6
    },
    fraction2: {
      numerator: 8,
      denominator: 12
    },
    fraction3: {
      numerator: 2,
      denominator: 3
    },
    question: {
      numerator1: 4,
      denominator1: 6,
      denominator2: 12,
      denominator3: 18
    }
  }
};