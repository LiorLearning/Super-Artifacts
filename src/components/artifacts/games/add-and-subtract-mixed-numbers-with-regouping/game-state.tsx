export type GameScreen = 'first' | 'second';

interface Description {
  title: GameScreen;
  oneliner: string;
  description: string;
}

export const descriptions: Description[] = [
  {
    title: 'first',
    oneliner: 'First screen',
    description: 'First screen description'
  },
  {
    title: 'second',
    oneliner: 'Second screen',
    description: 'Second screen description'
  }
]

interface State1 {
  step: number;
  variable: number;
  question1: {
    whole: number;
    numerator: number;
    denominator: number;
  }
  question2: {
    whole: number;
    numerator: number;
    denominator: number;
  }
}

interface State2 {
  step: number;
  variable: number;
}

export interface GameState {
  screen: GameScreen;
  state1: State1;
  state2: State2;
}

export const initialGameState: GameState = {
  screen: 'first',
  state1: {
    step: 0,
    variable: 0,
    question1: {
      whole: 3,
      numerator: 3,
      denominator: 4,
    },
    question2: {
      whole: 3,
      numerator: 5,
      denominator: 4,
    },
  },
  state2: {
    step: 0,
    variable: 0,
  },
};
