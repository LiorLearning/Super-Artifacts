export type GameScreen = 1 | 2;

interface Description {
  title: GameScreen;
  oneliner: string;
  description: string;
}

export const descriptions: Description[] = [
  {
    title: 1,
    oneliner: 'Interactive chocolate bar visualization for fraction subtraction',
    description: 'This screen introduces fraction subtraction through an interactive chocolate bar visualization. Students start with a problem like 7/8 - 1/8 and use a virtual chocolate bar divided into equal parts. They first select pieces to represent the first fraction (7/8), then give away pieces to represent the second fraction (1/8). The screen guides students through three key steps: selecting the initial pieces, removing the subtracted pieces, and determining the final answer. Throughout the process, students receive immediate feedback and can visually see how subtraction works with fractions that have the same denominator. The chocolate bar metaphor helps make the abstract concept more concrete and engaging.'
  },
  {
    title: 2,
    oneliner: 'Practice and reinforce fraction subtraction concepts',
    description: 'Building on Screen 1\'s visual approach, this screen focuses on understanding the key principles of fraction subtraction with common denominators. Students work through a structured set of reflection questions about how denominators and numerators behave during subtraction (e.g., 4/5 - 3/5). The screen guides learners to discover that when subtracting fractions with the same denominator, the denominator stays the same while only the numerators are subtracted. Through multiple-choice questions and immediate feedback, students solidify their understanding of why this works, preparing them to solve such problems independently. The screen maintains engagement through interactive elements and clear visual feedback for each answer.'
  }
]

interface Fraction {
  numerator: number;
  denominator: number;
}

interface Screen1State {
  currentStep: number;
}

interface Screen2State {
  currentStep: number;
}

interface SharedState {
  currentFrame: GameScreen;
  questions: {
    question1: {
      fraction1: Fraction;
      fraction2: Fraction;
    }
    question2: {
      fraction1: Fraction;
      fraction2: Fraction;
    }
  }
}

export interface GameState extends SharedState {
  screen1State: Screen1State;
  screen2State: Screen2State;
}

export const initialGameState: GameState = {
  currentFrame: 1,
  questions: {
    question1: {
      fraction1: {
        numerator: 7,
        denominator: 8
      },
      fraction2: {
        numerator: 1,
        denominator: 8
      }
    },
    question2: {
      fraction1: {
        numerator: 4,
        denominator: 5
      },
      fraction2: {
        numerator: 3,
        denominator: 5
      }
    }
  },
  screen1State: {
    currentStep: 1,
  },

  screen2State: {
    currentStep: 1,
  }
}