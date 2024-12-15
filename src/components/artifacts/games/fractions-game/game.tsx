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
  onSelect,
  maxParts,
  numToSelect,
  label 
}: { 
  parts: number;
  selectedParts: number[];
  onCut?: () => void;
  onSelect?: (part: number) => void;
  maxParts: number;
  numToSelect: number;
  label: string;
}) {
  const isLargeDenominator = maxParts > 12;
  const [playBreakSound] = useSound('sounds/chocolate-break.mp3', {
    volume: 0.5,
    interrupt: true
  });

  // Handle break with sound
  const handleBreak = () => {
    playBreakSound();
    if (onCut) onCut();
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-6">
        {/* Label */}
        {/* <div className="w-24 text-right">
          <span className="text-lg font-semibold text-gray-700">{label}</span>
        </div>   */}

        {/* Chocolate Bar */}
        <div className="flex-1 relative">
          <div className={`${isLargeDenominator ? 'h-24' : 'h-32'} 
            bg-gradient-to-br from-[#654321] to-[#3c280d] 
            rounded-2xl overflow-hidden flex shadow-lg transform transition-transform duration-300
            border-4 border-[#2c1810]`}
            style={{
              boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.1), 0 4px 6px rgba(0,0,0,0.2)'
            }}>
            {Array.from({ length: parts }).map((_, index) => (
              <div
                key={index}
                className={`h-full relative transition-all duration-300 ease-bounce
                  ${selectedParts.includes(index) 
                    ? 'bg-gradient-to-b from-[#8B4513] to-[#654321] scale-y-105' 
                    : onSelect 
                      ? 'hover:bg-gradient-to-b hover:from-[#5c4033] hover:to-[#3c280d] hover:scale-y-105' 
                      : ''
                  }
                  ${onSelect && selectedParts.length < numToSelect ? 'cursor-pointer' : ''}`}
                style={{ 
                  width: `${100 / parts}%`,
                  borderRight: index < parts - 1 
                    ? `${isLargeDenominator ? 2 : 4}px dashed rgba(44, 24, 16, 0.8)` 
                    : 'none',
                  boxShadow: selectedParts.includes(index) 
                    ? 'inset 0 0 10px rgba(0,0,0,0.3)' 
                    : 'inset 0 1px 3px rgba(255,255,255,0.1)'
                }}
                onClick={() => {
                  if (onSelect && selectedParts.length < numToSelect && !selectedParts.includes(index)) {
                    onSelect(index);
                  }
                }}
              >
                {/* Chocolate texture */}
                <div className="absolute inset-0 grid grid-rows-3 gap-1 p-1">
                  {[0, 1, 2].map((row) => (
                    <div 
                      key={row}
                      className="w-full h-full rounded-sm bg-[#2c1810] opacity-20"
                    />
                  ))}
                </div>

                {selectedParts.includes(index) && !isLargeDenominator && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/90 rounded-full p-2 shadow-lg transform -rotate-12 animate-bounce-slow">
                      <span className="text-xl font-bold text-[#654321]">1/{parts}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Fraction display for large denominators */}
          {isLargeDenominator && selectedParts.length > 0 && (
            <div className="absolute -right-20 top-1/2 transform -translate-y-1/2">
              <div className="bg-white rounded-xl p-3 shadow-lg">
                <span className="text-xl font-bold text-[#654321]">
                  {selectedParts.length}/{parts}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Break Button */}
        <div className="w-24 mr-10">
        {onCut && (

          <button
            onClick={handleBreak}
            disabled={parts >= maxParts}
            className={`px-6 py-4 rounded-xl shadow-lg transition-all duration-300
              flex items-center gap-3 whitespace-nowrap animate-pulse
              ${parts >= maxParts 
                ? 'bg-gray-300 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-[#8B4513] to-[#654321] text-white hover:shadow-xl hover:scale-105'}`}
            >
              <span className="text-2xl transform group-hover:rotate-12 transition-transform duration-300">
                🍫
              </span>
              <span className="text-lg font-bold">Break!</span>
            </button>
          )}
        </div>
      </div>  

      {/* Progress indicators */}
      <div className="absolute -bottom-6 left-0 right-0 flex justify-center gap-4">

        {onSelect && (
          <div className="bg-[#654321] text-white rounded-full px-3 py-1 text-sm font-medium">
            Selected: {selectedParts.length} / {numToSelect}
          </div>
        )}
      </div>
    </div>
  );
}

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
    }
  };

  const handleCut = (barNumber: number) => {
    if (barNumber === 1) {
      if (bar1.parts < 7) {
        setBar1(prev => ({ ...prev, parts: prev.parts + 1 }));
      }
      if (bar1.parts === 6) {
        setTimeout(() => handleNext(), 500); // Add delay for animation
      }
    } else {
      if (bar2.parts < 8) {
        setBar2(prev => ({ ...prev, parts: prev.parts + 1 }));
      }
      if (bar2.parts === 7) {
        setTimeout(() => handleNext(), 500); // Add delay for animation
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
        handleNext();
      }
    } else {
      const newSelectedParts = [...bar2.selectedParts, part];
      setBar2(prev => ({
        ...prev,
        selectedParts: newSelectedParts
      }));
      if (newSelectedParts.length === 2) {
        handleNext();
      }
    }
  };

  const handleAnswer = (answer: string) => {
    setUserAnswer(answer);
    setShowAnswer(true);
    setShowExplanation(true);
  };

  const currentStepData = gameSteps[currentStep];

  return (
    <Card className="w-full max-w-4xl mx-auto p-8 bg-gradient-to-br from-[#f5e6d3] to-[#e6d5c3] shadow-2xl rounded-2xl">
      <div className="space-y-8">
        {/* Game Message */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#2c1810] mb-4 animate-fade-in">
            {gameSteps[currentStep].message}
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
                font-bold text-lg"
            >
              2/7 is bigger 🍫
            </button>
            <button
              onClick={() => handleAnswer('2/8')}
              className="px-8 py-4 bg-gradient-to-r from-[#8B4513] to-[#654321] text-white rounded-xl 
                shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300
                font-bold text-lg"
            >
              2/8 is bigger 🍫
            </button>
          </div>
        )}

        {/* Explanation */}
        {showExplanation && (
          <div className="mt-8 p-6 bg-white/80 rounded-xl shadow-lg">
            <p className="text-lg text-[#2c1810] whitespace-pre-line">
              {explanations.correct[userAnswer as keyof typeof explanations.correct]}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
