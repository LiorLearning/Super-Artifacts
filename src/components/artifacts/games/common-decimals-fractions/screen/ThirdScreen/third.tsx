import { useGameState } from '../../state-utils';
import { BaseProps } from '../../utils/types';
import Screen3Step0 from './Step0';
import Screen3Step1 from './Step1';
import Screen3Step2 from './Step2';
import Screen3Step3 from './Step3';
import Screen3Step4 from './Step4';
import Screen3Step5 from './Step5';
import Screen3Step6 from './Step6';
import Screen3Step7 from './Step7';
import Screen3Step8 from './Step8';


export default function ThirdScreen({ sendAdminMessage }: BaseProps) {
  const { gameStateRef } = useGameState();
    if (gameStateRef.current.state3.step == 0) {
      return (
        <Screen3Step0 sendAdminMessage={sendAdminMessage}/>
      )
    }

    if (gameStateRef.current.state3.step == 1) {
      return (
        <Screen3Step1 sendAdminMessage={sendAdminMessage}/>
      )
    }

    if (gameStateRef.current.state3.step == 2) {
      return (
        <Screen3Step2 sendAdminMessage={sendAdminMessage}/>
      )
    }

    if (gameStateRef.current.state3.step == 3) {
      return (
        <Screen3Step3 sendAdminMessage={sendAdminMessage}/>
      )
    }

    if (gameStateRef.current.state3.step == 4) {
      return (
        <Screen3Step4 sendAdminMessage={sendAdminMessage}/>
      )
    }

    if (gameStateRef.current.state3.step == 5) {
      return (
        <Screen3Step5 sendAdminMessage={sendAdminMessage}/>
      )
    }

    if (gameStateRef.current.state3.step == 6) {
      return (
        <Screen3Step6 sendAdminMessage={sendAdminMessage}/>
      )
    }

    if(gameStateRef.current.state3.step == 7) {
      return (
        <Screen3Step7 sendAdminMessage={sendAdminMessage}/>
      )
    }

    if(gameStateRef.current.state3.step == 8) {
      return (
        <Screen3Step8 sendAdminMessage={sendAdminMessage}/>
      )
    }
}