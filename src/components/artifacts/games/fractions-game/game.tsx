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
    setIsFirstFractionCorrect(checkFraction(bar1, fraction1));
    setIsSecondFractionCorrect(checkFraction(bar2, fraction2));
  }, [bar1, bar2]);

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
      sendAdminMessage('assistant', `Make sure you've correctly created both fractions (${fraction1.num}/${fraction1.denom} and ${fraction2.num}/${fraction2.denom}) before comparing!`);
      return;
    }
    
    setUserAnswer(answer);
    setShowAnswer(true);
    if (answer !== `${fraction1.num}/${fraction1.denom}`) {
      sendAdminMessage('assistant', `Look closely! When we break into ${fraction1.denom} pieces, each piece is bigger than when we break into ${fraction2.denom}. 🤔`);
    }
  };

  const handleCompare = () => {
    if (!isFirstFractionCorrect || !isSecondFractionCorrect) {
      sendAdminMessage('assistant', `Make sure you've correctly created both fractions (${fraction1.num}/${fraction1.denom} and ${fraction2.num}/${fraction2.denom}) before comparing!`);
      return;
    }
    setCompareMode(true);
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
            Which is bigger: <span className="font-bold text-[#8B4513]">{fraction1.num}/{fraction1.denom}</span> or <span className="font-bold text-[#8B4513]">{fraction2.num}/{fraction2.denom}</span>?
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
            />
          </div>
        </div>

        {/* Comparison Buttons */}
        {!showAnswer && !compareMode && (
          <div className="flex flex-col items-center gap-4 mt-12">
            <div className="flex justify-center gap-6">
              <button
                onClick={handleCompare}
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
                className={`px-8 py-4 text-lg font-bold rounded-xl shadow-lg
                  transition-all duration-300 transform hover:scale-105 active:scale-95
                  bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white hover:shadow-xl`}
              >
                {fraction1.num}/{fraction1.denom} is bigger
              </button>
              <button
                onClick={() => handleAnswer(`${fraction2.num}/${fraction2.denom}`)}
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
                    <span>Not quite right! Actually {fraction1.num}/{fraction1.denom} is bigger</span>
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
