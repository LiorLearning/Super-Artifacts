export type GameScreen = 1 | 2 | 3;

interface Description {
  title: GameScreen;
  oneliner: string;
  description: string;
}

export const descriptions: Description[] = [
  {
    title: 1,
    oneliner: 'Visual comparison using interactive chocolate bars',
    description: 'This screen introduces fraction comparison through an interactive chocolate bar visualization. Students manipulate two chocolate bars using "Split" and "Join" tools to create the given fractions. The Split tool divides the bar into more pieces, while Join combines pieces. Students can click individual pieces to fill them, helping visualize the fraction. After creating both fractions visually, students select which fraction is larger, receiving immediate feedback. This hands-on approach helps students understand fraction size comparison through visual representation before moving to more abstract methods.'
  },
  {
    title: 2,
    oneliner: 'Converting fractions using common denominators',
    description: 'Building on visual understanding, this screen introduces the mathematical method of comparing fractions using common denominators. Students first make an initial guess about which fraction is larger, then follow a structured approach to find the common denominator. They choose the correct common denominator from options provided, then convert both fractions by multiplying numerators and denominators appropriately. The screen provides immediate feedback for each step and includes guided prompts to help students understand why certain steps are necessary. This process helps transition students from visual comparison to mathematical comparison methods.'
  },
  {
    title: 3,
    oneliner: 'Independent fraction comparison using mathematical methods',
    description: 'The final screen tests students\' mastery of fraction comparison without visual aids. Students must independently find a common denominator and convert both fractions, entering their calculations step by step. They first enter the common denominator, then calculate and enter the new numerators for both fractions. Finally, they compare the converted fractions using comparison symbols (<, >, =). The screen provides immediate feedback at each step and includes error-specific guidance when needed. This screen ensures students can apply the mathematical method of fraction comparison independently.'
  }
];

interface Fraction {
  numerator: number;
  denominator: number;
}

interface Question {
  fraction1: Fraction
  fraction2: Fraction
}

export interface GameState {
  screen: GameScreen;
  state1: {
    step: number;
    question: Question
  };
  state2: {
    step: number;
    question: Question
  };
  state3: {
    step: number;
    question: Question
  };
}

export const initialGameState: GameState = {
  screen: 1,
  state1: {
    step: 0,
    question: {
      fraction1: { numerator: 2, denominator: 3 },
      fraction2: { numerator: 3, denominator: 4 },
    },
  },
  state2: {
    step: 0,
    question: {
      fraction1: { numerator: 5, denominator: 6 },
      fraction2: { numerator: 3, denominator: 4 },
    },
  },
  state3: {
    step: 0,
    question: {
      fraction1: { numerator: 5, denominator: 6 },
      fraction2: { numerator: 4, denominator: 5 },
    },
  }
};
