import React from 'react';
import { MixedFraction } from '../../game-state';

interface HeaderProps {
  mixedFraction: MixedFraction;
  level: number;
}

const Header: React.FC<HeaderProps> = ({ mixedFraction, level }) => {
  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      <div className="relative">
        <div className="border-4 border-pink-500 bg-white flex">
          <div className="w-32 p-6 border-r-4 border-pink-500">
            <span className="text-pink-500 text-2xl font-bold">
              Level {level}
            </span>
          </div>
          
          <div className="flex-1 p-6 flex items-center justify-center">
            <div className="flex items-center space-x-4 text-3xl">
              <span className="flex items-center">
                {mixedFraction.whole}
                <div className="inline-flex flex-col items-center ml-1">
                  <span>{mixedFraction.numerator}</span>
                  <div className="h-0.5 w-4 bg-black my-0.5"></div>
                  <span>{mixedFraction.denominator}</span>
                </div>
              </span>
              
              <span>=</span>
              
              <div className="inline-flex flex-col items-center">
                <span>?</span>
                <div className="h-0.5 w-4 bg-black my-0.5"></div>
                <span>?</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;