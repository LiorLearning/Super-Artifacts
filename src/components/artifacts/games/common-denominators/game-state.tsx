export type GameScreen = 'first' | 'second' | 'third' | 'fourth' | 'fifth' | 'sixth';

interface Description {
  title: GameScreen;
  oneliner: string;
  description: string;
}

export const descriptions: Description[] = [
  {
    title: 'first',
    oneliner: 'Slice bars to create fractions and find common denominators.',
    description: 'Each fraction is represented by a chocolate bar that you slice into smaller, equal pieces using the knife button (featuring a multiplier like 2 or 3), which increases both the denominator and numerator. After slicing, enter the new fraction (for example, turning 1/2 into 2/4) to confirm your answer and proceed. Complete this process for the first chocolate bar, repeat it for the second, and then move to the next screen once both fractions are correct. This illustrates how multiplying both numerator and denominator by a single number produces an equivalent fraction that reflects an identical amount of chocolate. The objective is to master creating equivalent fractions by slicing chocolate bars, and you win when you correctly slice and enter the fractions for both bars, then advance to the next screen. Each fraction is represented by a chocolate bar that you slice into smaller, equal pieces using the knife button (with a multiplier like 2 or 3), which increasˀˀes both the denominator and numerator; after slicing, enter the new fraction (for example, turning 1/2 into 2/4) to confirm your answer and proceed. Completing this process for both chocolate bars illustrates how multiplying numerator and denominator by the same number yields an equivalent fraction reflecting the same amount of chocolate.'
  },
  {
    title: 'second',
    oneliner: 'Select the chocolate bars with same denominator.',
    description: 'The game will now show the user the equivalent fractions for the two fractions. The user will have to select the chocolate bars with the same denominator from the given list of options for both fractions.'
  },
  {
    title: 'third',
    oneliner: 'Find the Greatest Common Divisor (GCD) of the two denominators.',
    description: 'This game will now show user how to find the Greatest Common Divisor (GCD) of the two denominators. First user will have to find the multiples of the numerator and denominators to understand that breaking the chocolate bars will not change the fraction. Then user will have to find the common multiples of the two denominators and find the greatest common multiple. This will be the Greatest Common Divisor (GCD) of the two denominators. User can use the knife tool to split the chocolate bars into equal pieces to find the GCD.'
  },
  {
    title: 'fourth',
    oneliner: 'Find the Least Common Denominator (LCD) and Easiest Common Denominator (ECD) of the two denominators.',
    description: 'This game will show user the multiples of the two denominators and then find the least common multiple of the two denominators. This will be the Least Common Denominator (LCD) of the two denominators. Then user will have to find the easiest common denominator of the two denominators. This will be the Easiest Common Denominator (ECD) of the two denominators. User can use the knife tool to split the chocolate bars into equal pieces to find the LCD and ECD.'
  },
  {
    title: 'fifth',
    oneliner: 'Find ECD, LCD without help',
    description: 'User will have to write the multiples of the two denominators and then find the least common multiple of the two denominators. This will be the Least Common Denominator (LCD) of the two denominators. Then user will have to find the easiest common denominator of the two denominators. This will be the Easiest Common Denominator (ECD) of the two denominators.'
  },
  {
    title: 'sixth',
    oneliner: 'Find ECD, LCD without help (hard)',
    description: 'User will have to write the multiples of the two denominators and then find the least common multiple of the two denominators. This will be the Least Common Denominator (LCD) of the two denominators. Then user will have to find the easiest common denominator of the two denominators. This will be the Easiest Common Denominator (ECD) of the two denominators.'
  }
]

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


// Least Common Denominator (lcd) = denom1 * denom2 / Greatest Common Divisor (gcd)
// Easiest Common Denominator (ecd) = denom1 * denom2

export const initialGameState: GameState = {
  screen: 'first',
  state1: {
    // Defines the game screen 1
    fraction1: { numerator: '1', denominator: '4' },
    fraction2: { numerator: '1', denominator: '5' },

    step: 0, // Do not change this
  },
  state2: {
    step: 0, // Do not change this

    // Defines the game screen 2
    fraction1: { numerator: '1', denominator: '2' },
    fraction2: { numerator: '1', denominator: '3' },
    lcd: 6, // Least Common Denominator of fraction1 and fraction2

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
    // Indices of chocolates with same denominator, 
    // must be one among the options for 
    // chocolateFractions1 and chocolateFractions2
    chocolatesWithSameDenominator: [1, 2]
  },
  state3: {
    step: 0, // Do not change this

    // Defines the game screen 3
    fraction1: { numerator: '1', denominator: '3' },
    fraction2: { numerator: '1', denominator: '5' },
    gcd: 15 // Greatest Common Divisor of fraction1 and fraction2
  },
  state4: {
    step: 0, // Do not change this

    // Defines the game screen 4
    fraction1: { numerator: '1', denominator: '2' },
    fraction2: { numerator: '1', denominator: '4' },
    lcd: 4, // Least Common Denominator of fraction1 and fraction2 = denom1 * denom2 / gcd
    ecd: 8, // Easiest Common Denominator of fraction1 and fraction2 = denom1 * denom2
  },
  state5: {
    step: 0, // Do not change this

    // Defines the game screen 5
    fraction1: { numerator: '1', denominator: '3' },
    fraction2: { numerator: '1', denominator: '6' },
    lcd: 6, // Least Common Denominator of fraction1 and fraction2 = denom1 * denom2 / gcd
    ecd: 18, // Easiest Common Denominator of fraction1 and fraction2 = denom1 * denom2
  },
  state6: {
    step: 0, // Do not change this

    // Defines the game screen 6
    fraction1: { numerator: '1', denominator: '4' },
    fraction2: { numerator: '1', denominator: '8' },
    lcd: 8, // Least Common Denominator of fraction1 and fraction2 = denom1 * denom2 / gcd
    ecd: 32, // Easiest Common Denominator of fraction1 and fraction2 = denom1 * denom2
  }
};
