import React, { useEffect, useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SuccessAnimation from '../../utils/success-animate';
import { Fraction, BarState, Bar } from './bar';
import { useGameState } from './state-utils';

interface GameProps {
  sendAdminMessage: (role: string, content: string) => void;
}

const maxParts = 12;

const Game = ({sendAdminMessage}: GameProps) => {  
  const { gameStateRef } = useGameState();
  const { fraction1, fraction2 } = gameStateRef.current.state1;

  const [bar1, setBar1] = useState<BarState>({ parts: 1, selectedParts: [] });
  const [bar2, setBar2] = useState<BarState>({ parts: 1, selectedParts: [] });
  const [showAnswer, setShowAnswer] = useState(false);
  const [userAnswer, setUserAnswer] = useState<string | null>(null);
  const [isFirstFractionCorrect, setIsFirstFractionCorrect] = useState(false);
  const [isSecondFractionCorrect, setIsSecondFractionCorrect] = useState(false);
  const [compareMode, setCompareMode] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const correctAnswer = (fraction1.num * fraction2.denom) > (fraction2.num * fraction1.denom) ? fraction1 : fraction2;
  

  const checkFraction = (bar: BarState, targetFraction: Fraction) => {
    return bar.parts === targetFraction.denom && bar.selectedParts.length === targetFraction.num;
  };

  const handleCut = (barNumber: number) => {
    if (barNumber === 1) {
      setBar1(prev => ({
        ...prev,
        parts: prev.parts + 1
      }));
    } else {
      setBar2(prev => ({
        ...prev,
        parts: prev.parts + 1
      }));
    }
  };

  const handleJoin = (barNumber: number) => {
    if (barNumber === 1) {
      setBar1(prev => ({
        ...prev,
        parts: Math.max(prev.parts - 1, 1)
      }));
    } else {
      setBar2(prev => ({
        ...prev,
        parts: Math.max(prev.parts - 1, 1)
      }));
    }
  };

  useEffect(() => {
    const isFirstFractionCorrect = checkFraction(bar1, fraction1);
    setIsFirstFractionCorrect(isFirstFractionCorrect);
    if (isFirstFractionCorrect) {
      sendAdminMessage('agent', `Awesome! Now try breaking and selecting from the second chocolate to give yourself ${fraction2.num}/${fraction2.denom}`);
    }
  }, [bar1]);

  useEffect(() => {
    const isSecondFractionCorrect = checkFraction(bar2, fraction2);
    setIsSecondFractionCorrect(isSecondFractionCorrect);
    if (isFirstFractionCorrect && isSecondFractionCorrect) {
      sendAdminMessage('agent', `Can you try comparing them visually - which one do you think is bigger?`);
    }
  }, [bar2]);

  const handleSelect = (barNumber: number, part: number) => {
    if (barNumber === 1) {
      setBar1(prev => ({
        ...prev,
        selectedParts: prev.selectedParts.includes(part)
          ? prev.selectedParts.filter(p => p !== part)
          : [...prev.selectedParts, part]
      }));
    } else {
      setBar2(prev => ({
        ...prev,
        selectedParts: prev.selectedParts.includes(part)
          ? prev.selectedParts.filter(p => p !== part)
          : [...prev.selectedParts, part]
      }));
    }
  };

  const handleAnswer = (answer: string) => {
    if (!isFirstFractionCorrect || !isSecondFractionCorrect) {
      return;
    }
    
    setUserAnswer(answer);
    setShowAnswer(true);

    if (answer !== `${fraction1.num}/${fraction1.denom}`) {
      sendAdminMessage('agent', `Oops, try comparing them visually. Which one looks bigger?`);
    } else {
      sendAdminMessage('agent', `Great, let's move on to the next question`);
    }
  };

  const handleCompare = () => {
    if (!isFirstFractionCorrect || !isSecondFractionCorrect) {
      return;
    }
    setCompareMode(true);
  };

  const startGame = () => {
    setGameStarted(true);
    sendAdminMessage('agent', "We'll compare these fractions visually. First, try breaking the first chocolate and selecting pieces to give yourself " + fraction1.num + "/" + fraction1.denom);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-24">
      <div className="w-full max-h-4xl max-w-6xl p-16 bg-gradient-to-br from-[#faf4eb] to-[#f5e6d3] shadow-2xl rounded-2xl mx-4 overflow-auto">
        <div className="space-y-8">
          {/* Game Message */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-[#8B4513]">
              Which is bigger: {fraction1.num}/{fraction1.denom} or {fraction2.num}/{fraction2.denom}?
            </h2>
            <p className="text-lg text-[#8d6e63] italic">
              Split the bars and select pieces to explore! 🍫
            </p>
          </div>

          {/* Visualise Button */}
          {!gameStarted && (
            <div className="flex justify-center">
              <Button
                onClick={startGame}
                id="visualise-button"
                className="p-6 font-bold text-lg bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white hover:shadow-xl transition-all duration-300 transform hover:scale-110 active:scale-95 animate-bounce"
              >
                Visualise
              </Button>
            </div>
          )}

          {/* Chocolate Bars Container */}
          {gameStarted && (
            <div className="space-y-12 relative">
              <div className={`transition-all duration-500 ${showAnswer ? 'opacity-90 filter contrast-75' : ''}`}>
                <div className="flex items-center mb-4">
                  <div className="flex-1">
                    <span className="text-lg font-semibold text-[#5d4037]">First Bar: Make {fraction1.num}/{fraction1.denom}</span>
                    {isFirstFractionCorrect && (
                      <span className="ml-2 text-green-600 animate-bounce">✓</span>
                    )}
                  </div>
                </div>
                <Bar
                  parts={bar1.parts}
                  selectedParts={bar1.selectedParts}
                  onCut={() => handleCut(1)}
                  onJoin={() => handleJoin(1)}
                  onSelect={(part) => handleSelect(1, part)}
                  maxParts={maxParts}
                  compare={compareMode}
                  disabled={isFirstFractionCorrect}
                  label="first"
                  expectedFraction={fraction1}
                />
              </div>
              
              {isFirstFractionCorrect && (
                <div className={`transition-all duration-500 ${showAnswer ? 'opacity-90 filter contrast-75' : ''}`}>
                  <div className="flex items-center mb-4">
                    <div className="flex-1">
                    <span className="text-lg font-semibold text-[#5d4037]">Second Bar: Make {fraction2.num}/{fraction2.denom}</span>
                    {isSecondFractionCorrect && (
                      <span className="ml-2 text-green-600 animate-bounce">✓</span>
                    )}
                  </div>
                </div>
                <Bar
                  parts={bar2.parts}
                  selectedParts={bar2.selectedParts}
                  onCut={() => handleCut(2)}
                  onJoin={() => handleJoin(2)}
                  onSelect={(part) => handleSelect(2, part)}
                  maxParts={maxParts}
                  compare={compareMode}
                  disabled={isSecondFractionCorrect}
                  label="second"
                  expectedFraction={fraction2}
                />
                </div>
              )}
            </div>
          )}

          {/* Comparison Buttons */}
          {!showAnswer && !compareMode && gameStarted && (
            <div className="flex flex-col items-center gap-4 mt-12">
              <div className="flex justify-center gap-6">
                <Button
                  onClick={handleCompare}
                  id="compare-button"
                  className={`px-8 py-6 text-lg font-bold rounded-xl shadow-lg
                    transition-all duration-300 transform hover:scale-105 active:scale-95
                    ${isFirstFractionCorrect && isSecondFractionCorrect
                      ? 'bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white hover:shadow-xl'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  disabled={!isFirstFractionCorrect || !isSecondFractionCorrect}
                >
                  Compare Bars
                </Button>
              </div>
            </div>
          )}

          {compareMode && !showAnswer && (
            <div className="flex flex-col items-center gap-4 mt-12">
              <div className="flex justify-center gap-6">
                <Button
                  onClick={() => handleAnswer(`${fraction1.num}/${fraction1.denom}`)}
                  id="fraction1-button"
                  className={`px-8 py-6 text-lg font-bold rounded-xl shadow-lg
                    transition-all duration-300 transform hover:scale-105 active:scale-95
                    bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white hover:shadow-xl`}
                >
                  {fraction1.num}/{fraction1.denom} is bigger
                </Button>
                <Button
                  onClick={() => handleAnswer(`${fraction2.num}/${fraction2.denom}`)}
                  id="fraction2-button"
                  className={`px-8 py-6 text-lg font-bold rounded-xl shadow-lg
                    transition-all duration-300 transform hover:scale-105 active:scale-95
                    ${isFirstFractionCorrect && isSecondFractionCorrect
                      ? 'bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white hover:shadow-xl'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  disabled={!isFirstFractionCorrect || !isSecondFractionCorrect}
                >
                  {fraction2.num}/{fraction2.denom} is bigger
                </Button>
              </div>
            </div>
          )}

          {/* Results */}
          {showAnswer && (
            <>
            {userAnswer === `${correctAnswer.num}/${correctAnswer.denom}` && <SuccessAnimation />}
            <div className="mt-8">
              <div className={`rounded-xl p-8 shadow-lg backdrop-blur-sm
                ${userAnswer === `${correctAnswer.num}/${correctAnswer.denom}` ? 'bg-green-200' : 'bg-red-200'}`}>
                <div className="text-center space-y-6">
                  {userAnswer === `${correctAnswer.num}/${correctAnswer.denom}` ? (
                    <>
                      <div className="space-y-4">
                        <div className="text-4xl font-bold text-green-600">
                          🎉 Great job!
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-2xl font-bold text-[#5d4037] flex items-center justify-center gap-3">
                      <span>Not quite! Retry</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Game;