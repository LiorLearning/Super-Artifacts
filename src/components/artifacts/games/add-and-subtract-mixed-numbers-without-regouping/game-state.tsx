import { MixedFractionProps } from './utils/types';

export type GameScreen = 1 | 2 | 3 | 4;

interface Description {
  title: GameScreen;
  oneliner: string;
  description: string;
}

export const descriptions: Description[] = [
  {
    title: 1,
    oneliner: 'Introduction to pizza fractions through drag and drop',
    description: 'This screen introduces the concept of mixed numbers using a pizza analogy. Players are presented with two types of pizzas (Pepperoni and Cheese) represented as mixed fractions. The screen features a drag-and-drop interface where players must move whole pizzas and slices to designated areas. Players first drag the whole pizzas, then the sliced sections, and finally input their answers in a mixed number format. The screen includes visual feedback with color-coding (pink for Pepperoni, yellow for Cheese) and sound effects for interactions. The goal is to help players understand how mixed numbers can be represented visually and how to combine them.'
  },
  {
    title: 2,
    oneliner: 'Practice adding mixed numbers with guided steps',
    description: 'Building on the first screen\'s concepts, this screen provides a more structured approach to adding mixed numbers. Players work through multiple steps, starting with identifying the components of each mixed number (whole numbers and fractions). The screen maintains the pizza theme but focuses more on the mathematical process. Players must input their answers for both pizzas separately before combining them. The interface provides immediate feedback on correct/incorrect answers and includes helpful prompts to guide players through the addition process. This screen helps reinforce the concept that when adding mixed numbers with like denominators, you add the whole numbers and fractions separately.'
  },
  {
    title: 3,
    oneliner: 'Combining mixed numbers with same denominators',
    description: 'This screen focuses on the actual addition of mixed numbers with the same denominators. Players are presented with a clean interface where they must add both the whole numbers and fractions separately. The screen maintains visual consistency with previous screens but removes the pizza visuals to help players transition to more abstract mathematical thinking. Players must input their answers in a structured format, with separate inputs for whole numbers and fractions. The screen provides immediate feedback and requires correct answers before allowing progression.'
  },
  {
    title: 4,
    oneliner: 'Final practice with mixed number addition',
    description: 'The final screen serves as a comprehensive assessment of the skills learned. Players must complete the addition of mixed numbers independently, with minimal guidance. The interface presents the problem in a traditional mathematical format while maintaining the color-coding scheme from previous screens (green for whole numbers, purple for fractions). Players must input their answers in multiple steps, showing their understanding of the entire process. The screen includes validation for each step and provides feedback on the final answer, ensuring players have mastered the concept of adding mixed numbers without regrouping.'
  }
]


export interface QuestionDescriptionProps{
  showFirstRow: boolean;
  showSecondRow: boolean;
  showThirdRow: boolean;

  inputWhole: string;
  inputNumerator: string;
  inputDenominator: string;
}

export interface screen1 {
  step: number;
  fraction1: MixedFractionProps;
  fraction2: MixedFractionProps;
}

export interface screen2 {
  step: number;
  substep: number;
  fraction1: MixedFractionProps;
  fraction2: MixedFractionProps;
}

export interface screen3 {
  step: number;
  substep: number;
  fraction1: MixedFractionProps;
  fraction2: MixedFractionProps;
}

export interface screen4 {
  step: number;
  fraction1: MixedFractionProps;
  fraction2: MixedFractionProps;
}

export interface Question {
  fraction1: MixedFractionProps;
  fraction2: MixedFractionProps;
}

export interface GameState {
  screen: number;
  state1: screen1;
  state2: screen2;
  state3: screen3;
  state4: screen4;
}

export const initialGameState: GameState = {
  screen: 1,

  state1: {
    step: 0,
    fraction1: { whole: 3, numerator: 1, denominator: 4 },
    fraction2: { whole: 2, numerator: 2, denominator: 4 },
  },

  state2: {
    step: 0,
    substep: 0,
    fraction1: { whole: 2, numerator: 2, denominator: 5 },
    fraction2: { whole: 1, numerator: 1, denominator: 5 },
  },

  state3: {
    step: 0,
    substep: 0,
    fraction1: { whole: 2, numerator: 3, denominator: 8 },
    fraction2: { whole: 1, numerator: 2, denominator: 8 },
  },

  state4: {
    step: 0,
    fraction1: { whole: 3, numerator: 2, denominator: 6 },
    fraction2: { whole: 1, numerator: 1, denominator: 6 },
  },
};
