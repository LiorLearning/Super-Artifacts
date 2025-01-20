import React from 'react';
import { cn } from '@/lib/utils';
import { RedBox2 } from './RedBox';

interface HeaderProps {
    title: any;
    level: string;
    leftBox: string;
    rightBox: string;
}
const Header: React.FC<HeaderProps> = ({ title, level, leftBox, rightBox }) => {
  return (
    <div className='w-full space-y-16 flex flex-col'>
      <div className={cn('flex justify-center items-center gap-4 bg-[#F9F871] p-4 shadow-[0_5px_1px_rgba(0,0,0,1)]')}>
        <span className='w-full'/>
        <p className='flex text-3xl w-full items-center gap-2 font-bold'>
          {title}
        </p>
        <div className='w-full flex justify-end'>
          {level && <RedBox2>{level}</RedBox2>}
        </div>
      </div>

      <div className='flex justify-center w-full items-center gap-4'>
        <div className="flex items-center gap-4">
          <RedBox2>{leftBox}</RedBox2>
          <p className='text-xl bg-[#FF497C] font-bold text-white px-4 py-5 h-full flex items-center'>
            {rightBox}
          </p>
        </div>
      </div>
    </div>
  );
};



export default Header;