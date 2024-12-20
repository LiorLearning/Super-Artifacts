'use client';

import { useState, useEffect } from 'react';
import { Card } from "@/components/custom_ui/card";
import { FirstScreen } from './FirstScreen';
import { SecondScreen } from './SecondScreen';
import { ThirdScreen } from './ThirdScreen';

export const desc = `Steps to Play the Game:
1. Break the first chocolate bar by clicking the "Split" button.
2. Select the pieces of the first bar that you want to keep.
3. Break the second chocolate bar by clicking the "Split" button for the second bar.
4. Select the pieces of the second bar that you want to keep.
5. Compare the selected pieces from both bars to determine which fraction is larger.`;

interface EquationProps {
  input: { numerator: number; denominator: number };
  output: { denominator: number };
  nextEvent: string;
  buttonText: string;
  sendAdminMessage: (role: string, content: string) => void;
}

interface EquivalentFractionsGameProps {
  sendAdminMessage: (role: string, content: string) => void;
}

export default function EquivalentFractionsGame({ sendAdminMessage }: EquivalentFractionsGameProps) {
  const [currentScreen, setCurrentScreen] = useState<'first' | 'second1' | 'second2' | 'third'>('first');

  const screens: Record<string, EquationProps> = {
    first: {
      input: { numerator: 3, denominator: 4 },
      output: { denominator: 12 },
      nextEvent: 'moveToSecondScreen1',
      buttonText: 'Next Equation →',
      sendAdminMessage
    },
    second1: {
      input: { numerator: 3, denominator: 4 },
      output: { denominator: 8 },
      nextEvent: 'moveToSecondScreen2',
      buttonText: 'Next Equation →',
      sendAdminMessage
    },
    second2: {
      input: { numerator: 2, denominator: 3 },
      output: { denominator: 9 },
      nextEvent: 'moveToThirdScreen',
      buttonText: 'Next Equation →',
      sendAdminMessage
    },
    third: {
      input: { numerator: 2, denominator: 3 },
      output: { denominator: 12 },
      nextEvent: 'moveToFirstScreen',
      buttonText: 'Try Again',
      sendAdminMessage
    }
  };

  useEffect(() => {
    const handleMoveToSecond1 = () => setCurrentScreen('second1');
    const handleMoveToSecond2 = () => setCurrentScreen('second2');
    const handleMoveToThird = () => setCurrentScreen('third');
    const handleGameComplete = () => {
      // Handle game completion
      console.log('Game completed!');
    };

    window.addEventListener('moveToSecondScreen1', handleMoveToSecond1);
    window.addEventListener('moveToSecondScreen2', handleMoveToSecond2);
    window.addEventListener('moveToThirdScreen', handleMoveToThird);
    window.addEventListener('gameComplete', handleGameComplete);

    return () => {
      window.removeEventListener('moveToSecondScreen1', handleMoveToSecond1);
      window.removeEventListener('moveToSecondScreen2', handleMoveToSecond2);
      window.removeEventListener('moveToThirdScreen', handleMoveToThird);
      window.removeEventListener('gameComplete', handleGameComplete);
    };
  }, []);

  return (
    <Card className="h-full w-full p-8 bg-gradient-to-br bg-[#FFF8EE] shadow-2xl">
      <div className="w-full max-w-7xl mx-auto">
        {currentScreen === 'first' && <FirstScreen {...screens.first} />}
        {currentScreen === 'second1' && <SecondScreen {...screens.second1} />}
        {currentScreen === 'second2' && <SecondScreen {...screens.second2} />}
        {currentScreen === 'third' && <ThirdScreen {...screens.third} />}
      </div>
    </Card>
  );
}
