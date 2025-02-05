import React from 'react';
import { useGameState } from '../state-utils';

interface HeaderProps {
  level: number;
  heading: string;
  onClick: () => void;
}

export default function Header({ level, heading, onClick } : HeaderProps) {

  const { gameStateRef, setGameStateRef } = useGameState();

  return (
    <div className="w-full bg-[#fff049] py-8 shadow-md flex justify-between items-center gap-4 px-10 border border-black">
      <div className='text-center bg-white w-auto min-w-[100px] py-5 px-8 text-4xl leading-none font-normal text-[#957000] shadow-[-4px_4px_0px_0px_rgba(0,0,0)]'>
        LEVEL {level}
      </div>
      <div className='text-center text-[40px] leading-none font-normal px-5'>
        {heading}
      </div>
      <div className='text-4xl bg-white rounded-full p-3 leading-none shadow-[-3px_3px_0px_0px_rgba(0,0,0)] cursor-pointer' onClick={onClick}>
        {`>>`}
      </div>
    </div>
  );
}