import { useGameState } from '../state-utils';
import Header from '../components/header';
import { BaseProps } from '../utils/types';
import Fraction from '../components/Fraction';
import Bar from '../components/bar';
import RedBox from '../components/RedBox';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/custom_ui/button';
import Proceed from '../components/proceed';
import Image from 'next/image';
import { sounds } from '../utils/sound';

export default function FirstScreen({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { state1 } = gameStateRef.current;
  const [selectedPieces, setSelectedPieces] = useState(0);
  const [denominator, setDenominator] = useState(1);
  const [step, setStep] = useState(1);
  const [wholes, setWholes] = useState('');
  const [tenths, setTenths] = useState('');

  const start = useRef(false);

  useEffect(() => {
    if (!start.current) {
      sendAdminMessage('agent', `Let's start by creating ${question1.numerator}/${question1.denominator}. We'll need to split the chocolate into ${question1.denominator} pieces first!`);
      start.current = true;
    }
  }, []);

  const {question1} = gameStateRef.current.question;

  useEffect(() => {
    if (denominator === 10) { 
      setStep(2);
      sendAdminMessage('agent', `Awesome, now let's select pieces so that we get ${question1.numerator}/${question1.denominator}th of the chocolate!`);
    }
  }, [denominator]);

  useEffect(() => {
    if (step === 2 && selectedPieces === question1.numerator) {
      setStep(3);
      sendAdminMessage('agent', 'Great, now its time to fill in the boxes. How many whole chocolates do we have?');
    }
  }, [selectedPieces, step]);

  useEffect(() => {
    if (parseInt(wholes) === Math.floor(question1.numerator/question1.denominator)) {
      setStep(4);
      sendAdminMessage('agent', 'Awesome, how many tenths do we have?');
    }
  }, [wholes]);

  useEffect(() => {
    if (parseInt(tenths) === Math.floor(question1.numerator*10/question1.denominator)) {
      setStep(5);
      sendAdminMessage('agent', 'Sweet! This way of representing fractions is called decimals. The dot in the middle separates the whole from the fraction!');
    }
  }, [tenths]);

  const handlePieceClick = (index: number) => {
    setSelectedPieces(index);
    sounds.join()
  };

  const handleSplitClick = () => {
    setDenominator(prev => prev + 1);
    setSelectedPieces(0);
    sounds.break();
    sendAdminMessage('user', 'Split chocolate bar');
  };

  const handleJoinClick = () => {
    if (denominator > 1) {
      setDenominator(prev => prev - 1);
      setSelectedPieces(0);
      sounds.join();
      sendAdminMessage('user', 'Joined chocolate pieces');
    }
  };

  return (
    <div className='flex flex-col items-center justify-center h-full w-full'>
      <Header
        title={
          <span className='text-3xl flex justify-center items-center font-bold'> 
            Convert 
            <Fraction numerator={question1.numerator} denominator={question1.denominator} className='text-3xl bg-white text-black mx-2 px-2 h-full' /> 
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

      <div className='flex flex-col items-center max-w-screen-md w-full justify-center gap-4 mt-8'>
        <div className="flex relative w-full items-center gap-8">
          <Bar
            numerator={selectedPieces}
            denominator={denominator}
            handlePieceClick={handlePieceClick}
            active={step <= 2}
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
                    value={wholes}
                    min={0}
                    max={9}
                    onChange={(e) => setWholes(e.target.value || '')}
                    maxLength={1}
                    className="w-16 h-16 border-4 border-green-600 rounded-lg text-center text-2xl"
                    disabled={step != 3}
                  />
                </div>
                <span className="text-4xl relative mt-6 flex flex-col justify-end h-full">
                  .
                  {step >= 5 && (
                    <div
                      className=" absolute h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" 
                    >
                      <svg width="50" height="50" viewBox="0 0 193 129" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M75.7301 111.569C76.8695 110.949 77.9968 109.945 79.1423 109.768C89.2693 108.291 99.4268 107.598 109.523 105.398C117.432 103.671 125.293 100.437 133.141 97.3372C142.147 93.7793 151.207 90.62 160.067 85.4973C168.146 80.8174 176.318 76.0194 183.672 65.8772C184.58 64.6224 185.476 63.3232 186.347 61.9355C191.088 54.3473 189.899 45.0023 186.438 38.0194C181.972 29.014 176.464 25.338 170.925 22.1196C160.396 15.993 149.69 12.8337 138.905 10.8997C120.57 7.62235 102.242 7.19422 83.8768 9.46773C67.8272 11.446 51.942 16.2883 36.191 23.7141C27.9956 27.582 19.8732 32.498 12.3603 41.6068C9.86812 44.6332 7.5405 48.8555 5.4627 53.4025C2.89135 59.042 3.07414 66.2611 5.4566 72.4911C9.4355 82.899 14.7001 88.2284 19.8854 93.7203C29.5371 103.936 39.6337 110.919 49.9191 116.116C55.8112 119.083 61.8009 120.884 67.7357 123.305C69.1798 123.896 70.5996 124.826 72.1412 125.667C65.0486 132.148 58.0901 127.646 51.1987 124.959C41.486 121.165 31.9744 115.2 22.8407 106.151C15.9248 99.3007 9.13693 91.7716 3.48848 79.5921C-1.96498 67.8259 -0.533062 52.62 4.39638 43.216C11.5803 29.5011 20.2449 23.5812 29.0375 18.9604C33.778 16.4654 38.5247 14.0147 43.3018 11.9922C48.0667 9.98444 52.8621 8.43432 57.6575 6.95802C58.8274 6.58894 60.0522 7.26804 60.7163 7.37138C62.1848 6.61847 63.2085 6.10177 64.226 5.55554C65.7737 4.74357 67.5164 4.81739 68.9178 4.7731C70.9895 4.69928 73.0917 0.905191 75.3706 4.35974C76.2297 5.65888 77.9115 3.57729 79.2276 3.31155C82.5911 2.61769 85.9607 2.02716 89.3302 1.48093C92.9435 0.905172 96.5629 0.152259 100.182 0.0046284C102.358 -0.0839497 104.533 1.12663 106.714 1.25949C108.353 1.36284 109.999 0.358962 111.638 0.418014C114.313 0.506592 116.981 1.22996 119.656 1.34807C121.362 1.42188 123.203 -0.24633 124.756 0.801844C128.833 3.533 132.94 1.99766 137.016 2.63247C141.994 3.40014 146.979 4.46308 151.926 6.04272C163.01 9.57108 174.154 12.8337 184.397 24.7917C186.377 27.1095 188.297 30.3131 189.851 34.0629C194.823 46.0948 193.756 62.1569 187.718 70.8819C179.602 82.6037 170.718 89.2028 161.566 93.6169C149.824 99.2859 137.997 103.951 126.231 109.354C115.214 114.418 104.106 116.854 92.9131 116.677C87.746 116.588 82.585 115.141 77.4179 114.211C76.8634 114.108 76.3333 113.355 75.791 112.897C75.7728 112.455 75.7545 112.012 75.7362 111.569H75.7301Z" fill="#FF856A"/>
                      </svg>
                    </ div>
                  )}
                </span>
                <div className="flex flex-col items-center">
                  <span className="text-sm font-bold">Tenths</span>
                  <input
                    type="text"
                    value={tenths}
                    min={0}
                    max={9}
                    onChange={(e) => setTenths(e.target.value || '')}
                    className="w-16 h-16 border-4 border-pink-400 rounded-lg text-center text-2xl"
                    maxLength={1}
                    disabled={step != 4}
                  />
                </div>
              </div>
              {step >= 5 && (
                  <p className="text-2xl">
                    The dot seprates the wholes from  the fraction
                  </p>
                )}
            </div>
          )}
        </div>

        {step === 5 && (
          <Proceed
            onComplete={() => {
              setGameStateRef(prev => ({
                ...prev,
                screen : "second"
              }));
              sounds.levelUp();
            }}
            text="Onward"
          />
        )}
      </div>
    </div>
  );
}