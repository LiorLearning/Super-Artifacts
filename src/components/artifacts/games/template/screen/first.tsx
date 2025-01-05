import { useGameState } from '../state-utils';
import Header from '../components/header';
import { BaseProps } from '../utils/types';

export default function FirstScreen({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { variable } = gameStateRef.current.state1;

  return (
    <div className="mx-auto">
      <Header variable={variable} />
    </div>
  );
}