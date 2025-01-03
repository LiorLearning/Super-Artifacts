// Game state for fraction addition game with two main screens:
// 1. Chocolate bar screen for visual fraction addition
// 2. Denominator screen for understanding fraction addition rules

// Each screen maintains its own state tracking:
// - User selections and inputs
// - Multi-step progression
// - Validation and feedback

export const desc = `
Welcome to the Fraction Subtraction Game! Learn to subtract fractions using interactive chocolate bars.

Detailed Gameplay:

Visual Subtraction Screen
1. Start with a chocolate bar divided into equal parts (the minuend)
2. Select the correct number of pieces to represent the first fraction
3. Remove pieces by dragging them away (the subtrahend)
4. Count the remaining pieces to find the difference
5. Enter your answer as a fraction
6. Reflect on how the subtraction affected the numerator and denominator

Rules Understanding Screen
1. Learn about denominator behavior in fraction subtraction
   - Understand why denominators stay the same when subtracting fractions
   - Practice with different examples

2. Learn about numerator behavior
   - See how numerators are subtracted when denominators are the same
   - Practice finding the difference between numerators

3. Apply the rules
   - Use your understanding to solve fraction subtraction problems
   - Check your answers with visual confirmation

Key Concepts:
- When subtracting fractions with the same denominator:
  * The denominator stays the same
  * Only the numerators are subtracted
  * The result represents the remaining pieces

Tips:
- Use the chocolate bar to visualize the subtraction process
- Remember that pieces must be the same size (same denominator) to subtract
- Practice connecting the visual model to the numerical representation
`

interface Fraction {
  numerator: number;
  denominator: number;
}

export interface GameState {
  currentFrame: number;
  fractionProblem: {
    fraction1: Fraction;
    fraction2: Fraction;
  };
  chocolateBarPieces: number;
  correctAnswer: Fraction;
  currentScreen: 'chocolate' | 'denominator';
  chocolateBarScreen: {
    selectedPieces: number[];
    step2Pieces: number[];
    numerator: string;
    denominator: string;
    selectedOption: number | null;
    showStep2: boolean;
    showStep3: boolean;
    showFooter: boolean;
  };
  denominatorScreen: {
    denominatorOption: number | null;
    numeratorOption: number | null;
    answerNumerator: string;
    answerDenominator: string;
    showStep2: boolean;
    showStep3: boolean;
    isAnswerCorrect: boolean;
  };
  selectedPieces: number;
  currentStep: number;
  droppedPieces: Array<{ x: number, y: number, originalIndex: number }>;
  answer: {
    numerator: string;
    denominator: string;
  };
  reflectionStep: number;
  selectedAnswer: string | null;
  isFirstQuestionCorrect: boolean;
  firstAnswer: string | null;
  secondAnswer: string | null;
}

export const initialGameState: GameState = {
  currentFrame: 1,
  fractionProblem: {
    fraction1: { numerator: 1, denominator: 3 },
    fraction2: { numerator: 1, denominator: 3 },
  },
  chocolateBarPieces: 3,
  correctAnswer: { numerator: 2, denominator: 3 },
  currentScreen: 'chocolate',
  chocolateBarScreen: {
    selectedPieces: [],
    step2Pieces: [],
    numerator: '',
    denominator: '',
    selectedOption: null,
    showStep2: false,
    showStep3: false,
    showFooter: false,
  },
  denominatorScreen: {
    denominatorOption: null,
    numeratorOption: null,
    answerNumerator: '',
    answerDenominator: '',
    showStep2: false,
    showStep3: false,
    isAnswerCorrect: false,
  },
  selectedPieces: 0,
  currentStep: 1,
  droppedPieces: [],
  answer: {
    numerator: '',
    denominator: ''
  },
  reflectionStep: 1,
  selectedAnswer: null,
  isFirstQuestionCorrect: false,
  firstAnswer: null,
  secondAnswer: null,
}
