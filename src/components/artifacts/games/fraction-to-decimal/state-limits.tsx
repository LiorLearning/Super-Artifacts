import { GameState } from "./game-state";

interface ValidationResult {
  isValid: boolean;
  reason?: string;
}

const isValidFraction = (fraction: { numerator: number, denominator: number }): ValidationResult => {
  if (fraction.denominator !== 10 && fraction.denominator !== 100) {
    return { isValid: false, reason: `Invalid state: Denominator (${fraction.denominator}) must be 10 or 100` };
  }
  
  if (fraction.numerator <= 0 || fraction.numerator >= 1000) {
    return { isValid: false, reason: `Invalid state: Numerator (${fraction.numerator}) must be between 0 and 1000` };
  }
  
  if (fraction.denominator === 10 && fraction.numerator >= 100) {
    return { isValid: false, reason: `Invalid state: Numerator (${fraction.numerator}) must be less than 100 when denominator is 10` };
  }
  
  return { isValid: true };
};

export default function checkGameStateLimits(state?: Partial<GameState>): ValidationResult {
  if (!state) return { isValid: false, reason: "No game state provided" };

  if (state.question) {
    const { question1, question2, question3, question4, question5, question7, question8 } = state.question;

    const fractions = [question1, question2, question3, question4, question5, question7, question8];
    
    for (const [index, fraction] of fractions.entries()) {
      const result = isValidFraction(fraction);
      if (!result.isValid) {
        return { isValid: false, reason: `Question ${index + 1}: ${result.reason}` };
      }
    }

    if (state.question.question6 <= 0 || state.question.question6 >= 10 || !Number.isFinite(state.question.question6)) {
      return { isValid: false, reason: `Question 6: Value (${state.question.question6}) must be a finite number between 0 and 10` };
    }
  }

  return { isValid: true };
}