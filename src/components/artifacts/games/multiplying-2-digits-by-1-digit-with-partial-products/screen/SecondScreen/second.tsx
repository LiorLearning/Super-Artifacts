import MultiplyBox from '../../components/multiplybox';
import { useGameState } from '../../state-utils';
import { BaseProps } from '../../utils/types';
import Screen2Step0 from './Step0';
import Screen2Step1 from './Step1';

export default function SecondScreen({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();

  
  if (gameStateRef.current.state2.step == 0) {
    return (
      <Screen2Step0 sendAdminMessage={sendAdminMessage}/>
    )
  } else if (gameStateRef.current.state2.step == 1) {
    return (
      <Screen2Step1 sendAdminMessage={sendAdminMessage}/>
    )
  } 
}