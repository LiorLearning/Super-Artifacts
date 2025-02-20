import { useState, useEffect } from 'react';
import blue from '../components/blue.png'
import orange from '../components/orange.png'

interface MultiplyBoxProps {
  number1: number;  // 23
  number2: number;  // 4
}

export default function MultiplyBox({ number1, number2 }: MultiplyBoxProps) {
  const [sliderValue, setSliderValue] = useState(0);

  return (
    <div className="flex w-[50vh]">
      <div className='flex flex-col items-center justify-start'>
        <div className='bg-[#f00004] text-[3vh] border-t-[0.7vh] border-x-[1.2vh] border-[#a70003] px-[2vh] mx-[3vh] mt-[4vh] text-white mr-[14.5vh]'>
          FIX
        </div>

        <div className={`bg-white border-[1.5vh] border-[#006379] rounded-[3vh] w-[30vh] flex items-center justify-center p-[2vh]`}
          style={{ height: `${(number1 * 2.4) + 8}vh` }}
        >
          <div className='relative h-full flex flex-col items-center justify-start'>

            <div style={{ height: `${(sliderValue / number1) * 100}%` }} className='flex items-center justify-center'>
              {sliderValue !== 0 && <div style={{ backgroundImage: `url(${orange.src})`, backgroundSize: '100% 100%'}} className='absolute w-[7vh] h-[5vh] text-[3vh] text-black pr-[2.3vh] text-center  pt-[0.2vh] z-10 -translate-x-[7vh]'>
                {sliderValue}
              </div>}
            </div>

            <div style={{ height: `${((number1 - sliderValue) / number1) * 100}%` }} className='flex items-center justify-center'>
              {sliderValue !== number1 && <div style={{ backgroundImage: `url(${blue.src})`, backgroundSize: '100% 100%'}} className='absolute w-[7vh] h-[5vh] text-[3vh] text-black pr-[2.3vh] text-center  pt-[0.2vh] z-10 -translate-x-[7vh]'>
                {number1 - sliderValue}
              </div>}
            </div>
          </div>

          <input
            type="range"
            min={0}
            max={number1}
            value={sliderValue}
            onChange={(e) => setSliderValue(Number(e.target.value))}
            className='absolute cursor-pointer rotate-90  -translate-x-[2vh] z-20 opacity-0'
            style={{ width: `${(number1 * 2.2) + 3}vh` }}
          />

          <div className="absolute h-fit grid grid-cols-1">
            {Array.from({ length: number1 }, (_, rowIndex) => (
              Array.from({ length: 1 }, (_, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`aspect-square  -translate-x-[2vh] transition-colors w-[1.5vh] h-[2.4vh] duration-200
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
          <div className='realtive h-[95%] -translate-x-[3.2vh] -translate-y-[1.5vh]'>
            <div className='absolute w-[2.5vh] h-[2.5vh] border-[0.7vh] border-[#d9d9d9] bg-[#808080] rounded-full'
              style={{ top: `${(sliderValue / number1) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className='ml-[16vh] absolute bg-[#003a43] border-[1.5vh] border-[#006379] rounded-[3vh] flex flex-col items-center p-[2vh] py-[4vh] justify-start'>
        <div className='text-[3.5vh] bg-white rounded-[2vh] px-[4vh] leading-none py-[1vh] shadow-[-0.2vw_0.2vw_0px_0px_rgba(0,0,0)] shadow-[#7f7f7f] mb-[2.5vh]'>
          {number1} x {number2}
        </div>
        <div className="h-fit grid grid-cols-11 gap-[0.4vh] rounded-lg">
          {Array.from({ length: number1 }, (_, rowIndex) => (
            Array.from({ length: 11 }, (_, colIndex) => (
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

