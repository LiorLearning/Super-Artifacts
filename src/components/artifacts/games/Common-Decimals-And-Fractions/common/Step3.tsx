import React, { useState, useEffect, useRef } from 'react';

interface Step3Props {
  numerator: number;
  denominator: number;
  selectedMultiple: number;
  onComplete: () => void;
  isLastQuestion?: boolean;
  isGameComplete?: boolean;
}

const Step3: React.FC<Step3Props> = ({
  numerator,
  denominator,
  selectedMultiple,
  onComplete,
  isLastQuestion,
  isGameComplete
}) => {
  const [wholesAnswer, setWholesAnswer] = useState('');
  const [tenthsAnswer, setTenthsAnswer] = useState('');
  const [hundredthsAnswer, setHundredthsAnswer] = useState('');
  const [showError, setShowError] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isCorrect && buttonRef.current) {
      setTimeout(() => {
        buttonRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }, 100);
    }
  }, [isCorrect]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, position: 'wholes' | 'tenths' | 'hundredths') => {
    const value = e.target.value;
    if (value === '' || /^\d$/.test(value)) {
      switch(position) {
        case 'wholes':
          setWholesAnswer(value);
          break;
        case 'tenths':
          setTenthsAnswer(value);
          break;
        case 'hundredths':
          setHundredthsAnswer(value);
          break;
      }
      setShowError(false);
      
      const wholes = position === 'wholes' ? value : wholesAnswer;
      const tenths = position === 'tenths' ? value : tenthsAnswer;
      const hundredths = position === 'hundredths' ? value : hundredthsAnswer;
      
      const decimal = Number(numerator) / Number(denominator);
      
      if (selectedMultiple === 100) {
        if (tenths !== '' && hundredths !== '') {
          const userDecimal = Number(`${wholes || '0'}.${tenths}${hundredths}`);
          if (Math.abs(userDecimal - decimal) < 0.0001) {
            setIsCorrect(true);
            setShowError(false);
          } else {
            setIsCorrect(false);
            setShowError(true);
            setTimeout(() => setShowError(false), 2000);
          }
        }
      } else {
        if (tenths !== '') {
          const userDecimal = Number(`${wholes || '0'}.${tenths}`);
          if (Math.abs(userDecimal - decimal) < 0.0001) {
            setIsCorrect(true);
            setShowError(false);
          } else {
            setIsCorrect(false);
            setShowError(true);
            setTimeout(() => setShowError(false), 2000);
          }
        }
      }
    }
  };

  const getDecimalDigits = (num: number, denom: number) => {
    const decimal = Number(num) / Number(denom);
    return {
      tenths: Math.floor((decimal * 10) % 10),
      hundredths: Math.floor((decimal * 100) % 10)
    };
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="w-full bg-gradient-to-b from-[#F8F58A] via-[#B7E5AA] to-[#B7E5AA] pb-16">
        <div className="mt-12 relative w-[400px] h-[69px] mx-auto">
          <div className="relative">

            <div className="absolute left-[2px] top-[2px] bg-black rounded-lg w-full h-[61px]"></div>
            
            <div className="bg-[#8E3D00] text-white rounded-lg flex items-center relative w-full h-[65px]">
              <div className="pl-10">
                <span className="text-[35px] tracking-wide">LEVEL 4</span>
              </div>

              
              <div className="absolute -right-1 h-full flex items-center">
                <div className="absolute right-[2px] top-[2px] w-[220px] h-full">
                  <div className="absolute inset-0 bg-black rounded-lg"></div>
                  <div className="absolute inset-0 bg-black rounded-lg opacity-60"></div>
                </div>
                
                <div className="bg-white text-[#8E3D00] px-8 h-full flex items-center justify-center rounded-lg border-[3px] border-[#8E3D00] relative min-w-[220px]">
                  <span className="text-[35px] tracking-wide">PRACTICE</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Question with Fraction */}
        <div className="text-center mt-16 w-[381px] mx-auto text-[40px] font-medium flex items-center justify-center gap-4">
          <span>What is</span>
          <div className="inline-flex flex-col items-center justify-center">
            <span className="text-[30px] leading-tight">{numerator}</span>

            <div className="w-8 h-[3px] bg-black"></div>
            <span className="text-[30px] leading-tight">{denominator}</span>
          </div>

          <span>in decimals ?</span>
        </div>
      </div>

      <div className="w-full flex-1 bg-gradient-to-b from-[#E8F5F9] via-[#B7E5F0] to-[#70CAEF]">
        <div className="w-full pt-24 pb-32 flex flex-col items-center">
          <div className="relative w-[706px]">
            <div className="absolute -left-1 top-1 bg-black rounded-lg w-full h-[69px]"></div>
            
            <div className="bg-[#8E3D00] text-white rounded-lg flex justify-center items-center relative w-full h-[69px]">
              <span className="text-[35px] tracking-wide">
                STEP 3 : Write as Decimal
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="mt-16 flex items-center gap-8">
              <div className="bg-white py-6 px-8 shadow-lg">
                <div className="flex flex-col items-center">
                  <span className="text-[45px]">{numerator}</span>
                  <div className="w-14 h-0.5 bg-black my-4"></div>
                  <span className="text-[45px]">{denominator}</span>
                </div>
              </div>

              <span className="text-[45px]">=</span>

              <div className="bg-white py-6 px-8 shadow-lg">
                <div className="flex flex-col items-center">
                  <span className="text-[45px]">{numerator * (selectedMultiple/denominator)}</span>
                  <div className="w-14 h-0.5 bg-black my-4"></div>
                  <span className="text-[45px]">{selectedMultiple}</span>
                </div>
              </div>

              <span className="text-[45px]">=</span>

              <div className="flex items-center gap-6">
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <div className="absolute left-[3px] top-[3px] bg-black w-20 h-20"></div>
                    <div className={`relative bg-white w-20 h-20 flex items-center justify-center ${
                      wholesAnswer && Number(wholesAnswer) === Math.floor(Number(numerator) / Number(denominator))
                        ? 'bg-green-50'
                        : wholesAnswer
                        ? 'bg-red-50'
                        : ''
                    }`}>
                      <input
                        type="text"
                        value={wholesAnswer}
                        onChange={(e) => handleInputChange(e, 'wholes')}
                        className={`w-full h-full text-center text-[45px] outline-none ${
                          wholesAnswer && Number(wholesAnswer) === Math.floor(Number(numerator) / Number(denominator))
                            ? 'text-green-600'
                            : wholesAnswer
                            ? 'text-red-500'
                            : ''
                        } bg-transparent`}
                        placeholder="?"
                        maxLength={1}
                      />
                    </div>
                  </div>
                  <div className="text-2xl mt-4">wholes</div>
                </div>

                <div className="flex flex-col items-center justify-end h-20 pb-4">
                  <span className="text-[65px] text-center">.</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="relative">
                    <div className="absolute left-[3px] top-[3px] bg-black w-20 h-20"></div>
                    <div className={`relative bg-white w-20 h-20 flex items-center justify-center ${
                      tenthsAnswer && Number(tenthsAnswer) === getDecimalDigits(numerator, denominator).tenths
                        ? 'bg-green-50'
                        : tenthsAnswer
                        ? 'bg-red-50'
                        : ''
                    }`}>
                      <input
                        type="text"
                        value={tenthsAnswer}
                        onChange={(e) => handleInputChange(e, 'tenths')}
                        className={`w-full h-full text-center text-[45px] outline-none ${
                          tenthsAnswer && Number(tenthsAnswer) === getDecimalDigits(numerator, denominator).tenths
                            ? 'text-green-600'
                            : tenthsAnswer
                            ? 'text-red-500'
                            : ''
                        } bg-transparent`}
                        placeholder="?"
                        maxLength={1}
                      />
                    </div>
                  </div>
                  <div className="text-2xl mt-4">tenths</div>
                </div>

                {selectedMultiple === 100 && (
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <div className="absolute left-[3px] top-[3px] bg-black w-20 h-20"></div>
                      <div className={`relative bg-white w-20 h-20 flex items-center justify-center ${
                        hundredthsAnswer && Number(hundredthsAnswer) === getDecimalDigits(numerator, denominator).hundredths
                          ? 'bg-green-50'
                          : hundredthsAnswer
                          ? 'bg-red-50'
                          : ''
                      }`}>
                        <input
                          type="text"
                          value={hundredthsAnswer}
                          onChange={(e) => handleInputChange(e, 'hundredths')}
                          className={`w-full h-full text-center text-[45px] outline-none ${
                            hundredthsAnswer && Number(hundredthsAnswer) === getDecimalDigits(numerator, denominator).hundredths
                              ? 'text-green-600'
                              : hundredthsAnswer
                              ? 'text-red-500'
                              : ''
                          } bg-transparent`}
                          placeholder="?"
                          maxLength={1}
                        />
                      </div>
                    </div>
                    <div className="text-2xl mt-4">hundredths</div>
                  </div>
                )}
              </div>
            </div>

            {isCorrect && !isLastQuestion && (
              <div ref={buttonRef} className="mt-32 mb-16">
                <div className="relative">
                  <div className="absolute left-[4px] top-[4px] bg-[#333333] w-full h-full"></div>
                  <button 
                    className="relative bg-white text-[#008294] px-16 py-6 text-[32px] font-medium hover:opacity-90 min-w-[400px]"
                    onClick={() => onComplete()}
                  >
                    Move to next question!
                  </button>
                </div>
              </div>
            )}

            {isCorrect && isLastQuestion && !isGameComplete && (
              <div ref={buttonRef} className="mt-32 mb-16">
                <div className="relative">
                  <div className="absolute left-[4px] top-[4px] bg-[#333333] w-full h-full"></div>
                  <button 
                    className="relative bg-white text-[#008294] px-16 py-6 text-[32px] font-medium hover:opacity-90 min-w-[400px]"
                    onClick={() => onComplete()}
                  >
                    Continue to next level
                  </button>
                </div>
              </div>
            )}

            {isCorrect && isLastQuestion && isGameComplete && (
              <div ref={buttonRef} className="mt-32 mb-16 text-[32px] text-[#008294] font-medium">
                Congratulations! You've completed the game!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3;
