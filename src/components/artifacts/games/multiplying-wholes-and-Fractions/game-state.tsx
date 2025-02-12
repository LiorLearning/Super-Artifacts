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
    oneliner: 'Create and visualize fractions with chocolate bars',
    description: `Start by learning how fractions work with a chocolate bar. First, use the Split button to divide the bar into equal parts for the denominator. Once you have the right number of pieces, select some pieces to create your whole times fraction for the numerator. For example, to make whole times numerator/denominator, split the bar into denominator pieces and select numerator times whole of them. After creating your fraction, you'll learn how to multiply it by a whole number by selecting the same fraction multiple times. The game guides you through each step with clear instructions and visual feedback.`
  },
  {
    title: 'second',
    oneliner: 'Multiply fractions by whole numbers using multiple bars and examples',
    description: `Practice multiplying fractions by whole numbers using multiple chocolate bars. You'll first start with one bar where you select pieces to represent your fraction. Secondly now you will create a chococlate bar representing whole times fraction, when you need more pieces, use the ADD BAR + button to add another bar. Each bar lets you select the same fraction, helping you understand how multiplication works. After correctly selecting the bars, Now you have select the Fraction its represent after multiplication from the drop down for each numerator and denominator, if you selected wrong then provide the feedback. After selecting the fraction you have fill the question mark value (which represent the '?' times fraction). Then You'll solve example problems where you multiply the numerator by the whole number while keeping the denominator the same.`
  }, 
  {
    title: 'third',
    oneliner: 'Solve multiplication problems with fractions independently',
    description: `Put your knowledge to the test by solving fraction multiplication problems. For each problem, multiply the whole number by the numerator to get your answer's numerator, while keeping the denominator the same. If you need help, use the HINT button to see a step-by-step solution. Enter your answers in the input boxes - numerator on top, denominator below. The game checks your work and helps you understand any mistakes.`
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
