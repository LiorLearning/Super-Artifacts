'use client'

import { useGameState } from './state-utils'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FractionDisplay } from './components/FractionDisplay'
import { use, useEffect } from 'react'
import { send } from 'node:process'
import { stringify } from 'node:querystring'
import { useSoundEffects } from './sounds'

interface FractionSubtractionProps {
  sendAdminMessage: (role: string, content: string) => void
  onProceed: () => void
}

export default function Screen1({ sendAdminMessage, onProceed }: FractionSubtractionProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { fraction1, fraction2 } = gameStateRef.current.questions.question1;
  const soundEffects = useSoundEffects();

  useEffect(() => {
    sendAdminMessage('agent', `Here's a chocolate for you! Try selecting pieces to get ${fraction1.numerator}/${fraction1.denominator}ths of the chocolate.`);
  }, []);

  const handlePieceClick = (index: number) => {
    if (gameStateRef.current.currentStep === 1) {
      soundEffects.drop.play();
      setGameStateRef(prev => ({
        ...prev,
        selectedPieces: index < prev.selectedPieces ? index + 1 : index + 1
      }));
    }
  }

  const handleProceed = () => {
    const { currentStep, selectedPieces, droppedPieces, answer } = gameStateRef.current;
    if (currentStep === 1 && selectedPieces === fraction1.numerator) {
      sendAdminMessage('agent', `How about we share ${fraction2.numerator}/${fraction2.denominator}ths with a friend? Try picking and dropping pieces to do that!`);
      setGameStateRef({ currentStep: 2 });
    } else if (currentStep === 2 && droppedPieces.length === fraction2.numerator) {
      sendAdminMessage('agent', 'Awesome, here are some fun questions for you to reflect on!');
      setGameStateRef({ currentStep: 3 });
    } else if (currentStep === 3 &&
      answer.numerator === String(fraction1.numerator - fraction2.numerator) &&
      answer.denominator === String(fraction1.denominator)) {
      setGameStateRef({ 
        currentStep: 4
      });
    }
  }

  const handleDragStart = (e: React.DragEvent, index: number) => {
    if (gameStateRef.current.currentStep === 2 && index < gameStateRef.current.selectedPieces) {
      e.dataTransfer.setData('text/plain', index.toString())
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const { currentStep, droppedPieces } = gameStateRef.current;

    if (currentStep === 2 && droppedPieces.length < fraction2.numerator) {
      const draggedIndex = parseInt(e.dataTransfer.getData('text/plain'));
      const rect = e.currentTarget.getBoundingClientRect();
      const x = Math.min(Math.max(e.clientX - rect.left - 32, 0), rect.width - 64);
      const y = Math.min(Math.max(e.clientY - rect.top - 32, 0), rect.height - 64);

      soundEffects.drop.play();

      setGameStateRef(prev => ({
        ...prev,
        droppedPieces: [...prev.droppedPieces, { x, y, originalIndex: draggedIndex }]
      }));
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const isPieceDropped = (index: number) => {
    return gameStateRef.current.droppedPieces.some(piece => piece.originalIndex === index)
  }

  const isAnswerCorrect = () => {
    const expectedNumerator = fraction1.numerator - fraction2.numerator;
    const expectedDenominator = fraction1.denominator; 

    return gameStateRef.current.answer.numerator === String(expectedNumerator) &&
      gameStateRef.current.answer.denominator === String(expectedDenominator);
  }

  const handleReflectionAnswer = (question: 'first' | 'second', answer: string) => {
    if (question === 'first' && answer === 'same') {
      soundEffects.correct.play();
      sendAdminMessage('agent', 'Correct! what about the numerator?');
    } else if (question === 'first' && answer != 'same') {
      soundEffects.wrong.play();
      sendAdminMessage('agent', 'Ah, not quite. What do you think the denominator was before and after subtraction?');
    } else if (question === 'second' && answer === 'subtracted') {
      soundEffects.correct.play();
      sendAdminMessage('agent', 'Correct!');
    } else if (question === 'second' && answer != 'subtracted') {
      soundEffects.wrong.play();
      sendAdminMessage('agent', 'Not quite. What do you think the numerator was before and after subtraction?');
    }
    setGameStateRef({ 
      [question === 'first' ? 'firstAnswer' : 'secondAnswer']: answer
    });
  }

  const handleFinalProceed = () => {
    onProceed();
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-[#F9F871] p-6 flex items-center justify-between border-b-4 border-black">
        {/* Left side - Navigation buttons */}
        <div className="flex gap-2">
          {gameStateRef.current.currentStep >= 1 && (
            <Button
              onClick={() => setGameStateRef({ currentStep: gameStateRef.current.currentStep - 1 })}
              disabled={gameStateRef.current.currentStep === 1}
              className="bg-[#FF497C] text-white px-4 py-2 text-sm font-bold border-2 border-black hover:bg-[#FF497C]/90"
            >
              Previous Step
            </Button>
          )}
          {gameStateRef.current.currentStep < 4 && (
            <Button
              onClick={() => setGameStateRef({ currentStep: gameStateRef.current.currentStep + 1 })}
              className="bg-[#FF497C] text-white px-4 py-2 text-sm font-bold border-2 border-black hover:bg-[#FF497C]/90"
              disabled={
                (gameStateRef.current.currentStep === 1 && gameStateRef.current.selectedPieces !== fraction1.numerator) ||
                (gameStateRef.current.currentStep === 2 && gameStateRef.current.droppedPieces.length !== fraction2.numerator) ||
                (gameStateRef.current.currentStep === 3 && !isAnswerCorrect())
              }
            >
              Next Step
            </Button>
          )}
        </div>

        {/* Center - Original fraction display */}
        <div className="flex items-center gap-4">
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
        <div className="w-[120px]"></div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white pt-16 p-8 flex flex-col items-center gap-8">
        {/* Step Indicators */}
        <div className="flex items-center gap-4 h-14">
          <div className="border-2 border-[#FF497C] px-6 flex items-center h-full">
            <span className="text-[#FF497C] font-bold text-xl">
              STEP {gameStateRef.current.currentStep === 4 ? 4 : gameStateRef.current.currentStep}
            </span>
          </div>
          <div className="bg-[#FF497C] px-6 flex items-center gap-2 h-full">
            <span className="text-white font-bold text-xl">
              {gameStateRef.current.currentStep === 1 ? 'CREATE' :
                gameStateRef.current.currentStep === 2 ? 'REMOVE' :
                  gameStateRef.current.currentStep === 3 ? 'THE ANSWER' : 'REFLECT'}
            </span>
            {gameStateRef.current.currentStep !== 3 && gameStateRef.current.currentStep !== 4 && (
              <div className="bg-white px-2">
                <div className="text-black font-bold">
                  {gameStateRef.current.currentStep === 1 ? fraction1.numerator : fraction2.numerator}
                </div>
                <div className="border-t-2 border-black"></div>
                <div className="text-black font-bold">{fraction1.denominator}</div>
              </div>
            )}
          </div>
        </div>

        {/* Chocolate Bar and Instructions */}
        {gameStateRef.current.currentStep !== 5 && (
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-[3px]">
                {[...Array(fraction1.denominator)].map((_, index) => (
                  <div
                    key={index}
                    draggable={gameStateRef.current.currentStep === 2 && index < gameStateRef.current.selectedPieces && !isPieceDropped(index)}
                    onDragStart={(e) => handleDragStart(e, index)}
                    className={`w-16 h-16 relative cursor-pointer border-[3px] border-[#906547] ${index < gameStateRef.current.selectedPieces && !isPieceDropped(index)
                      ? 'bg-gradient-to-br from-[#5B361B] to-[#432611]'
                      : 'bg-gradient-to-br from-[#906547] to-[#785339]'
                      } ${gameStateRef.current.currentStep === 2 && index < gameStateRef.current.selectedPieces && !isPieceDropped(index) ? 'cursor-grab' : ''}`}
                    onClick={() => handlePieceClick(index)}
                  >
                    {/* 3D effect borders */}
                    <div className="absolute inset-0 border-l-4 border-t-4 border-[#FFFFFF20]"></div>
                    <div className="absolute inset-0 border-r-4 border-b-4 border-[#00000040]"></div>
                  </div>
                ))}
              </div>
              
                <div className="flex flex-col items-center justify-center p-2">
                  <div className="text-2xl font-bold">{gameStateRef.current.selectedPieces}</div>
                  <div className="border-t-2 border-black w-full"></div>
                  <div className="text-2xl font-bold">{fraction1.denominator}</div>
                </div>
              
            </div>
            <p className="text-xl font-bold text-center max-w-md">
              {gameStateRef.current.currentStep === 1
                ? `Select pieces to get ${fraction1.numerator}/${fraction1.denominator} of the chocolate bar.`
                : gameStateRef.current.currentStep === 2
                  ? `Pick and drop pieces to give ${fraction2.numerator}/${fraction2.denominator} of the bar to your friend!`
                  : gameStateRef.current.currentStep === 3 && "Awesome, it’s time to answer our original question?"}
            </p>
            {gameStateRef.current.currentStep >= 3 && (
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
                <div className="flex gap-1 flex-col items-center">
                  <Input
                  type="text"
                  value={gameStateRef.current.answer.numerator}
                  onChange={(e) => setGameStateRef({
                    ...gameStateRef.current,
                    answer: {
                    ...gameStateRef.current.answer,
                    numerator: e.target.value
                    }
                  })}
                  className="w-12 h-12 text-4xl font-bold text-center border-2 border-black"
                  />
                  <div className="border-t-2 border-black w-full"></div>
                  <Input
                  type="text"
                  value={gameStateRef.current.answer.denominator}
                  onChange={(e) => setGameStateRef({
                    ...gameStateRef.current,
                    answer: {
                    ...gameStateRef.current.answer,
                    denominator: e.target.value
                    }
                  })}
                  className="w-12 h-12 text-4xl font-bold text-center border-2 border-black"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Reflection Questions */}
        {gameStateRef.current.currentStep === 4 ? (
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
                      ${gameStateRef.current.firstAnswer === 'same'
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
              </div>

              {/* Second Question - Only shows after first is answered correctly */}
              {gameStateRef.current.firstAnswer === 'same' && (
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
                        ${gameStateRef.current.secondAnswer === 'subtracted'
                          ? 'bg-[#2EA500] hover:bg-[#2EA500]'
                          : 'bg-[#FF497C] hover:bg-[#FF497C]/90'}`}
                    >
                      It got subtracted
                    </Button>
                  </div>
                </div>
              )}

            </div>
          </div>
        ) : (
          <></>
        )}

        {gameStateRef.current.currentStep === 1 ? (
          /* Proceed Button */
          <Button
            onClick={handleProceed}
            disabled={gameStateRef.current.selectedPieces !== fraction1.numerator}
            className="bg-[#FF497C] text-white px-8 py-2 text-xl font-bold border-2 border-black disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#FF497C]/90"
          >
            PROCEED
          </Button>
        ) : gameStateRef.current.currentStep === 2 ? (
          /* Drop Zone */
          <div className="w-screen -mx-8 bg-[#FCF0FF] flex flex-col items-center justify-start pt-4">
            <p className="text-xl font-bold mb-4">
              Drop <span className="inline-flex flex-col items-center mx-1">
                <span>{fraction2.numerator}</span>
                <span className="border-t border-black w-4"></span>
                <span>{fraction1.denominator}</span>
              </span> of the bar here!
            </p>
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="w-full h-32 relative"
            >
              {gameStateRef.current.droppedPieces.map((piece, index) => (
                <div
                  key={index}
                  style={{
                    position: 'absolute',
                    left: piece.x,
                    top: piece.y,
                  }}
                  className="w-16 h-16 bg-gradient-to-br from-[#5B361B] to-[#432611] border-[3px] border-[#2B1810]"
                >
                  <div className="absolute inset-0 border-l-4 border-t-4 border-[#FFFFFF20]"></div>
                  <div className="absolute inset-0 border-r-4 border-b-4 border-[#00000040]"></div>
                </div>
              ))}
            </div>
            {gameStateRef.current.droppedPieces.length === fraction2.numerator && (
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
        ) : gameStateRef.current.currentStep === 3 ? (
          <Button
            onClick={handleProceed}
            disabled={!isAnswerCorrect()}
            className="bg-[#FF497C] text-white px-8 py-2 text-xl font-bold border-2 border-black disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#FF497C]/90"
          >
            PROCEED
          </Button>
        ) : (
          <></>
        )}
        {gameStateRef.current.currentStep === 4 && (
          <div className="w-full flex justify-center mt-8">
            <Button
              onClick={handleFinalProceed}
              disabled={gameStateRef.current.firstAnswer !== 'same' || gameStateRef.current.secondAnswer !== 'subtracted'}
              className={`bg-[#FF497C] text-white px-8 py-2 text-xl font-bold border-2 border-black 
                ${gameStateRef.current.firstAnswer === 'same' && gameStateRef.current.secondAnswer === 'subtracted' ? 'hover:bg-[#FF497C]/90' : 'opacity-50 cursor-not-allowed'}`}
            >
              Next question
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
