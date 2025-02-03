import React, { useState, useEffect } from 'react';
import { MixedFraction } from '../../game-state';
import Image from 'next/image';
import DirectionArrows from '@/assets/direction.png';
import { useGameState } from '../../state-utils';
import SuccessAnimation from '@/components/artifacts/utils/success-animate';

interface FractionBoxProps {
  mixedFraction: MixedFraction;
  onFractionComplete?: () => void;
}

const FractionBox: React.FC<FractionBoxProps> = ({ 
  mixedFraction, 
  onFractionComplete
}) => {
  const [numerator, setNumerator] = useState<string>('');
  const [denominator, setDenominator] = useState<string>('');
  const [isComplete, setIsComplete] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const checkAnswer = (num: string, den: string) => {
    const expectedNumerator = (mixedFraction.whole * mixedFraction.denominator) + mixedFraction.numerator;
    const expectedDenominator = mixedFraction.denominator;

    if (parseInt(num) === expectedNumerator && parseInt(den) === expectedDenominator) {
      setIsComplete(true);
      onFractionComplete?.();
    }
  };

  const handleNumeratorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isComplete) return;
    const value = e.target.value;
    setNumerator(value);
    if (denominator) {
      checkAnswer(value, denominator);
    }
  };

  const handleDenominatorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isComplete) return;
    const value = e.target.value;
    setDenominator(value);
    if (numerator) {
      checkAnswer(numerator, value);
    }
  };

  const renderHint = () => (
    <div className="relative bg-white p-6 rounded-xl border-2 border-orange-400 w-[280px] h-[100px]">
      <div className="flex items-center  justify-center">
        <span className="text-3xl">{mixedFraction.whole}</span>

        <Image 
          src={DirectionArrows} 
          alt="Direction arrows"
          width={35}
          height={35}
          className="object-contain mx-2" 
        />

        <div className="flex flex-col items-center">
          <span className="text-2xl mb-[-4px]">{mixedFraction.numerator}</span>
          <div className="h-[2px] w-5 bg-black"></div>
          <span className="text-2xl mt-[-4px]">{mixedFraction.denominator}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Mixed Form */}
      <div className="bg-pink-200 rounded-lg overflow-hidden">
        <h2 className="text-xl font-bold px-4 py-3 bg-pink-300">Mixed Form</h2>
        <div className="bg-pink-100 p-6 flex justify-center items-center min-h-[140px]">
          <div className="bg-white p-4 rounded-lg">
            <div className="flex">
              <span className="text-2xl font-medium self-center">{mixedFraction.whole}</span>
              <div className="flex flex-col items-center ml-1">
                <span className="text-xl mb-[-4px]">{mixedFraction.numerator}</span>
                <div className="h-[2px] w-4 bg-black"></div>
                <span className="text-xl mt-[-4px]">{mixedFraction.denominator}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Improper Form */}
      <div className="bg-pink-200 rounded-lg overflow-hidden">
        <h2 className="text-xl font-bold px-4 py-3 bg-pink-300">Improper Form</h2>
        <div className="bg-pink-100 p-6 flex justify-center items-center min-h-[140px]">
          <div className="flex flex-col items-center">
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={numerator}
              onChange={handleNumeratorChange}
              disabled={isComplete}
              className="w-14 h-14 text-center text-xl border border-gray-300 rounded-md disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-400 [appearance:textfield]"
              placeholder=""
            />
            <div className="w-14 h-0.5 bg-black my-1"></div>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={denominator}
              onChange={handleDenominatorChange}
              disabled={isComplete}
              className="w-14 h-14 text-center text-xl border border-gray-300 rounded-md disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-400 [appearance:textfield]"
              placeholder=""
            />
          </div>
        </div>
      </div>

      {/* Hint */}
      <div className="bg-amber-50 rounded-lg overflow-hidden">
        <h2 className="text-xl font-bold px-4 py-3 bg-amber-100">Hint</h2>
        <div className="p-6 flex justify-center items-center min-h-[140px] bg-[#fff3e0]">
          {showHint ? renderHint() : (
            <button
              className="px-6 py-2 bg-white border border-amber-200 rounded-md hover:bg-amber-50 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-300"
              onClick={() => setShowHint(true)}
            >
              See hint
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

interface MainProps {
  mixedFraction1: MixedFraction;
  mixedFraction2: MixedFraction;
}

const Main: React.FC<MainProps> = ({ mixedFraction1, mixedFraction2 }) => {
  const { setGameStateRef } = useGameState();
  const [showSecondFraction, setShowSecondFraction] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (showSuccess) {
      // Just hide success animation after 5 seconds
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  const handleFirstFractionComplete = () => {
    setShowSecondFraction(true);
  };

  const handleSecondFractionComplete = () => {
    setShowSuccess(true);
  };

  return (
    <div className={showSuccess ? 'pointer-events-none' : ''}>
      <div className="w-full max-w-4xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-pink-500 text-center mb-20">
          Let's do some more now!
        </h1>
        <div className="space-y-8">
          <FractionBox 
            mixedFraction={mixedFraction1} 
            onFractionComplete={handleFirstFractionComplete}
          />
          {showSecondFraction && (
            <FractionBox 
              mixedFraction={mixedFraction2}
              onFractionComplete={handleSecondFractionComplete}
            />
          )}
        </div>
        
        {showSuccess && <SuccessAnimation />}
      </div>
    </div>
  );
};

export default Main;