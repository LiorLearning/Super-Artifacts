import React, { createContext, useContext, ReactNode, useRef, useReducer } from 'react';

export interface Fraction {
  numerator: number;
  denominator: number;
}

export interface BarState {
  parts: number[][];
  selectedParts: number[];
}

export const desc = `Steps to Play the Equivalent Fractions Game:
1. Break the first chocolate bar by clicking the "Split" button.
2. Select the pieces of the first bar that you want to keep.
3. Break the second chocolate bar by clicking the "Split" button for the second bar.
4. Select the pieces of the second bar that you want to keep.
5. Understand how to create equivalent fractions by manipulating the bars.`;

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
    currentScreen: 'first',
    equation: {
      input: { numerator: 3, denominator: 4 },
      multiplier: { numerator: 0, denominator: 0 },
      output: { numerator: 0, denominator: 12 }
    },
    bars: {
      first: {
        parts: [],
        selectedParts: []
      },
      second: {
        parts: [],
        selectedParts: []
      }
    },
    currentStep: 0,
    selectedKnife: null,
    isCorrect: false,
    canProceed: false,
    showCorrect: false,
    barNumerator: '',
    gameCompleted: false
  };

  const gameStateRef = useRef<GameState>(initialGameState);
  const [, dispatch] = useReducer(gameStateReducer, initialGameState);
  
  const setGameStateRef = (newState: ((prevState: GameState) => GameState) | Partial<GameState>) => {
    if (typeof newState === 'function') {
      gameStateRef.current = newState(gameStateRef.current);
    } else {
      gameStateRef.current = { ...gameStateRef.current, ...newState };
    }
    
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
  currentScreen: 'first' | 'second1' | 'second2' | 'third';
  equation: {
    input: Fraction;
    multiplier: Fraction;
    output: Fraction;
  };
  bars: {
    first: BarState;
    second: BarState;
  };
  currentStep: number;
  selectedKnife: number | null;
  isCorrect: boolean;
  canProceed: boolean;
  showCorrect: boolean;
  barNumerator: string;
  gameCompleted: boolean;
}
