'use client';

import { useEffect, useState } from 'react';
import { Card } from "@/components/ui/card";
import './chocolate.css';
import { Bar, BarState } from './bar';

interface FractionsGameProps {
  sendAdminMessage: (role: string, content: string) => void;
}

export default function FractionsGame({sendAdminMessage}: FractionsGameProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [bar1, setBar1] = useState<BarState>({ parts: 1, selectedParts: [] });
  const [bar2, setBar2] = useState<BarState>({ parts: 1, selectedParts: [] });
  const [showAnswer, setShowAnswer] = useState(false);
  const [userAnswer, setUserAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (!gameStarted) {
      sendAdminMessage('agent', 'Welcome to the Fractions Game! Let\'s compare some fractions and see which one is bigger.');
      setGameStarted(true);
    }
  }, [gameStarted]);

  const gameSteps = [
    {
      id: 'intro',
      message: "Which Fraction is bigger? 2/7 or 2/8?",
      showBar1: true,
      requireAction: true
    },
    {
      id: 'select-first',
      message: "Which Fraction is bigger? 2/7 or 2/8?",
      showBar1: true,
      requireAction: true
    },
    {
      id: 'show-second',
      message: "Which Fraction is bigger? 2/7 or 2/8?",
      showBar1: true,
      showBar2: true,
      requireAction: true
    },
    {
      id: 'select-second',
      message: "Which Fraction is bigger? 2/7 or 2/8?",
      showBar1: true,
      showBar2: true,
      requireAction: true
    },
    {
      id: 'compare',
      message: "Which Fraction is bigger? 2/7 or 2/8?",
      showBar1: true,
      showBar2: true,
      showComparison: true,
      requireAction: true
    }
  ];

  const explanations = {
    correct: {
      '2/7': "🎉 Excellent! You're absolutely right!\n\nWhen we break a chocolate bar into 7 pieces (2/7), each piece is bigger than when we break it into 8 pieces (2/8).\n\nSince we're taking 2 pieces in both cases, 2/7 gives us more chocolate! 🍫",
      '2/8': "Not quite! Let's think about it...\n\nWhen we break the chocolate bar into more pieces (8), each piece gets smaller.\nSo 2 pieces from the first bar (2/7) actually give us more chocolate than 2 pieces from the second bar (2/8).\n\nTry comparing the sizes visually! 🔍"
    }
  };

  const handleNext = () => {
    if (currentStep < gameSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
      setShowExplanation(false);

      switch(currentStep + 1) {
        case 1:
          sendAdminMessage('admin', "Can you make 2/7 using this chocolate bar?");
          break;
        case 2:
          sendAdminMessage('admin', "Now try making 2/8 with the second bar.");
          break;
        case 3:
          if (bar2.parts < 8) {
            sendAdminMessage('admin', "How would you split this bar into eighths?");
          }
          break;
        case 4:
          sendAdminMessage('admin', "Which fraction gives you more chocolate?");
          break;
      }
    }
  };

  const handleCut = (barNumber: number) => {
    if (barNumber === 1) {
      if (bar1.parts < 7) {
        setBar1(prev => ({ ...prev, parts: prev.parts + 1 }));
      }
      if (bar1.parts === 6) {
        setTimeout(() => handleNext(), 500);
      }
    } else {
      if (bar2.parts < 8) {
        setBar2(prev => ({ ...prev, parts: prev.parts + 1 }));
      }
      if (bar2.parts === 7) {
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
      if (newSelectedParts.length === 2) {
        setTimeout(() => handleNext(), 500);
      }
    } else {
      const newSelectedParts = [...bar2.selectedParts, part];
      setBar2(prev => ({
        ...prev,
        selectedParts: newSelectedParts
      }));
      if (newSelectedParts.length === 2) {
        setTimeout(() => handleNext(), 500);
      }
    }
  };

  const handleAnswer = (answer: string) => {
    setUserAnswer(answer);
    setShowAnswer(true);
    setShowExplanation(true);

    if (answer === '2/7') {
      sendAdminMessage('admin', "Correct! When we have fewer pieces, each piece is bigger. So 2/7 gives us more chocolate than 2/8.");
    } else {
      sendAdminMessage('admin', "Look carefully at the size of each piece. When we split into more pieces, does each piece get bigger or smaller?");
    }
  };

  const currentStepData = gameSteps[currentStep];

  return (
    <Card className="w-full max-w-4xl mx-auto p-8 bg-gradient-to-br from-[#f5e6d3] to-[#e6d5c3] shadow-2xl rounded-2xl">
      <div className="space-y-8">
        {/* Game Message */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#2c1810] mb-4 animate-fade-in">
            Which Fraction is bigger? 2/7 or 2/8?
          </h2>
        </div>

        {/* Chocolate Bars Container */}
        <div className="space-y-12 relative">
          {gameSteps[currentStep].showBar1 && (
            <div className={`transition-all duration-500 ${showAnswer ? 'opacity-50' : ''}`}>
              <Bar
                parts={bar1.parts}
                selectedParts={bar1.selectedParts}
                onCut={currentStep === 1 || currentStep === 0 ? () => handleCut(1) : undefined}
                onSelect={currentStep === 1 ? (part) => handleSelect(1, part) : undefined}
                maxParts={7}
                numToSelect={2}
                label="First Bar"
              />
            </div>
          )}

          {gameSteps[currentStep].showBar2 && (
            <div className={`transition-all duration-500 ${showAnswer ? 'opacity-50' : ''}`}>
              <Bar
                parts={bar2.parts}
                selectedParts={bar2.selectedParts}
                onCut={currentStep === 2 || currentStep === 3 ? () => handleCut(2) : undefined}
                onSelect={currentStep === 3 ? (part) => handleSelect(2, part) : undefined}
                maxParts={8}
                numToSelect={2}
                label="Second Bar"
              />
            </div>
          )}
        </div>

        {/* Comparison Buttons */}
        {gameSteps[currentStep].showComparison && !showAnswer && (
          <div className="flex justify-center gap-6 mt-8">
            <button
              onClick={() => handleAnswer('2/7')}
              className="px-8 py-4 bg-gradient-to-r from-[#8B4513] to-[#654321] text-white rounded-xl 
                shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300
                font-bold text-lg active:scale-95"
            >
              2/7 is bigger 🍫
            </button>
            <button
              onClick={() => handleAnswer('2/8')}
              className="px-8 py-4 bg-gradient-to-r from-[#8B4513] to-[#654321] text-white rounded-xl 
                shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300
                font-bold text-lg active:scale-95"
            >
              2/8 is bigger 🍫
            </button>
          </div>
        )}

        {/* Result Animation */}
        {showExplanation && (
          <div className={`mt-8 flex justify-center items-center transition-all duration-500 ${
            showAnswer ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
          }`}>
            {userAnswer === '2/7' ? (
              <div className="text-4xl animate-bounce">
                ✅ Correct!
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
