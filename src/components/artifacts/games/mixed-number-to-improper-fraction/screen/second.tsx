import { useGameState } from '../state-utils';
import QuickHack2 from '../components/Steps_Screen2/Logic';
import Welcome from '../components/Steps_Screen2/Welcome';
import { useRef, useEffect } from 'react';

interface SecondScreenProps {
  sendAdminMessage: (role: string, content: string, onComplete?: () => void) => void;
}

export default function SecondScreen({ sendAdminMessage }: SecondScreenProps) {
  const { gameStateRef } = useGameState();
  const { step, mixedFraction } = gameStateRef.current.state2;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, [step]);

  return (
    <div ref={containerRef} className="w-full">
      <div className="min-h-screen bg-pink-50">
        <div style={{ transform: 'scale(0.65)', transformOrigin: 'top center' }}>
          {step === 0 && <Welcome mixedFraction={mixedFraction} sendAdminMessage={sendAdminMessage} />}
          {step === 1 && <QuickHack2 mixedFraction={mixedFraction} sendAdminMessage={sendAdminMessage}/>}
        </div>
      </div>
    </div>
  );
}