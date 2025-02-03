import React from 'react';
import MixedFraction from './mixedFraction';
import { MixedFractionProps } from '../utils/types';

interface HeaderProps {
    fraction1: MixedFractionProps;
    fraction2: MixedFractionProps;
    version: number;
    type: 'addition' | 'subtraction';
}

const Header: React.FC<HeaderProps> = (({ fraction1, fraction2, type, version }) => {
  return (
    <div className='w-full sticky top-0 bg-white flex z-50 flex-col'>
      <div className="w-full bg-[#F97315] flex justify-center items-center p-2 gap-6">
        <div className='bg-white px-2 pr-4 '>
          <MixedFraction 
          whole={fraction1.whole} 
          numerator={fraction1.numerator} 
          denominator={fraction1.denominator} 
          className='text-3xl font-extrabold'
        />
      </div>
      <span className="text-3xl font-bold">
        {type === 'addition' ? '+' : '-'}
      </span>
      <div className='bg-white px-2 pr-4 '>
        <MixedFraction 
          whole={fraction2.whole} 
          numerator={fraction2.numerator} 
          denominator={fraction2.denominator} 
          className='text-3xl font-extrabold'
          />
        </div>
      </div>
      {version === 2 &&
        <div className="flex items-center justify-center gap-4 mt-8 py-4 bg-[#F97315] bg-opacity-20">
          <div className="flex bg-[#FFC5C6] p-2 items-stretch gap-2 border-2 border-gray-500 rounded-lg shadow-[-2px_2px_1px_rgba(0,0,0,0.7)]">
            <span className='bg-white rounded-lg border-2 border-gray-500 flex items-center shadow-[inset_-1px_1px_0px_rgba(0,0,0,0.7)]'>
              <MixedFraction
                whole={fraction1.whole}
                numerator={fraction1.numerator}
                denominator={fraction1.denominator}
                className='text-xl font-extrabold p-2'
              />
            </span>
            <p className='text-xl font-extrabold p-3 border-2 border-gray-500 bg-white rounded-lg flex-grow flex gap-2 items-center shadow-[inset_-1px_1px_0px_rgba(0,0,0,0.7)]'>
              <div className={`flex flex-col items-center justify-center p-1 rounded-full border-[1px] border-black bg-[#FFC98F]`}>
                <div className={`w-12 h-12 bg-[#E65A5A] border-[1px] shadow-[inset_0px_0px_4px_0px_rgba(0,0,0,0.5)] border-black rounded-full`} />
              </div>
              Pepperoni Pizza
            </p>
          </div>
          <span className="text-5xl font-bold text-black">+</span>
          <div className="flex bg-yellow-200 p-2 items-stretch gap-2 border-2 border-gray-500 rounded-lg shadow-[-1px_1px_0px_rgba(0,0,0,0.7)]">
            <span className='bg-white rounded-lg border-2 border-gray-500 flex items-center shadow-[inset_-1px_1px_0px_rgba(0,0,0,0.7)]'>
              <MixedFraction
                whole={fraction2.whole}
                numerator={fraction2.numerator}
                denominator={fraction2.denominator}
                className='text-xl font-extrabold p-2'
              />
            </span>
            <p className='text-xl font-extrabold p-3 border-2 border-gray-500 bg-white rounded-lg flex-grow flex gap-2 items-center shadow-[inset_-1px_1px_0px_rgba(0,0,0,0.7)]'>
              <div className={`flex flex-col items-center justify-center p-1 rounded-full border-[1px] border-black bg-[#FFC98F]`}>
                <div className={`w-12 h-12 bg-yellow-200 border-[1px] shadow-[inset_0px_0px_4px_0px_rgba(0,0,0,0.5)] border-black rounded-full`} />
              </div>
              Cheese Pizza
            </p>
          </div>
        </div>
      }
    </div>
  );
});



export default Header;