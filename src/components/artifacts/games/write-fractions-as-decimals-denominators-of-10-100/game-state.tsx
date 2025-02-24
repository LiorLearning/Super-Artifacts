export const descriptions = [
  {
    title: 'zero',
    oneliner: 'Introduction to converting fractions to decimals',
    description: 'This screen introduces students to the concept of converting fractions to decimals using visual representations. It presents a simple interface with an initial fraction and prompts students to think about how this fraction can be represented as a decimal. The screen features a "Let\'s Figure Out" button that leads to the interactive exercises.'
  },
  {
    title: 'first',
    oneliner: 'Convert visual fractions to decimals using chocolate bars',
    description: 'Students work with a visual chocolate bar representation to understand how fractions convert to decimals. They can split and join chocolate pieces to create equal parts, select specific pieces, and learn how these selections translate to decimal notation. The interface guides students through the process of identifying whole numbers and decimal places, with immediate feedback on their inputs and interactive visual aids to reinforce the connection between fractions and decimals.'
  },
  {
    title: 'second',
    oneliner: 'Convert fractions to decimals with tenths',
    description: 'This screen focuses on converting fractions with denominators of ten into decimals. Students work with visual representations and input fields for whole numbers and tenths. The interface provides immediate feedback on their answers and helps them understand the relationship between fractions and their decimal equivalents, particularly focusing on the tenths place value.'
  },
  {
    title: 'third',
    oneliner: 'Convert fractions to decimals with hundredths',
    description: 'Students learn to convert fractions with denominators of hundred into decimals. The screen features a two-part exercise where students first work with visual representations to understand the concept, then practice converting given fractions to decimals. It includes input fields for whole numbers, tenths, and hundredths, with a hint system available for additional support.'
  },
  {
    title: 'fourth',
    oneliner: 'Convert decimals back to fractions',
    description: 'This screen reverses the previous learning by having students convert decimals back to fractions. Students use visual aids and tools to understand how decimals can be represented as fractions. They use a knife selector tool to split representations into equal parts and learn how decimal numbers can be expressed as equivalent fractions.'
  },
  {
    title: 'fifth',
    oneliner: 'Master decimal and fraction conversions',
    description: 'The final screen combines all previous learning objectives, having students work with both fraction-to-decimal and decimal-to-fraction conversions. Students demonstrate their understanding by completing conversion exercises in both directions, working with whole numbers, tenths, and hundredths. The screen provides immediate feedback and celebrates successful completion of the entire learning module.'
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
