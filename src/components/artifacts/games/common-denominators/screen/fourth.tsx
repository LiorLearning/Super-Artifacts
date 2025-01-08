import { useGameState } from '../state-utils';
import Header from '../components/header';
import { BaseProps, COLORS } from '../utils/types';
import { StepModule } from '../components/stepHeader';
import { ChocolateBar, ChocolateBarWithFraction } from '../components/chocolate-bar';
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
        <ChocolateBarWithFraction fraction={fraction} />

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



export default function FourthScreen({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { step, fraction1, fraction2, lcd, ecd } = gameStateRef.current.state4;

  return (
    <div className="mx-auto pb-48">
      <Header fraction1={fraction1} fraction2={fraction2} />
      <div className="flex flex-col items-center justify-center m-4">
        <StepModule color={COLORS.pink} stepNumber={1} stepText="FIND THE TOTAL PIECES" />
      </div>

      <div className="flex items-center justify-center gap-8 w-full mb-8">
        <ChocolateBarWithFraction fraction={fraction1}/>
      </div>

      <div className="flex items-center justify-center gap-8 w-full mb-8">
        <ChocolateBarWithFraction fraction={fraction2}/>
      </div>

      <div className="flex flex-col items-center justify-center mb-8" style={{
        backgroundColor: COLORS.pinkLight
      }}>
        <MultiplesGrid number1={parseInt(fraction1.denominator)} number2={parseInt(fraction2.denominator)} lcd={lcd} ecd={ecd} onSuccess={() => goToStep('fourth', setGameStateRef, 1)} />
      </div>

      {step >= 1 &&
        <>
          <div className="flex flex-col items-center justify-center m-4">
            <StepModule color={COLORS.pink} stepNumber={2} stepText="REFLECT" />
          </div>
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
                Multiply denominators directly to get ECD
              </Button>
            </div>
            <div className="flex flex-col items-center justify-center mb-16">
              <Button
                onClick={() => {}}
                className="bg-[#FF497C] text-white px-8 py-2 text-xl font-bold border-2 border-black hover:bg-[#FF497C]/90 shadow-[-5px_5px_0px_0px_rgba(0,0,0,1)] rounded-none"
              >
                Find multiples of each number to get the LCD
              </Button>
            </div>
          </div>
          {step >= 2 && <ProceedButton onClick={() => goToScreen('fifth', setGameStateRef)} />} 
        </>
      
      }
    </div>
  );
}
