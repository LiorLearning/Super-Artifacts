import { useGameState } from '../../state-utils';
import { BaseProps } from '../../utils/types';
import Screen3Step0 from './Step0';
import Screen3Step1 from './Step1';


export default function FirstScreen({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();

    if(gameStateRef.current.state3.step == 0) {
      return (
        <Screen3Step0/>
      )
    }

    if(gameStateRef.current.state3.step == 1) {
      return (
        <Screen3Step1/>
      )
    }
}