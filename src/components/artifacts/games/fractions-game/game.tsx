'use client';

import { useState } from 'react';
import { Card } from "@/components/ui/card";
import './animations.css';

interface Fraction {
  numerator: number;
  denominator: number;
}

interface FractionsGameProps {
  fraction1: Fraction;
  fraction2: Fraction;
  onComplete?: (correct: boolean) => void;
}

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
  
  return (
    <div className="relative">
      <div className="flex items-center gap-6">
        {/* Label */}
        <div className="w-24 text-right">
          <span className="text-lg font-semibold text-gray-700">{label}</span>
        </div>

        {/* Bar */}
        <div className="flex-1 relative">
          <div className={`${isLargeDenominator ? 'h-24' : 'h-32'} bg-gradient-to-r from-purple-100 to-blue-100 
            rounded-2xl overflow-hidden flex shadow-lg transform transition-transform duration-300`}>
            {Array.from({ length: parts }).map((_, index) => (
              <div
                key={index}
                className={`h-full relative transition-all duration-300 ease-bounce
                  ${selectedParts.includes(index) ? 'bg-gradient-to-b from-yellow-300 to-yellow-400 scale-y-105' : 
                    onSelect ? 'hover:bg-gradient-to-b hover:from-blue-200 hover:to-blue-300 hover:scale-y-105' : ''}
                  ${onSelect && selectedParts.length < numToSelect ? 'cursor-pointer' : ''}`}
                style={{ 
                  width: `${100 / parts}%`,
                  borderRight: index < parts - 1 ? `${isLargeDenominator ? 2 : 4}px dashed #CBD5E0` : 'none'
                }}
                onClick={() => {
                  if (onSelect && selectedParts.length < numToSelect && !selectedParts.includes(index)) {
                    onSelect(index);
                  }
                }}
              >
                {selectedParts.includes(index) && !isLargeDenominator && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white rounded-full p-2 shadow-lg transform -rotate-12 animate-bounce-slow">
                      <span className="text-xl font-bold text-yellow-500">1/{parts}</span>
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
                <span className="text-xl font-bold text-purple-500">
                  {selectedParts.length}/{parts}
                </span>
              </div>
            </div>
          )}

          {/* Progress indicators */}
          <div className="absolute -bottom-6 left-0 right-0 flex justify-center gap-4">
            {onCut && (
              <div className="bg-gray-100 rounded-full px-3 py-1 text-sm font-medium text-gray-600">
                {parts} / {maxParts} parts
              </div>
            )}
            {onSelect && (
              <div className="bg-gray-100 rounded-full px-3 py-1 text-sm font-medium text-gray-600">
                Selected: {selectedParts.length} / {numToSelect}
              </div>
            )}
          </div>
        </div>

        {/* Cut Button */}
        {onCut && (
          <div className="w-24">
            <button
              onClick={onCut}
              disabled={parts >= maxParts}
              className={`px-6 py-4 rounded-xl shadow-lg transition-all duration-300
                flex items-center gap-3 whitespace-nowrap
                ${parts >= maxParts 
                  ? 'bg-gray-300 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:shadow-xl hover:scale-105'}`}
            >
              <span className="text-2xl transform group-hover:rotate-12 transition-transform duration-300">
                ✂️
              </span>
              <span className="text-lg font-bold">Cut!</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function FractionsGame() {
  const [currentStep, setCurrentStep] = useState(0);
  const [bar1, setBar1] = useState<BarState>({ parts: 1, selectedParts: [] });
  const [bar2, setBar2] = useState<BarState>({ parts: 1, selectedParts: [] });
  const [showAnswer, setShowAnswer] = useState(false);
  const [userAnswer, setUserAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  // Game content structure
  const gameSteps = [
    {
      id: 'intro',
      message: "Hi! Today we're going to learn about fractions with the same numerator but different denominators! ",
      animation: 'slide-in-right',
      showNext: true
    },
    {
      id: 'explain-concept',
      message: "Numbers can be split into different parts. Let's see how this works! ",
      animation: 'bounce',
      showNext: true
    },
    {
      id: 'first-bar',
      message: "Here's our first bar. Let's break it into 4 equal pieces! Click the 'Cut' button to divide it.",
      animation: '',
      showBar1: true,
      requireAction: true
    },
    {
      id: 'select-first',
      message: "Great job! Now, click to select ONE piece. This will be our first fraction!",
      animation: 'pulse',
      requireAction: true
    },
    {
      id: 'explain-first',
      message: "Perfect! You've just created ONE-FOURTH (1/4) of the whole bar! See how one piece relates to the whole?",
      animation: 'highlight',
      showNext: true
    },
    {
      id: 'second-bar',
      message: "Now, let's try another example! Here's a new bar. This time, let's cut it into 6 equal pieces!",
      animation: 'slide-in-left',
      showBar2: true,
      requireAction: true
    },
    {
      id: 'select-second',
      message: "Excellent cutting! Just like before, select ONE piece.",
      animation: 'pulse',
      requireAction: true
    },
    {
      id: 'explain-second',
      message: "Amazing! This is ONE-SIXTH (1/6) of the whole bar. Notice how this piece is different from our first one?",
      animation: 'highlight',
      showNext: true
    },
    {
      id: 'compare-question',
      message: "Now for the big question: Which fraction is BIGGER - 1/4 or 1/6? Think carefully! ",
      animation: 'bounce',
      showComparison: true,
      requireAction: true
    }
  ];

  const explanations = {
    correct: {
      '1/4': "That's right! 1/4 is bigger than 1/6! When we split something into MORE parts (like 6), each piece gets SMALLER. So 1/4 (splitting into 4) gives us bigger pieces than 1/6 (splitting into 6)! ",
      '1/6': "Actually, 1/4 is bigger than 1/6! Look at our bars - when we split into 6 pieces (1/6), each piece is smaller than when we split into 4 pieces (1/4). The more pieces we split into, the smaller each piece becomes! Let's try again! "
    }
  };

  const handleNext = () => {
    if (currentStep < gameSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
      setShowExplanation(false);
    }
  };

  const handleCut = (barNumber: number) => {
    const targetParts = barNumber === 1 ? 4 : 6;
    
    // if (barNumber === 1) {
    //   setBar1({ parts: targetParts, selectedParts: [] });
    //   handleNext();
    // } else {
    //   setBar2({ parts: targetParts, selectedParts: [] });
    //   handleNext();
    // }
    if (barNumber === 1 && bar1.parts < 4) {
      setBar1(prev => ({ ...prev, parts: prev.parts + 1 }));
      if (bar1.parts === targetParts) {
        handleNext();
      }
    } else if (barNumber === 2 && bar2.parts < 6) {
      setBar2(prev => ({ ...prev, parts: prev.parts + 1 }));
      if (bar2.parts === targetParts) {
        handleNext();
      }
    }
  };

  const handleSelect = (barNumber: number, part: number) => {
    if (barNumber === 1) {
      setBar1(prev => ({
        ...prev,
        selectedParts: [part]
      }));
    } else {
      setBar2(prev => ({
        ...prev,
        selectedParts: [part]
      }));
    }
    handleNext();
  };

  const handleAnswer = (answer: string) => {
    setUserAnswer(answer);
    setShowAnswer(true);
    setShowExplanation(true);
  };

  const currentStepData = gameSteps[currentStep];

  return (
    <Card className="p-6 w-full max-w-4xl mx-auto mt-4 bg-white rounded-2xl shadow-lg">
      {/* Message Display */}
      <div className={`text-2xl font-bold text-center mb-8 text-gray-700 
        animate-${currentStepData.animation}`}>
        {currentStepData.message}
      </div>

      {/* Interactive Area */}
      <div className="space-y-12">
        {/* First Bar */}
        {currentStep >= 2 && (
          <div className={`transition-all duration-500 animate-fade-in`}>
            <Bar
              parts={bar1.parts}
              selectedParts={bar1.selectedParts}
              onCut={currentStep === 2 ? () => handleCut(1) : undefined}
              onSelect={currentStep === 3 ? (part) => handleSelect(1, part) : undefined}
              maxParts={4}
              numToSelect={1}
              label="First Bar (1/4)"
            />
          </div>
        )}

        {/* Second Bar */}
        {currentStep >= 5 && (
          <div className={`transition-all duration-500 animate-fade-in`}>
            <Bar
              parts={bar2.parts}
              selectedParts={bar2.selectedParts}
              onCut={currentStep === 5 ? () => handleCut(2) : undefined}
              onSelect={currentStep === 6 ? (part) => handleSelect(2, part) : undefined}
              maxParts={6}
              numToSelect={1}
              label="Second Bar (1/6)"
            />
          </div>
        )}

        {/* Comparison Section */}
        {currentStep === 8 && !showAnswer && (
          <div className="flex justify-center gap-6 animate-bounce-slow">
            <button
              onClick={() => handleAnswer('1/4')}
              className="px-8 py-4 bg-gradient-to-r from-purple-400 to-pink-500 
                text-white rounded-xl text-xl font-bold shadow-lg hover:shadow-xl 
                hover:scale-105 transition-all duration-300"
            >
              1/4 is Bigger! 
            </button>
            <button
              onClick={() => handleAnswer('1/6')}
              className="px-8 py-4 bg-gradient-to-r from-blue-400 to-green-500 
                text-white rounded-xl text-xl font-bold shadow-lg hover:shadow-xl 
                hover:scale-105 transition-all duration-300"
            >
              1/6 is Bigger! 
            </button>
          </div>
        )}

        {/* Explanation */}
        {showExplanation && (
          <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl 
            animate-fade-in text-lg text-gray-700">
            {explanations.correct[userAnswer as keyof typeof explanations.correct]}
          </div>
        )}

        {/* Next Button */}
        {currentStepData.showNext && !currentStepData.requireAction && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleNext}
              className="px-8 py-4 bg-gradient-to-r from-indigo-400 to-purple-500 
                text-white rounded-xl text-xl font-bold shadow-lg hover:shadow-xl 
                hover:scale-105 transition-all duration-300 animate-pulse"
            >
              Next ➡️
            </button>
          </div>
        )}
      </div>
    </Card>
  );
}
