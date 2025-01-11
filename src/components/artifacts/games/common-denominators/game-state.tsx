export const desc = ``;

export type GameScreen = 'first' | 'second' | 'third' | 'fourth' | 'fifth' | 'sixth';

export interface Fraction {
  numerator: string;
  denominator: string;
}

interface State1 {
  step: number;
  fraction1: Fraction;
  fraction2: Fraction;
}

interface State2 {
  step: number;
  fraction1: Fraction;
  fraction2: Fraction;
  lcd: number;
  chocolateFractions1: Fraction[];
  chocolateFractions2: Fraction[];
  chocolatesWithSameDenominator: number[];
}

interface State3 {
  step: number;
  fraction1: Fraction;
  fraction2: Fraction;
  gcd: number;
}

interface State4 {
  step: number;
  fraction1: Fraction;
  fraction2: Fraction;
  lcd: number; // Least Common Denominator
  ecd: number; // Easiest Common Denominator
}

interface State5 {
  step: number;
  fraction1: Fraction;
  fraction2: Fraction;
  lcd: number;
  ecd: number;
}

interface State6 {
  step: number;
  fraction1: Fraction;
  fraction2: Fraction;
  lcd: number;
  ecd: number;
}

export interface GameState {
  screen: GameScreen;
  state1: State1;
  state2: State2;
  state3: State3;
  state4: State4;
  state5: State5;
  state6: State6;
}
export const initialGameState: GameState = {
  screen: 'first',
  state1: {
    step: 0,
    fraction1: { numerator: '1', denominator: '2' },
    fraction2: { numerator: '1', denominator: '3' }
  },
  state2: {
    step: 0,
    fraction1: { numerator: '1', denominator: '2' },
    fraction2: { numerator: '1', denominator: '3' },
    lcd: 6,
    // We need to make sure that among these three options, 
    // there is exactly one option that is common to both 
    // fraction1 and fraction2

    // Equivalent fractions for fraction1
    chocolateFractions1: [
      { numerator: '1', denominator: '2' },
      { numerator: '2', denominator: '4' },
      { numerator: '3', denominator: '6' },
    ],
    // Equivalent fractions for fraction2
    chocolateFractions2: [
      { numerator: '1', denominator: '3' },
      { numerator: '2', denominator: '6' },
      { numerator: '3', denominator: '9' }
    ],
    // Indices of chocolates with same denominator
    chocolatesWithSameDenominator: [1, 2]
  },
  state3: {
    step: 0,
    fraction1: { numerator: '1', denominator: '3' },
    fraction2: { numerator: '1', denominator: '5' },
    gcd: 15
  },
  state4: {
    step: 0,
    fraction1: { numerator: '1', denominator: '2' },
    fraction2: { numerator: '1', denominator: '4' },
    lcd: 4,
    ecd: 8,
  },
  state5: {
    step: 0,
    fraction1: { numerator: '1', denominator: '3' },
    fraction2: { numerator: '1', denominator: '6' },
    lcd: 6,
    ecd: 18,
  },
  state6: {
    step: 0,
    fraction1: { numerator: '1', denominator: '4' },
    fraction2: { numerator: '1', denominator: '8' },
    lcd: 8,
    ecd: 32,
  }
};
