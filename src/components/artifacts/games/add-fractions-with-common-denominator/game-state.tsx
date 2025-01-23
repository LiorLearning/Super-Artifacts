// Game state for fraction addition game with two main screens:
// 1. Chocolate bar screen for visual fraction addition
// 2. Denominator screen for understanding fraction addition rules

// Each screen maintains its own state tracking:
// - User selections and inputs
// - Multi-step progression
// - Validation and feedback

export type GameScreen = 1 | 2;

interface Description {
  title: GameScreen;
  oneliner: string;
  description: string;
}

export const descriptions: Description[] = [
  {
    title: 1,
    oneliner: 'Visual fraction addition using interactive chocolate bars',
    description: 'This screen introduces fraction addition through an interactive chocolate bar visualization. Students start by selecting pieces of a chocolate bar to represent the first fraction (e.g., 2/5). After correctly selecting the first fraction, they see additional pieces from a friend (representing the second fraction) and must select all pieces to show the sum. Students then input their answer as a fraction, with separate fields for numerator and denominator. The screen concludes with a multiple-choice question about why denominators remain the same when adding fractions with like denominators, reinforcing the conceptual understanding through visual learning.'
  },
  {
    title: 2,
    oneliner: 'Learn rules for adding fractions with same denominators',
    description: 'Building on the visual understanding from the chocolate bar screen, this screen focuses on the mathematical rules of fraction addition. Students work through three structured steps: First, they select the correct rule about denominators in fraction addition (they remain the same). Next, they choose the correct rule about numerators (they are added together). Finally, students apply these rules by inputting the sum of two fractions with like denominators. The screen provides immediate feedback with color-coding (green for correct, red for incorrect) and reinforces the key concept that when adding fractions with the same denominator, we add the numerators while keeping the denominator unchanged.'
  }
]

interface Fraction {
  numerator: number;
  denominator: number;
}

export interface GameState {
  screen: GameScreen;
  state1: {
    fraction1: Fraction;
    fraction2: Fraction;
  };
  state2: {
    fraction1: Fraction;
    fraction2: Fraction;
  };
}

export const initialGameState: GameState = {
  screen: 1,
  state1: {
    fraction1: { numerator: 2, denominator: 5 },
    fraction2: { numerator: 1, denominator: 5 },
  },
  state2: {
    fraction1: { numerator: 2, denominator: 4 },
    fraction2: { numerator: 1, denominator: 4 },
  },
}
