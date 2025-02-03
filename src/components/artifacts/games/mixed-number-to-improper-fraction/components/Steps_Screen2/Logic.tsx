import { useGameState } from '../../state-utils';
import LockIcon from '@/assets/Lock.png';
import Image from 'next/image';
import { useState } from 'react';

interface ExpressionWithAdditionProps {
  leftNumber: number;
  fraction: {
    numerator: number;
    denominator: number;
  };
}

const QuickHack2 = () => {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { mixedFraction } = gameStateRef.current.state2;
  const { whole, numerator, denominator } = mixedFraction;
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [showNextStep, setShowNextStep] = useState(false);
  const [topAnswer, setTopAnswer] = useState('');
  const [bottomAnswer, setBottomAnswer] = useState('');
  const [showNextStep3, setShowNextStep3] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (parseInt(value) === denominator * whole) {
      setShowNextStep(true);
    }
  };

  const checkAnswers = () => {
    const expectedTop = (denominator * whole) + numerator;
    const expectedBottom = denominator;

    console.log('Expected:', expectedTop, expectedBottom); 
    console.log('Current:', topAnswer, bottomAnswer); 

    if (Number(topAnswer) === expectedTop && Number(bottomAnswer) === expectedBottom) {
      setShowNextStep(false);
      setShowNextStep3(true);
    }
  };

  const ExpressionWithAddition: React.FC<ExpressionWithAdditionProps> = ({ leftNumber, fraction }) => (
    <div className="flex items-center">
      <span className="text-3xl">{leftNumber}</span>
      <div className="relative ml-2">
        <Image 
          src="/img/Addition.png"
          alt="add"
          width={48}
          height={48}
          className="w-12 h-12 absolute -left-2 top-[6px]"
        />
        <div className="inline-flex flex-col items-center ml-8">
          <span className="text-3xl">{fraction.numerator}</span>
          <div className="h-[2px] w-5 bg-black"></div>
          <span className="text-3xl">{fraction.denominator}</span>
        </div>
      </div>
    </div>
  );

  const handleNextLevel = () => {
    setGameStateRef(prev => ({
      ...prev,
      screen: 'third' as const,
      state2: { ...prev.state2, step: 1 }
    }));
  };

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col">
      <div className="w-full max-w-[600px] mx-auto p-4 flex flex-col gap-8">
        {/* Main pink container*/}
        <div className="bg-[#FF497C] rounded-[20px] p-2 flex items-center w-[450px] mx-auto">
          <div className="text-white text-center text-[28px] leading-[32px] w-[120px]">
            Quick
            <br />
            Hack
          </div>

          {/* White box with fraction */}
          <div className="bg-white rounded-xl flex-1 py-3">
            <div className="flex items-center gap-2 text-2xl justify-center">
              <span>{whole}</span>
              <div className="inline-flex flex-col items-center">
                <span>{numerator}</span>
                <div className="h-[2px] w-4 bg-black my-0.5"></div>
                <span>{denominator}</span>
              </div>
              <span>=</span>
              <div className="inline-flex flex-col items-center">
                <span>?</span>
                <div className="h-[2px] w-4 bg-black my-0.5"></div>
                <span>?</span>
              </div>
            </div>
          </div>

          {/* Emoji box */}
          <div className="bg-white rounded-xl w-[80px] h-[80px] ml-1 flex items-center justify-center">
            <span className="text-5xl">🤫</span>
          </div>
        </div>

        {/* Bottom instruction container */}
        <div className="bg-[#FF497C] rounded-[20px] p-3 flex items-center">
          <div className="bg-[#B40033] rounded-xl w-[70px] h-[70px] flex items-center justify-center">
            <Image src={LockIcon} alt="Lock" width={35} height={35} />
          </div>

          <div className="text-white text-[20px] mx-4 flex-1">
            Multiply denominator and <br /> wholes
          </div>

          {/* Expression boxes */}
          <div className="flex items-center gap-3">
            <div className="bg-white rounded-xl px-4 py-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl -mt-3">{whole}</span>
                <Image 
                  src="/img/Multiply.png" 
                  alt="multiply" 
                  width={40} 
                  height={40} 
                  className="w-10 h-10"
                />
                <div className="inline-flex flex-col items-center">
                  <span className="text-2xl">{numerator}</span>
                  <div className="h-[2px] w-4 bg-black"></div>
                  <span className="text-2xl">{denominator}</span>
                </div>
              </div>
            </div>

            {/* Result box */}
            <div className="relative">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-white text-lg whitespace-nowrap">
                {denominator} * {whole}
              </div>
              <div className="bg-white rounded-xl w-[60px] overflow-hidden">
                {showInput ? (
                  <div className="relative">
                    <input
                      value={inputValue}
                      onChange={handleInputChange}
                      className="w-full h-[60px] text-center text-3xl bg-transparent outline-none"
                    />
                  </div>
                ) : (
                  <div 
                    onClick={() => setShowInput(true)}
                    className="h-[60px] flex items-center justify-center cursor-pointer"
                  >
                    <span className="text-3xl">?</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Appears when correct */}
        {showNextStep && (
          <div className="w-full">
            {/* Top instruction container */}
            <div className="bg-[#FF497C] rounded-t-[20px] p-3 flex items-center pb-16">
              <div className="bg-[#B40033] rounded-xl w-[70px] h-[70px] flex items-center justify-center">
                <Image src={LockIcon} alt="Lock" width={35} height={35} />
              </div>

              <div className="text-white text-[20px] mx-4 flex-1">
                Add the numerator,<br />Denominator remains same
              </div>

              {/* White box with expression */}
              <div className="bg-white rounded-xl px-6 py-3">
                <ExpressionWithAddition 
                  leftNumber={denominator * whole}
                  fraction={{ numerator, denominator }}
                />
              </div>
            </div>

            {/* Bottom answer container */}
            <div className="bg-[#B40033] rounded-b-[20px] -mt-10 p-8 pt-16">
              <div className="flex flex-col items-center gap-4">
                <div className="relative w-[80px] h-[80px]">
                  <div className="absolute inset-0 bg-black rounded-xl translate-x-1 translate-y-1 z-0"></div>
                  <input
                    value={topAnswer}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      setTopAnswer(value);
                      const expectedTop = (denominator * whole) + numerator;
                      const expectedBottom = denominator;
                      if (Number(value) === expectedTop && Number(bottomAnswer) === expectedBottom) {
                        setShowNextStep(false);
                        setShowNextStep3(true);
                      }
                    }}
                    className="absolute inset-0 bg-white rounded-xl border-4 border-white text-center text-3xl outline-none z-10"
                    placeholder="?"
                  />
                </div>
                <div className="h-[3px] w-24 bg-white"></div>
                <div className="relative w-[80px] h-[80px]">
                  <div className="absolute inset-0 bg-black rounded-xl translate-x-1 translate-y-1 z-0"></div>
                  <input
                    value={bottomAnswer}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      setBottomAnswer(value);
                      const expectedTop = (denominator * whole) + numerator;
                      const expectedBottom = denominator;
                      if (Number(topAnswer) === expectedTop && Number(value) === expectedBottom) {
                        setShowNextStep(false);
                        setShowNextStep3(true);
                      }
                    }}
                    className="absolute inset-0 bg-white rounded-xl border-4 border-white text-center text-3xl outline-none z-10"
                    placeholder="?"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {showNextStep3 && (
          <div className="w-full">
            <div className="bg-[#FF497C] rounded-t-[20px] p-3 flex items-center pb-16">
              <div className="bg-[#B40033] rounded-xl w-[70px] h-[70px] flex items-center justify-center">
                <Image src={LockIcon} alt="Lock" width={35} height={35} />
              </div>
    
              <div className="text-white text-[20px] mx-4 flex-1">
                Add the numerator,<br />Denominator remains same
              </div>
    
              <div className="bg-white rounded-xl px-6 py-3">
                <ExpressionWithAddition 
                  leftNumber={denominator * whole}
                  fraction={{ numerator, denominator }}
                />
              </div>
            </div>

            {/* Bottom red container */}
            <div className="bg-[#B40033] rounded-b-[20px] -mt-10 p-8">
              <div className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className="bg-white rounded-xl px-4 py-2">
                    <div className="flex flex-col items-center">
                      <span className="text-3xl">{(denominator * whole) + numerator}</span>
                      <div className="h-[2px] w-5 bg-black"></div>
                      <span className="text-3xl">{denominator}</span>
                    </div>
                  </div>
                </div>
                <div className="text-white text-[20px] ml-8">
                  We get the same answer as with pies
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <button
                onClick={handleNextLevel}
                className="px-6 py-3 bg-[#ECFF40] text-black font-bold text-xl hover:bg-[#d9eb37] relative"
                style={{
                  boxShadow: '-4px 4px 0px 0px rgba(0,0,0,1)'
                }}
              >
                Next Level &gt;&gt;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickHack2;
