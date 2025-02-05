export const desc = ``;

export type GameScreen = 'first' | 'second' | 'third';

export interface Fraction {
 numerator: number;
  denominator: number;
}

interface State1 {
  step: number;
  fraction: Fraction;
}


interface State2 {
  step: number;
  fraction1: Fraction;
  fraction2: Fraction;
}



interface State3 {
  step: number;
  fraction1: Fraction;
  fraction2: Fraction;
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
      denominator: 2,
    },

  },

  state2: {
    step: 0,
    fraction1: {
      numerator: 1,
      denominator: 5,
    },
    fraction2: {
      numerator: 2,
      denominator: 5,
    },

  },

  state3: {
    step: 0,
    fraction1: {
      numerator: 1,
      denominator: 4,
    },

    fraction2: {
      numerator: 3,
      denominator: 4,
    },


  },
};

export const descriptions = [
  {
    title: 'First Screen',
    description: 'Question related to unit fraction with denominator 2'
  },


  {
    title: 'Second Screen',
    description: 'Question related to unit fraction with denominator 5'
  },


  {
    title: 'Third Screen',
    description: 'Question related to unit fraction with denominator 4'
  }


];
