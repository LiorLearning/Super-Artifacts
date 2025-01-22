import React from 'react';
import { useGameState } from '../state-utils';
import Header from '../components/header';
import Fraction from '../components/Fraction';


interface FifthScreenProps {
  sendAdminMessage: (role: string, content: string) => void;
}

const FifthScreen: React.FC<FifthScreenProps> = ({ sendAdminMessage }) => {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { question7, question8 } = gameStateRef.current.question
  const { step } = gameStateRef.current.state5

  return (
      <div className="flex flex-col h-full w-full">
        <Header
          title={
            <>
              Convert 
              <span className='bg-white px-2 py-1 rounded-md'>
                {step < 1 ? <Fraction numerator={question7.numerator} denominator={question7.denominator} /> : <Fraction numerator={question8.numerator} denominator={question8.denominator} />}
              </span>
              to a fraction
            </>
          }
          level='Level 3'
          leftBox='Question'
          rightBox='Fill the box'
        /> 
        <div className='w-full flex flex-col items-center bg-[#edffee] my-10 py-20'>
          <div className='flex'>
            <span className='w-1/6 text-center bg-white text-xl'>
              <Fraction numerator={question7.numerator} denominator={question7.denominator} />
            </span>

          </div>
        </div>
    </div>
  );
};

export default FifthScreen; 