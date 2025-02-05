import React, { useState } from 'react';

interface Step1Props {
  numerator: number;
  denominator: number;
  onComplete: (multiple: number) => void;
}

const Step1: React.FC<Step1Props> = ({
  numerator,
  denominator,
  onComplete
}) => {
  const [error, setError] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [answer1, setAnswer1] = useState('');
  const [answer2, setAnswer2] = useState('');

  const checkMultiple = (selected: number) => {
    const isMultipleOf10 = denominator % 10 === 0;
    const isMultipleOf100 = denominator % 100 === 0;

    if (isMultipleOf10 && isMultipleOf100) {
      if (selected === 10) {
        onComplete(10);
        return;
      }
    }

    if ((isMultipleOf10 && selected === 10) || (isMultipleOf100 && selected === 100)) {
      onComplete(selected);
      return;
    }

    const diffFrom10 = Math.abs(denominator - 10);
    const diffFrom100 = Math.abs(denominator - 100);
    
    if (diffFrom10 <= diffFrom100 && selected === 10) {
      onComplete(10);
      return;
    }

    if (diffFrom100 < diffFrom10 && selected === 100) {
      onComplete(100);
      return;
    }

    setError(true);
    setShowVerification(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, setAnswer: (value: string) => void) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setAnswer(value);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      {/* Top section - yellow to green gradient */}
      <div className="w-full bg-gradient-to-b from-[#F8F58A] via-[#B7E5AA] to-[#B7E5AA] pb-12">
        {/* Level and Practice Header */}
        <div className="mt-12 relative w-[400px] h-[69px] mx-auto">
          <div className="relative">
            <div className="absolute left-[2px] top-[2px] bg-black rounded-lg w-full h-[61px]"></div>
            
            <div className="bg-[#8E3D00] text-white rounded-lg flex items-center relative w-full h-[61px]">
              <div className="pl-10">
                <span className="text-[35px] font-bold tracking-wide">LEVEL 4</span>
              </div>
              
              <div className="absolute -right-1 h-full flex items-center">
                <div className="absolute right-[2px] top-[2px] w-[220px] h-full">
                  <div className="absolute inset-0 bg-black rounded-lg"></div>
                  <div className="absolute inset-0 bg-black rounded-lg opacity-60"></div>
                </div>
                
                <div className="bg-white text-[#8E3D00] px-8 h-full flex items-center justify-center rounded-lg border-[3px] border-[#8E3D00] relative min-w-[220px]">
                  <span className="text-[35px] font-bold tracking-wide">PRACTICE</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Question with Fraction */}
        <div className="text-center mt-16 w-[381px] mx-auto text-[32px] font-medium">
          <span>What is </span>
          <span className="inline-flex flex-col items-center justify-center mx-2">
            <span>{numerator}</span>

            <div className="w-6 h-0.5 bg-black my-1"></div>
            <span>{denominator}</span>
          </span>
          <span> in decimals ?</span>
        </div>
      </div>

      <div className="w-full flex-1 bg-gradient-to-b from-[#E8F5EA] via-[#B7E5AA] via-[#90D7E7] to-[#70CAEF]">
        <div className="w-full pt-24 pb-18 flex flex-col items-center">
          <div className="relative w-[700px]">
            <div className="absolute -left-1 top-1 bg-black rounded-lg w-full h-[61px]"></div>
            
            <div className="bg-[#8E3D00] text-white rounded-lg flex items-center relative w-full h-[61px] px-16">
              <span className="text-[28px] font-bold text-center">
                STEP 1 : Change the denominator to a multiple of 10.
              </span>
            </div>
          </div>

          <div className="w-full flex-1 flex flex-col items-center pt-16">
            <div className="bg-white py-12 px-6 shadow-lg">
              <div className="flex flex-col items-center">
                <span className="text-4xl">{numerator}</span>
                <div className="w-11 h-0.5 bg-black my-4"></div>
                <span className="text-4xl">{denominator}</span>
              </div>
            </div>

            {!showVerification ? (
              <>
                <div className="mt-16 text-4xl font-medium">
                  Which is the closest multiple?
                </div>

                <div className="mt-10 mb-16 flex gap-12">
                  <div className="relative">
                    <div className="absolute left-[2px] top-[2px] bg-black rounded-lg px-12 py-3">
                      <span className="text-2xl opacity-0">10</span>
                    </div>
                    <button 
                      className="bg-[#8E3D00] text-white px-12 py-3 rounded-lg text-2xl relative hover:opacity-90"
                      onClick={() => checkMultiple(10)}
                    >
                      10
                    </button>
                  </div>

                  <div className="relative">
                    <div className="absolute left-[2px] top-[2px] bg-black rounded-lg px-12 py-3">
                      <span className="text-2xl opacity-0">100</span>
                    </div>
                    <button 
                      className="bg-[#8E3D00] text-white px-12 py-3 rounded-lg text-2xl relative hover:opacity-90"
                      onClick={() => checkMultiple(100)}
                    >
                      100
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="mt-16 text-4xl font-medium">
                  Let's verify!
                </div>

                <div className="mt-10 flex flex-col items-center gap-8">
                  {/* First equation */}
                  <div className="flex items-center justify-center gap-6 text-3xl">
                    <span className="w-8 text-center">{denominator}</span>
                    <span>X</span>
                    <div className="w-12 h-12 bg-white border-2 border-black flex items-center justify-center">
                      <input
                        type="text"
                        value={answer1}
                        onChange={(e) => handleInputChange(e, setAnswer1)}
                        className="w-full h-full text-center text-3xl outline-none"
                        maxLength={2}
                      />
                    </div>
                    <span>=</span>
                    <span>10</span>
                  </div>

                  {/* Second equation */}
                  <div className="flex items-center justify-center gap-6 text-3xl pl-3">
                    <span className="w-8 text-center">{denominator}</span>
                    <span>X</span>
                    <div className="w-12 h-12 bg-white border-2 border-black flex items-center justify-center">
                      <input
                        type="text"
                        value={answer2}
                        onChange={(e) => handleInputChange(e, setAnswer2)}
                        className="w-full h-full text-center text-3xl outline-none"
                        maxLength={2}
                      />
                    </div>
                    <span>=</span>
                    <span>100</span>
                  </div>
                </div>

                <div className="mt-16 text-4xl font-medium">
                  Which is a suitable multiple?
                </div>

                <div className="mt-10 mb-16 flex gap-12">
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1; 