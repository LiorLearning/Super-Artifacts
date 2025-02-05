import React, { useEffect, useRef, useState } from "react"
import { useGameState } from "../state-utils"
import Header from "../components/Steps_Screen1/header"
import Step1 from "../components/Steps_Screen1/Steps/Step1"
import Step2 from "../components/Steps_Screen1/Steps/Step2"
import Step3 from "../components/Steps_Screen1/Steps/Step3"
import Step4 from "../components/Steps_Screen1/Steps/Step4"

interface FirstScreenProps {
  sendAdminMessage: (role: string, content: string, onComplete?: () => void) => void
}

const FirstScreen: React.FC<FirstScreenProps> = ({ sendAdminMessage }) => {
  const { gameStateRef, setGameStateRef } = useGameState()
  const { step, mixedFraction } = gameStateRef.current.state1
  const start = useRef(false)
  const [showStartButton, setShowStartButton] = useState(false)

  useEffect(() => {
    if (!start.current) {
      // Initial instruction when game loads
      sendAdminMessage(
        "agent",
        "Let's see how to convert a mixed number to an improper fraction",
        () => {
          setShowStartButton(true) // Show button after first narration
          setTimeout(() => {
            sendAdminMessage(
              "agent",
              "Let's start right away, click on START"
            )
          }, 500)
        }
      )
      start.current = true
    }
  }, [])

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
          <div className="min-h-screen bg-pink-50 pt-32">
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
                <div className="flex justify-center w-full ">
                  <div 
                    className="relative w-[300px] cursor-pointer -right-6"
                    onClick={() => updateStep(1)}


                  >
                    <div className="relative w-[250px]">
                      {/* Black shadow boxes */}
                      <div className="absolute -bottom-2 -left-2 w-full h-full bg-black"></div>
                      <div className="absolute -bottom-2 -left-2 w-full h-full bg-black opacity-60"></div>
                      
                      {/* Main button */}
                      <button 
                        onClick={() => updateStep(1)}
                        className="relative w-full border-[12.69px] border-[#FF497C] py-3 bg-white"
                      >
                        <span className="text-[#FF497C] text-[35px] tracking-wide">START &gt;&gt;</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 1:
        return (
          <div className="min-h-screen bg-pink-50">
            <Step1 
              mixedFraction={mixedFraction}
              sendAdminMessage={sendAdminMessage}
              onComplete={() => updateStep(2)}
            />
          </div>
        );

      case 2:
        return (
          <Step2 
            mixedFraction={mixedFraction}
            sendAdminMessage={sendAdminMessage}
            onComplete={() => updateStep(3)}
          />
        );

      case 3:
        return (
          <Step3 
            mixedFraction={mixedFraction}
            sendAdminMessage={sendAdminMessage}
            onComplete={() => updateStep(4)}
          />
        );

      case 4:
        return (
          <Step4 
            mixedFraction={mixedFraction}
            sendAdminMessage={sendAdminMessage}
            onComplete={() => updateStep(0)}
          />
        );

      default:
        return null;
    }
  };

  return <div className="w-full">{renderStep()}</div>;
}

export default FirstScreen