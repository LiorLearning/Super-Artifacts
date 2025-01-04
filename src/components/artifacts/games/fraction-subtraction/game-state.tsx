// Game state for fraction subtraction game with two main screens

interface Fraction {
  numerator: number;
  denominator: number;
}

interface Screen1State {
  currentStep: number;
  selectedPieces: number;
  droppedPieces: Array<{ x: number, y: number, originalIndex: number }>;
  answer: {
    numerator: string;
    denominator: string;
  };
  firstAnswer: string | null;
  secondAnswer: string | null;
}

interface Screen2State {
  currentStep: number;
  denominatorAnswer: string | null;
  numeratorAnswer: string | null;
  finalAnswer: string;
  completedSteps: number[];
  isStep3Correct: boolean;
}

interface SharedState {
  currentFrame: number;
  questions: {
    question1: {
      fraction1: Fraction;
      fraction2: Fraction;
    }
    question2: {
      fraction1: Fraction;
      fraction2: Fraction;
    }
  }
}

export interface GameState extends SharedState {
  screen1State: Screen1State;
  screen2State: Screen2State;
}

export const initialGameState: GameState = {
  currentFrame: 1,
  questions: {
    question1: {
      fraction1: {
        numerator: 7,
        denominator: 8
      },
      fraction2: {
        numerator: 1,
        denominator: 8
      }
    },
    question2: {
      fraction1: {
        numerator: 5,
        denominator: 5
      },
      fraction2: {
        numerator: 3,
        denominator: 5
      }
    }
  },
  screen1State: {
    currentStep: 1,
    selectedPieces: 0,
    droppedPieces: [],
    answer: {
      numerator: '',
      denominator: ''
    },
    firstAnswer: null,
    secondAnswer: null,
  },

  screen2State: {
    currentStep: 1,
    denominatorAnswer: null,
    numeratorAnswer: null,
    finalAnswer: '',
    completedSteps: [],
    isStep3Correct: false
  }
}
