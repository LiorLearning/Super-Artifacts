import { GameState } from "./game-state";

interface ValidationResult {
  isValid: boolean;
  reason?: string;
}

const validateMarbleCounts = (marbleState: { maxGreenMarbles: number, maxBlueMarbles: number }): ValidationResult => {
  if (marbleState.maxGreenMarbles < 0 || marbleState.maxGreenMarbles > 10) {
    return {
      isValid: false,
      reason: `Invalid state: Green marble count (${marbleState.maxGreenMarbles}) must be between 0 and 10`
    };
  }

  if (marbleState.maxBlueMarbles < 0 || marbleState.maxBlueMarbles > 10) {
    return {
      isValid: false,
      reason: `Invalid state: Blue marble count (${marbleState.maxBlueMarbles}) must be between 0 and 10`
    };
  }

  if (marbleState.maxGreenMarbles + marbleState.maxBlueMarbles > 20) {
    return {
      isValid: false,
      reason: `Invalid state: Total marble count (${marbleState.maxGreenMarbles + marbleState.maxBlueMarbles}) cannot exceed 20`
    };
  }

  return { isValid: true };
};

export default function checkGameStateLimits(state?: Partial<GameState>): ValidationResult {
  if (!state) return { isValid: false, reason: "No game state provided" };

  const { state1, state2 } = state;

  if (state1) {
    const result = validateMarbleCounts(state1);
    if (!result.isValid) {
      return {
        isValid: false,
        reason: `Validation failed for screen 1: ${result.reason}`
      };
    }
  }

  if (state2) {
    const result = validateMarbleCounts(state2);
    if (!result.isValid) {
      return {
        isValid: false,
        reason: `Validation failed for screen 2: ${result.reason}`
      };
    }
  }

  return { isValid: true };
}