import React, { useEffect, useRef } from 'react'
import First from './screenOne'
import Second from './screenTwo';
import ComparisonPage from './components/comparison-page';
import { useGameState } from './state-utils';
import { GameProps } from './components/types';

function Game({ sendAdminMessage }: GameProps) {
  const { gameStateRef } = useGameState();
  
  return (
    <div className="h-full w-full bg-white">
      <div className="flex flex-col pb-96 h-full w-full justify-center items-center font-gaegu bg-[linear-gradient(90deg,rgba(0,0,0,.1)_1px,transparent_1px),linear-gradient(rgba(0,0,0,.1)_1px,transparent_1px)] bg-[length:20px_20px]">
        {gameStateRef.current.screen === 'first' && (
          <>
            <First sendAdminMessage={sendAdminMessage} visible={true} />
            {gameStateRef.current.state1.currentStep === 5 && (
              <div className="h-full w-full absolute inset-0 z-10 bg-white">
                <div className="h-full w-full bg-[linear-gradient(90deg,rgba(0,0,0,.1)_1px,transparent_1px),linear-gradient(rgba(0,0,0,.1)_1px,transparent_1px)] bg-[length:20px_20px]">
                  <ComparisonPage sendAdminMessage={sendAdminMessage} />
                </div>
              </div>
            )}
          </>
        )}
        {gameStateRef.current.screen === 'second' &&
          <Second sendAdminMessage={sendAdminMessage} />
        }
        <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=Gaegu:wght@300;400;700&display=swap');
          .font-gaegu {
            font-family: 'Gaegu', cursive;
          }
        `}</style>
      </div>
    </div>
  )
}

export default Game