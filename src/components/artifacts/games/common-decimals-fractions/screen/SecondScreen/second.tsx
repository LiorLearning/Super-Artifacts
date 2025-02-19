import { useGameState } from '../../state-utils';
import { BaseProps } from '../../utils/types';
import Screen2Step0 from './Step0';
import Screen2Step1 from './Step1';
import Screen2Step2 from './Step2';
import Screen2Step3 from './Step3';
import Screen2Step4 from './Step4';
import Screen2Step5 from './Step5';
import Screen2Step6 from './Step6';
import Screen2Step7 from './Step7';

export default function SecondScreen({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();

  

  if (gameStateRef.current.state2.step == 0) {
    return (
      <Screen2Step0 sendAdminMessage={sendAdminMessage}/>
    )
  }

  if(gameStateRef.current.state2.step == 1) {
    return (
      <Screen2Step1 sendAdminMessage={sendAdminMessage}/>
    )
  }

  if(gameStateRef.current.state2.step == 2) {
    return (
      <Screen2Step2 sendAdminMessage={sendAdminMessage}/>
    )
  }

  if(gameStateRef.current.state2.step == 3) {
    return (
      <Screen2Step3 sendAdminMessage={sendAdminMessage}/>
    )
  }

  if(gameStateRef.current.state2.step == 4) {
    return (
      <Screen2Step4 sendAdminMessage={sendAdminMessage}/>
    )
  }

  if(gameStateRef.current.state2.step == 5) {
    return (
      <Screen2Step5 sendAdminMessage={sendAdminMessage}/>
    )
  }

  if(gameStateRef.current.state2.step == 6) {
    return (
      <Screen2Step6 sendAdminMessage={sendAdminMessage}/>
    )
  }

  if(gameStateRef.current.state2.step == 7) {
    return (
      <Screen2Step7 sendAdminMessage={sendAdminMessage}/>
    )
  }
}