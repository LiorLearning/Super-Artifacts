import { useGameState } from '../../state-utils';
import { BaseProps } from '../../utils/types';


export default function FirstScreen({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();

  return (
    <div>
      hello
    </div>
  )

  
}