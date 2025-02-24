import { useState, useEffect, useRef } from 'react';
import blue from '../assets/blue.png'
import orange from '../assets/orange.png'
import slider from '../assets/slider.png'
import move from '../assets/move.gif'
import bluebox from '../assets/bluebox.png'
import orangebox from '../assets/orangebox.png'
import sumbox from '../assets/sumbox.png'
import NewInput from '@/components/ui/newinput';
import { BaseProps } from '../utils/types';
import { useGameState } from '../state-utils';
import { goToStep } from '../utils/helper';

interface MultiplyBoxProps extends BaseProps {
  number1: number;  // 23
  number2: number;  // 4
  transition?: boolean;
  short?: boolean;
  onCorrect?: () => void;
  onIncorrect?: () => void;
  onCorrectInput?: () => void;
  onIncorrectInput?: () => void;
  fixColorNotRed?: boolean;
  isDragging?: boolean;
  setIsDragging?: (isDragging: boolean) => void;
  defaultSilderValue?: number
  stepPartialProduct?: boolean;
  stepSum?: boolean;

}

export default function MultiplyBox({
  number1,
  number2,
  transition = true,
  short = false,
  onCorrect,
  onIncorrect,
  fixColorNotRed = false,
  isDragging = false,
  setIsDragging,
  defaultSilderValue = 0,
  stepPartialProduct = false,
  stepSum = false,
  sendAdminMessage }: MultiplyBoxProps) {


  const { gameStateRef, setGameStateRef } = useGameState();
  const nextInputRef = useRef<HTMLInputElement>(null);
  const [sliderValue, setSliderValue] = useState(defaultSilderValue);
  const [inputValue1, setInputValue1] = useState('');
  const [glow1, setGlow1] = useState(true);
  const [inputValue2, setInputValue2] = useState('');
  const [glow2, setGlow2] = useState(false);
  const [sum, setSum] = useState('');
  const [sumGlow, setSumGlow] = useState(true);


  const handleFIX = () => {
    if (sliderValue === number1 % 10) {
      onCorrect?.();
    } else {
      onIncorrect?.();
    }
  }

  function handleInputCorrect(type: 'first' | 'second') {
    if (type === 'first') {
      setGlow2(true);
      nextInputRef.current?.focus();
    } else if (type === 'second' && inputValue1 === ((number1 % 10) * number2).toString()) {
      setTimeout(() => {
        onCorrect?.();
      }, 2000)
    }
  }

  function handleInputIncorrect(type: 'first' | 'second', attempt: string, correct: string) {
    if (type === 'first') {
      sendAdminMessage('admin', `User has entered ${attempt} which is wrong for ${sliderValue} x ${number2}, the answer is ${correct}, the question is ${number1} x ${number2} partial product, diagnose socratically with respect to user's current game state`);
    } else if (type === 'second') {
      sendAdminMessage('admin', `User has entered ${attempt} which is wrong for ${number1 - sliderValue} x ${number2}, the answer is ${correct}, the question is ${number1} x ${number2} partial product, diagnose socratically with respect to user's current game state`);
    }
  }

  function handleSumCorrect() {
    setTimeout(() => {
      onCorrect?.();
    }, 2000)
  }

  function handleSumIncorrect(attempt: string, correct: string) {
    sendAdminMessage('admin', `User has entered wrong sum ${attempt}, the answer is ${correct}, the question is sum after partial product  ${((number1 % 10) * number2) + ((number1 - (number1 % 10)) * number2)}, diagnose socratically with respect to user's current game state`);
  }

  return (
    <div className="flex w-[50vh]">
      <div className={`flex flex-col items-center justify-start ${transition ? 'transition-all duration-1000 opacity-100' : 'opacity-0 translate-x-[25vh]'}`}>
        <button onClick={handleFIX} className={`${fixColorNotRed ? 'bg-[#c8c8c8] border-[#707070]' : 'bg-[#f00004] border-[#a70003]'}  text-[3vh] border-t-[0.7vh] border-x-[1.2vh]  px-[2vh] mx-[3vh] mt-[4vh] text-white -translate-x-[4vh]`}>
          FIX
        </button>

        <div className={`bg-white border-[1.5vh] border-[#006379] rounded-[3vh] w-[25vh] flex items-center justify-center p-[2vh] pl-[5vh]`}
          style={{ height: `${(number1 * 2.5) + 8}vh` }}
        >
          <div className='relative h-full flex flex-col items-center justify-start'>

            <div style={{ height: `${(sliderValue / number1) * 100}%` }} className='flex items-center justify-center'>
              {sliderValue !== 0 && <div style={{ backgroundImage: `url(${orange.src})`, backgroundSize: '100% 100%' }} className='absolute w-[7vh] h-[5vh] text-[3vh] text-black pr-[2.3vh] text-center  pt-[0.2vh] z-10 -translate-x-[7vh]'>
                {sliderValue}
              </div>}
            </div>

            <div style={{ height: `${((number1 - sliderValue) / number1) * 100}%` }} className='flex items-center justify-center'>
              {sliderValue !== number1 && <div style={{ backgroundImage: `url(${blue.src})`, backgroundSize: '100% 100%' }} className='absolute w-[7vh] h-[5vh] text-[3vh] text-black pr-[2.3vh] text-center  pt-[0.2vh] z-10 -translate-x-[7vh]'>
                {number1 - sliderValue}
              </div>}
            </div>
          </div>

          {stepPartialProduct && <div className={`relative h-full flex flex-col items-center justify-start z-20`}
            style={{
              transform: `translateX(${number2 <= 4 ? 35.7 :
                number2 === 5 ? 36.5 :
                  number2 === 6 ? 39 :
                    number2 === 7 ? 41.5 :
                      number2 === 8 ? 44 :
                        46.5
                }vh)`
            }}>
            <div style={{ height: `${(sliderValue / number1) * 100}%` }} className='flex items-center justify-center'>
              {sliderValue !== 0 && <div style={{ backgroundImage: `url(${orangebox.src})`, backgroundSize: '100% 100%' }} className='absolute text-black flex items-center justify-center gap-[0.7vh] w-[20vh] h-[7vh] text-[3vh] pb-[0.5vh] text-center z-10 -translate-x-[7vh]'>
                <h1 className=''>=</h1>
                <h1 className=''>{number1 % 10}</h1>
                <h1 className=''>x</h1>
                <h1 className=''>{number2}</h1>
                <h1 className=''>=</h1>
                <NewInput
                  value={inputValue1}
                  onValueChange={(value) => { setInputValue1(value); setGlow1(false); }}
                  className={`w-[4vh] h-[4vh] bg-white rounded-[0.3vw] placeholder:text-[#ed7708] text-[#ed7708] text-[3vh] outline-none border-none text-center ${glow1 ? '[animation:bounce_0.5s_ease-in-out_infinite]' : ''}`}
                  placeholder='?'
                  correctValue={((number1 % 10) * number2).toString()}
                  onCorrect={() => handleInputCorrect('first')}
                  onIncorrect={(attempt, correct) => handleInputIncorrect('first', attempt, correct)}
                />
              </div>}
            </div>

            <div style={{ height: `${((number1 - sliderValue) / number1) * 100}%` }} className='flex items-center justify-center'>
              {number1 - sliderValue !== 0 && <div style={{ backgroundImage: `url(${bluebox.src})`, backgroundSize: '100% 100%' }} className='absolute text-black flex items-center justify-center gap-[0.7vh] w-[20vh] h-[7vh] text-[3vh] text-center z-10 -translate-x-[7vh]'>
                <h1 className=''>=</h1>
                <h1 className=''>{number1 - (number1 % 10)}</h1>
                <h1 className=''>x</h1>
                <h1 className=''>{number2}</h1>
                <h1 className=''>=</h1>
                <NewInput
                  ref={nextInputRef}
                  value={inputValue2}
                  onValueChange={(value) => { setInputValue2(value); setGlow2(false) }}
                  className={`w-[4vh] h-[4vh] bg-white rounded-[0.3vw] placeholder:text-[#00a9c0] text-[#00a9c0] text-[3vh] outline-none border-none text-center ${glow2 ? '[animation:bounce_0.5s_ease-in-out_infinite]' : ''}`}
                  placeholder='?'
                  correctValue={((number1 - sliderValue) * number2).toString()}
                  onCorrect={() => handleInputCorrect('second')}
                  onIncorrect={(attempt, correct) => handleInputIncorrect('second', attempt, correct)}
                />
              </div>}
            </div>
          </div>}

          {stepSum && <div className={`relative h-full flex flex-col items-center justify-start z-20`}>
            <div style={{
              backgroundImage: `url(${sumbox.src})`, backgroundSize: '100% 100%',
              transform: `translateX(${number2 <= 4 ? 35.7 :
                number2 === 5 ? 36.5 :
                  number2 === 6 ? 39 :
                    number2 === 7 ? 41.5 :
                      number2 === 8 ? 44 :
                        46.5
                }vh)`,
              
            }} className={`absolute text-[4vh] w-[20vh] h-[30vh] text-black flex flex-col items-center justify-start pl-[2vh] pt-[2.6vh] gap-[2.5vh] z-10`}>
              <h1 className='text-[#ed7708]'>{(number1 % 10) * number2}</h1>
              <h1 className='text-[#00a9c0]'>{(number1 - (number1 % 10)) * number2}</h1>
              <NewInput 
                value={sum}
                onValueChange={(value) => { setSum(value); setSumGlow(false) }}
                className={`w-[7vh] mt-[4vh] h-[4vh] bg-white placeholder:text-[#737373] text-[#737373] text-[4vh] outline-none border-none text-center ${sumGlow ? '[animation:ping_1s_ease-in-out_infinite]' : ''}`}
                placeholder='?'
                useColor={true}
                correctValue={(number1 * number2).toString()}
                onCorrect={() => handleSumCorrect()}
                onIncorrect={(attempt, correct) => handleSumIncorrect(attempt, correct)}
              />
            </div>
          </div>}


          <input
            type="range"
            min={0}
            max={number1}
            value={sliderValue}
            onChange={(e) => {
              if (!stepPartialProduct) {
                setSliderValue(Number(e.target.value));
                setIsDragging?.(false);
              }
            }}
            className='absolute cursor-pointer rotate-90  -translate-x-[2vh] z-20 opacity-0'
            style={{ width: `${(number1 * 2.4) + 3}vh` }}
          />



          <div className="absolute h-fit grid grid-cols-1">
            {Array.from({ length: number1 }, (_, rowIndex) => (
              Array.from({ length: 1 }, (_, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`aspect-square  -translate-x-[2vh] transition-colors w-[1.5vh] h-[2.45vh] duration-200
                    ${colIndex < number2
                      ? rowIndex < sliderValue
                        ? ' bg-[#ffa500]'
                        : 'bg-[#40E0D0]'
                      : 'bg-[#4c757b]'
                    }`}
                />
              ))
            ))}
          </div>
          <div className='realtive h-[95%] -translate-x-[3.2vh] -translate-y-[1.8vh]'>
            <div className='absolute w-[4.5vh] h-[4.5vh] -translate-x-[1.4vh] '
              style={{ top: `${(sliderValue / number1) * 100}%`, backgroundImage: `url(${slider.src})`, backgroundSize: '100% 100%' }}

            />
          </div>

          {isDragging && <div className={`absolute z-20 translate-y-[15vh] transition-all duration-1000 ${transition ? 'opacity-100 translate-x-[1.5vh]' : 'opacity-0 translate-x-[10vh]'}`}
            style={{ top: `${(sliderValue / number1) * 100}%` }}>
            <img src={move.src} alt="move" className="w-[20vh] h-[20vh] select-none" />
          </div>}
        </div>
      </div>

      <div className='ml-[15vh] absolute bg-[#003a43] border-[1.5vh] border-[#006379] rounded-[3vh] flex flex-col items-center p-[2vh] py-[4vh] justify-start'>
        <div className={`${short ? 'text-[3vh] px-[2vh]' : 'text-[3.5vh] px-[4vh]'} bg-white rounded-[2vh] leading-none py-[1vh] shadow-[-0.2vw_0.2vw_0px_0px_rgba(0,0,0)] shadow-[#7f7f7f] mb-[2.5vh]`}>
          {number1} x {number2}
        </div>
        <div className={`h-fit grid gap-[0.5vh] rounded-lg`}
          style={{ gridTemplateColumns: `repeat(${short ? number2 : 11}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: number1 }, (_, rowIndex) => (
            Array.from({ length: short ? number2 : 11 }, (_, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`aspect-square rounded-sm transition-colors w-[2vh] h-[2vh] duration-200
                    ${colIndex < number2
                    ? rowIndex < sliderValue
                      ? ' bg-[#ffa500]'
                      : 'bg-[#40E0D0]'
                    : 'bg-[#4c757b]'
                  }`}
              />
            ))
          ))}
        </div>
      </div>
    </div>
  );
}

