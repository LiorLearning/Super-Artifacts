import React, { useState, useEffect, useRef } from 'react';
import { useGameState } from '../state-utils';
import Bar, { Bar2d, VerticalBar } from '../components/bar';
import Proceed from '../components/proceed';
import {RedBox2} from '../components/RedBox';
import KnifeSelector from '../components/knifeselector';
import Header from '../components/header';
import DecimalBox from '../components/DecimalBox';
import FractionBox from '../components/FractionBox';
import { sounds } from '../utils/sound';

interface FourthScreenProps {
  sendAdminMessage: (role: string, content: string) => void;
}

const ScrollContainer = ({ children }: { children: React.ReactNode }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ block: 'start' });
  }, []);

  return (
    <div ref={scrollRef} className="w-full">
      {children}
    </div>
  );
};

const FourthScreen: React.FC <FourthScreenProps> = ({sendAdminMessage}) => {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { step } = gameStateRef.current.state4
  const question6 = gameStateRef.current.question.question6

  const [selectedKnife, setSelectedKnife] = useState<number>(1)
  const [selectedPieces, setSelectedPieces] = useState<number>(0);
  const [chocolate, setChocolate] = useState<number>(1);
  const [wholechocolate, setWholechocolate] = useState<number>(0);

  const [numerator, setNumerator] = useState<number>(0)
  const [denominator, setDenominator] = useState<number>(0)

  const [allowadd, setAllowadd] = useState<boolean>(false)

  const start = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const tenthsInputRef = useRef<HTMLInputElement>(null);
  const hundredthsInputRef = useRef<HTMLInputElement>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    containerRef.current?.scrollIntoView();
    
    document.body.style.overflow = 'auto';
    document.body.style.height = 'auto';
    
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'auto'
      });
    }, 0);
  }, []);

  useEffect(() => {
    if (!start.current) {
      sendAdminMessage('agent', `This time, let's convert a decimal to a fraction. Let's start by creating the decimal!`);
      start.current = true;
    }
  }, []);

  const setStep = (value: number) => {
    setGameStateRef((prev) => ({
      ...prev,
      state4: {
        ...prev.state4,
        step: value
      }
    }))
  }

  useEffect(() => {
    if (selectedKnife === 10) {
      window.scrollTo({
        top: 0,
        behavior: 'auto'
      });
      setStep(1);
    }
  }, [selectedKnife]);

  useEffect(() => {
    if(wholechocolate + 1 < question6 && selectedPieces === selectedKnife * chocolate) {
      setAllowadd(true)
    } else {
      setAllowadd(false)
    } 
    if ( Math.floor((wholechocolate*selectedKnife + selectedPieces)) === question6*selectedKnife) {
      setStep(2)
    }
  }, [selectedPieces])

  useEffect(() => {
    const correctNumerator = question6 * selectedKnife;
    const correctDenominator = selectedKnife;
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Only handle numerator validation if denominator is empty
    if (numerator.toString().length > 0 && denominator === 0) {
      if (numerator.toString().length < correctNumerator.toString().length) {
        timeoutRef.current = setTimeout(() => {
          sounds.join();
          sendAdminMessage('admin', `User has entered incomplete numerator. The answer should be ${correctNumerator}. User has entered ${numerator}. Diagnose socratically. Explain everytime deeply and in detail but remember just hints.Don't repeat preivous narration`);
        }, 3000);
        return;
      }

      if (numerator === correctNumerator) {
        sounds.levelUp();
        sendAdminMessage('agent', 'Perfect! Now enter the denominator - how many pieces are there in total?');
      } else {
        sounds.join();
        sendAdminMessage('admin', `User answered incorrectly for the numerator. The answer should be ${correctNumerator}, but user entered ${numerator}. Diagnose socratically. Explain everytime deeply and in detail but remember just hints.Don't repeat preivous narration`);
      }
    }

    // Only handle denominator validation if numerator is correct
    if (denominator.toString().length > 0 && numerator === correctNumerator) {
      if (denominator.toString().length < correctDenominator.toString().length) {
        timeoutRef.current = setTimeout(() => {
          sounds.join();
          sendAdminMessage('admin', `User has entered incomplete denominator. The answer should be ${correctDenominator}. User has entered ${denominator}. Diagnose socratically. Explain everytime deeply and in detail but remember just hints.Don't repeat preivous narration`);
        }, 3000);
        return;
      }

      if (denominator === correctDenominator) {
        setStep(3);
        sounds.levelUp();
        sendAdminMessage('agent', `Great job, let's head to the final level!`);
      } else {
        sounds.join();
        sendAdminMessage('admin', `User answered incorrectly for the denominator. The answer should be ${correctDenominator}, but user entered ${denominator}. Diagnose socratically. Explain everytime deeply and in detail but remember just hints.Don't repeat preivous narration`);
      }
    }
  }, [numerator, denominator]);

  useEffect(() => {
    if (step === 2) {
      sendAdminMessage('agent', 'Awesome, now enter the fraction these chocolates display');
    }
  }, [step]);

  const handlePieceClick = (index: number) => {
    setSelectedPieces(index);
    sounds.join();
  };

  const handleKnifeSelect = (value: number) => {
    setSelectedKnife(value);
    if (value === 10) {
      sendAdminMessage('agent', 'Awesome, can you try selecting 1.7 chocolates?');
    }
  };

  return (
    <ScrollContainer>
      <div 
        ref={containerRef}
        className="flex flex-col min-h-screen w-full overflow-x-hidden"
        style={{ 
          scrollMarginTop: '0px',
          marginTop: '0px',
          paddingTop: '0px'
        }}
      >
        <Header
          title={
            <>
              Convert 
              <span className='bg-white px-2 py-1 rounded-md'>
                {question6}
              </span>
              to a fraction
            </>
          }
          level='Level 3'
          leftBox={step < 2 ? 'STEP 1' : 'STEP 2'}
          rightBox={step < 2 ? <>
            CREATE 
            <span className='bg-white text-black px-2 ml-2 rounded-sm'>
              {question6}
            </span>
          </> : <>
            Enter fraction
          </>}
        /> 
        <div className='w-full bg-[#edffee] my-10 py-10'>
          <div className="flex flex-col items-center max-w-screen-lg w-full mx-auto justify-center flex-1 gap-8">
            {step < 2 ?
            <div className='flex w-full justify-center'>
              
              <span className='flex flex-col justify-center h-full mx-16 w-1/6 text-center text-xl'>
                {Array.from({length: wholechocolate}, (_, index) => (
                  <div key={index}>
                    {selectedKnife === 100 ? (
                      <Bar2d
                        numerator={selectedKnife * chocolate}
                        denominator={selectedKnife * chocolate}
                        handlePieceClick={() => {}}
                        active={false}
                      />
                    ) : (
                      <VerticalBar
                        numerator={selectedKnife * chocolate}
                        denominator={selectedKnife * chocolate}
                        handlePieceClick={() => {}}
                        active={false}
                      />
                    )}
                  </div>
                ))}
              </span>

              <span className='relative w-4/6 text-center text-xl'>
                {selectedKnife === 100 ? (
                  <Bar2d
                    numerator={selectedPieces}
                    denominator={selectedKnife * chocolate}
                    handlePieceClick={handlePieceClick}
                    active={step > 0}
                  />
                ) : (
                  <VerticalBar
                    numerator={selectedPieces}
                    denominator={selectedKnife * chocolate}
                    handlePieceClick={handlePieceClick}
                    active={step > 0}
                  />
                )}
              </span>

              <span className='relative flex flex-col justify-center mx-10 w-1/6 text-center text-xl'>
                  {step === 0 ?
                    <KnifeSelector
                      options={[10, 100]}
                      selectedKnife={selectedKnife}
                      setSelectedKnife={handleKnifeSelect}
                    />
                  :
                    <div 
                      className={`m-2 bg-amber-800/50 rounded-md aspect-square flex font-extrabold text-5xl items-center justify-center hover:bg-amber-800/60 transition-all duration-100 ${!allowadd ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                      onClick={() => {
                        if (allowadd) {
                        setWholechocolate(wholechocolate + 1) 
                        sounds.break()
                        setSelectedPieces(0)
                      }}}
                    >
                      +
                    </div>
                  }
              </span>

            </div>
            :
            <div className="flex justify-center text-2xl  items-center gap-4">
              {Array.from({length: wholechocolate}, (_, index) => (
                <div 
                  key={index}
                >
                  <VerticalBar
                    numerator={selectedKnife}
                    denominator={selectedKnife}
                    handlePieceClick={() => {}}
                    active={false}
                />
                </div>
              ))}
              <VerticalBar
                numerator={selectedPieces}
                denominator={selectedKnife}
                handlePieceClick={() => {}}
                active={false}
              />
            </div>
            }


            {step < 1 ?
              <div className="flex text-2xl items-center gap-4">
                <RedBox2>
                  {selectedKnife * chocolate}
                </RedBox2>
                  piece(s), but you need 10
              </div>
            : ( step === 1 ?
              <div className="flex justify-center text-2xl  items-center gap-4">
                <DecimalBox
                  wholes={Math.floor((wholechocolate*selectedKnife + selectedPieces) / selectedKnife).toString()}
                  tenths={ (wholechocolate*selectedKnife + selectedPieces) % selectedKnife === 0 ? '0' : ((wholechocolate*selectedKnife + selectedPieces) % selectedKnife).toString()}
                  tenthsRef={tenthsInputRef}
                  hundredthsRef={hundredthsInputRef}
                />
              </div>
            :
              <FractionBox
                numerator={numerator.toString()}
                denominator={denominator.toString()}
                onChange={{
                  numerator: (value) => setNumerator(parseInt(value) || 0),
                  denominator: (value) => setDenominator(parseInt(value) || 0)
                }}
                correctnumerator={(question6*selectedKnife).toString()}
                correctdenominator={selectedKnife.toString()}
              />
            )}
          </div>
        </div>

        <div className='flex mb-20 justify-center'>
            {step === 3 &&
              <Proceed
                onComplete={() => {
                  window.scrollTo(0, 0);
                  setGameStateRef((prev) => ({
                    ...prev,
                    screen: 'fifth'
                  }))
                  sounds.levelUp();
                }}
                text="Onward! 🚀"
              />
            }
        </div>
      </div>
    </ScrollContainer>
  );
};

export default FourthScreen; 