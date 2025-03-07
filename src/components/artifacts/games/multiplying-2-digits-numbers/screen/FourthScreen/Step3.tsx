import { BaseProps } from "../../utils/types";
import { images } from "../../utils/image";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { goToStep } from "../../utils/helper";
import { useGameState } from "../../state-utils";
import { narrations } from "../../narrations";  
import MultiplyBox3 from "../../components/multiplybox3";

interface Screen4Step3Props extends BaseProps {
  horizontalSliderValue: number;
  setHorizontalSliderValue: (value: number) => void;
  verticalSliderValue: number;
  setVerticalSliderValue: (value: number) => void;
}

export default function Screen4Step3({sendAdminMessage, horizontalSliderValue, setHorizontalSliderValue, verticalSliderValue, setVerticalSliderValue}: Screen4Step3Props) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const hasGameStartedRef = useRef(false);
  const number1 = gameStateRef.current.state4.number1;
  const number2 = gameStateRef.current.state4.number2;

  useEffect(() => {
    if (!hasGameStartedRef.current) {
      hasGameStartedRef.current = true;
    }
  }, []);

  function onCorrect() {
    setTimeout(() => {
      goToStep('fourth', setGameStateRef, 4);
    }, 2000);
  }


  return (
    <div className="realtive bg-[#B9F7FF] min-h-screen overflow-hidden flex justify-center items-end">
      
      <div className="absolute -translate-y-[8vh] translate-x-[17vh] flex justify-center items-center z-30">
        <MultiplyBox3 number1={number1} number2={number2} sendAdminMessage={sendAdminMessage} horizontalSliderValue={horizontalSliderValue} setHorizontalSliderValue={setHorizontalSliderValue} verticalSliderValue={verticalSliderValue} setVerticalSliderValue={setVerticalSliderValue} onCorrect={onCorrect}/>
      </div>
      
      <div style={{backgroundImage: `url(${images.boxShadow})`, backgroundSize: '100% 100%', width: `${(number1 * 2.2) + ((number1 - 1) * 0.5)}vh`, height: `10vh`}} className={`absolute z-20 translate-x-[7vw]`}></div>

      <div className={`absolute ml-[8vw] max-w-[12vw] text-[2.5vh] -translate-y-[20vw] left-0 bg-white p-[1vw] border-[0.1vw] border-black z-20 drop-shadow-lg`}>
        <div className={`transition-opacity duration-500`}>
          Let’s fill in the partial products now
        </div>
      </div>

      <div className="absolute w-full h-[25vh] z-10"
        style={{ backgroundImage: `url(${images.grass})`, backgroundSize: '100% 100%' }}>
      </div>

      <div className={`absolute left-0 -translate-y-[8vh] w-[12vw] h-[13vw] z-30 transition-all duration-500 translate-x-[7vw] opacity-100`}
        style={{ backgroundImage: `url(${images.tilo})`, backgroundSize: '100% 100%' }}>
      </div>

      <div className={`absolute left-0 w-[12vw] h-[9vh] z-20 transition-all duration-500 translate-x-[6vw] opacity-100 `}
        style={{ backgroundImage: `url(${images.tiloShadow})`, backgroundSize: '100% 100%' }}>
      </div>
    </div>
  )
}