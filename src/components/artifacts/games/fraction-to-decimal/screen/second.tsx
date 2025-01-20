import { useGameState } from '../state-utils';
import Header from '../components/header';
import { BaseProps } from '../utils/types';
import Bar from '../components/bar';
import { useState } from 'react';
import FractionBox from '../components/FractionBox';
import DecimalBox from '../components/DecimalBox';

export default function SecondScreen({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { question2 } = gameStateRef.current.question;
  const [selectedPieces, setSelectedPieces] = useState(0);
  const [denominator, setDenominator] = useState(1);

  return (
    <div className='flex flex-col items-center justify-center h-full w-full'>
      <Header
        title={
          <span className='text-xl flex justify-center items-center font-bold'> 
            Convert fraction to decimal
          </span>
        }
        level="Level 2"
        leftBox="STEP 1"
        rightBox="Split and select pieces"
      />

      <div className='flex flex-col items-center justify-center gap-8 mt-8'>
        <Bar
          numerator={selectedPieces}
          denominator={denominator}
          handlePieceClick={(index) => setSelectedPieces(index)}
          active={true}
        />

        <div className="flex justify-center gap-32 w-full max-w-3xl">
          <FractionBox 
            numerator=""
            denominator=""
          />
          <DecimalBox 
            wholes=""
            tenths=""
          />
        </div>
      </div>
    </div>
  );
}
  
  