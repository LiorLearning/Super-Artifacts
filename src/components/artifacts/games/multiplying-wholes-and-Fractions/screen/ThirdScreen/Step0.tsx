import { useEffect, useRef, useState } from "react";
import { useGameState } from "../../state-utils";

import SolveQuestionBox from "../../components/solvequestionbox";
import SuccessAnimation from '@/components/artifacts/utils/success-animate';
import Header from "../../components/header";
import { BaseProps } from "../../utils/types";

export default function Screen3Step1({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const questions = gameStateRef.current.state3.questions;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [lastquestion, setLastQuestion] = useState<boolean>(false);
  const hasGameStartedRef = useRef(false);

  useEffect(() => {
    if (!hasGameStartedRef.current) {
      hasGameStartedRef.current = true;
      const firstQuestion = questions[0];
      sendAdminMessage('agent', 
        `We'll start by multiplying ${firstQuestion.whole} by ${firstQuestion.fraction.numerator}/${firstQuestion.fraction.denominator}. 🎯`
      );
    }
  }, []);

  useEffect(() => {
    if (currentQuestionIndex === questions.length - 1) {
      setLastQuestion(true);
    }
  }, [currentQuestionIndex]);

  const handleCorrectAnswer = () => {
    const nextQuestion = questions[currentQuestionIndex + 1];

    if (currentQuestionIndex < questions.length - 1) {
      sendAdminMessage('agent', 
        `Excellent! You got it right! Now let's try the next one. ` +
        `We'll multiply ${nextQuestion.whole} by ${nextQuestion.fraction.numerator}/${nextQuestion.fraction.denominator}.`
      );
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      sendAdminMessage('agent', `Congratulations! You've successfully completed all the multiplication problems! You're now a master at multiplying whole numbers with fractions!`);
      setShowSuccess(true);
    }
  };


  return (
    <div className="flex flex-col min-h-screen">
      <Header level={3} heading="Multiplying Wholes and Fractions"/>      
      <div>
        <SolveQuestionBox
          whole={questions[currentQuestionIndex].whole}
          numerator={questions[currentQuestionIndex].fraction.numerator}
          denominator={questions[currentQuestionIndex].fraction.denominator}
          lastquestion={lastquestion}
          onCorrectAnswer={handleCorrectAnswer}
          sendAdminMessage={sendAdminMessage}
        />
      </div>
      {showSuccess && <SuccessAnimation />}
    </div>
  );
}