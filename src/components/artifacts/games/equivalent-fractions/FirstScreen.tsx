'use client';

import { useState } from 'react';
import { Button } from "@/components/custom_ui/button";
import { Bar } from "./Bar";
import { useSound } from 'use-sound';

interface Equation {
  input: { numerator: number; denominator: number };
  multiplier: { numerator: number; denominator: number };
  output: { numerator: number; denominator: number };
}

interface EquationProps {
  input: { numerator: number; denominator: number };
  output: { denominator: number };
}

export function FirstScreen({ input, output }: EquationProps) {
  const [equation, setEquation] = useState<Equation>({
    input: { numerator: input.numerator, denominator: input.denominator },
    multiplier: { numerator: 0, denominator: 0 },
    output: { numerator: 0, denominator: output.denominator }
  });
  
  // Initialize first bar with the equation's numerator pieces selected
  const [firstBarPieces] = useState<number[]>(
    Array.from({ length: equation.input.numerator }, (_, i) => i)
  );
  const [secondBarPieces, setSecondBarPieces] = useState<number[]>([]);
  const [selectedKnife, setSelectedKnife] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [currentStep, setCurrentStep] = useState<'select_pieces' | 'multiplier_denominator' | 'multiplier_numerator' | 'output_numerator' | 'complete'>('select_pieces');
  const [playBreakSound] = useSound('/sounds/chocolate-break.mp3', { volume: 0.5 });

  const handleSecondBarClick = (index: number) => {
    if (!selectedKnife || currentStep !== 'select_pieces') return;
    
    setSecondBarPieces(prev => {
      const newSelection = prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index].sort((a, b) => a - b);

      // Calculate expected number of pieces
      const expectedPieceCount = Math.floor(equation.output.denominator / equation.input.denominator * equation.input.numerator);
      
      // Check if the number of selected pieces matches expected count
      if (newSelection.length === expectedPieceCount) {
        setCurrentStep('multiplier_denominator');
      }
      
      return newSelection;
    });
  };

  const handleKnifeSelect = (parts: number) => {
    setSelectedKnife(parts);
    playBreakSound();
    setSecondBarPieces([]);
    setIsCorrect(false);
    setCurrentStep('select_pieces');
    
    setEquation(prev => ({
      ...prev,
      multiplier: { numerator: 0, denominator: 0 },
      output: { 
        numerator: 0,
        denominator: prev.input.denominator * parts
      }
    }));
  };

  const handleMultiplierChange = (value: string, type: 'numerator' | 'denominator' | 'output_numerator') => {
    const numValue = parseInt(value) || 0;
    
    if (type === 'denominator') {
      if (numValue === selectedKnife) {
        setCurrentStep('multiplier_numerator');
      }
      setEquation(prev => ({
        ...prev,
        multiplier: { ...prev.multiplier, denominator: numValue }
      }));
    } 
    else if (type === 'numerator') {
      if (numValue === selectedKnife) {
        setCurrentStep('output_numerator');
      }
      setEquation(prev => ({
        ...prev,
        multiplier: { ...prev.multiplier, numerator: numValue }
      }));
    }
    else if (type === 'output_numerator') {
      const expectedNumerator = equation.input.numerator * equation.multiplier.numerator;
      if (numValue === expectedNumerator) {
        setCurrentStep('complete');
        setIsCorrect(true);
      }
      setEquation(prev => ({
        ...prev,
        output: { ...prev.output, numerator: numValue }
      }));
    }
  };

  return (
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
              disabled={currentStep !== 'select_pieces'}
              className={`
                flex-1 h-14 rounded-xl shadow-lg transition-all duration-300
                flex items-center justify-center p-2
                bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white 
                hover:shadow-xl hover:scale-105 active:scale-95
                font-semibold tracking-wide text-lg
                ${selectedKnife === parts ? 'ring-2 ring-yellow-400' : ''}
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
            >
              Split in {parts} 🔪
            </Button>
          ))}
        </div>
        <span className="w-full flex flex-col items-center gap-2">
          <div className="w-full p-4 bg-[#faf0e6] rounded-lg shadow-inner">
            <p className="text-lg text-[#5d4037] mb-2">
              Original Bar ({equation.input.numerator}/{equation.input.denominator})
            </p>
            <Bar
              parts={equation.input.denominator}
              selectedParts={firstBarPieces}
              handleClick={() => {}}
            />
          </div>

          <div className="w-full p-4 bg-[#faf0e6] rounded-lg shadow-inner">
            <p className="text-lg text-[#5d4037] mb-2">
              {selectedKnife ? 
                `Split Bar - Select ${Math.floor(equation.output.denominator / equation.input.denominator * equation.input.numerator)} pieces` :
                'Split Bar - First select a knife above'
              }
            </p>
            <Bar
              parts={selectedKnife ? equation.input.denominator * selectedKnife : equation.input.denominator}
              selectedParts={secondBarPieces}
              handleClick={handleSecondBarClick}
            />
          </div>
        </span>
      </div>

      {currentStep !== 'select_pieces' && (
        <div className="mt-8 flex items-center justify-center gap-4 text-4xl">
          <div className="flex flex-col items-center">
            <div>{equation.input.numerator}</div>
            <div className="w-8 h-[2px] bg-[#5d4037] my-2"></div>
            <div>{equation.input.denominator}</div>
          </div>
          <div className="mx-4">×</div>
          <div className="flex flex-col items-center">
            {currentStep === 'multiplier_numerator' || currentStep === 'output_numerator' || currentStep === 'complete' ? (
              <input
                type="text"
                value={equation.multiplier.numerator || ''}
                onChange={(e) => handleMultiplierChange(e.target.value, 'numerator')}
                disabled={currentStep !== 'multiplier_numerator'}
                className="w-16 h-16 text-4xl text-center border-2 border-[#8B4513] rounded-lg disabled:bg-gray-100"
                placeholder="?"
              />
            ) : (
              <div className="w-16 h-16 flex items-center justify-center">?</div>
            )}
            <div className="w-16 h-[2px] bg-[#5d4037] my-2"></div>
            <input
              type="text"
              value={equation.multiplier.denominator || ''}
              onChange={(e) => handleMultiplierChange(e.target.value, 'denominator')}
              disabled={currentStep !== 'multiplier_denominator'}
              className="w-16 h-16 text-4xl text-center border-2 border-[#8B4513] rounded-lg disabled:bg-gray-100"
              placeholder="?"
            />
          </div>
          <div className="mx-4">=</div>
          <div className="flex flex-col items-center">
            {currentStep === 'output_numerator' || currentStep === 'complete' ? (
              <input
                type="text"
                value={equation.output.numerator || ''}
                onChange={(e) => handleMultiplierChange(e.target.value, 'output_numerator')}
                disabled={currentStep !== 'output_numerator'}
                className="w-16 h-16 text-4xl text-center border-2 border-[#8B4513] rounded-lg disabled:bg-gray-100"
                placeholder="?"
              />
            ) : (
              <div className="w-16 h-16 flex items-center justify-center">?</div>
            )}
            <div className="w-16 h-[2px] bg-[#5d4037] my-2"></div>
            <div className="w-16 h-16 flex items-center justify-center">
              {equation.output.denominator}
            </div>
          </div>
        </div>
      )}

      {currentStep === 'complete' && (
        <div className="text-center mt-6">
          <p className="text-2xl font-bold text-green-600 animate-bounce">
            ✨ Perfect! You've found the equivalent fraction! ✨
          </p>
          <Button
            onClick={() => {
              window.dispatchEvent(new CustomEvent('moveToSecondScreen1'));
            }}
            className="mt-4 px-6 py-3 bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white
              rounded-lg shadow-md hover:shadow-lg transition-all duration-300
              transform hover:scale-105 active:scale-95"
          >
            Next Equation →
          </Button>
        </div>
      )}
    </>
  );
}
