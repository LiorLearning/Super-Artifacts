import { useEffect } from 'react';
import { useRef } from 'react';
import FirstScreen from './screen/first';
import SecondScreen from './screen/second';
import { useGameState } from './state-utils';
import { DevHelper } from './utils/helper'; 
import ThirdScreen from './screen/third';


interface GameProps {
  sendAdminMessage: (role: string, content: string, onComplete?: () => void) => void;
}

export default function Game({sendAdminMessage}: GameProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { screen } = gameStateRef.current;
  const { step: step1 } = gameStateRef.current.state1;
  const { step: step2 } = gameStateRef.current.state2;
  
  // Remove bottomRef and its useEffect that was scrolling to bottom

  // Add scroll utility function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // In your step change handlers
  const handleStepComplete = () => {
    setGameStateRef(prev => ({
      ...prev,
      state1: {
        ...prev.state1,
        step: prev.state1.step + 1
      }
    }))
    scrollToTop()
  }

  return (
    <div className="mx-auto game font-jersey">
      <DevHelper />
      {/* Game screens */}
      {screen === 'first' && <FirstScreen sendAdminMessage={sendAdminMessage} />}
      {screen === 'second' && <SecondScreen sendAdminMessage={sendAdminMessage} />}
      {screen === 'third' && <ThirdScreen sendAdminMessage={sendAdminMessage} />}
      
      {/* Select font */}
      <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=Jersey+25&display=swap');
          .font-jersey {
            font-family: 'Jersey 25', cursive;
          }
        `}</style>
    </div>
  )
}