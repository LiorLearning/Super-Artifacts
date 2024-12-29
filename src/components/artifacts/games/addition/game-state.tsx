import React, { createContext, useContext, ReactNode, useRef, useReducer } from 'react';
import * as Matter from 'matter-js';

export const desc = `Steps to Play the Addition Game:
1. You'll start with green and blue marbles on two platforms.
2. Shoot the green marbles first by clicking the "Shoot" button.
3. After shooting all green marbles, switch to blue marbles.
4. Your goal is to get all marbles into the central container.
5. Watch how the marbles combine to make 15!`;

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
  const initialGameState: GameState = {
    greenScore: 8,
    blueScore: 7,
    containerScore: 0,
    activePhase: 'left',
    leftContainerBalls: [],
    rightContainerBalls: [],
    platformsVisible: true,
    activeBallLeft: null,
    activeBallRight: null,
    clickDisabled: false,
    isGameComplete: false,
    sceneRef: null,
    showEmptyButton: false,
    gameComplete: false,
    showAddButton: false,
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
  greenScore: number;
  blueScore: number;
  containerScore: number;
  activePhase: 'left' | 'right';
  leftContainerBalls: Matter.Body[];
  rightContainerBalls: Matter.Body[];
  platformsVisible: boolean;
  activeBallLeft: Matter.Body | null;
  activeBallRight: Matter.Body | null;
  clickDisabled: boolean;
  isGameComplete: boolean;
  sceneRef: React.RefObject<HTMLDivElement> | null;
  showEmptyButton: boolean;
  gameComplete: boolean;
  showAddButton: boolean;
}
