import React, { useState } from 'react';
import arrowImage from '../assets/arrow.png';
import downArrowImage from '../assets/downArrow.png';

interface Step2Props {
  numerator: number;
  denominator: number;
  selectedMultiple: number;
  onComplete: () => void;
}

const Step2: React.FC<Step2Props> = ({
  numerator,
  denominator,
  selectedMultiple,
  onComplete
}) => {
  const [bottomAnswer, setBottomAnswer] = useState('');
  const [answer, setAnswer] = useState('');
  const [numeratorAnswer, setNumeratorAnswer] = useState('');
  const [activeStep, setActiveStep] = useState<'bottom' | 'fraction'>('bottom');
  const [showError, setShowError] = useState(false);

  const checkAnswers = () => {
    const multiplier = selectedMultiple / denominator;
    
    if (activeStep === 'bottom' && bottomAnswer) {
      const isCorrect = Number(bottomAnswer) === multiplier;
      if (isCorrect) {
        setAnswer(bottomAnswer);
        setActiveStep('fraction');
      } else {
        setShowError(true);
        setTimeout(() => setShowError(false), 2000);
      }
    } else if (activeStep === 'fraction' && numeratorAnswer) {
      const expectedNumerator = numerator * Number(answer);
      const isCorrect = Number(numeratorAnswer) === expectedNumerator;
      
      if (isCorrect) {
        setTimeout(() => onComplete(), 300);
      } else {
        setShowError(true);
        setTimeout(() => setShowError(false), 2000);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (value: string) => void) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setter(value);
      setShowError(false);
      if (value) {
        if (setter === setNumeratorAnswer) {
          const expectedNumerator = numerator * Number(answer);
          if (Number(value) === expectedNumerator) {
            setTimeout(() => onComplete(), 300);
          }
        } else if (setter === setBottomAnswer) {
          const multiplier = selectedMultiple / denominator;
          if (Number(value) === multiplier) {
            setAnswer(value);
            setActiveStep('fraction');
          }
        }
        checkAnswers();
      }
    }
  };

  const getErrorStyle = () => {
    return showError ? 'bg-red-200' : 'bg-white';
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
                STEP 2 : Write the equivalent fraction
              </span>
            </div>
          </div>

          {/* Fraction Conversion Layout */}
          <div className="relative mt-16 flex flex-col items-center">
            <div className="relative w-[300px] h-[60px] mb-8">
              <img 
                src={arrowImage.src}
                alt="" 
                className="absolute w-[150px] h-[40px] left-1/2 -translate-x-1/2 top-4"
              />
              
              {/* Question box and multiplication symbol container */}
              <div className="absolute left-1/2 -translate-x-1/2 top-0 flex items-center">
                <span className="text-3xl mr-1">X</span>
                <div className="bg-white border-2 border-black w-10 h-10 flex items-center justify-center">
                  <input
                    type="text"
                    value={answer}
                    className="w-full h-full text-center text-2xl outline-none bg-transparent opacity-50"
                    maxLength={2}
                    placeholder="?"
                    disabled={true}
                  />
                </div>
              </div>
            </div>

            {/* Fractions Row */}
            <div className="flex items-center gap-8">
              <div className="bg-white py-6 px-4 shadow-lg">
                <div className="flex flex-col items-center">
                  <span className="text-4xl">{numerator}</span>
                  <div className="w-11 h-0.5 bg-black my-4"></div>
                  <span className="text-4xl">{denominator}</span>
                </div>
              </div>

              <span className="text-4xl">=</span>

              {/* Target fraction */}
              <div className="bg-white py-6 px-4 shadow-lg">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 flex items-center justify-center ${getErrorStyle()}`}>
                    <input
                      type="text"
                      value={numeratorAnswer}
                      onChange={(e) => handleInputChange(e, setNumeratorAnswer)}
                      className={`w-full h-full text-center text-4xl outline-none bg-transparent ${
                        activeStep !== 'fraction' ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      maxLength={2}
                      placeholder="?"
                      disabled={activeStep !== 'fraction'}
                    />
                  </div>
                  <div className="w-11 h-0.5 bg-black my-4"></div>
                  <span className="text-4xl">{selectedMultiple}</span>
                </div>
              </div>
            </div>

            {/* Bottom Arrow and Input */}
            <div className="relative mt-6 flex flex-col items-center">
              <div className="relative w-[300px] h-[60px] mb-6">
                <img 
                  src={downArrowImage.src}
                  alt="" 
                  className="absolute w-[150px] h-[40px] left-1/2 -translate-x-1/2 top-1"
                />
                
                {/* Question box and multiplication symbol container */}
                <div className="absolute left-1/2 top-4 -translate-x-1/2 flex items-center">
                  <span className="text-3xl mr-1">X</span>
                  <div className="bg-white border-2 border-black w-10 h-10 flex items-center justify-center">
                    <input
                      type="text"
                      value={bottomAnswer}
                      onChange={(e) => handleInputChange(e, setBottomAnswer)}
                      className="w-full h-full text-center text-2xl outline-none bg-transparent"
                      maxLength={2}
                      placeholder="?"
                      disabled={activeStep !== 'bottom'}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2;

