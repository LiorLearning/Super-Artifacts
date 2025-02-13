import { json } from "stream/consumers";
import { GameState } from "./game-state";

interface ValidationResult {
  isValid: boolean;
  reason?: string;
}

interface Fraction {
  numerator: number;
  denominator: number;
}

const isValidNumber = (num: number, name: string): ValidationResult => {
  if (num <= 0 || num >= 100) {
    return { isValid: false, reason: `Invalid state: ${name} (${num}) must be between 0 and 100` };
  }
  return { isValid: true };
};

const areEquivalent = (num1: number, den1: number, num2: number, den2: number): ValidationResult => {
  if (num1 * den2 !== num2 * den1) {
    return { isValid: false, reason: `Invalid state: Fractions ${num1}/${den1} and ${num2}/${den2} are not equivalent` };
  }
  return { isValid: true };
};

export default function checkGameStateLimits(state?: Partial<GameState>): ValidationResult {
  if (!state) return { isValid: false, reason: "No game state provided" };

  if (state.state1) {
    const { numerator1, denominator1, denominator2 } = state.state1.question;
    
    const numResult = isValidNumber(numerator1, "numerator");
    if (!numResult.isValid) return { isValid: false, reason: `Screen 1: ${numResult.reason}` };
    
    const denom1Result = isValidNumber(denominator1, "first denominator");
    if (!denom1Result.isValid) return { isValid: false, reason: `Screen 1: ${denom1Result.reason}` };
    
    const denom2Result = isValidNumber(denominator2, "second denominator");
    if (!denom2Result.isValid) return { isValid: false, reason: `Screen 1: ${denom2Result.reason}` };
    
    if (numerator1 >= denominator1) {
      return { isValid: false, reason: `Screen 1: Numerator (${numerator1}) must be less than denominator (${denominator1})` };
    }
    if (denominator2 <= denominator1) {
      return { isValid: false, reason: `Screen 1: Second denominator (${denominator2}) must be greater than first denominator (${denominator1})` };
    }
  }

  if (state.state2) {
    const { numerator1, denominator1, denominator2, denominator3 } = state.state2.question;
    
    const numResult = isValidNumber(numerator1, "numerator");
    if (!numResult.isValid) return { isValid: false, reason: `Screen 2: ${numResult.reason}` };
    
    for (const [name, denom] of [["first", denominator1], ["second", denominator2], ["third", denominator3]]) {
      const denomResult = isValidNumber(denom as number, `${name} denominator`);
      if (!denomResult.isValid) return { isValid: false, reason: `Screen 2: ${denomResult.reason}` };
    }
    
    if (numerator1 >= denominator1) {
      return { isValid: false, reason: `Screen 2: Numerator (${numerator1}) must be less than denominator (${denominator1})` };
    }
    if (denominator2 <= denominator1 || denominator3 >= denominator1) {
      return { isValid: false, reason: `Screen 2: Invalid denominator sequence (${denominator2}, ${denominator1}, ${denominator3})` };
    }
  }

  if (state.state3) {
    const { fraction1, fraction2, fraction3, answers } = state.state3;
    
    for (const [name, frac] of [["first", fraction1], ["second", fraction2], ["third", fraction3]]) {
      const numResult = isValidNumber((frac as Fraction).numerator, `${name} numerator`);
      if (!numResult.isValid) return { isValid: false, reason: `Screen 3: ${numResult.reason}` };
      
      const denomResult = isValidNumber((frac as Fraction).denominator, `${name} denominator`);
      if (!denomResult.isValid) return { isValid: false, reason: `Screen 3: ${denomResult.reason}` };
    }
    
    const equiv1Result = areEquivalent(fraction1.numerator, fraction1.denominator, fraction2.numerator, fraction2.denominator);
    if (!equiv1Result.isValid) return { isValid: false, reason: `Screen 3: ${equiv1Result.reason}` };
    
    const equiv2Result = areEquivalent(fraction2.numerator, fraction2.denominator, fraction3.numerator, fraction3.denominator);
    if (!equiv2Result.isValid) return { isValid: false, reason: `Screen 3: ${equiv2Result.reason}` };
    
    for (const [name, mult] of [["first", answers.multiplier1], ["second", answers.multiplier2], ["third", answers.multiplier3]]) {
      const multResult = isValidNumber(Number(mult), `${name} multiplier`);
      if (!multResult.isValid) return { isValid: false, reason: `Screen 3: ${multResult.reason}` };
    }
  }

  if (state.state4) {
    const { question1, question2 } = state.state4;
    
    const numResult1 = isValidNumber(question1.numerator1, "first numerator");
    if (!numResult1.isValid) return { isValid: false, reason: `Screen 4: ${numResult1.reason}` };
    
    const denomResult1 = isValidNumber(question1.denominator1, "first denominator");
    if (!denomResult1.isValid) return { isValid: false, reason: `Screen 4: ${denomResult1.reason}` };
    
    const denomResult2 = isValidNumber(question1.denominator2, "second denominator");
    if (!denomResult2.isValid) return { isValid: false, reason: `Screen 4: ${denomResult2.reason}` };
    
    if (question1.numerator1 >= question1.denominator1) {
      return { isValid: false, reason: `Screen 4: First numerator (${question1.numerator1}) must be less than denominator (${question1.denominator1})` };
    }
    
    if (question2.numerator1 >= question2.denominator2 || question2.numerator2 >= question2.denominator2) {
      return { isValid: false, reason: `Screen 4: Numerators (${question2.numerator1}, ${question2.numerator2}) must be less than denominator (${question2.denominator2})` };
    }
  }

  return { isValid: true };
}