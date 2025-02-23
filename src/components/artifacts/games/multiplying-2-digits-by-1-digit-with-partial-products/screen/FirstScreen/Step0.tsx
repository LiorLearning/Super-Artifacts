import { BaseProps } from "../../utils/types";
import grass from "../../assets/grass.png"
import tilo from "../../assets/tilo.png"
import tiloshadow from "../../assets/tiloshadow.png"
import { useEffect, useState } from "react";
import { useRef } from "react";
import { goToStep } from "../../utils/helper";
import { useGameState } from "../../state-utils";


export default function Screen1Step0({sendAdminMessage}: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const hasGameStartedRef = useRef(false);
  const [isMovingUp, setIsMovingUp] = useState(false);

  useEffect(() => {
    if (!hasGameStartedRef.current) {
      hasGameStartedRef.current = true;
      sendAdminMessage('agent', `Can you help Tilo find 23 times 4? Ready to begin?`);
    }
  }, []);

  const handleClick = () => {
    setIsMovingUp(true);
    setTimeout(() => {
      goToStep('first', setGameStateRef, 1);
    }, 500);
  };

  return (
    <div className="realtive bg-[#B9F7FF] min-h-screen overflow-hidden flex justify-center items-end">

      <div className="absolute w-full h-[25vh] z-10"
        style={{ backgroundImage: `url(${grass.src})`, backgroundSize: '100% 100%' }}>
      </div>
      
      <div className=" absolute ml-[10vh] max-w-[40vh] text-[4vh] -translate-y-[45vh] left-0 bg-white py-[1vh] px-[2vh] border-[0.2vh] border-black z-50 drop-shadow-lg">
      Hi, I am TILO!
      </div>

      <div className={`flex flex-col items-center justify-center gap-[4vh] z-50 my-auto pb-[40vh] transition-all duration-500 ${isMovingUp ? 'transform -translate-y-[20vh] opacity-0' : ''}`}>
        <div className="flex items-center justify-center text-center gap-[2vh]">
          <h1 className="leading-none w-[12vh] py-[2vh] bg-white text-[#003a43] text-[6vh] rounded-[4vh] shadow-xl drop-shadow-lg">23</h1>
          <h1 className="leading-none text-[#003a43] text-[7vh] drop-shadow-lg">x</h1>
          <h1 className="leading-none w-[12vh] text-center py-[2vh] bg-white text-[#003a43] text-[6vh] rounded-[4vh] shadow-xl drop-shadow-lg">4</h1>
        </div>

        <button 
          className={`w-[22vw] text-[6vh] leading-none py-[1vh] rounded-[6vh] bg-[#007179] border-[1vh] border-white text-white shadow-xl drop-shadow-lg hover:drop-shadow-2xl`}
          onClick={handleClick}
        >
          {'START >>'}
        </button>
      </div>

      <div className="absolute left-0 translate-x-[10vh] -translate-y-[10vh] w-[25vh] h-[30vh] z-30"
        style={{ backgroundImage: `url(${tilo.src})`, backgroundSize: '100% 100%' }}>
      </div>
      <div className="absolute left-0 translate-x-[7vh] w-[25vh] h-[11vh] z-20"
        style={{ backgroundImage: `url(${tiloshadow.src})`, backgroundSize: '100% 100%' }}>
      </div>


    </div>
  )
}