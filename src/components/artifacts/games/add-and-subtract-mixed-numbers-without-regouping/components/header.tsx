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
        <div className="flex items-center justify-center gap-4 my-8 py-4 bg-[#F97315] bg-opacity-20">
          <div className="flex bg-[#F97315] p-2 items-stretch gap-2 border-2 border-gray-500 rounded-lg">
            <span className='bg-white rounded-lg border-2 border-gray-500 flex shadow-sm items-center'>
              <MixedFraction
                whole={fraction1.whole}
                numerator={fraction1.numerator}
                denominator={fraction1.denominator}
                className='text-xl font-extrabold p-2'
              />
            </span>
            <p className='text-xl font-extrabold p-3 border-2 border-gray-500 bg-white rounded-lg flex-grow flex gap-2 items-center'>
              <div className={`flex flex-col items-center justify-center p-1 rounded-full border-2 border-pink-800 bg-pink-200`}>
                <div className={`w-12 h-12 bg-pink-600 border-2 border-pink-800 rounded-full`} />
              </div>
              Pepperoni Pizza
            </p>
          </div>
          <span className="text-5xl font-bold text-yellow-200">+</span>
          <div className="flex bg-yellow-200 p-2 items-stretch gap-2 border-2 border-gray-500 rounded-lg">
            <span className='bg-white rounded-lg border-2 border-gray-500 flex shadow-sm items-center'>
              <MixedFraction
                whole={fraction2.whole}
                numerator={fraction2.numerator}
                denominator={fraction2.denominator}
                className='text-xl font-extrabold p-2'
              />
            </span>
            <p className='text-xl font-extrabold p-3 border-2 border-gray-500 bg-white rounded-lg flex-grow flex gap-2 items-center'>
              <div className={`flex flex-col items-center justify-center p-1 rounded-full border-2 border-yellow-800 bg-yellow-200`}>
                <div className={`w-12 h-12 bg-yellow-600 border-2 border-yellow-800 rounded-full`} />
              </div>
              Cheeze Pizza

            </p>
          </div>
        </div>
      }
    </div>
  );
});



export default Header;