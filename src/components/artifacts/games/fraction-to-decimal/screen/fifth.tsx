import React,{ useEffect, useState, useRef } from 'react';
import { useGameState } from '../state-utils';
import Header from '../components/header';
import Fraction from '../components/Fraction';
import Proceed from '../components/proceed';
import { HUNDRED_PERCENT } from 'html2canvas/dist/types/css/types/length-percentage';
import SuccessAnimation from '@/components/artifacts/utils/success-animate';


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

  useEffect(() => {
    if (!start.current) {
      sendAdminMessage('agent', `his time, let's try converting a fraction to decimal without the visuals. Let me know if you need help!`);
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
        setGameStateRef(prev => ({
          ...prev,
          state5: { step: 3 }
        }));
        sendAdminMessage('agent', `Awesome, you're now a master at converting fractions to decimals - great job!`);
      }
    }
  }, [tenths, hundredths, wholes, step])

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
          level='Level 4'
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
                    onChange={(e) => setWholes(e.target.value)}
                    className="w-12 h-12 border-4 border-green-600 flex items-center justify-center text-2xl rounded-lg text-center"
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
                    onChange={(e) => setTenths(e.target.value)}
                    className={`w-12 h-12 border-4 ${disabled ? 'opacity-50' : 'border-pink-400'} flex items-center justify-center text-2xl rounded-lg text-center`}
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
                    onChange={(e) => setHundredths(e.target.value)}
                    className={`w-12 h-12 border-4 ${disabled ? 'opacity-50' : 'border-pink-400'} flex items-center justify-center text-2xl rounded-lg text-center`}
                    maxLength={1}
                    disabled={disabled || step === 1 || step === 3}
                    placeholder={!disabled ? '?' : ''}
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
        {step === 3 && (
          <p className='w-full text-center bg-lime-500 py-20 text-5xl font-bold'>
            <SuccessAnimation />
              Correct! 
          </p>
        )}
    </div>
  );
};

export default FifthScreen; 



