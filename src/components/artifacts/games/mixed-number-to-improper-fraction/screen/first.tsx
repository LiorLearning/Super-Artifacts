import React, { useEffect, useRef, useState } from "react"
import { useGameState } from "../state-utils"
import Header from "../components/Steps_Screen1/header"
import Step1 from "../components/Steps_Screen1/Steps/Step1"
import Step2 from "../components/Steps_Screen1/Steps/Step2"
import Step3 from "../components/Steps_Screen1/Steps/Step3"
import Step4 from "../components/Steps_Screen1/Steps/Step4"
import Step5 from "../components/Steps_Screen1/Steps/Step5"

interface FirstScreenProps {
  sendAdminMessage: (role: string, content: string, onComplete?: () => void) => void
}

const FirstScreen: React.FC<FirstScreenProps> = ({ sendAdminMessage }) => {
  const { gameStateRef, setGameStateRef } = useGameState()
  const { step, mixedFraction } = gameStateRef.current.state1
  const start = useRef(false)
  const [showStartButton, setShowStartButton] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const topFocusRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!start.current) {
      sendAdminMessage(
        "agent",
        "Let's learn how to convert mixed numbers to improper fractions"
      )
      setShowStartButton(true)
      start.current = true
    }
  }, [])

  useEffect(() => {
    if (step >= 0) {
      window.scrollTo({
        top: 0,
        behavior: 'auto'
      });
      topFocusRef.current?.focus();
    }
  }, [step]);

  const updateStep = (newStep: number) => {
    setGameStateRef(prevState => ({
      ...prevState,
      state1: {
        ...prevState.state1,
        step: newStep
      } 
    }));
  };

  const renderStep = () => {
    switch(step) {
      case 0:
        return (
          <div className="min-h-screen bg-pink-50">
            <div className="pt-32" style={{ transform: 'scale(0.65)', transformOrigin: 'top center' }}>
              <div className="max-w-[700px] mx-auto flex flex-col items-center">
                {/* Title with shadow effect */}
                <div className="relative w-full mb-8">
                  {/* Black shadow box */}
                  <div className="absolute -bottom-2 -left-2 w-full h-full bg-black"></div>
                  <div className="absolute -bottom-2 -left-2 w-full h-full bg-black opacity-60"></div>
                  
                  {/* Yellow box with text */}
                  <div className="relative bg-[#ECFF40] p-6 text-center">
                    <h1 className="text-black text-4xl">
                      Mixed number to improper fraction
                    </h1>
                  </div>
                </div>

                <div className="w-full mb-8">
                  <Header 
                    mixedFraction={mixedFraction} 
                  />
                </div>

                {showStartButton && (
                  <div className="relative w-[180px] h-[90px]">
                    <div className="absolute -bottom-2 -left-2 w-full h-full bg-black"></div>
                    <div className="absolute -bottom-2 -left-2 w-full h-full bg-black opacity-60"></div>
                    
                    <button 
                      onClick={() => updateStep(1)}
                      className="relative w-full h-full border-[10px] border-[#FF497C] bg-white flex items-center justify-center"
                    >
                      <span className="text-[#FF497C] text-[32px] tracking-wide">START &gt;&gt;</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="min-h-screen bg-pink-50">
            <div 
              ref={topFocusRef} 
              tabIndex={-1} 
              className="outline-none"
            />
            <div style={{ transform: 'scale(0.65)', transformOrigin: 'top top' }} className="mt-4">
              <Step1 
                mixedFraction={mixedFraction}
                sendAdminMessage={sendAdminMessage}
                onComplete={() => updateStep(2)}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="min-h-screen bg-pink-50">
            <div 
              ref={topFocusRef} 
              tabIndex={-1} 
              className="outline-none"
            />
            <div style={{ transform: 'scale(0.65)', transformOrigin: 'top top' }}>
              <Step2 
                mixedFraction={mixedFraction}
                sendAdminMessage={sendAdminMessage}
                onComplete={() => updateStep(3)}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="min-h-screen bg-pink-50">
            <div 
              ref={topFocusRef} 
              tabIndex={-1} 
              className="outline-none"
            />
            <div style={{ transform: 'scale(0.65)', transformOrigin: 'top top' }}>
              <Step3 
                mixedFraction={mixedFraction}
                sendAdminMessage={sendAdminMessage}
                onComplete={() => updateStep(4)}
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="min-h-screen bg-pink-50">
            <div 
              ref={topFocusRef} 
              tabIndex={-1} 
              className="outline-none"
            />
            <div style={{ transform: 'scale(0.65)', transformOrigin: 'top top' }}>
              <Step4 
                mixedFraction={mixedFraction}
                sendAdminMessage={sendAdminMessage}
                onComplete={() => updateStep(5)}
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="min-h-screen bg-pink-50">
            <div 
              ref={topFocusRef} 
              tabIndex={-1} 
              className="outline-none"
            />
            <div style={{ transform: 'scale(0.65)', transformOrigin: 'top top' }}>
              <Step5 
                mixedFraction={mixedFraction}
                sendAdminMessage={sendAdminMessage}
                onComplete={() => updateStep(0)}
                updateStep={updateStep}
                navigateToScreen2={() => setGameStateRef(prev => ({ ...prev, screen: 'second' }))}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div ref={containerRef} className="w-full min-h-screen bg-pink-50">
      {renderStep()}
    </div>
  );
}

export default FirstScreen