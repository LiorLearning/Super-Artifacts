import { Bar } from "./Bar";
import { useSound } from 'use-sound';
import { ArrowBigDown } from 'lucide-react';
import { useGameState } from './state-utils';
import { FractionDisplay } from './components';
import { InteractiveEquation } from './components';

// Step Content Component
const StepContent = ({ step, equation }: { step: number; equation: any }) => {
  const steps = {
    1: (
      <p className="text-left">
        <span className="font-bold">Step 1:</span> To go from {equation.input.denominator} to {equation.output.denominator} total pieces, how many pieces should you split each piece into?
      </p>
    ),
    2: (
      <p className="text-left">
        <span className="font-bold">Step 2:</span> So for every 1 piece you got earlier, how many pieces do you get now?
      </p>
    ),
    3: (
      <p className="text-left">
        <span className="font-bold">Step 3:</span> So how many pieces do you now get in total?
      </p>
    )
  };

  return <div className="space-y-4">{steps[step as keyof typeof steps]}</div>;
};

// Success Message Component
const SuccessMessage = ({ onContinue }: { onContinue: () => void }) => (
  <div className="mt-4">
    <div className="bg-[#2E7D32] text-white p-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span>Well done!</span>
        <span className="text-xl">🎉</span>
      </div>
      <button onClick={onContinue} className="bg-white text-black px-4 py-2 rounded">
        Continue
      </button>
    </div>
  </div>
);

export const SecondScreen = () => {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { equation, firstBar, secondBar, currentStep, isCorrect } = gameStateRef.current.secondScreenState;

  const [playBreakSound] = useSound('/sounds/chocolate-break.mp3', { volume: 0.5 });
  const [playSelectSound] = useSound('/sounds/join.mp3', { volume: 0.5 });

  const handleNextScreen = () => {
    if (gameStateRef.current.currentScreen === 'second1') {
      setGameStateRef(prev => ({
        ...prev,
        currentScreen: 'second2',
        secondScreenState: {
          equation: {
            input: { numerator: 2, denominator: 3 },
            multiplier: { numerator: 0, denominator: 0 },
            output: { numerator: 0, denominator: 9 },
          },
          firstBar: Array(3).fill(null).map((_, i) => (i < 2 ? [1] : [0])),
          secondBar: Array(3).fill([0]),
          currentStep: 1,
          showCorrect: false,
          isCorrect: false,
          selectedPieces: [],
        },
      }));
    } else {
      setGameStateRef(prev => ({ ...prev, currentScreen: 'third' }));
    }
  };

  const handleMultiplierChange = (value: string, type: 'numerator' | 'denominator' | 'output_numerator') => {
    const numValue = parseInt(value) || 0;
    
    setGameStateRef(prev => {
      const updatedState = { ...prev };
      const secondScreenState = updatedState.secondScreenState;

      if (type === 'denominator') {
        if (numValue === equation.output.denominator / equation.input.denominator) {
          playBreakSound();
          secondScreenState.currentStep = 2;
          secondScreenState.secondBar = Array(equation.input.denominator)
            .fill(null)
            .map(() => Array(equation.output.denominator / equation.input.denominator).fill(0));
        }
        secondScreenState.equation.multiplier.denominator = numValue;
      } else if (type === 'numerator') {
        if (numValue === equation.output.denominator / equation.input.denominator) {
          playSelectSound();
          secondScreenState.currentStep = 3;
          secondScreenState.secondBar = Array(equation.input.denominator)
            .fill(null)
            .map((_, i) => Array(equation.output.denominator / equation.input.denominator).fill(i === 0 ? 1 : 0));
        }
        secondScreenState.equation.multiplier.numerator = numValue;
      } else if (type === 'output_numerator') {
        const expectedNumerator = equation.input.numerator * (equation.output.denominator / equation.input.denominator);
        if (numValue === expectedNumerator) {
          playSelectSound();
          secondScreenState.isCorrect = true;
          secondScreenState.secondBar = Array(equation.input.denominator)
            .fill(null)
            .map((_, i) => Array(equation.output.denominator / equation.input.denominator)
            .fill(i < equation.input.numerator ? 1 : 0));
        }
        secondScreenState.equation.output.numerator = numValue;
      }

      return updatedState;
    });
  };

  const handleBarClick = (partIndex: number, subPartIndex: number) => {
    if (currentStep < 3) return;
    
    setGameStateRef(prev => {
      const updatedState = { ...prev };
      const secondBar = updatedState.secondScreenState.secondBar;
      secondBar[partIndex][subPartIndex] = secondBar[partIndex][subPartIndex] === 1 ? 0 : 1;
      return updatedState;
    });

    playSelectSound();
  };

  return (
    <div className="max-w-3xl h-full mx-auto text-center p-8 bg-[#FFF5EE]">
      <h1 className="text-3xl font-bold mb-8">Equivalent fractions</h1>

      <div className="flex items-center justify-center space-x-6 mb-12">
        <FractionDisplay numerator={equation.input.numerator} denominator={equation.input.denominator} />
        <span className="text-5xl font-extralight">=</span>
        <FractionDisplay numerator="?" denominator={equation.output.denominator} />
      </div>

      <StepContent step={currentStep} equation={equation} />
      
      <InteractiveEquation
        equation={equation}
        currentStep={currentStep}
        handleMultiplierChange={handleMultiplierChange}
        isCorrect={isCorrect}
      />
      
      <div className="flex items-center justify-center space-x-6 my-12">
        <Bar parts={firstBar} handleClick={() => {}} />
        <FractionDisplay
          numerator={firstBar.flat().filter(x => x === 1).length}
          denominator={equation.input.denominator}
        />
      </div>

      <div className="mt-8 space-y-8">
        <div className="flex justify-center">
          <ArrowBigDown className="w-20 h-20 text-black fill-black object-contain" />
        </div>

        <div className="w-[calc(100%-80px)] flex items-start">
          <Bar parts={secondBar} handleClick={handleBarClick} />
        </div>
      </div>

      {isCorrect && <SuccessMessage onContinue={handleNextScreen} />}
    </div>
  );
};