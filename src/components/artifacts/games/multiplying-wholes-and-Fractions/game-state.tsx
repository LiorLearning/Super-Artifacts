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
    oneliner: 'Create and Multiply Fractions',
    description: 'Learn how to create and multiply fractions with whole numbers'
  },
  {
    title: 'second',
    oneliner: 'Practice with Examples',
    description: 'Practice multiplying fractions with whole numbers through examples'
  }, 
  {
    title: 'third',
    oneliner: 'Solve Problems by multiplying whole by fractions',
    description: 'Test your understanding by solving multiplication problems. The first problem is to multipy 3 by 2/5 and the seond problem is to multply 4 by 3/7. We also have a need hint if user enters wrong answer'
  }
];

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
