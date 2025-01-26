export type GameScreen = 1 | 2 | 3;

interface Description {
  title: GameScreen;
  oneliner: string;
  description: string;
}

export const descriptions: Description[] = [
  {
    title: 1,
    oneliner: 'Convert improper fraction to mixed number using legos',
    description: 'In this interactive game, students learn to convert improper fractions to mixed numbers using virtual lego blocks. Starting with a given improper fraction, students first select the correct holder that matches the denominator. They then create and organize lego pieces, with each piece representing a fractional part. By filling holders completely and counting leftover pieces, students visually understand how many whole numbers and remaining fractions make up the improper fraction. The game guides students through each step, from creating the right number of pieces to arranging them in holders, ultimately helping them write the final mixed number answer.'
  },
  {
    title: 2,
    oneliner: 'Practice converting fractions using visual division method',
    description: 'This screen reinforces fraction conversion skills using a different visual approach. Students work with a new improper fraction, using lego holders and pieces to understand division. They must identify how many pieces are needed and what size each piece should be based on the denominator. The game walks through the process of organizing these pieces into complete sets (representing whole numbers) and identifying remainders (representing the fractional part). Through this hands-on visualization, students develop a deeper understanding of how division relates to converting improper fractions to mixed numbers.'
  },
  {
    title: 3,
    oneliner: 'Master mixed number conversion independently',
    description: 'The final screen challenges students to apply their learned skills independently. Working with a new improper fraction, students must convert it to a mixed number without the step-by-step visual guidance of previous screens. This tests their understanding of the conversion process and their ability to work through the steps mentally. The screen helps reinforce the concept that an improper fraction can be viewed as a division problem, where the numerator is divided by the denominator to find the whole number and remainder.'
  }
]

export interface Fraction {
    numerator: number;
    denominator: number;
}

export interface GameState1 {
    step: number;
    fraction: Fraction;
    denomOptions: number[];
    piecesAtYOne: number;
}

export interface GameState2 {
    step: number;
    fraction: Fraction;
    denomOptions: number[];
}

export interface GameState3 {
    step: number;
    fraction: Fraction;
}


export interface GameState {
    screen: GameScreen;
    state1: GameState1;
    state2: GameState2;
    state3: GameState3;
}

export const initialGameState: GameState = {
    screen: 1,
    state1: {
        step: 0,
        fraction: {
            numerator: 7,
            denominator: 4,
        },
        denomOptions: [6, 3, 4],
        piecesAtYOne: 0, // DO NOT CHANGE
    },
    state2: {
        step: 0,
        fraction: {
            numerator: 8,
            denominator: 3,
        },
        denomOptions: [6, 4, 3], // Must have the correct denominator
    },
    state3: {
        step: 0,
        fraction: {
            numerator: 9,
            denominator: 5,
        },
    },
};