import { useGameState } from '../state-utils';
import Header from '../components/header';
import { BaseProps } from '../utils/types';

export default function SecondScreen({ sendAdminMessage }: BaseProps) {
    const { gameStateRef } = useGameState();
    const { step, variable } = gameStateRef.current.state2;

    return (
      <div className="mx-auto">
        <Header variable={variable} />
      </div>
    )
  }
  
  