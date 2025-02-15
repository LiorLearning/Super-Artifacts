export type GameScreen = 'first' | 'second' | 'third' | 'fourth';

interface Description {
  title: GameScreen;
  oneliner: string;
  description: string;
}

interface Fraction {
  numerator: number;
  denominator: number;
}

interface Key {
  level: number;
  n: number;
  a: number;
  b: number;
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
  key: Key;
}

interface State2 {
  step: number;
  key: Key;
}

interface State3 {
  step: number;
  key: Key;
}

interface State4 {
  step: number;
  key: Key;
}


export interface GameState {
  screen: GameScreen;
  state1: State1;
  state2: State2;
  state3: State3;
  state4: State4;
}

export const initialGameState: GameState = {
  screen: 'first',
  state1: {
    step: 0,
    key: {
      level: 1,
      n: 1,
      a: 1,
      b: 2
    }
  },
  state2: {
    step: 0,
    key: {
      level: 2,
      n: 1,
      a: 1,
      b: 5
    }
  },
  state3: {
    step: 0,
    key: {
      level: 3,
      n: 1,
      a: 2,
      b: 2,
    }
  },
  state4: {
    step: 0,
    key: {
      level: 4,
      n: 3,
      a: 2,
      b: 2,
    }
  }
};


