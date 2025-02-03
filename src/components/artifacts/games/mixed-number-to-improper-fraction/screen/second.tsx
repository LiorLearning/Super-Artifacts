import { useGameState } from '../state-utils';
import QuickHack1 from '../components/Steps_Screen2/Welcome';
import QuickHack2 from '../components/Steps_Screen2/Logic';

export default function SecondScreen() {
  const { gameStateRef } = useGameState();
  const { step, mixedFraction } = gameStateRef.current.state2;

  return (
    <div className="min-h-screen bg-pink-50">
      {step === 0 && <QuickHack1 />}
      {step === 1 && <QuickHack2 />}
    </div>
  );
}