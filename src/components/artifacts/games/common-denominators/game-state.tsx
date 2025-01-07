export const desc = ``;

export type GameScreen = 'first' | 'second';

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
  chocolateFractions: Fraction[];
  selectedChocolate: boolean[];
  chocolatesWithSameDenominator: number[];
}

export interface GameState {
  screen: GameScreen;
  state1: State1;
  state2: State2;
}
export const initialGameState: GameState = {
  screen: 'second',
  state1: {
    step: 0,
    fraction1: { numerator: '1', denominator: '2' },
    fraction2: { numerator: '1', denominator: '3' }
  },
  state2: {
    step: 0,
    fraction1: { numerator: '1', denominator: '2' },
    fraction2: { numerator: '1', denominator: '3' },
    chocolateFractions: [
      { numerator: '2', denominator: '4' },
      { numerator: '3', denominator: '6' },
      { numerator: '2', denominator: '6' },
      { numerator: '3', denominator: '9' }
    ],
    selectedChocolate: [false, false, false, false],
    chocolatesWithSameDenominator: [1, 2]
  },
};
