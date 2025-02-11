import QuestionBox from "../../components/QuestionBox";
import { useGameState } from "../../state-utils";
import Header from "../../components/header";
import { goToStep } from "../../utils/helper";
import { BaseProps } from "../../utils/types";
import { useEffect, useRef, useState } from "react";

export default function Screen2Step0({sendAdminMessage} : BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { fraction, whole } = gameStateRef.current.state2;
  const [next, setNext] = useState(false);

  const hasGameStartedRef = useRef(false);
  
    useEffect(() => {
      if (!hasGameStartedRef.current) {
        hasGameStartedRef.current = true;
        sendAdminMessage('agent',
          `Now we see how to multiply ${whole} times ${fraction.numerator}/${fraction.denominator}. Let's start 🎯💡`,
        () => {
          goToStep('second', setGameStateRef, 1);
        });
      }
    }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header level={2} heading="Multiplying Wholes and Fractions" onClick={() => {
        goToStep('second', setGameStateRef, 1);
      }} />
      <div className="my-8">
        <QuestionBox 
          whole={whole} 
          numerator={fraction.numerator} 
          denominator={fraction.denominator}
        />
      </div>
    </div>
  );
}