interface Message {
  role: string;
  content: string;
  send: boolean;
}



export const narrations: { [key: string]: Message } = {
  Screen1Step0Message1: {
    role: 'agent',
    content: 'Can you help Tilo find ${number1} times ${number2}? Ready to begin?',
    send: true
  },
  Screen1Step1Message1: {
    role: 'agent',
    content: 'Tilo has something that can make it easier for us to multiply ${number1} and ${number2}',
    send: true
  },
  Screen1Step2Message1: {
    role: 'agent',
    content: 'Let\'s start by helping Tilo visualize ${number1} times ${number2} on the tile board',
    send: true
  },
  Screen1Step2Message2: {
    role: 'agent',
    content: 'We first take ${number2} blocks vertically',
    send: true
  },
  Screen1Step2Message3: {
    role: 'agent',
    content: 'And then ${number2} times ${number1} blocks gives us ${number1} times ${number2}',
    send: true
  },
  Screen1Step2Message4: {
    role: 'agent',
    content: 'But that\'s a LOT of blocks! Counting each one will take forever. Maybe breaking it into simpler parts will help',
    send: true
  },
  Screen2Step0Message1: {
    role: 'agent',
    content: 'Let’s break the bigger number into two parts using the slider',
    send: true
  },
  Screen2Step0Message2: {
    role: 'agent',
    content: 'Now let’s try to split the smaller number in the same way',
    send: true
  },
  Screen2Step0Message3: {
    role: 'agent',
    content: 'Great, you have split ${number1} x ${number2} into 4 parts, now fill in the partial products in the input boxes',
    send: true
  },
  Screen2Step0Message4: {
    role: 'admin',
    content: 'User is solving a 2×2 digit partial product multiplication problem where they need to split a two-digit number into tens and ones using a slider. The user has split ${number} into ${a} and ${b}, but the correct split is ${c} and ${d}. Encourage the user to think about how tens and ones add up to form the number. Don\'t reveal the correct split.',
    send: true
  },
  Screen2Step0Message5: {
    role: 'agent',
    content: 'Try using the hint button to see how to split the number correctly.',
    send: true
  },
  Screen2Step0Message6: {
    role: 'agent',
    content: 'Orange blocks represent tens, and blue represent the ones. Can you tell how many tens does ${number} have?',
    send: true
  },
  Screen2Step0Message7: {
    role: 'agent',
    content: 'The blue blocks are remaining ones, how many can you count?',
    send: true
  },
  Screen2Step0Message8: {
    role: 'agent',
    content: 'Now let\'s use the same logic to split ${number}',
    send: true
  },
  Screen2Step4Message1: {
    role: 'agent',
    content: 'You made Tilo super happy. Let\'s add the partial products now',
    send: true
  },
  Screen2Step4Message2: {
    role: 'agent',
    content: 'You got the answer, ${number1} times ${number2} is ${answer}!',
    send: true
  },
  
};