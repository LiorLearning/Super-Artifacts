import React, { useState, useRef, useEffect } from 'react';

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
  const [showNextButton, setShowNextButton] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showVerification && showNextButton && containerRef.current) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [showVerification, showNextButton]);

  const checkMultiple = (selected: number) => {
   
    const correctMultiple = determineCorrectMultiple(denominator);
    
    if (selected === correctMultiple) {
      onComplete(correctMultiple);
      return;
    }
    
   
    setError(true);
    setShowVerification(true);
  };


  const determineCorrectMultiple = (denom: number) => {

    if (denom === 2 || denom === 5 || 
        (denom % 2 === 0 && denom % 5 === 0)) {
      return 10;
    }
    

    return 100;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, isFirstInput: boolean) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      if (isFirstInput) {
        setAnswer1(value);
      } else {
        setAnswer2(value);
      }
      
      const newAnswer1 = isFirstInput ? value : answer1;
      const newAnswer2 = isFirstInput ? answer2 : value;
      
      if (newAnswer1 !== '' && newAnswer2 !== '') {
        const isAnswer1Correct = Number(newAnswer1) * denominator === 10;
        const isAnswer2Correct = Number(newAnswer2) * denominator === 100;
        
        if (isAnswer1Correct && isAnswer2Correct) {
          setShowNextButton(true);
        }
      }
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen flex flex-col items-center relative">
      {showVerification && showNextButton && (
        <div className="absolute top-[30px] right-[60px] z-50">
          <div className="relative">
            <div className="absolute left-[2px] top-[2px] bg-[#333333] w-full h-full rounded-full"></div>
            <button 
              className="relative bg-white text-[#008294] w-[56px] h-[56px] text-4xl font-medium rounded-full flex items-center justify-center shadow-sm"
              onClick={() => onComplete(10)}
            >
              ≫
            </button>
          </div>
        </div>
      )}

      {/* Top section - yellow to green gradient */}
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

      {/* Bottom section - blue gradient */}
      <div className="w-full flex-1 bg-gradient-to-b from-[#E8F5F9] via-[#B7E5F0] to-[#70CAEF]">
        <div className="w-full pt-24 pb-32 flex flex-col items-center">
        <div className="relative w-[700px]">
        <div className="absolute -left-1 top-1 bg-black rounded-lg w-full h-[61px]"></div>
            
        <div className="bg-[#8E3D00] text-white rounded-lg flex items-center relative w-full h-[61px] px-16">
        <span className="text-[28px] text-center">
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

                <div className="mt-10 mb-32 flex flex-col items-center gap-12 relative w-[400px]">
                  {/* First equation */}
                  <div className="flex items-center justify-between w-full text-3xl">
                    <span className="w-12 text-center">{denominator}</span>
                    <span>X</span>
                    <div className="w-16 h-16 bg-white border-2 border-black flex items-center justify-center">
                      <input
                        type="text"
                        value={answer1}
                        onChange={(e) => handleInputChange(e, true)}
                        className="w-full h-full text-center text-3xl outline-none"
                        maxLength={2}
                      />
                    </div>
                    <span>=</span>
                    <span className="w-16 text-center">10</span>
                  </div>

                  {/* Second equation */}
                  <div className="flex items-center justify-between w-full text-3xl">
                    <span className="w-12 text-center">{denominator}</span>
                    <span>X</span>
                    <div className="w-16 h-16 bg-white border-2 border-black flex items-center justify-center">
                      <input
                        type="text"
                        value={answer2}
                        onChange={(e) => handleInputChange(e, false)}
                        className="w-full h-full text-center text-3xl outline-none"
                        maxLength={2}
                      />
                    </div>
                    <span>=</span>
                    <span className="w-16 text-center">100</span>
                  </div>
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