import { GameState, Fraction } from "./game-state";

interface ValidationResult {
  isValid: boolean;
  reason?: string;
}

const isValidFraction = (fraction: Fraction): ValidationResult => {
  if (fraction.numerator <= 0 || fraction.denominator <= 0) {
    return { isValid: false, reason: `Invalid state: Numerator and denominator must be positive (got ${fraction.numerator}/${fraction.denominator})` };
  }
  if (fraction.denominator > 12) {
    return { isValid: false, reason: `Invalid state: Denominator (${fraction.denominator}) cannot exceed 12` };
  }
  if (fraction.numerator <= fraction.denominator) {
    return { isValid: false, reason: `Invalid state: Numerator (${fraction.numerator}) must be greater than denominator (${fraction.denominator}) for improper fraction` };
  }
  if (fraction.numerator > fraction.denominator * 3) {
    return { isValid: false, reason: `Invalid state: Numerator (${fraction.numerator}) cannot exceed 3 times the denominator (${fraction.denominator})` };
  }
  return { isValid: true };
};

const isValidDenomOptions = (options: number[], correctDenom: number): ValidationResult => {
  if (options.length !== 3) {
    return { isValid: false, reason: `Invalid state: Must have exactly 3 denominator options (got ${options.length})` };
  }
  if (!options.includes(correctDenom)) {
    return { isValid: false, reason: `Invalid state: Options must include the correct denominator (${correctDenom})` };
  }
  if (options.some(opt => opt <= 0 || opt > 12)) {
    return { isValid: false, reason: `Invalid state: All denominator options must be between 1 and 12` };
  }
  if (new Set(options).size !== options.length) {
    return { isValid: false, reason: `Invalid state: Denominator options must be unique` };
  }
  return { isValid: true };
};

export default function checkGameStateLimits(state?: Partial<GameState>): ValidationResult {
  if (!state) return { isValid: false, reason: "No game state provided" };

  if (state.state1) {
    const { fraction, denomOptions } = state.state1;
    
    const fractionResult = isValidFraction(fraction);
    if (!fractionResult.isValid) return { isValid: false, reason: `Screen 1: ${fractionResult.reason}` };
    
    const optionsResult = isValidDenomOptions(denomOptions, fraction.denominator);
    if (!optionsResult.isValid) return { isValid: false, reason: `Screen 1: ${optionsResult.reason}` };
  }

  if (state.state2) {
    const { fraction, denomOptions } = state.state2;
    
    const fractionResult = isValidFraction(fraction);
    if (!fractionResult.isValid) return { isValid: false, reason: `Screen 2: ${fractionResult.reason}` };
    
    const optionsResult = isValidDenomOptions(denomOptions, fraction.denominator);
    if (!optionsResult.isValid) return { isValid: false, reason: `Screen 2: ${optionsResult.reason}` };
  }

  if (state.state3) {
    const { fraction } = state.state3;
    
    const fractionResult = isValidFraction(fraction);
    if (!fractionResult.isValid) return { isValid: false, reason: `Screen 3: ${fractionResult.reason}` };
  }

  return { isValid: true };
}