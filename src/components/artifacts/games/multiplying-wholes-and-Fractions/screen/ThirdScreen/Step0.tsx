import QuestionBox from "../../components/QuestionBox";
import { useGameState } from "../../state-utils";
import Header from "../../components/header";

export default function Screen3Step0() {
  const { gameStateRef, setGameStateRef } = useGameState();
  const questions = gameStateRef.current.state3.questions;

  return (
    <div className="flex flex-col min-h-screen">
      <Header level={2} heading="Multiplying Wholes and Fractions" onClick={() => {
        setGameStateRef({ ...gameStateRef.current, state3: { ...gameStateRef.current.state3, step: 1 } });
      }} />
      <div className="my-8"></div>
      {questions.map((question, index) => (
        <QuestionBox
          key={index}
          whole={question.whole}
          numerator={question.fraction.numerator}
          denominator={question.fraction.denominator}
        />
      ))}
    </div>
  );
}