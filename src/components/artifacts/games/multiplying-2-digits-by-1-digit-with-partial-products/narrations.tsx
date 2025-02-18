interface Message {
  role: string;
  content: string;
  send: boolean;
}



export const narrations: { [key: string]: Message } = {
  Screen1Step1Message1: {
    role: 'agent',
    content: 'Welcome to the Level ${a}',
    send: true
  }
};