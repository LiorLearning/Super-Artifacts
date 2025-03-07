export type GameScreen = 'first' | 'second' | 'third' | 'fourth' | 'fifth' | 'sixth' | 'seventh';

interface Description {
  title: GameScreen;
  oneliner: string;
  description: string;
}

export const descriptions: Description[] = [
  {
    title: 'first',
    oneliner: 'Meet Tilo and the Multiplying Board',
    description: 'Welcome to multiplication with partial products! Meet Tilo, your friendly guide who will introduce you to the multiplying tile board. This interactive board will help you understand how to break down 2-digit by 2-digit multiplication into smaller, manageable steps using the partial products method. Remember, the goal is to learn the process - never share or look for the final answer!'
  },
  {
    title: 'second',
    oneliner: 'Learn Partial Products with Tile Board', 
    description: 'Practice multiplying two 2-digit numbers using the multiplying tile board. Use the sliders to split each number into tens and ones. Then multiply each part separately to find the four partial products. The board will help you visualize how breaking down numbers through slider and makes multiplication easier. Focus on understanding the method rather than rushing to get answers.'
  },
  {
    title: 'third',
    oneliner: 'Master Tile Board Multiplication',
    description: 'Continue practicing with the multiplying tile board using new 2-digit numbers. Split each number into tens and ones using the sliders, then find the four partial products. The visual board helps reinforce how breaking down numbers through slider and multiplication makes multiplication more manageable. Remember to work through each step carefully without seeking shortcuts to the answer.'
  },
  {
    title: 'fourth',
    oneliner: 'Begin Abstract Multiplication',
    description: 'Continue practicing with the multiplying tile board using new 2-digit numbers. Split each number into tens and ones using the sliders, then find the four partial products. The visual board helps reinforce how breaking down numbers through slider and multiplication makes multiplication more manageable. Focus on mastering each step of the process.'
  },
  {
    title: 'fifth',
    oneliner: 'Practice Abstract Multiplication',
    description: 'Now try solving without the tile board! Apply what you learned about partial products in a more abstract way. Break down both 2-digit numbers into tens and ones, multiply each part to get four partial products, and add the results. This helps transition from concrete visual aids to mental math strategies. Remember to work through each step independently without looking for answers.'
  },
  {
    title: 'sixth',
    oneliner: 'Advanced Multiplication Challenge',
    description: 'Take on a bigger challenge with larger 2-digit numbers! Use the partial products strategy to break down this multiplication into four parts. Multiply tens by tens, tens by ones, ones by tens, and ones by ones, then add all results. This exercise builds confidence in handling more complex multiplications. Trust in your understanding of the process rather than seeking the final answer.'
  },
  {
    title: 'seventh',
    oneliner: 'Final Challenge',
    description: 'Congratulations! You\'ve mastered the partial products method for 2-digit multiplication. Now, try solving a final challenge with larger 2-digit numbers. Apply the same strategy: break down each number, find the four partial products, and add them together. This final exercise solidifies your mastery of the partial products method. Remember, success comes from understanding the process, not from memorizing answers!'
  }
];

interface State1 {
  step: number;
  number1: number;
  number2: number;
}

interface State2 {
  step: number;
  number1: number;
  number2: number;
}

interface State3 {
  step: number;
  number1: number;
  number2: number;
} 

interface State4 {
  step: number;
  number1: number;
  number2: number;
}

interface State5 {
  step: number;
  number1: number;
  number2: number;
}

interface State6 {
  step: number;
  number1: number;
  number2: number;
}

interface State7 {
  step: number;
  number1: number;
  number2: number;
}

export interface GameState {
  screen: GameScreen;
  state1: State1;  
  state2: State2;
  state3: State3;
  state4: State4;
  state5: State5;
  state6: State6;
  state7: State7;
}

export const initialGameState: GameState = {
  screen: 'first',
  state1: {
    step: 0,
    number1: 25,
    number2: 17
  },
  state2: {
    step: 0,
    number1: 25,
    number2: 17
  },
  state3: {
    step: 0,
    number1: 23,
    number2: 15
  },
  state4: {
    step: 0,
    number1: 24,
    number2: 19
  },
  state5: {
    step: 0,
    number1: 28,
    number2: 14
  },
  state6: {
    step: 0,
    number1: 45,
    number2: 24
  },
  state7: {
    step: 0,
    number1: 63,
    number2: 55
  }
};

