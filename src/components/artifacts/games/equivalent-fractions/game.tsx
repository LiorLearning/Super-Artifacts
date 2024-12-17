'use client';

import { useState } from 'react';
import { Card } from "@/components/custom_ui/card";
import { Button } from "@/components/custom_ui/button";
import { Input } from "@/components/custom_ui/input";
import { Label } from "@/components/custom_ui/label";
import { useSound } from 'use-sound';

export const desc = `Steps to Play the Game:`

interface EquivalentFractionsGameProps {
  sendAdminMessage: (role: string, content: string) => void;
}

interface Fraction {
  numerator: number;
  denominator: number;
}

interface BarState {
  parts: number;
  selectedParts: number[];
}

function Bar({ 
  parts, 
  selectedParts
}: { 
  parts: number;
  selectedParts: number[];
}) {
  return (
    <div className="relative w-full">
      <div className="flex items-center gap-6">
        {/* Chocolate Bar */}
        <div className="w-full relative">
          {/* Wrapper with perspective for 3D effect */}
          <div className="w-full perspective-1000">
            {/* Main chocolate bar container */}
            <div className="relative h-32 bg-[#5c3624] rounded-lg shadow-xl transform-style-3d rotate-x-10">
              {/* Chocolate pieces */}
              <div className="absolute inset-0 flex gap-1 p-1">
                {Array.from({ length: parts }).map((_, index) => (
                  <button
                    key={index}
                    className={`flex-1 relative bg-gradient-to-b from-[#8a5a42] via-[#734939] to-[#5c3624] 
                      transition-all duration-300 ease-out transform-gpu rounded-sm
                      hover:from-[#9a6a52] hover:via-[#835949] hover:to-[#6c4634]
                      ${selectedParts.includes(index) 
                        ? 'ring-2 ring-yellow-400 from-[#7a4a32] via-[#633929] to-[#4c2614]' 
                        : ''}`}
                  >
                    {/* Checkmark for selected pieces */}
                    {selectedParts.includes(index) && (
                      <div className="absolute inset-0 flex items-center justify-center text-yellow-400 text-2xl font-bold z-10">
                        ✓
                      </div>
                    )}
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
      </div>
    </div>
  );
}

export default function EquivalentFractionsGame({ sendAdminMessage }: EquivalentFractionsGameProps) {
  const [screen, setScreen] = useState<'first' | 'second'>('first');
  const [selectedKnife, setSelectedKnife] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [playBreakSound] = useSound('/sounds/chocolate-break.mp3', { volume: 0.5 });
  const [equation, setEquation] = useState<{
    input: { numerator: number; denominator: number };
    multiplier: { numerator: number; denominator: number };
    output: { numerator: number; denominator: number };
  }>({
    input: { numerator: 2, denominator: 3 },
    multiplier: { numerator: 0, denominator: 0 },
    output: { numerator: 0, denominator: 0 }
  });

  const checkAnswer = (output: { numerator: number; denominator: number }) => {
    const isNumeratorCorrect = output.numerator === equation.input.numerator * 3;
    const isDenominatorCorrect = output.denominator === equation.input.denominator * 3;

    if (isNumeratorCorrect && isDenominatorCorrect) {
      setIsCorrect(true);
      sendAdminMessage('assistant', `Perfect! When we multiply both top and bottom by 3, ${equation.input.numerator}/${equation.input.denominator} becomes ${output.numerator}/${output.denominator}. You've found the equivalent fraction!`);
    } else if (isNumeratorCorrect) {
      setIsCorrect(false);
      sendAdminMessage('assistant', `Good job on the numerator! Now, think about what the denominator should be.`);
    } else if (isDenominatorCorrect) {
      setIsCorrect(false);
      sendAdminMessage('assistant', `You've got the denominator right! Now, what should the numerator be?`);
    } else {
      setIsCorrect(false);
      sendAdminMessage('assistant', `Not quite! Remember, we're multiplying both the numerator and denominator by 3.`);
    }
  };

  const handleNumeratorChange = (value: number) => {
    setEquation(prev => ({
      ...prev,
      multiplier: { ...prev.multiplier, numerator: value },
      output: { 
        numerator: prev.input.numerator * value,
        denominator: prev.input.denominator * prev.multiplier.denominator
      }
    }));
    checkAnswer({
      numerator: equation.input.numerator * value,
      denominator: equation.input.denominator * equation.multiplier.denominator
    });
  };

  const handleDenominatorChange = (value: number) => {
    setEquation(prev => ({
      ...prev,
      multiplier: { ...prev.multiplier, denominator: value },
      output: { 
        numerator: prev.input.numerator * prev.multiplier.numerator,
        denominator: prev.input.denominator * value
      }
    }));
    checkAnswer({
      numerator: equation.input.numerator * equation.multiplier.numerator,
      denominator: equation.input.denominator * value
    });
  };

  const handleKnifeSelect = (parts: number) => {
    setSelectedKnife(parts);
    setShowResult(true);
    playBreakSound();

    if (parts === 3) {
      setIsCorrect(true);
      sendAdminMessage('assistant', `Great choice! Splitting each of the ${equation.input.denominator} big pieces into 3 smaller ones gives us ${equation.input.denominator * 3} equal pieces. Let's move on!`);
    } else {
      setIsCorrect(false);
      sendAdminMessage('assistant', `Not quite! Remember, we want a knife that splits the chocolate evenly into ${equation.input.denominator * 3} pieces. Try again!`);
    }
  };

  const moveToNextScreen = () => {
    if (isCorrect) {
      setScreen('second');
      setShowResult(false);
      setSelectedKnife(null);
    }
  };

  function range(a: number): number[] {
    const result = [];
    for (let i = 0; i < a; i++) {
      result.push(i);
    }
    return result;
  };

  return (
    <Card className="p-8 bg-gradient-to-br from-[#faf4eb] to-[#f5e6d3] shadow-2xl rounded-2xl">
      <div className="w-full max-w-7xl mx-auto">
        {screen === 'first' ? (
          <>
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8B4513] to-[#D2691E] animate-fade-in">
                Equivalent Fractions with Chocolate
              </h2>
              <p className="text-xl text-[#5d4037] font-medium">
                We have {equation.input.numerator}/{equation.input.denominator} of a chocolate bar. Which knife will split each piece into 3 equal parts?
              </p>
            </div>

            <div className="mt-8 flex items-center gap-6">
              <div className="w-40 flex flex-col gap-2">
                {[2, 3, 5].map((parts) => (
                  <Button
                    key={parts}
                    onClick={() => handleKnifeSelect(parts)}
                    disabled={showResult && isCorrect}
                    className={`
                      flex-1 h-14 rounded-xl shadow-lg transition-all duration-300
                      flex items-center justify-center p-2
                      bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white 
                      hover:shadow-xl hover:scale-105 active:scale-95
                      font-semibold tracking-wide text-lg
                      ${selectedKnife === parts && isCorrect ? 'bg-green-600' : ''}
                      ${selectedKnife === parts && !isCorrect ? 'bg-red-400' : ''}
                      disabled:opacity-50 disabled:cursor-not-allowed
                    `}
                  >
                    Split in {parts} 🔪
                  </Button>
                ))}
              </div>
              <span className="w-full flex flex-col items-center gap-2">
                <Bar
                  parts={equation.input.denominator}
                  selectedParts={range(equation.input.numerator)}
                />

                <Bar
                  parts={selectedKnife ? equation.input.denominator * selectedKnife : equation.input.denominator}
                  selectedParts={range(selectedKnife ? selectedKnife*equation.input.numerator : equation.input.numerator)}
                />
              </span>
            </div>

            {showResult && (
              <div className="text-center mt-6">
                <p className={`text-2xl font-bold ${isCorrect ? 'text-green-600' : 'text-red-500'} animate-bounce`}>
                  {isCorrect ? '✨ Perfect Choice! ✨' : '🤔 Try Again!'}
                </p>
                {isCorrect && (
                  <Button
                    onClick={moveToNextScreen}
                    className="mt-4 px-6 py-3 bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white
                      rounded-lg shadow-md hover:shadow-lg transition-all duration-300
                      transform hover:scale-105 active:scale-95"
                  >
                    Continue to Next Step 🍫
                  </Button>
                )}
              </div>
            )}
          </>
        ) : (
          <>
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8B4513] to-[#D2691E]">
                Understanding Equivalent Fractions
              </h2>
              <p className="text-xl text-[#5d4037] font-medium">
                What number should we multiply both top and bottom by to get denominator {equation.input.denominator * 3}?
              </p>

              <div className="mt-8 flex items-center justify-center w-full">
                <Bar
                  parts={ equation.output.denominator ? equation.output.denominator : 1}
                  selectedParts={ equation.output.numerator ? range(equation.output.numerator) : []}
                />
              </div>

              {/* Equation Display */}
              <div className="flex items-center justify-center gap-4 mt-8 text-4xl">
                {/* Original Fraction */}
                <div className="flex flex-col items-center">
                  <div>{equation.input.numerator}</div>
                  <div className="w-8 h-[2px] bg-[#5d4037] my-2"></div>
                  <div>{equation.input.denominator}</div>
                </div>
                <div className="mx-4">×</div>
                <div className="flex flex-col items-center">
                  <input
                    type="text"
                    value={equation.multiplier.numerator || ''}
                    onChange={(e) => handleNumeratorChange(parseInt(e.target.value))}
                    className="w-16 h-16 text-4xl text-center border-2 border-[#8B4513] rounded-lg"
                    min="0"
                    max="9"
                    
                  />
                  <div className="w-16 h-[2px] bg-[#5d4037] my-2"></div>
                  <input
                    type="text"
                    value={equation.multiplier.denominator || ''}
                    onChange={(e) => handleDenominatorChange(parseInt(e.target.value))}
                    className="w-16 h-16 text-4xl text-center border-2 border-[#8B4513] rounded-lg bg-gray-100"
                    min="0"
                    max="9"
                  />
                </div>

                {/* Equals Sign */}
                <div className="mx-4">=</div>

                {/* Result Fraction */}
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 flex items-center justify-center border-2 border-[#8B4513] rounded-lg bg-gray-100">
                    {equation.output.numerator || '?'}
                  </div>
                  <div className="w-16 h-[2px] bg-[#5d4037] my-2"></div>
                  <div className="w-16 h-16 flex items-center justify-center border-2 border-[#8B4513] rounded-lg bg-gray-100">
                    {equation.output.denominator || '?'}
                  </div>
                </div>
              </div>
            </div>
            {isCorrect && (
              <div className="text-center mt-6">
                <p className="text-2xl font-bold text-green-600 animate-bounce">
                  ✨ Perfect Choice! Good Job! ✨
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </Card>
  );
}
