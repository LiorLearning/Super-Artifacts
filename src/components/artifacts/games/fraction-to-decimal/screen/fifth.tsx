import React,{ useEffect, useState, useRef } from 'react';
import { useGameState } from '../state-utils';
import Header from '../components/header';
import Fraction from '../components/Fraction';
import Proceed from '../components/proceed';
import SuccessAnimation from '@/components/artifacts/utils/success-animate';
import { sounds } from '../utils/sound';


interface FifthScreenProps {
  sendAdminMessage: (role: string, content: string) => void;
}

const FifthScreen: React.FC<FifthScreenProps> = ({ sendAdminMessage }) => {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { question7, question8 } = gameStateRef.current.question
  const { step } = gameStateRef.current.state5

  const [wholes, setWholes] = useState('')
  const [tenths, setTenths] = useState('')
  const [hundredths, setHundredths] = useState('')

  const [disabled, setDisabled] = useState(true)

  const start = useRef(false);

  const [isTenthsCorrect, setIsTenthsCorrect] = useState(false);

  const [showFinish, setShowFinish] = useState(false);

  useEffect(() => {
    if (!start.current) {
      sendAdminMessage('agent', `this time, let's try converting a fraction to decimal without the visuals. Let me know if you need help!`);
      start.current = true;
    }
  }, []);

  const handleProceed = () => {
      setGameStateRef(prev => ({
        ...prev,
        state5: { step: 2 }
      }))
      setWholes('')
      setTenths('')
      setHundredths('')
      setDisabled(true)
      setIsTenthsCorrect(false);
      sendAdminMessage('agent', `Great, let's try another one!`);
  }

  useEffect(() => {
    const currentQuestion = step < 2 ? question7 : question8;
    const wholePart = Math.floor(currentQuestion.numerator / currentQuestion.denominator);

    if(wholes === wholePart.toString()) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [wholes, step, question7, question8])

  useEffect(() => {
    if (!wholes || !tenths || !hundredths) return;

    const currentQuestion = step < 2 ? question7 : question8;
    const decimal = (currentQuestion.numerator / currentQuestion.denominator);
    
    const inputDecimal = parseFloat(`${wholes}.${tenths}${hundredths}`);
    const decimalFixed = parseFloat(decimal.toFixed(2));

    if (inputDecimal === decimalFixed) {
      if (step === 0) {
        setGameStateRef(prev => ({
          ...prev,
          state5: { step: 1 }
        }));
      } else if (step === 2) {
        setShowFinish(true);
      }
    }
  }, [tenths, hundredths, wholes, step])

  const getCorrectValues = (numerator: number, denominator: number) => {
    const decimal = numerator / denominator;
    const wholes = Math.floor(decimal);
    const decimalPart = (decimal - wholes).toFixed(2);
    const [tenths, hundredths] = decimalPart.split('.')[1];
    return {
      wholes: wholes.toString(),
      tenths,
      hundredths
    };
  };

  const handleWholesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 1) {
      setWholes(value);
      
      if (value.length > 0) {
        const currentQuestion = step < 2 ? question7 : question8;
        const correct = getCorrectValues(currentQuestion.numerator, currentQuestion.denominator);
        
        if (value === correct.wholes) {
          sendAdminMessage('agent', 'Correct! Now enter the tenths digit.');
          setDisabled(false);
        } else {
          sendAdminMessage('admin', 'user is incorrect, diagnose socratically by referring to their current game state.');
        }
      }
    }
  };

  const handleTenthsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 1) {
      setTenths(value);
      
      if (value.length > 0) {
        const currentQuestion = step < 2 ? question7 : question8;
        const correct = getCorrectValues(currentQuestion.numerator, currentQuestion.denominator);
        
        if (value === correct.tenths) {
          sendAdminMessage('agent', 'Perfect! Finally, enter the hundredths digit.');
          setIsTenthsCorrect(true);
        } else {
          sendAdminMessage('admin', 'user is incorrect, diagnose socratically by referring to their current game state.');
          setIsTenthsCorrect(false);
        }
      }
    }
  };

  const handleHundredthsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 1) {
      setHundredths(value);
      
      if (value.length > 0) {
        const currentQuestion = step < 2 ? question7 : question8;
        const correct = getCorrectValues(currentQuestion.numerator, currentQuestion.denominator);
        
        if (value === correct.hundredths) {
          sendAdminMessage('agent', 'Excellent! You\'ve converted the fraction to a decimal.');
        } else {
          sendAdminMessage('admin', 'user is incorrect, diagnose socratically by referring to their current game state.');
        }
      }
    }
  };

  const handleFinish = () => {
    setGameStateRef(prev => ({
      ...prev,
      state5: { step: 3 }
    }));
    sounds.levelUp();
    sendAdminMessage('agent', `Awesome, you're now a master at converting fractions to decimals - great job!`);
  };

  return (
      <div className="flex flex-col h-full w-full">
        <Header
          title={
            <>
              Convert 
              <span className='bg-white px-2 py-1 rounded-md'>
                {step < 2 ? <Fraction numerator={question7.numerator} denominator={question7.denominator} /> : <Fraction numerator={question8.numerator} denominator={question8.denominator} />}
              </span>
              to decimal
            </>
          }
          level='Level 3'
          leftBox='Question'
          rightBox='Fill the box'
        /> 
        <div className='w-full flex flex-col items-center bg-[#fcf0ff] my-10 py-20'>
          <div className='flex'>
            <span className='px-4 py-2 text-center bg-white border border-gray-300 rounded-md text-black text-4xl'>
              {step < 2 ? <Fraction numerator={question7.numerator} denominator={question7.denominator} /> : <Fraction numerator={question8.numerator} denominator={question8.denominator} />}
            </span>

            <span className='text-4xl flex items-center mx-2'> = </span>

            <div className="border-2 border-black p-4 bg-white">
              <div className="flex items-center gap-2">
                <div className="flex flex-col items-center">
                  <span className="text-sm font-bold">Wholes</span>
                  <input
                    type="text"
                    value={wholes}
                    onChange={handleWholesChange}
                    className={`w-12 h-12 border-4 border-green-600 flex items-center justify-center text-2xl rounded-lg text-center ${
                      wholes.length > 0 
                        ? wholes === getCorrectValues(
                            (step < 2 ? question7 : question8).numerator,
                            (step < 2 ? question7 : question8).denominator
                          ).wholes
                          ? 'bg-green-100' 
                          : 'bg-red-100'
                        : ''
                    }`}
                    maxLength={1}
                    placeholder={disabled ? '?' : ''}
                    disabled={!disabled || step === 1 || step === 3}
                  />
                </div>
                <span className="text-4xl mb-6">.</span>
                <div className='flex flex-col items-center'>
                  <span className={`text-sm font-bold ${disabled ? 'opacity-50' : ''}`}>
                    Tenths
                  </span>
                  <input
                    type="text"
                    value={tenths}
                    onChange={handleTenthsChange}
                    className={`w-12 h-12 border-4 ${
                      disabled ? 'opacity-50' : 'border-pink-400'
                    } flex items-center justify-center text-2xl rounded-lg text-center ${
                      tenths.length > 0 
                        ? tenths === getCorrectValues(
                            (step < 2 ? question7 : question8).numerator,
                            (step < 2 ? question7 : question8).denominator
                          ).tenths
                          ? 'bg-green-100' 
                          : 'bg-red-100'
                        : ''
                    }`}
                    maxLength={1}
                    placeholder={!disabled ? '?' : ''}
                    disabled={disabled || step === 1 || step === 3}
                  />
                </div>
                <div className="flex flex-col items-center">
                  <span className={`text-sm font-bold ${disabled ? 'opacity-50' : ''}`}>
                    hundredths
                  </span>
                  <input
                    type="text"
                    value={hundredths}
                    onChange={handleHundredthsChange}
                    className={`w-12 h-12 border-4 ${
                      disabled || !isTenthsCorrect ? 'opacity-50' : 'border-pink-400'
                    } flex items-center justify-center text-2xl rounded-lg text-center ${
                      hundredths.length > 0 
                        ? hundredths === getCorrectValues(
                            (step < 2 ? question7 : question8).numerator,
                            (step < 2 ? question7 : question8).denominator
                          ).hundredths
                          ? 'bg-green-100' 
                          : 'bg-red-100'
                        : ''
                    }`}
                    maxLength={1}
                    disabled={disabled || step === 1 || step === 3 || !isTenthsCorrect}
                    placeholder={!disabled && isTenthsCorrect ? '?' : ''}
                  />
                </div>
              </div>

            </div>
          </div>
        </div>
        {step === 1 && (
          <div className='flex justify-center'>
            <Proceed onComplete={handleProceed} text='Proceed' />
          </div>
        )}
        {showFinish && (
          <div className='flex justify-center mb-20 scale-125'>
            <button
              onClick={handleFinish}
              className="bg-[#ff3971] text-white font-bold text-xl rounded-none px-4 py-2 shadow-[-5px_5px_0px_rgba(0,0,0,1)]"
            >
              Finish 🚀
            </button>
          </div>
        )}
        {step === 3 && (
            <SuccessAnimation />
        )}
    </div>
  );
};

export default FifthScreen; 



