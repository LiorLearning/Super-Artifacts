import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from '../ui/select';
import { useWebSocketLogger } from '../websocket';
import { AdminRequestMessage, AssistanceResponseMessage } from '../MessageContext';
import GameLoader from '../utils/gameLoader';
import { Button } from '../custom_ui/button';
import { Edit2Icon, RefreshCw, TimerResetIcon } from 'lucide-react';
import Chat from '../Chat'
import { handleScreenshot } from './utils/utils';
import { gameInfo } from './gameInfo';
import { initialGameState as templateInitialState } from './games/template/game-state';

type GameKey = keyof typeof gameInfo;

interface GameComponentProps {
  currentGame: string;
  sendAdminMessage: (role: string, content: string, onComplete?: () => void) => Promise<string>;
}

// Get the current game component
const GameComponent = ({ currentGame, sendAdminMessage }: GameComponentProps) => {
  console.log('currentGame', gameInfo[currentGame].initialGameState);
  const gameKey = gameInfo[currentGame] ? currentGame : 'template-game';
  const Provider = gameInfo[gameKey].provider;
  const Game = gameInfo[gameKey].game;
  

  
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
  const [currentGame, setCurrentGame] = useState<GameKey>(gameParam || 'template-game');
  const [loading, setLoading] = useState(false);
  const { sendLog, addToChat, isConnected, reconnectWebSocket } = useWebSocketLogger()
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (gameParam && gameParam !== currentGame) {
      reconnectWebSocket();
      setCurrentGame(gameParam);
    }
  }, [gameParam]);

  const { gameStateRef, getDescription } = gameInfo[currentGame]?.useState || {};

  const sendAdminMessage = async (role: string, content: string, onComplete?: () => void): Promise<string> => {
    if (!isClient) return '';

    const messageId = crypto.randomUUID();

    if (role == 'admin') {
      sendLog({
        messageId,
        type: 'admin',
        timestamp: new Date().toISOString(),
        content: content,
        role: role,
        image: await handleScreenshot(componentRef),
        desc: getDescription?.(),
        gameState: '',
      } as AdminRequestMessage);
      onComplete?.();
    } else if (role == 'agent') {
      addToChat({
        messageId,
        type: 'agent',
        timestamp: new Date().toISOString(),
        content: content,
        role: 'agent',
      } as AssistanceResponseMessage, onComplete);
    }

    return messageId; // Return the messageId for optional tracking
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
      <div className="w-[75%] border-r-border flex flex-col h-full overflow-auto">
        <div className="flex-1 flex p-2 flex-col bg-background border-border rounded-lg h-full max-w-full">
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
              onClick={() => setIsEditorOpen(true)}
              className="hover:bg-gray-100 text-foreground px-4 py-2 flex items-center gap-2"
              title="Edit GameState"
            >
              <Edit2Icon className="h-4 w-4" />
              <span>Edit GameState</span>
            </Button>
            <GameStateEditor 
              gameKey={currentGame}
              isOpen={isEditorOpen}
              onClose={() => setIsEditorOpen(false)}
              initialState={gameInfo[currentGame].initialGameState}
            />
            <Button 
              variant="outline" 
              onClick={() => {
                localStorage.removeItem(currentGame);
                window.location.reload();
              }}
              className="hover:bg-gray-100 text-foreground px-4 py-2 flex items-center gap-2"
              title="Reset GameState"
              disabled={localStorage.getItem(currentGame) === null}
            >
              <TimerResetIcon className="h-4 w-4" />
              <span>Reset GameState</span>
            </Button>
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
                      <GameComponent currentGame={currentGame} sendAdminMessage={sendAdminMessage} />
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
      <div className="w-[25%] min-w-[250px] flex flex-col">
      <Chat 
        desc={getDescription?.()} 
        componentRef={componentRef} 
        gameState={gameStateRef} 
      />
    </div>

    </div>      
  );
};

export default MathGamesContainer;


interface GameStateEditorProps {
  isOpen: boolean;
  onClose: () => void;
  gameKey: string;
  initialState: any;
}

export function GameStateEditor({ isOpen, onClose, initialState, gameKey }: GameStateEditorProps) {
  const [testState, setTestState] = useState(() => {
    const savedState = localStorage.getItem(gameKey);
    return savedState || JSON.stringify(initialState, null, 2);
  });
  const [error, setError] = useState<string>("");

  useEffect(() => {
    // Update testState when gameKey changes
    const savedState = localStorage.getItem(gameKey);
    setTestState(savedState || JSON.stringify(initialState, null, 2));
  }, [gameKey, initialState]);

  if (!isOpen) return null;

  const handleApply = () => {
    try {
      const parsedState = JSON.parse(testState);
      localStorage.setItem(gameKey, testState);
      window.location.reload();
    } catch (e) {
      setError("Invalid JSON");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-2 rounded-lg max-w-3xl w-full mx-4">
        <div className="flex justify-between mx-2 items-center">
          <h2 className="text-xl font-bold">Edit Game State</h2>
        </div>
        <div className="space-y-4">
          <div>
            <textarea 
              value={testState || "State not found"}
              onChange={(e) => setTestState(e.target.value)}
              className="w-full min-h-[70vh] h-full font-mono text-sm p-4 border rounded-lg"
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button variant="outline" onClick={handleApply}>Apply Test State</Button>
          </div>
        </div>
      </div>
    </div>
  );
} 