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
        </div>

        {/* Cut Button */}
        {onCut && (
          <div className="w-24">
            <button
              onClick={onCut}
              disabled={parts >= maxParts}
              className={`px-6 py-4 rounded-xl shadow-lg transition-all duration-300
                flex items-center gap-3 whitespace-nowrap animate-pulse
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
  );
}

export default function FractionsGame() {
  const [currentStep, setCurrentStep] = useState(0);
  const [bar1, setBar1] = useState<BarState>({ parts: 1, selectedParts: [] });
  const [bar2, setBar2] = useState<BarState>({ parts: 1, selectedParts: [] });
  const [showAnswer, setShowAnswer] = useState(false);
  const [userAnswer, setUserAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const gameSteps = [
    {
      id: 'intro',
      message: "Welcome to Fractions! ",
      subMessage: "Today we'll learn about fractions with the same numerator but different denominators.",
      showNext: true
    },
    {
      id: 'explain-concept',
      message: "Let's understand how numbers split into parts! ",
      // subMessage: "We'll use bars to visualize fractions and compare their sizes.",
      showNext: true
    },
    {
      id: 'first-bar',
      message: "Divide the bar into 4 equal pieces!",
      subMessage: "Click the 'Cut' button",
      showBar1: true,
      requireAction: true
    },
    {
      id: 'select-first',
      message: "Now select ONE piece",
      subMessage: "Click any piece to highlight it. This will represent 1/4 of the whole bar.",
      requireAction: true
    },
    {
      id: 'explain-first',
      message: "Great job with 1/4!",
      subMessage: "You've selected one piece out of four equal parts. This is what we call ONE-FOURTH.",
      showNext: true
    },
    {
      id: 'second-bar',
      message: "Now we have a another bar, let's divide it into 6 equal pieces!",
      subMessage: "Click the 'Cut' button 5 times to divide the bar into 6 equal pieces.",
      showBar2: true,
      requireAction: true
    },
    {
      id: 'select-second',
      message: "Fabulous! Now select ONE piece, again. This will represent 1/6 of the whole bar.",
      subMessage: "Click any piece to highlight it",
      requireAction: true
    },
    {
      id: 'explain-second',
      message: "Perfect! Now we have 1/4 and 1/6",
      subMessage: "Notice how the size of one piece changes when we divide the bar into more parts?",
      showNext: true
    },
    {
      id: 'compare-question',
      message: "Time to compare! ",
      subMessage: "Which fraction is BIGGER - 1/4 or 1/6? Look carefully at the size of each piece!",
      showComparison: true,
      requireAction: true
    },
    {
      id: 'explain-comparison',
      message: "Great job!",
      subMessage: "1/4 is bigger than 1/6! When we split something into MORE parts (like 6), each piece gets SMALLER. So 1/4 (splitting into 4) gives us bigger pieces than 1/6 (splitting into 6)! ",
      showNext: true
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
    if (barNumber === 1) {
      if (bar1.parts < 4) {
        setBar1(prev => ({ ...prev, parts: prev.parts + 1 }));
      }
      if (bar1.parts === 3) {
        handleNext();
      }
    } else {
      if (bar2.parts < 6) {
        setBar2(prev => ({ ...prev, parts: prev.parts + 1 }));
      }
      if (bar2.parts === 5) {
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
    <Card className="p-8 w-full px-12 mx-auto  bg-white rounded-2xl shadow-lg">
      {/* Message Display */}
      <div className="mb-8 text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-800">
          {gameSteps[currentStep].message}
        </h2>
        <p className="text-xl text-gray-600">
          {gameSteps[currentStep].subMessage}
        </p>
      </div>

      {/* Interactive Area */}
      <div className="space-y-12">
        {/* First Bar */}
        {currentStep >= 2 && (
          <div className="transition-all duration-300">
            {/* <div className="text-lg text-gray-600 mb-2 text-center font-medium">
              {currentStep === 2 && `Cuts needed: ${Math.max(0, 3 - (bar1.parts - 1))} more`}
            </div> */}
            <Bar
              parts={bar1.parts}
              selectedParts={bar1.selectedParts}
              onCut={currentStep === 2 ? () => handleCut(1) : undefined}
              onSelect={currentStep === 3 ? (part) => handleSelect(1, part) : undefined}
              maxParts={4}
              numToSelect={1}
              // label="First Bar (1/4)"
            />
          </div>
        )}

        {/* Second Bar */}
        {currentStep >= 5 && (
          <div className="transition-all duration-300">
            {/* <div className="text-lg text-gray-600 mb-2 text-center font-medium">
              {currentStep === 5 && `Cuts needed: ${Math.max(0, 5 - (bar2.parts - 1))} more`}
            </div> */}
            <Bar
              parts={bar2.parts}
              selectedParts={bar2.selectedParts}
              onCut={currentStep === 5 ? () => handleCut(2) : undefined}
              onSelect={currentStep === 6 ? (part) => handleSelect(2, part) : undefined}
              maxParts={6}
              numToSelect={1}
              // label="Second Bar (1/6)"
            />
          </div>
        )}

        {/* Answer */}
        {showAnswer && (
          <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl 
            text-lg text-gray-700 border-2 border-purple-100">
            {explanations.correct[userAnswer as keyof typeof explanations.correct]}
          </div>
        )}

        {/* Comparison Section */}
        {currentStep === 8 && !showAnswer && (
          <div className="flex justify-center gap-6">
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


        {/* Next Button */}
        {gameSteps[currentStep].showNext && !gameSteps[currentStep].requireAction && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleNext}
              className="px-8 py-4 bg-gradient-to-r from-indigo-400 to-purple-500 
                text-white rounded-xl text-xl font-bold shadow-lg hover:shadow-xl 
                hover:scale-105 transition-all duration-300"
            >
              Continue 
            </button>
          </div>
        )}
      </div>
    </Card>
  );
}
