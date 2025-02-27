import { BaseProps } from "../../utils/types";
import { images } from "../../utils/image";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { goToStep } from "../../utils/helper";
import { useGameState } from "../../state-utils";
import { narrations } from "../../narrations";  
import MultiplyBox from "../../components/multiplybox";

export default function Screen1Step0({sendAdminMessage}: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const hasGameStartedRef = useRef(false);
  const number1 = gameStateRef.current.state1.number1;
  const number2 = gameStateRef.current.state1.number2;

  useEffect(() => {
    if (!hasGameStartedRef.current) {
      hasGameStartedRef.current = true;
      sendAdminMessage('agent', `Can you help Tilo find ${number1} times ${number2}? Ready to begin?`);
    }
  }, []);


  return (
    <div className="realtive bg-[#B9F7FF] min-h-screen overflow-hidden flex justify-center items-end">
      
      <div className="absolute -translate-y-[10vh] translate-x-[10vw] flex justify-center items-center z-20">
        <MultiplyBox number1={number1} number2={number2} sendAdminMessage={sendAdminMessage} />
      </div>

      <div className="absolute w-full h-[25vh] z-10"
        style={{ backgroundImage: `url(${images.grass})`, backgroundSize: '100% 100%' }}>
      </div>

      {/* <div className={`absolute ml-[10vw] max-w-[15vw] text-[1.6vw] -translate-y-[24vw] left-0 bg-white p-[1vw] border-[0.1vw] border-black z-20 drop-shadow-lg`}>
        <div className={`transition-opacity duration-500`}>
          Hi, I am Tilo. Can you help me find {number1} times {number2}?
        </div>
      </div> */}

      <div className={`absolute left-0 -translate-y-[10vh] w-[14vw] h-[15vw] z-30 transition-all duration-500 translate-x-[8vw] opacity-100`}
        style={{ backgroundImage: `url(${images.tilo})`, backgroundSize: '100% 100%' }}>
      </div>

      <div className={`absolute left-0 w-[15vw] h-[12vh] z-20 transition-all duration-500 translate-x-[6vw] opacity-100 `}
        style={{ backgroundImage: `url(${images.tiloShadow})`, backgroundSize: '100% 100%' }}>
      </div>
    </div>
  )
}