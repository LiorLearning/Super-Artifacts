import React from 'react';
import { useGameState } from '../../state-utils';
import type { MixedFraction } from '../../game-state';

interface WelcomeProps {
  mixedFraction: MixedFraction;
  sendAdminMessage: (role: string, content: string, onComplete?: () => void) => void;
}

const Welcome: React.FC<WelcomeProps> = ({ mixedFraction }) => {
  const { setGameStateRef } = useGameState();
  const { whole, numerator, denominator } = mixedFraction;

  const handleStartClick = () => {
    setGameStateRef(prev => ({
      ...prev,
      state2: { ...prev.state2, step: 1 }
    }));
  };

  return (
    <div className="flex flex-col items-center justify-start h-screen pt-16">
      {/* Header box */}
      <div className="w-[800px] border-[14.51px] border-[#FF497C] bg-white">
        <div className="flex">
          {/* Quick Hack section */}
          <div className="w-[280px] p-10 border-r-[14.51px] border-[#FF497C]">
            <h2 className="text-[#FF497C] text-[50px] leading-[55px] text-center">
              Quick
              <br />
              Hack
            </h2>
          </div>
          {/* Fraction section */}
          <div className="flex-1 flex items-center justify-center p-10">
            <div className="flex items-center gap-3 text-5xl">
              <span>{whole}</span>
              <div className="inline-flex flex-col items-center">
                <span>{numerator}</span>
                <div className="h-[3px] w-9 bg-black my-1"></div>
                <span>{denominator}</span>
              </div>
              <span>=</span>
              <div className="inline-flex flex-col items-center">
                <span>?</span>
                <div className="h-[3px] w-9 bg-black my-1"></div>
                <span>?</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Start button with shadow effect */}
      <div className="mt-8">
        <div className="relative w-[250px]">
          <div className="absolute -bottom-2 -left-2 w-full h-full bg-black"></div>
          <div className="absolute -bottom-2 -left-2 w-full h-full bg-black opacity-60"></div>
          
          <button 
            onClick={handleStartClick}
            className="relative w-full border-[12.69px] border-[#FF497C] py-3 bg-white"
          >
            <span className="text-[#FF497C] text-[35px] tracking-wide">START &gt;&gt;</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;