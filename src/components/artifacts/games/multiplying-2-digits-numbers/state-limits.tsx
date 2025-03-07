import { GameState } from "./game-state";

interface ValidationResult {
  isValid: boolean;
  reason?: string;
}

const isValidNumber1 = (number1: number, screen: string): ValidationResult => {
  // For screens 1-4, number1 should be between 10-25
  if (['first', 'second', 'third', 'fourth'].includes(screen)) {
    if (number1 <= 10 || number1 > 25 || number1 === 20) {
      return { isValid: false, reason: `Invalid state: First number (${number1}) must be between 10 and 25 for this screen and not 20` };
    }
  } else if (['fifth', 'sixth', 'seventh'].includes(screen)) {
    // For screen seven, number1 should be a 3-digit number
    if (number1 <= 10 || number1 > 99) {
      return { isValid: false, reason: `Invalid state: First number (${number1}) must be a two-digit number [11-99]` };
    }
  } 
  return { isValid: true };
};

const isValidNumber2 = (number2: number, screen: string): ValidationResult => {
  if (['first', 'second', 'third', 'fourth'].includes(screen)) {
    if (number2 <= 10 || number2 > 19) {
      return { isValid: false, reason: `Invalid state: Second number (${number2}) must be between 10 and 19 for this screen` };
    }
  } else if (['fifth', 'sixth', 'seventh'].includes(screen)) {
    // For screen seven, number1 should be a 3-digit number
    if (number2 <= 10 || number2 > 99) {
      return { isValid: false, reason: `Invalid state: Second number (${number2}) must be a two-digit number [11-99]` };
    }
  } 
  return { isValid: true };
};

export default function checkGameStateLimits(state?: Partial<GameState>): ValidationResult {
  if (!state) return { isValid: false, reason: "No game state provided" };

  if (state.state1) {
    const number1Result = isValidNumber1(state.state1.number1, 'first');
    if (!number1Result.isValid) return { isValid: false, reason: `Screen 1: ${number1Result.reason}` };

    const number2Result = isValidNumber2(state.state1.number2, 'first');
    if (!number2Result.isValid) return { isValid: false, reason: `Screen 1: ${number2Result.reason}` };
  }

  if (state.state2) {
    const number1Result = isValidNumber1(state.state2.number1, 'second');
    if (!number1Result.isValid) return { isValid: false, reason: `Screen 2: ${number1Result.reason}` };

    const number2Result = isValidNumber2(state.state2.number2, 'second');
    if (!number2Result.isValid) return { isValid: false, reason: `Screen 2: ${number2Result.reason}` };
  }

  if (state.state3) {
    const number1Result = isValidNumber1(state.state3.number1, 'third');
    if (!number1Result.isValid) return { isValid: false, reason: `Screen 3: ${number1Result.reason}` };

    const number2Result = isValidNumber2(state.state3.number2, 'third');
    if (!number2Result.isValid) return { isValid: false, reason: `Screen 3: ${number2Result.reason}` };
  }

  if (state.state4) {
    const number1Result = isValidNumber1(state.state4.number1, 'fourth');
    if (!number1Result.isValid) return { isValid: false, reason: `Screen 4: ${number1Result.reason}` };

    const number2Result = isValidNumber2(state.state4.number2, 'fourth');
    if (!number2Result.isValid) return { isValid: false, reason: `Screen 4: ${number2Result.reason}` };
  }

  if (state.state5) {
    const number1Result = isValidNumber1(state.state5.number1, 'fifth');
    if (!number1Result.isValid) return { isValid: false, reason: `Screen 5: ${number1Result.reason}` };

    const number2Result = isValidNumber2(state.state5.number2, 'fifth');
    if (!number2Result.isValid) return { isValid: false, reason: `Screen 5: ${number2Result.reason}` };
  }

  if (state.state6) {
    const number1Result = isValidNumber1(state.state6.number1, 'sixth');
    if (!number1Result.isValid) return { isValid: false, reason: `Screen 6: ${number1Result.reason}` };

    const number2Result = isValidNumber2(state.state6.number2, 'sixth');
    if (!number2Result.isValid) return { isValid: false, reason: `Screen 6: ${number2Result.reason}` };
  }

  if (state.state7) {
    const number1Result = isValidNumber1(state.state7.number1, 'seventh');
    if (!number1Result.isValid) return { isValid: false, reason: `Screen 7: ${number1Result.reason}` };

    const number2Result = isValidNumber2(state.state7.number2, 'seventh');
    if (!number2Result.isValid) return { isValid: false, reason: `Screen 7: ${number2Result.reason}` };
  }

  return { isValid: true };
}
