import React from 'react'
import First from './screenOne'
import Second from './screenTwo';
import { useGameState } from './state-utils';

interface GameProps {
  sendAdminMessage: (role: string, content: string) => void;
}

function Game({ sendAdminMessage }: GameProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  
  return (
    <div className="h-full w-full bg-white">
      <div className="flex flex-col pb-16 h-full w-full justify-center items-center font-gaegu bg-[linear-gradient(90deg,rgba(0,0,0,.1)_1px,transparent_1px),linear-gradient(rgba(0,0,0,.1)_1px,transparent_1px)] bg-[length:20px_20px]">
        {gameStateRef.current.currentScreen === 'first' ? 
          <First 
            sendAdminMessage={sendAdminMessage} 
          /> 
          :
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
