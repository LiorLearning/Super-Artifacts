import React from 'react';

interface HeaderProps {
  mixedFraction: {
    whole: number;
    numerator: number;
    denominator: number;
  };
}

const Header: React.FC<HeaderProps> = ({ mixedFraction }) => {
  return (
    <div className='flex justify-center items-center m-[64px]'>
      <div className="flex h-[250px] bg-white">
        {/* Level Box */}
        <div className="w-[200px] h-full border-[15.62px] border-[#FF497C] flex items-center justify-center">
          <h2 className="text-[#FF497C] text-[38px]">Level 1</h2>
        </div>

        {/* Equation Box */}
        <div className="flex items-center justify-center gap-4 px-12 border-[15.62px] border-l-0 border-[#FF497C]">
          <div className="flex items-center gap-4 text-[48px]">
            {/* Mixed Number */}

            <span>{mixedFraction.whole}</span>
            <div className="flex flex-col items-center justify-center text-center">
              <span className="border-b-[3px] border-black px-2">{mixedFraction.numerator}</span>
              <span>{mixedFraction.denominator}</span>
            </div>

            <span>=</span>

            {/* Question Marks */}
            <div className="flex flex-col items-center justify-center text-center">
              <span className="border-b-[3px] border-black px-2">?</span>
              <span>?</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;