import { useGameState } from '../state-utils';
import Header from '../components/header';
import { BaseProps, COLORS } from '../utils/types';
import { StepModule } from '../components/stepHeader';
import { Button } from '@/components/custom_ui/button';
import KnifeGame from '../components/knife-game';
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
        <div className="flex flex-col items-center justify-center m-8 mb-16">
          <Button
            onClick={() => {
              goToStep('first', setGameStateRef, 3);
            }}
            className="bg-[#FF497C] text-white px-8 py-2 text-xl font-bold border-2 border-black hover:bg-[#FF497C]/90"
          >
            PROCEED
          </Button>
        </div>
      }

      {step >= 3 && 
        <>
          <div className="flex flex-col items-center justify-center m-4">
            <StepModule color={COLORS.pink} stepNumber={2} stepText="Create Equivalent Fractions" />
          </div>
          <KnifeGame fraction={fraction2} />
        </>
      }

      {step >= 5 &&
        <div className="flex flex-col items-center justify-center m-8 mb-16">
          <Button
            onClick={() => {
              goToStep('first', setGameStateRef, 6);
            }}
            className="bg-[#FF497C] text-white px-8 py-2 text-xl font-bold border-2 border-black hover:bg-[#FF497C]/90"
          >
            PROCEED
          </Button>
        </div>
      }
    </div>
  );
}
