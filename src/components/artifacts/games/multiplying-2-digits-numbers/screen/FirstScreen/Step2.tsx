import { BaseProps } from "../../utils/types";
import { images } from "../../utils/image";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { goToScreen, goToStep } from "../../utils/helper";
import { useGameState, useNarrations } from "../../state-utils";
import { sounds } from "../../utils/sound";
import { formatMessage } from "../../components/commonFunctions";

export default function Screen1Step2({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const narrations = useNarrations();
  let number1 = gameStateRef.current.state1.number1;
  const number2 = gameStateRef.current.state1.number2;
  const hasGameStartedRef = useRef(false);
  const [isMovingLeft, setIsMovingLeft] = useState(false);
  const [showColumn, setShowColumn] = useState(false);
  const [showRow, setShowRow] = useState(false);
  const [tiloLost, setTiloLost] = useState(false);

  useEffect(() => {
    if (!hasGameStartedRef.current) {
      hasGameStartedRef.current = true;
      if (narrations.Screen1Step2Message1.send) {
        sendAdminMessage(narrations.Screen1Step2Message1.role, formatMessage(narrations.Screen1Step2Message1.content, { number1, number2 }));
      }
      setTimeout(() => {
        sounds.woosh();
        setIsMovingLeft(true);
      }, 3000);
    }
  }, []);

  useEffect(() => {
    if (isMovingLeft && !showColumn) {
      setTimeout(() => {
        setShowColumn(true);
        if (narrations.Screen1Step2Message2.send) {
          sendAdminMessage(narrations.Screen1Step2Message2.role, formatMessage(narrations.Screen1Step2Message2.content, { number1, number2 }));
        }
      }, 4000);
    } else if (showColumn && !showRow) {
      setTimeout(() => {
        setShowRow(true);
        if (narrations.Screen1Step2Message3.send) {
          sendAdminMessage(narrations.Screen1Step2Message3.role, formatMessage(narrations.Screen1Step2Message3.content, { number1, number2 }));
        }
      }, 4000);
    } else if (showRow) {
      setTimeout(() => {
        setTiloLost(true);
        if (narrations.Screen1Step2Message4.send) {
          sendAdminMessage(narrations.Screen1Step2Message4.role, formatMessage(narrations.Screen1Step2Message4.content, { number1, number2 }));
        }
        setTimeout(() => {
          goToScreen('second', setGameStateRef);
        }, 8000);
      }, 6000);
    }
  }, [isMovingLeft, showColumn, showRow]);


  return (
    <div className="realtive bg-[#B9F7FF] min-h-screen overflow-hidden flex justify-center items-end">

      <div className="absolute w-full h-[25vh] z-10"
        style={{ backgroundImage: `url(${images.grass})`, backgroundSize: '100% 100%' }}>
      </div>

      <div className={`absolute ml-[8vw] max-w-[15vw] text-[3vh] -translate-y-[20vw] left-0 bg-white p-[1vw] border-[0.1vw] border-black z-20 drop-shadow-lg transition-all duration-500 ${!showColumn && !showRow ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
        <div className={`transition-opacity duration-500 ${showColumn || showRow ? 'opacity-0' : 'opacity-100'}`}>
          A Tile Board!
        </div>
      </div>

      <div className={`absolute ml-[8vw] max-w-[15vw] text-[3vh] -translate-y-[20vw] left-0 bg-white p-[1vw] border-[0.1vw] border-black z-20 drop-shadow-lg transition-all duration-500 ${showColumn && !showRow ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
        <div className={`transition-opacity duration-500 ${!showColumn || showRow ? 'opacity-0' : 'opacity-100'}`}>
          This is {number2}
        </div>
      </div>

      <div className={`absolute ml-[8vw] max-w-[15vw] text-[3vh] -translate-y-[20vw] left-0 bg-white p-[1vw] border-[0.1vw] border-black z-20 drop-shadow-lg transition-all duration-500 ${showRow ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
        <div className={`transition-opacity duration-500 ${!showRow ? 'opacity-0' : 'opacity-100'}`}>
          And this is {number1} x {number2}
        </div>
      </div>

      {!tiloLost ? <div className={`absolute left-0 -translate-y-[8vh] w-[12vw] h-[13vw] z-30 transition-all duration-500 translate-x-[7vw] opacity-100`}
        style={{ backgroundImage: `url(${images.tiloHappy})`, backgroundSize: '100% 100%' }}>
      </div> : <div className={`absolute left-0 -translate-y-[8vh] w-[12vw] h-[13vw] z-30 transition-all duration-500 translate-x-[7vw] opacity-100`}
        style={{ backgroundImage: `url(${images.tiloSad})`, backgroundSize: '100% 100%' }}>
      </div>}

      <div className={`absolute left-0 w-[12vw] h-[9vh] z-20 transition-all duration-500 translate-x-[6vw] opacity-100`}
        style={{ backgroundImage: `url(${images.tiloShadow})`, backgroundSize: '100% 100%' }}>
      </div>

      <div className={`bg-[#003a43] relative h-fit w-fit border-[1.5vh] z-20 border-[#006379] -translate-y-[8vh] rounded-[3vh] flex flex-col items-center justify-center gap-[2.5vh] p-[3vh] transition-all duration-500 ${isMovingLeft ? 'opacity-100 translate-x-[22vh]' : 'opacity-0 translate-x-[33vh]'}`}>
        <div className={`flex items-start justify-center`}>
          <div className="h-fit grid gap-[0.5vh]"
            style={{ gridTemplateColumns: `repeat(${number1}, minmax(0, 1fr))` }}>
            {Array.from({ length: number2 }, (_: number, rowIndex: number) => (
              Array.from({ length: number1 }, (_: number, colIndex: number) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`aspect-square rounded-[0.1vw] w-[1.8vh] h-[1.8vh]
                    ${colIndex < number1 && rowIndex < number2 ?
                      showColumn ?
                        colIndex === 0 ? 'bg-[#40E0D0]' :
                          showRow ? 'bg-[#40E0D0]' : 'bg-[#4c757b]'
                        : 'bg-[#4c757b]'
                      : 'bg-[#4c757b]'
                    }`}
                />
              ))
            ))}
          </div>
        </div>

        <div className={`absolute w-[2vh] left-0 top-0 translate-x-[1.5vh] translate-y-[2vh] border-l-4 border-b-4 border-t-4 border-white transition-all duration-200 ${showColumn ? 'opacity-100' : 'opacity-0'}`}
          style={{ height: `${(number2 * 1.8) + (number2 - 1) * 0.5 + 2.5}vh` }}>
        </div>
        <div className={`absolute top-0 left-0 h-[2vh] translate-x-[1.5vh] translate-y-[2vh]  border-l-4 border-r-4 border-t-4 border-white transition-all duration-200 ${showRow ? 'opacity-100' : 'opacity-0'}`}
          style={{ width: `${(number1 * 1.8) + (number1 - 1) * 0.5 + 2.5}vh` }}>
        </div>

        <div className={`absolute w-[2vh] left-0 top-0 flex items-center justify-center translate-y-[2vh] -translate-x-[3vh] transition-all duration-200 ${showColumn ? 'opacity-100' : 'opacity-0'}`}
          style={{ height: `${(number2 * 1.8) + (number2 - 1) * 0.5 + 2.5}vh` }}>
            <div style={{ backgroundImage: `url(${images.blueboxH})`, backgroundSize: '100% 100%' }} className='absolute w-[6vh] h-[5vh] flex items-center justify-center text-[3vh] px-[2.1vh] pr-[4.4vh]'>
            {number2}
          </div>
        </div>

        <div className={`absolute top-0 left-0 h-[2vh] translate-x-[1.5vh] -translate-y-[2.2vh] flex items-center justify-center transition-all duration-200 ${showRow ? 'opacity-100' : 'opacity-0'}`}
          style={{ width: `${(number1 * 1.8) + (number1 - 1) * 0.5 + 2.5}vh` }}>
            <div style={{ backgroundImage: `url(${images.blueboxV})`, backgroundSize: '100% 100%' }} className='absolute w-[5vh] h-[6vh] flex items-center justify-center text-[3vh] px-[2.1vh] pb-[1.4vh]'>
            {number1}
          </div>
        </div>

        <div className={`flex items-center justify-center w-full `}>
          <div className={`bg-[#ffffff] border-[#7f7f7f] border-[0.2vh] rounded-[1vh] text-[#003a43] leading-none text-[3vh] px-[2vh] py-[1vh] shadow-[0.2vh_0.2vh_0_0_#7f7f7f]`}>
            {number1} x {number2}
          </div>
        </div>
      </div>

      <div style={{backgroundImage: `url(${images.boxShadow})`, backgroundSize: '100% 100%', width: `${(number1 * 2.2) + ((number1 - 1) * 0.5)}vh`, height: `10vh`}} className={`absolute z-10 transition-all duration-500 ${isMovingLeft ? 'translate-x-[18vh] opacity-100' : 'translate-x-[33vh] opacity-0'}`}></div>
          
    </div>
  )
}