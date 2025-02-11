import { GameState } from "./game-state";

export default function checkGameStateLimits(state?: Partial<GameState>): boolean {
  if (!state) return false;

  // Check screen 1 state
  if (state.state1) {
    const { fraction1, fraction2 } = state.state1;
    
    // Check whole numbers are <= 5
    if (fraction1.whole > 5 || fraction2.whole > 5) return false;
    
    // Check if numerators are less than denominators
    if (fraction1.numerator >= fraction1.denominator || 
        fraction2.numerator >= fraction2.denominator) return false;
  }

  // Check screen 2 state
  if (state.state2) {
    const { fraction1, fraction2 } = state.state2;
    
    if (fraction1.whole > 5 || fraction2.whole > 5) return false;
    if (fraction1.numerator >= fraction1.denominator || 
        fraction2.numerator >= fraction2.denominator) return false;
  }

  // Check screen 3 state
  if (state.state3) {
    const { fraction1, fraction2 } = state.state3;
    
    if (fraction1.whole > 5 || fraction2.whole > 5) return false;
    if (fraction1.numerator >= fraction1.denominator || 
        fraction2.numerator >= fraction2.denominator) return false;
  }

  // Check screen 4 state
  if (state.state4) {
    const { fraction1, fraction2 } = state.state4;
    
    if (fraction1.whole > 5 || fraction2.whole > 5) return false;
    if (fraction1.numerator >= fraction1.denominator || 
        fraction2.numerator >= fraction2.denominator) return false;
  }

  // Helper function to check if sum of fractions is valid
  const checkFractionSum = (f1: any, f2: any) => {
    if (f1.denominator !== f2.denominator) return false;
    const sum = f1.numerator + f2.numerator;
    return sum <= f1.denominator;
  };

  // Check sum of fractions for each screen
  if (state.state1 && !checkFractionSum(state.state1.fraction1, state.state1.fraction2)) return false;
  if (state.state2 && !checkFractionSum(state.state2.fraction1, state.state2.fraction2)) return false;
  if (state.state3 && !checkFractionSum(state.state3.fraction1, state.state3.fraction2)) return false;
  if (state.state4 && !checkFractionSum(state.state4.fraction1, state.state4.fraction2)) return false;

  return true;
}