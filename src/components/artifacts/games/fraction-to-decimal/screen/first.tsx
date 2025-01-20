import { useGameState } from '../state-utils';
import Header from '../components/header';
import { BaseProps } from '../utils/types';
import Fraction from '../components/Fraction';
import Bar from '../components/bar';
import RedBox from '../components/RedBox';
import { useState, useEffect } from 'react';
import { Button } from '@/components/custom_ui/button';
import Proceed from '../components/proceed';

export default function FirstScreen({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { state1 } = gameStateRef.current;
  const [selectedPieces, setSelectedPieces] = useState(0);
  const [denominator, setDenominator] = useState(1);
  const [step, setStep] = useState(1);
  const [wholes, setWholes] = useState('');
  const [tenths, setTenths] = useState('');

  const {question1} = gameStateRef.current.question;

  useEffect(() => {
    if (denominator === 10) { 
      setStep(2);
      sendAdminMessage('user', 'Reached 10 pieces, moving to step 2');
    }
  }, [denominator]);

  useEffect(() => {
    if (step === 2 && selectedPieces === question1.numerator) {
      setStep(3);
      sendAdminMessage('user', 'Correct fraction selected, moving to step 3');
    }
  }, [selectedPieces, step]);

  useEffect(() => {
    if (parseInt(tenths) === question1.numerator) {
      setStep(4);
    }
  }, [tenths]);

  const handlePieceClick = (index: number) => {
    setSelectedPieces(index);
  };

  const handleSplitClick = () => {
    setDenominator(prev => prev + 1);
    setSelectedPieces(0);
    sendAdminMessage('user', 'Split chocolate bar');
  };

  const handleJoinClick = () => {
    if (denominator > 1) {
      setDenominator(prev => prev - 1);
      setSelectedPieces(0);
      sendAdminMessage('user', 'Joined chocolate pieces');
    }
  };

  return (
    <div className='flex flex-col items-center justify-center h-full w-full'>
      <Header
        title={
          <span className='text-xl flex justify-center items-center font-bold'> 
            Convert 
            <Fraction numerator={question1.numerator} denominator={question1.denominator} className='text-xl bg-white text-black mx-2 px-2 h-full' /> 
            to a decimal
          </span>
        }
        level="Level 1"
        leftBox={`STEP ${step === 1 ? '1' : step === 2 ? '2' :'3'}`}
        rightBox={
          step === 1 
            ? "Split the chocolate into 10 pieces" 
            : step === 2 
              ? "Select pieces"
              : "Enter decimal form"
        }
      />

      <div className='flex flex-col items-center w-screen-md justify-center gap-4 mt-8'>
        <div className="flex relative w-full items-center gap-8">
          <Bar
            numerator={selectedPieces}
            denominator={denominator}
            handlePieceClick={handlePieceClick}
            active={true}
          />
          
          {step === 1 ? (
            <div className="flex absolute left-[110%] flex-col gap-2">
              <Button
                onClick={handleSplitClick}
                className="bg-[#d3ea00] hover:bg-[#d3ea00]/80 text-black font-bold px-4 py-2 rounded-sm flex items-center gap-2"
                disabled={denominator >= 10}
              >
                Split 🔪
              </Button>
              <Button
                onClick={handleJoinClick}
                className="bg-[#d3ea00] hover:bg-[#d3ea00]/80 text-black font-bold px-4 py-2 rounded-sm flex items-center gap-2"
                disabled={denominator === 1}
              >
                Join 🍯
              </Button>
            </div>
          ) : ( step >= 2) && (
            <Fraction 
              numerator={selectedPieces} 
              denominator={denominator} 
              className='text-3xl text-black p-2 px-4 absolute left-[110%]'
            />
          )}
        </div>
        
        
        <div className="flex items-center text-2xl gap-4">
          {step === 1 && (
            <div className="flex items-center gap-4">
              <RedBox>
                {denominator || 0}
              </RedBox> piece(s)
            </div>
          )}



          {step >= 3 && (
            <div className="flex flex-col items-center gap-2 text-2xl">
              <div className="flex items-center gap-2 text-2xl">
                <div className="flex flex-col items-center">
                  <span className="text-sm font-bold">Wholes</span>
                  <input
                    type="text"
                    value={0}
                    className="w-16 h-16 border-4 border-green-600 rounded-lg text-center text-2xl"
                    disabled={true}
                  />
                </div>
                <span className="text-4xl relative mb-6 flex flex-col justify-end h-full">
                  .
                  {step >= 4 && (
                    <img src="/img/mark.svg" className="w-92 h-92 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  )}
                </span>
                <div className="flex flex-col items-center">
                  <span className="text-sm font-bold">Tenths</span>
                  <input
                    type="text"
                    value={tenths}
                    onChange={(e) => setTenths(e.target.value)}
                    className="w-16 h-16 border-4 border-pink-400 rounded-lg text-center text-2xl"
                    maxLength={1}
                  />
                </div>
              </div>
              {step >= 4 && (
                  <p className="text-2xl">
                    The dot seprates the wholes from  the fraction
                  </p>
                )}
            </div>
          )}
        </div>

        {step === 4 && (
          <Proceed
            onComplete={() => {
              setGameStateRef(prev => ({
                ...prev,
                screen : "second"
              }));
            }}
            text="Onward"
          />
        )}
      </div>
    </div>
  );
}