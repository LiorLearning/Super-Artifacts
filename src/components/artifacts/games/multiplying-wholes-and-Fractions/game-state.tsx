export type GameScreen = 'first' | 'second' | 'third';

interface Description {
  title: GameScreen;
  oneliner: string;
  description: string;
}

export interface Fraction {
  numerator: number;
  denominator: number;
}

interface question {
  whole: number;
  fraction: Fraction;
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
  }, 
  {
    title: 'third',
    oneliner: 'Third screen',
    description: 'Third screen description'
  }
]

interface State1 {
  step: number;
  fraction: Fraction;
  whole: number;
}

interface State2 {
  step: number;
  fraction: Fraction;
  whole: number;
}

interface State3 {
  step: number;
  questions: question[]
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
    },
    whole: 2,
  },
  state2: {
    step: 0,
    fraction: {
      numerator: 2,
      denominator: 3,
    },
    whole: 2
  },
  state3: {
    step: 0,
    questions: [
      {
        whole: 3,
        fraction: {
          numerator: 2,
          denominator: 5,
        }
      },
      {
        whole: 4,
        fraction: {
          numerator: 3,
          denominator: 7,
        }
      }
    ]
  }
};
