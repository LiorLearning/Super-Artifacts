import { BaseProps } from "../../utils/types";
import { images } from "../../utils/image";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { goToScreen, goToStep } from "../../utils/helper";
import { useGameState } from "../../state-utils";
import { narrations } from "../../narrations";
import { formatMessage } from "../../components/commonFunctions";
import MultiplyBox4 from "../../components/multiplybox4";

interface Screen4Step4Props extends BaseProps {
  horizontalSliderValue: number;
  setHorizontalSliderValue: (value: number) => void;
  verticalSliderValue: number;
  setVerticalSliderValue: (value: number) => void;
}

export default function Screen4Step4({ sendAdminMessage, horizontalSliderValue, setHorizontalSliderValue, verticalSliderValue, setVerticalSliderValue }: Screen4Step4Props) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const hasGameStartedRef = useRef(false);
  const number1 = gameStateRef.current.state4.number1;
  const number2 = gameStateRef.current.state4.number2;

  const [tiloHappy, setTiloHappy] = useState(false);
  const [correctSum, setCorrectSum] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);


  useEffect(() => {
    if (!hasGameStartedRef.current) {
      hasGameStartedRef.current = true;
    }
  }, []);


  function generateNumbers() {
    let n2;
    do {
      n2 = Math.floor(Math.random() * (19 - 11 + 1)) + 11;
    } while (n2 === 20);
    let minNumber1 = n2 + 1;
    let n1;
    do {
      n1 = Math.floor(Math.random() * (25 - minNumber1 + 1)) + minNumber1;
    } while (n1 === 20);
    return { n1, n2 };
  }

  const { n1, n2 } = generateNumbers();

  function onCorrect() {
    if (narrations.Screen2Step4Message2.send) {
      sendAdminMessage(narrations.Screen2Step4Message2.role, formatMessage(narrations.Screen2Step4Message2.content, { number1, number2, answer: number1 * number2 }));
    }

    setTimeout(() => {
      setShowPopUp(true);
    }, 1000);
  }

  function playAgain() {
    setShowPopUp(false);
    setGameStateRef((prevState) => ({
      ...prevState,
      state4: {
        step: 0,
        number1: n1,
        number2: n2,
      }
    }));
    setHorizontalSliderValue(0);
    setVerticalSliderValue(0);
    goToScreen('fourth', setGameStateRef);
  }


  return (
    <div className="realtive bg-[#B9F7FF] min-h-screen overflow-hidden flex justify-center items-end">

      {showPopUp && <div className="fixed inset-0 bg-black/50 z-50 flex flex-col gap-[2vh] items-center justify-center ml-[25.2%] w-[74.5%]">
        <button className="bg-[#007179] mt-[3vh] border-[2vh] border-white text-white text-[4vh] py-[1vh] px-[7vh] rounded-[8vw] hover:scale-105 hover:bg-[#246468] transition-all duration-300"
          onClick={() => playAgain()}>
          {'PLAY AGAIN <<'}
        </button>

        <button className="bg-[#007179] mt-[3vh] border-[2vh] border-white text-white text-[4vh] py-[1vh] px-[7vh] rounded-[8vw] hover:scale-105 hover:bg-[#246468] transition-all duration-300"
          onClick={() => { setShowPopUp(false); goToScreen('fifth', setGameStateRef); }}>
          {'NEXT LEVEL >>'}
        </button>
      </div>}

      <div className="absolute -translate-y-[8vh] translate-x-[17vh] flex justify-center items-center z-30">
        <MultiplyBox4
          number1={number1}
          number2={number2}
          sendAdminMessage={sendAdminMessage}
          horizontalSliderValue={horizontalSliderValue}
          setHorizontalSliderValue={setHorizontalSliderValue}
          verticalSliderValue={verticalSliderValue}
          tiloHappy={tiloHappy}
          setTiloHappy={setTiloHappy}
          setVerticalSliderValue={setVerticalSliderValue}
          setCorrectSum={setCorrectSum}
          onCorrect={onCorrect}
        />
      </div>

      <div className={`absolute ml-[8vw] max-w-[12vw] text-[2.5vh] -translate-y-[20vw] left-0 bg-white p-[1vw] border-[0.1vw] border-black z-20 drop-shadow-lg`}>
        <div className={`transition-opacity duration-500`}>
          {correctSum ? 'That\'s correct!' : tiloHappy ? 'Let\'s add the partial products now' : 'Let’s fill in the partial products now'}
        </div>
      </div>

      <div style={{ backgroundImage: `url(${images.boxShadow})`, backgroundSize: '100% 100%', width: `${(number1 * 2.2) + ((number1 - 1) * 0.5)}vh`, height: `10vh` }} className={`absolute z-20 translate-x-[7vw]`}></div>


      <div className="absolute w-full h-[25vh] z-10"
        style={{ backgroundImage: `url(${images.grass})`, backgroundSize: '100% 100%' }}>
      </div>

      <div className={`absolute left-0 -translate-y-[8vh] w-[12vw] h-[13vw] z-30 transition-all duration-500 translate-x-[7vw] opacity-100`}
        style={{ backgroundImage: `url(${tiloHappy ? images.tiloHappy : images.tilo})`, backgroundSize: '100% 100%' }}>
      </div>

      {correctSum && <div className="absolute left-0 translate-x-[8vw] -translate-y-[8vw] w-[10vw] h-[10vw] z-30"
        style={{ backgroundImage: `url(${images.happyGif})`, backgroundSize: '100% 100%' }}>
      </div>}

      <div className={`absolute left-0 w-[12vw] h-[9vh] z-20 transition-all duration-500 translate-x-[6vw] opacity-100 `}
        style={{ backgroundImage: `url(${images.tiloShadow})`, backgroundSize: '100% 100%' }}>
      </div>
    </div>
  )
}