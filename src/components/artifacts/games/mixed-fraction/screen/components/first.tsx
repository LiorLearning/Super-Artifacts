import { Input } from "@/components/custom_ui/input";
import { Button } from "@/components/custom_ui/button";
import { useState } from "react";
import { StepForwardIcon } from "lucide-react";

interface FinalAnswerProps {
  numerator: number;
  denominator: number;
  nextStep: () => void;
}


export const FinalAnswer = ({ numerator, denominator, nextStep }: FinalAnswerProps) => {
  const [mixedFraction, setMixedFraction] = useState({integer: '', numerator: '', denominator: ''});

  const handleIntegerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setMixedFraction(prev => ({ ...prev, integer: inputValue }));
  }; 

  const handleNumeratorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setMixedFraction(prev => ({ ...prev, numerator: inputValue }));
  };

  const handleDenominatorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setMixedFraction(prev => ({ ...prev, denominator: inputValue }));
  };

  const verifyMixedFraction = () => {
    if (parseInt(mixedFraction.integer) * parseInt(mixedFraction.denominator) + parseInt(mixedFraction.numerator) === numerator) {
      if (parseInt(mixedFraction.denominator) === denominator) {
        nextStep();
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center mt-4">
        <div className="flex items-center justify-center h-full">
          <div className="text-3xl font-bold text-center my-8">
            <div className="border-4 border-purple-500 px-1 py-1 rounded-lg">
              <Input 
                type="text" 
                value={mixedFraction.integer} 
                placeholder="?"
                onChange={handleIntegerChange} 
                className="w-12 text-center text-purple-500"
              />
            </div>
          </div>
        </div>
        <div className="text-3xl font-bold text-center mx-2">
          <div className="border-4 border-green-500 px-1 py-1 rounded-lg">
            <Input 
              type="text" 
              value={mixedFraction.numerator} 
              placeholder="?"
              onChange={handleNumeratorChange} 
              className="w-12 text-center text-green-500"
            />
          </div>
          <div className="w-full h-px bg-black my-2" />
          <div className="border-4 border-gray-600 px-1 py-1 rounded-lg">
            <Input 
              type="text" 
              value={mixedFraction.denominator} 
              placeholder="?"
              onChange={handleDenominatorChange} 
              className="w-12 text-center text-gray-600"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <Button className="bg-blue-500 text-white px-6 py-3 mx-2 shadow-lg text-xl rounded-none" onClick={verifyMixedFraction}>
          Verify
        </Button>
      </div>
    </div>
  )
}


interface CorrectAnswerProps {
  numerator: number;
  denominator: number;
  large: boolean;
  nextScreen?: () => void;
}

export const CorrectAnswer = ({ numerator, denominator, large, nextScreen }: CorrectAnswerProps) => {
  const textSize = large ? 'text-8xl' : 'text-6xl';
  const marginTop = large ? 'mt-48' : 'mt-4';
  const marginBottom = large ? 'my-16' : 'my-8';

  return (
    <>
      <div className={`flex justify-center ${marginTop}`}>
        <div className="flex items-center justify-center h-full">
          <div className={`${textSize} font-bold text-center ${marginBottom} mx-4`}>
            <span>{Math.floor(numerator / denominator)}</span>
          </div>
        </div>
        <div className={`${textSize} font-bold text-center mx-2`}>
          <span>{numerator % denominator}</span>
          <div className="w-full h-px bg-black my-2" />
          <span>{denominator}</span>
        </div>
      </div>
      <div className={`flex justify-center text-6xl ${large ? 'mt-8' : 'mt-4'} text-green-500`}>
        <span>Correct Answer</span>
      </div>
      <div className={`flex justify-center ${large ? 'mt-16' : 'mt-4'}`}>
        {nextScreen && (
          <Button className="text-black px-6 py-3 mx-2 text-3xl shadow-lg rounded-none bg-white" onClick={nextScreen}>
            PROCEED
            <StepForwardIcon className="inline-block ml-2 text-green-500" />
          </Button>
        )}
      </div>
    </>
  )
}


interface StepModuleProps {
  screen: string;
  color: string;
  stepNumber: number;
  numerator?: number;
  denominator?: number;
  stepText: string;
}

export const StepModule = ({ screen, color, stepNumber, numerator, denominator, stepText }: StepModuleProps) => {
  return (
    <div className="flex items-stretch justify-center gap-4">
      <div className={`bg-white border-8 px-6 py-2 flex items-center justify-center`} style={{ color: color, borderColor: color }}>
        <span className="text-2xl font-bold">STEP {stepNumber}</span>
      </div>
      <div className={`flex-1 border-8 flex items-center max-w-xl`} style={{ color: color, borderColor: color, backgroundColor: color }}>
        <h2 className="text-white text-2xl font-bold flex items-center gap-4 mx-auto">
          {screen === 'first' && numerator && denominator && (
            <>
              <span>CREATE</span>
              <div className="bg-white text-black px-3 py-1 inline-flex flex-col items-center">
                <span>{numerator}</span>
                <div className="w-3 h-px bg-black" />
                <span>{denominator}</span>
              </div>
              <span>LEGO BLOCKS</span>
            </>
          )}
          {screen === 'second' && (
            <div className="flex items-center justify-center my-4">
              <span>{stepText}</span>
            </div>
          )}
        </h2>
      </div>
    </div>
  )
}