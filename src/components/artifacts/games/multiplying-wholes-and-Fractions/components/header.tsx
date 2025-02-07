import React from 'react';

interface HeaderProps {
  level: number;
  heading: string;
  onClick?: () => void;
  nextStep?: boolean
}

export default function Header({ level, heading, nextStep=false, onClick } : HeaderProps) {

  return (
    <div className="w-full bg-[#fff049] py-5 shadow-md flex justify-between items-center gap-4 px-10 border border-black">
      <div className='text-center bg-white w-auto min-w-[100px] p-4 text-2xl leading-none font-normal text-[#957000] shadow-[-4px_4px_0px_0px_rgba(0,0,0)]'>
        LEVEL {level}
      </div>
      <div className='text-center text-2xl leading-none font-normal px-5'>
        {heading}
      </div>
      <div className={`text-2xl bg-white rounded-full p-3 leading-none shadow-[-3px_3px_0px_0px_rgba(0,0,0)] ${nextStep ? 'cursor-pointer' : 'cursor-default'} ${nextStep ? 'opacity-100' : 'opacity-30'}`} onClick={nextStep ? onClick : undefined}>
        {`>>`}
      </div>
    </div>
  );
}