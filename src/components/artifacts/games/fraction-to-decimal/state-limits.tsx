import { GameState } from "./game-state";

export default function checkGameStateLimits(state?: Partial<GameState>): boolean {
  if (!state) return false;

  const isValidFraction = (fraction: { numerator: number, denominator: number }) => {
    if (fraction.denominator !== 10 && fraction.denominator !== 100) return false;
    
    if (fraction.numerator <= 0 || fraction.numerator >= 1000) return false;
    
    if (fraction.denominator === 10 && fraction.numerator >= 100) return false;
    
    return true;
  };

  if (state.question) {
    const { 
      question1, question2, question3, question4, 
      question5, question7, question8 
    } = state.question;

    const fractions = [
      question1, question2, question3, question4, 
      question5, question7, question8
    ];

    if (!fractions.every(isValidFraction)) return false;

    if (state.question.question6 <= 0 || 
        state.question.question6 >= 10 || 
        !Number.isFinite(state.question.question6)) return false;
  }

  return true;
}