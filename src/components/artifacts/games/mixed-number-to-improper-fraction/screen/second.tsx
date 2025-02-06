import { useGameState } from '../state-utils';
import QuickHack2 from '../components/Steps_Screen2/Logic';
import Welcome from '../components/Steps_Screen2/Welcome';

interface SecondScreenProps {
  sendAdminMessage: (role: string, content: string, onComplete?: () => void) => void;
}

export default function SecondScreen({ sendAdminMessage }: SecondScreenProps) {
  const { gameStateRef } = useGameState();
  const { step, mixedFraction } = gameStateRef.current.state2;

  return (
    <div className="min-h-screen bg-pink-50">
      {step === 0 && <Welcome mixedFraction={mixedFraction} sendAdminMessage={sendAdminMessage} />}
      {step === 1 && <QuickHack2 mixedFraction={mixedFraction} sendAdminMessage={sendAdminMessage}/>}
    </div>
  );
}