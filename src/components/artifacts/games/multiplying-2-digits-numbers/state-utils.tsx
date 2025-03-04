import { fetchGameState } from "@/hooks/get-game-state";
import { GameState, initialGameState, descriptions } from "./game-state";
import { createContext, useContext, useReducer, useRef, ReactNode, useEffect, useMemo } from 'react';
import { mergeGameState } from "@/hooks/merge-game-state";
import checkGameStateLimits from './state-limits';
import { narrations as defaultNarrations } from "./narrations";

// Game State Context
const GameStateContext = createContext<{
    gameStateRef: React.MutableRefObject<GameState>;
    setGameStateRef: (newState: ((prevState: GameState) => GameState) | Partial<GameState>) => void;
    getDescription: () => string;
    setGameState: (newState: Partial<GameState>) => void;
  } | undefined>(undefined);
  
const gameStateReducer = (state: GameState, action: Partial<GameState> | ((prevState: GameState) => GameState)): GameState => {
  if (typeof action === 'function') {
    return action(state);
  }
  return { ...state, ...action };
};  

// Narration Context
interface Message {
  role: string;
  content: string;
  send: boolean;
}

const NarrationContext = createContext<{
  narrations: { [key: string]: Message };
} | undefined>(undefined);

export const GameStateProvider: React.FC<{ 
  children: ReactNode 
}> = ({ children }) => {
  const queryParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const id = queryParams.get('id');

  const gameStateRef = useRef<GameState>(initialGameState);
  const [, dispatch] = useReducer(gameStateReducer, initialGameState);
  
  const setGameStateRef = (newState: ((prevState: GameState) => GameState) | Partial<GameState>, shouldRerender = true) => {
    // Update the ref
    if (typeof newState === 'function') {
      const updatedState = newState(gameStateRef.current)
      gameStateRef.current = updatedState
    } else {
      gameStateRef.current = { ...gameStateRef.current, ...newState }
    }
    
    // Conditionally trigger a re-render
    if (shouldRerender) {
      dispatch(newState)
    }
  };

  const setGameState = (newState: Partial<GameState>) => {
    setGameStateRef(mergeGameState(gameStateRef.current, newState))
  }


  useEffect(() => {
    const loadGameState = async () => {
      const currentGame = window.location.search.split('game=')[1]?.split('&')[0] || 'template-game';

      try {
        const fetchedGameState = (id ? 
          await fetchGameState(id) as Partial<GameState> : 
          (localStorage.getItem(currentGame) ? 
            JSON.parse(localStorage.getItem(currentGame) || '{}') as Partial<GameState> : 
            initialGameState)
        );

        const updatedGameState = mergeGameState(initialGameState, fetchedGameState);
        const validationResult = checkGameStateLimits(updatedGameState);
        
        if (validationResult.isValid) {
          setGameStateRef(updatedGameState);
        } else {
          alert(`Invalid game state: ${validationResult.reason}`);
        }
      } catch (e) {
        console.error('Error fetching game state:', e);
      }
    };

    loadGameState();
  }, [id]);
  

  const getDescription = () => {
    const description = descriptions.find(d => d.title === gameStateRef.current.screen)?.description;
    return description || '';
  };

  
  const narrations = useMemo(() => {
    const currentGame = window.location.search.split('game=')[1]?.split('&')[0] || 'template-game';
    const narrationStorageKey = `${currentGame}-narrations`;
    const savedNarrationsString = localStorage.getItem(narrationStorageKey);
    
    // If no overrides exist, return the default narrations
    if (!savedNarrationsString) {
      return defaultNarrations;
    }
    
    try {
      // Parse the saved narration overrides
      const savedNarrations = JSON.parse(savedNarrationsString);
      
      // Create a deep copy of the default narrations
      const mergedNarrations = { ...defaultNarrations };
      
      // Apply any overrides from localStorage
      Object.keys(savedNarrations).forEach(key => {
        if (mergedNarrations[key]) {
          // Merge the override with the default narration
          mergedNarrations[key] = { ...mergedNarrations[key], ...savedNarrations[key] };
        } else {
          // This is a new narration that doesn't exist in defaults
          mergedNarrations[key] = savedNarrations[key];
        }
      });
      
      return mergedNarrations;
    } catch (e) {
      console.error('Error parsing saved narrations:', e);
      return defaultNarrations;
    }
  }, []);

  return (
    <GameStateContext.Provider value={{ 
      gameStateRef,
      setGameStateRef,
      getDescription,
      setGameState
    }}>
      <NarrationContext.Provider value={{ narrations }}>
        {children}
      </NarrationContext.Provider>
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

export const useNarrations = () => {
  const context = useContext(NarrationContext);
  if (context === undefined) {
    throw new Error('useNarrations must be used within a GameStateProvider');
  }
  return context.narrations;
};

// Declare id to avoid TypeScript errors
const id = undefined;