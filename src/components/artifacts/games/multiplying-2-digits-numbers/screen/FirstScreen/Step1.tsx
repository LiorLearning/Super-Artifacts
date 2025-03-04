import { BaseProps } from "../../utils/types";
import { images } from '../../utils/image';
import { useGameState, useNarrations } from "../../state-utils";
import { useRef, useEffect, useState } from "react";
import { goToStep } from "../../utils/helper";
import { sounds } from "../../utils/sound";
import { formatMessage } from "../../components/commonFunctions";

export default function Screen1Step1({ sendAdminMessage }: BaseProps) {

  const { gameStateRef, setGameStateRef } = useGameState();
  const narrations = useNarrations();
  const [transition, setTransition] = useState(false);
  const [nextSentence, setNextSentence] = useState(false);
  const hasGameStartedRef = useRef(false);
  const number1 = gameStateRef.current.state1.number1;
  const number2 = gameStateRef.current.state1.number2;  
  

  useEffect(() => {
    if (!hasGameStartedRef.current) {
      hasGameStartedRef.current = true;
      sounds.bgm();
      setTimeout(() => {
        setTransition(true);
        sounds.woosh();
        setTimeout(() => {
          setNextSentence(true);
        }, 5000);
      }, 1000);
    }
  }, []);

  useEffect(() => {
    if (nextSentence) {
      if (narrations.Screen1Step1Message1.send) {
        sendAdminMessage(narrations.Screen1Step1Message1.role, formatMessage(narrations.Screen1Step1Message1.content, { number1, number2 }));
      }
      setTimeout(() => {
        goToStep('first', setGameStateRef, 2);
      }, 8000);
    }
  }, [nextSentence]);

  return (
    <div className="realtive bg-[#B9F7FF] min-h-screen overflow-hidden flex justify-center items-end">
      <div className="absolute w-full h-[25vh] z-10"
        style={{ backgroundImage: `url(${images.grass})`, backgroundSize: '100% 100%' }}>
      </div>

      <div className={`absolute ml-[8vw] max-w-[15vw] text-[3vh] -translate-y-[20vw] left-0 bg-white p-[1vw] border-[0.1vw] border-black z-20 drop-shadow-lg transition-all duration-500 ${transition ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 '}`}>
        <div className={`transition-opacity duration-500 ${nextSentence ? 'opacity-0' : 'opacity-100'}`}>
          Hi, I am Tilo. Can you help me find {number1} times {number2}?
        </div>
        <div className={`absolute top-[1vw] left-[1vw] transition-opacity duration-500 ${nextSentence ? 'opacity-100' : 'opacity-0'}`}>
          I have something which can make it easier for us...
        </div>
      </div>

      <div className={`absolute left-0 -translate-y-[8vh] w-[12vw] h-[13vw] z-30 transition-all duration-500 ${transition ? 'translate-x-[7vw] opacity-100' : '-translate-x-full opacity-0'}`}
        style={{ backgroundImage: `url(${nextSentence ? images.tiloHappy : images.tilo})`, backgroundSize: '100% 100%' }}>
      </div>

      <div className={`absolute left-0 w-[12vw] h-[9vh] z-20 transition-all duration-500 ${transition ? 'translate-x-[6vw] opacity-100' : '-translate-x-full opacity-0'}`}
        style={{ backgroundImage: `url(${images.tiloShadow})`, backgroundSize: '100% 100%' }}>
      </div>

    </div>
  )
}
