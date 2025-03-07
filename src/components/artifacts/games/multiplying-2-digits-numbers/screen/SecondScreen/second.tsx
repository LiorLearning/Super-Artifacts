import { useState } from 'react';
import { useGameState } from '../../state-utils';
import { BaseProps } from '../../utils/types';
import Screen2Step0 from './Step0';
import Screen2Step1 from './Step1';
import Screen2Step2 from './Step2';
import Screen2Step3 from './Step3';
import Screen2Step4 from './Step4';

export default function SecondScreen({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();

  const [horizontalSliderValue, setHorizontalSliderValue] = useState(0);
  const [verticalSliderValue, setVerticalSliderValue] = useState(0);

  
  
    
  
  if (gameStateRef.current.state2.step == 0) {
    return (
      <Screen2Step0 sendAdminMessage={sendAdminMessage} horizontalSliderValue={horizontalSliderValue} setHorizontalSliderValue={setHorizontalSliderValue} verticalSliderValue={verticalSliderValue} setVerticalSliderValue={setVerticalSliderValue}/>
    )
  } 
  else if (gameStateRef.current.state2.step == 1) {
    return (
      <Screen2Step1 sendAdminMessage={sendAdminMessage} horizontalSliderValue={horizontalSliderValue} setHorizontalSliderValue={setHorizontalSliderValue} verticalSliderValue={verticalSliderValue} setVerticalSliderValue={setVerticalSliderValue}/>
    )
  }
  else if (gameStateRef.current.state2.step == 2) {
    return (
      <Screen2Step2 sendAdminMessage={sendAdminMessage} horizontalSliderValue={horizontalSliderValue} setHorizontalSliderValue={setHorizontalSliderValue} verticalSliderValue={verticalSliderValue} setVerticalSliderValue={setVerticalSliderValue}/>
    )
  } 
  else if (gameStateRef.current.state2.step == 3) {
    return (
      <Screen2Step3 sendAdminMessage={sendAdminMessage} horizontalSliderValue={horizontalSliderValue} setHorizontalSliderValue={setHorizontalSliderValue} verticalSliderValue={verticalSliderValue} setVerticalSliderValue={setVerticalSliderValue}/>
    )
  }
  else if (gameStateRef.current.state2.step == 4) {
    return (
      <Screen2Step4 sendAdminMessage={sendAdminMessage} horizontalSliderValue={horizontalSliderValue} setHorizontalSliderValue={setHorizontalSliderValue} verticalSliderValue={verticalSliderValue} setVerticalSliderValue={setVerticalSliderValue}/>
    )
  }  
}