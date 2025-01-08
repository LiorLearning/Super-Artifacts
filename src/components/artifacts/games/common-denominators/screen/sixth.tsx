import { useGameState } from '../state-utils';
import Header from '../components/header';
import { BaseProps } from '../utils/types';
import { goToStep } from '../utils/helper';
import SuccessAnimation from '@/components/artifacts/utils/success-animate';
import { ECDSection } from '../components/ecd-section';
import { LCDSection } from '../components/lcd-section';


export default function SixthScreen({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { step, fraction1, fraction2, lcd } = gameStateRef.current.state6;

  return (
    <div className="mx-auto pb-48">
      <Header fraction1={fraction1} fraction2={fraction2} />
      
      {/* Step 1 - ECD Section */}
      <ECDSection fraction1={fraction1} fraction2={fraction2} onSuccess={() => goToStep('sixth', setGameStateRef, 1)} />
      
      {/* Step 2 - LCD Section */}
      {step >= 1 &&
        <LCDSection fraction1={fraction1} fraction2={fraction2} lcd={lcd} onSuccess={() => goToStep('sixth', setGameStateRef, 2)} />
      }
      {/* Proceed Button */}
      {step >= 2 && <SuccessAnimation />}
    </div>
  );
}