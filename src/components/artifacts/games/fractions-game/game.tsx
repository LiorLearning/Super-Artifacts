'use client';

import { useState } from 'react';

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
  // For large denominators, we'll show a more compact view
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

const fraction1 = { numerator: 2, denominator: 8 };
const fraction2 = { numerator: 10, denominator: 19 };

interface FractionGameProps {
  sendAdminMessage: (role: string, content: string) => void;
}


export default function FractionsGame({ sendAdminMessage }: FractionGameProps) {
  const [step, setStep] = useState(1);
  const [bar1, setBar1] = useState<BarState>({ parts: 1, selectedParts: [] });
  const [bar2, setBar2] = useState<BarState>({ parts: 1, selectedParts: [] });
  const [answer, setAnswer] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);

  // Quick cut feature for large denominators
  // const handleQuickCut = (barNumber: number) => {
  //   if (barNumber === 1) {
  //     setBar1({ parts: fraction1.denominator, selectedParts: [] });
  //     setStep(2);
  //   } else {
  //     setBar2({ parts: fraction2.denominator, selectedParts: [] });
  //     setStep(4);
  //   }
  // };

  const handleCut = (barNumber: number) => {
    // For large denominators, use quick cut
    // if ((barNumber === 1 && fraction1.denominator > 12) || 
    //     (barNumber === 2 && fraction2.denominator > 12)) {
    //   handleQuickCut(barNumber);
    //   return;
    // }

    if (barNumber === 1 && bar1.parts < fraction1.denominator) {
      setBar1(prev => ({ ...prev, parts: prev.parts + 1 }));
      if (bar1.parts + 1 === fraction1.denominator) {
        setStep(2);
      }
    } else if (barNumber === 2 && bar2.parts < fraction2.denominator) {
      setBar2(prev => ({ ...prev, parts: prev.parts + 1 }));
      if (bar2.parts + 1 === fraction2.denominator) {
        setStep(4);
      }
    }
  };

  const handleSelect = (barNumber: number, part: number) => {
    if (barNumber === 1 && step === 2) {
      setBar1(prev => {
        const newParts = [...prev.selectedParts, part];
        if (newParts.length === fraction1.numerator) {
          setStep(3);
        }
        return { ...prev, selectedParts: newParts };
      });
    } else if (barNumber === 2 && step === 4) {
      setBar2(prev => {
        const newParts = [...prev.selectedParts, part];
        if (newParts.length === fraction2.numerator) {
          setStep(5);
        }
        return { ...prev, selectedParts: newParts };
      });
    }
  };

  const handleCompare = (comparison: string) => {
    if (step !== 5) return;

    const value1 = fraction1.numerator / fraction1.denominator;
    const value2 = fraction2.numerator / fraction2.denominator;
    
    const isCorrect = (
      (comparison === 'greater' && value1 > value2) ||
      (comparison === 'less' && value1 < value2) ||
      (comparison === 'equal' && value1 === value2)
    );

    setAnswer(isCorrect ? 'correct' : 'incorrect');
    if (!isCorrect) {
      setShowHint(true);
    }
    // onComplete?.(isCorrect);
  };

  const getHint = () => {
    const value1 = fraction1.numerator / fraction1.denominator;
    const value2 = fraction2.numerator / fraction2.denominator;
    
    return (
      <div className="text-gray-600 text-lg">
        Think about it: {fraction1.numerator}/{fraction1.denominator} {value1 > value2 ? 'is bigger than' : 'is smaller than'} {fraction2.numerator}/{fraction2.denominator}
        {' because '} 
        {value1 > value2 
          ? `${fraction1.numerator}/${fraction1.denominator} represents a larger portion of the whole`
          : `${fraction2.numerator}/${fraction2.denominator} represents a larger portion of the whole`}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 overflow-y-auto">
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 
              text-transparent bg-clip-text mb-6 animate-pulse-slow">
              Fraction Master
            </h1>
            <div className="flex justify-center gap-3 md:gap-6 flex-wrap">
              {[1, 2, 3, 4, 5].map(stepNum => (
                <div
                  key={stepNum}
                  className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center
                    transform transition-all duration-300 ${
                      step === stepNum 
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white scale-110 rotate-3' 
                        : step > stepNum 
                          ? 'bg-gradient-to-r from-green-400 to-green-500 text-white rotate-0' 
                          : 'bg-gray-100 rotate-0'
                    }`}
                >
                  <span className="text-xl md:text-2xl font-bold">{stepNum}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="text-xl md:text-3xl font-bold text-center mb-12 text-gray-700
            transform transition-all duration-500 animate-fade-in px-4">
            {step === 1 && (
              <div className="flex items-center justify-center gap-2 md:gap-4 flex-wrap">
                <span>Cut the first bar into</span>
                <span className="text-2xl md:text-4xl text-purple-500">{fraction1.denominator}</span>
                <span>equal parts!</span>
              </div>
            )}
            {step === 2 && (
              <div className="flex items-center justify-center gap-2 md:gap-4 flex-wrap">
                <span>Select</span>
                <span className="text-2xl md:text-4xl text-purple-500">{fraction1.numerator}</span>
                <span>{fraction1.numerator === 1 ? 'piece' : 'pieces'}!</span>
              </div>
            )}
            {step === 3 && (
              <div className="flex items-center justify-center gap-2 md:gap-4 flex-wrap">
                <span>Now cut the second bar into</span>
                <span className="text-2xl md:text-4xl text-purple-500">{fraction2.denominator}</span>
                <span>parts!</span>
              </div>
            )}
            {step === 4 && (
              <div className="flex items-center justify-center gap-2 md:gap-4 flex-wrap">
                <span>Select</span>
                <span className="text-2xl md:text-4xl text-purple-500">{fraction2.numerator}</span>
                <span>{fraction2.numerator === 1 ? 'piece' : 'pieces'}!</span>
              </div>
            )}
            {step === 5 && (
              <div>
                <div>Compare the fractions:</div>
                <div className="flex justify-center items-center gap-4 mt-2">
                  <span className="text-2xl text-purple-500">{fraction1.numerator}/{fraction1.denominator}</span>
                  <span>vs</span>
                  <span className="text-2xl text-purple-500">{fraction2.numerator}/{fraction2.denominator}</span>
                </div>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="flex flex-col gap-12 max-w-4xl mx-auto">
            <div className={`transition-all duration-500 ${step === 3 ? 'opacity-50 scale-95' : 'scale-100'}`}>
              <Bar
                parts={bar1.parts}
                selectedParts={bar1.selectedParts}
                onCut={step === 1 ? () => handleCut(1) : undefined}
                onSelect={step === 2 ? (part) => handleSelect(1, part) : undefined}
                maxParts={fraction1.denominator}
                numToSelect={fraction1.numerator}
                label="First Bar"
              />
            </div>

            <div>
              <Bar
                parts={bar2.parts}
                selectedParts={bar2.selectedParts}
                onCut={step === 3 ? () => handleCut(2) : undefined}
                onSelect={step === 4 ? (part) => handleSelect(2, part) : undefined}
                maxParts={fraction2.denominator}
                numToSelect={fraction2.numerator}
                label="Second Bar"
              />
            </div>

            {/* Comparison Buttons */}
            {step === 5 && (
              <div className="flex justify-center gap-4 md:gap-8 flex-wrap">
                <button
                  className="px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-blue-400 to-blue-500 
                    text-white rounded-xl text-lg md:text-xl font-bold shadow-lg hover:shadow-xl 
                    hover:scale-105 transition-all duration-300 transform hover:-rotate-2"
                  onClick={() => handleCompare('less')}
                >
                  First is Smaller! 📉
                </button>
                <button
                  className="px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-purple-400 to-purple-500 
                    text-white rounded-xl text-lg md:text-xl font-bold shadow-lg hover:shadow-xl 
                    hover:scale-105 transition-all duration-300"
                  onClick={() => handleCompare('equal')}
                >
                  They&apos;re Equal! 🤝
                </button>
                <button
                  className="px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-pink-400 to-pink-500 
                    text-white rounded-xl text-lg md:text-xl font-bold shadow-lg hover:shadow-xl 
                    hover:scale-105 transition-all duration-300 transform hover:rotate-2"
                  onClick={() => handleCompare('greater')}
                >
                  First is Bigger! 📈
                </button>
              </div>
            )}

            {/* Answer Feedback */}
            {answer && (
              <div className="space-y-4 text-center">
                <div 
                  className={`text-2xl md:text-4xl font-bold transform scale-110 
                    transition-all duration-500 ${
                      answer === 'correct' 
                        ? 'text-green-500 animate-bounce-slow' 
                        : 'text-red-500 animate-shake'
                    }`}
                >
                  {answer === 'correct' 
                    ? '🎉 Awesome job! You got it right! 🌟' 
                    : '❌ Oops! Try again! You can do it! 💪'}
                </div>
                {showHint && answer === 'incorrect' && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-xl">
                    {getHint()}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}




