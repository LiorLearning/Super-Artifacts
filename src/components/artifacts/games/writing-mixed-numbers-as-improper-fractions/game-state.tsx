export const descriptions = [
  {
    title: 'first',
    oneliner: 'Visual conversion of mixed numbers using pie charts',
    description: 'This screen guides students through converting a mixed number to an improper fraction using interactive pie visualizations. Students start by creating whole pies representing the whole number part, then add fractional pieces for the numerator. Through step-by-step interaction, they click to count total pieces, understand the relationship between the whole number and denominator, and finally combine them to form the improper fraction. The screen uses visual feedback, immediate validation, and progressive revelation to help students grasp how the whole number part contributes to the final numerator.'
  },
  {
    title: 'second',
    oneliner: 'Quick method to convert mixed numbers mathematically',
    description: 'This screen introduces a mathematical shortcut for converting mixed numbers to improper fractions. Students learn the formula where they multiply the whole number by the denominator and add the numerator. The interface breaks down this process into clear steps, first having students calculate the product of whole and denominator, then adding the original numerator while keeping the same denominator. Interactive input fields with immediate feedback help students practice this method, reinforcing the mathematical relationship between mixed numbers and improper fractions.'
  },
  {
    title: 'third',
    oneliner: 'Practice converting multiple mixed numbers independently',
    description: 'This screen serves as a practice arena where students apply their learned conversion skills to multiple mixed number problems. Students work independently to convert given mixed numbers to improper fractions, with the option to use hints that remind them of the conversion method. The interface provides immediate feedback on their answers and includes visual aids to support their work. This screen helps solidify understanding through repetition and self-paced practice, while maintaining engagement through interactive elements and positive reinforcement.'
  }
];

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
