import React, { memo } from 'react';
import MixedFraction from './mixedFraction';
import { useGameState } from '../state-utils';
import { MixedFractionProps } from '../utils/types';

interface HeaderProps {
    fraction1: MixedFractionProps;
    fraction2: MixedFractionProps;
}

const Header: React.FC<HeaderProps> = memo(({ fraction1, fraction2 }) => {
  const { gameStateRef } = useGameState();
  
  return (
    <div className="bg-[#e3f261] flex justify-center items-center p-2 border-b-4 border-blue-600 gap-6">
      <div className='bg-white px-2 pr-4 '>
        <MixedFraction 
          whole={fraction1.whole} 
          numerator={fraction1.numerator} 
          denominator={fraction1.denominator} 
          className='text-3xl font-extrabold'
        />
      </div>
      <span className="text-3xl font-bold">+</span>
      <div className='bg-white px-2 pr-4 '>
        <MixedFraction 
          whole={fraction2.whole} 
          numerator={fraction2.numerator} 
          denominator={fraction2.denominator} 
          className='text-3xl font-extrabold'
        />
      </div>
    </div>
  );
});

Header.displayName = 'Header';

export default Header;