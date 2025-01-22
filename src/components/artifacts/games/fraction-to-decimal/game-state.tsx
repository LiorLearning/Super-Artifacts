export const desc = ``;

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
  screen: 'fifth',
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
      denominator: 10,
    },
    question8: {
      numerator: 21,
      denominator: 100,
    }
  },
  state1: {
    step: 0,
  },
  state2: {
    step: 0,
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

