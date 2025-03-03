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
  }
};