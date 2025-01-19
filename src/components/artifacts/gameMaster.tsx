import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from '../ui/select';
import { useWebSocketLogger } from '../websocket';
import { AdminRequestMessage, AssistanceResponseMessage } from '../MessageContext';
import GameLoader from '../utils/gameLoader';
import { Button } from '../custom_ui/button';
import { RefreshCw } from 'lucide-react';
import Chat from '../Chat'
import { handleScreenshot } from './utils/utils';

import TemplateGame from './games/template/game';
import FractionAdditionGame from './games/add-fractions-with-common-denominator/game';
import FractionSubtractionGame from './games/subtract-fractions-with-common-denominator/game';
import AdditionGame from './games/addition-within-20-using-ten-frames/game';
import FractionsGame from './games/compare-fractions-with-same-numerator-or-denominator/game';
import EquivalentFractionsGame from './games/equivalent-fractions/game';
import MixedFractionGame from './games/add-and-subtract-mixed-numbers-without-regouping/game';
import LegoGame from './games/mixed-fractions-to-improper-fractions/game';
import CommonDenominatorGame from './games/common-denominators/game';
import CompareFractionGame from './games/compare-fraction-with-the-different-numerator-and-denominator/game';

import { GameStateProvider as TemplateGameStateProvider, useGameState as TemplateGameState } from './games/template/state-utils'
import { GameStateProvider as FractionAdditionGameStateProvider, useGameState as FractionAdditionGameState } from './games/add-fractions-with-common-denominator/state-utils'
import { GameStateProvider as FractionSubtractionGameStateProvider, useGameState as FractionSubtractionGameState } from './games/subtract-fractions-with-common-denominator/state-utils'
import { GameStateProvider as AdditionGameStateProvider, useGameState as AdditionGameState } from './games/addition-within-20-using-ten-frames/state-utils'
import { GameStateProvider as FractionsGameStateProvider, useGameState as FractionsGameState } from './games/compare-fractions-with-same-numerator-or-denominator/state-utils'
import { GameStateProvider as EquivalentFractionsGameStateProvider, useGameState as EquivalentFractionsGameState } from './games/equivalent-fractions/state-utils'
import { GameStateProvider as LegoGameStateProvider, useGameState as LegoGameState } from './games/mixed-fractions-to-improper-fractions/state-utils'
import { GameStateProvider as CommonDenominatorGameStateProvider, useGameState as CommonDenominatorGameState } from './games/common-denominators/state-utils'
import { GameStateProvider as MixedFractionGameStateProvider, useGameState as MixedFractionGameState } from './games/add-and-subtract-mixed-numbers-without-regouping/state-utils'
import { GameStateProvider as CompareFractionGameStateProvider, useGameState as CompareFractionGameState } from './games/compare-fraction-with-the-different-numerator-and-denominator/state-utils'

import { desc as TemplateGameDesc } from './games/template/game-state';
import { desc as FractionAdditionGameDesc } from './games/add-fractions-with-common-denominator/game-state';
import { desc as FractionSubtractionGameDesc } from './games/subtract-fractions-with-common-denominator/game-state';
import { desc as AdditionGameDesc } from './games/addition-within-20-using-ten-frames/game-state';
import { desc as FractionsGameDesc } from './games/compare-fractions-with-same-numerator-or-denominator/game-state';
import { desc as EquivalentFractionsGameDesc } from './games/equivalent-fractions/game-state';
import { desc as LegoGameDesc } from './games/mixed-fractions-to-improper-fractions/game-state';
import { desc as CommonDenominatorGameDesc } from './games/common-denominators/game-state';
import { desc as MixedFractionGameDesc } from './games/add-and-subtract-mixed-numbers-without-regouping/game-state';
import { desc as CompareFractionGameDesc } from './games/compare-fraction-with-the-different-numerator-and-denominator/game-state';

interface GameInfo {
  game: React.ComponentType<{ sendAdminMessage: (role: string, content: string) => void }>;
  desc: string;
  state: any;
  provider: React.ComponentType<{ children: React.ReactNode }>;
}

type GameKey = keyof typeof gameInfo;

const gameInfo: Record<string, GameInfo> = {
  'addition-within-20-using-ten-frames': {
    game: AdditionGame,
    desc: AdditionGameDesc,
    state: AdditionGameState,
    provider: AdditionGameStateProvider
  },
  'compare-fractions-with-same-numerator-or-denominator': {
    game: FractionsGame,
    desc: FractionsGameDesc,
    state: FractionsGameState,
    provider: FractionsGameStateProvider
  },
  'equivalent-fractions': {
    game: EquivalentFractionsGame,
    desc: EquivalentFractionsGameDesc,
    state: EquivalentFractionsGameState,
    provider: EquivalentFractionsGameStateProvider
  },
  'common-denominators': {
    game: CommonDenominatorGame,
    desc: CommonDenominatorGameDesc,
    state: CommonDenominatorGameState,
    provider: CommonDenominatorGameStateProvider
  },
  'subtract-fractions-with-common-denominator': {
    game: FractionSubtractionGame,
    desc: FractionSubtractionGameDesc,
    state: FractionSubtractionGameState,
    provider: FractionSubtractionGameStateProvider
  },
  'add-fractions-with-common-denominator': {
    game: FractionAdditionGame,
    desc: FractionAdditionGameDesc,
    state: FractionAdditionGameState,
    provider: FractionAdditionGameStateProvider
  },
  'add-and-subtract-mixed-numbers-without-regouping': {
    game: MixedFractionGame,
    desc: MixedFractionGameDesc,
    state: MixedFractionGameState,
    provider: MixedFractionGameStateProvider
  },
  'writing-mixed-numbers-as-improper-fractions': {
    game: LegoGame,
    desc: LegoGameDesc,
    state: LegoGameState,
    provider: LegoGameStateProvider
  },
  'template-game': {
    game: TemplateGame,
    desc: TemplateGameDesc,
    state: TemplateGameState,
    provider: TemplateGameStateProvider
  },
  'compare-fractions-with-different-numerator-and-denominator': {
    game: CompareFractionGame,
    desc: CompareFractionGameDesc,
    state: CompareFractionGameState,
    provider: CompareFractionGameStateProvider
  }
};

