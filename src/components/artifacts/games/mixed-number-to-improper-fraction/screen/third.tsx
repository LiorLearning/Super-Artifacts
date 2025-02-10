import React, { useRef, useEffect } from 'react';
import Main from '../components/Steps_Screen3/Main';
import { useGameState } from '../state-utils';

interface ThirdScreenProps {
  sendAdminMessage: (role: string, content: string, onComplete?: () => void) => void;
}

const ThirdScreen: React.FC<ThirdScreenProps> = ({ sendAdminMessage }) => {
  const { gameStateRef } = useGameState();
  const { mixedFraction1, mixedFraction2 } = gameStateRef.current.state3;

  const containerRef = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }

  }, []); 


  return (
    <div ref={containerRef} className="w-full">
      <div className="min-h-screen bg-pink-50">
        <div style={{ transform: 'scale(0.65)', transformOrigin: 'top center' }}>
          <main className="flex-grow flex items-start justify-center py-8">
            <Main
              mixedFraction1={mixedFraction1}
              mixedFraction2={mixedFraction2}


            />
          </main>
        </div>
      </div>
    </div>
  );
};

export default ThirdScreen;