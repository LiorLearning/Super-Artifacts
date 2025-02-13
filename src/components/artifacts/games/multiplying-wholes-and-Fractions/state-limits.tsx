import { GameState, Fraction } from "./game-state";

interface ValidationResult {
  isValid: boolean;
  reason?: string;
}

const isValidFraction = (fraction: Fraction): ValidationResult => {
  if (fraction.numerator <= 0 || fraction.numerator > 12) {
    return { isValid: false, reason: `Invalid state: Numerator (${fraction.numerator}) must be between 1 and 12` };
  }
  if (fraction.denominator <= 0 || fraction.denominator > 12) {
    return { isValid: false, reason: `Invalid state: Denominator (${fraction.denominator}) must be between 1 and 12` };
  }
  if (fraction.numerator >= fraction.denominator) {
    return { isValid: false, reason: `Invalid state: Numerator (${fraction.numerator}) must be less than denominator (${fraction.denominator})` };
  }
  return { isValid: true };
};

const isValidWhole = (whole: number): ValidationResult => {
  if (whole < 1 || whole > 5) {
    return { isValid: false, reason: `Invalid state: Whole number (${whole}) must be between 1 and 5` };
  }
  return { isValid: true };
};

const isValidProduct = (whole: number, fraction: Fraction): ValidationResult => {
  const product = whole * fraction.numerator;
  if (product > 24) {
    return { isValid: false, reason: `Invalid state: Product (${whole} × ${fraction.numerator}/${fraction.denominator}) cannot exceed 24` };
  }
  return { isValid: true };
};

export default function checkGameStateLimits(state?: Partial<GameState>): ValidationResult {
  if (!state) return { isValid: false, reason: "No game state provided" };

  if (state.state1) {
    const { fraction, whole } = state.state1;
    
    const fractionResult = isValidFraction(fraction);
    if (!fractionResult.isValid) return { isValid: false, reason: `Screen 1: ${fractionResult.reason}` };
    
    const wholeResult = isValidWhole(whole);
    if (!wholeResult.isValid) return { isValid: false, reason: `Screen 1: ${wholeResult.reason}` };
    
    const productResult = isValidProduct(whole, fraction);
    if (!productResult.isValid) return { isValid: false, reason: `Screen 1: ${productResult.reason}` };
  }

  if (state.state2) {
    const { fraction, whole } = state.state2;
    
    const fractionResult = isValidFraction(fraction);
    if (!fractionResult.isValid) return { isValid: false, reason: `Screen 2: ${fractionResult.reason}` };
    
    const wholeResult = isValidWhole(whole);
    if (!wholeResult.isValid) return { isValid: false, reason: `Screen 2: ${wholeResult.reason}` };
    
    const productResult = isValidProduct(whole, fraction);
    if (!productResult.isValid) return { isValid: false, reason: `Screen 2: ${productResult.reason}` };
  }

  if (state.state3) {
    const { questions } = state.state3;
    
    if (!questions.length) {
      return { isValid: false, reason: "Screen 3: No questions provided" };
    }
    
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      
      const fractionResult = isValidFraction(question.fraction);
      if (!fractionResult.isValid) return { isValid: false, reason: `Screen 3, Question ${i + 1}: ${fractionResult.reason}` };
      
      const wholeResult = isValidWhole(question.whole);
      if (!wholeResult.isValid) return { isValid: false, reason: `Screen 3, Question ${i + 1}: ${wholeResult.reason}` };
      
      const productResult = isValidProduct(question.whole, question.fraction);
      if (!productResult.isValid) return { isValid: false, reason: `Screen 3, Question ${i + 1}: ${productResult.reason}` };
    }
  }

  return { isValid: true };
}