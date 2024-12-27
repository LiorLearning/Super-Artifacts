import React, { createContext, useContext, ReactNode, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Fraction, BarState } from './bar';

export const desc = `Steps to Play the Fraction Comparison Game:
1. You'll start with two chocolate bars representing fraction1 and fration2.
2. Break the first chocolate bar into equal parts by clicking the "Split" button.
3. Select the pieces of the first bar that represent the fraction fraction1.
4. Break the second chocolate bar into equal parts by clicking the "Split" button.
5. Select the pieces of the second bar that represent the fraction fraction2.
6. Compare the selected pieces from both bars to determine which fraction is larger.
7. Your goal is to correctly identify which fraction has a greater value.`;

// Create a context for the game state
export const GameStateContext = createContext<{
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
} | undefined>(undefined);

// Create a provider component for the game state
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

  const [gameState, setGameState] = useState<GameState>(initialGameState);

  return (
    <GameStateContext.Provider value={{ gameState, setGameState }}>
      {children}
    </GameStateContext.Provider>
  );
};

// Custom hook to use the game state context
export const useGameState = () => {
  const context = useContext(GameStateContext);
  if (context === undefined) {
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
