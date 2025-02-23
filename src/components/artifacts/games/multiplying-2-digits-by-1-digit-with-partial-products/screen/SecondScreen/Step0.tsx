import { BaseProps } from "../../utils/types";
import grass from '../../assets/grass.png';
import tilo from '../../assets/tilosad.png';
import tilohappy from '../../assets/tilohappy.png';
import lost from '../../assets/lost.gif';
import happy from '../../assets/happy.gif';
import tiloshadow from '../../assets/tiloshadow.png';
import boxshadow from '../../assets/boxshadow.png';
import MultiplyBox from '../../components/multiplybox';
import { useGameState } from "../../state-utils";
import { useRef, useEffect, useState } from "react";
import { goToStep } from "../../utils/helper";

export default function Screen2Step0({ sendAdminMessage }: BaseProps) {
  const {gameStateRef, setGameStateRef} = useGameState();
  const [transition, setTransition] = useState(false);
  const [isDragging, setIsDragging] = useState(true);
  const [showPopUp, setShowPopUp] = useState<boolean | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isLost, setIsLost] = useState(false);
  const hasGameStartedRef = useRef(false);

  const number1 = gameStateRef.current.state2.number1;
  const number2 = gameStateRef.current.state2.number2;
  const unit = number1 % 10;

  useEffect(() => {
    if (!hasGameStartedRef.current) {
      hasGameStartedRef.current = true;
      sendAdminMessage('agent', `Can you make this easier for me by breaking ${number1} into two parts using slider?`);
      setTimeout(() => {
        setTransition(true);
      }, 2000);
    }
  }, []); 

  useEffect(() => {
    if(!isDragging) {
      setTimeout(() => {
        setShowPopUp(true);
      }, 5000)
    }
  }, [isDragging, isCorrect])

  function onCorrect() {
    sendAdminMessage('agent', `Awesome, ${number1} x ${number2} is same as ${number1 - unit} times ${number2} and ${number1} times ${number2}`);
    setIsCorrect(true);
    setTimeout(() => {
      goToStep('second', setGameStateRef, 1);
    }, 5000)
  }

  function onIncorrect() {
    sendAdminMessage('agent', `Tilo still looks confused. Let's try a different combination.`);
    setIsCorrect(false);
    setIsLost(true);
  }

  return (
    <div className="realtive bg-[#B9F7FF] min-h-screen overflow-hidden flex justify-center items-end">
      {showPopUp && !isCorrect && <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center w-[74.5%]">
        <div className="z-50 flex flex-col items-center justify-center gap-[1vh] content-center w-[65vh] px-[2vw] py-[2vh] bg-white border-[1.5vh] border-[#007179] rounded-[5vh]">
          <div className="text-[4vh]">
            Click on <span className="bg-[#f00004] text-[3vh] border-[0.7vh] border-[#a70003] px-[2vh] py-[0.7vh] mx-[2vh] mt-[4vh] text-white -translate-x-[4vh]">FIX</span> when you want to
          </div>
          <div className="text-[4vh]">
            fix the slider..
          </div>

          <button className="bg-[#007179] mt-[3vh] text-white text-[2.5vh] py-[1vh] px-[3vh] rounded-[6vh]"
            onClick={() => setShowPopUp(false)}>
            {'CONTINUE >>'}
          </button>
        </div>
      </div>}

      <div className="absolute w-full h-[25vh] z-10"
        style={{ backgroundImage: `url(${grass.src})`, backgroundSize: '100% 100%' }}>
      </div>

      {isCorrect ? <><div className="absolute left-0 translate-x-[8vw] -translate-y-[10vh] w-[14vw] h-[15vw] z-30"
        style={{ backgroundImage: `url(${tilohappy.src})`, backgroundSize: '100% 100%' }}>
      </div>
        <div className="absolute left-0 translate-x-[8vw] -translate-y-[9vw] w-[13vw] h-[13vw] z-30"
        style={{ backgroundImage: `url(${happy.src})`, backgroundSize: '100% 100%' }}>
      </div></> : <><div className="absolute left-0 translate-x-[8vw] -translate-y-[10vh] w-[14vw] h-[15vw] z-30"
        style={{ backgroundImage: `url(${tilo.src})`, backgroundSize: '100% 100%' }}>
      </div>
      {(isDragging || isLost) && <div className="absolute left-0 translate-x-[8vw] -translate-y-[9vw] w-[13vw] h-[13vw] z-30"
        style={{ backgroundImage: `url(${lost.src})`, backgroundSize: '100% 100%' }}>
      </div>}</>}

      <div className="absolute left-0 translate-x-[6vw] w-[15vw] h-[12vh] z-20"
        style={{ backgroundImage: `url(${tiloshadow.src})`, backgroundSize: '100% 100%' }}>
      </div>

      <div className={`absolute ml-[10vw] max-w-[15vw] text-[1.6vw] -translate-y-[24vw] left-0 bg-white p-[1vw]  border-[0.1vw] border-black z-20 drop-shadow-lg transition-all duration-500`}>
        {isCorrect ? `That's right!` : `Can you make this easier for me by breaking ${number1} into two parts using slider?`}
      </div>

      <div className="absolute z-20 translate-x-[12vw] -translate-y-[10vh]">
        <MultiplyBox 
          number1={number1} 
          number2={number2} 
          transition={transition} 
          isDragging={isDragging}
          setIsDragging={setIsDragging}
          onCorrect={onCorrect}
          onIncorrect={onIncorrect}
          sendAdminMessage={sendAdminMessage}
        />
      </div>
      
      <div style={{backgroundImage: `url(${boxshadow.src})`, backgroundSize: '100% 100%'}} className={`absolute z-10 translate-x-[14vw]  w-[18vw] h-[10vh]`}></div>
      <div style={{backgroundImage: `url(${boxshadow.src})`, backgroundSize: '100% 100%'}} className={`absolute z-10 translate-x-[14vw]  w-[18vw] h-[10vh] transition-all duration-1000 ${transition ? 'translate-x-[7vw] opacity-100' : 'translate-x-[18vw] opacity-0'}`}></div>
    </div>
  )
}
