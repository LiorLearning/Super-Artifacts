import MultiplyBox from '../../components/multiplybox';
import { useGameState } from '../../state-utils';
import { BaseProps } from '../../utils/types';
import Screen1Step0 from './Step0';

export default function FirstScreen({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  
    
  
  if (gameStateRef.current.state1.step == 0) {
    return (
      <Screen1Step0 sendAdminMessage={sendAdminMessage}/>
    )
  }
}