import { useGameState } from '../state-utils';
import { BaseProps } from '../utils/types';

export default function SecondScreen({ sendAdminMessage }: BaseProps) {
  const { gameStateRef } = useGameState();

  return (
    <div className="mx-auto my-12 flex-col justify-center items-center">
      hello2
    </div>
  )
}
  
  