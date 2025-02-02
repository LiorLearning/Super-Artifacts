export type GameScreen = 'first' | 'second' | 'third';

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
  },
  {
    title: 'third',
    oneliner: 'Third screen',
    description: 'Third screen description'
  }
]

interface State1 {
  step: number;
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

interface State3 {
  step: number;
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

export interface GameState {
  screen: GameScreen;
  state1: State1;
  state2: State2;
  state3: State3;
}

export const initialGameState: GameState = {
  screen: 'third',
  state1: {
    step: 0,
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
    question1: {
      whole: 3,
      numerator: 1,
      denominator: 4,
    },
    question2: {
      whole: 2,
      numerator: 11,
      denominator: 4,
    },
  },
  state3: {
    step: 10,
    question1: {
      whole: 3,
      numerator: 1,
      denominator: 4,
    },
    question2: {
      whole: 2,
      numerator: 11,
      denominator: 4,
    },
  }
};
