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
import { useGameState } from '../utils/game-state';

import CrabGame, { desc as CrabGameDesc } from './games/crab-game/game';
import SharkGame, { desc as SharkGameDesc } from './games/shark-game/game';
import FractionsGame, { desc as FractionsGameDesc } from './games/fractions-game/game';
import NumberLineGame, { desc as NumberLineGameDesc } from './games/number-line-game/game';
import InteractiveLongDivisionGame, { desc as InteractiveLongDivisionGameDesc } from './games/long-division-game/game';
import EquivalentFractionsGame, { desc as EquivalentFractionsGameDesc } from './games/equivalent-fractions/game';

type GameKey = keyof typeof gameComponents;
const gameComponents = {
  'crab-game': CrabGame,
  'shark-multiplication-game': SharkGame,
  'fractions-game': FractionsGame,
  'number-line-game': NumberLineGame,
  'interactive-long-division-game': InteractiveLongDivisionGame,
  'equivalent-fractions-game': EquivalentFractionsGame,
};

const gameDescriptions = {
  'crab-game': CrabGameDesc,
  'shark-multiplication-game': SharkGameDesc,
  'fractions-game': FractionsGameDesc,
  'number-line-game': NumberLineGameDesc,
  'interactive-long-division-game': InteractiveLongDivisionGameDesc,
  'equivalent-fractions-game': EquivalentFractionsGameDesc,
};


interface MathGamesContainerProps { 
  setComponentRef: (componentRef: React.RefObject<HTMLDivElement>) => void;
}

const MathGamesContainer = ({ setComponentRef }: MathGamesContainerProps) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const gameParam = searchParams.get('game') as GameKey;
  const [currentGame, setCurrentGame] = useState<GameKey | null>(gameParam);
  const [loading, setLoading] = useState(false);
  const { sendLog, addToChat, isConnected } = useWebSocketLogger()

  const gameState = useGameState()

  const sendAdminMessage = async (role: string, content: string) => {
    if (role == 'admin') {
      sendLog({
        type: 'admin',
        timestamp: new Date().toISOString(),
        content: content,
        role: role,
        image: await handleScreenshot(componentRef),
        desc: gameDescriptions[currentGame!],
        gameState: JSON.stringify(gameState, null, 0),
      } as AdminRequestMessage)
    } else if (role == 'agent') {
      addToChat({
        type: 'agent',
        timestamp: new Date().toISOString(),
        content: content,
        role: 'agent',
      } as AssistanceResponseMessage)
    }
  };

  useEffect(() => {
    const updatePageContent = async () => {
      if (componentRef.current) {
        const desc = currentGame ? gameDescriptions[currentGame] || '' : '';
        setComponentRef(componentRef);
      }
    };

    const observer = new MutationObserver(updatePageContent);
    
    if (componentRef.current) {
      observer.observe(componentRef.current, {
        attributes: true,
        childList: true,
        subtree: true,
        characterData: true
      });
    }

    updatePageContent();

    return () => observer.disconnect();
  }, [currentGame]);

  useEffect(() => {
    setCurrentGame(gameParam);
  }, [gameParam]);

  // Get the current game component
  const GameComponent = currentGame ? gameComponents[currentGame] : FractionsGame;

  const handleGameChange = (value: GameKey) => {
    setLoading(true);
    router.push(`?game=${value}`);
    setTimeout(() => {
      setCurrentGame(value);
      setLoading(false);
    }, 1000);
  };

  const handleReloadGame = () => {
    window.location.reload();
  };

  // Determine background image based on the current game
  const getBackgroundImage = () => {
    switch (currentGame) {
      case 'crab-game':
        return 'https://mathtutor-images.s3.us-east-1.amazonaws.com/game-bg/bg4.jpg';
      case 'shark-multiplication-game':
        return 'https://mathtutor-images.s3.us-east-1.amazonaws.com/game-bg/bg4.jpg';
      default:
        return 'https://mathtutor-images.s3.us-east-1.amazonaws.com/game-bg/bg4.jpg';
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-[75%] border-r-border flex flex-col">
        <div className="flex-1 flex p-2 flex-col bg-background border-border rounded-lg m-2 max-h-full max-w-full overflow-hidden">
          <div className="mb-4 flex items-center gap-2">
            <Select value={currentGame ?? ''} onValueChange={(value) => handleGameChange(value as GameKey)}>
              <SelectTrigger className="p-2 border-border rounded-md flex-1">
                <SelectValue placeholder="Select a game" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(gameComponents).map((gameKey) => (
                  <SelectItem key={gameKey} value={gameKey}>
                    {gameKey.split('-').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
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
              <div className="relative h-screen w-full">
                <div className="absolute inset-0 w-full h-full">
                  <img src={getBackgroundImage()} alt="Background" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gray-600 bg-opacity-50 backdrop-blur-sm"></div>
                </div>
                <div className="relative h-full w-full flex justify-center items-center">
                  <GameComponent sendAdminMessage={sendAdminMessage} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-[25%] min-w-[250px] flex flex-col">
        <Chat desc={gameDescriptions[currentGame!]} componentRef={componentRef} gameState={gameState} />
      </div>
    </div>
  );
};

export default MathGamesContainer;