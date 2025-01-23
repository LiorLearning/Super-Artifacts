'use client';

import Screen1 from './Screen1';
import Screen2 from './Screen2';
import { useGameState } from './state-utils';
import { Card } from '@/components/ui/card'; // Add Card import
import { GameScreen } from './game-state';

interface EquationProps {
  sendAdminMessage: (role: string, content: string) => void;
}

export default function DifferentNumeratorDenominator({ sendAdminMessage }: EquationProps) {
  const { gameStateRef, setGameStateRef } = useGameState();

  const handleNext = (nextFrame: GameScreen) => {
    setGameStateRef({ screen: nextFrame });
  };

  switch (gameStateRef.current.screen) {
    case 1:
      return <Screen1 onProceed={() => handleNext(2)} sendAdminMessage={sendAdminMessage} />;
    case 2:
      return <Screen2 onProceed={() => {}} sendAdminMessage={sendAdminMessage} />;
    default:
      return <Card>Invalid Frame</Card>;
  }
}



// - “⁠Awesome, it's time to answer our original question?” - no question mark at the end
// - ⁠chocolate state gets changed if i click previous from screen 2 (it should 6/8 instead of 7)
// - ⁠Conversation should be exactly as in figma, some parts are different. Really changes the experience.