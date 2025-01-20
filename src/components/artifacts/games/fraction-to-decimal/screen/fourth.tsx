import React from 'react';
import { useGameState } from '../state-utils';
import Bar from '../components/bar';
import Proceed from '../components/proceed';
import RedBox from '../components/RedBox';

interface FourthScreenProps {
  sendAdminMessage: (role: string, content: string) => void;
}

const FourthScreen: React.FC<FourthScreenProps> = ({ sendAdminMessage }) => {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { state4 } = gameStateRef.current;



  return (
    <div className="flex flex-col items-center justify-center p-4">
      <RedBox className="mb-8">
        <h2 className="text-2xl mb-4">Screen 4</h2>
        <p>Continue exploring fractions</p>
      </RedBox>
    </div>
  );
};

export default FourthScreen; 