/**
 * ThirdScreen Component
 * 
 * Handles the third and final interactive screen of the equivalent fractions game.
 * Users complete their understanding of equivalent fractions through final exercises.
 */
'use client';

import { useEffect, useRef } from 'react';
import { useGameState } from './state-utils';
import { Equation } from './game-state';
import SuccessAnimation from '../../utils/success-animate';
import { InteractiveEquation } from './components';

// Step Content Component
const StepContent = ({ step, equation }: { step: number; equation: Equation }) => {
  const steps = {
    1: (
      <div className="space-y-4">
        <p className="text-left">
          <span className="font-bold">Step 1:</span> To go from {equation.input.denominator} to {equation.output.denominator} total pieces, how many pieces should you split each piece into?
        </p>
      </div>
    ),
    2: (
      <div className="space-y-4">
        <p className="text-left">
          <span className="font-bold">Step 2:</span> So for every 1 piece you got earlier, how many pieces do you get now?
        </p>
      </div>
    ),
    3: (
      <div className="space-y-4">
        <p className="text-left">
          <span className="font-bold">Step 3:</span> So how many pieces do you now get in total?
        </p>
      </div>
    )
  };

  return steps[step as keyof typeof steps] || null;
};

// Success Message Component
const SuccessMessage = () => (
  <div className="mt-4">
    <div className="bg-[#2E7D32] text-white p-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span>Well done!</span>
        <span className="text-xl">🎉</span>
      </div>
      <SuccessAnimation />
    </div>
  </div>
);

interface ThirdScreenProps {
  sendAdminMessage: (role: string, content: string) => void;
}

export const ThirdScreen = ({ sendAdminMessage }: ThirdScreenProps) => {
  const { gameStateRef, setGameStateRef } = useGameState();
  const thirdScreenState = gameStateRef.current.thirdScreenState;

  const {
    equation,
    isCorrect,
    currentStep,
  } = thirdScreenState;

  const denominatorInput = useRef<HTMLInputElement | null>(null);
  const numeratorInput = useRef<HTMLInputElement | null>(null);
  const outputInput = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (currentStep === 1 && denominatorInput.current) {
      denominatorInput.current.focus();
    } else if (currentStep === 2 && numeratorInput.current) {
      numeratorInput.current.focus();
    } else if (currentStep === 3 && outputInput.current) {
      outputInput.current.focus();
    }
  }, [currentStep]);

  const handleMultiplierChange = (value: string, type: 'numerator' | 'denominator' | 'output_numerator') => {
    const numValue = parseInt(value) || 0;
    
    setGameStateRef((prevState) => {
      const updatedEquation = { ...prevState.thirdScreenState.equation };

      if (type === 'denominator') {
        updatedEquation.multiplier.denominator = numValue;

        if (numValue === updatedEquation.output.denominator / updatedEquation.input.denominator) {
          return {
            ...prevState,
            thirdScreenState: {
              ...prevState.thirdScreenState,
              equation: updatedEquation,
              currentStep: 2,
            },
          };
        }
      } else if (type === 'numerator') {
        updatedEquation.multiplier.numerator = numValue;

        if (numValue === updatedEquation.output.denominator / updatedEquation.input.denominator) {
          return {
            ...prevState,
            thirdScreenState: {
              ...prevState.thirdScreenState,
              equation: updatedEquation,
              currentStep: 3,
            },
          };
        }
      } else if (type === 'output_numerator') {
        const expectedNumerator = updatedEquation.input.numerator * (updatedEquation.output.denominator / updatedEquation.input.denominator);
        
        if (numValue === expectedNumerator) {
          sendAdminMessage('user', 'Completed final equation successfully!');
          return {
            ...prevState,
            thirdScreenState: {
              ...prevState.thirdScreenState,
              equation: {
                ...updatedEquation,
                output: { ...updatedEquation.output, numerator: numValue },
              },
              isCorrect: true,
            },
          };
        }

        return {
          ...prevState,
          thirdScreenState: {
            ...prevState.thirdScreenState,
            equation: {
              ...updatedEquation,
              output: { ...updatedEquation.output, numerator: numValue },
            },
          },
        };
      }

      return {
        ...prevState,
        thirdScreenState: {
          ...prevState.thirdScreenState,
          equation: updatedEquation,
        },
      };
    });
  };

  return (
    <div className="max-w-3xl h-full mx-auto text-center p-8 bg-[#FFF5EE]">
      <h1 className="text-3xl font-bold mb-8">Equivalent fractions</h1>
      
      <div className="flex items-center justify-center space-x-6 mb-12">
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold">{equation.input.numerator}</span>
          <div className="w-8 h-[2px] bg-black my-1"/>
          <span className="text-3xl font-bold">{equation.input.denominator}</span>
        </div>
        <span className="text-5xl font-extralight">=</span>
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold">?</span>
          <div className="w-8 h-[2px] bg-black my-1"/>
          <span className="text-3xl font-bold">{equation.output.denominator}</span>
        </div>
      </div>

      <StepContent step={currentStep} equation={equation} />
      
      <div className="mt-8 space-y-8">
        <InteractiveEquation
          equation={equation}
          currentStep={currentStep}
          handleMultiplierChange={handleMultiplierChange}
          isCorrect={isCorrect}
          denominatorInputRef={denominatorInput}
          numeratorInputRef={numeratorInput}
          outputInputRef={outputInput}
        />
      </div>

      {isCorrect && (
        <SuccessMessage />
      )}
    </div>
  );
};
