import { useGameState } from '../state-utils';
import QuickHack2 from '../components/Steps_Screen2/Logic';
import Welcome from '../components/Steps_Screen2/Welcome';
import { useRef, useEffect } from 'react';

interface SecondScreenProps {
  sendAdminMessage: (role: string, content: string, onComplete?: () => void) => void;
}

export default function SecondScreen({ sendAdminMessage }: SecondScreenProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { step, mixedFraction } = gameStateRef.current.state2;
  const containerRef = useRef<HTMLDivElement>(null);

  const topFocusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (step >= 0) {
      window.scrollTo({
        top: 0,
        behavior: 'auto'
      });
      topFocusRef.current?.focus();
    }
  }, [step]);

  const renderStep = () => {
    switch(step) {
      case 0:
        return (
          <div className="min-h-screen bg-pink-50">
            <div 
              ref={topFocusRef} 
              tabIndex={-1} 
              className="outline-none"
            />
            <Welcome 
              mixedFraction={mixedFraction}
              sendAdminMessage={sendAdminMessage}
            />
          </div>
        );
      case 1:
        return (
          <div className="min-h-screen bg-pink-50">
            <div 
              ref={topFocusRef} 
              tabIndex={-1} 
              className="outline-none"
            />
            <QuickHack2 mixedFraction={mixedFraction}/>
          </div>
        );
    }
  };

  return (
    <div ref={containerRef} className="w-full min-h-screen bg-pink-50">
      {renderStep()}

    </div>
  );
}