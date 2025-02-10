import type React from "react"
import { useState, useEffect, useRef } from "react"
import type { MixedFraction } from "../../../game-state"
import Level from "../level"


interface Step1Props {
  mixedFraction: MixedFraction
  onComplete: () => void
  sendAdminMessage: (role: string, content: string, onComplete?: () => void) => void
}

const Step1: React.FC<Step1Props> = ({ mixedFraction, onComplete, sendAdminMessage }) => {

  const [wholeCount, setWholeCount] = useState(0);
  const [quarterCount, setQuarterCount] = useState(0);
  const [canAddQuarters, setCanAddQuarters] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const messageShown = useRef(false);


  useEffect(() => {
    if (!messageShown.current) {
      messageShown.current = true;
    }
  }, []);

  const handleWholeClick = () => {
    if (wholeCount < mixedFraction.whole) {
      setWholeCount(prev => prev + 1);
      if (wholeCount + 1 === mixedFraction.whole) {
        setCanAddQuarters(true);
      }
    }
  };


  const handleQuarterClick = () => {
    if (!canAddQuarters) {
      return;
    }
    if (quarterCount < mixedFraction.numerator) {
      setQuarterCount(prev => prev + 1);
      if (quarterCount + 1 === mixedFraction.numerator) {
        setShowSuccess(true);
        onComplete();
      }
    }
  };

  const renderSliceLines = () => (
    <>
      <line 
        x1="50" 
        y1="50" 
        x2="50" 
        y2="2" 
        stroke="black" 
        strokeWidth="0.5"
      />
      <line 
        x1="50" 
        y1="50" 
        x2="98" 
        y2="50" 
        stroke="black" 
        strokeWidth="0.5"
      />
      <line 
        x1="50" 
        y1="50" 
        x2="50" 
        y2="98" 
        stroke="black" 
        strokeWidth="0.5"
      />
      <line 
        x1="50" 
        y1="50" 
        x2="2" 
        y2="50" 
        stroke="black" 
        strokeWidth="0.5"
      />
    </>
  );

  return (
    <div ref={containerRef} className="w-full min-h-screen bg-pink-50 pt-16">
      <Level mixedFraction={mixedFraction} />

      <div className="w-full">
        <div className="bg-white w-full max-w-4xl mx-auto min-h-[400px] border-2 border-black flex flex-col justify-between">
          <div className="flex justify-between items-center px-8 py-8">
            <div className="flex-1 text-center">
              <h2 className="text-[#FF497C] text-4xl font-medium">Let's create 3 and 2/4ths</h2>
            </div>
            <button
              onClick={() => {
                setWholeCount(0);
                setQuarterCount(0);
                setCanAddQuarters(false);
                setShowSuccess(false);
              }}
              className="text-[#FF497C] text-2xl"
            >
              ↻
            </button>
          </div>

          <div className="flex justify-center gap-8 py-8">
            {[...Array(wholeCount)].map((_, index) => (
              <div key={`whole-${index}`} className="w-28 h-28">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="48" 
                    fill="#98D400" 
                    stroke="black" 
                    strokeWidth="0.5"
                  />
                </svg>
              </div>
            ))}

            {wholeCount === mixedFraction.whole && quarterCount > 0 && (
              <div className="w-28 h-28">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="48" 
                    fill="#98D400" 
                    stroke="black" 
                    strokeWidth="0.5"
                  />
                  {renderSliceLines()}
                  {[...Array(quarterCount)].map((_, i) => {
                    const startAngle = i * (360 / mixedFraction.denominator);
                    const endAngle = (i + 1) * (360 / mixedFraction.denominator);
                    const radius = 48;
                    
                    return (
                      <path
                        key={i}
                        d={`
                          M 50 50
                          L ${50 + radius * Math.cos(startAngle * Math.PI / 180)} ${50 + radius * Math.sin(startAngle * Math.PI / 180)}
                          A ${radius} ${radius} 0 0 1 ${50 + radius * Math.cos(endAngle * Math.PI / 180)} ${50 + radius * Math.sin(endAngle * Math.PI / 180)}
                          Z
                        `}
                        fill="#D3EA00"
                        stroke="black"
                        strokeWidth="0.5"
                      />
                    );
                  })}
                </svg>
              </div>
            )}
          </div>

          <div className="pb-16">
            <div className="flex justify-center gap-4">
              <div className="relative">
                <div className="absolute -bottom-1 -left-1 w-full h-full bg-black rounded-xl"></div>
                <div className="absolute -bottom-1 -left-1 w-full h-full bg-black opacity-60 rounded-xl"></div>
                <button
                  onClick={handleWholeClick}
                  disabled={wholeCount === mixedFraction.whole}
                  className={`relative px-8 py-3 rounded-xl text-2xl ${
                    wholeCount === mixedFraction.whole
                      ? 'bg-white text-[#FF497C] border-2 border-[#FF497C] opacity-50'
                      : 'bg-[white] border-2 border-[#FF497C] text-[#FF497C]'
                  }`}
                >
                  + Whole
                </button>
              </div>

              <div className={`relative ${!canAddQuarters ? 'opacity-50' : ''}`}>
                <div className="absolute -bottom-1 -left-1 w-full h-full bg-black rounded-xl"></div>
                <div className="absolute -bottom-1 -left-1 w-full h-full bg-black opacity-60 rounded-xl"></div>
                <button
                  onClick={handleQuarterClick}
                  disabled={!canAddQuarters || quarterCount === mixedFraction.numerator}
                  className={`relative px-8 py-3 rounded-xl text-2xl ${
                    !canAddQuarters || quarterCount === mixedFraction.numerator
                      ? 'bg-black text-[#FF497C]'
                      : 'border-2 border-[#FF497C] text-[#FF497C] bg-white'
                  }`}
                >
                  + Quarters
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Step1

