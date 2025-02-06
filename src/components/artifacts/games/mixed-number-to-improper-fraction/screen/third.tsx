import React from 'react';
import Main from '../components/Steps_Screen3/Main';
import { useGameState } from '../state-utils';

interface ThirdScreenProps {
  sendAdminMessage: (role: string, content: string, onComplete?: () => void) => void;
}

const ThirdScreen: React.FC<ThirdScreenProps> = ({ sendAdminMessage }) => {
  const { gameStateRef } = useGameState();
  const { mixedFraction1, mixedFraction2 } = gameStateRef.current.state3;

  return (
    <div className="min-h-screen bg-pink-50">
      <main className="flex-grow flex items-start justify-center py-8">
        <Main
          mixedFraction1={mixedFraction1}
          mixedFraction2={mixedFraction2}
          sendAdminMessage={sendAdminMessage}
        />
      </main>
    </div>
  );
};

export default ThirdScreen;