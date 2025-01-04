import { useGameState } from '../state-utils';
import Header from '../components/header';
import { BaseProps } from '../utils/types';
import { useEffect } from 'react';
import { nextStep } from '../utils/helper';

export default function FirstScreen({ sendAdminMessage }: BaseProps) {
  const { gameStateRef } = useGameState();
  const { screen } = gameStateRef.current;
  const { step, variable } = gameStateRef.current.state1;

  useEffect(() => {
    if (step === 0) {
      nextStep(screen);
    }
  }, [step]);

  return (
    <div className="mx-auto">
      <Header variable={variable} />
    </div>
  );
}