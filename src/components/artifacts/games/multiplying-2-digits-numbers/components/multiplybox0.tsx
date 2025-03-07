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
import hand from '../assets/hand.png';
import { useNarrations } from '../state-utils';
import { formatMessage } from './commonFunctions';

interface MultiplyBoxProps0 extends BaseProps {
  number1: number;  // 23 (horizontal)
  number2: number;  // 14 (vertical)
  horizontalSliderValue: number;
  setHorizontalSliderValue: (value: number) => void;
  verticalSliderValue: number;
  setVerticalSliderValue: (value: number) => void;
  setBreakNumber2: (value: boolean) => void;
  setCorrectSplit: (value: boolean) => void;
  lockPopup: boolean;
  setLockPopup: (value: boolean) => void;
  hintPopup: boolean;
  setHintPopup: (value: boolean) => void;
  onCorrect: () => void;
}

export default function MultiplyBox0({
  number1,
  number2,
  horizontalSliderValue,
  setHorizontalSliderValue,
  verticalSliderValue,
  setVerticalSliderValue,
  setBreakNumber2,
  setCorrectSplit,
  lockPopup,
  setLockPopup,
  hintPopup,
  setHintPopup,
  sendAdminMessage,
  onCorrect
}: MultiplyBoxProps0) {

  
  const [horizontalStep, setHorizontalStep] = useState(false);
  const [verticalStep, setVerticalStep] = useState(false);
  const [showHorizontalHand, setShowHorizontalHand] = useState(false);
  const [showVerticalHand, setShowVerticalHand] = useState(false);
  const [isCorrectHorizontalLock, setIsCorrectHorizontalLock] = useState(false);
  const [isCorrectVerticalLock, setIsCorrectVerticalLock] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [lockAvailable, setLockAvailable] = useState(false);
  const [hintAvailable, setHintAvailable] = useState(false);    
  const wrongAttempt = useRef<number>(0);
  const narrations = useNarrations();
  const { gameStateRef, setGameStateRef } = useGameState();
  const hasGameStartedRef = useRef(false);


  useEffect(() => {
    if (!hasGameStartedRef.current) {
      hasGameStartedRef.current = true;
      setTimeout(() => {
        setHorizontalStep(true);
        setShowHorizontalHand(true);
      }, 1000);
    }
  }, []);

  useEffect(() => {
    if (isDragging && gameStateRef.current.state2.step === 0) {
      setTimeout(() => {
        setLockPopup(true);
        setLockAvailable(true);
      }, 2000);
    } else if (isDragging) {
      setLockAvailable(true);
    }
  }, [isDragging]);


  function handleLock() {
      
    if(horizontalStep) {
      if(horizontalSliderValue === number1 % 10 || horizontalSliderValue === (number1 - (number1 % 10))) {
        sounds.right();
        setIsCorrectHorizontalLock(true);
        if(narrations.Screen2Step0Message2.send) {
          sendAdminMessage(narrations.Screen2Step0Message2.role, formatMessage(narrations.Screen2Step0Message2.content, {}));
        }
        setHorizontalStep(false);
        setVerticalStep(true);
        wrongAttempt.current = 0;
        setBreakNumber2(true);
        setHintAvailable(false);
        setTimeout(() => {
          setShowVerticalHand(true);
        }, 300);
      } else {
        sounds.wrong();
        wrongAttempt.current++;

        if(narrations.Screen2Step0Message4.send && wrongAttempt.current === 1) {
          sendAdminMessage(narrations.Screen2Step0Message4.role, formatMessage(narrations.Screen2Step0Message4.content, {
            number: number1, 
            a: horizontalSliderValue, 
            b: number1 - horizontalSliderValue, 
            c: Math.floor(number1 / 10) * 10, 
            d: number1 % 10
          }));
        } else if(narrations.Screen2Step0Message5.send && wrongAttempt.current === 2) {
          sendAdminMessage(narrations.Screen2Step0Message5.role, formatMessage(narrations.Screen2Step0Message5.content, {}));
          setHintAvailable(true);
        }
        
      }
    } else if(verticalStep) {
      if(verticalSliderValue === number2 % 10 || verticalSliderValue === (number2 - (number2 % 10))) {
        sounds.right();
        setIsCorrectVerticalLock(true);
        if(narrations.Screen2Step0Message3.send) {
          sendAdminMessage(narrations.Screen2Step0Message3.role, formatMessage(narrations.Screen2Step0Message3.content, { number1, number2 }));
        }
        setCorrectSplit(true);
        setTimeout(() => {
          onCorrect();
        }, 4000);
        setShowHorizontalHand(false);
        setShowVerticalHand(false);
        setVerticalStep(false);
        setHorizontalStep(false);
      } else {
        wrongAttempt.current++;
        sounds.wrong();

        if(narrations.Screen2Step0Message4.send && wrongAttempt.current === 1) {
          sendAdminMessage(narrations.Screen2Step0Message4.role, formatMessage(narrations.Screen2Step0Message4.content, {
            number: number2, 
            a: verticalSliderValue, 
            b: number2 - verticalSliderValue, 
            c: Math.floor(number2 / 10) * 10, 
            d: number2 % 10
          }));
        } else if(narrations.Screen2Step0Message5.send && wrongAttempt.current === 2) {
          sendAdminMessage(narrations.Screen2Step0Message5.role, formatMessage(narrations.Screen2Step0Message5.content, {}));
          setHintAvailable(true);
        }
      }
    }
  }

  return (
    <div className="flex h-auto w-auto relative">
      

      {/* Horizontal hand animation */}
      {showHorizontalHand && <div 
        style={{
          backgroundImage: `url(${hand.src})`, 
          backgroundSize: '100% 100%', 
          width: '8vh', 
          height: '8vh',
          animation: 'handAnimationHorizontal 2s infinite ease-in-out'
        }} 
        className='top-0 left-0 translate-x-[6vh] -translate-y-[4vh] absolute z-20'
      ></div>}
      
      
      
      <div className={`absolute mx-[1.5vh] w-fit px-[1.5vh] bg-white border-[1.5vh] border-[#006379] rounded-[3vh] h-[20vh]  flex flex-col items-start justify-center transition-all duration-500 ${horizontalStep ? 'opacity-100 -translate-y-[12vh]' : 'opacity-0 translate-x-[1vh]'}`}>
        <input
          type="range"
          min={0}
          max={number1}
          value={horizontalSliderValue}
          onChange={(e) => {
            setHorizontalSliderValue(Number(e.target.value));
            setShowHorizontalHand(false);
            setIsDragging(true);
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

      {/* Sliders Values Boxes */}
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


      {/* Distinguishing Lines */}
      {horizontalSliderValue !== 0 && <div className='absolute translate-x-[4vh] h-[80%] z-20 overflow-hidden'
        style={{width: `${(number1 * 1.8) + ((number1 - 1) * 0.5) + 0.5}vh`}}>
        <div className='absolute w-[0.5vh] top-[4.5vh] bg-white'
          style={{height: `${(number2 * 1.8) + ((number2 - 1) * 0.5)}vh`, left: `${((horizontalSliderValue) / number1) * 100}%`}}>
        </div>
      </div>}

      {verticalSliderValue !== 0 && <div className='absolute w-[100%] translate-y-[4vh] z-20 overflow-hidden'
        style={{height: `${(number2 * 1.8) + ((number2 - 1) * 0.5) + 0.5}vh`}}>
        <div className='absolute h-[0.5vh] left-[4.5vh]  bg-white'
          style={{width: `${(number1 * 1.8) + ((number1 - 1) * 0.5)}vh`, top: `${((verticalSliderValue) / number2) * 100}%`}}>
        </div>
      </div>}

      

      {/* Vertical */}
      {/* Vertical hand animation */}
      {showVerticalHand && <div 
        style={{
          backgroundImage: `url(${hand.src})`, 
          backgroundSize: '100% 100%', 
          width: '8vh', 
          height: '8vh',
          animation: 'handAnimationVertical 2s infinite ease-in-out'
        }} 
        className='top-0 left-0 absolute z-20 -translate-x-[3.5vh] translate-y-[6vh]'
      ></div>}
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
            setShowVerticalHand(false);
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
          <button className={`border-[0.2vh] rounded-[1vh] text-white text-[2.5vh] py-[0.5vh] shadow-[0.2vh_0.2vh_0_0_#ffffff] w-[8vh] text-center transition-all duration-500 ${lockAvailable ? 'opacity-100 bg-[#e24548] ' : 'opacity-80 bg-[#8e8e8e] '}`}
            onClick={() => lockAvailable ? handleLock() : undefined}>
            LOCK
          </button>
          <div className={`bg-[#ffffff] border-[#7f7f7f] border-[0.2vh] rounded-[1vh] text-[#003a43] leading-none text-[3vh] px-[2vh] py-[1vh] shadow-[0.2vh_0.2vh_0_0_#7f7f7f]`}>
            {number1} x {number2}
          </div>
          <button className={` border-[0.2vh] rounded-[1vh] text-white text-[2.5vh] py-[0.5vh] shadow-[0.2vh_0.2vh_0_0_#ffffff] w-[8vh] text-center transition-all duration-500 ${hintAvailable ? 'opacity-100 bg-[#8445e2]' : 'opacity-80 bg-[#8e8e8e]'}`}
            onClick={() => hintAvailable ? setHintPopup(true) : undefined}>
            HINT
          </button>
        </div>
      </div>
      <style jsx>{`
        @keyframes handAnimationHorizontal {
          0% {
            transform: translate(6vh, -4vh);
            opacity: 1;
          }
          50% {
            transform: translate(10vh, -4vh);
            opacity: 0.5;
          }
          100% {
            transform: translate(6vh, -4vh);
            opacity: 1;
          }
        }
        
        @keyframes handAnimationVertical {
          0% {
            transform: translate(-3.5vh, 6vh);
            opacity: 1;
          }
          50% {
            transform: translate(-3.5vh, 10vh);
            opacity: 0.5;
          }
          100% {
            transform: translate(-3.5vh, 6vh);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
} 