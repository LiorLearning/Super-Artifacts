import { BaseProps } from "../../utils/types";
import practicebg from '../../assets/practicebg.png'
import { useGameState } from "../../state-utils";
import { useEffect, useRef } from "react";
import { goToScreen } from "../../utils/helper";
import { GameScreen } from "../../game-state";

export default function Step0({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { number1, number2 } = gameStateRef.current.state1;
  const hasGameStartedRef = useRef(false);

  useEffect(() => {
    if (!hasGameStartedRef.current) {
      hasGameStartedRef.current = true;
    //   sendAdminMessage('agent', `Let's practice multiplication!`);
    }
  }, []);

  const handleStart = () => {
    setGameStateRef(prevState => ({
      ...prevState,
      state1: {
        ...prevState.state1,
        step: 1
      }
    }));
  };

  return (
    <div className="min-h-screen overflow-hidden flex flex-col items-center justify-center" 
         style={{ backgroundImage: `url(${practicebg.src})`, backgroundSize: '100% 100%', backgroundPosition: 'center' }}>
      
      <div className="flex items-center justify-center gap-[2vh]">
        <div className="bg-white p-[2vh] px-[4vh]">
          <span className="text-[6vh]">{number1}</span>
        </div>
        
        <span className="text-[6vh]">x</span>
        
        <div className="bg-white p-[2vh] px-[4vh]">
          <span className="text-[6vh]">{number2}</span>
        </div>
      </div>

      <div className="relative mt-[4vh]">
        {/* Grey shadow box */}
        <div className="absolute -bottom-[0.6vh] -left-[0.6vh] w-full h-full bg-[#333333] rounded-[1vh]"></div>
        
        {/* Green button */}
        <button 
          className="relative bg-[#5C9F00] text-white text-[4vh] py-[1.8vh] px-[6vh] rounded-[1vh]"
          onClick={handleStart}
        >
          Start {'>>'}
        </button>
      </div>
    </div>
  );
}

