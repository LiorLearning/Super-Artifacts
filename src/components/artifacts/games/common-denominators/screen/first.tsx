import { useGameState } from '../state-utils';
import Header from '../components/header';
import { BaseProps, COLORS } from '../utils/types';
import { StepModule } from '../components/stepHeader';
import KnifeGame from '../components/knife-game';
import ProceedButton from '../components/proceed-button';
import { goToStep } from '../utils/helper';


export default function FirstScreen({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { step, fraction1, fraction2 } = gameStateRef.current.state1;

  return (
    <div className="mx-auto">
      <Header fraction1={fraction1} fraction2={fraction2} />
      <div className="flex flex-col items-center justify-center m-4">
        <StepModule color={COLORS.pink} stepNumber={1} stepText="Create Equivalent Fractions" />
      </div>

      <KnifeGame fraction={fraction1} />

      {step >= 2 && 
        <ProceedButton onClick={() => goToStep('first', setGameStateRef, 3)} />
      }

      {step >= 3 && 
        <>
          <div className="flex flex-col items-center justify-center m-4">
            <StepModule color={COLORS.pink} stepNumber={2} stepText="Create Equivalent Fractions" />
          </div>
          <KnifeGame fraction={fraction2} />
        </>
      }

      {step >= 4 &&
        <ProceedButton onClick={() => goToStep('first', setGameStateRef, 5)} />
      }
    </div>
  );
}
