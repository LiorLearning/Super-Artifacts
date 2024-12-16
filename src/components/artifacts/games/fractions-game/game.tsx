'use client';

import { useState } from 'react';
import { Card } from "@/components/ui/card";
import './chocolate.css';
import useSound from 'use-sound';

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
  numToSelect,
  label 
}: { 
  parts: number;
  selectedParts: number[];
  onCut?: () => void;
  onJoin?: () => void;
  onSelect?: (part: number) => void;
  numToSelect: number;
  label: string;
}) {
  const isLargeDenominator = parts > 12;
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
    setIsAnimating(true);
    playBreakSound();
    if (onCut) onCut();
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleJoin = () => {
    if (parts <= 1) return;
    playJoinSound();
    if (onJoin) onJoin();
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-6">
        <div className="w-40 flex flex-col gap-2">
            <button
              onClick={handleBreak}
              className="flex-1 h-14 rounded-xl shadow-lg transition-all duration-300
                flex items-center justify-center p-2
                bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white 
                hover:shadow-xl hover:scale-105 active:scale-95
                font-semibold tracking-wide text-lg
                border-2 border-[#7a5729] border-opacity-20"
            >
              <span className={`transform transition-transform duration-300 ${isAnimating ? 'animate-split' : ''}`}>
                Split 
              </span> 🍫
            </button>
            <button
              onClick={parts > 1 ? handleJoin : undefined}
              className={`flex-1 h-14 rounded-xl shadow-lg transition-all duration-300
                flex items-center justify-center p-2
                bg-gradient-to-r from-[#FFB347] to-[#FFD700] text-[#5d4037]
                font-semibold tracking-wide text-lg
                border-2 border-[#fcbe4d] border-opacity-40
                ${parts <= 1 
                  ? 'cursor-not-allowed opacity-50' 
                  : 'hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer'}`}
              disabled={parts <= 1}
            >
              <p>Join</p>🍯
            </button>
        </div>

        {/* Chocolate Bar */}
        <div className="flex-1 relative">
          {/* Wrapper with perspective for 3D effect */}
          <div className="w-full perspective-1000">
            {/* Main chocolate bar container */}
            <div className="relative h-32 bg-[#5c3624] rounded-lg shadow-xl transform-style-3d rotate-x-10">
              {/* Chocolate pieces */}
              <div className="absolute inset-0 flex gap-1 p-1">
                {Array.from({ length: parts }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => onSelect?.(index)}
                    className={`flex-1 relative bg-gradient-to-b from-[#8a5a42] via-[#734939] to-[#5c3624] 
                      transition-all duration-300 ease-out transform-gpu rounded-sm
                      hover:from-[#9a6a52] hover:via-[#835949] hover:to-[#6c4634]
                      ${selectedParts.includes(index) 
                        ? 'ring-2 ring-yellow-400 from-[#7a4a32] via-[#633929] to-[#4c2614]' 
                        : ''}`}
                  >
                    {/* Embossed logo effect */}
                    <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 h-4 
                      border border-[#4a2c1c] rounded-sm opacity-30" />
                    
                    {/* Horizontal grooves */}
                    <div className="absolute inset-0 flex flex-col justify-around py-2">
                      {[0, 1].map((groove) => (
                        <div key={groove} className="relative w-full h-2">
                          {/* Groove base */}
                          <div className="absolute inset-0 bg-gradient-to-b from-[#3a2218] via-[#4a2c1c] to-[#3a2218]" />
                          
                          {/* Top edge highlight */}
                          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#8a5a42] to-transparent opacity-50" />
                          
                          {/* Bottom edge shadow */}
                          <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#2a1a12] to-transparent opacity-50" />
                          
                          {/* Inner groove shadow */}
                          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20" />
                          
                          {/* Shine effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                        </div>
                      ))}
                    </div>

                    {/* Overall shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                    
                    {/* Top edge highlight */}
                    <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#8a5a42] to-transparent" />
                    
                    {/* Bottom edge shadow */}
                    <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#2a1a12] to-transparent" />
                  </button>
                ))}
              </div>

              {/* Bottom shadow */}
              <div className="absolute -bottom-4 inset-x-0 h-4 bg-black/20 blur-md rounded-full" />
            </div>
          </div>
        </div>

        {/* Fraction Display */}
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

export default function FractionsGame({sendAdminMessage}: FractionsGameProps) {
  const [bar1, setBar1] = useState<BarState>({ parts: 1, selectedParts: [] });
  const [bar2, setBar2] = useState<BarState>({ parts: 1, selectedParts: [] });
  const [showAnswer, setShowAnswer] = useState(false);
  const [userAnswer, setUserAnswer] = useState<string | null>(null);
  const [hint, setHint] = useState<string | null>(null);
  const [isFirstFractionCorrect, setIsFirstFractionCorrect] = useState(false);
  const [isSecondFractionCorrect, setIsSecondFractionCorrect] = useState(false);

  const checkFraction = (bar: BarState, targetNumerator: number, targetDenominator: number) => {
    return bar.parts === targetDenominator && bar.selectedParts.length === targetNumerator;
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

  const handleSelect = (barNumber: number, part: number) => {
    if (barNumber === 1) {
      setBar1(prev => {
        const newState = {
          ...prev,
          selectedParts: prev.selectedParts.includes(part)
            ? prev.selectedParts.filter(p => p !== part)
            : [...prev.selectedParts, part]
        };
        setIsFirstFractionCorrect(checkFraction(newState, 2, 7));
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
        setIsSecondFractionCorrect(checkFraction(newState, 2, 8));
        return newState;
      });
    }
  };

  const handleAnswer = (answer: string) => {
    if (!isFirstFractionCorrect || !isSecondFractionCorrect) {
      sendAdminMessage('assistant', "Make sure you've correctly created both fractions (2/7 and 2/8) before comparing!");
      return;
    }
    
    setUserAnswer(answer);
    setShowAnswer(true);
    if (answer !== '2/7') {
      sendAdminMessage('assistant', "Look closely! When we break into 7 pieces, each piece is bigger than when we break into 8. 🤔");
    }
  };

  return (
    <Card className="w-full max-w-7xl mx-auto p-8 bg-gradient-to-br from-[#faf4eb] to-[#f5e6d3] shadow-2xl rounded-2xl">
      <div className="space-y-8">
        {/* Game Message */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#8B4513] to-[#D2691E] 
            text-transparent bg-clip-text animate-fade-in">
            Chocolate Bar Fractions
          </h2>
          <p className="text-xl text-[#5d4037] font-medium">
            Which is bigger: <span className="font-bold text-[#8B4513]">2/7</span> or <span className="font-bold text-[#8B4513]">2/8</span>?
          </p>
          <p className="text-sm text-[#8d6e63] italic">
            Split the bars and select pieces to explore! 🍫
          </p>
        </div>

        {/* Chocolate Bars Container */}
        <div className="space-y-12 relative">
          <div className={`transition-all duration-500 ${showAnswer ? 'opacity-90 filter contrast-75' : ''}`}>
            <div className="flex items-center mb-4">
              <div className="flex-1">
                <span className="text-lg font-semibold text-[#5d4037]">First Bar: Make 2/7</span>
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
              numToSelect={2}
              label="First Bar"
            />
          </div>

          <div className={`transition-all duration-500 ${showAnswer ? 'opacity-90 filter contrast-75' : ''}`}>
            <div className="flex items-center mb-4">
              <div className="flex-1">
                <span className="text-lg font-semibold text-[#5d4037]">Second Bar: Make 2/8</span>
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
              numToSelect={2}
              label="Second Bar"
            />
          </div>
        </div>

        {/* Comparison Buttons */}
        {!showAnswer && (
          <div className="flex flex-col items-center gap-4 mt-12">
            <div className="flex justify-center gap-6">
              <button
                onClick={() => handleAnswer('2/7')}
                className={`px-8 py-4 text-lg font-bold rounded-xl shadow-lg
                  transition-all duration-300 transform hover:scale-105 active:scale-95
                  ${isFirstFractionCorrect && isSecondFractionCorrect
                    ? 'bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white hover:shadow-xl'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                disabled={!isFirstFractionCorrect || !isSecondFractionCorrect}
              >
                2/7 is bigger
              </button>
              <button
                onClick={() => handleAnswer('2/8')}
                className={`px-8 py-4 text-lg font-bold rounded-xl shadow-lg
                  transition-all duration-300 transform hover:scale-105 active:scale-95
                  ${isFirstFractionCorrect && isSecondFractionCorrect
                    ? 'bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white hover:shadow-xl'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                disabled={!isFirstFractionCorrect || !isSecondFractionCorrect}
              >
                2/8 is bigger
              </button>
            </div>
          </div>
        )}

        {/* Results */}
        {showAnswer && (
          <div className="mt-8">
            <div className={`bg-white/80 rounded-xl p-8 shadow-lg backdrop-blur-sm
              ${userAnswer === '2/7' ? 'bg-gradient-to-br from-white/90 to-yellow-50/90' : ''}`}>
              <div className="text-center space-y-6">
                {userAnswer === '2/7' ? (
                  <>
                    <div className="space-y-4">
                      <div className="text-4xl font-bold text-green-600 animate-bounce">
                        🎉 Fantastic! You are Right, 2/7 is bigger
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-2xl font-bold text-[#5d4037] flex items-center justify-center gap-3">
                    <span>Not quite right! Actually 2/7 is bigger</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
