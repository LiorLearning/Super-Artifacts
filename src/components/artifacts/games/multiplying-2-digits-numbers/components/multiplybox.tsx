import { useState, useEffect, useRef } from 'react';
import { images } from '../utils/image';
import { NewInput } from '@/components/ui/newinput';
import { BaseProps } from '../utils/types';
import { useGameState } from '../state-utils';
import { sounds } from '../utils/sound';
import blueboxV from '../assets/blueboxV.png';
import blueboxH from '../assets/blueboxH.png';
import orangeboxV from '../assets/orangeboxV.png';
import orangeboxH from '../assets/orangeboxH.png';
import yellowboxV from '../assets/yellowboxV.png';
import yellowboxH from '../assets/yellowboxH.png';
import greenboxV from '../assets/greenboxV.png';
import greenboxH from '../assets/greenboxH.png';

interface MultiplyBoxProps extends BaseProps {
  number1: number;  // 23 (horizontal)
  number2: number;  // 14 (vertical)
}

export default function MultiplyBox({
  number1,
  number2,
  sendAdminMessage }: MultiplyBoxProps) {

  const { gameStateRef, setGameStateRef } = useGameState();
  // Sliders to control the split points
  const [horizontalSliderValue, setHorizontalSliderValue] = useState(0);
  const [verticalSliderValue, setVerticalSliderValue] = useState(0);
  const [transition, setTransition] = useState(false);
  const [horizontalStep, setHorizontalStep] = useState(false);
  const [verticalStep, setVerticalStep] = useState(false);
  const [isCorrectHorizontalLock, setIsCorrectHorizontalLock] = useState(false);
  const [isCorrectVerticalLock, setIsCorrectVerticalLock] = useState(false);
  const [hint, setHint] = useState(false);

  const hasGameStartedRef = useRef(false);


  useEffect(() => {
    if (!hasGameStartedRef.current) {
      hasGameStartedRef.current = true;
      setTimeout(() => {
        setHorizontalStep(true);
      }, 1000);
    }
  }, []);

  function handleHint() {
    setHint(true);
  }


  function handleLock() {
    setHint(false);
    if(horizontalStep) {
      if(horizontalSliderValue === number1 % 10 || horizontalSliderValue === (number1 - (number1 % 10))) {
        setIsCorrectHorizontalLock(true);
        sendAdminMessage('agent', 'correct');
        setHorizontalStep(false);
        setVerticalStep(true);
      } else {
        sendAdminMessage('agent', 'incorrect');
      }
    } else if(verticalStep) {
      if(verticalSliderValue === number2 % 10 || verticalSliderValue === (number2 - (number2 % 10))) {
        setIsCorrectVerticalLock(true);
        sendAdminMessage('agent', 'correct');
        setVerticalStep(false);
        setHorizontalStep(false);
      } else {
        sendAdminMessage('agent', 'incorrect');
      }
    }
  }

  return (
    <div className="flex  h-auto w-auto relative">

      {/* Horizontal */}
      <div className={`absolute mx-[1.5vh] w-fit px-[1.5vh] bg-white border-[1.5vh] border-[#006379] rounded-[3vh] h-[20vh]  flex flex-col items-start justify-center transition-all duration-500 ${horizontalStep ? 'opacity-100 -translate-y-[12vh]' : 'opacity-0 translate-x-[1vh]'}`}>
        <input
          type="range"
          min={0}
          max={number1}
          value={horizontalSliderValue}
          onChange={(e) => {
            setHorizontalSliderValue(Number(e.target.value));
            setHint(false);
          }}
          className='absolute cursor-pointer z-20 opacity-0'
          style={{ width: `${(number1 * 1.8) + ((number1 - 1) * 0.5)}vh` }}
        />
        <div className="h-fit grid"
          style={{ width: `${(number1 * 1.8) + ((number1 - 1) * 0.5)}vh` }}>
          {Array.from({ length: 1 }, (_, rowIndex) => (
            <div key={rowIndex} className="flex justify-between w-full">
              {Array.from({ length: number1 }, (_, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`aspect-square transition-colors duration-200 h-[1.5vh]`}
                  style={{
                    width: `${((number1 * 1.8) + ((number1 - 1) * 0.5)) / number1}vh`,
                    backgroundColor: colIndex < horizontalSliderValue
                      ? rowIndex < verticalSliderValue
                        ? '#84da52'  // First split section
                        : '#f8a34b'  // Second split section
                      : rowIndex < verticalSliderValue
                        ? '#d9c61e'  // Third split section
                        : '#5cdbec'  // Fourth split section
                  }}
                />
              ))}
            </div>
          ))}
        </div>
        <div className='relative -translate-x-[0.5vh] -translate-y-[2vh] w-[97%]'>
          <div className={`absolute w-[2.5vh] h-[2.5vh] bg-[#868686] border-[0.6vh] border-[#d9d9d9] rounded-full shadow-[0.2vh_0.2vh_0_0_#000000]`}
            style={{
              left: `${(horizontalSliderValue / number1) * 100}%`
            }}>
          </div>
        </div>
      </div>

      
      {horizontalSliderValue !== number1 && <div className={`absolute flex items-center justify-center -translate-x-[4vh] right-[1vh] transition-all duration-100 ${horizontalStep ? 'opacity-100 -translate-y-[6vh]' : isCorrectHorizontalLock ? 'opacity-100 -translate-y-[3vh]' : 'opacity-0'}`} style={{ width: `${(((number1 - horizontalSliderValue) / number1) * 100) * 0.9}%` }}>
          <div style={{ backgroundImage: `url(${verticalSliderValue != 0 ? yellowboxV.src : blueboxV.src})`, backgroundSize: '100% 100%' }} className='absolute w-[5vh] h-[6vh] flex items-center justify-center text-[3vh] px-[2.1vh] pb-[1.4vh]'>
            {number1 -horizontalSliderValue}
          </div>
      </div>}

      {horizontalSliderValue !== 0 && <div className={`absolute bg-black flex items-center justify-center left-[4.5vh] transition-all duration-100 ${horizontalStep ? 'opacity-100 -translate-y-[6vh]' : isCorrectHorizontalLock ? 'opacity-100 -translate-y-[3vh]' : 'opacity-0'}`} style={{ width: `${(((horizontalSliderValue) / number1) * 100) * 0.9}%` }}>
          <div style={{ backgroundImage: `url(${verticalSliderValue != 0 ? greenboxV.src : orangeboxV.src})`, backgroundSize: '100% 100%' }} className='absolute w-[5vh] h-[6vh] flex items-center justify-center text-[3vh] px-[2.1vh] pb-[1.4vh]'>
            {horizontalSliderValue}
          </div>
      </div>}
      
      {verticalSliderValue !== number2 && <div className={`absolute z-20 flex items-center bottom-[11.5vh] justify-center transition-all duration-100 ${verticalStep ? 'opacity-100 -translate-x-[6.3vh]' :   isCorrectVerticalLock ? 'opacity-100 -translate-x-[3vh]' : 'opacity-0'}`} style={{ height: `${(((number2 - verticalSliderValue) / number2) * 100) * 0.7}%` }}>
          <div style={{ backgroundImage: `url(${horizontalSliderValue === 0 ? blueboxH.src : orangeboxH.src})`, backgroundSize: '100% 100%' }} className='absolute w-[6vh] h-[5vh] flex items-center justify-center text-[3vh] px-[2.1vh] pr-[4.4vh]'>
            {number2 - verticalSliderValue}
          </div>
      </div>}

      {verticalSliderValue !== 0 && <div className={`absolute z-20 flex items-center top-[4.5vh] justify-center transition-all duration-100 ${verticalStep ? 'opacity-100 -translate-x-[6.3vh]' : isCorrectVerticalLock ? 'opacity-100 -translate-x-[3vh]' : 'opacity-0'} `} style={{ height: `${(((verticalSliderValue) / number2) * 100) * 0.7}%` }}>
          <div style={{ backgroundImage: `url(${greenboxH.src})`, backgroundSize: '100% 100%' }} className='absolute w-[6vh] h-[5vh] flex items-center justify-center text-[3vh] px-[2.1vh] pr-[4.4vh]'>
            {verticalSliderValue}
          </div>
      </div>}
      
      
      {hint && horizontalStep && <div className='absolute translate-x-[4vh] h-[80%] z-20 overflow-hidden'
        style={{width: `${(number1 * 1.8) + ((number1 - 1) * 0.5) + 0.5}vh`}}>
        <div className='absolute w-[0.5vh] top-[4.5vh] bg-white animate-ping '
          style={{height: `${(number2 * 1.8) + ((number2 - 1) * 0.5)}vh`, left: `${((number1 % 10) / number1) * 100}%`}}>
        </div>
      </div>}

      {hint && verticalStep  && <div className='absolute w-[100%] translate-y-[4vh] z-20 overflow-hidden'
        style={{height: `${(number2 * 1.8) + ((number2 - 1) * 0.5) + 0.5}vh`}}>
        <div className='absolute h-[0.5vh] left-[4.5vh]  bg-white animate-ping'
          style={{width: `${(number1 * 1.8) + ((number1 - 1) * 0.5)}vh`, top: `${((number2 % 10) / number2) * 100}%`}}>
        </div>
      </div>}

      {/* Vertical */}
      <div className={`absolute mt-[1.5vh] bg-white  py-[1.5vh] border-[1.5vh] border-[#006379] rounded-[3vh] w-[20vh]  flex items-center justify-center transition-all duration-500 ${true && verticalStep ? 'opacity-100 -translate-x-[12vh]' : 'opacity-0 translate-x-[1vh]'}`}
        style={{
          height: `${(number2 * 1.8) + ((number2 - 1) * 0.5) + 6}vh`,
        }}>
        <input
          type="range"
          min={0}
          max={number2}
          value={verticalSliderValue}
          onChange={(e) => {
            setVerticalSliderValue(Number(e.target.value));
            setHint(false);
          }}
          className='absolute cursor-pointer rotate-90 z-20 opacity-0'
          style={{
            width: `${(number2 * 1.8) + ((number2 - 1) * 0.5)}vh`,
          }}
        />
        <div className="h-fit grid"
          style={{ height: `${(number2 * 1.8) + ((number2 - 1) * 0.5)}vh` }}>
          {Array.from({ length: number2 }, (_, rowIndex) => (
            <div key={rowIndex} className="flex h-full gap-0">
              {Array.from({ length: 1 }, (_, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`aspect-square transition-colors duration-200 w-[1.5vh] h-full`}
                  style={{
                    backgroundColor: colIndex < horizontalSliderValue
                      ? rowIndex < verticalSliderValue
                        ? '#84da52'  // First split section
                        : '#f8a34b'  // Second split section
                      : rowIndex < verticalSliderValue
                        ? '#d9c61e'  // Third split section
                        : '#5cdbec'  // Fourth split section
                  }}
                />
              ))}
            </div>
          ))}
        </div>
        <div className='relative -translate-y-[1vh] -translate-x-[2vh] bg-black h-[97%]'>
          <div className={`absolute w-[2.5vh] h-[2.5vh] bg-[#868686] border-[0.6vh] border-[#d9d9d9] rounded-full shadow-[0.2vh_0.2vh_0_0_#000000]`}
            style={{
              top: `${(verticalSliderValue / number2) * 100}%`
            }}>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className={`bg-[#003a43] relative h-fit w-fit border-[1.5vh] border-[#006379] rounded-[3vh] flex flex-col items-center justify-center opacity-100 gap-[2.5vh] p-[3vh]`}>
        <div className={`flex items-start justify-center`}>
          <div className="h-fit grid gap-[0.5vh]"
            style={{ gridTemplateColumns: `repeat(${number1}, minmax(0, 1fr))` }}>
            {Array.from({ length: number2 }, (_: number, rowIndex: number) => (
              Array.from({ length: number1 }, (_: number, colIndex: number) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`aspect-square rounded-[0.1vw] w-[1.8vh] h-[1.8vh] transition-colors duration-200
                      ${colIndex < horizontalSliderValue
                      ? rowIndex < verticalSliderValue
                        ? 'bg-[#84da52]'  // First split section
                        : 'bg-[#f8a34b]'  // Second split section
                      : rowIndex < verticalSliderValue
                        ? 'bg-[#d9c61e]'  // Third split section
                        : 'bg-[#5cdbec]'  // Fourth split section
                    }`}
                />
              ))
            ))}
          </div>
        </div>

        <div className={`flex items-center justify-between w-full `}>
          <button className={`bg-[#e24548] border-[0.2vh] rounded-[1vh] text-white text-[2.5vh] px-[1.5vh] py-[0.5vh] shadow-[0.2vh_0.2vh_0_0_#ffffff]`}
            onClick={() => handleLock()}>
            LOCK
          </button>
          <div className={`bg-[#ffffff] border-[#7f7f7f] border-[0.2vh] rounded-[1vh] text-[#003a43] leading-none text-[3vh] px-[2vh] py-[1vh] shadow-[0.2vh_0.2vh_0_0_#7f7f7f]`}>
            {number1} x {number2}
          </div>
          <button className={`bg-[#8445e2] border-[0.2vh] rounded-[1vh] text-white text-[2.5vh] px-[1.5vh] py-[0.5vh] shadow-[0.2vh_0.2vh_0_0_#ffffff]`}
            onClick={() => handleHint()}>
            HINT
          </button>
        </div>
      </div>

    </div>
  );
}
