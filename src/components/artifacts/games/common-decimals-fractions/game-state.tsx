export type GameScreen = 'first' | 'second' | 'third';

interface Description {
  title: GameScreen;
  oneliner: string;
  description: string;
}

interface Fraction {
  numerator: number;
  denominator: number;
}

export const descriptions: Description[] = [
  {
    title: 'first',
    oneliner: 'Changelog',
    description: 'Track all changes and feature additions'
  },
  {
    title: 'second',
    oneliner: 'First screen',
    description: 'First screen description'
  },
  {
    title: 'third',
    oneliner: 'Second screen',
    description: 'Second screen description'
  }
]

interface State1 {
  step: number;
  fraction: Fraction;
}

interface State2 {
  step: number;
  fraction: Fraction;
}

interface State3 {
  step: number;
  fraction: Fraction;
}

export interface GameState {
  screen: GameScreen;
  state1: State1;
  state2: State2;
  state3: State3;
}

export const initialGameState: GameState = {
  screen: 'first',
  state1: {
    step: 0,
    fraction: {
      numerator: 1,
      denominator: 5,
    }
  },
  state2: {
    step: 0,
    fraction: {
      numerator: 2,
      denominator: 3,
    }
  },
  state3: {
    step: 0,
    fraction: {
      numerator: 2,
      denominator: 5,
    }
  }
};


