import React from 'react';
import MixedFraction from './Fraction';
import { colors } from '../colors';
import { cn } from '@/lib/utils';
import Fraction from './Fraction';
import RedBox from './RedBox';

interface HeaderProps {
    numerator1: number;
    denominator1: number;
    denominator2: number; 
    step: {
      id: number,
      text: string
    },
    level: number;
}

const Header: React.FC<HeaderProps> = (({ numerator1, denominator1, denominator2, step, level }) => {
  return (
    <div className='w-full space-y-16 flex flex-col'>
      <div className={cn('flex justify-center items-center gap-4 bg-[#F9F871] p-4 shadow-[0_5px_1px_rgba(0,0,0,1)]')}>

        <span className='w-full'/>
        <p className='flex w-full items-center gap-2 text-2xl font-bold'>
          Equivalent Fractions
          {step && (
            <div className='flex text-2xl items-center gap-2 font-bold'>
              : <Fraction numerator={numerator1} denominator={denominator1} />
              = <Fraction numerator={"?"} denominator={denominator2} />
            </div>
          )}
        </p>
        <div className='w-full flex justify-end'>
          {level && <RedBox>Level {level}</RedBox>}
        </div>

      </div>

      <div className='flex justify-center items-center gap-4'>
        <div className="flex items-center gap-4">
          <RedBox>Step {step.id}</RedBox>
          <p className='text-xl bg-red-500 font-bold text-white px-4 py-6'>
            {step.text}
          </p>
        </div>
      </div>
    </div>
  );
});



export default Header;