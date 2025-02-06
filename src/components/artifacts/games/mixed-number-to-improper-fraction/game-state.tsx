export const desc = ``;

export type GameScreen = 'first' | 'second' | 'third';

export interface MixedFraction {
  whole: number;
  numerator: number;
  denominator: number;
}

interface State1 {
  step: number;
  mixedFraction: MixedFraction;
}

interface State2 {
  step: number;
  mixedFraction: MixedFraction;
}

interface State3 {
  step: number;
  mixedFraction1: MixedFraction;
  mixedFraction2: MixedFraction;
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
    mixedFraction: {
      whole: 3,
      numerator: 2,
      denominator: 4,
    },
  },
  state2: {
    step: 0,
    mixedFraction: {
      whole: 3,
      numerator: 2,
      denominator: 4,
    },
  },
  state3: {
    step: 0,
    mixedFraction1: {
      whole: 2,
      numerator: 1,
      denominator: 5,
    },
    mixedFraction2: {
      whole: 4,
      numerator: 2,
      denominator: 3,
    },
  },
};
