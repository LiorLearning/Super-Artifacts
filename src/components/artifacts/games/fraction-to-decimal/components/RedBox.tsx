import React from 'react';
import { cn } from '@/lib/utils';

interface RedBoxProps {
  children: React.ReactNode;
  className?: string;
}

const RedBox2: React.FC<RedBoxProps> = ({ children, className='' }) => {
  return (
    <div className={cn('h-full bg-[#FF497C] flex mx-auto p-2 flex-col justify-center items-center', className)}>
      <div className='bg-white text-[#FF497C] w-full h-full p-3 font-medium inline-flex flex justify-center items-center'>
        {children}
      </div>
    </div>
  );
};    

const RedBox: React.FC<RedBoxProps> = ({ children, className='' }) => {
  return (
    <div className={cn('h-full bg-[#E65A5A] p-1 inline-flex flex-col items-center', className)}>
      <div className='bg-white text-[#E65A5A] text-xl px-3 py-1 font-medium inline-flex flex-col items-center'>
        {children}
      </div>
    </div>
  );
};

export { RedBox2 };
export default RedBox;
