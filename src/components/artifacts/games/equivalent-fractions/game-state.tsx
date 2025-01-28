export type GameScreen = 0 | 1 | 2 | 3 | 4;

interface Description {
  title: GameScreen;
  oneliner: string;
  description: string;
}
export const descriptions: Description[] = [
  {
    title: 0,
    oneliner: 'Introduction to equivalent fractions with chocolate bars',
    description: 'This screen introduces the concept of equivalent fractions using a visual chocolate bar metaphor. It presents an initial fraction (e.g., 2/3) and asks students to think about how many pieces they would need out of a larger denominator (e.g., 6) to represent the same amount. The screen features a simple interface with the question and a "Let\'s find out" button to proceed to the interactive exercises.'
  },
  {
    title: 1,
    oneliner: 'Split chocolate bars to discover equivalent fractions',
    description: 'Students learn to create equivalent fractions by splitting chocolate bars into equal pieces. They first select a knife (multiplier) to split the original fraction into more pieces, then identify how many pieces they need to maintain the same proportion. The screen provides immediate visual feedback with the chocolate bar representation and includes step-by-step guidance. Students must select the correct number of pieces and input the resulting equivalent fraction to proceed.'
  },
  {
    title: 2,
    oneliner: 'Create multiple equivalent fractions using split and merge',
    description: 'This screen introduces both splitting and merging concepts to create equivalent fractions. Students first split a chocolate bar into smaller pieces using a knife tool, then use honey to merge pieces back together, creating two different equivalent fractions. The interactive visualization shows how the same amount can be represented with different denominators, and students must complete both splitting and merging operations correctly to advance.'
  },
  {
    title: 3,
    oneliner: 'Identify patterns in creating equivalent fractions',
    description: 'The final interactive screen focuses on pattern recognition in equivalent fractions. Students work with multiple representations of the same fraction, identifying the multipliers used to create each equivalent fraction. They must understand both multiplication and division relationships between fractions, input the correct multipliers, and explain their reasoning. The screen includes multiple steps of reflection and verification, helping students understand the systematic approach to creating equivalent fractions.'
  },
  {
    title: 4,
    oneliner: 'Apply equivalent fraction concepts in complex problems',
    description: 'This screen tests students\' comprehensive understanding of equivalent fractions through more challenging problems. Students must work with multiple fractions simultaneously, identifying relationships between numerators and denominators. They need to determine correct multipliers and divisors to create equivalent fractions, demonstrating their mastery of the concept. The screen includes step-by-step verification and requires students to show their work through input fields for both operations and final answers.'
  }
]

export interface Screen1 {
  step: {
    id: number,
    text: string
  },
  question:{
    numerator1: number
    denominator1: number
    denominator2: number
  },
}

export interface Screen2 {
  step: {
    id: number,
    text: string
  },
  substep: number,

  question: {
    numerator1: number
    denominator1: number
    denominator2: number
    denominator3: number
  },
}

export interface Screen3 {
  step: number,
  fraction1: {
    numerator: number
    denominator: number
  }
  fraction2: {
    numerator: number
    denominator: number
  }
  fraction3: {
    numerator: number
    denominator: number
  }
  question: {
    numerator1: number
    denominator1: number
    denominator2: number
    denominator3: number
  }

  answers: {
    numerator: number
    multiplier1: number
    multiplier2: number
    multiplier3: number
  }
}

export interface Screen4 {
  step: number,
  question1:{
    numerator1: number
    denominator1: number
    denominator2: number
  },
  question2:{
    numerator1: number
    numerator2: number
    denominator2: number
  }
}

export interface GameState {
  screen: number,
  state1: Screen1,
  state2: Screen2,
  state3: Screen3,
  state4: Screen4,
}

export const initialGameState: GameState = {
  screen: 0,
  state1: {
    step: {
      id: 1,
      text: "CREATE 9 PIECES" // If changing denominator, change this text
    },
    question:{
      numerator1: 2,
      denominator1: 3,
      denominator2: 9
    },
  },
  state2: {
    step: {
      id: 1,
      text: "CREATE 9 PIECES"
    },
    substep: 0,
    question: {
      numerator1: 4,
      denominator1: 6,
      denominator2: 12,
      denominator3: 3
    }
  },
  state3: {
    step: 1,
    fraction1: {
      numerator: 4,
      denominator: 6
    },
    fraction2: {
      numerator: 8,
      denominator: 12
    },
    fraction3: {
      numerator: 2,
      denominator: 3
    },
    question: {
      numerator1: 4,
      denominator1: 6,
      denominator2: 12,
      denominator3: 3
    },
    answers: {
      numerator: 0,
      multiplier1: 3,
      multiplier2: 2,
      multiplier3: 3
    }
  },
  state4: {
    step: 1,
    question1: {
      numerator1: 2,
      denominator1: 3,
      denominator2: 15
    },
    question2: {
      numerator1: 2,
      numerator2: 8,
      denominator2: 12
    }
  }
};