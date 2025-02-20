export type GameScreen = 'first' | 'second' | 'third' | 'fourth';

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


export interface GameState {
  screen: GameScreen;
  state1: State1;
}

export const initialGameState: GameState = {
  screen: 'first',
  state1: {
    step: 0,
    number1: 23,
    number2: 4
  }
};



