'use client'

import { useGameState } from './state-utils'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FractionDisplay } from './components/FractionDisplay'
import {  useEffect, useState } from 'react'
import { send } from 'node:process'
import { stringify } from 'node:querystring'
import { useSoundEffects } from './sounds'

interface FractionSubtractionProps {
  sendAdminMessage: (role: string, content: string) => void
  onProceed: () => void
}

export default function Screen1({ sendAdminMessage, onProceed }: FractionSubtractionProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { step, fraction1, fraction2 } = gameStateRef.current.state1;

  const [selectedPieces, setSelectedPieces] = useState<number>(0);
  const [droppedPieces, setDroppedPieces] = useState<Array<{ x: number, y: number, originalIndex: number }>>([]);
  const [answer, setAnswer] = useState<{ numerator: string, denominator: string }>({ numerator: '', denominator: '' });
  const [firstAnswer, setFirstAnswer] = useState<string | null>(null);
  const [secondAnswer, setSecondAnswer] = useState<string | null>(null);
  const [barValueStep, setBarValueStep] = useState<boolean>(false);
  const [barValue, setBarValue] = useState<{ numerator: number, denominator: number }>({ numerator: 0, denominator: 1 });

  const soundEffects = useSoundEffects();

  const setCurrentStep = (step: number) => {
    setGameStateRef(prev => ({
      ...prev,
      state1: {
        ...prev.state1,
        step: step
      }
    }));
  }

  useEffect(() => {
    sendAdminMessage('agent', `Here's a chocolate for you! Try selecting pieces to get ${fraction1.numerator}/${fraction1.denominator}th of the chocolate.`);

    setBarValue({
      numerator: fraction1.numerator,
      denominator: fraction1.denominator
    });
  }, []);

  const handlePieceClick = (index: number) => {
    if (step === 1) {
      soundEffects.drop.play();

      setSelectedPieces(index < selectedPieces ? index + 1 : index + 1);
    }
  }

  const handleProceed = () => {
    if (step === 1 && selectedPieces === fraction1.numerator) {
      sendAdminMessage('agent', `How about we share ${fraction2.numerator}/${fraction2.denominator}th with a friend? Try picking and dropping pieces to do that!`);
      setCurrentStep(2);
    } else if (step === 2) {
      if (barValueStep) {
        sendAdminMessage('agent', 'Awesome, here are some fun questions for you to reflect on!');

        setBarValueStep(false);
        setCurrentStep(3);
      } else if (droppedPieces.length === fraction2.numerator) {
        sendAdminMessage('agent', "Great! What fraction of the bar are we left with?");
        setBarValue({
          numerator: 0,
          denominator: 0
        });
        setBarValueStep(true);

      }
    } else if (step === 3 &&
      answer.numerator === String(fraction1.numerator - fraction2.numerator) &&
      answer.denominator === String(fraction1.denominator)) {
      setCurrentStep(4);
    }
  }

  const handleDragStart = (e: React.DragEvent, index: number) => {
    if (step === 2 && index < selectedPieces) {
      e.dataTransfer.setData('text/plain', index.toString())
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();

    if (step === 2) {
      const draggedIndex = parseInt(e.dataTransfer.getData('text/plain'));
      const rect = e.currentTarget.getBoundingClientRect();
      const x = Math.min(Math.max(e.clientX - rect.left - 32, 0), rect.width - 64);
      const y = Math.min(Math.max(e.clientY - rect.top - 32, 0), rect.height - 64);

      soundEffects.drop.play();

      setDroppedPieces(prev => [...prev, { x, y, originalIndex: draggedIndex }]);
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const isPieceDropped = (index: number) => {
    return droppedPieces.some(piece => piece.originalIndex === index)
  }

  const isAnswerCorrect = () => {
    const expectedNumerator = fraction1.numerator - fraction2.numerator;
    const expectedDenominator = fraction1.denominator; 

    return answer.numerator === String(expectedNumerator) &&
      answer.denominator === String(expectedDenominator);
  }

  const handleReflectionAnswer = (question: 'first' | 'second', answerValue: string) => {
    if (question === 'first' && answerValue === 'same') {
      soundEffects.correct.play();
      sendAdminMessage('agent', 'Correct! what about the numerator?');
      setFirstAnswer(answerValue);
    } else if (question === 'first' && answerValue !== 'same') {
      soundEffects.wrong.play();
      sendAdminMessage('agent', 'Ah, not quite. What do you think the denominator was before and after subtraction?')
      setFirstAnswer('incorrect');
    } else if (question === 'second' && answerValue === 'subtracted') {
      soundEffects.correct.play();
      sendAdminMessage('agent', 'Correct!');
      setSecondAnswer(answerValue);
    } else if (question === 'second' && answerValue !== 'subtracted') {
      soundEffects.wrong.play();
      sendAdminMessage('agent', 'Ah, not quite. What do you think the numerator was before and after subtraction?')
      setSecondAnswer('incorrect');
    }
  }

  const handleFinalProceed = () => {
    onProceed();
  }

  const handleChocolateBarDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const draggedIndex = parseInt(e.dataTransfer.getData('text/plain'));
    
    setDroppedPieces(prev => prev.filter(piece => piece.originalIndex !== draggedIndex));
    
    soundEffects.drop.play();
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-[#F9F871] p-6 flex items-center justify-between border-b-4 border-black">
        {/* Left side - Navigation buttons */}
        <div className="flex w-full gap-2">
          {step > 1 && (
            <Button
              onClick={() => setCurrentStep(step - 1)}
              disabled={step === 1}
              className="bg-[#FF497C] text-white px-4 py-2 text-sm font-bold border-2 border-black hover:bg-[#FF497C]/90"
            >
              Previous Step
            </Button>
          )}
          {step < 4 && (
            <Button
              onClick={() => setCurrentStep(step + 1)}
              className="bg-[#FF497C] text-white px-4 py-2 text-sm font-bold border-2 border-black hover:bg-[#FF497C]/90"
              disabled={
                (step === 1 && selectedPieces !== fraction1.numerator) ||
                (step === 2 && droppedPieces.length !== fraction2.numerator) ||
                (step === 3 && !isAnswerCorrect())
              }
            >
              Next Step
            </Button>
          )}
        </div>

        {/* Center - Original fraction display */}
        <div className="flex w-full justify-center items-center gap-4">
          <span className="text-4xl font-bold">Subtract:</span>
          <FractionDisplay
            numerator={fraction1.numerator}
            denominator={fraction1.denominator}
          />
          <span className="text-4xl font-bold">-</span>
          <FractionDisplay
            numerator={fraction2.numerator}
            denominator={fraction2.denominator}
          />
        </div>
        
        {/* Right side - Empty div for balance */}
        <div className="w-full"></div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white pt-16 p-8 flex flex-col items-center gap-8">
        {/* Step Indicators */}
        <div className="flex items-center gap-4 h-14">
          <div className="border-2 border-[#FF497C] px-6 flex items-center h-full">
            <span className="text-[#FF497C] font-bold text-xl">
              STEP {barValueStep ? 3 : step === 4 ? 4 : step}
            </span> 
          </div>
          <div className="bg-[#FF497C] px-6 flex items-center gap-2 h-full">
            <span className="text-white font-bold text-xl">
              {step === 1 ? 'CREATE' :
                barValueStep ? 'THE ANSWER' :
                step === 2 ? 'REMOVE' :
                step === 3 ? 'THE ANSWER' : 'REFLECT'
              }
            </span>
            {step !== 3 && step !== 4 && !barValueStep && (
              <div className="bg-white px-2">
                <div className="text-black font-bold">
                  {step === 1 ? fraction1.numerator : fraction2.numerator}
                </div>
                <div className="border-t-2 border-black"></div>
                <div className="text-black font-bold">{fraction1.denominator}</div>
              </div>
            )}
          </div>
        </div>

            {/* Chocolate Bar and Instructions */}
            {step !== 5 && (
            <>
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-[3px]"
                    onDrop={handleChocolateBarDrop}
                    onDragOver={handleDragOver}
                  >
                    {[...Array(fraction1.denominator)].map((_, index) => (
                      <div
                        key={index}
                        draggable={step === 2 && !barValueStep && (index < selectedPieces)}
                        onDragStart={(e) => handleDragStart(e, index)}
                        className={`w-16 h-16 relative cursor-pointer border-[3px] border-[#906547] ${
                          index < selectedPieces && !isPieceDropped(index)
                            ? 'bg-gradient-to-br from-[#5B361B] to-[#432611]'
                            : 'bg-gradient-to-br from-[#906547] to-[#785339]'
                        } ${step === 2 && index < selectedPieces ? 'cursor-grab' : ''}`}
                        onClick={() => handlePieceClick(index)}
                      >
                        {/* 3D effect borders */}
                        <div className="absolute inset-0 border-l-4 border-t-4 border-[#FFFFFF20]"></div>
                        <div className="absolute inset-0 border-r-4 border-b-4 border-[#00000040]"></div>
                      </div>
                    ))}
                  </div>
                  
                    <div className="flex flex-col items-center justify-center p-2">
                      <input
                        type="text"
                        value={barValue?.numerator!=0 ? barValue?.numerator : ""}
                        disabled={!barValueStep}
                        placeholder={"?"}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          setBarValue(prev => ({
                            ...prev,
                            numerator: isNaN(value) ? 0 : value
                          }));
                        }}
                        className={`w-12 h-12 text-2xl font-bold text-center border-2 ${!barValueStep ? 'bg-transparent outline-none border-transparent' : 'border-black bg-slate-200'}`}
                      />

                      <div className="border-t-2 border-black w-full"></div>
                      <input
                        type="text"
                        value={barValue?.denominator!=0 ? barValue?.denominator : ""}
                        disabled={!barValueStep}
                        placeholder={"?"}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          setBarValue(prev => ({
                            ...prev,
                            denominator: isNaN(value) ? 0 : value
                          }));
                        }}
                        className={`w-12 h-12 text-2xl font-bold text-center border-2 ${!barValueStep ? 'bg-transparent outline-none border-transparent' : 'border-black bg-slate-200'}`}
                      />
                    </div>
                  
                </div>
                <p className="text-xl font-bold text-center">
                  {step === 1
                    ? `Select pieces to get ${fraction1.numerator}/${fraction1.denominator} of the chocolate bar.`
                    : step === 2 && !barValueStep
                      ? `Pick and drop pieces to give ${fraction2.numerator}/${fraction2.denominator} of the bar to your friend!`
                      : step === 3 && "Awesome, it's time to answer our original question"}
                </p>
                {step >= 3 && (
                  <div className="flex items-center gap-4 text-2xl font-bold">
                    <FractionDisplay
                      numerator={fraction1.numerator}
                      denominator={fraction1.denominator}
                    />
                    <span>-</span>
                    <FractionDisplay
                      numerator={fraction2.numerator}
                      denominator={fraction2.denominator}
                    />
                    <span>=</span>
                    <div className={`flex flex-col items-center bg-white border-2 justify-evenly gap-1 py-1 px-2 border-black`}>
                      <div className="text-2xl font-bold">
                        <input
                          type="text"
                          placeholder='?'
                          value={answer.numerator}
                          onChange={(e) => setAnswer(prev => ({
                            ...prev,
                            numerator: e.target.value
                          }))}
                          className="w-10 h-8 text-center rounded outline-none bg-slate-200"
                        />
                      </div>
                      <div className="border-t-2 border-black w-8"/>
                      <div className="text-2xl font-bold">
                        <input
                          type="text"
                          placeholder='?'
                          value={answer.denominator}
                          onChange={(e) => setAnswer(prev => ({
                            ...prev,
                            denominator: e.target.value
                          }))}
                          className="w-10 h-8 text-center rounded outline-none bg-slate-200"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
            )}

            {/* Reflection Questions */}
            {step === 4 ? (
              <div className="w-full max-w-2xl flex flex-col items-center">
                <div className="bg-[#FCF0FF] p-8 rounded-lg flex flex-col items-center gap-8">
                  <h3 className="text-xl font-bold text-center">Mark the correct answer</h3>

                  {/* First Question */}
                  <div className="w-full flex flex-col items-center gap-4">
                    <p className="text-lg font-bold text-center">
                      How did the denominator (bottom number) change on subtraction?
                    </p>
                    <div className="flex gap-4">
                      <Button
                        onClick={() => handleReflectionAnswer('first', 'same')}
                        className={`px-8 py-2 text-lg font-bold border-2 border-black text-white
                          ${firstAnswer === 'same'
                            ? 'bg-[#2EA500] hover:bg-[#2EA500]'
                            : 'bg-[#FF497C] hover:bg-[#FF497C]/90'}`}
                      >
                        Remained the same
                      </Button>
                      <Button
                        onClick={() => handleReflectionAnswer('first', 'subtracted')}
                        className="px-8 py-2 text-lg font-bold border-2 border-black text-white bg-[#FF497C] hover:bg-[#FF497C]/90"
                      >
                        It got subtracted
                      </Button>
                    </div>
                    
                    {firstAnswer === 'incorrect' && (
                      <div className="mt-4 p-4 bg-red-100 border-2 border-red-300 rounded-lg text-center">
                        <p className="text-red-700 font-bold">Not quite, try again!</p>
                      </div>
                    )}
                  </div>

                  {/* Second Question - Only shows after first is answered correctly */}
                  {firstAnswer === 'same' && (
                    <div className="w-full flex flex-col items-center gap-4">
                      <p className="text-lg font-bold text-center">
                        How did the numerator (top number) change on subtraction?
                      </p>
                      <div className="flex gap-4">
                        <Button
                          onClick={() => handleReflectionAnswer('second', 'same')}
                          className="px-8 py-2 text-lg font-bold border-2 border-black text-white bg-[#FF497C] hover:bg-[#FF497C]/90"
                        >
                          Remained the same
                        </Button>
                        <Button
                          onClick={() => handleReflectionAnswer('second', 'subtracted')}
                          className={`px-8 py-2 text-lg font-bold border-2 border-black text-white
                            ${secondAnswer === 'subtracted'
                              ? 'bg-[#2EA500] hover:bg-[#2EA500]'
                              : 'bg-[#FF497C] hover:bg-[#FF497C]/90'}`}
                        >
                          It got subtracted
                        </Button>
                      </div>
                      
                      {secondAnswer === 'incorrect' && (
                        <div className="mt-4 p-4 bg-red-100 border-2 border-red-300 rounded-lg text-center">
                          <p className="text-red-700 font-bold">Not quite, try again!</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <></>
            )}

            {step === 1 && (
              /* Proceed Button */
              <Button
                onClick={handleProceed}
                disabled={selectedPieces !== fraction1.numerator}
                className={`bg-[#FF497C] text-white px-8 py-2 text-xl font-bold border-2 border-black hover:bg-[#FF497C]/90 
                  ${selectedPieces !== fraction1.numerator ? 'hidden' : ''}`}
              >
                PROCEED
              </Button>
            )}

            {step === 2 && (
              /* Drop Zone */
              <div className="w-full flex flex-col items-center justify-start pt-4">
                <p className="text-xl font-bold mb-4">
                {barValueStep ? 'You have given ' : "Drop "} 
                  <span className="inline-flex flex-col align-middle items-center mx-1">
                    <span>{fraction2.numerator}</span>
                    <span className="border-t border-black w-4"></span>
                    <span>{fraction1.denominator}</span>
                  </span> 
                  {barValueStep ? ' of the bar to your friend' : ' of the bar here!'}
                </p>
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className="w-full h-32 relative bg-[#FCF0FF] rounded-xl border-2 border-black"
                >
                  {droppedPieces.map((piece, index) => (
                    <div
                      key={index}
                      draggable={true}
                      onDragStart={(e) => {
                        e.dataTransfer.setData('text/plain', piece.originalIndex.toString());
                      }}
                      style={{
                        position: 'absolute',
                        left: piece.x,
                        top: piece.y,
                      }}
                      className="w-16 h-16 bg-gradient-to-br from-[#5B361B] to-[#432611] border-[3px] border-[#2B1810] cursor-grab"
                    >
                      <div className="absolute inset-0 border-l-4 border-t-4 border-[#FFFFFF20]"></div>
                      <div className="absolute inset-0 border-r-4 border-b-4 border-[#00000040]"></div>
                    </div>
                  ))}
                </div>
                {(!barValueStep && droppedPieces.length === fraction2.numerator || (barValueStep && barValue.numerator === fraction1.numerator - fraction2.numerator && barValue.denominator === fraction1.denominator)) && (
                  <div className="flex justify-center w-full mt-4">
                    <Button
                      onClick={handleProceed}
                      className="bg-[#FF497C] text-white px-8 py-2 text-xl font-bold border-2 border-black hover:bg-[#FF497C]/90"
                    >
                      PROCEED
                    </Button>
                  </div>
                )}
              </div>
            )}

            {step === 3 && (
              <Button
                onClick={handleProceed}
                className={`bg-[#FF497C] text-white px-8 py-2 text-xl font-bold border-2 border-black hover:bg-[#FF497C]/90
                  ${!isAnswerCorrect() ? 'hidden' : ''}`}
              >
                PROCEED
              </Button>
            )}

            {step === 4 && firstAnswer === 'same' && secondAnswer === 'subtracted' && (
              <div className="w-full flex justify-center mt-8">
                <Button
                  onClick={handleFinalProceed}
                  disabled={firstAnswer !== 'same' || secondAnswer !== 'subtracted'}
                  className={`bg-[#FF497C] text-white px-8 py-2 text-xl font-bold border-2 border-black 
                    ${firstAnswer === 'same' && secondAnswer === 'subtracted' ? 'hover:bg-[#FF497C]/90' : 'opacity-50 cursor-not-allowed'}`}
                >
                  Next question
                </Button>
              </div>
            )}
      </div>
    </div>
  )
}