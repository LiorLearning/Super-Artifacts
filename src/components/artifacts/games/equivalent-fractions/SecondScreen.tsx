/**
 * SecondScreen Component
 * 
 * Handles the second interactive screen of the equivalent fractions game.
 * Users continue working with equivalent fractions through bar manipulation.
 */
'use client';

import { useState, useRef, useEffect } from 'react';
import { Bar } from "./Bar";
import { useSound } from 'use-sound';
import { ArrowBigDown } from 'lucide-react';

interface SecondScreenProps {
  input: { numerator: number; denominator: number };
  output: { denominator: number };
  nextEvent: string;
  buttonText: string;
}

export const SecondScreen: React.FC<SecondScreenProps> = ({ input, output, nextEvent }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [showCorrect, setShowCorrect] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedPieces, setSelectedPieces] = useState<number[]>([]);
  const [playBreakSound] = useSound('/sounds/chocolate-break.mp3', { volume: 0.5 });
  const [playSelectSound] = useSound('/sounds/join.mp3', { volume: 0.5 });

  const [equation, setEquation] = useState({
    input: { numerator: input.numerator, denominator: input.denominator },
    output: { numerator: 0, denominator: output.denominator },
    multiplier: { numerator: 0, denominator: 0 }
  });

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
    
    if (type === 'denominator') {
      if (numValue === equation.output.denominator / equation.input.denominator) {
        playBreakSound();

        const subPartsPerPiece = equation.output.denominator / equation.input.denominator;
        setSecondBar(
          Array(equation.input.denominator).fill(null).map(() => 
            Array(subPartsPerPiece).fill(0)
          )
        );
        setCurrentStep(2);
      }
      setEquation(prev => ({
        ...prev,
        multiplier: { ...prev.multiplier, denominator: numValue }
      }));

    } else if (type === 'numerator') {
      if (numValue === equation.output.denominator / equation.input.denominator) {

        const subPartsPerPiece = equation.output.denominator / equation.input.denominator;
        setSecondBar(
          Array(equation.input.denominator).fill(null).map((_, i) => 
            Array(subPartsPerPiece).fill(i === 0 ? 1 : 0)
          )
        );
        playSelectSound();
        setCurrentStep(3);
      }
      setEquation(prev => ({
        ...prev,
        multiplier: { ...prev.multiplier, numerator: numValue }
      }));
      
    } else if (type === 'output_numerator') {
      const expectedNumerator = equation.input.numerator * (equation.output.denominator / equation.input.denominator);
      if (numValue === expectedNumerator) {
        // Select all required subparts
        const subPartsPerPiece = equation.output.denominator / equation.input.denominator;
        setSecondBar(
          Array(equation.input.denominator).fill(null).map((_, i) => 
            Array(subPartsPerPiece).fill(i < equation.input.numerator ? 1 : 0)
          )
        );
        playSelectSound();
        setIsCorrect(true);
        // sendAdminMessage('user', 'Completed second equation successfully!');
      }
      setEquation(prev => ({
        ...prev,
        output: { ...prev.output, numerator: numValue }
      }));
    }
  };

  const [firstBar, setFirstBar] = useState<number[][]>(
    Array(equation.input.denominator).fill(null).map((_, i) => 
      i < equation.input.numerator ? [1] : [0]
    )
  );

  const [secondBar, setSecondBar] = useState<number[][]>(
    Array(equation.input.denominator).fill(null).map(() => [0])
  );

  const handleBarClick = (partIndex: number, subPartIndex: number) => {
    if (!equation.multiplier.denominator) return;
    
    setSecondBar(prev => {
      const newBar = prev.map(row => [...row]);  // Deep copy
      newBar[partIndex][subPartIndex] = newBar[partIndex][subPartIndex] === 1 ? 0 : 1;
      return newBar;
    });

    playSelectSound();
  };

  const renderTopContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <p className="text-left">
              <span className="font-bold">Step 1:</span> To go from {equation.input.denominator} to {equation.output.denominator} total pieces, how many pieces should you split each piece into?
            </p>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <p className="text-left">
              <span className="font-bold">Step 2:</span> So for every 1 piece you got earlier, how many pieces do you get now?
            </p>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <p className="text-left">
              <span className="font-bold">Step 3:</span> So how many pieces do you now get in total?
            </p>
          </div>
        );
      case 4:
      default:
        return null;
    }
  };

  const renderEquation = () => {
    const baseInputClass = "w-12 h-12 text-xl text-center rounded outline-none transition-all duration-200";
    const enabledInputClass = "bg-gray-200 hover:bg-gray-300 focus:ring-2 focus:ring-blue-500 focus:bg-white";
    const disabledInputClass = "bg-gray-100 text-gray-500";
    
    return (
      <div className="flex items-center justify-center gap-4">
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold">{equation.input.numerator}</span>
          <div className="w-12 h-[2px] bg-black my-1"/>
          <span className="text-3xl font-bold">{equation.input.denominator}</span>
        </div>
        <span className="text-xl">×</span>
        <div className="flex flex-col items-center">
          {currentStep >= 2 ? (
            <input
              type="text"
              value={equation.multiplier.numerator || ''}
              onChange={(e) => handleMultiplierChange(e.target.value, 'numerator')}
              className={`${baseInputClass} mb-1 ${currentStep === 2 ? enabledInputClass : disabledInputClass}`}
              disabled={currentStep !== 2}
              ref={numeratorInput}
              maxLength={2}
              placeholder={currentStep === 2 ? "?" : ""}
            />
          ) : (
            <span className="text-3xl font-bold h-12"></span>
          )}
          <div className="w-12 h-[2px] bg-black my-1"/>
          <input
            type="text"
            value={equation.multiplier.denominator || ''}
            onChange={(e) => handleMultiplierChange(e.target.value, 'denominator')}
            className={`${baseInputClass} mt-1 ${currentStep === 1 ? enabledInputClass : disabledInputClass}`}
            disabled={currentStep !== 1}
            ref={denominatorInput}
            maxLength={2}
            placeholder={currentStep === 1 ? "?" : ""}
          />
        </div>
        <span className="text-xl">=</span>
        <div className="flex flex-col items-center">
          {currentStep >= 3 ? (
            <input
              type="text"
              value={equation.output.numerator || ''}
              onChange={(e) => handleMultiplierChange(e.target.value, 'output_numerator')}
              className={`${baseInputClass} mb-1 ${currentStep === 3 ? enabledInputClass : disabledInputClass}`}
              disabled={currentStep !== 3 || isCorrect}
              ref={outputInput}
              maxLength={2}
              placeholder={currentStep === 3 ? "?" : ""}
            />
          ) : (
            <span className="text-3xl font-bold h-12"></span>
          )}
          <div className="w-12 h-[2px] bg-black my-1"/>
          <span className="text-3xl font-bold">{equation.output.denominator}</span>
        </div>
      </div>
    );
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

      {renderTopContent()}

      {renderEquation()}
      
      <div className="flex items-center justify-center space-x-6 my-12">
        <Bar 
          parts={firstBar}
          handleClick={() => {}}
        />
        <div className="flex flex-col items-center">
          <span className="text-2xl">{firstBar.flat().filter(x => x === 1).length}</span>
          <div className="w-6 h-[2px] bg-black my-1"/>
          <span className="text-2xl">{equation.input.denominator}</span>
        </div>
      </div>

      
      <div className="mt-8 space-y-8">
        <div className="flex justify-center">
          <ArrowBigDown className="w-20 h-20 text-black fill-black object-contai" />
        </div>

        <div className="w-[calc(100%-80px)] flex items-start">
          <Bar 
            parts={secondBar}
            handleClick={handleBarClick}
          />
        </div>
      </div>

      {isCorrect && (
        <div className="mt-4">
          <div className="bg-[#2E7D32] text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span>Well done!</span>
              <span className="text-xl">🎉</span>
            </div>
            <button 
              onClick={() => {
                window.dispatchEvent(new CustomEvent(nextEvent));
              }}
              className="bg-white text-black px-4 py-2 rounded"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
