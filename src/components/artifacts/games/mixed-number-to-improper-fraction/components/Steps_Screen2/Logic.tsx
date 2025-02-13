import { useGameState } from '../../state-utils';
import type { MixedFraction } from '../../game-state';
import LockIcon from '@/assets/Lock.png';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import React from 'react';

interface ExpressionWithAdditionProps {
  leftNumber: number;
  fraction: {
    numerator: number;
    denominator: number;
  };
}

interface QuickHack2Props {
  mixedFraction: MixedFraction;
  sendAdminMessage: (agent: string, message: string, callback?: () => void) => void;
}

const QuickHack2: React.FC<QuickHack2Props> = ({ mixedFraction, sendAdminMessage }) => {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { whole, numerator, denominator } = mixedFraction;
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [showNextStep, setShowNextStep] = useState(false);
  const [topAnswer, setTopAnswer] = useState('');
  const [bottomAnswer, setBottomAnswer] = useState('');
  const [showNextStep3, setShowNextStep3] = useState(false);
  const [showSecondBox, setShowSecondBox] = useState(true);
  const [canEnterDenominator, setCanEnterDenominator] = useState(false);
  const logicMessageShown = useRef(false);

  const [firstInputIsCorrect, setFirstInputIsCorrect] = useState(false)
  const [firstInputIsWrong, setFirstInputIsWrong] = useState(false)
  const [topAnswerIsCorrect, setTopAnswerIsCorrect] = useState(false)
  const [topAnswerIsWrong, setTopAnswerIsWrong] = useState(false)
  const [bottomAnswerIsCorrect, setBottomAnswerIsCorrect] = useState(false)
  const [bottomAnswerIsWrong, setBottomAnswerIsWrong] = useState(false)
  const [errorCount, setErrorCount] = useState(0)
  const countMessageShown = useRef(false)
  const firstInputMessageShown = useRef(false)
  const topAnswerMessageShown = useRef(false)
  const bottomAnswerMessageShown = useRef(false)


  useEffect(() => {
    if (!logicMessageShown.current) {
      logicMessageShown.current = true;
      setShowInput(true);
      sendAdminMessage("agent", "We'll unlock the steps one by one. First up! Let's multiply denominator with the whole. The hint is right there");
    }
  }, [sendAdminMessage]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    if (value === '') {
      setFirstInputIsCorrect(false)
      setFirstInputIsWrong(false)
      return
    }
    
    const expectedValue = denominator * whole;

    if (value.length >= expectedValue.toString().length) {
      if (parseInt(value) === expectedValue) {
        setFirstInputIsCorrect(true)
        setFirstInputIsWrong(false)
        setShowNextStep(true);
        sendAdminMessage("agent", "Now just add the numerator to your previous answer!")
      } else {
        setFirstInputIsCorrect(false)
        setFirstInputIsWrong(true)
        if (!firstInputMessageShown.current) {
          firstInputMessageShown.current = true
          sendAdminMessage("admin", `User answered incorrectly for the denominator pie, correct answer is ${expectedValue}, but user answered ${value} . Diagnose socratically.`)
        }
      }

    }
  };

  const handleSuccess = () => {
    setShowNextStep(false);
    setShowNextStep3(true);
  };

  const handleTopAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setTopAnswer(value);
    
    if (value === '') {
      setTopAnswerIsCorrect(false)
      setTopAnswerIsWrong(false)
      return
    }
    
    const expectedTop = (denominator * whole) + numerator;
    if (value.length >= expectedTop.toString().length) {
      if (Number(value) === expectedTop) {
        setTopAnswerIsCorrect(true)
        setTopAnswerIsWrong(false)
        setCanEnterDenominator(true)
      } else {
        setTopAnswerIsCorrect(false)
        setTopAnswerIsWrong(true)
        if (!topAnswerMessageShown.current) {
          topAnswerMessageShown.current = true
          sendAdminMessage("admin", `User answered incorrectly for the numerator pie, correct answer is ${expectedTop}, but user answered ${value} . Diagnose socratically.`)
        }
      }
    }
  };

  const handleBottomAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!canEnterDenominator) return;
    const value = e.target.value.replace(/\D/g, '');
    setBottomAnswer(value);
    
    if (value === '') {
      setBottomAnswerIsCorrect(false)
      setBottomAnswerIsWrong(false)
      return
    }

    const expectedBottom = denominator;
    if (value.length >= expectedBottom.toString().length) {
      if (Number(value) === expectedBottom) {
        setBottomAnswerIsCorrect(true)
        setBottomAnswerIsWrong(false)
        if (topAnswerIsCorrect) {
          sendAdminMessage("agent", "It took just 2 steps to get to the answer. let's practice some more!", () => {
            setGameStateRef(prev => ({
              ...prev,
              screen: 'third' as const,
              state2: { ...prev.state2, step: 1 }
            }));
          });
        }
      } else {
        setBottomAnswerIsCorrect(false)
        setBottomAnswerIsWrong(true)
        if (!bottomAnswerMessageShown.current) {
          bottomAnswerMessageShown.current = true
          sendAdminMessage("admin", `User answered incorrectly for the denominator pie, correct answer is ${expectedBottom}, but user answered ${value} . Diagnose socratically.`)
        }
      }

    }
  };

  const ExpressionWithAddition: React.FC<ExpressionWithAdditionProps> = ({ leftNumber, fraction }) => (
    <div className="flex items-center">
      <span className="text-3xl">{leftNumber}</span>
      <div className="relative ml-2">
        <Image 
          src="/img/Addition.png"
          alt="add"
          width={48}
          height={48}
          className="w-12 h-12 absolute -left-2 top-[6px]"
        />
        <div className="inline-flex flex-col items-center ml-8">
          <span className="text-3xl">{fraction.numerator}</span>
          <div className="h-[2px] w-5 bg-black"></div>
          <span className="text-3xl">{fraction.denominator}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col">
      <div className="w-full max-w-[600px] mx-auto p-4 flex flex-col">
        {/* Main pink container with Quick Hack */}
        <div className="bg-[#FF497C] rounded-[20px] p-2 flex items-center w-[450px] mx-auto mb-16">
          <div className="text-white text-center text-[28px] leading-[32px] w-[120px]">
            Quick
            <br />
            Hack
          </div>

          {/* White box with fraction */}
          <div className="bg-white rounded-xl flex-1 py-3">
            <div className="flex items-center gap-2 text-2xl justify-center">
              <span>{whole}</span>
              <div className="inline-flex flex-col items-center">
                <span>{numerator}</span>
                <div className="h-[2px] w-4 bg-black my-0.5"></div>
                <span>{denominator}</span>
              </div>
              <span>=</span>
              <div className="inline-flex flex-col items-center">
                <span>?</span>
                <div className="h-[2px] w-4 bg-black my-0.5"></div>
                <span>?</span>
              </div>
            </div>
          </div>

          {/* Emoji box */}
          <div className="bg-white rounded-xl w-[80px] h-[80px] ml-1 flex items-center justify-center">
            <span className="text-5xl">🤫</span>
          </div>
        </div>

        {/* Connected boxes */}
        <div className="relative">
          {/* First pink box */}
          <div className="bg-[#FF497C] rounded-[20px] p-3 flex items-center mb-8">
            <div className="bg-[#B40033] rounded-xl w-[70px] h-[70px] flex items-center justify-center">
              <Image src={LockIcon} alt="Lock" width={35} height={35} />
            </div>

            <div className="text-white text-[20px] mx-4 flex-1">
              Multiply denominator and <br /> wholes
            </div>

            <div className="relative">
              <div className="absolute -bottom-1 -left-1 w-full h-full bg-black rounded-xl"></div>
              <div className="absolute -bottom-1 -left-1 w-full h-full bg-black opacity-60 rounded-xl"></div>
              <div className="bg-white rounded-xl px-4 py-2 relative">
                {firstInputIsCorrect ? (
                  <span className="text-3xl">{denominator * whole}</span>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{whole}</span>
                    <Image 
                      src="/img/Multiply.png" 
                      alt="multiply" 
                      width={40} 
                      height={40} 
                      className="w-10 h-10"
                    />
                    <div className="inline-flex flex-col items-center">
                      <span className="text-2xl">{numerator}</span>
                      <div className="h-[2px] w-4 bg-black"></div>
                      <span className="text-2xl">{denominator}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {!firstInputIsCorrect && (
            <div className="bg-[#B40033] rounded-[20px] p-8 pt-16 -mt-10">
              <div className="flex flex-col items-center">
                <div className="text-white text-lg mb-4">
                  {denominator} X {whole}
                </div>
                <div className="relative w-[80px] h-[80px]">
                  <div className="absolute -bottom-1 -left-1 w-full h-full bg-black rounded-xl"></div>
                  <div className="absolute -bottom-1 -left-1 w-full h-full bg-black opacity-60 rounded-xl"></div>

                  <input
                    value={inputValue}
                    onChange={handleInputChange}
                    className={`absolute inset-0 rounded-xl border-4 border-white text-center text-3xl outline-none z-10
                      ${firstInputIsCorrect ? 'bg-green-100' : firstInputIsWrong ? 'bg-red-100' : 'bg-white'}
                    `}
                    placeholder="?"
                  />

                </div>
              </div>
            </div>
          )}
        </div>

        {showNextStep && (
          <div className="w-full mt-4">
            <div className="bg-[#FF497C] rounded-[20px] p-3 flex items-center">
              <div className="bg-[#B40033] rounded-xl w-[70px] h-[70px] flex items-center justify-center">
                <Image src={LockIcon} alt="Lock" width={35} height={35} />
              </div>

              <div className="text-white text-[20px] mx-4 flex-1">
                Add the numerator,<br />Denominator remains same
              </div>

              <div className="relative">
                <div className="absolute -bottom-1 -left-1 w-full h-full bg-black rounded-xl"></div>
                <div className="absolute -bottom-1 -left-1 w-full h-full bg-black opacity-60 rounded-xl"></div>
                <div className="bg-white rounded-xl px-6 py-3 relative">
                  <ExpressionWithAddition 
                    leftNumber={denominator * whole}
                    fraction={{ numerator, denominator }}
                  />
                </div>
              </div>
            </div>

            {/* Bottom answer container */}
            <div className="bg-[#B40033] rounded-[20px] p-8">
              <div className="flex flex-col items-center gap-4">
                <div className="relative w-[80px] h-[80px]">
                  <div className="absolute -bottom-1 -left-1 w-full h-full bg-black rounded-xl"></div>
                  <div className="absolute -bottom-1 -left-1 w-full h-full bg-black opacity-60 rounded-xl"></div>
                  <input
                    value={topAnswer}
                    onChange={handleTopAnswerChange}
                    className={`absolute inset-0 rounded-xl border-4 border-white text-center text-3xl outline-none z-10
                      ${topAnswerIsCorrect ? 'bg-green-100' : topAnswerIsWrong ? 'bg-red-100' : 'bg-white'}
                    `}
                    placeholder="?"
                  />
                </div>
                <div className="h-[3px] w-24 bg-white"></div>
                <div className="relative w-[80px] h-[80px]">
                  <div className="absolute -bottom-1 -left-1 w-full h-full bg-black rounded-xl"></div>
                  <div className="absolute -bottom-1 -left-1 w-full h-full bg-black opacity-60 rounded-xl"></div>
                  <input
                    value={bottomAnswer}
                    onChange={handleBottomAnswerChange}
                    className={`absolute inset-0 rounded-xl border-4 border-white text-center text-3xl outline-none z-10
                      ${!canEnterDenominator ? 'cursor-not-allowed bg-gray-100' : ''}
                      ${bottomAnswerIsCorrect ? 'bg-green-100' : bottomAnswerIsWrong ? 'bg-red-100' : 'bg-white'}
                    `}
                    placeholder="?"
                    disabled={!canEnterDenominator}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {showNextStep3 && (
          <div className="w-full">
            <div className="bg-[#FF497C] rounded-t-[20px] p-3 flex items-center pb-16">
              <div className="bg-[#B40033] rounded-xl w-[70px] h-[70px] flex items-center justify-center">
                <Image src={LockIcon} alt="Lock" width={35} height={35} />
              </div>
    
              <div className="text-white text-[20px] mx-4 flex-1">
                Add the numerator,<br />Denominator remains same
              </div>
    
              <div className="bg-white rounded-xl px-6 py-3">
                <ExpressionWithAddition 
                  leftNumber={denominator * whole}
                  fraction={{ numerator, denominator }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickHack2;
