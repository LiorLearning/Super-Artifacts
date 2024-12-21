'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/custom_ui/button";
import { Bar } from "./Bar";
import { useSound } from 'use-sound';
import { Cross } from 'lucide-react';

interface Equation {
  input: { numerator: number; denominator: number };
  multiplier: { numerator: number; denominator: number };
  output: { numerator: number; denominator: number };
}

interface EquationProps {
  input: { numerator: number; denominator: number };
  output: { denominator: number };
  sendAdminMessage: (role: string, content: string) => void;
}

export function FirstScreen({ input, output, sendAdminMessage }: EquationProps) {
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
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [barNumerator, setBarNumerator] = useState<string>('?');
  const [playBreakSound] = useSound('/sounds/chocolate-break.mp3', { volume: 0.5 });
  const [playSelectSound] = useSound('/sounds/join.mp3', { volume: 0.5 });
  const fractionNumerator = useRef<HTMLInputElement>(null);
  const denominatorInput = useRef<HTMLInputElement | null>(null);
  const numeratorInput = useRef<HTMLInputElement | null>(null);
  const outputInput = useRef<HTMLInputElement | null>(null);
  const [showCorrect, setShowCorrect] = useState(false);

  const handleSecondBarClick = (partIndex: number, subPartIndex: number) => {
    if (!selectedKnife || currentStep !== 1) return;
    
    const pieceIndex = partIndex * selectedKnife + subPartIndex;
    
    setSecondBarPieces(prev => {
      const newSelection = prev.includes(pieceIndex)
        ? prev.filter(i => i !== pieceIndex)
        : [...prev, pieceIndex].sort((a, b) => a - b);

      // Play sound on selection
      playSelectSound();

      // Calculate expected number of pieces
      const expectedPieceCount = Math.floor(equation.input.numerator / equation.input.denominator * equation.output.denominator);
      
      // Check if the number of selected pieces matches expected count
      if (newSelection.length === expectedPieceCount) {
        setBarNumerator("")
        fractionNumerator.current?.focus();
        setCurrentStep(2);
      }
      
      return newSelection;
    });
  };

  const handleSecondBarFractionChange = (value: string) => {
      setBarNumerator(value);
      if (parseInt(value) === equation.input.numerator / equation.input.denominator * (equation.output.denominator) && currentStep === 2) {
        setShowCorrect(true);
      }

    }
  const handleKnifeSelect = (parts: number) => {
    setSelectedKnife(parts);
    playBreakSound();
    setSecondBarPieces([]);
    setIsCorrect(false);
    
    // If selected knife matches the required ratio, move to step 1
    if (parts === equation.output.denominator / equation.input.denominator) {
      setCurrentStep(1);
    }
    
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
      if (numValue === equation.output.denominator/ equation.input.denominator) {
        setCurrentStep(4);
      }
      setEquation(prev => ({
        ...prev,
        multiplier: { ...prev.multiplier, denominator: numValue }
      }));
    } else if (type === 'numerator') {
      if (numValue === equation.output.denominator/ equation.input.denominator) {
        setCurrentStep(5); // Move to output numerator input
      }
      setEquation(prev => ({
        ...prev,
        multiplier: { ...prev.multiplier, numerator: numValue }
      }));
    } else if (type === 'output_numerator') {
      const expectedNumerator = equation.input.numerator * (equation.output.denominator / equation.input.denominator);
      if (numValue === expectedNumerator) {
        setIsCorrect(true);
        sendAdminMessage('user', 'Completed first equation successfully!');
      }
      setEquation(prev => ({
        ...prev,
        output: { ...prev.output, numerator: numValue }
      }));
    }
  };

  useEffect(() => {
    if (currentStep === 3 && denominatorInput.current) {
      denominatorInput.current.focus();
    } else if (currentStep === 4 && numeratorInput.current) {
      numeratorInput.current.focus();
    } else if (currentStep === 5 && outputInput.current) {
      outputInput.current.focus();
    }
  }, [currentStep]);

  const renderTopContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <p className="text-left mb-6">
              How many pieces would you get if this chocolate were broken into {equation.output.denominator} pieces?
            </p>
            <div className="text-left">
              <p className="mb-6">
                <span className="font-bold">Step 1:</span> Let's try breaking the chocolate into {equation.output.denominator} pieces first.
              </p>
              <p className="italic mb-4">Pick a suitable knife to split each piece!</p>
            </div>
          </>
        );
      case 1:
        return (
          <div className="text-left">
            <p className="font-bold">Awesome!</p>
            <p className="mb-6">
              <span className="font-bold">Step 2:</span> Select pieces to get the same amount of chocolate as above!
            </p>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <p className="text-left">
              <span className="font-bold">Step 3:</span> So how many pieces do you get?
            </p>
          </div>
        );
      case 3:
        return (
          <div className="w-[calc(100%-50px)] space-y-4">
            <div className="w-full flex items-center justify-evenly gap-4">
              {Array(equation.input.denominator).fill(equation.output.denominator / equation.input.denominator).map((num, idx) => (
                <>
                  {idx > 0 && <span className="text-3xl font-bold">+</span>}
                  <span className="text-3xl font-bold">{num}</span>
                </>
              ))}
            </div>
          </div>
        );
      case 4:
      case 5:
        return (
          <div className="w-[calc(100%-50px)] space-y-4">
            <div className="w-full flex items-center justify-evenly gap-4">
              {Array(equation.input.denominator).fill(null).map((_, idx) => (
                <>
                  {idx > 0 && 
                    <span className="text-3xl font-bold">
                      {idx < equation.input.numerator ? '+' : '\u00A0'}
                    </span>
                  }
                  <span className="text-3xl font-bold">
                    {idx < equation.input.numerator 
                      ? equation.output.denominator / equation.input.denominator 
                      : '\u00A0'}
                  </span>
                </>
              ))}
            </div>
          </div>
        ); 
      default:
        return null;
    }
  };

  const renderEquation = () => {
    if (currentStep < 3) return null;
    
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
          {currentStep >= 4 ? (
            <input
              type="text"
              value={equation.multiplier.numerator || ''}
              onChange={(e) => handleMultiplierChange(e.target.value, 'numerator')}
              className={`${baseInputClass} mb-1 ${currentStep === 4 ? enabledInputClass : disabledInputClass}`}
              disabled={currentStep !== 4}
              ref={numeratorInput}
              maxLength={2}
              placeholder={currentStep === 4 ? "?" : ""}
            />
          ) : (
            <span className="text-3xl font-bold h-12"></span>
          )}
          <div className="w-12 h-[2px] bg-black my-1"/>
          <input
            type="text"
            value={equation.multiplier.denominator || ''}
            onChange={(e) => handleMultiplierChange(e.target.value, 'denominator')}
            className={`${baseInputClass} mt-1 ${currentStep === 3 ? enabledInputClass : disabledInputClass}`}
            disabled={currentStep !== 3}
            ref={denominatorInput}
            maxLength={2}
            placeholder={currentStep === 3 ? "?" : ""}
          />
        </div>
        <span className="text-xl">=</span>
        <div className="flex flex-col items-center">
          {currentStep >= 5 ? (
            <input
              type="text"
              value={equation.output.numerator || ''}
              onChange={(e) => handleMultiplierChange(e.target.value, 'output_numerator')}
              className={`${baseInputClass} mb-1 ${currentStep === 5 ? enabledInputClass : disabledInputClass}`}
              disabled={currentStep !== 5 || isCorrect}
              ref={outputInput}
              maxLength={2}
              placeholder={currentStep === 5 ? "?" : ""}
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

  const renderBottomContent = () => {
    switch (currentStep) {
      case 3:
        return(
          <div className="space-y-4">
            <p className="text-left">
              <span className="font-bold">Step 3:</span> To go from {equation.input.denominator} to {equation.output.denominator} total pieces, how many pieces did your knife split each piece into?
            </p>
          </div>
        );
        case 4:
          return (
            <div className="space-y-4">
              <p className="text-left">
                <span className="font-bold">Step 4:</span> So for every 1 piece you got earlier, how many pieces do you get now?
              </p>
            </div>
          );
        case 5:
          return (
            <div className="space-y-4">
              <p className="text-left">
                <span className="font-bold">Step 5:</span> So for every {equation.input.numerator} piece you got earlier, how many pieces do you get now?
              </p>
            </div>
          );
        default:
          return null;
    }
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

      <div className="space-y-8">
        {/* First bar */}
        <div className="w-full flex items-center">
          <Bar 
            parts={equation.input.denominator} 
            selectedParts={firstBarPieces}
            handleClick={() => {}}
          />
          <div className="ml-4 w-[50px]">
            <div className="flex flex-col items-center">
              <span className="text-2xl">{equation.input.numerator}</span>
              <div className="w-6 h-[2px] bg-black my-1"/>
              <span className="text-2xl">{equation.input.denominator}</span>
            </div>
          </div>
        </div>

        {/* Step content */}
        <div className="">
          {renderTopContent()}
        </div>

        {/* Second bar */}
        <div className="w-full flex items-start">
          <Bar 
            parts={equation.input.denominator} 
            subParts={selectedKnife || 1}
            selectedParts={secondBarPieces}
            handleClick={handleSecondBarClick}
          />
          <div className="ml-4 w-[50px] h-full flex flex-col space-y-2">
            {currentStep === 0 ? (
              <>
                <button 
                  onClick={() => {
                    setSelectedKnife(null);
                    setSecondBarPieces([]);
                    setIsCorrect(false);
                    setCurrentStep(0);
                  }}
                  className="w-16 py-2 bg-gray-200 hover:bg-gray-300 rounded transition-colors duration-200"
                >
                  Reset
                </button>
                {[2, 3, 5].map((parts) => (
                  <button
                    key={parts}
                    onClick={() => handleKnifeSelect(parts)}
                    disabled={currentStep !== 0}
                    className={`
                      w-16 py-2 bg-gray-200 rounded flex items-center justify-between px-3
                      ${selectedKnife === parts ? 'bg-gray-300' : 'hover:bg-gray-300'}
                      disabled:opacity-50 disabled:cursor-not-allowed
                      transition-colors duration-200
                    `}
                  >
                    <span className="text-2xl">🔪</span>
                    <span className="text-lg">{parts}</span>
                  </button>
                ))}
              </>
            ) : (
              <div className="flex flex-col items-center mb-4">
                <span className="text-2xl">
                  { currentStep >= 2 ? (
                    <input 
                      type="text"
                      value={barNumerator}
                      onChange={(e) => handleSecondBarFractionChange(e.target.value)}
                      className="w-8 h-8 text-xl text-center rounded outline-none transition-all duration-200
                        bg-gray-200 hover:bg-gray-300 focus:ring-2 focus:ring-blue-500 focus:bg-white
                        disabled:bg-gray-100 disabled:text-gray-500"
                      disabled={currentStep !== 2 || showCorrect}
                      ref={fractionNumerator}
                      maxLength={2}
                      placeholder="?"
                    />
                  ): '?'}
                </span>
                <div className="w-6 h-[2px] bg-black my-1"/>
                <span className="text-2xl">{equation.output.denominator}</span>
              </div>
            )}
          </div>
        </div>

        <div className=''>
          {renderBottomContent()}
        </div>
        {renderEquation()}


      </div>
      {showCorrect && (
        <div className="mt-4">
          <div className="bg-[#2E7D32] text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span>Correct!</span>
              <span className="text-xl">🎉</span>
            </div>
            <button 
              onClick={() => {
                setShowCorrect(false)
                setCurrentStep(3)
              }}
              className="bg-white text-black px-4 py-2 rounded"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {isCorrect && (
        <div className="mt-4">
          <div className="bg-[#2E7D32] text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span>Correct!</span>
              <span className="text-xl">🎉</span>
            </div>
            <button 
              onClick={() => {
                window.dispatchEvent(new CustomEvent('moveToSecondScreen1'));
              }}
              className="bg-white text-black px-4 py-2 rounded"
            >
              Proceed
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
