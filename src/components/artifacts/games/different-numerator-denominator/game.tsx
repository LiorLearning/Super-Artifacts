'use client';

import FirstScreen from './FirstScreen';
import SecondScreen from './SecondScreen';
import ThirdScreen from './ThirdScreen';
import FourthScreen from './FourthScreen';
import FiveScreen from './FiveScreen';
import { useGameState } from './state-utils';
import { Card } from '@/components/ui/card'; // Add Card import
import { useEffect, useState } from 'react';

export const desc = `Steps to Find Common Denominators:

1. Create equivalent fractions from the original fractions
   - Use the knife tool to split each chocolate bar
   - Calculate the total pieces after splitting

2. Find multiples of each denominator
   - List out the first few multiples
   - Identify common multiples between denominators

3. Identify the least common multiple (LCM)
   - Look for the smallest number that appears in both lists
   - This will be your common denominator

4. Select fractions with matching denominators
   - Compare the chocolate bars
   - Choose the ones that have been split into the same number of pieces

5. Use this understanding to convert fractions to equivalent forms
   - Both fractions should have the same denominator
   - The numerators will change based on how many times you split the bar`;

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
