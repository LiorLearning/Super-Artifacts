import { useGameState } from '../state-utils';
import Header from '../components/header';
import { BaseProps } from '../utils/types';
import Fraction from '../components/Fraction';
import Bar from '../components/bar';
import RedBox from '../components/RedBox';
import { useState, useEffect } from 'react';
import { Button } from '@/components/custom_ui/button';

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
  }, [denominator, sendAdminMessage]);

  useEffect(() => {
    if (step === 2 && selectedPieces === question1.numerator) {
      setStep(3);
      sendAdminMessage('user', 'Correct fraction selected, moving to step 3');
    }
  }, [selectedPieces, step, sendAdminMessage]);

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
            <Fraction numerator={1} denominator={2} className='text-xl bg-white text-black mx-2 px-2 h-full' /> 
            to a decimal
          </span>
        }
        level="Level 1"
        leftBox={`STEP ${step}`}
        rightBox={
          step === 1 
            ? "Split the fraction into 10 pieces" 
            : step === 2 
              ? "Select the matching fraction"
              : "Convert to decimal"
        }
      />

      <div className='flex flex-col items-center justify-center gap-4 mt-8'>
        <div className="flex items-center gap-8">
          <Bar
            numerator={selectedPieces}
            denominator={denominator}
            handlePieceClick={handlePieceClick}
            active={true}
          />
          
          {step === 1 && (
            <div className="flex flex-col gap-2">
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
          )}
        </div>
        
        <div className="flex items-center gap-4">
          <RedBox>
            <div className="text-center">
              <span className="text-2xl font-bold">
                {selectedPieces || 0} piece(s)
              </span>
            </div>
          </RedBox>

          {step === 2 && (
            <Fraction 
              numerator={selectedPieces} 
              denominator={denominator} 
              className='text-3xl text-black p-2 px-4'
            />
          )}

          {step === 3 && (
            <div className="flex items-center gap-2 text-2xl">
              <div className="flex flex-col items-center">
                <span className="text-sm font-bold">Wholes</span>
                <input
                  type="text"
                  value={wholes}
                  onChange={(e) => setWholes(e.target.value)}
                  className="w-16 h-16 border-4 border-green-600 text-center text-2xl"
                  maxLength={1}
                />
              </div>
              <span className="text-4xl mb-6">.</span>
              <div className="flex flex-col items-center">
                <span className="text-sm font-bold">Tenths</span>
                <input
                  type="text"
                  value={tenths}
                  onChange={(e) => setTenths(e.target.value)}
                  className="w-16 h-16 border-4 border-pink-400 text-center text-2xl"
                  maxLength={1}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}