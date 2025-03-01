import { useState } from 'react';
import MultiplyBox from '../../components/multiplybox0';
import { useGameState } from '../../state-utils';
import { BaseProps } from '../../utils/types';
import Screen1Step0 from './Step0';
import Screen1Step1 from './Step1';
import Screen1Step2 from './Step2';
import Screen1Step3 from './Step3';
import Screen1Step4 from './Step4';

export default function FirstScreen({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();

  const [horizontalSliderValue, setHorizontalSliderValue] = useState(0);
  const [verticalSliderValue, setVerticalSliderValue] = useState(0);

  
  
    
  
  if (gameStateRef.current.state1.step == 0) {
    return (
      <Screen1Step0 sendAdminMessage={sendAdminMessage} horizontalSliderValue={horizontalSliderValue} setHorizontalSliderValue={setHorizontalSliderValue} verticalSliderValue={verticalSliderValue} setVerticalSliderValue={setVerticalSliderValue}/>
    )
  } 
  else if (gameStateRef.current.state1.step == 1) {
    return (
      <Screen1Step1 sendAdminMessage={sendAdminMessage} horizontalSliderValue={horizontalSliderValue} setHorizontalSliderValue={setHorizontalSliderValue} verticalSliderValue={verticalSliderValue} setVerticalSliderValue={setVerticalSliderValue}/>
    )
  }
  else if (gameStateRef.current.state1.step == 2) {
    return (
      <Screen1Step2 sendAdminMessage={sendAdminMessage} horizontalSliderValue={horizontalSliderValue} setHorizontalSliderValue={setHorizontalSliderValue} verticalSliderValue={verticalSliderValue} setVerticalSliderValue={setVerticalSliderValue}/>
    )
  } 
  else if (gameStateRef.current.state1.step == 3) {
    return (
      <Screen1Step3 sendAdminMessage={sendAdminMessage} horizontalSliderValue={horizontalSliderValue} setHorizontalSliderValue={setHorizontalSliderValue} verticalSliderValue={verticalSliderValue} setVerticalSliderValue={setVerticalSliderValue}/>
    )
  }
  else if (gameStateRef.current.state1.step == 4) {
    return (
      <Screen1Step4 sendAdminMessage={sendAdminMessage} horizontalSliderValue={horizontalSliderValue} setHorizontalSliderValue={setHorizontalSliderValue} verticalSliderValue={verticalSliderValue} setVerticalSliderValue={setVerticalSliderValue}/>
    )
  }  
}