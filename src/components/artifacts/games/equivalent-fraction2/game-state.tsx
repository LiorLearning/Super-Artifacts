/**
 * Game State Management for Equivalent Fractions Game
 * 
 * The game progresses through 3 main screens:
 * - First Screen: Introduction to equivalent fractions with basic bar splitting
 * - Second Screen: Practice with multiplying fractions (appears twice with different values)
 * - Third Screen: Final challenge combining previous concepts
 *
 * Each screen maintains its own state with:
 * - equation: Tracks input fraction, multiplier, and output fraction
 * - bars: Visual chocolate bar representations that users interact with
 * - step tracking: Guides users through the learning process
 */

export const desc = `
Welcome to the Equivalent Fractions Game! Learn about fraction equivalence through interactive chocolate bars.

Detailed Gameplay:

First Screen - Introduction
1. You'll see a chocolate bar divided into equal parts
2. Choose a knife (2, 3, or 5 parts) to split each piece further
3. Click pieces to select them and form your target fraction
4. Fill in the equation to show how the fractions are equivalent

Second Screen - Practice (appears twice)
1. Start with a given fraction shown as selected pieces on a chocolate bar
2. Determine how many pieces each part needs to be split into
3. Fill in the multiplier (both numerator and denominator)
4. Calculate the equivalent fraction's numerator
5. Verify your answer by seeing the chocolate pieces align

Third Screen - Final Challenge
1. Apply what you've learned to solve a more complex equivalent fraction
2. Split the pieces correctly and fill in all equation parts
3. Demonstrate mastery of equivalent fraction concepts

Tips:
- Watch for visual feedback as you split and select pieces
- Use the chocolate bars to help visualize the fractions
- Pay attention to how multiplying both top and bottom by the same number creates equivalent fractions
`

export interface Fractions {
  numerator: number;
  denominator: number;
}

// Equation interface tracks the three parts of equivalent fraction equations:
// input fraction × multiplier = output fraction
export interface Equation {
  input: Fractions;
  multiplier: Fractions;
  output: Fractions;
}

// Each screen's state includes bars represented as nested arrays
// where inner arrays represent split pieces and numbers represent selection (0=unselected, 1=selected)
export interface FirstScreenState {
  equation: Equation;
  firstBar: number[][];  // Original bar
  secondBar: number[][]; // Bar after splitting
  selectedKnife: number | null;
  isCorrect: boolean;
  currentStep: number;
  barNumerator: string;
  showCorrect: boolean;
  canProceed: boolean;
}

export interface SecondScreenState {
  equation: Equation;
  firstBar: number[][];  // Shows initial fraction
  secondBar: number[][]; // Shows equivalent fraction after splitting
  currentStep: number;
  showCorrect: boolean;
  isCorrect: boolean;
  selectedPieces: number[];
}

export interface ThirdScreenState {
  equation: Equation;
  firstBar: number[][];
  secondBar: number[][];
  isCorrect: boolean;
  currentStep: number;
}

export type Screen = 'first' | 'second1' | 'second2' | 'third';

export interface GameState {
  currentScreen: Screen;
  firstScreenState: FirstScreenState;
  secondScreenState: SecondScreenState;
  thirdScreenState: ThirdScreenState;
}

export const initialGameState: GameState = {
  currentScreen: 'first',
  firstScreenState: {
    equation: {
      input: { numerator: 3, denominator: 4 },
      multiplier: { numerator: 0, denominator: 0 },
      output: { numerator: 0, denominator: 12 },
    },
    firstBar: Array(4).fill(null).map((_, i) => (i < 3 ? [1] : [0])),
    secondBar: Array(4).fill([0]),
    selectedKnife: null,
    isCorrect: false,
    currentStep: 0,
    barNumerator: '',
    showCorrect: false,
    canProceed: false,
  },
  secondScreenState: {
    equation: {
      input: { numerator: 3, denominator: 4 },
      multiplier: { numerator: 0, denominator: 0 },
      output: { numerator: 0, denominator: 8 },
    },
    firstBar: Array(4).fill(null).map((_, i) => (i < 3 ? [1] : [0])),
    secondBar: Array(4).fill([0]),
    currentStep: 1,
    showCorrect: false,
    isCorrect: false,
    selectedPieces: [],
  },
  thirdScreenState: {
    equation: {
      input: { numerator: 2, denominator: 3 },
      multiplier: { numerator: 0, denominator: 0 },
      output: { numerator: 0, denominator: 12 },
    },
    firstBar: Array(3).fill(null).map((_, i) => (i < 2 ? [1] : [0])),
    secondBar: Array(3).fill([0]),
    isCorrect: false,
    currentStep: 1,
  },
};
