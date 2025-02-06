import QuestionBox from "../../components/QuestionBox";
import { useGameState } from "../../state-utils";
import Header from "../../components/header";
import { goToStep } from "../../utils/helper";

export default function Screen1Step0() {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { fraction, whole } = gameStateRef.current.state1;

  return (
    <div className="flex flex-col min-h-screen">
      <Header level={1} heading="Multiplying Wholes and Fractions" onClick={() => {
        goToStep('first', setGameStateRef, 1)
      }}/>
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