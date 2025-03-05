import React, { useEffect, useRef, useState } from "react"
import { useGameState } from "../state-utils"
import Step0 from "../screen/Screen1/Step0"
import Step1 from "../screen/Screen1/Step1"
import Step2 from "../screen/Screen1/Step2"

interface FirstScreenProps {
  sendAdminMessage: (role: string, content: string, onComplete?: () => void) => Promise<string>
}

const FirstScreen: React.FC<FirstScreenProps> = ({ sendAdminMessage }) => {
  const { gameStateRef, setGameStateRef } = useGameState()
  const { step } = gameStateRef.current.state1
  const start = useRef(false)
  const topFocusRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!start.current) {
      sendAdminMessage(
        "agent",
        "Let's learn multiplication step by step!"
      )
      start.current = true
    }
  }, [])

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  }, [step]);

  useEffect(() => {
    if (step >= 0) {
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
          <div className="w-full bg-green-50 pt-4">
            <div ref={topFocusRef} tabIndex={-1} className="outline-none" />
            <Step0 
              sendAdminMessage={sendAdminMessage}
            />
          </div>
        );
      case 1:
        return (
          <div className="w-full bg-green-50 pt-4">
            <Step1 sendAdminMessage={sendAdminMessage} />
          </div>
        );
      case 2:
        return (
          <div className="w-full bg-green-50 pt-4">
            <Step2 sendAdminMessage={sendAdminMessage} />
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="w-full min-h-screen bg-green-50">
      {renderStep()}
    </div>
  );
}

export default FirstScreen
