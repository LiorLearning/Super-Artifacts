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
  numerator: number;
  denominator_1: number;
  denominator_2: number;
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
      numerator: 1,
      denominator_1: 1,
      denominator_2: 2
    }
  },
  state2: {
    step: 0,
    key: {
      level: 2,
      numerator: 1,
      denominator_1: 1,
      denominator_2: 5
    }
  },
  state3: {
    step: 0,
    key: {
      level: 3,
      numerator: 1,
      denominator_1: 2,
      denominator_2: 2,
    }
  },
  state4: {
    step: 0,
    key: {
      level: 4,
      numerator: 3,
      denominator_1: 2,
      denominator_2: 2,
    }
  }
};


/* 
Screen1 (state1) or Screen2 (state2)

nuerator < denominator_1 * denominator_2

denominator1 has to be 1

denominator2 can be {2, 5, 10}

E.g. 1 / (1 * 5),   6 / (1 * 10)


--------------------------------------------------


Screen3 (state3) or Screen3 (state3)

nuerator < (denominator_1 * denominator_2)

denominator1 can't be 1

denominator1 can be {2, 5}
denominator2 can be {2, 5}

E.g  3 / (2 * 2),    7 / (2 * 5)   


*/



