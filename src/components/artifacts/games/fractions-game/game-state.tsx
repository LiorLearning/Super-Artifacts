import React, { createContext, useContext, ReactNode, useRef, useReducer } from 'react';
import { Fraction, BarState } from './bar';

export const desc = `Steps to Play the Fraction Comparison Game:
1. You'll start with two chocolate bars representing fraction1 and fraction2.
2. Break the first chocolate bar into equal parts by clicking the "Split" button.
3. Select the pieces of the first bar that represent the fraction fraction1.
4. Break the second chocolate bar into equal parts by clicking the "Split" button.
5. Select the pieces of the second bar that represent the fraction fraction2.
6. Compare the selected pieces from both bars to determine which fraction is larger.
7. Your goal is to correctly identify which fraction has a greater value.`;

export const GameStateContext = createContext<{
  gameStateRef: React.MutableRefObject<GameState>;
  setGameStateRef: (newState: ((prevState: GameState) => GameState) | Partial<GameState>) => void;
} | undefined>(undefined);

export const gameStateReducer = (state: GameState, action: Partial<GameState> | ((prevState: GameState) => GameState)): GameState => {
  if (typeof action === 'function') {
    return action(state);
  }
  return { ...state, ...action };
};

export const GameStateProvider: React.FC<{ 
  children: ReactNode 
}> = ({ children }) => {
  const num1 = 1
  const denom1 = 2
  const num2 = 1
  const denom2 = 3

  const initialGameState: GameState = {
    fraction1: { num: num1, denom: denom1 },
    fraction2: { num: num2, denom: denom2 },
    bar1: { parts: 1, selectedParts: [] },
    bar2: { parts: 1, selectedParts: [] },
    showAnswer: false,
    userAnswer: null,
    isFirstFractionCorrect: false,
    isSecondFractionCorrect: false,
    compareMode: false,
    gameStarted: false,
    correctAnswer: (num1 * denom2) > (num2 * denom1) 
      ? { num: num1, denom: denom1 } 
      : { num: num2, denom: denom2 }
  };

  const gameStateRef = useRef<GameState>(initialGameState);
  const [, dispatch] = useReducer(gameStateReducer, initialGameState);
  
  const setGameStateRef = (newState: ((prevState: GameState) => GameState) | Partial<GameState>) => {
    // Update the ref
    if (typeof newState === 'function') {
      gameStateRef.current = newState(gameStateRef.current);
    } else {
      gameStateRef.current = { ...gameStateRef.current, ...newState };
    }
    
    // Trigger a re-render
    dispatch(newState);
  };

  return (
    <GameStateContext.Provider value={{ 
      gameStateRef,
      setGameStateRef,
    }}>
      {children}
    </GameStateContext.Provider>
  );
};

export const useGameState = () => {
  const context = useContext(GameStateContext);
  if (!context) {
    throw new Error('useGameState must be used within a GameStateProvider');
  }
  return context;
};

export interface GameState {
  fraction1: Fraction;
  fraction2: Fraction;
  bar1: BarState;
  bar2: BarState;
  showAnswer: boolean;
  userAnswer: string | null;
  isFirstFractionCorrect: boolean;
  isSecondFractionCorrect: boolean;
  compareMode: boolean;
  gameStarted: boolean;
  correctAnswer: Fraction;
}
