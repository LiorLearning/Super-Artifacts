import React, { useRef, useState } from 'react';
import First from './screens/First';
import Second from './screens/Second';
import Third from './screens/Third';

import { useGameState } from './state-utils';
import { DevHelper } from './utils/helper'; 




interface GameProps {
  sendAdminMessage: (role: string, content: string, onComplete?: () => void) => Promise<string>;
}

const Game: React.FC<GameProps> = ({ sendAdminMessage }) => {
  const [currentScreen, setCurrentScreen] = useState<'first' | 'second' | 'third'>('first');

  const handleFirstComplete = () => {
    //console.log('Transitioning to second screen'); 
    setCurrentScreen('second');
  };

  const handleSecondComplete = () => {
    //console.log('handleSecondComplete triggered'); 
    setCurrentScreen('third');
    //console.log('currentScreen set to:', 'third'); 
  };

  console.log('Current screen:', currentScreen);

  const bottomRef = useRef<HTMLDivElement | null>(null);


  return (
    <div className="mx-auto game font-jersey">
      <DevHelper />

    
      {currentScreen === 'first' ? (
        <First 
          sendAdminMessage={sendAdminMessage} 
          onComplete={handleFirstComplete}
        />
      ) : currentScreen === 'second' ? (
        <Second 
          sendAdminMessage={sendAdminMessage}
          onComplete={handleSecondComplete}
        />
      ) : (
        <Third 
          sendAdminMessage={sendAdminMessage}
        />
      )}
      
      {/* Select font */}
      <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=Jersey+25&display=swap');
          .font-jersey {
            font-family: 'Jersey 25', cursive;
          }
        `}</style>

<div ref={bottomRef} style={{ height: 0 }} />
    </div>
  );
};

export default Game;