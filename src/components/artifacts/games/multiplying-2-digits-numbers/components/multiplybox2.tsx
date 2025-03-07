import { useState, useEffect, useRef } from 'react';
import { images } from '../utils/image';
import { NewInput } from '@/components/ui/newinput';
import { BaseProps } from '../utils/types';
import { useGameState } from '../state-utils';
import { sounds } from '../utils/sound';


interface MultiplyBoxProps2 extends BaseProps {
  number1: number;  // 23 (horizontal)
  number2: number;  // 14 (vertical)
  horizontalSliderValue: number;
  setHorizontalSliderValue: (value: number) => void;
  verticalSliderValue: number;
  setVerticalSliderValue: (value: number) => void;
  onCorrect: () => void;
}

export default function MultiplyBox2({
  number1,
  number2,
  horizontalSliderValue,
  setHorizontalSliderValue,
  verticalSliderValue,
  setVerticalSliderValue,
  sendAdminMessage,
  onCorrect
}: MultiplyBoxProps2) {

  const { gameStateRef, setGameStateRef } = useGameState();
  const [value, setValue] = useState('');

  const [isGreen, setIsGreen] = useState(false);
  const [isOrange, setIsOrange] = useState(false);
  const [isYellow, setIsYellow] = useState(false);
  const [isBlue, setIsBlue] = useState(false);
  const [bounce, setBounce] = useState(true);
  const [isCorrect, setIsCorrect] = useState(false);


  const hasGameStartedRef = useRef(false);

  useEffect(() => {
    if (!hasGameStartedRef.current) {
      hasGameStartedRef.current = true;
      if (horizontalSliderValue === (number1 % 10)) {
        if (verticalSliderValue === number2 % 10) {
          setIsYellow(true);
        } else {
          setIsBlue(true);
        }
      } else {
        if (verticalSliderValue === number2 % 10) {
          setIsGreen(true);
        } else {
          setIsOrange(true);
        }
      }
    }
  }, []);

  return (
    <div className="flex  h-auto w-auto relative">

      <div className={'absolute w-[90vh] h-[10vh] -translate-x-[28vh]  -translate-y-[25vh] z-50 flex items-center justify-center gap-[1.7vh]'}>
        <div className={`bg-[#ffffff] border-[#7f7f7f] border-[0.2vh] rounded-[1vh] text-[#003a43] leading-none text-[3vh] px-[2vh] py-[1.5vh] shadow-[0.2vh_0.2vh_0_0_#7f7f7f]`}>
          {number1} x {number2}
        </div>

        <div className='text-[4vh] leading-none text-[#003a43] ml-[1.5vh]'>=</div>
        
        <div className='flex flex-col items-center justify-center'>
          <div style={{ backgroundImage: `url(${isGreen ? images.greeninput : isYellow ? images.yellowinput : isOrange ? images.orangeinput : isBlue ? images.blueinput : images.grayinput})`, backgroundSize: '100% 100%' }} className={`opacity-100 w-[10vh] h-[8vh] m-0 flex items-center justify-center mr-[1vh]`}>
            <div className='text-[3vh] leading-none text-[#003a43] bg-white/0 placeholder:text-[#003a43] mt-[0.5vh] ml-[1.3vh] w-[8.5vh] outline-none text-center'>
              {((number1 % 10) * (number2 % 10)).toString()}
            </div>
          </div>
          <div className='w-[10vh] border-b-[0.2vh] border-[#003a43]'></div>
        </div>

        <div className='text-[4vh] leading-none text-[#003a43]'>+</div>

        <div className='flex flex-col items-center justify-center'>
          <div style={{ backgroundImage: `url(${isGreen ? images.greeninput : isYellow ? images.yellowinput : isOrange ? images.orangeinput : isBlue ? images.blueinput : images.grayinput})`, backgroundSize: '100% 100%' }} className={`w-[10vh] h-[8vh] m-0 flex items-center justify-center mr-[1vh] transition-all duration-500 ${isCorrect ? 'opacity-100 translate-y-[0vh]' : 'opacity-0 translate-y-[10vh]'}`}>
            <div className='text-[3vh] leading-none text-[#003a43] bg-white/0 placeholder:text-[#003a43] mt-[0.5vh] ml-[1.3vh] w-[8.5vh] outline-none text-center'>
            {((number1 - (number1 % 10)) * (number2 % 10)).toString()}
            </div>
          </div>
          <div className='w-[10vh] border-b-[0.2vh] border-[#003a43]'></div>
        </div>


        <div className='text-[4vh] leading-none text-[#003a43]'>+</div>

        <div className='flex flex-col items-center justify-center'>
          <div style={{ backgroundImage: `url(${isGreen ? images.greeninput : isYellow ? images.yellowinput : isOrange ? images.orangeinput : isBlue ? images.blueinput : images.grayinput})`, backgroundSize: '100% 100%' }} className={`opacity-0 w-[10vh] h-[8vh] m-0 flex items-center justify-center mr-[1vh]`}>
            <div className='text-[3vh] leading-none text-[#003a43] bg-white/0 placeholder:text-[#003a43] mt-[0.5vh] ml-[1.3vh] w-[8.5vh] outline-none text-center'>
              {((number1 % 10) * (number2 % 10)).toString()}
            </div>
          </div>
          <div className='w-[10vh] border-b-[0.2vh] border-[#003a43]'></div>
        </div>

        <div className='text-[4vh] leading-none text-[#003a43]'>+</div>

        <div className='flex flex-col items-center justify-center'>
          <div style={{ backgroundImage: `url(${isGreen ? images.greeninput : isYellow ? images.yellowinput : isOrange ? images.orangeinput : isBlue ? images.blueinput : images.grayinput})`, backgroundSize: '100% 100%' }} className={`opacity-0 w-[10vh] h-[8vh] m-0 flex items-center justify-center mr-[1vh]`}>
            <div className='text-[3vh] leading-none text-[#003a43] bg-white/0 placeholder:text-[#003a43] mt-[0.5vh] ml-[1.3vh] w-[8.5vh] outline-none text-center'>
              {((number1 % 10) * (number2 % 10)).toString()}
            </div>
          </div>
          <div className='w-[10vh] border-b-[0.2vh] border-[#003a43]'></div>
        </div>
      </div>



      {/* Sliders Values Boxes */}
      {(isYellow || isBlue) && <div className={`absolute flex items-center justify-center -translate-x-[4vh] right-[1vh] transition-all duration-100 opacity-100 -translate-y-[3vh]`} style={{ width: `${(((number1 - horizontalSliderValue) / number1) * 100) * 0.9}%` }}>
        <div style={{ backgroundImage: `url(${isYellow ? images.yellowboxV : images.blueboxV})`, backgroundSize: '100% 100%' }} className='absolute w-[5vh] h-[6vh] flex items-center justify-center text-[3vh] px-[2.1vh] pb-[1.4vh]'>
          {number1 - horizontalSliderValue}
        </div>
      </div>}

      {(isGreen || isOrange) && <div className={`absolute bg-black flex items-center justify-center left-[4.5vh] transition-all duration-100 opacity-100 -translate-y-[3vh]`} style={{ width: `${(((horizontalSliderValue) / number1) * 100) * 0.9}%` }}>
        <div style={{ backgroundImage: `url(${isGreen ? images.greenboxV : isYellow ? images.yellowboxV : isOrange ? images.orangeboxV : images.blueboxV})`, backgroundSize: '100% 100%' }} className='absolute w-[5vh] h-[6vh] flex items-center justify-center text-[3vh] px-[2.1vh] pb-[1.4vh]'>
          {horizontalSliderValue}
        </div>
      </div>}

      {(isOrange || isBlue) && <div className={`absolute z-20 flex items-center bottom-[11.5vh] justify-center transition-all duration-100 opacity-100 -translate-x-[3vh]`} style={{ height: `${(((number2 - verticalSliderValue) / number2) * 100) * 0.7}%` }}>
        <div style={{ backgroundImage: `url(${isOrange ? images.orangeboxH : images.blueboxH})`, backgroundSize: '100% 100%' }} className='absolute w-[6vh] h-[5vh] flex items-center justify-center text-[3vh] px-[2.1vh] pr-[4.4vh]'>
          {number2 - verticalSliderValue}
        </div>
      </div>}

      {(isGreen || isYellow) && <div className={`absolute z-20 flex items-center top-[4.5vh] justify-center transition-all duration-100 opacity-100 -translate-x-[3vh]`} style={{ height: `${(((verticalSliderValue) / number2) * 100) * 0.7}%` }}>
        <div style={{ backgroundImage: `url(${isGreen ? images.greenboxH : isYellow ? images.yellowboxH : images.blueboxH})`, backgroundSize: '100% 100%' }} className='absolute w-[6vh] h-[5vh] flex items-center justify-center text-[3vh] px-[2.1vh] pr-[4.4vh]'>
          {verticalSliderValue}
        </div>
      </div>}



      {/* Distinguishing Lines */}
      {horizontalSliderValue !== 0 && <div className='absolute translate-x-[4vh] h-[80%] z-20 overflow-hidden'
        style={{ width: `${(number1 * 1.8) + ((number1 - 1) * 0.5) + 0.5}vh` }}>
        <div className='absolute w-[0.5vh] top-[4.5vh] bg-white'
          style={{ height: `${(number2 * 1.8) + ((number2 - 1) * 0.5)}vh`, left: `${((horizontalSliderValue) / number1) * 100}%` }}>
        </div>
      </div>}

      {verticalSliderValue !== 0 && <div className='absolute w-[100%] translate-y-[4vh] z-20 overflow-hidden'
        style={{ height: `${(number2 * 1.8) + ((number2 - 1) * 0.5) + 0.5}vh` }}>
        <div className='absolute h-[0.5vh] left-[4.5vh]  bg-white'
          style={{ width: `${(number1 * 1.8) + ((number1 - 1) * 0.5)}vh`, top: `${((verticalSliderValue) / number2) * 100}%` }}>
        </div>
      </div>}


      {/* Grid */}
      <div className={`bg-[#003a43] relative h-fit w-fit border-[1.5vh] border-[#006379] rounded-[3vh] flex flex-col items-center justify-center opacity-100 gap-[2vh] pt-[3vh] px-[3vh] pb-[2vh]`}>
        <div className={`flex items-start justify-center`}>
          <div className="h-fit grid gap-[0.5vh]"
            style={{ gridTemplateColumns: `repeat(${number1}, minmax(0, 1fr))` }}>
            {Array.from({ length: number2 }, (_: number, rowIndex: number) => (
              Array.from({ length: number1 }, (_: number, colIndex: number) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`aspect-square rounded-[0.1vw] w-[1.8vh] h-[1.8vh] transition-colors duration-200
                      ${colIndex < horizontalSliderValue && rowIndex < verticalSliderValue && isGreen
                      ? 'bg-[#84da52]'
                      : colIndex < horizontalSliderValue && rowIndex >= verticalSliderValue && isOrange
                        ? 'bg-[#f8a34b]'
                        : colIndex >= horizontalSliderValue && rowIndex < verticalSliderValue && isYellow
                          ? 'bg-[#d9c61e]'
                          : colIndex >= horizontalSliderValue && rowIndex >= verticalSliderValue && isBlue
                            ? 'bg-[#5cdbec]'
                            : 'bg-[#4c757b]'
                    }`}
                />
              ))
            ))}
          </div>
        </div>

        <div className={`flex items-center justify-center w-full `}>
          <div className={`bg-[#ffffff] border-[#7f7f7f] border-[0.2vh] rounded-[1vh] text-[#003a43] leading-none text-[3vh] px-[2vh] py-[1vh] shadow-[0.2vh_0.2vh_0_0_#7f7f7f]`}>
            {number2 % 10} x {number1 - (number1 % 10)}
          </div>
          <div className='text-[4vh] leading-none text-white ml-[2vh]'>=</div>

          <div style={{ backgroundImage: `url(${isGreen ? images.greeninput : isYellow ? images.yellowinput : isOrange ? images.orangeinput : isBlue ? images.blueinput : images.grayinput})`, backgroundSize: '100% 100%' }} className={`w-[10vh] h-[8vh] m-0 flex items-center justify-center ${bounce ? 'animate-bounce' : ''}`}>
            <NewInput
              value={value}
              onValueChange={(value) => { setValue(value); setBounce(false) }}
              className='text-[3vh] leading-none text-[#003a43] bg-white/0 placeholder:text-[#003a43] ml-[1.5vh] w-[8.5vh] outline-none text-center'
              placeholder='?'
              correctValue={((number2 % 10) * (number1 - (number1 % 10))).toString()}
              onCorrect={() => {
                sounds.right();
                setIsCorrect(true);
                onCorrect();
              }}
              onIncorrect={(attempt, correct) => {
                sounds.wronginput();
                sendAdminMessage('admin', `User has entered ${attempt} which is wrong for ${number2 % 10} x ${number1 - (number1 % 10)}, the answer is ${correct}, the question is ${number1} x ${number2} partial product, diagnose socratically with respect to user's current game state`);
              }}
            />
          </div>

        </div>
      </div>
    </div>
  );
}
