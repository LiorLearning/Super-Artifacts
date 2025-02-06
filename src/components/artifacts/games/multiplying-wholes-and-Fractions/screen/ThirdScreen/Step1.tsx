import { useEffect, useState } from "react";
import { useGameState } from "../../state-utils";

import FractionHeader from "../../components/fractionheader";
import SolveQuestionBox from "../../components/solvequestionbox";
import SuccessAnimation from '@/components/artifacts/utils/success-animate';


export default function Screen3Step1() {
  const { gameStateRef, setGameStateRef } = useGameState();
  const questions = gameStateRef.current.state3.questions;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [lastquestion, setLastQuestion] = useState<boolean>(false);

  
  useEffect(() => {
    if (currentQuestionIndex === questions.length - 1) {
      setLastQuestion(true);
    }
  })

  const handleCorrectAnswer = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setShowSuccess(true);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <FractionHeader level={3} whole={questions[currentQuestionIndex].whole} numerator={questions[currentQuestionIndex].fraction.numerator} denominator={questions[currentQuestionIndex].fraction.denominator} />
      <div className={``}>
        <SolveQuestionBox
          whole={questions[currentQuestionIndex].whole}
          numerator={questions[currentQuestionIndex].fraction.numerator}
          denominator={questions[currentQuestionIndex].fraction.denominator}
          lastquestion={lastquestion}
          onCorrectAnswer={handleCorrectAnswer}
        />
      </div>
      {showSuccess && <SuccessAnimation />}
    </div>
  );
}