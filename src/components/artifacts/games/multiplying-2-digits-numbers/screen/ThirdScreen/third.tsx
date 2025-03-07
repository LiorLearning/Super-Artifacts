import { useState } from 'react';
import MultiplyBox from '../../components/multiplybox0';
import { useGameState } from '../../state-utils';
import { BaseProps } from '../../utils/types';
import Screen3Step0 from './Step0';
import Screen3Step1 from './Step1';
import Screen3Step2 from './Step2';
import Screen3Step3 from './Step3';
import Screen3Step4 from './Step4';

export default function ThirdScreen({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();

  const [horizontalSliderValue, setHorizontalSliderValue] = useState(0);
  const [verticalSliderValue, setVerticalSliderValue] = useState(0);

  
  
    
  
  if (gameStateRef.current.state3.step == 0) {
    return (
      <Screen3Step0 sendAdminMessage={sendAdminMessage} horizontalSliderValue={horizontalSliderValue} setHorizontalSliderValue={setHorizontalSliderValue} verticalSliderValue={verticalSliderValue} setVerticalSliderValue={setVerticalSliderValue}/>
    )
  } 
  else if (gameStateRef.current.state3.step == 1) {
    return (
      <Screen3Step1 sendAdminMessage={sendAdminMessage} horizontalSliderValue={horizontalSliderValue} setHorizontalSliderValue={setHorizontalSliderValue} verticalSliderValue={verticalSliderValue} setVerticalSliderValue={setVerticalSliderValue}/>
    )
  }
  else if (gameStateRef.current.state3.step == 2) {
    return (
      <Screen3Step2 sendAdminMessage={sendAdminMessage} horizontalSliderValue={horizontalSliderValue} setHorizontalSliderValue={setHorizontalSliderValue} verticalSliderValue={verticalSliderValue} setVerticalSliderValue={setVerticalSliderValue}/>
    )
  } 
  else if (gameStateRef.current.state3.step == 3) {
    return (
      <Screen3Step3 sendAdminMessage={sendAdminMessage} horizontalSliderValue={horizontalSliderValue} setHorizontalSliderValue={setHorizontalSliderValue} verticalSliderValue={verticalSliderValue} setVerticalSliderValue={setVerticalSliderValue}/>
    )
  }
  else if (gameStateRef.current.state3.step == 4) {
    return (
      <Screen3Step4 sendAdminMessage={sendAdminMessage} horizontalSliderValue={horizontalSliderValue} setHorizontalSliderValue={setHorizontalSliderValue} verticalSliderValue={verticalSliderValue} setVerticalSliderValue={setVerticalSliderValue}/>
    )
  }  
}