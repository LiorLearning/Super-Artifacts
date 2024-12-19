import React, { createContext, useContext, ReactNode } from 'react';
import { 
  useGameState as useFractionsGameState, 
  GameStateProvider as FractionsGameStateProvider 
} from '@/components/artifacts/games/fractions-game/game';

type GameStateType = 
  | ReturnType<typeof useFractionsGameState>['gameState']
  | null
  | undefined;

type GameStateContextType = {
  gameState: GameStateType;
  setGameState: React.Dispatch<React.SetStateAction<GameStateType>>;
};

const GameStateContext = createContext<GameStateContextType | undefined>(undefined);

export const GameStateProvider: React.FC<{ 
  children: ReactNode;
  gameName: string;
}> = ({ children, gameName }) => {
  let GameStateProviderComponent;
  
  switch (gameName) {
    case 'fractions-game':
      GameStateProviderComponent = FractionsGameStateProvider;
      break;
    case 'crab-game':
    case 'shark-multiplication-game':
    case 'number-line-game':
    case 'interactive-long-division-game':
    case 'equivalent-fractions-game':
      return <>{children}</>;
    default:
      return <>{children}</>;
  }

  return (
    <GameStateProviderComponent>
      {children}
    </GameStateProviderComponent>
  );
};

export const useGameState = () => {
  const context = useContext(GameStateContext) ?? {};
  if (!context) {
    throw new Error('useGameState must be used within a GameStateProvider');
  }
  return context;
};
