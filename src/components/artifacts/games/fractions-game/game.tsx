'use client';

import { useEffect, useState } from 'react';
import { Card } from "@/components/custom_ui/card";
import { Button } from '@/components/custom_ui/button';
import './chocolate.css';
import { Bar, BarState } from './bar';

interface FractionsGameProps {
  sendAdminMessage: (role: string, content: string) => void;
}

interface Fraction {
  num: number;
  denom: number;
}

const fraction1: Fraction = { num: 2, denom: 7 };
const fraction2: Fraction = { num: 2, denom: 8 };

export default function FractionsGame({sendAdminMessage}: FractionsGameProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [bar1, setBar1] = useState<BarState>({ parts: 1, selectedParts: [] });
  const [bar2, setBar2] = useState<BarState>({ parts: 1, selectedParts: [] });
  const [showAnswer, setShowAnswer] = useState(false);
  const [userAnswer, setUserAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const gameSteps = [
    {
      id: 'start',
      message: `Which Fraction is bigger? ${fraction1.num}/${fraction1.denom} or ${fraction2.num}/${fraction2.denom}?`,
      visualise: true,
      requireAction: true
    },
    {
      id: 'intro',
      message: `Which Fraction is bigger? ${fraction1.num}/${fraction1.denom} or ${fraction2.num}/${fraction2.denom}?`,
      showBar1: true,
      requireAction: true
    },
    {
      id: 'select-first',
      message: `Which Fraction is bigger? ${fraction1.num}/${fraction1.denom} or ${fraction2.num}/${fraction2.denom}?`,
      showBar1: true,
      requireAction: true
    },
    {
      id: 'show-second',
      message: `Which Fraction is bigger? ${fraction1.num}/${fraction1.denom} or ${fraction2.num}/${fraction2.denom}?`,
      showBar1: true,
      showBar2: true,
      requireAction: true
    },
    {
      id: 'select-second',
      message: `Which Fraction is bigger? ${fraction1.num}/${fraction1.denom} or ${fraction2.num}/${fraction2.denom}?`,
      showBar1: true,
      showBar2: true,
      requireAction: true
    },
    {
      id: 'compare',
      message: `Which Fraction is bigger? ${fraction1.num}/${fraction1.denom} or ${fraction2.num}/${fraction2.denom}?`,
      showBar1: true,
      showBar2: true,
      showComparison: true,
      requireAction: true
    }
  ];

  const explanations = {
    correct: {
      [`${fraction1.num}/${fraction1.denom}`]: `🎉 Excellent! You're absolutely right!\n\nWhen we break a chocolate bar into ${fraction1.denom} pieces (${fraction1.num}/${fraction1.denom}), each piece is bigger than when we break it into ${fraction2.denom} pieces (${fraction2.num}/${fraction2.denom}).\n\nSince we're taking ${fraction1.num} pieces in both cases, ${fraction1.num}/${fraction1.denom} gives us more chocolate! 🍫`,
      [`${fraction2.num}/${fraction2.denom}`]: `Not quite! Let's think about it...\n\nWhen we break the chocolate bar into more pieces (${fraction2.denom}), each piece gets smaller.\nSo ${fraction1.num} pieces from the first bar (${fraction1.num}/${fraction1.denom}) actually give us more chocolate than ${fraction2.num} pieces from the second bar (${fraction2.num}/${fraction2.denom}).\n\nTry comparing the sizes visually! 🔍`
    }
  };

  const handleNext = () => {
    if (currentStep < gameSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
      setShowExplanation(false);

      switch(currentStep + 1) {
        case 1:
          sendAdminMessage('agent', `We'll compare these fractions visually. First, try breaking the first chocolate to give yourself ${fraction1.num}/${fraction1.denom}ths`);
          break
        case 3:
          sendAdminMessage('agent', `Awesome! Now try breaking the second chocolate to give yourself ${fraction2.num}/${fraction2.denom}ths`);
          break;
        case 5:
          sendAdminMessage('agent', `Can you try comparing them visually - which one do you think is bigger?`);
          break;
      }
    }
  };

  const handleCut = (barNumber: number) => {
    if (barNumber === 1) {
      if (bar1.parts < fraction1.denom) {
        setBar1(prev => ({ ...prev, parts: prev.parts + 1 }));
      }
      if (bar1.parts === fraction1.denom - 1) {
        setTimeout(() => handleNext(), 500);
      }
    } else {
      if (bar2.parts < fraction2.denom) {
        setBar2(prev => ({ ...prev, parts: prev.parts + 1 }));
      }
      if (bar2.parts === fraction2.denom - 1) {
        setTimeout(() => handleNext(), 500);
      }
    }
  };

  const handleSelect = (barNumber: number, part: number) => {
    if (barNumber === 1) {
      const newSelectedParts = [...bar1.selectedParts, part];
      setBar1(prev => ({
        ...prev,
        selectedParts: newSelectedParts
      }));
      if (newSelectedParts.length === fraction1.num) {
        setTimeout(() => handleNext(), 500);
      }
    } else {
      const newSelectedParts = [...bar2.selectedParts, part];
      setBar2(prev => ({
        ...prev,
        selectedParts: newSelectedParts
      }));
      if (newSelectedParts.length === fraction2.num) {
        setTimeout(() => handleNext(), 500);
      }
    }
  };

  const handleAnswer = (answer: string) => {
    setUserAnswer(answer);
    setShowAnswer(true);
    setShowExplanation(true);

    if (answer === `${fraction1.num}/${fraction1.denom}`) {
      sendAdminMessage('agent', `Great, let's move on to the next question`);
    } else {
      sendAdminMessage('agent', `Oops, try comparing them visually. Which one looks bigger?`)
    }
  };

  const currentStepData = gameSteps[currentStep];

  return (
    <Card className="w-full max-w-4xl mx-auto p-8 bg-gradient-to-br from-[#f5e6d3] to-[#e6d5c3] shadow-2xl rounded-2xl">
      <div className="space-y-8">
        {/* Game Message */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#2c1810] mb-4 animate-fade-in">
            Which Fraction is bigger? {fraction1.num}/{fraction1.denom} or {fraction2.num}/{fraction2.denom}?
          </h2>
        </div>

        {/* Chocolate Bars Container */}
        <div className="space-y-12 relative">
          {gameSteps[currentStep].visualise && (
            <div className={`transition-all duration-500 ${showAnswer ? 'opacity-50' : ''}`}>
              <div className="flex justify-center mt-4">
                <Button
                  onClick={() => {
                    setTimeout(() => handleNext(), 500);
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-[#8B4513] to-[#654321] text-white rounded-lg 
                    shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300
                    font-semibold text-md active:scale-95"
                >
                  Visualise
                </Button>
              </div>
            </div>
          )}

          {gameSteps[currentStep].showBar1 && (
            <div className={`transition-all duration-500 ${showAnswer ? 'opacity-50' : ''}`}>
              <Bar
                parts={bar1.parts}
                selectedParts={bar1.selectedParts}
                onCut={currentStep === 1 || currentStep === 0 ? () => handleCut(1) : undefined}
                onSelect={currentStep === 2 ? (part) => handleSelect(1, part) : undefined}
                maxParts={fraction1.denom}
                numToSelect={fraction1.num}
                label="First Bar"
              />
            </div>
          )}

          {gameSteps[currentStep].showBar2 && (
            <div className={`transition-all duration-500 ${showAnswer ? 'opacity-50' : ''}`}>
              <Bar
                parts={bar2.parts}
                selectedParts={bar2.selectedParts}
                onCut={currentStep === 3 || currentStep === 2 ? () => handleCut(2) : undefined}
                onSelect={currentStep === 4 ? (part) => handleSelect(2, part) : undefined}
                maxParts={fraction2.denom}
                numToSelect={fraction2.num}
                label="Second Bar"
              />
            </div>
          )}
        </div>

        {/* Comparison Buttons */}
        {gameSteps[currentStep].showComparison && !showAnswer && (
          <div className="flex justify-center gap-6 mt-8">
            <button
              onClick={() => handleAnswer(`${fraction1.num}/${fraction1.denom}`)}
              className="px-8 py-4 bg-gradient-to-r from-[#8B4513] to-[#654321] text-white rounded-xl 
                shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300
                font-bold text-lg active:scale-95"
            >
              {fraction1.num}/{fraction1.denom} is bigger 🍫
            </button>
            <button
              onClick={() => handleAnswer(`${fraction2.num}/${fraction2.denom}`)}
              className="px-8 py-4 bg-gradient-to-r from-[#8B4513] to-[#654321] text-white rounded-xl 
                shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300
                font-bold text-lg active:scale-95"
            >
              {fraction2.num}/{fraction2.denom} is bigger 🍫
            </button>
          </div>
        )}

        {/* Result Animation */}
        {showExplanation && (
          <div className={`mt-8 flex justify-center items-center transition-all duration-500 ${
            showAnswer ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
          }`}>
            {userAnswer === `${fraction1.num}/${fraction1.denom}` ? (
              <div className="text-4xl animate-bounce">
                ✅ Correct! 🎉
              </div>
            ) : (
              <div className="text-4xl animate-shake">
                ❌ Try Again
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
