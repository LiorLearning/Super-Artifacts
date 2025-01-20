import React from 'react';
import { useGameState } from '../state-utils';
import Bar from '../components/bar';
import Proceed from '../components/proceed';
import RedBox from '../components/RedBox';

interface ThirdScreenProps {
  sendAdminMessage: (role: string, content: string) => void;
}

const ThirdScreen: React.FC<ThirdScreenProps> = ({ sendAdminMessage }) => {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { state3 } = gameStateRef.current;



  return (
    <div className="flex flex-col items-center justify-center p-4">

    </div>
  );
};

export default ThirdScreen; 