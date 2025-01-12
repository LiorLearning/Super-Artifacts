import { Equation } from "./game-state";

interface InputProps {
  value: string | number;
  onChange: (value: string) => void;
  disabled?: boolean;
  currentStep: number;
  targetStep: number;
  placeholder?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
}

// Reusable Input Component
export const EquationInput = ({ value, onChange, disabled, currentStep, targetStep, placeholder, inputRef }: InputProps) => {
  const baseInputClass = "w-12 h-12 text-xl text-center rounded outline-none transition-all duration-200";
  const enabledInputClass = "bg-gray-200 hover:bg-gray-300 focus:ring-2 focus:ring-blue-500 focus:bg-white";
  const disabledInputClass = "bg-gray-100 text-gray-500";

  return (
    <input
      type="text"
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      className={`${baseInputClass} ${currentStep === targetStep ? enabledInputClass : disabledInputClass}`}
      disabled={currentStep !== targetStep || disabled}
      ref={inputRef}
      maxLength={2}
      placeholder={placeholder}
    />
  );
};


// Fraction Display Component
export const FractionDisplay = ({ numerator, denominator }: { numerator: number | string; denominator: number | string }) => (
  <div className="flex flex-col items-center">
    <span className="text-3xl font-bold">{numerator}</span>
    <div className="w-8 h-[2px] bg-black my-1" />
    <span className="text-3xl font-bold">{denominator}</span>
  </div>
);


// Interactive Equation Component
export const FirstScreenInteractiveEquation = ({
  equation,
  currentStep,
  handleMultiplierChange,
  isCorrect,
  refs
}: {
  equation: Equation;
  currentStep: number;
  handleMultiplierChange: (value: string, type: 'numerator' | 'denominator' | 'output_numerator') => void;
  isCorrect: boolean;
  refs: {
    denominatorInput: React.RefObject<HTMLInputElement>;
    numeratorInput: React.RefObject<HTMLInputElement>;
    outputInput: React.RefObject<HTMLInputElement>;
  };
}) => {
  if (currentStep < 3) return null;

  return (
    <div className="flex items-center justify-center gap-4">
      <FractionDisplay numerator={equation.input.numerator} denominator={equation.input.denominator} />
      <span className="text-xl">×</span>
      <div className="flex flex-col items-center">
        {currentStep >= 4 ? (
          <EquationInput
            value={equation.multiplier.numerator}
            onChange={(value) => handleMultiplierChange(value, 'numerator')}
            currentStep={currentStep}
            targetStep={4}
            inputRef={refs.numeratorInput}
            placeholder="?"
          />
        ) : (
          <span className="text-3xl font-bold h-12"></span>
        )}
        <div className="w-12 h-[2px] bg-black my-1" />
        <EquationInput
          value={equation.multiplier.denominator}
          onChange={(value) => handleMultiplierChange(value, 'denominator')}
          currentStep={currentStep}
          targetStep={3}
          inputRef={refs.denominatorInput}
          placeholder="?"
        />
      </div>
      <span className="text-xl">=</span>
      <div className="flex flex-col items-center">
        {currentStep >= 5 ? (
          <EquationInput
            value={equation.output.numerator}
            onChange={(value) => handleMultiplierChange(value, 'output_numerator')}
            currentStep={currentStep}
            targetStep={5}
            disabled={isCorrect}
            inputRef={refs.outputInput}
            placeholder="?"
          />
        ) : (
          <span className="text-3xl font-bold h-12"></span>
        )}
        <div className="w-12 h-[2px] bg-black my-1" />
        <span className="text-3xl font-bold">{equation.output.denominator}</span>
      </div>
    </div>
  );
};



// Interactive Equation Component specific to ThirdScreen
interface InteractiveEquationProps {
  equation: Equation;
  currentStep: number;
  handleMultiplierChange: (value: string, type: 'numerator' | 'denominator' | 'output_numerator') => void;
  isCorrect: boolean;
  denominatorInputRef?: React.RefObject<HTMLInputElement>;
  numeratorInputRef?: React.RefObject<HTMLInputElement>;
  outputInputRef?: React.RefObject<HTMLInputElement>;
}

export const InteractiveEquation = ({
  equation,
  currentStep,
  handleMultiplierChange,
  isCorrect,
  denominatorInputRef,
  numeratorInputRef,
  outputInputRef
}: InteractiveEquationProps) => {
  const baseInputClass = "w-12 h-12 text-xl text-center rounded outline-none transition-all duration-200 border-2 border-black";
  const enabledInputClass = "bg-gray-200 hover:bg-gray-300 focus:ring-2 focus:ring-blue-500 focus:bg-white";
  const disabledInputClass = "bg-gray-100 text-gray-500 border-gray-300";

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
            ref={numeratorInputRef || undefined}
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
          ref={denominatorInputRef || undefined}
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
            ref={outputInputRef || undefined}
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
