import { MixedFractionProps } from './utils/types';

export const desc = ``;


export interface screen1 {
  step: number;
  variable: number;
}

export interface screen2 {
  step: number;
  variable: number;
}

export interface GameState {
  screen: number;
  state1: screen1;
  state2: screen2;

  questions: {
    question1: {
      fraction1: MixedFractionProps;
      fraction2: MixedFractionProps;
    };
    question2: {
      fraction1: MixedFractionProps;
      fraction2: MixedFractionProps;
    };
  };
}

export const initialGameState: GameState = {
  screen: 1,
  state1: {
    step: 2,
    variable: 0,
  },
  state2: {
    step: 0,
    variable: 0,
  },
  questions: {
    question1: {
      fraction1: { whole: 3, numerator: 1, denominator: 4 },
      fraction2: { whole: 4, numerator: 3, denominator: 4 },
    },
    question2: {
      fraction1: { whole: 1, numerator: 1, denominator: 2 },
      fraction2: { whole: 1, numerator: 1, denominator: 2 },
    },
  },
};
