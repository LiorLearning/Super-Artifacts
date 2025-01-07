import { useGameState } from '../state-utils';
import Header from '../components/header';
import { BaseProps, COLORS } from '../utils/types';
import { StepModule } from '../components/stepHeader';
import { ChocolateBar } from '../components/chocolate-bar';
import { Fraction } from '../game-state';
import { useState } from 'react';
import { goToStep, goToScreen, nextStep } from '../utils/helper';
import ProceedButton from '../components/proceed-button';
import MultiplesGrid from '../components/multiple-grids';
import KnifeRow from '../components/knife-row';
import { Button } from '@/components/custom_ui/button';


const TotalPieceGame = ({ fraction, rows }: { fraction: Fraction, rows: number }) => {
  const [multiplier, setMultiplier] = useState(1)
  const { setGameStateRef } = useGameState();

  const handleSelectMultiplier = (multiplier: number) => {
    setMultiplier(multiplier)
    if (multiplier === rows) {
      nextStep('third', setGameStateRef);
    }
  }

  return (
    <div>
      <div className="w-full flex flex-col items-center gap-16 mt-8">
        <div className="flex items-center justify-center gap-8 w-full">
          <div className="w-16"></div>
          <div className="w-[480px]">
            <ChocolateBar 
              pieces={parseInt(fraction.denominator) * multiplier} 
              filledPieces={parseInt(fraction.numerator) * multiplier} 
            />
          </div>
          <div className="flex flex-col items-center w-12">
            <div className="text-2xl font-bold">{parseInt(fraction.numerator) * multiplier}</div>
            <div className="border-t-2 border-black w-8"></div>
            <div className="text-2xl font-bold">{parseInt(fraction.denominator) * multiplier}</div>
          </div>
        </div>

      </div>
      <div className="flex flex-col items-center gap-4 mt-8">
        {Array.from({ length: rows }, (_, index) => (
          <KnifeRow 
            key={index} 
            fraction={fraction} 
            index={index + 1} 
            input={index === 0 ? 'none' : index < rows / 2 ? 'one' : 'two'} 
            onSelectMultiplier={handleSelectMultiplier}
          />
        ))}
      </div>
    </div>
  )
}



export default function ThirdScreen({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { step, fraction1, fraction2, gcd } = gameStateRef.current.state3;

  return (
    <div className="mx-auto pb-48">
      <Header fraction1={fraction1} fraction2={fraction2} />
      <div className="flex flex-col items-center justify-center m-4">
        <StepModule color={COLORS.pink} stepNumber={step < 2 ? 1 : 2} stepText="FIND THE TOTAL PIECES" />
      </div>

      {step <= 1 && <TotalPieceGame fraction={fraction1} rows={5} />}
      {step == 1 && <ProceedButton onClick={() => goToStep('third', setGameStateRef, 2)} />}
      {step > 1 && <TotalPieceGame fraction={fraction2} rows={3} />}
      {step > 2 && <ProceedButton onClick={() => goToStep('third', setGameStateRef, 4)} />}
      {step > 3 && 
        <div className="flex flex-col items-center justify-center mb-8" style={{
          backgroundColor: COLORS.pinkLight
        }}>
          <div className="flex flex-col items-center justify-center m-4">
            <StepModule color={COLORS.pink} stepNumber={3} stepText="REFLECT" />
          </div>

          <MultiplesGrid number1={parseInt(fraction1.denominator)} number2={parseInt(fraction2.denominator)} gcd={gcd} />
        </div>
      }
      {step}
      {step >= 5 && 
        <>
          <div className="flex flex-col items-center justify-center" style={{
            backgroundColor: COLORS.pinkLight
          }}>

            <div className="text-center text-2xl mt-16 mb-8">
              <p>How did we find the common denominator?</p>
            </div>
            <div className="flex flex-col items-center justify-center mb-4">
              <Button
                onClick={() => nextStep('third', setGameStateRef)}
                className="bg-[#FF497C] text-white px-8 py-2 text-xl font-bold border-2 border-black hover:bg-[#FF497C]/90 shadow-[-5px_5px_0px_0px_rgba(0,0,0,1)] rounded-none"
              >
                Split each chocolate until the denominators matched.
              </Button>
            </div>
            <div className="flex flex-col items-center justify-center mb-16">
              <Button
                onClick={() => {}}
                className="bg-[#FF497C] text-white px-8 py-2 text-xl font-bold border-2 border-black hover:bg-[#FF497C]/90 shadow-[-5px_5px_0px_0px_rgba(0,0,0,1)] rounded-none"
              >
                Picked the greater of the two denominators.
              </Button>
            </div>
          </div>
          {step >= 6 && <ProceedButton onClick={() => goToScreen('fourth', setGameStateRef)} />} 
        </>
      }
    </div>
  );
}
