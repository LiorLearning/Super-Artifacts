export const descriptions = [
  {
    title: 'zero',
    oneliner: 'Introduction to fraction to decimal',
    description: 'This screen introduces the concept of fraction to decimal using a visual fraction metaphor. It presents an initial fraction (e.g., 2/3) and asks students to think about how many pieces they would need out of a larger denominator (e.g., 6) to represent the same amount. The screen features a simple interface with the question and a "Let\'s find out" button to proceed to the interactive exercises.'
  }
];

export type GameScreen = 'zero' | 'first' | 'second' | 'third' | 'fourth' | 'fifth';

interface State1 {
  step: number;
}

interface State2 {
  step: number;
  showHint1: boolean;
  showHint2: boolean;
}

interface State3 {
  step: number;
  showHint1: boolean;
}

interface State4 {
  step: number;
}

interface State5 {
  step: number;
}

interface Question {
  question1 : {
    numerator: number;
    denominator: number;
  }
  question2 : {
    numerator: number;
    denominator: number;
  }
  question3 : {
    numerator: number;
    denominator: number;
  }
  question4 : {
    numerator: number;
    denominator: number;
  }
  question5 : {
    numerator: number;
    denominator: number;
  }
  question6 : number
  question7 : {
    numerator: number;
    denominator: number;
  }
  question8 : {
    numerator: number;
    denominator: number;
  }
}

export interface GameState {
  question: Question;
  screen: GameScreen;
  state1: State1;
  state2: State2;
  state3: State3;
  state4: State4;
  state5: State5;
}

export const initialGameState: GameState = {
  screen: 'zero',
  question: {
    question1: {
      numerator: 2,
      denominator: 10,
    },
    question2: {
      numerator: 7,
      denominator: 10,
    },
    question3: {
      numerator: 7,
      denominator: 100,
    },
    question4: {
      numerator: 21,
      denominator: 100,
    },
    question5: {
      numerator: 217,
      denominator: 100,
    },
    question6: 1.7,
    question7: {
      numerator: 17,
      denominator: 100,
    },
    question8: {
      numerator: 21,
      denominator: 10,
    }
  },
  state1: {
    step: 0,
  },
  state2: {
    step: 1,
    showHint1: false,
    showHint2: false,
  },
  state3: {
    step: 0,
    showHint1: false,
  },
  state4: {
    step: 0,
  },
  state5: {
    step: 0,
  },
};