interface GameComponentProps {
  currentGame: string;
  sendAdminMessage: (role: string, content: string) => void;
}

// Get the current game component
const GameComponent = ({ currentGame, sendAdminMessage }: GameComponentProps) => {
  const Provider = gameInfo[currentGame].provider;
  const Game = gameInfo[currentGame].game;
  return (
    <Provider>
      <Game sendAdminMessage={sendAdminMessage} />
    </Provider>
  );
}


interface MathGamesContainerProps { 
  setComponentRef: (componentRef: React.RefObject<HTMLDivElement>) => void;
}

const MathGamesContainer = ({ setComponentRef }: MathGamesContainerProps) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const gameParam = searchParams.get('game') as GameKey;
  const [currentGame, setCurrentGame] = useState<GameKey>('template-game');
  const [loading, setLoading] = useState(false);
  const { sendLog, addToChat, isConnected, reconnectWebSocket } = useWebSocketLogger()

  useEffect(() => {
    setIsClient(true);
    if (gameParam !== currentGame) {
      reconnectWebSocket();
      setCurrentGame(gameParam);
    }
  }, [gameParam]);

  const gameState = isClient && currentGame ? gameInfo[currentGame]?.state : null;

  const sendAdminMessage = async (role: string, content: string) => {
    if (!isClient) return;

    if (role == 'admin') {
      sendLog({
        type: 'admin',
        timestamp: new Date().toISOString(),
        content: content,
        role: role,
        image: await handleScreenshot(componentRef),
        desc: currentGame ? gameInfo[currentGame]?.desc : '',
        gameState: gameState ? JSON.stringify(gameState, null, 0) : '',
      } as AdminRequestMessage)
    } else if (role == 'agent') {
      addToChat({
        messageId: crypto.randomUUID(),
        type: 'agent',
        timestamp: new Date().toISOString(),
        content: content,
        role: 'agent',
      } as AssistanceResponseMessage)
    }
  };

  useEffect(() => {
    const updatePageContent = async () => {
      if (componentRef.current && isClient) {
        setComponentRef(componentRef);
      }
    };

    const observer = new MutationObserver(updatePageContent);
    
    if (componentRef.current && isClient) {
      observer.observe(componentRef.current, {
        attributes: true,
        childList: true,
        subtree: true,
        characterData: true
      });
    }

    updatePageContent();

    return () => observer.disconnect();
  }, [currentGame, isClient]);

  const handleGameChange = (value: GameKey) => {
    if (!isClient) return;
    setLoading(true);
    router.push(`?game=${value}`);
    setTimeout(() => {
      setCurrentGame(value);
      setLoading(false);
    }, 1000);
  };

  const handleReloadGame = () => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  if (!isClient) return null;

  return (
    <div className="flex h-screen">
      <div className="w-[75%] border-r-border flex flex-col overflow-auto">
        <div className="flex-1 flex p-2 flex-col bg-background border-border rounded-lg m-2 max-h-full max-w-full">
          <div className="mb-4 flex items-center gap-2">
            <Select value={currentGame ?? ''} onValueChange={(value) => handleGameChange(value as GameKey)}>
              <SelectTrigger className="p-2 border-border rounded-md flex-1">
                <SelectValue placeholder="Select a game" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(gameInfo).map((gameKey) => (
                  <SelectItem key={gameKey} value={gameKey}>
                    {gameKey}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button 
              variant="outline" 
              onClick={handleReloadGame}
              className="hover:bg-gray-100 text-foreground px-4 py-2 flex items-center gap-2"
              title="Reload Game"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Retry</span>
            </Button>
          </div>
          
          {/* Game container */}
          <div className="flex-1 h-full w-full overflow-y-auto border-2 border-gray-300 rounded-lg" ref={componentRef}>
            {!isConnected || loading ? (
              <GameLoader />
            ) : (
              currentGame && (
                <div className="relative h-full w-full">
                  <div className="relative h-full w-full overflow-auto">
                    <div className="">
                      <GameComponent currentGame={currentGame} sendAdminMessage={sendAdminMessage} />
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
      <div className="w-[25%] min-w-[250px] flex flex-col">
        <Chat 
          desc={currentGame ? gameInfo[currentGame]?.desc : ''} 
          componentRef={componentRef} 
          gameState={gameState} 
        />
      </div>
    </div>
  );
};

export default MathGamesContainer;