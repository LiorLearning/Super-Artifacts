import { useGameState } from '../../state-utils';
import { BaseProps } from '../../utils/types';
import Screen4Step0 from './Step0';
import Screen4Step1 from './Step1';
import Screen4Step2 from './Step2';
import Screen4Step3 from './Step3';
import Screen4Step4 from './Step4';
import Screen4Step5 from './Step5';
import Screen4Step6 from './Step6';
import Screen4Step7 from './Step7';
import Screen4Step8 from './Step8';


export default function FourthScreen({ sendAdminMessage }: BaseProps) {
  const { gameStateRef } = useGameState();
    if (gameStateRef.current.state4.step == 0) {
      return (
        <Screen4Step0 sendAdminMessage={sendAdminMessage}/>
      )
    }

    if (gameStateRef.current.state4.step == 1) {
      return (
        <Screen4Step1 sendAdminMessage={sendAdminMessage}/>
      )
    }

    if (gameStateRef.current.state4.step == 2) {
      return (
        <Screen4Step2 sendAdminMessage={sendAdminMessage}/>
      )
    }

    if (gameStateRef.current.state4.step == 3) {
      return (
        <Screen4Step3 sendAdminMessage={sendAdminMessage}/>
      )
    }

    if (gameStateRef.current.state4.step == 4) {
      return (
        <Screen4Step4 sendAdminMessage={sendAdminMessage}/>
      )
    }

    if (gameStateRef.current.state4.step == 5) {
      return (
        <Screen4Step5 sendAdminMessage={sendAdminMessage}/>
      )
    }

    if (gameStateRef.current.state4.step == 6) {
      return (
        <Screen4Step6 sendAdminMessage={sendAdminMessage}/>
      )
    }

    if(gameStateRef.current.state4.step == 7) {
      return (
        <Screen4Step7 sendAdminMessage={sendAdminMessage}/>
      )
    }

    if(gameStateRef.current.state4.step == 8) {
      return (
        <Screen4Step8 sendAdminMessage={sendAdminMessage}/>
      )
    }
}