import React, { useEffect, useRef, useState } from 'react';
import { useGameState } from '../../state-utils';
import type { MixedFraction } from '../../game-state';

interface WelcomeProps {
  mixedFraction: MixedFraction;
  sendAdminMessage: (role: string, content: string, onComplete?: () => void) => void;
}

const Welcome: React.FC<WelcomeProps> = ({ mixedFraction, sendAdminMessage }) => {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { whole, numerator, denominator } = mixedFraction;
  const messageShown = useRef(false);
  const [showTryButton, setShowTryButton] = useState(false);

  useEffect(() => {
    if (!messageShown.current) {
      sendAdminMessage(
        "agent",
        "Here's a reward for your last quest, a quick way to make improper fraction.",
        () => {
          setTimeout(() => {
            sendAdminMessage(
              "agent",
              "Let's try out the same question, and see if we can get to the answer faster",
              () => setShowTryButton(true)
            )
          }, 1000)
        }
      )
      messageShown.current = true;
    }
  }, []);

  const handleTryClick = () => {
    setGameStateRef(prev => ({
      ...prev,
      state2: { ...prev.state2, step: 1 }
    }));
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* Header box */}
      <div className="border-[14.51px] border-[#FF497C] bg-white mb-10">
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

      {/* Middle box */}
      <div className="border-[14.51px] border-[#FF497C] bg-white mb-10">
        <h3 className="text-[#FF497C] text-[55px] py-4 text-center tracking-wide">
          A quicker way
        </h3>
      </div>

      {/* Try button with shadow effect */}
      {showTryButton && (
        <div className="flex justify-center">
          <div className="relative w-[250px]">
            {/* Black shadow boxes */}
            <div className="absolute -bottom-2 -left-2 w-full h-full bg-black"></div>
            <div className="absolute -bottom-2 -left-2 w-full h-full bg-black opacity-60"></div>
            
            {/* Main button */}
            <button 
              onClick={handleTryClick}
              className="relative w-full border-[12.69px] border-[#FF497C] py-3 bg-white"
            >
              <span className="text-[#FF497C] text-[35px] tracking-wide">Try &gt;&gt;</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Welcome