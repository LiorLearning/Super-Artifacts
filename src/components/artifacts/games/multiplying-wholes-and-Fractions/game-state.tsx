export type GameScreen = 'first' | 'second';

interface Description {
  title: GameScreen;
  oneliner: string;
  description: string;
}

export interface Fraction {
  numerator: number;
  denominator: number;
}

export interface Wholes {
  whole: number;
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
  fraction: Fraction;
  wholes: Wholes;
}

interface State2 {
  step: number;
  fraction: Fraction;
  wholes: Wholes;
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
    fraction: {
      numerator: 1,
      denominator: 5,
    },
    wholes: {
      whole: 2,
    },
  },
  state2: {
    step: 0,
    fraction: {
      numerator: 2,
      denominator: 3,
    },
    wholes: {
      whole: 2,
    }
  },
};
