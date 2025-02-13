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
  fraction3: Fraction;
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
    fraction3: {
      numerator: 3,
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
    oneliner: 'Convert a half to decimal using tenths',
    description: 'Players learn to convert a half fraction to a decimal through equivalent fractions. The game guides through a three-step process: selecting the appropriate multiple of ten, writing the equivalent fraction with that denominator, and expressing it as a decimal. Each step provides immediate feedback with color-coded inputs and includes a verification system for incorrect answers to reinforce understanding.'
  },

  {
    title: 'Second Screen',
    oneliner: 'Convert fractions with denominator five to decimals',
    description: 'Players work with a sequence of fractions sharing the same denominator (fifths), converting each to decimals through equivalent fractions. Each fraction follows three steps: choosing an appropriate multiple of ten as denominator, finding the equivalent fraction, and writing the decimal. Later questions feature a streamlined interface with dropdown selection, helping players recognize patterns in converting fifths to decimals.'
  },

  {
    title: 'Third Screen',
    oneliner: 'Convert quarters to decimals using hundredths',
    description: 'Players explore converting quarters to decimals, discovering why some fractions require hundredths rather than tenths for conversion. The first fraction demonstrates the necessity of using hundredths as the denominator, guiding players through the conversion process. The second fraction reinforces this concept, helping players understand when and why to use hundredths instead of tenths in decimal conversions.'
  }
];
