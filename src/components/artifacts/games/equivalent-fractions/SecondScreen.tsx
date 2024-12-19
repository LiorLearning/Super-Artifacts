'use client';

import { useState } from 'react';
import { Button } from "@/components/custom_ui/button";
import { Bar } from "./Bar";

interface Equation {
  input: { numerator: number; denominator: number };
  multiplier: { numerator: number; denominator: number };
  output: { numerator: number; denominator: number };
}

interface EquationProps {
  input: { numerator: number; denominator: number };
  output: { denominator: number };
  nextEvent: string;
  buttonText: string;
}

export function SecondScreen({ input, output, nextEvent, buttonText }: EquationProps) {
  const [equation, setEquation] = useState<Equation>({
    input: { numerator: input.numerator, denominator: input.denominator },
    multiplier: { numerator: 0, denominator: 0 },
    output: { numerator: 0, denominator: output.denominator }
  });
  
  const [currentStep, setCurrentStep] = useState<'multiplier_denominator' | 'multiplier_numerator' | 'output_numerator' | 'complete'>('multiplier_denominator');

  const handleInputChange = (value: string, type: 'numerator' | 'denominator' | 'output_numerator') => {
    const numValue = parseInt(value) || 0;
    
    if (type === 'denominator') {
      const expectedDenominator = equation.output.denominator / equation.input.denominator;  // 12/4 = 3
      if (numValue === expectedDenominator) {
        setCurrentStep('multiplier_numerator');
      }
      setEquation(prev => ({
        ...prev,
        multiplier: { ...prev.multiplier, denominator: numValue }
      }));
    } 
    else if (type === 'numerator') {
      const expectedDenominator = equation.output.denominator / equation.input.denominator;  // Same as denominator for equivalent fraction
      if (numValue === expectedDenominator) {
        setCurrentStep('output_numerator');
      }
      setEquation(prev => ({
        ...prev,
        multiplier: { ...prev.multiplier, numerator: numValue }
      }));
    }
    else if (type === 'output_numerator') {
      const expectedNumerator = equation.input.numerator * (equation.output.denominator / equation.input.denominator);  // 3 * (12/4) = 9
      if (numValue === expectedNumerator) {
        setCurrentStep('complete');
      }
      setEquation(prev => ({
        ...prev,
        output: { ...prev.output, numerator: numValue }
      }));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-[#FDF5E6]">
      <div className="text-center space-y-4 mb-8">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8B4513] to-[#D2691E]">
          Let's Write the Equation!
        </h2>
        <p className="text-xl text-[#5d4037] font-medium">
          Fill in the blanks to complete the equivalent fraction equation
        </p>
      </div>

      {/* Bars visualization */}
      <div className="w-full max-w-3xl flex flex-col gap-4 mb-8">
        <div className="w-full p-4 bg-[#faf0e6] rounded-lg shadow-inner">
          <Bar
            parts={equation.input.denominator}
            selectedParts={Array.from({ length: equation.input.numerator }, (_, i) => i)}
            handleClick={() => {}}
          />
        </div>

        <div className="w-full p-4 bg-[#faf0e6] rounded-lg shadow-inner">
          <Bar
            parts={equation.output.denominator}
            selectedParts={Array.from({ length: equation.output.numerator }, (_, i) => i)}
            handleClick={() => {}}
          />
        </div>
      </div>

      {/* Equation input */}
      <div className="flex items-center justify-center gap-4 text-4xl">
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
              onChange={(e) => handleInputChange(e.target.value, 'numerator')}
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
            onChange={(e) => handleInputChange(e.target.value, 'denominator')}
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
              onChange={(e) => handleInputChange(e.target.value, 'output_numerator')}
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

      <div className="mt-8 text-center">
        <p className="text-lg text-[#5d4037] mb-4">
          {currentStep === 'multiplier_denominator' && "First, enter the denominator of the multiplier"}
          {currentStep === 'multiplier_numerator' && "Great! Now enter the numerator of the multiplier"}
          {currentStep === 'output_numerator' && "Finally, calculate and enter the numerator of the result"}
          {currentStep === 'complete' && " Perfect! You've completed the equation! "}
        </p>

        {currentStep === 'complete' && (
          <Button
            onClick={() => window.dispatchEvent(new CustomEvent(nextEvent))}
            className="px-6 py-3 bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white
              rounded-lg shadow-md hover:shadow-lg transition-all duration-300
              transform hover:scale-105 active:scale-95"
          >
            {buttonText}
          </Button>
        )}
      </div>
    </div>
  );
}
