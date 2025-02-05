import React, { useState } from 'react';

interface Step3Props {
  numerator: number;
  denominator: number;
  selectedMultiple: number;
  onComplete: () => void;
}

const Step3: React.FC<Step3Props> = ({
  numerator,
  denominator,
  selectedMultiple,
  onComplete
}) => {
  const [wholesAnswer, setWholesAnswer] = useState('');
  const [tenthsAnswer, setTenthsAnswer] = useState('');
  const [showError, setShowError] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, isWholes: boolean) => {
    const value = e.target.value;
    if (value === '' || /^\d$/.test(value)) {
      if (isWholes) {
        setWholesAnswer(value);
      } else {
        setTenthsAnswer(value);
      }
      setShowError(false);
      
      if ((isWholes ? value : wholesAnswer) && (isWholes ? tenthsAnswer : value)) {
        const decimal = Number(numerator * (selectedMultiple/denominator)) / Number(selectedMultiple);
        const userDecimal = Number(`${isWholes ? value : wholesAnswer}.${isWholes ? tenthsAnswer : value}`);
        
        if (Math.abs(userDecimal - decimal) < 0.001) {
          setIsCorrect(true);
          onComplete();
        } else {
          setShowError(true);
          setIsCorrect(false);
          setTimeout(() => setShowError(false), 2000);
        }
      }
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

      {/* Bottom section - very light green to blue gradient */}
      <div className="w-full flex-1 bg-gradient-to-b from-[#E8F5EA] via-[#B7E5AA] via-[#90D7E7] to-[#70CAEF]">
        <div className="w-full pt-24 pb-18 flex flex-col items-center">
          <div className="relative w-[706px]">
            <div className="absolute -left-1 top-1 bg-black rounded-lg w-full h-[69px]"></div>
            
            <div className="bg-[#8E3D00] text-white rounded-lg flex justify-center items-center relative w-full h-[69px]">
              <span className="text-[35px] font-bold tracking-wide">
                STEP 3 : Write as Decimal
              </span>
            </div>
          </div>

          {/* Fractions Display Section */}
          <div className="mt-16 flex items-center gap-8">
            {/* First Fraction */}
            <div className="bg-white py-6 px-4 shadow-lg">
              <div className="flex flex-col items-center">
                <span className="text-4xl">{numerator}</span>
                <div className="w-11 h-0.5 bg-black my-4"></div>
                <span className="text-4xl">{denominator}</span>
              </div>
            </div>

            <span className="text-4xl">=</span>

            {/* Second Fraction (from Step 2) */}
            <div className="bg-white py-6 px-4 shadow-lg">
              <div className="flex flex-col items-center">
                <span className="text-4xl">{numerator * (selectedMultiple/denominator)}</span>
                <div className="w-11 h-0.5 bg-black my-4"></div>
                <span className="text-4xl">{selectedMultiple}</span>
              </div>
            </div>

            <span className="text-4xl">=</span>

            {/* Decimal Input Boxes */}
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 relative">
                <div className="flex flex-col items-center">
                  <div className={`bg-white border-2 border-black w-16 h-16 flex items-center justify-center ${
                    showError ? 'bg-red-200' : ''
                  }`}>
                    <input
                      type="text"
                      value={wholesAnswer}
                      onChange={(e) => handleInputChange(e, true)}
                      className="w-full h-full text-center text-4xl outline-none bg-transparent"
                      placeholder="?"
                      maxLength={1}
                    />
                  </div>
                  <div className="text-2xl mt-2">wholes</div>
                </div>

                <span className="text-7xl font-bold absolute left-[4.2rem] top-1">.</span>

                <div className="flex flex-col items-center">
                  <div className={`bg-white border-2 border-black w-16 h-16 flex items-center justify-center ${
                    showError ? 'bg-red-200' : ''
                  }`}>
                    <input
                      type="text"
                      value={tenthsAnswer}
                      onChange={(e) => handleInputChange(e, false)}
                      className="w-full h-full text-center text-4xl outline-none bg-transparent"
                      placeholder="?"
                      maxLength={1}
                    />
                  </div>
                  <div className="text-2xl mt-2">tenths</div>
                </div>
              </div>

              {/* Next Question Button - Only shows when answer is correct */}
              {isCorrect && (
                <div className="mt-16">
                  <div className="relative">
                    <div className="absolute left-[2px] top-[2px] bg-black rounded-lg px-8 py-4">
                      <span className="opacity-0 text-2xl">Move to next question!</span>
                    </div>
                    <button 
                      className="bg-white text-[#8E3D00] px-8 py-4 rounded-lg text-2xl relative border-2 border-[#8E3D00] hover:opacity-90"
                      onClick={onComplete}
                    >
                      Move to next question!
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3;
