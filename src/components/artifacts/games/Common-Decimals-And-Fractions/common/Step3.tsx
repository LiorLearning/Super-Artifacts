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
      
      const wholes = isWholes ? value : wholesAnswer;
      const tenths = isWholes ? tenthsAnswer : value;
      
      if (wholes !== '' && tenths !== '') {
        
        const decimal = Number(numerator) / Number(denominator);
        
        
        const userDecimal = Number(`${wholes}.${tenths}`);
        
        //console.log('Expected:', decimal, 'User:', userDecimal);
        
        if (Math.abs(userDecimal - decimal) ==0) {
          setIsCorrect(true);
          setShowError(false);
        } else {
          setIsCorrect(false);
          setShowError(true);
          setTimeout(() => setShowError(false), 2000);
        }
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      {/* Top section - yellow to green gradient */}
      <div className="w-full bg-gradient-to-b from-[#F8F58A] via-[#B7E5AA] to-[#B7E5AA] pb-12">
        <div className="mt-12 relative w-[400px] h-[69px] mx-auto">
          <div className="relative">
            <div className="absolute left-[2px] top-[2px] bg-black rounded-lg w-full h-[61px]"></div>
            
            <div className="bg-[#8E3D00] text-white rounded-lg flex items-center relative w-full h-[61px]">
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
        <div className="text-center mt-16 w-[381px] mx-auto text-[32px] font-medium flex items-center justify-center gap-4">
          <span>What is</span>
          <div className="inline-flex flex-col items-center justify-center">
            <span className="text-[30px] leading-tight">{numerator}</span>
            <div className="w-8 h-[3px] bg-black"></div>
            <span className="text-[30px] leading-tight">{denominator}</span>
          </div>

          <span>in decimals ?</span>
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

          {/* Main Content Container */}
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

              {/* Second Fraction */}
              <div className="bg-white py-6 px-8 shadow-lg">
                <div className="flex flex-col items-center">
                  <span className="text-[45px]">{numerator * (selectedMultiple/denominator)}</span>
                  <div className="w-14 h-0.5 bg-black my-4"></div>
                  <span className="text-[45px]">{selectedMultiple}</span>
                </div>
              </div>

              <span className="text-[45px]">=</span>

              {/* Decimal Input Boxes */}
              <div className="flex items-center gap-6">
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <div className="absolute left-[3px] top-[3px] bg-black w-20 h-20"></div>
                    <div className={`relative bg-white  w-20 h-20 flex items-center justify-center ${
                      showError ? 'bg-red-200' : ''
                    }`}>
                      <input
                        type="text"
                        value={wholesAnswer}
                        onChange={(e) => handleInputChange(e, true)}
                        className="w-full h-full text-center text-[45px] outline-none bg-transparent"
                        placeholder="?"
                        maxLength={1}
                      />
                    </div>
                  </div>
                  <div className="text-2xl mt-4">wholes</div>
                </div>

                <div className="flex flex-col items-center justify-end h-20 pb-4">
                  <span className="text-[65px] text-center font-bold">.</span>
                </div>


                <div className="flex flex-col items-center">
                  <div className="relative">
                    <div className="absolute left-[3px] top-[3px] bg-black w-20 h-20"></div>
                    <div className={`relative bg-white w-20 h-20 flex items-center justify-center ${
                      showError ? 'bg-red-200' : ''
                    }`}>
                      <input

                        type="text"
                        value={tenthsAnswer}
                        onChange={(e) => handleInputChange(e, false)}
                        className="w-full h-full text-center text-[45px] outline-none bg-transparent"
                        placeholder="?"
                        maxLength={1}
                      />
                    </div>
                  </div>
                  <div className="text-2xl mt-4">tenths</div>
                </div>
              </div>
            </div>

            {/* Next Button Section - Separated from the expression */}
            {isCorrect && (
              <div className="mt-32">
                <div className="relative">
                  <div className="absolute left-[4px] top-[4px] bg-[#333333] w-full h-full"></div>
                  
                  <button 
                    className="relative bg-white text-[#008294] px-16 py-6 text-[32px] font-medium hover:opacity-90 min-w-[400px]"
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
  );
};

export default Step3;
