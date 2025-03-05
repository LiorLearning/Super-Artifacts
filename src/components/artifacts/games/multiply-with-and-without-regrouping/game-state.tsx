export type GameScreen = 'first' | 'second' | 'third' | 'fourth' | 'fifth' | 'sixth';

interface Description {
  title: GameScreen;
  oneliner: string;
  description: string;
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
  number1: number;
  number2: number;
}

interface State2 {
  step: number;
  number1: number;
  number2: number;
}

interface State3 {
  step: number;
  number1: number;
  number2: number;
} 

interface State4 {
  step: number;
  number1: number;
  number2: number;
}

interface State5 {
  step: number;
  number1: number;
  number2: number;
}

interface State6 {
  step: number;
  number1: number;
  number2: number;
}

export interface GameState {
  screen: GameScreen;
  state1: State1;  
  state2: State2;
  state3: State3;
  state4: State4;
  state5: State5;
  state6: State6;
}

export const initialGameState: GameState = {
  screen: 'first',
  state1: {
    step: 0,
    number1: 12,
    number2: 4
  },
  state2: {
    step: 0,
    number1: 23,
    number2: 4
  },
  state3: {
    step: 0,
    number1: 17,
    number2: 6
  },
  state4: {
    step: 0,
    number1: 23,
    number2: 4
  },
  state5: {
    step: 0,
    number1: 54,
    number2: 7
  },
  state6: {
    step: 0,
    number1: 235,
    number2: 4
  }
};

