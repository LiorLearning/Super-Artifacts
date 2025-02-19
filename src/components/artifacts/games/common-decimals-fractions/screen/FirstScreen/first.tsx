import { useGameState } from '../../state-utils';
import { BaseProps } from '../../utils/types';
import Screen1Step0 from './Step0';
import Screen1Step1 from './Step1';
import Screen1Step2 from './Step2';
import Screen1Step3 from './Step3';
import Screen1Step4 from './Step4';
import Screen1Step5 from './Step5';
import Screen1Step6 from './Step6';
import Screen1Step7 from './Step7';

export default function FirstScreen({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();

  

  if (gameStateRef.current.state1.step == 0) {
    return (
      <Screen1Step0 sendAdminMessage={sendAdminMessage}/>
    )
  }

  if(gameStateRef.current.state1.step == 1) {
    return (
      <Screen1Step1 sendAdminMessage={sendAdminMessage}/>
    )
  }

  if(gameStateRef.current.state1.step == 2) {
    return (
      <Screen1Step2 sendAdminMessage={sendAdminMessage}/>
    )
  }

  if(gameStateRef.current.state1.step == 3) {
    return (
      <Screen1Step3 sendAdminMessage={sendAdminMessage}/>
    )
  }

  if(gameStateRef.current.state1.step == 4) {
    return (
      <Screen1Step4 sendAdminMessage={sendAdminMessage}/>
    )
  }

  if(gameStateRef.current.state1.step == 5) {
    return (
      <Screen1Step5 sendAdminMessage={sendAdminMessage}/>
    )
  }

  if(gameStateRef.current.state1.step == 6) {
    return (
      <Screen1Step6 sendAdminMessage={sendAdminMessage}/>
    )
  }

  if(gameStateRef.current.state1.step == 7) {
    return (
      <Screen1Step7 sendAdminMessage={sendAdminMessage}/>
    )
  }
}