import { Fraction } from './bar';

export type GameScreen = 1 | 2;

interface Description {
  title: GameScreen;
  oneliner: string;
  description: string;
}

export const descriptions: Description[] = [
  {
    title: 1,
    oneliner: 'Compare fractions using interactive chocolate bars',
    description: 'In this engaging game, students compare two fractions by manipulating virtual chocolate bars. Each bar can be split into equal parts and pieces can be selected to represent fractions. Students first break the first chocolate bar into the correct number of pieces (denominator) and select the required pieces (numerator) to represent the first fraction. Once correct, they repeat the process with the second bar for the second fraction. The game provides immediate visual feedback with checkmarks and animations. After both fractions are correctly represented, students can compare them visually side by side and choose which fraction is larger. The game reinforces fraction concepts through tactile interaction and visual representation, making abstract fraction comparison concrete and intuitive.'
  },
  {
    title: 2,
    oneliner: 'Practice comparing fractions with different denominators',
    description: 'Building on the visual understanding from the first screen, this level challenges students with more complex fraction comparisons. Students continue using the chocolate bar visualization but now work with fractions that have different denominators. The interactive process remains the same - splitting bars and selecting pieces - but the focus shifts to understanding how fractions with different denominators can be compared. The visual representation helps students see why, for example, 2/3 is larger than 3/5, even though 3 and 5 are larger numbers. The game provides scaffolded support through immediate feedback and encourages students to make mathematical connections between visual representations and numerical values.'
  }
];


interface State1 {
  fraction1: Fraction;  // First fraction to compare
  fraction2: Fraction;  // Second fraction to compare 
}


export interface GameState {
  screen: GameScreen;
  state1: State1;
}

export const initialGameState: GameState = {
  screen: 1,
  state1: {
    fraction1: { num: 1, denom: 2 },
    fraction2: { num: 1, denom: 3 },
  }
};