'use client';

import FirstScreen from './FirstScreen';
import SecondScreen from './SecondScreen';
import ThirdScreen from './ThirdScreen';
import FourthScreen from './FourthScreen';
import FiveScreen from './FiveScreen';
import { useGameState } from './state-utils';
import { Card } from '@/components/ui/card'; // Add Card import
import { useEffect, useState } from 'react';

export const desc = `Steps to Play the Game:
1. Break the first chocolate bar by clicking the "Split" button.
2. Select the pieces of the first bar that you want to keep.
3. Break the second chocolate bar by clicking the "Split" button for the second bar.
4. Select the pieces of the second bar that you want to keep.
5. Compare the selected pieces from both bars to determine which fraction is larger.`;

interface EquationProps {
  sendAdminMessage: (role: string, content: string) => void;
}

export default function DifferentNumeratorDenominator({ sendAdminMessage }: EquationProps) {
  const { gameStateRef, setGameStateRef } = useGameState();

  const handleNext = (nextFrame: number) => {
    setGameStateRef({ currentFrame: nextFrame });
  };

  useEffect(() => {
    console.log('Current Frame:', gameStateRef.current.currentFrame);
  }, [gameStateRef.current.currentFrame]);

  switch (gameStateRef.current.currentFrame) {
    case 5:
      return <FirstScreen onNext={() => handleNext(2)} sendAdminMessage={sendAdminMessage} />;
    case 2:
      return <SecondScreen onNext={() => handleNext(3)} sendAdminMessage={sendAdminMessage} />;
    case 3:
      return <ThirdScreen onNext={() => handleNext(4)} sendAdminMessage={sendAdminMessage} />;
    case 4:
      return <FourthScreen onNext={() => handleNext(5)} sendAdminMessage={sendAdminMessage} />;
    case 1:
      return <FiveScreen onNext={() => handleNext(6)} sendAdminMessage={sendAdminMessage} />;
    default:
      return <Card>Invalid Frame</Card>;
  }
}
