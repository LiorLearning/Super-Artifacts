export type GameScreen = 1 | 2;

interface Description {
  title: GameScreen;
  oneliner: string;
  description: string;
}

export const descriptions: Description[] = [
  {
    title: 1,
    oneliner: 'Visual chocolate bar manipulation for fraction subtraction',
    description: 'This screen teaches fraction subtraction through an interactive chocolate bar visualization. Students work with a problem like 7/8 - 1/8 using a virtual chocolate bar divided into equal parts. The screen guides students through three key steps: First, they select pieces to represent the first fraction (7/8) by using the "Split" button to divide the bar and clicking pieces to select them. Next, they drag and drop pieces to a separate area to represent the subtracted fraction (1/8). Finally, they input their answer as a fraction. Throughout the process, students receive immediate feedback through sound effects and visual cues, with the chocolate bar metaphor making the abstract concept more tangible. The interface includes a progress tracker and clear instructions at each step, ensuring students understand how subtraction works with fractions having the same denominator.'
  },
  {
    title: 2,
    oneliner: 'Understand core principles of fraction subtraction',
    description: 'Building on the visual foundation from Screen 1, this screen focuses on understanding the key principles of fraction subtraction with common denominators. Students work with a new problem (4/5 - 3/5) through a structured series of reflection questions. The screen is divided into three main steps: First, students answer questions about how denominators behave during subtraction, learning that they remain unchanged. Next, they explore how numerators are affected, discovering that they get subtracted. Finally, they apply this knowledge to solve the fraction subtraction problem. Each step provides immediate feedback with sound effects and visual cues, and students cannot proceed until they demonstrate understanding. The screen uses multiple-choice questions and clear visual feedback to help students discover and internalize the rules of fraction subtraction with common denominators.'
  }
]

interface Fraction {
  numerator: number;
  denominator: number;
}

interface Screen1State {
  step: number;
  fraction1: Fraction;
  fraction2: Fraction;
}

interface Screen2State {
  step: number;
  fraction1: Fraction;
  fraction2: Fraction;
}

export interface GameState {
  screen: GameScreen;
  state1: Screen1State;
  state2: Screen2State;
}

export const initialGameState: GameState = {
  screen: 1,
  state1: {
    step: 1,
    fraction1: {
      numerator: 7,
      denominator: 8
    },
    fraction2: {
      numerator: 1,
      denominator: 8
    }
  },
  state2: {
    step: 1,
    fraction1: {
      numerator: 4,
      denominator: 5
    },
    fraction2: {
      numerator: 3,
      denominator: 5
    }
  }
}