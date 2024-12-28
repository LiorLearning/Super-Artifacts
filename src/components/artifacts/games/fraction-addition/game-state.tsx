import React, { createContext, useContext, ReactNode, useState } from 'react';

export const desc = ``;

// Create a context for the game state
export const GameStateContext = createContext<{
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
} | undefined>(undefined);

// Create a provider component for the game state
export const GameStateProvider: React.FC<{ 
  children: ReactNode 
}> = ({ children }) => {
  const initialGameState: GameState = {};
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


export interface GameState {}
