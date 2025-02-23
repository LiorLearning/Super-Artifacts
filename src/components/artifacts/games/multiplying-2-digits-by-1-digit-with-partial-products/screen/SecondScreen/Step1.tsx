import { BaseProps } from "../../utils/types";
import grass from '../../assets/grass.png';
import tilosad from '../../assets/tilosad.png';
import tilo from '../../assets/tilo.png';
import lost from '../../assets/lost.gif';
import happy from '../../assets/happy.gif';
import tiloshadow from '../../assets/tiloshadow.png';
import boxshadow from '../../assets/boxshadow.png';
import MultiplyBox from '../../components/multiplybox';
import { useGameState } from "../../state-utils";
import { useRef, useEffect, useState } from "react";
import { goToStep } from "../../utils/helper";
export default function Screen2Step1({ sendAdminMessage }: BaseProps) {

  const { gameStateRef, setGameStateRef } = useGameState();
  const [hideMessage, setHideMessage] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isLost, setIsLost] = useState(false);

  const hasGameStartedRef = useRef(false);

  useEffect(() => {
    if (!hasGameStartedRef.current) {
      hasGameStartedRef.current = true;
    }
  }, []);

  const number1 = gameStateRef.current.state2.number1;
  const number2 = gameStateRef.current.state2.number2;
  
  function onCorrect() {

  }

  function onIncorrect() {

  }

  return (
    <div className="realtive bg-[#B9F7FF] min-h-screen overflow-hidden flex justify-center items-end">


      
      <div className="absolute w-full h-[25vh] z-10"
        style={{ backgroundImage: `url(${grass.src})`, backgroundSize: '100% 100%' }}>
      </div>

      <div className={`absolute ml-[10vw] max-w-[15vw] text-[1.6vw] -translate-y-[24vw] left-0 bg-white p-[1vw]  border-[0.1vw] border-black z-20 drop-shadow-lg transition-all duration-500`}>
        Is it easy now?
      </div>

      <div className="absolute left-0 translate-x-[8vw] -translate-y-[10vh] w-[14vw] h-[15vw] z-30"
        style={{ backgroundImage: `url(${tilo.src})`, backgroundSize: '100% 100%' }}>
      </div>


      <div className="absolute left-0 translate-x-[6vw] w-[15vw] h-[12vh] z-20"
        style={{ backgroundImage: `url(${tiloshadow.src})`, backgroundSize: '100% 100%' }}>
      </div>

      <div className="absolute z-20 translate-x-[8vw] -translate-y-[10vh]">
        <MultiplyBox number1={number1} number2={number2} onCorrect={onCorrect} onIncorrect={onIncorrect} defaultSilderValue={3} short={true} fixColorNotRed={true} nextStep={true} sendAdminMessage={sendAdminMessage}/>
      </div>
      <div style={{backgroundImage: `url(${boxshadow.src})`, backgroundSize: '100% 100%'}} className={`absolute z-10 translate-x-[2vw]  w-[18vw] h-[10vh]`}></div>
    </div>
  )
}
