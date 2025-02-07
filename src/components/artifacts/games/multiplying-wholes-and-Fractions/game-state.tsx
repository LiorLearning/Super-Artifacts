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
    oneliner: 'Create fractions using chocolate bars',
    description: `Learn to multiply whole numbers with fractions using chocolate bars. Start by splitting a chocolate bar into equal parts using the Split button, or combine pieces with the Join button. Once you've split the bar correctly, select the right number of pieces to create your fraction. The game will guide you through each step, showing how to create fractions visually. Click DONE after each action to check your work and move forward.`
  },
  {
    title: 'second',
    oneliner: 'Multiply fractions using multiple chocolate bars',
    description: `Practice multiplying whole numbers by fractions using multiple chocolate bars. First create your fraction by splitting and selecting pieces, then use the ADD BAR + button to add more bars when needed. Each bar represents one group, and you'll need to select the same fraction in each bar. After selecting all pieces correctly, you'll solve example problems where you multiply the numerator by the whole number while keeping the denominator the same.`
  }, 
  {
    title: 'third',
    oneliner: 'Solve fraction multiplication problems step by step',
    description: `Test your understanding by solving multiplication problems with whole numbers and fractions. For each problem, enter your answer with the numerator (multiply the whole number by the original numerator) and denominator (stays the same as the original fraction). If you need help, click the HINT button to see the step-by-step solution. The game provides immediate feedback and will guide you to the correct answer.`
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
