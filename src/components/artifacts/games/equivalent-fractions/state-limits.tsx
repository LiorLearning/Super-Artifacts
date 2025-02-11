import { GameState } from "./game-state";

export default function checkGameStateLimits(state?: Partial<GameState>): boolean {
  if (!state) return false;

  const isValidNumber = (num: number) => {
    return num > 0 && num < 100;
  };

  const areEquivalent = (num1: number, den1: number, num2: number, den2: number) => {
    return num1 * den2 === num2 * den1;
  };

  if (state.state1) {
    const { numerator1, denominator1, denominator2 } = state.state1.question;
    if (!isValidNumber(numerator1) || !isValidNumber(denominator1) || !isValidNumber(denominator2)) return false;
    if (numerator1 >= denominator1) return false;
    if (denominator2 <= denominator1) return false;
  }

  if (state.state2) {
    const { numerator1, denominator1, denominator2, denominator3 } = state.state2.question;
    if (!isValidNumber(numerator1) || !isValidNumber(denominator1) || 
        !isValidNumber(denominator2) || !isValidNumber(denominator3)) return false;
    if (numerator1 >= denominator1) return false;
    if (denominator2 <= denominator1 || denominator3 >= denominator1) return false;
  }

  if (state.state3) {
    const { fraction1, fraction2, fraction3, answers } = state.state3;
    
    if (!isValidNumber(fraction1.numerator) || !isValidNumber(fraction1.denominator) ||
        !isValidNumber(fraction2.numerator) || !isValidNumber(fraction2.denominator) ||
        !isValidNumber(fraction3.numerator) || !isValidNumber(fraction3.denominator)) return false;
    
    if (!areEquivalent(fraction1.numerator, fraction1.denominator, 
                       fraction2.numerator, fraction2.denominator)) return false;
    if (!areEquivalent(fraction2.numerator, fraction2.denominator, 
                       fraction3.numerator, fraction3.denominator)) return false;
    
    if (!isValidNumber(answers.multiplier1) || !isValidNumber(answers.multiplier2) || 
        !isValidNumber(answers.multiplier3)) return false;
  }

  if (state.state4) {
    const { question1, question2 } = state.state4;
    
    if (!isValidNumber(question1.numerator1) || !isValidNumber(question1.denominator1) || 
        !isValidNumber(question1.denominator2)) return false;
    if (!isValidNumber(question2.numerator1) || !isValidNumber(question2.numerator2) || 
        !isValidNumber(question2.denominator2)) return false;
        
    if (question1.numerator1 >= question1.denominator1) return false;
    if (question2.numerator1 >= question2.denominator2 || 
        question2.numerator2 >= question2.denominator2) return false;
  }

  return true;
}