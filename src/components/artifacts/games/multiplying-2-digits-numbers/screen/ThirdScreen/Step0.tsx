import { BaseProps } from "../../utils/types";
import { images } from "../../utils/image";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { goToStep } from "../../utils/helper";
import { useGameState, useNarrations } from "../../state-utils";
import MultiplyBox0 from "../../components/multiplybox0";
import { formatMessage } from "../../components/commonFunctions";
import HintPopup from "../../components/hintpopup";

interface Screen3Step0Props extends BaseProps {
  horizontalSliderValue: number;
  setHorizontalSliderValue: (value: number) => void;
  verticalSliderValue: number;
  setVerticalSliderValue: (value: number) => void;
}

export default function Screen3Step0({sendAdminMessage, horizontalSliderValue, setHorizontalSliderValue, verticalSliderValue, setVerticalSliderValue}: Screen3Step0Props) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const narrations = useNarrations();
  const hasGameStartedRef = useRef(false);
  const number1 = gameStateRef.current.state3.number1;
  const number2 = gameStateRef.current.state3.number2;
  const [breakNumber2, setBreakNumber2] = useState(false);
  const [correctSplit, setCorrectSplit] = useState(false);
  const [lockPopup, setLockPopup] = useState(false);
  const [hintPopup, setHintPopup] = useState(false);
  const [lockBounce, setLockBounce] = useState(false);

  useEffect(() => {
    if (!hasGameStartedRef.current) {
      hasGameStartedRef.current = true;
      if (narrations.Screen2Step0Message1.send) {
        sendAdminMessage(narrations.Screen2Step0Message1.role, formatMessage(narrations.Screen2Step0Message1.content, { number1, number2 }));
      }
    }
  }, []);

  function onCorrect() {
    goToStep('third', setGameStateRef, 1);
  }



  return (
    <div className="realtive bg-[#B9F7FF] min-h-screen overflow-hidden flex justify-center items-end">

      {lockPopup && <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center right-0 ml-[25.5%] w-[75%]">
        <div className="z-50 flex flex-col items-center justify-center gap-[1vh] content-center w-[65vh] px-[2vw] py-[2vh] bg-white border-[1.5vh] border-[#007179] rounded-[5vh]">
          <div className="text-[3vh]">
            Click on <span className="bg-[#f00004] text-[2.5vh] border-[0.7vh] border-[#a70003] px-[2vh] py-[0.7vh] mx-[1vh] mt-[4vh] text-white -translate-x-[4vh]">LOCK</span> when you want to
          </div>
          <div className="text-[3vh]">
            lock the slider..
          </div>

          <button className="bg-[#007179] text-white mt-[3vh] text-[2.5vh] py-[1vh] px-[3vh] rounded-[6vh] shadow-[0.2vh_0.2vh_0_0_#393f3f]"
            onClick={() => {
              setLockPopup(false)
              setLockBounce(true);
              setTimeout(() => {
                setLockBounce(false);
              }, 2000);
            }}>
            {'CONTINUE >>'}
          </button>
        </div>
      </div>}

      {hintPopup && <>{breakNumber2 ? <HintPopup number={number2} setHintPopup={setHintPopup} sendAdminMessage={sendAdminMessage}/> : <HintPopup number={number1} setHintPopup={setHintPopup} sendAdminMessage={sendAdminMessage}/>}</> }
      
      <div className="absolute -translate-y-[8vh] translate-x-[22vh] flex justify-center items-center z-30">
        <MultiplyBox0 
        number1={number1} 
        number2={number2} 
        sendAdminMessage={sendAdminMessage} 
        horizontalSliderValue={horizontalSliderValue} 
        setHorizontalSliderValue={setHorizontalSliderValue} 
        verticalSliderValue={verticalSliderValue} 
        setVerticalSliderValue={setVerticalSliderValue} 
        setBreakNumber2={setBreakNumber2} 
        setCorrectSplit={setCorrectSplit} 
        setLockPopup={setLockPopup}
        lockPopup={lockPopup}
        setHintPopup={setHintPopup}
        hintPopup={hintPopup}
        onCorrect={onCorrect}
        lockBounce={lockBounce}
        />
      </div>

      <div className={`absolute ml-[8vw] max-w-[12vw] text-[2.5vh] -translate-y-[20vw] left-0 bg-white p-[1vw] border-[0.1vw] border-black z-20 drop-shadow-lg`}>
        {!correctSplit ? <><div className={`transition-opacity duration-500 ${breakNumber2 ? 'opacity-0 hidden' : 'opacity-100'}`}>
          How many full tens fit inside {number1}? And how many ones are left?
        </div>
        <div className={`transition-opacity duration-500 ${breakNumber2 && !correctSplit ? 'opacity-100' : 'opacity-0 hidden'}`}>
          Now, how many full tens fit inside {number2}? And how many ones are left?
        </div></> : <div className={`transition-opacity duration-500 ${correctSplit ? 'opacity-100' : 'opacity-0'}`}>
          That's right!
        </div>}
      </div>
      
      <div style={{backgroundImage: `url(${images.boxShadow})`, backgroundSize: '100% 100%', width: `${(number1 * 2.2) + ((number1 - 1) * 0.5)}vh`, height: `10vh`}} className={`absolute z-20 translate-x-[9vw]`}></div>

      <div className="absolute w-full h-[25vh] z-10"
        style={{ backgroundImage: `url(${images.grass})`, backgroundSize: '100% 100%' }}>
      </div>

      {!breakNumber2 ? <><div className={`absolute left-0 -translate-y-[8vh] w-[12vw] h-[13vw] z-30 transition-all duration-500 translate-x-[7vw] opacity-100`}
        style={{ backgroundImage: `url(${images.tiloSad})`, backgroundSize: '100% 100%' }}>
      </div>
      <div className="absolute left-0 translate-x-[8vw] -translate-y-[8vw] w-[10vw] h-[10vw] z-30"
        style={{ backgroundImage: `url(${images.lost})`, backgroundSize: '100% 100%' }}>
      </div></> : 
      
      !correctSplit ? <><div className={`absolute left-0 -translate-y-[8vh] w-[12vw] h-[13vw] z-30 transition-all duration-500 translate-x-[7vw] opacity-100`}
        style={{ backgroundImage: `url(${images.tiloSad})`, backgroundSize: '100% 100%' }}>
      </div></> : 
      <>
      <div className={`absolute left-0 -translate-y-[8vh] w-[12vw] h-[13vw] z-30 transition-all duration-500 translate-x-[7vw] opacity-100`}
        style={{ backgroundImage: `url(${images.tiloHappy})`, backgroundSize: '100% 100%' }}>
      </div>
      <div className="absolute left-0 translate-x-[8vw] -translate-y-[8vw] w-[10vw] h-[10vw] z-30"
        style={{ backgroundImage: `url(${images.happyGif})`, backgroundSize: '100% 100%' }}>
      </div>
      </>}

      <div className={`absolute left-0 w-[12vw] h-[9vh] z-20 transition-all duration-500 translate-x-[6vw] opacity-100 `}
        style={{ backgroundImage: `url(${images.tiloShadow})`, backgroundSize: '100% 100%' }}>
      </div>
    </div>
  )
}