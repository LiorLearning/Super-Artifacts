import { useState, useEffect, useRef } from 'react';
import { images } from '../utils/image';
import { NewInput } from '@/components/ui/newinput';
import { BaseProps } from '../utils/types';
import { useGameState } from '../state-utils';
import { sounds } from '../utils/sound';

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

  return (
    <div className="flex h-auto w-auto relative">
      <div className={`bg-[#003a43] relative h-fit w-fit border-[1.5vh] border-[#006379] rounded-[3vh] flex flex-col items-center justify-center opacity-100 gap-[2vh] p-[2vh]`}>

        <div className={`flex items-start justify-center`}>
          {/* Horizontal slider for number1 */}

          <div className='flex bg-white z-50 items-center justify-start relative'>
            <input
              type="range"
              min={0}
              max={number1}
              value={horizontalSliderValue}
              onChange={(e) => setHorizontalSliderValue(Number(e.target.value))}
              className='absolute cursor-pointer z-20 opacity-100'
              style={{ width: `${(number1 * 2.4) + 2}vh` }}
            />
          </div>

          {/* Vertical slider for number2 */}
          <div className='flex flex-col h-full bg-white z-50 items-center justify-start relative'>
            <input
              type="range"
              min={0}
              max={number2}
              value={verticalSliderValue}
              onChange={(e) => setVerticalSliderValue(Number(e.target.value))}
              className='absolute cursor-pointer z-20 opacity-100'
              style={{ 
                width: `${(number2 * 2.2) + 2}vh`,
                transform: 'rotate(90deg)',
                transformOrigin: 'left top',
                left: '0',
                top: '0'
              }}
            />
          </div>

         


          {/* Grid visualization */}
          <div className="h-fit grid gap-[0.3vh]">
            {Array.from({ length: number2 }, (_, rowIndex) => (
              <div key={rowIndex} className="flex gap-[0.5vh]">
                {Array.from({ length: number1 }, (_, colIndex) => (
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
                ))}
              </div>
            ))}
          </div>
        </div>
        
        <div className='text-white text-[2vh] mt-[1vh]'>
          <div className="flex flex-col items-center">
            <div className="flex gap-[1vh] items-center">
              <span>{horizontalSliderValue}</span>
              <span>+</span>
              <span>{number1 - horizontalSliderValue}</span>
              <span>=</span>
              <span>{number1}</span>
            </div>
            <div className="flex gap-[1vh] items-center">
              <span>{verticalSliderValue}</span>
              <span>+</span>
              <span>{number2 - verticalSliderValue}</span>
              <span>=</span>
              <span>{number2}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
