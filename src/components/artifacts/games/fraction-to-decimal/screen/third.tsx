import React, { useEffect, useRef, useState } from 'react';
import { useGameState } from '../state-utils';
import Bar, { Bar2d } from '../components/bar';
import Proceed from '../components/proceed';
import RedBox, { RedBox2 } from '../components/RedBox';
import Header from '../components/header';
import Fraction from '../components/Fraction';
import KnifeSelector from '../components/knifeselector';
import { sounds } from '../utils/sound';
import HintVisual2 from '../components/HintVisual2';
import DecimalBox from '../components/DecimalBox';

interface ThirdScreenProps {
  sendAdminMessage: (role: string, content: string) => void;
}

const ThirdScreen: React.FC<ThirdScreenProps> = ({ sendAdminMessage }) => {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { step } = gameStateRef.current.state3
  const {numerator, denominator} = gameStateRef.current.question.question5

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  return (
    <div className="flex flex-col mb-10 h-full w-full">
      <Header 
        title={
          <>
            Convert 
            <span className='bg-white px-2 text-lg py-1 rounded-md'>
              <Fraction numerator={numerator} denominator={denominator} />
            </span>
            to decimal
          </>
        }
        level='Level 3'
        leftBox={step < 2 ? 'STEP 1' : 'STEP 2'}
        rightBox={step < 2 ? <>
          CREATE 
          <span className='bg-white px-2 ml-2 rounded-md'>
            <Fraction numerator={numerator} denominator={denominator} />
          </span>
        </> : <>
          Enter decimal
        </>}
      />
      {step < 2 ? <Part1 sendAdminMessage={sendAdminMessage} /> : <Part2 sendAdminMessage={sendAdminMessage} />}
    </div>
  )
}


