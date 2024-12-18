'use client';

import { useEffect, useState } from 'react';
import { Card } from "@/components/custom_ui/card";
import { Button } from '@/components/custom_ui/button';
import './chocolate.css';
import SuccessAnimation from '@/components/artifacts/utils/success-animate';
import useSound from 'use-sound';
import { useSearchParams } from 'next/navigation';

export const desc = `Steps to Play the Game:
1. Break the first chocolate bar by clicking the "Split" button.
2. Select the pieces of the first bar that you want to keep.
3. Break the second chocolate bar by clicking the "Split" button for the second bar.
4. Select the pieces of the second bar that you want to keep.
5. Compare the selected pieces from both bars to determine which fraction is larger.`;


interface BarState {
    parts: number;
    selectedParts: number[];
}

function Bar({ 
  parts, 
  selectedParts,
  onCut, 
  onJoin,
  onSelect,
  maxParts,
  compare = false,
  disabled = false,
  label,
}: { 
  parts: number;
  selectedParts: number[];
  onCut?: () => void;
  onJoin?: () => void;
  onSelect?: (part: number) => void;
  maxParts: number;
  compare?: boolean;
  disabled?: boolean;
  label: string;
}) {
  const [playBreakSound] = useSound('/sounds/chocolate-break.mp3', {
    volume: 0.5,
    interrupt: true
  });
  const [playJoinSound] = useSound('/sounds/join.mp3', {
    volume: 0.5,
    interrupt: true
  });
  const [isAnimating, setIsAnimating] = useState(false);

  const handleBreak = () => {
    if (parts >= maxParts || disabled) return;
    setIsAnimating(true);
    playBreakSound();
    if (onCut) onCut();
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleJoin = () => {
    if (parts <= 1 || disabled) return;
    playJoinSound();
    if (onJoin) onJoin();
  };

  const handleSelect = (part: number) => {
    if (!disabled) {
      onSelect?.(part);
    }
  };

  if (compare && selectedParts.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      <div className="flex items-center gap-6">
        <div className="w-40 flex flex-col gap-2">
            <Button
              onClick={handleBreak}
              id={`split-button-${label}`}
              className={`flex-1 h-14 rounded-xl shadow-lg transition-all duration-300
                flex items-center justify-center p-2
                bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white 
                hover:shadow-xl hover:scale-105 active:scale-95
                font-semibold tracking-wide text-lg
                border-2 border-[#7a5729] border-opacity-20
                ${compare 
                  ? 'cursor-not-allowed opacity-50' 
                  : parts >= maxParts 
                    ? 'cursor-not-allowed opacity-50' 
                    : 'hover:shadow-xl hover:scale-105 active:scale-95'}`}
              disabled={compare || parts >= maxParts}
            >
              <span className={`transform transition-transform duration-300 ${isAnimating ? 'animate-split' : ''}`}>
                Split 
              </span> 🍫
            </Button>
            <Button
              onClick={!compare && parts > 1 ? handleJoin : undefined}
              id={`join-button-${label}`}
              className={`flex-1 h-14 rounded-xl shadow-lg transition-all duration-300
                flex items-center justify-center p-2
                bg-gradient-to-r from-[#FFB347] to-[#FFD700] text-[#5d4037]
                font-semibold tracking-wide text-lg
                border-2 border-[#fcbe4d] border-opacity-40
                ${compare 
                  ? 'cursor-not-allowed opacity-50' 
                  : parts <= 1 
                    ? 'cursor-not-allowed opacity-50' 
                    : 'hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer'}`}
              disabled={compare || parts <= 1}
            >
              <p>Join</p>🍯
            </Button>
        </div>

        <div className="flex-1 relative">
          <div className="w-full perspective-1000">
            <div className={`relative h-32 rounded-lg shadow-xl transform-style-3d rotate-x-10 
              ${compare && selectedParts.length === 0 ? 'bg-gray-400 opacity-50' : 'bg-[#5c3624]'}`}>
              <div className="absolute inset-0 flex gap-1 p-1">
                {/* Select chocolate pieces */}
                {Array.from({ length: parts }).map((_, index) => (
                  <Button
                    key={index}
                    onClick={!compare ? () => handleSelect(index) : undefined}
                    id={`select-chocolate-piece-${label}-${index}`}
                    className={`flex-1 relative bg-gradient-to-b from-[#8a5a42] via-[#734939] to-[#5c3624] 
                      transition-all duration-300 ease-out transform-gpu rounded-sm
                      hover:from-[#9a6a52] hover:via-[#835949] hover:to-[#6c4634]
                      h-full
                      ${compare && !selectedParts.includes(index) 
                        ? 'opacity-30 cursor-not-allowed relative' 
                        : selectedParts.includes(index) 
                          ? 'ring-2 ring-yellow-400 from-[#7a4a32] via-[#633929] to-[#4c2614] transform translate-y-[-10px] z-10 mx-1' 
                          : ''}`}
                  >
                    {compare && !selectedParts.includes(index) && (
                      <div className="absolute inset-0 bg-gray-500 opacity-70 z-20 pointer-events-none"></div>
                    )}
                    <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 h-4 
                      border border-[#4a2c1c] rounded-sm opacity-30" />
                    <div className="absolute inset-0 flex flex-col justify-around py-2">
                      {[0, 1].map((groove) => (
                        <div key={groove} className="relative w-full h-2">
                          <div className="absolute inset-0 bg-gradient-to-b from-[#3a2218] via-[#4a2c1c] to-[#3a2218]" />
                          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#8a5a42] to-transparent opacity-50" />
                          <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#2a1a12] to-transparent opacity-50" />
                          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20" />
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                        </div>
                      ))}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                    <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#8a5a42] to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#2a1a12] to-transparent" />
                  </Button>
                ))}
              </div>
              <div className="absolute -bottom-4 inset-x-0 h-4 bg-black/20 blur-md rounded-full" />
            </div>
          </div>
        </div>

        <div className="w-32 ml-10">
          <div className="text-center bg-[#654321] text-white rounded-xl px-4 py-3
            shadow-lg transform transition-all duration-300 hover:scale-105">
            <div className="text-2xl font-bold">
              {selectedParts.length}
              <hr className="border-t-2 border-white my-1" />
              {parts}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface FractionsGameProps {
  sendAdminMessage: (role: string, content: string) => void;
}

interface Fraction {
  num: number;
  denom: number;
}

const maxParts = 12;

const FractionsGame = ({sendAdminMessage}: FractionsGameProps) => {
  const searchParams = useSearchParams();
  const num1 = parseInt(searchParams.get('n1') || '1');
  const denom1 = parseInt(searchParams.get('d1') || '2');
  const num2 = parseInt(searchParams.get('n2') || '1'); 
  const denom2 = parseInt(searchParams.get('d2') || '3');

  const fraction1: Fraction = { num: num1, denom: denom1 };
  const fraction2: Fraction = { num: num2, denom: denom2 };
  const [bar1, setBar1] = useState<BarState>({ parts: 1, selectedParts: [] });
  const [bar2, setBar2] = useState<BarState>({ parts: 1, selectedParts: [] });
  const [showAnswer, setShowAnswer] = useState(false);
  const [userAnswer, setUserAnswer] = useState<string | null>(null);
  const [isFirstFractionCorrect, setIsFirstFractionCorrect] = useState(false);
  const [isSecondFractionCorrect, setIsSecondFractionCorrect] = useState(false);
  const [compareMode, setCompareMode] = useState(false);
  const [gameStarted, setGameStarted] = useState(false); // New state to track game start


  const checkFraction = (bar: BarState, targetFraction: Fraction) => {
    // console.log(bar.parts, targetFraction.denom, bar.selectedParts.length, targetFraction.num);
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
            <Button
              onClick={startGame}
              id="visualise-button"
              className="p-6 font-bold text-lg bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white hover:shadow-xl transition-all duration-300 transform hover:scale-110 active:scale-95"
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
                maxParts={maxParts}
                compare={compareMode}
                disabled={isSecondFractionCorrect}
                label="second"
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
