import React from 'react';

interface FractionBoxProps {
  numerator?: string;
  denominator?: string;
  className?: string;
  onChange?: {
    numerator: (value: string) => void;
    denominator: (value: string) => void;
  };
  correctnumerator?: string;
  correctdenominator?: string;
}

const FractionBox = ({ 
  numerator = '', 
  denominator = '', 
  className = '',
  onChange,
  correctnumerator,
  correctdenominator
}: FractionBoxProps) => {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="text-center mb-4 w-full">
        <div className="flex justify-center">
          <span className="text-xl bg-[#98FB98] shadow-[-5px_5px_0_0_rgba(0,0,0,1)] px-4 py-1">Fraction</span>
        </div>
      </div>
      <div className="border-2 border-black p-4 bg-white flex justify-center items-center">
        <div className="flex flex-col items-center gap-1">
          <input
            type="text"
            value={numerator === '0' ? '' : numerator}
            onChange={(e) => onChange?.numerator(e.target.value)}
            placeholder="0"
            className={`w-12 h-12 border-2 border-purple-400 flex items-center justify-center text-2xl rounded-lg text-center ${correctnumerator === numerator ? 'bg-green-500' : ( numerator !== '' && numerator.length > 0 ? 'bg-red-500' : 'bg-white')}`}
          />
          <div className="w-12 border-t-2 border-black"></div>
          <input
            type="text"
            value={denominator === '0' ? '' : denominator}
            onChange={(e) => onChange?.denominator(e.target.value)}
            placeholder="0"
            className={`w-12 h-12 border-2 border-purple-400 flex items-center justify-center text-2xl rounded-lg text-center ${correctdenominator === denominator ? 'bg-green-500' : ( denominator !== '' && denominator.length > 0 ? 'bg-red-500' : 'bg-white')}`}
          />
        </div>
      </div>
    </div>
  );
};

export default FractionBox; 