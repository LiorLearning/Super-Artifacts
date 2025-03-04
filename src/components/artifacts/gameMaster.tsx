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
import { SPEAKOUT } from '../websocket';

type GameKey = keyof typeof gameInfo;

interface GameComponentProps {
  currentGame: string;
  sendAdminMessage: (role: string, content: string, onComplete?: () => void) => Promise<string>;
}

const GameComponent = ({ currentGame, sendAdminMessage }: GameComponentProps) => {
  const gameKey = gameInfo[currentGame] ? currentGame : 'template-game';
  const Provider = gameInfo[gameKey].provider;
  const Game = gameInfo[gameKey].game;

  return (
    <Provider>
      <div className="font-jersey">
        <Game sendAdminMessage={sendAdminMessage} />
      </div>
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
  const [isNarrationEditorOpen, setIsNarrationEditorOpen] = useState(false);

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
      if (!SPEAKOUT) {
        onComplete?.();
      }
    }

    return messageId;
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
      <div className="w-[25%] min-w-[250px] pl-2 pt-2 pb-2 flex flex-col items-center justify-center gap-2">
        <div className="flex flex-col items-center justify-center w-full text-sm">
          <Select value={currentGame ?? ''} onValueChange={(value) => handleGameChange(value as GameKey)}>
            <SelectTrigger className="p-2 border-border rounded-md flex-1 text-sm">
              <SelectValue placeholder="Select a game" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(gameInfo).map((gameKey) => (
                <SelectItem key={gameKey} value={gameKey} className="text-sm">
                  {gameKey}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className='flex items-center justify-center gap-2 w-full'>
          <Button
            variant="outline"
            onClick={() => setIsEditorOpen(true)}
            className="hover:bg-gray-100 text-sm text-foreground px-4 py-2 flex items-center gap-2 w-[50%]"
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
            className="hover:bg-gray-100 text-sm text-foreground px-4 py-2 flex items-center gap-2 w-[50%]"
            title="Reset GameState"
            disabled={localStorage.getItem(currentGame) === null}
          >
            <TimerResetIcon className="h-4 w-4" />
            <span>Reset GameState</span>
          </Button>
        </div>

        <div className='flex items-center justify-center gap-2 w-full'>
          <Button
            variant="outline"
            onClick={() => setIsNarrationEditorOpen(true)}
            className="hover:bg-gray-100 text-sm text-foreground px-4 py-2 flex items-center gap-2 w-[50%]"
            title="Edit Narrations"
          >
            <Edit2Icon className="h-4 w-4" />
            <span>Edit Narrations</span>
          </Button>
          <NarrationEditor
            isOpen={isNarrationEditorOpen}
            onClose={() => setIsNarrationEditorOpen(false)}
            gameKey={currentGame}
            initialNarrations={gameInfo[currentGame].narrations || {}}
          />
          <Button
            variant="outline"
            onClick={() => {
              localStorage.removeItem(`${currentGame}-narrations`);
              window.location.reload();
            }}
            className="hover:bg-gray-100 text-sm text-foreground px-4 py-2 flex items-center gap-2 w-[50%]"
            title="Reset Narrations"
            disabled={localStorage.getItem(`${currentGame}-narrations`) === null}
          >
            <TimerResetIcon className="h-4 w-4" />
            <span>Reset Narrations</span>
          </Button>
        </div>

        <div className='flex items-center justify-center gap-2 w-full'  >
          <Button
            variant="outline"
            onClick={handleReloadGame}
            className="hover:bg-gray-100 text-sm text-foreground px-4 py-2 flex items-center w-[100%]"
            title="Reload Game"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Retry</span>
          </Button>
        </div>

        <div className="flex-1 h-full w-full overflow-y-auto border-2 border-gray-300 rounded-lg" ref={componentRef}>
          <Chat
            desc={getDescription?.()}
            componentRef={componentRef}
            gameState={gameStateRef}
          />
        </div>
      </div>
      <div className="w-[75%] border-r-border flex flex-col h-full overflow-auto p-2">
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
    const savedState = localStorage.getItem(gameKey);
    setTestState(savedState || JSON.stringify(initialState, null, 2));
  }, [gameKey, initialState]);

  if (!isOpen) return null;

  const handleApply = () => {
    try {
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
            <Button variant="outline" onClick={handleApply}>Apply Game State</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface NarrationEditorProps {
  isOpen: boolean;
  onClose: () => void;
  gameKey: string;
  initialNarrations: any;
}

export function NarrationEditor({ isOpen, onClose, initialNarrations, gameKey }: NarrationEditorProps) {
  const narrationStorageKey = `${gameKey}-narrations`;
  const [testNarrations, setTestNarrations] = useState(() => {
    // Get stored narration overrides
    const savedNarrationsString = localStorage.getItem(narrationStorageKey);
    const savedNarrations = savedNarrationsString ? JSON.parse(savedNarrationsString) : {};
    
    // Create a merged narrations object (defaults + overrides)
    const mergedNarrations = { ...initialNarrations };
    
    // Apply any overrides from localStorage
    Object.keys(savedNarrations).forEach(key => {
      if (mergedNarrations[key]) {
        mergedNarrations[key] = { ...mergedNarrations[key], ...savedNarrations[key] };
      }
    });
    
    return JSON.stringify(mergedNarrations, null, 2);
  });
  const [error, setError] = useState<string>("");

  useEffect(() => {
    // Get stored narration overrides
    const savedNarrationsString = localStorage.getItem(narrationStorageKey);
    const savedNarrations = savedNarrationsString ? JSON.parse(savedNarrationsString) : {};
    
    // Create a merged narrations object (defaults + overrides)
    const mergedNarrations = { ...initialNarrations };
    
    // Apply any overrides from localStorage
    Object.keys(savedNarrations).forEach(key => {
      if (mergedNarrations[key]) {
        mergedNarrations[key] = { ...mergedNarrations[key], ...savedNarrations[key] };
      }
    });
    
    setTestNarrations(JSON.stringify(mergedNarrations, null, 2));
  }, [gameKey, initialNarrations, narrationStorageKey]);

  if (!isOpen) return null;

  const handleApply = () => {
    try {
      // Parse the edited narrations
      const editedNarrations = JSON.parse(testNarrations);
      
      // Get the current overrides from localStorage
      const savedNarrationsString = localStorage.getItem(narrationStorageKey);
      const currentOverrides = savedNarrationsString ? JSON.parse(savedNarrationsString) : {};
      
      // Find which narrations have been modified from the defaults
      const newOverrides = { ...currentOverrides };
      
      Object.keys(editedNarrations).forEach(key => {
        // If this narration exists in the defaults
        if (initialNarrations[key]) {
          const defaultNarration = initialNarrations[key];
          const editedNarration = editedNarrations[key];
          
          const handleFieldChange = (field: string) => {
            if (editedNarration[field] !== defaultNarration[field]) {
              if (!newOverrides[key]) newOverrides[key] = {};
              newOverrides[key][field] = editedNarration[field];
            } else if (newOverrides[key] && (field === 'send' ? field in newOverrides[key] : newOverrides[key][field])) {
              delete newOverrides[key][field];
            }
          };

          // Check changes for each field
          ['content', 'role', 'send'].forEach(handleFieldChange);
          
          // If all properties are back to default, remove this narration from overrides
          if (newOverrides[key] && Object.keys(newOverrides[key]).length === 0) {
            delete newOverrides[key];
          }
        } else {
          // This is a new narration that doesn't exist in defaults
          newOverrides[key] = editedNarrations[key];
        }
      });
      
      // Save only the overrides to localStorage
      localStorage.setItem(narrationStorageKey, JSON.stringify(newOverrides));
      window.location.reload();
    } catch (e) {
      setError("Invalid JSON");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-2 rounded-lg max-w-3xl w-full mx-4">
        <div className="flex justify-between mx-2 items-center">
          <h2 className="text-xl font-bold">Edit Narrations</h2>
        </div>
        <div className="space-y-4">
          <div>
            <textarea
              value={testNarrations || "Narrations not found"}
              onChange={(e) => setTestNarrations(e.target.value)}
              className="w-full min-h-[70vh] h-full font-mono text-sm p-4 border rounded-lg"
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button variant="outline" onClick={handleApply}>Apply Narrations</Button>
          </div>
        </div>
      </div>
    </div>
  );
} 