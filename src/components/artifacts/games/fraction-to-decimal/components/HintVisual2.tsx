import React, { useState, useEffect, useRef } from 'react';
import { sounds } from '../utils/sound';
import { useGameState } from '../state-utils';
import Proceed from './proceed';
import DecimalBox from './DecimalBox';

interface HintVisual2Props {
  numerator: number;
  denominator: number;
  onClose: () => void;
  sendAdminMessage?: (role: string, message: string) => void;
  setGameStateRef: (value: React.SetStateAction<any>) => void;
  currentScreen?: 'second' | 'third';
}

interface GameState {
  state2: {
    step: number;
  };
  screen: string;
}

export default function HintVisual2({ 
  numerator, 
  denominator, 
  onClose, 
  sendAdminMessage,
  setGameStateRef: setGameStateRefProp,
  currentScreen = 'second'
}: HintVisual2Props) {
  const completeRows = Math.floor(numerator / 10); 
  const [answer, setAnswer] = useState('');
  const { gameStateRef } = useGameState();
  const [purpleBoxAnswer, setPurpleBoxAnswer] = useState('');
  const [remainingAnswer, setRemainingAnswer] = useState('');
  const [showFraction, setShowFraction] = useState(false);
  const [hasShownMessage, setHasShownMessage] = useState(false);
  const [showDecimalForm, setShowDecimalForm] = useState(false);
  const [showOnwardsButton, setShowOnwardsButton] = useState(false);
  const decimalFormRef = useRef<HTMLDivElement>(null);
  const onwardsButtonRef = useRef<HTMLDivElement>(null);
  const [decimalTenths, setDecimalTenths] = useState('');
  const [decimalHundredths, setDecimalHundredths] = useState('');
  const [showDecimalPrompt, setShowDecimalPrompt] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [decimalWholes, setDecimalWholes] = useState('');

  const setStep = (value: number) => {
    setGameStateRefProp((prev: GameState) => ({
      ...prev,
      state2: {
        ...prev.state2,
        step: value
      }
    }));
  };

  const handleProceed = () => {
    if (currentScreen === 'second') {
      setGameStateRefProp((prev: GameState) => ({
        ...prev,
        screen: 'third'
      }));
    } else {
      setGameStateRefProp((prev: GameState) => ({
        ...prev,
        screen: 'fourth'
      }));
    }
    sounds.levelUp();
  };
  
  useEffect(() => {
    if (!hasShownMessage) {
      sendAdminMessage?.('agent', 'How many tenths do 20 hundredths make? Try using the new fraction bar to visualise');
      setHasShownMessage(true);
    }
  }, [sendAdminMessage, hasShownMessage]);

  useEffect(() => {
    containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const handlePurpleBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 1) {
      setPurpleBoxAnswer(value);
      
      if (value.length > 0) {
        if (parseInt(value) === completeRows) {
          setShowFraction(true);
          sounds.levelUp();
          sendAdminMessage?.('agent', `Awesome, ${completeRows * 10} hundredths make ${completeRows} tenths. Now, how many hundredths are left?`);
        } else {
          setShowFraction(false);
          sounds.join();
          sendAdminMessage?.('agent', 'Look at the number of complete dark brown rows.');
        }
      }
    }
  };

  const handleRemainingInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 1) {
      setRemainingAnswer(value);
      
      if (value.length > 0) {
        if (parseInt(value) === (numerator % 10)) {
          sounds.levelUp();
          sendAdminMessage?.('agent', 'Perfect! Now let\'s write this as a decimal. Look at the decimal box below.');
          setShowDecimalForm(true);
          setShowDecimalPrompt(true);
          setTimeout(() => {
            decimalFormRef.current?.scrollIntoView({ behavior: 'smooth' });
          }, 500);
        } else {
          sounds.join();
          sendAdminMessage?.('agent', 'Count the remaining dark brown pieces in the last row.');
        }
      }
    }
  };

  const handleDecimalTenthsChange = (value: string) => {
    setDecimalTenths(value);
    if (value.length > 0) {
      if (parseInt(value) === completeRows) {
        sounds.levelUp();
        sendAdminMessage?.('agent', 'Great! Now enter the hundredths digit.');
      } else {
        sounds.join();
        sendAdminMessage?.('agent', 'Look at the purple box - how many tenths did we find?');
      }
    }
  };

  const handleDecimalHundredthsChange = (value: string) => {
    setDecimalHundredths(value);
    if (value.length > 0) {
      if (parseInt(value) === (numerator % 10)) {
        sounds.levelUp();
        sendAdminMessage?.('agent', 'Perfect! You\'ve written the decimal correctly!');
        setShowOnwardsButton(true);
        setTimeout(() => {
          onwardsButtonRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 1000);
      } else {
        sounds.join();
        sendAdminMessage?.('agent', 'Look at the orange box - how many hundredths did we find?');
      }
    }
  };

  const getCorrectWholes = () => {
    if (currentScreen === 'second') { 
      return 0;
    } else if (currentScreen === 'third') {  
      return 2;
    }
    return Math.floor(numerator/100);
  };

  const handleDecimalWholesChange = (value: string) => {
    setDecimalWholes(value);
    if (value.length > 0) {
      const correctWholes = getCorrectWholes();
      if (parseInt(value) === correctWholes) {
        sounds.levelUp();
        sendAdminMessage?.('agent', 'Perfect! Now enter the tenths digit.');
      } else {
        sounds.join();
        sendAdminMessage?.('admin', `User answered incorrectly for the Wholes, correct answer is ${correctWholes}, but user answered ${value}. Diagnose socratically. If User giving the wrong answer, Explain the correct answer in a way that helps them understand.`);
      }
    }
  };

  return (
    <div 
      ref={containerRef}
      className='w-full bg-white flex items-start justify-center'
    >
      <div className='w-screen transform scale-[0.7] -mt-40'>
        <div className="flex flex-col items-center">
          <div className="flex w-full justify-center pl-[200px] relative items-start">
            <div className="flex flex-col">
              <div className="w-[900px] relative mb-32">
                <div className="flex flex-col w-full -space-y-[3px] min-w-52">
                  {[...Array(10)].map((_, rowIndex) => (
                    <div 
                      key={`row-${rowIndex}`} 
                      className="flex w-full flex-1 -space-x-[3px]"
                    >
                      {showFraction ? (
                        [...Array(10)].map((_, colIndex) => {
                          const index = rowIndex * 10 + colIndex;
                          return (
                            <div
                              key={`piece-${index}`}
                              className={`w-full h-[80px] relative border-[5px] border-[#906547] ${
                                index < numerator
                                  ? 'bg-gradient-to-br from-[#5B361B] to-[#432611]'
                                  : 'bg-gradient-to-br from-[#906547] to-[#785339]'
                              }`}
                            >
                              {/* 3D effect borders */}
                              <div className="absolute inset-0 border-l-4 border-t-4 shadow-[-0px_0px_10px_rgba(0,0,0,.6)] border-[#FFFFFF20]"></div>
                              <div className="absolute inset-0 border-r-4 border-b-4 shadow-[-0px_0px_10px_rgba(0,0,0,.6)] border-[#00000040]"></div>
                            </div>
                          );
                        })
                      ) : (
                        <div
                          className={`w-full h-[80px] relative border-[5px] border-[#906547] ${
                            rowIndex < completeRows
                              ? 'bg-gradient-to-br from-[#5B361B] to-[#432611]'
                              : 'bg-gradient-to-br from-[#906547] to-[#785339]'
                          }`}
                        >
                          {/* 3D effect borders */}
                          <div className="absolute inset-0 border-l-4 border-t-4 shadow-[-0px_0px_10px_rgba(0,0,0,.6)] border-[#FFFFFF20]"></div>
                          <div className="absolute inset-0 border-r-4 border-b-4 shadow-[-0px_0px_10px_rgba(0,0,0,.6)] border-[#00000040]"></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Decimal Form Box Container */}
              <div 
                ref={decimalFormRef}
                className={`w-full bg-[#F7F5DD] py-12 transition-opacity duration-300 ${!showDecimalForm ? 'opacity-50 pointer-events-none' : ''}`}
              >
                <div className="flex justify-center">
                  <div className="transform scale-125">
                    <DecimalBox 
                      wholes={String(getCorrectWholes())}
                      tenths={decimalTenths}
                      hundredths={decimalHundredths}
                      onChange={{
                        wholes: () => {},
                        tenths: handleDecimalTenthsChange,
                        hundredths: handleDecimalHundredthsChange
                      }}
                      correctWholes={String(getCorrectWholes())}
                      correctTenths={String(completeRows)}
                      correctHundredths={String(numerator % 10)}
                      disabled={!showDecimalPrompt}
                      showHundredths={true}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Purple box */}
            <div className="flex flex-col">
              <div 
                className="flex items-center justify-center"
                style={{
                  height: `${(completeRows * 75 + 5)}px`,
                  width: '330px',
                  transform: 'translateX(-80px)',
                  background: 'linear-gradient(to right, rgba(0,0,0,0) 24.5%, #A71DFD40 24.5%)',
                  borderRight: '2px solid black',
                  borderTop: '2px solid black',
                  borderBottom: '2px solid black',
                  padding: completeRows > 1 ? '24px' : '12px'
                }}
              >
                {showFraction ? (
                  <div className="flex flex-col items-center justify-center w-full">
                    <span className="text-2xl">{completeRows}</span>
                    <div className="h-0.5 w-8 bg-black my-1"></div>
                    <span className="text-2xl">10</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-full gap-6 text-2xl">
                    <div className="flex flex-col items-center">
                      <span>{completeRows * 10}</span>
                      <div className="h-0.5 w-8 bg-black my-1"></div>
                      <span>100</span>
                    </div>
                    <span className="mx-2">=</span>
                    <div className="flex flex-col items-center">
                      <input
                        type="text"
                        value={purpleBoxAnswer}
                        onChange={handlePurpleBoxChange}
                        className={`w-9 h-9 border-2 mt-2 border-black text-center text-xl ${
                          purpleBoxAnswer.length > 0 
                            ? parseInt(purpleBoxAnswer) === completeRows 
                              ? 'bg-green-100' 
                              : 'bg-red-100'
                            : 'bg-white'
                        }`}
                        maxLength={1}
                      />
                      <div className="h-0.5 w-8 bg-black my-1"></div>
                      <span>10</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Orange box */}
              {showFraction && (
                <div 
                  className="flex items-center justify-center"
                  style={{
                    height: '80px',
                    width: '330px',
                    transform: 'translateX(-80px)',
                    background: 'linear-gradient(to right, rgba(0,0,0,0) 24.5%, #FFA50040 24.5%)',
                    borderRight: '2px solid black',
                    borderTop: '2px solid black',
                    borderBottom: '2px solid black',
                    padding: '12px'
                  }}
                >
                  <div className="flex items-center justify-center w-full">
                    <div className="flex flex-col items-center">
                      <input
                        type="text"
                        value={remainingAnswer}
                        onChange={handleRemainingInputChange}
                        className={`w-8 h-8 border-2 border-black text-center text-xl ${
                          remainingAnswer.length > 0 
                            ? parseInt(remainingAnswer) === (numerator % 10)
                              ? 'bg-green-100' 
                              : 'bg-red-100'
                            : 'bg-white'
                        }`}
                        maxLength={1}
                      />
                      <div className="h-0.5 w-8 bg-black mt-1"></div>
                      <span>100</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {showOnwardsButton && (
            <div ref={onwardsButtonRef} className="py-16 scale-150">
              <Proceed 
                onComplete={handleProceed}
                text="Onward! 🚀"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 