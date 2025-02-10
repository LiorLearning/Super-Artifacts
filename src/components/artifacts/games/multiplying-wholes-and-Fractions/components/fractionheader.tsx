import React from 'react';

interface FractionHeaderProps {
  level: number,
  whole: number,
  numerator: number,
  denominator: number,
  nextStep?: boolean,
  onClick?: () => void
}

export default function FractionHeader({ level, whole, numerator, denominator,nextStep=true, onClick } : FractionHeaderProps) {


  return (
    <div className="w-full bg-[#fff049] py-5 shadow-md flex justify-between items-center gap-4 px-10 border border-black">
      <div className='text-center bg-white w-auto min-w-[100px] p-4 text-2xl leading-none font-normal text-[#957000] shadow-[-4px_4px_0px_0px_rgba(0,0,0)]'>
        LEVEL {level}
      </div>
      <div className="text-black text-2xl leading-none flex items-center gap-4 px-6">
        <div className="p-2 px-4 text-center bg-white">
          {whole}
        </div>

        <div className="text-black">
          x
        </div>

        <div className="flex flex-col items-center bg-white px-1">
          <div className="p-1 px-4">
            {numerator}
          </div>
          <div className="border-t-2 border-black p-1">
            {denominator}
          </div>
        </div>

        <div className="text-black">
          =
        </div>

        <div className="flex flex-col items-center bg-white px-1">
          <div className="p-1 px-4">
           ?
          </div>
          <div className="border-t-2 border-black p-1">
            ?
          </div>
        </div>
      </div>
      <div className={`text-2xl bg-white rounded-full p-3 leading-none shadow-[-3px_3px_0px_0px_rgba(0,0,0)] ${nextStep ? 'opacity-100' : 'opacity-50'} ${nextStep ? 'cursor-pointer' : 'cursor-default'}`} onClick={nextStep ? onClick : undefined}>
        {`>>`}
      </div>
    </div>
  );
}
