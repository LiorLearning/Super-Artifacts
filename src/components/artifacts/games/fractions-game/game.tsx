'use client';

import { useEffect, useState } from 'react';
import { Card } from "@/components/custom_ui/card";
import './chocolate.css';
import { Bar, BarState } from './bar';
import SuccessAnimation from '@/components/artifacts/utils/success-animate';

interface FractionsGameProps {
  sendAdminMessage: (role: string, content: string) => void;
}

interface Fraction {
  num: number;
  denom: number;
}

export const desc = `Steps to Play the Game:
1. Break the first chocolate bar by clicking the "Break" button.
2. Select the pieces of the first bar that you want to keep.
3. Break the second chocolate bar by clicking the "Break" button for the second bar.
4. Select the pieces of the second bar that you want to keep.
5. Compare the selected pieces from both bars to determine which fraction is larger.`;

const fraction1: Fraction = { num: 1, denom: 2 };
const fraction2: Fraction = { num: 1, denom: 3 };
const maxParts = 12;

const FractionsGame = ({sendAdminMessage}: FractionsGameProps) => {
  const [bar1, setBar1] = useState<BarState>({ parts: 1, selectedParts: [] });
  const [bar2, setBar2] = useState<BarState>({ parts: 1, selectedParts: [] });
  const [showAnswer, setShowAnswer] = useState(false);
  const [userAnswer, setUserAnswer] = useState<string | null>(null);
  const [isFirstFractionCorrect, setIsFirstFractionCorrect] = useState(false);
  const [isSecondFractionCorrect, setIsSecondFractionCorrect] = useState(false);
  const [compareMode, setCompareMode] = useState(false);
  const [gameStarted, setGameStarted] = useState(false); // New state to track game start


  const checkFraction = (bar: BarState, targetFraction: Fraction) => {
    return bar.parts === targetFraction.denom && bar.selectedParts.length === targetFraction.num;
  };

  const handleCut = (barNumber: number) => {
    if (barNumber === 1) {
      setBar1(prev => ({ ...prev, parts: prev.parts + 1 }));
    } else {
      setBar2(prev => ({ ...prev, parts: prev.parts + 1 }));
    }
  };

  const handleJoin = (barNumber: number) => {
    if (barNumber === 1) {
      setBar1(prev => ({ ...prev, parts: Math.max(prev.parts - 1, 1) }));
    } else {
      setBar2(prev => ({ ...prev, parts: Math.max(prev.parts - 1, 1) }));
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
      setBar1(prev => {
        const newState = {
          ...prev,
          selectedParts: prev.selectedParts.includes(part)
            ? prev.selectedParts.filter(p => p !== part)
            : [...prev.selectedParts, part]
        };
        return newState;
      });
    } else {
      setBar2(prev => {
        const newState = {
          ...prev,
          selectedParts: prev.selectedParts.includes(part)
            ? prev.selectedParts.filter(p => p !== part)
            : [...prev.selectedParts, part]
        };
        return newState;
      });
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
    <Card className="w-full max-h-4xl max-w-6xl p-4 bg-gradient-to-br from-[#faf4eb] to-[#f5e6d3] shadow-2xl rounded-2xl mx-4 overflow-auto">
      <div className="space-y-8">
        {/* Game Message */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#8B4513] to-[#D2691E] 
            text-transparent bg-clip-text animate-fade-in">
            Which is bigger: <span className="font-bold text-[#8B4513]">{fraction1.num}/{fraction1.denom}</span> or <span className="font-bold text-[#8B4513]">{fraction2.num}/{fraction2.denom}</span>?
          </h2>
          <p className="text-xl text-[#5d4037] font-medium">
            
          </p>
          <p className="text-sm text-[#8d6e63] italic">
            Split the bars and select pieces to explore! 🍫
          </p>
        </div>

        {/* Visualise Button */}
        {!gameStarted && (
          <div className="flex justify-center">
            <button
              onClick={startGame}
              id="visualise-button"
              className="px-8 py-4 text-lg font-bold rounded-xl shadow-lg bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              Visualise
            </button>
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
                numToSelect={fraction1.num}
                maxParts={maxParts}
                compare={compareMode}
                disabled={isFirstFractionCorrect}
              />
            </div>

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
                numToSelect={fraction2.num}
                maxParts={maxParts}
                compare={compareMode}
                disabled={isSecondFractionCorrect}
              />
            </div>
          </div>
        )}

        {/* Comparison Buttons */}
        {!showAnswer && !compareMode && gameStarted && (
          <div className="flex flex-col items-center gap-4 mt-12">
            <div className="flex justify-center gap-6">
              <button
                onClick={handleCompare}
                id="compare-button"
                className={`px-8 py-4 text-lg font-bold rounded-xl shadow-lg
                  transition-all duration-300 transform hover:scale-105 active:scale-95
                  ${isFirstFractionCorrect && isSecondFractionCorrect
                    ? 'bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white hover:shadow-xl'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                disabled={!isFirstFractionCorrect || !isSecondFractionCorrect}
              >
                Compare Bars
              </button>
            </div>
          </div>
        )}

        {compareMode && !showAnswer && (
          <div className="flex flex-col items-center gap-4 mt-12">
            <div className="flex justify-center gap-6">
              <button
                onClick={() => handleAnswer(`${fraction1.num}/${fraction1.denom}`)}
                id="fraction1-button"
                className={`px-8 py-4 text-lg font-bold rounded-xl shadow-lg
                  transition-all duration-300 transform hover:scale-105 active:scale-95
                  bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white hover:shadow-xl`}
              >
                {fraction1.num}/{fraction1.denom} is bigger
              </button>
              <button
                onClick={() => handleAnswer(`${fraction2.num}/${fraction2.denom}`)}
                id="fraction2-button"
                className={`px-8 py-4 text-lg font-bold rounded-xl shadow-lg
                  transition-all duration-300 transform hover:scale-105 active:scale-95
                  ${isFirstFractionCorrect && isSecondFractionCorrect
                    ? 'bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white hover:shadow-xl'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                disabled={!isFirstFractionCorrect || !isSecondFractionCorrect}
              >
                {fraction2.num}/{fraction2.denom} is bigger
              </button>
            </div>
          </div>
        )}

        {/* Results */}
        {showAnswer && (
          <>
          {userAnswer === `${fraction1.num}/${fraction1.denom}` && <SuccessAnimation />}
          <div className="mt-8">
            <div className={`rounded-xl p-8 shadow-lg backdrop-blur-sm
              ${userAnswer === `${fraction1.num}/${fraction1.denom}` ? 'bg-green-200' : 'bg-red-200'}`}>
              <div className="text-center space-y-6">
                {userAnswer === `${fraction1.num}/${fraction1.denom}` ? (
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
    </Card>
  );
};

export default FractionsGame;