const Part1: React.FC <ThirdScreenProps> = ({sendAdminMessage}) => {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { step } = gameStateRef.current.state3
  const {numerator, denominator} = gameStateRef.current.question.question5

  const [selectedKnife, setSelectedKnife] = useState<number>(1)
  const [selectedPieces, setSelectedPieces] = useState<number>(0);
  const [chocolate, setChocolate] = useState<number>(1);
  const [wholechocolate, setWholechocolate] = useState<number>(0);

  const [allowadd, setAllowadd] = useState<boolean>(false)

  const start = useRef(false);

  useEffect(() => {
    if (!start.current) {
      sendAdminMessage('agent', `Let's practice more challenging problems now. Try creating ${numerator}/${denominator} of a chocolate`);
      start.current = true;
    }
    }, []);
  const setStep = (value: number) => {
    setGameStateRef((prev) => ({
      ...prev,
      state3: {
        ...prev.state3,
        step: value
      }
    }))
  }

  useEffect(() => {
    if (selectedKnife*chocolate === denominator) {
      setStep(1)
      sendAdminMessage('agent', `Awesome, now select pieces to get ${numerator}/${denominator} of the chocolate. Feel free to use more than 1 chocolate`);
    }
  }, [selectedKnife])

  useEffect(() => {
    if (selectedPieces + wholechocolate * selectedKnife * chocolate === numerator) {
      setStep(2)
    }
  }, [selectedPieces])

  const handleadd = () => {
    setWholechocolate(prev => prev + 1)
    setAllowadd(false)
    setSelectedPieces(0)
    sounds.break()
  }

  useEffect(() => {
    if (wholechocolate * selectedKnife + selectedPieces < numerator && selectedPieces === 100) {
      setAllowadd(true);
      sendAdminMessage('agent', 'Fill this one completely to be able to add a new bar.');
    } else {
      setAllowadd(false);
    }
  }, [selectedPieces]);

  return (
      <div className="flex flex-col items-center max-w-screen-lg w-full mx-auto justify-center flex-1 gap-8">
        <div className='flex w-full justify-center'>
          
          <span className='flex flex-col justify-center h-full mx-16 w-1/6 text-center text-xl'>
            {Array.from({length: wholechocolate}, (_, index) => (
              <div 
                key={index}
              >
                <Bar2d
                  numerator={100}
                  denominator={100}
                  handlePieceClick={() => {}}
                  active={false}
              />
              </div>
            ))}
          </span>

          <span className='relative w-4/6 text-center text-xl'>
            <Bar2d
              numerator={selectedPieces}
              denominator={selectedKnife * chocolate}
              handlePieceClick={(index) => {
                setSelectedPieces(index)
                sounds.join()  
              }}
              active={step < 2}
            />
          </span>

          <span className='relative flex flex-col justify-center mx-10 w-1/6 text-center text-xl'>
              {step === 0 ?
                <KnifeSelector
                  options={[10, 100]}
                  selectedKnife={selectedKnife}
                  setSelectedKnife={setSelectedKnife}
                />
              :
                <div 
                  className={`m-2 bg-amber-800/50 rounded-md aspect-square flex font-extrabold text-5xl items-center justify-center hover:bg-amber-800/60 transition-all duration-100 ${!allowadd ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  onClick={() => { if (allowadd) handleadd(); }}
                >
                  +
                </div>
              }
          </span>

        </div>
        {step === 0 ?
          <div className="flex text-2xl items-center gap-4">
            <RedBox2>
              {chocolate * selectedPieces}
            </RedBox2>
              piece(s), but you need 100
          </div>
        :
          <div className="flex justify-center text-2xl items-center gap-4">
            <span className='border-2 border-[#fa787f] px-2 py-1 rounded-md'>
              <Fraction numerator={selectedPieces + wholechocolate * selectedKnife * chocolate} denominator={selectedKnife * chocolate} />
            </span>
          </div>
        }
      </div>
  );
};

const Part2: React.FC<ThirdScreenProps> = ({ sendAdminMessage }) => {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { step } = gameStateRef.current.state3
  const {numerator, denominator} = gameStateRef.current.question.question5
  const wholechocolate = Math.floor(numerator / denominator)
  const [decimal, setDecimal] = useState<number>(0)

  const [wholes, setWholes] = useState<string>('')
  const [tenths, setTenths] = useState<string>('')
  const [hundredths, setHundredths] = useState<string>('')

  const [isWholesCorrect, setIsWholesCorrect] = useState(false);
  const [isTenthsCorrect, setIsTenthsCorrect] = useState(false);
  const [isTenthsIncorrect, setIsTenthsIncorrect] = useState(false);
  const [isHundredthsIncorrect, setIsHundredthsIncorrect] = useState(false);

  const [showHint, setShowHint] = useState(false);
  const [showHintButton, setShowHintButton] = useState(false);

  const start = useRef(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const hintButtonRef = useRef<HTMLDivElement>(null);

  const tenthsInputRef = useRef<HTMLInputElement>(null);
  const hundredthsInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!start.current) {
      sendAdminMessage('agent', `Awesome, now that we've created ${numerator}/${denominator}, try entering it in decimal form`)
      start.current = true;
    }
  }, []);

  useEffect(() => {
    if (parseInt(wholes) === Math.floor(numerator / denominator) && parseInt(tenths) === Math.floor((numerator % denominator) / 10) && parseInt(hundredths) === Math.floor((numerator % denominator) % 10)) {
      setGameStateRef((prev) => ({
        ...prev,
        state3: {
          ...prev.state3,
          step: 3
        }
      }))
    }
  }, [wholes, tenths, hundredths])

  useEffect(() => {
    if (showHintButton && hintButtonRef.current) {
      setTimeout(() => {
        hintButtonRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [showHintButton]);

  const scrollToHint = () => {
    setShowHint(true);
    setShowHintButton(true);
  };

  const handleWholesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setWholes(value);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const correctWholes = Math.floor(numerator/denominator);
    
    if (value.length > 0) {
      if (value.length < correctWholes.toString().length) {
        timeoutRef.current = setTimeout(() => {
          sounds.join();
          sendAdminMessage('admin', `User has entered incorrectly.The answer should be ${correctWholes}. User has entered ${value} seems incomplete. Diagnose socratically. Explain everytime deeply and in detail but remember just hints.`);
        }, 5000);
        return;
      }
      if (parseInt(value) !== correctWholes) {
        sounds.join();
        sendAdminMessage('admin', `User has entered incorrectly.The answer should be ${correctWholes}. User has entered ${value} seems incomplete. Diagnose socratically. Explain everytime deeply and in detail but remember just hints.`);
        setIsWholesCorrect(false);
      } else {
        sounds.levelUp();
        sendAdminMessage('agent', 'Excellent! Now enter the tenths digit.');
        setIsWholesCorrect(true);
        setTimeout(() => tenthsInputRef.current?.focus(), 100);
      }
    }
  };

  const handleTenthsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTenths(value);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const correctTenths = Math.floor((numerator * 10) / denominator) % 10;
    
    if (value.length > 0) {
      if (value.length < correctTenths.toString().length) {
        timeoutRef.current = setTimeout(() => {
          sounds.join();
          sendAdminMessage('admin', `User has entered incorrectly.The answer should be ${correctTenths}. User has entered ${value} seems incomplete. Diagnose socratically. Explain everytime deeply and in detail but remember just hints.`);
        }, 5000);
        return;
      }
      if (parseInt(value) !== correctTenths) {
        sounds.join();
        setShowHintButton(true);
        sendAdminMessage('agent', 'That\'s not quite right. Need a hint?');
        setIsTenthsCorrect(false);
        setIsTenthsIncorrect(true);
      } else {
        sounds.levelUp();
        sendAdminMessage('agent', 'Perfect! Finally, enter the hundredths digit.');
        setIsTenthsCorrect(true);
        setIsTenthsIncorrect(false);
        setTimeout(() => hundredthsInputRef.current?.focus(), 100);
        setShowHintButton(false);
      }
    }
  };

  const handleHundredthsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHundredths(value);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const correctHundredths = Math.floor((numerator * 100) / denominator) % 10;
    
    if (value.length > 0) {
      if (value.length < correctHundredths.toString().length) {
        timeoutRef.current = setTimeout(() => {
          sounds.join();
          sendAdminMessage('admin', `User has entered incorrectly.The answer should be ${correctHundredths}. User has entered ${value} seems incomplete. Diagnose socratically. Explain everytime deeply and in detail but remember just hints.`);
        }, 5000);
        return;
      }
      if (parseInt(value) !== correctHundredths) {
        sounds.join();
        setShowHintButton(true);
        sendAdminMessage('agent', 'That\'s not quite right. Need a hint?');
        setIsHundredthsIncorrect(true);
      } else {
        sounds.levelUp();
        sendAdminMessage('agent', "Excellent! You've converted the fraction to a decimal.");
        setIsHundredthsIncorrect(false);
        setShowHintButton(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center max-w-screen-lg w-full mx-auto justify-center flex-1 gap-8">
      <div className="w-full">
        {showHint ? (
          <HintVisual2
            numerator={numerator % denominator}
            denominator={100}
            onClose={() => setShowHint(false)}
            sendAdminMessage={sendAdminMessage}
            setGameStateRef={setGameStateRef}
            currentScreen="third"
          />
        ) : (
          <>
            <div className="flex justify-center text-2xl items-center gap-4 mb-16">
              {Array.from({length: wholechocolate}, (_, index) => (
                <div key={index} className="w-[200px]">
                  <Bar2d
                    numerator={100}
                    denominator={100}
                    handlePieceClick={() => {}}
                    active={false}
                  />
                </div>
              ))}
              <div className="w-[200px]">
                <Bar2d
                  numerator={numerator % denominator}
                  denominator={100}
                  handlePieceClick={() => {}}
                  active={false}
                />
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 text-2xl">
              <div className="w-screen bg-[#F7F5DD] py-8">
                <div className="max-w-[500px] mx-auto px-4">
                  <div className="flex flex-col">
                    <div className="text-center mb-4">
                      <span className="text-xl mb-2 bg-[#FFE4B5] shadow-[-5px_5px_0_0_rgba(0,0,0,1)] px-4 py-1">Decimal</span>
                    </div>
                    <div className="border-2 border-black p-8 bg-white">
                      <div className="flex justify-center items-end gap-4">
                        <div className="flex flex-col items-center">
                          <span className="text-sm mb-2">Wholes</span>
                          <input
                            type="text"
                            value={wholes}
                            onChange={handleWholesChange}
                            className={`w-12 h-12 border-4 border-green-600 text-2xl rounded-lg text-center ${
                              wholes.length > 0 
                                ? parseInt(wholes) === Math.floor(numerator / denominator)
                                  ? 'bg-green-100' 
                                  : 'bg-red-100'
                                : 'bg-white'
                            }`}
                            maxLength={1}
                          />
                        </div>
                        <span className="text-6xl font-bold mb-2">.</span>
                        <div className="flex flex-col items-center">
                          <span className="text-sm mb-2">Tenths</span>
                          <input
                            type="text"
                            value={tenths}
                            onChange={handleTenthsChange}
                            className={`w-12 h-12 border-4 border-pink-400 text-2xl rounded-lg text-center ${
                              tenths.length > 0 
                                ? parseInt(tenths) === Math.floor((numerator % denominator) / 10)
                                  ? 'bg-green-100' 
                                  : 'bg-red-100'
                                : 'bg-white'
                            } ${!isWholesCorrect ? 'opacity-50 cursor-not-allowed' : ''}`}
                            maxLength={1}
                            disabled={!isWholesCorrect}
                            ref={tenthsInputRef}
                          />
                        </div>

                        <div className="flex flex-col items-center">
                          <span className="text-sm mb-2">Hundredths</span>
                          <input
                            type="text"
                            value={hundredths}
                            onChange={handleHundredthsChange}
                            className={`w-12 h-12 border-4 border-pink-400 text-2xl rounded-lg text-center ${
                              hundredths.length > 0 
                                ? parseInt(hundredths) === Math.floor((numerator % denominator) % 10)
                                  ? 'bg-green-100' 
                                  : 'bg-red-100'
                                : 'bg-white'
                            } ${!isTenthsCorrect ? 'opacity-50 cursor-not-allowed' : ''}`}
                            maxLength={1}
                            disabled={!isTenthsCorrect}
                            ref={hundredthsInputRef}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {showHintButton && !showHint && (
        <div ref={hintButtonRef} className="mt-8">
          <button
            onClick={() => setShowHint(true)}
            className="bg-[#ff3971] text-white text-xl rounded-none px-4 py-2 shadow-[-5px_5px_0px_rgba(0,0,0,1)]"
          >
            Need a hint?
          </button>
        </div>
      )}

      {step === 3 && (
        <Proceed 
          onComplete={() => setGameStateRef((prev) => ({
            ...prev,
            screen: 'fourth'
          }))}
          text='Onward! 🚀'
        />
      )}
    </div>
  )
}

export default ThirdScreen; 