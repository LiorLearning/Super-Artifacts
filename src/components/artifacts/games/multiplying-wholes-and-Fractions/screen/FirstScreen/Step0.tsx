import QuestionBox from "../../components/QuestionBox";
import { useGameState } from "../../state-utils";
import Header from "../../components/header";

export default function Screen1Step0() {
  const { gameStateRef } = useGameState();
  const { fraction, wholes } = gameStateRef.current.state1;

  return (
    <div className="flex flex-col min-h-screen">
      <Header level={1} heading="Multiplying Wholes and Fractions" />
      <QuestionBox 
        whole={2} 
        numerator={1} 
        denominator={5}
      />
    </div>
  );
}