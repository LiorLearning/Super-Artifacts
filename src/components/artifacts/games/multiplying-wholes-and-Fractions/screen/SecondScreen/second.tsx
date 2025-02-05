import { useGameState } from '../../state-utils';
import { BaseProps } from '../../utils/types';
import Screen2Step0 from './Step0';
import Screen2Step1 from './Step1';
import Screen2Step2 from './Step2';

export default function FirstScreen({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();

  if(gameStateRef.current.state2.step == 0) {
    return (
      <Screen2Step0/>
    )
  }

  if(gameStateRef.current.state2.step == 1) {
    return (
      <Screen2Step1/>
    )
  }

  if(gameStateRef.current.state2.step == 2) {
    return(
      <Screen2Step2 />
    )
  }
}