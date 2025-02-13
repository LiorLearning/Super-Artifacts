import React, { useState, useEffect, useRef } from 'react';
import { MixedFraction } from '../../game-state';
import Image from 'next/image';
import DirectionArrows from '@/assets/direction.png';
import SuccessAnimation from '@/components/artifacts/utils/success-animate';

interface FractionBoxProps {
  mixedFraction: MixedFraction;
  onFractionComplete?: () => void;
  sendAdminMessage: (role: string, content: string, onComplete?: () => void) => void;
}

const FractionBox: React.FC<FractionBoxProps> = ({ 
  mixedFraction, 
  onFractionComplete,
  sendAdminMessage
}) => {
  const [numerator, setNumerator] = useState<string>('');
  const [denominator, setDenominator] = useState<string>('');
  const [isComplete, setIsComplete] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const inputTimer = useRef<NodeJS.Timeout>();
  const hintMessageShown = useRef(false);
  const [canEnterDenominator, setCanEnterDenominator] = useState(false)
  const [hasUsedHint, setHasUsedHint] = useState(false)
  const [errorCount, setErrorCount] = useState(0);

  const [numeratorIsCorrect, setNumeratorIsCorrect] = useState(false)
  const [numeratorIsWrong, setNumeratorIsWrong] = useState(false)
  const [denominatorIsCorrect, setDenominatorIsCorrect] = useState(false)
  const [denominatorIsWrong, setDenominatorIsWrong] = useState(false)
  const numeratorMessageShown = useRef(false)
  const denominatorMessageShown = useRef(false)


  useEffect(() => {
    if (numerator === '' && denominator === '' && !hintMessageShown.current) {
      return () => {
        if (inputTimer.current) {
          clearTimeout(inputTimer.current);
        }
      };
    }
  }, [numerator, denominator]);

  const checkAnswer = (num: string, den: string) => {
    const expectedNumerator = (mixedFraction.whole * mixedFraction.denominator) + mixedFraction.numerator;
    const expectedDenominator = mixedFraction.denominator;

    if (parseInt(num) === expectedNumerator && parseInt(den) === expectedDenominator) {
      setIsComplete(true);
      onFractionComplete?.();
    }
  };

  const handleNumeratorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setNumerator(value);

    if (value === '') {
      setNumeratorIsCorrect(false)
      setNumeratorIsWrong(false)
      return
    }

    const expectedNumerator = (mixedFraction.denominator * mixedFraction.whole) + mixedFraction.numerator;

    if (value.length >= expectedNumerator.toString().length) {
      if (Number(value) === expectedNumerator) {

        setNumeratorIsCorrect(true)
        setNumeratorIsWrong(false)
        setCanEnterDenominator(true)
      } else {
        setNumeratorIsWrong(true)
        setNumeratorIsCorrect(false)
        if (!numeratorMessageShown.current) {
          numeratorMessageShown.current = true
          sendAdminMessage("admin", `User answered incorrectly for the numerator pie, correct answer is ${expectedNumerator}, but user answered ${value} . Diagnose socratically.`)
        }

      }
    }
  };

  const handleDenominatorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!canEnterDenominator) return;

    const value = e.target.value.replace(/\D/g, '');
    setDenominator(value);

    if (value === '') {
      setDenominatorIsCorrect(false)
      setDenominatorIsWrong(false)
      return
    }

    const expectedDenominator = mixedFraction.denominator;
    const expectedNumerator = (mixedFraction.denominator * mixedFraction.whole) + mixedFraction.numerator;

    if (value.length >= expectedDenominator.toString().length) {
      if (Number(value) === expectedDenominator) {
        setDenominatorIsCorrect(true)
        setDenominatorIsWrong(false)
        if (Number(numerator) === expectedNumerator) {
          onFractionComplete?.();

        }
      } else {
        setDenominatorIsWrong(true)
        setDenominatorIsCorrect(false)
        if (!denominatorMessageShown.current) {
          denominatorMessageShown.current = true
          sendAdminMessage("admin", `User answered incorrectly for the denominator pie, correct answer is ${expectedDenominator}, but user answered ${value} . Diagnose socratically.`)

        }
      }
    }
  };

  const handleHintClick = () => {
    setShowHint(true);
    setHasUsedHint(true);

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
    <div className="grid grid-cols-3 gap-6">
      {/* Mixed Form */}
      <div className="bg-pink-200 text-center rounded-lg overflow-hidden">
        <h2 className="text-xl px-4 py-3 bg-[#FF467A] bg-opacity-10">Mixed Form</h2>

        <div className="bg-pink-100 p-6 flex justify-center items-center min-h-[200px]">
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
      <div className="bg-pink-200 rounded-lg text-center overflow-hidden">
        <h2 className="text-xl px-4 py-3 bg-pink-300">Improper Form</h2>
        <div className="bg-pink-100 p-6 flex justify-center items-center min-h-[200px]">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="absolute -bottom-1 -left-1 w-full h-full bg-black rounded-md"></div>
              <div className="absolute -bottom-1 -left-1 w-full h-full bg-black opacity-60 rounded-md"></div>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={numerator}
                onChange={handleNumeratorChange}
                disabled={isComplete}
                className={`relative w-14 h-14 text-center text-xl border border-gray-300 rounded-md disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-400 [appearance:textfield]
                  ${numeratorIsCorrect ? 'bg-green-100' : numeratorIsWrong ? 'bg-red-100' : 'bg-white'}
                `}
                placeholder=""
              />
            </div>

            <div className="w-14 h-0.5 bg-black"></div>

            <div className="relative">
              <div className="absolute -bottom-1 -left-1 w-full h-full bg-black rounded-md"></div>
              <div className="absolute -bottom-1 -left-1 w-full h-full bg-black opacity-60 rounded-md"></div>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={denominator}
                onChange={handleDenominatorChange}
                disabled={!canEnterDenominator || isComplete}
                className={`relative w-14 h-14 text-center text-xl border border-gray-300 rounded-md disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-400 [appearance:textfield]
                  ${!canEnterDenominator ? 'bg-gray-100' : ''}
                  ${denominatorIsCorrect ? 'bg-green-100' : denominatorIsWrong ? 'bg-red-100' : 'bg-white'}
                `}
                placeholder=""
              />
            </div>
          </div>
        </div>
      </div>

      {/* Hint */}
      <div className="bg-[#CA5E00] bg-opacity-10 text-center rounded-lg overflow-hidden">
        <h2 className="text-xl px-4 py-3 bg-[#CA5E00] bg-opacity-10">Hint</h2>
        <div className="p-6 flex justify-center items-center min-h-[200px] bg-[#CA5E00] bg-opacity-5">
          {showHint ? (
            <div className="relative bg-white p-6 rounded-xl border-2 border-[#CA5E00] w-[280px] h-[100px]">
              <div className="flex items-center justify-center">
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
                  <div className="h-[2px] w-5 bg-[#CA5E00]"></div>
                  <span className="text-2xl mt-[-4px]">{mixedFraction.denominator}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative">
              <div className="absolute -bottom-1 -left-1 w-full h-full bg-black rounded-md"></div>
              <div className="absolute -bottom-1 -left-1 w-full h-full bg-black opacity-60 rounded-md"></div>
              <button
                className="relative px-6 py-2 bg-white border border-[#CA5E00] text-[#CA5E00] rounded-md hover:bg-[#CA5E00] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#CA5E00]"
                onClick={handleHintClick}
              >
                See hint
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface MainProps {
  mixedFraction1: MixedFraction;
  mixedFraction2: MixedFraction;
  sendAdminMessage: (role: string, content: string, onComplete?: () => void) => void;
}

const Main: React.FC<MainProps> = ({ mixedFraction1, mixedFraction2, sendAdminMessage }) => {
  const [showSecondFraction, setShowSecondFraction] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const initialMessageShown = useRef(false);

  useEffect(() => {
    if (!initialMessageShown.current) {
      initialMessageShown.current = true;
      sendAdminMessage("agent", "Come on, let's convert this mixed fraction to improper form!")
    }
  }, [sendAdminMessage]);

  const handleFirstFractionComplete = () => {
    setShowSecondFraction(true);
  };

  const handleSecondFractionComplete = () => {
    setShowSuccess(true);  // Show animation immediately
    sendAdminMessage("agent", "Correct, you are a master now. Congratulations!", () => {
      setTimeout(() => {
        setShowSuccess(false);
      }, 1000);
    });
  };

  return (
    <div className={showSuccess ? 'pointer-events-none relative' : ''}>
      <div className="w-full max-w-4xl mx-auto px-6">
        <h1 className="text-3xl text-pink-500 text-center mb-20">
          Let's do some more now!
        </h1>
        <div className="space-y-8">
          <FractionBox 
            mixedFraction={mixedFraction1} 
            onFractionComplete={handleFirstFractionComplete}  
            sendAdminMessage={sendAdminMessage}
          />
          {showSecondFraction && (
            <FractionBox 
              mixedFraction={mixedFraction2}
              onFractionComplete={handleSecondFractionComplete}
              sendAdminMessage={sendAdminMessage}
            />
          )}
        </div>
      </div>
      
      {showSuccess && (
        <div className="fixed inset-0 z-50">
          <SuccessAnimation />
        </div>
      )}
    </div>
  );
};

export default Main;