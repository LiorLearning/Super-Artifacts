import QuestionBox from "../../components/QuestionBox";
import { useGameState } from "../../state-utils";
import Header from "../../components/header";
import { goToStep } from "../../utils/helper";
import { useEffect, useRef, useState } from "react";
import { BaseProps } from "../../utils/types";

export default function Screen1Step0({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const [next, setNext] = useState(false);
  const { fraction, whole } = gameStateRef.current.state1;

  const hasGameStartedRef = useRef(false);

  useEffect(() => {
    if (!hasGameStartedRef.current) {
      hasGameStartedRef.current = true;
      sendAdminMessage('agent',
        `Let's multiply wholes and fractions visually. Let's start 🎯💡`,
      () => {
        setNext(true);
      });
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header level={1} heading="Multiplying Wholes and Fractions" onClick={() => {
        goToStep('first', setGameStateRef, 1)
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