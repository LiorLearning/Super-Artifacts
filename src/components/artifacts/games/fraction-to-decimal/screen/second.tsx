import { useGameState } from '../state-utils';
import Header from '../components/header';
import { BaseProps } from '../utils/types';
import Bar from '../components/bar';
import { useState, useEffect } from 'react';
import FractionBox from '../components/FractionBox';
import DecimalBox from '../components/DecimalBox';
import Proceed from '../components/proceed';


export default function SecondScreen({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { screen } = gameStateRef.current;
  const { step } = gameStateRef.current.state2;

  return (
    <div>
      {step <= 3 ? <Tenth sendAdminMessage={sendAdminMessage} /> : step <= 6 ? <Hundred sendAdminMessage={sendAdminMessage} /> : <ThirdScreen sendAdminMessage={sendAdminMessage} />}
    </div>
  );
}

function Tenth({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { question2 } = gameStateRef.current.question;
  const [selectedPieces, setSelectedPieces] = useState(0);
  const {step} = gameStateRef.current.state2;
  const [fractionNumerator, setFractionNumerator] = useState('');
  const [fractionDenominator, setFractionDenominator] = useState('');
  const [wholes, setWholes] = useState('');
  const [tenths, setTenths] = useState('');

  const setStep = (value: number) => {
    setGameStateRef(prev => ({
      ...prev,
      state2: {
        ...prev.state2,
        step: value
      }
    }));
  };

  useEffect(() => {
    if (fractionNumerator === String(question2.numerator) && 
        fractionDenominator === String(question2.denominator)) {
      setStep(2);
      sendAdminMessage('user', 'Correct fraction entered');
    }
  }, [fractionNumerator, fractionDenominator, question2]);

  useEffect(() => {
    if (step === 2 && wholes === '0' && tenths === String(question2.numerator)) {
      setStep(3);
      sendAdminMessage('user', 'Correct decimal entered');
    }
  }, [wholes, tenths, step, question2]);

  const handleProceed = () => {
    setStep(4);
    sendAdminMessage('user', 'Proceeded to third screen');
  };

  return (
    <div className='flex flex-col items-center justify-center h-full w-full'>
      <Header
        title={
          <span className='text-xl flex justify-center items-center font-bold'> 
            Convert visuals to decimal
          </span>
        }
        level="Level 2"
        leftBox={`STEP ${step}`}
        rightBox={
          step === 1 
            ? "Enter mixed fraction" 
            : "Enter decimal form"
        }
      />

      <div className='flex w-full flex-col max-w-screen-md mx-auto items-center justify-center gap-8 mt-8'>
        <Bar
          numerator={question2.numerator}
          denominator={question2.denominator}
          handlePieceClick={(index) => setSelectedPieces(index)}
          active={false}
        />

        <div className="flex justify-center gap-32 w-full max-w-3xl">
          <FractionBox 
            numerator={fractionNumerator}
            denominator={fractionDenominator}
            onChange={{
              numerator: setFractionNumerator,
              denominator: setFractionDenominator
            }}
          />
          <DecimalBox 
            wholes={wholes}
            tenths={tenths}
            onChange={{
              wholes: setWholes,
              tenths: setTenths
            }}
            disabled={step === 1}
          />
        </div>

        {step === 3 && (
          <Proceed
            onComplete={handleProceed}
            text="Proceed"
          />
        )}
      </div>
    </div>
  );
}
 

function Hundred({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { question3 } = gameStateRef.current.question;
  const [selectedPieces, setSelectedPieces] = useState(0);
  const {step} = gameStateRef.current.state2;
  const [fractionNumerator, setFractionNumerator] = useState('');
  const [fractionDenominator, setFractionDenominator] = useState('');
  const [wholes, setWholes] = useState('');
  const [tenths, setTenths] = useState('');
  const [hundredths, setHundredths] = useState('');


  const setStep = (value: number) => {
    setGameStateRef(prev => ({
      ...prev,
      state2: {
        ...prev.state2,
        step: value
      }
    }));
  };

  useEffect(() => {
    if (fractionNumerator === String(question3.numerator) && 
        fractionDenominator === String(question3.denominator)) {
      setStep(5);
      sendAdminMessage('user', 'Correct fraction entered');
    }
  }, [fractionNumerator, fractionDenominator, question3]);

  useEffect(() => {
    if (step === 5 && wholes === '0' && hundredths === String(question3.numerator)) {
      setStep(6);
      sendAdminMessage('user', 'Correct decimal entered');
    }
  }, [wholes, hundredths, step, question3]);

  const handleProceed = () => {
    setStep(7);
    sendAdminMessage('user', 'Proceeded to third screen');
  };

  return (
    <div className='flex flex-col items-center justify-center h-full w-full'>
      <Header
        title={
          <span className='text-xl flex justify-center items-center font-bold'> 
            Convert visuals to decimal
          </span>
        }
        level="Level 2"
        leftBox={`STEP ${step === 4 ? 1 : 2}`}
        rightBox={
          step === 4 
            ? "Enter mixed fraction" 
            : "Enter decimal form"
        }
      />

      <div className='flex w-full flex-col max-w-screen-md mx-auto items-center justify-center gap-8 my-8'>
        <Bar
          numerator={question3.numerator}
          denominator={question3.denominator}
          handlePieceClick={(index) => setSelectedPieces(index)}
          active={false}
        />

        <div className="flex justify-center gap-32 w-full max-w-3xl">
          <FractionBox 
            numerator={fractionNumerator}
            denominator={fractionDenominator}
            onChange={{
              numerator: setFractionNumerator,
              denominator: setFractionDenominator
            }}
          />
          <div className="flex flex-col items-center gap-2 text-2xl">
            <div className="text-center mb-2">
              <span className="text-lg font-bold bg-[#FFE4B5] px-4 py-1">Decimal</span>
            </div>
            <div className="border-2 border-black p-4 bg-white">
              <div className="flex items-center gap-2">
                <div className="flex flex-col items-center">
                  <span className="text-sm font-bold">Wholes</span>
                  <input
                    type="text"
                    value={wholes}
                    onChange={(e) => setWholes(e.target.value)}
                    className="w-16 h-16 border-4 border-green-600 rounded-lg text-center text-2xl"
                    maxLength={1}
                  />
                </div>
                <span className="text-4xl mb-6">.</span>
                <div className='flex flex-col items-center'>
                  <span className="text-sm font-bold">Tenths</span>
                  <input 
                    type="text"
                    value={tenths}
                    onChange={(e) => setTenths(e.target.value)}
                    className="w-16 h-16 border-4 border-pink-400 rounded-lg text-center text-2xl"
                    maxLength={1}
                  />  
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-sm font-bold">Hundredths</span>
                  <input
                    type="text"
                    value={hundredths}
                    onChange={(e) => setHundredths(e.target.value)}
                    className="w-16 h-16 border-4 border-pink-400 rounded-lg text-center text-2xl"
                    maxLength={2}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {step === 6 && (
          <Proceed
            onComplete={handleProceed}
            text="Onward!"
          />
        )}
      </div>
    </div>
  );
}

function ThirdScreen({ sendAdminMessage }: BaseProps) {
    const { gameStateRef, setGameStateRef } = useGameState();
    const { question4 } = gameStateRef.current.question;
    const [selectedPieces, setSelectedPieces] = useState(0);
    const {step} = gameStateRef.current.state2;
    const [fractionNumerator, setFractionNumerator] = useState('');
    const [fractionDenominator, setFractionDenominator] = useState('');
    const [wholes, setWholes] = useState('');
    const [tenths, setTenths] = useState('');
    const [hundredths, setHundredths] = useState('');
  
  
    const setStep = (value: number) => {
      setGameStateRef(prev => ({
        ...prev,
        state2: {
          ...prev.state2,
          step: value
        }
      }));
    };
  
    useEffect(() => {
      console.log(fractionNumerator, fractionDenominator, question4);
      if (fractionNumerator === String(question4.numerator) && 
          fractionDenominator === String(question4.denominator)) {
        setStep(8);
        sendAdminMessage('user', 'Correct fraction entered');
      }
    }, [fractionNumerator, fractionDenominator, question4]);
  
    useEffect(() => {
      console.log(wholes, tenths, hundredths, question4.numerator/10, question4.numerator % 10, step, question4);
      if (step === 8 && wholes === '0' && tenths === String(Math.floor(question4.numerator / 10)) && hundredths === String(question4.numerator % 10)) {
        setStep(9);
        sendAdminMessage('user', 'Correct decimal entered');
      }
    }, [wholes, hundredths, step, question4]);
  
    const handleProceed = () => {
      setGameStateRef(prev => ({
        ...prev,
        screen: 'third'
      }));
      sendAdminMessage('user', 'Moving to next level');
    };
  
    return (
      <div className='flex flex-col items-center justify-center h-full w-full'>
        <Header
          title={
            <span className='text-xl flex justify-center items-center font-bold'> 
              Convert visuals to decimal
            </span>
          }
          level="Level 2"
          leftBox={`STEP ${step === 7 ? 1 : 2}`}
          rightBox={
            step === 7 
              ? "Enter mixed fraction" 
              : "Enter decimal form"
          }
        />
  
        <div className='flex w-full flex-col max-w-screen-md mx-auto items-center justify-center gap-8 my-8'>
          <Bar
            numerator={question4.numerator}
            denominator={question4.denominator}
            handlePieceClick={(index) => setSelectedPieces(index)}
            active={false}
          />
  
          <div className="flex justify-center gap-32 w-full max-w-3xl">
            <FractionBox 
              numerator={fractionNumerator}
              denominator={fractionDenominator}
              onChange={{
                numerator: setFractionNumerator,
                denominator: setFractionDenominator
              }}
            />
            <div className="flex flex-col items-center gap-2 text-2xl">
              <div className="text-center mb-2">
                <span className="text-lg font-bold bg-[#FFE4B5] px-4 py-1">Decimal</span>
              </div>
              <div className="border-2 border-black p-4 bg-white">
                <div className="flex items-center gap-2">
                  <div className="flex flex-col items-center">
                    <span className="text-sm font-bold">Wholes</span>
                    <input
                      type="text"
                      value={wholes}
                      onChange={(e) => setWholes(e.target.value)}
                      className="w-16 h-16 border-4 border-green-600 rounded-lg text-center text-2xl"
                      maxLength={1}
                    />
                  </div>
                  <span className="text-4xl mb-6">.</span>
                  <div className='flex flex-col items-center'>
                    <span className="text-sm font-bold">Tenths</span>
                    <input 
                      type="text"
                      value={tenths}
                      onChange={(e) => setTenths(e.target.value)}
                      className="w-16 h-16 border-4 border-pink-400 rounded-lg text-center text-2xl"
                      maxLength={1}
                    />
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-sm font-bold">Hundredths</span>
                    <input
                      type="text"
                      value={hundredths}
                      onChange={(e) => setHundredths(e.target.value)}
                      className="w-16 h-16 border-4 border-pink-400 rounded-lg text-center text-2xl"
                      maxLength={2}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          {step === 9 && (
            <Proceed
              onComplete={handleProceed}
              text="Onward!"
            />
          )}
        </div>
      </div>
    );
  }