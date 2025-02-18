import React, { useState, useEffect, useRef } from 'react';
import { sounds } from '../utils/sound';
import { useGameState } from '../state-utils';
import Proceed from './proceed';

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
          sendAdminMessage?.('agent', 'Perfect! You found all the parts of the decimal.');
          setShowDecimalForm(true);
          setShowOnwardsButton(true);
          setTimeout(() => {
            decimalFormRef.current?.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => {
              onwardsButtonRef.current?.scrollIntoView({ behavior: 'smooth' });
            }, 1000);
          }, 500);
        } else {
          sounds.join();
          sendAdminMessage?.('agent', 'Count the remaining dark brown pieces in the last row.');
        }
      }
    }
  };

  return (
    <div className='w-full bg-white flex items-start justify-center'>
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
                className={`w-full bg-[#FFFFE0] py-12 transition-opacity duration-300 ${!showDecimalForm ? 'opacity-50 pointer-events-none' : ''}`}
              >
                <div className="flex justify-center">
                  <div className="shadow-2xl transform scale-110 border-2 border-black rounded-lg overflow-hidden">
                    <div className="bg-[#FFE4B5] px-10 py-3 text-center border-b-2 border-black shadow-md">
                      <span className="text-xl font-medium">Decimal form</span>
                    </div>
                    <div className="bg-white p-6">
                      <div className="flex items-center gap-8 pt-2">
                        {/* Wholes input - always disabled */}
                        <div className="flex flex-col items-center">
                          <span className="text-base font-medium mb-2">Wholes</span>
                          <input
                            type="text"
                            value="0"
                            className="w-16 h-16 border-4 border-green-600 rounded-lg text-center text-3xl bg-white shadow-lg"
                            disabled
                          />
                        </div>
                        <span className="text-5xl mb-8">.</span>
                        {/* Tenths input */}
                        <div className="flex flex-col items-center">
                          <span className="text-base font-medium mb-2">Tenths</span>
                          <input
                            type="text"
                            value={purpleBoxAnswer}
                            onChange={handlePurpleBoxChange}
                            className={`w-16 h-16 border-4 border-pink-400 rounded-lg text-center text-3xl shadow-lg ${
                              purpleBoxAnswer.length > 0 
                                ? parseInt(purpleBoxAnswer) === completeRows 
                                  ? 'bg-green-100' 
                                  : 'bg-red-100'
                                : 'bg-white'
                            }`}
                            maxLength={1}
                            placeholder="0"
                          />
                        </div>
                        {/* Hundredths input */}
                        <div className="flex flex-col items-center">
                          <span className="text-base font-medium mb-2">Hundredths</span>
                          <input
                            type="text"
                            value={remainingAnswer}
                            onChange={handleRemainingInputChange}
                            className={`w-16 h-16 border-4 border-orange-400 rounded-lg text-center text-3xl shadow-lg ${
                              remainingAnswer.length > 0 
                                ? parseInt(remainingAnswer) === (numerator % 10)
                                  ? 'bg-green-100' 
                                  : 'bg-red-100'
                                : 'bg-white'
                            }`}
                            maxLength={1}
                            placeholder="0"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Purple box */}
            <div className="flex flex-col">
              <div className="bg-[#A71DFD40] px-6 border-4 border-black flex items-center justify-center"
                style={{
                  height: `${(completeRows * 75 + 5)}px`,
                  width: '250px'
                }}
              >
                {showFraction ? (
                  // Show only the fraction when answer is correct
                  <div className="flex flex-col items-center">
                    <span className="font-bold text-2xl">{completeRows}</span>
                    <div className="h-0.5 w-8 bg-black my-1"></div>
                    <span className="font-bold text-2xl">10</span>
                  </div>
                ) : (
                  // Show full equation with input when not answered correctly
                  <div className="flex items-center gap-6 text-2xl">
                    <div className="flex flex-col items-center mb-1">
                      <span className="font-bold">{completeRows * 10}</span>
                      <div className="h-0.5 w-8 bg-black my-1"></div>
                      <span className="font-bold">100</span>
                    </div>
                    <span className="mx-2">=</span>
                    <div className="flex flex-col items-center -bottom-1">
                      <input
                        type="text"
                        value={purpleBoxAnswer}
                        onChange={handlePurpleBoxChange}
                        className={`w-9 h-9 border-2 border-black font-bold text-center text-xl ${
                          purpleBoxAnswer.length > 0 
                            ? parseInt(purpleBoxAnswer) === completeRows 
                              ? 'bg-green-100' 
                              : 'bg-red-100'
                            : 'bg-white'
                        }`}
                        maxLength={1}
                      />
                      <div className="h-0.5 w-8 bg-black my-1"></div>
                      <span className="font-bold">10</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Orange box */}
              {showFraction && (
                <div className="bg-[#FFA50040] px-6 border-4 border-black flex items-center justify-center"
                  style={{
                    height: '80px',
                    width: '250px'
                  }}
                >
                  <div className="flex items-center gap-6 text-xl">
                    <div className="flex flex-col items-center">
                      <input
                        type="text"
                        value={remainingAnswer}
                        onChange={handleRemainingInputChange}
                        className={`w-8 h-8 border-2 border-black font-bold text-center text-xl mt-3 ${
                          remainingAnswer.length > 0 
                            ? parseInt(remainingAnswer) === (numerator % 10)
                              ? 'bg-green-100' 
                              : 'bg-red-100'
                            : 'bg-white'
                        }`}
                        maxLength={1}
                      />
                      <div className="h-0.5 w-8 bg-black mt-1"></div>
                      <span className="font-bold">100</span>
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