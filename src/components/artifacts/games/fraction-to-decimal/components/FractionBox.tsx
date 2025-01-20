import React from 'react';

interface FractionBoxProps {
  numerator?: string;
  denominator?: string;
  className?: string;
  onChange?: {
    numerator: (value: string) => void;
    denominator: (value: string) => void;
  };
}

const FractionBox = ({ 
  numerator = '', 
  denominator = '', 
  className = '',
  onChange 
}: FractionBoxProps) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <div className="text-center mb-2">
        <span className="text-lg font-bold bg-[#98FB98] px-4 py-1">Fraction</span>
      </div>
      <div className="border-2 border-black p-4 bg-white">
        <div className="flex flex-col items-center gap-1">
          <input
            type="text"
            value={numerator}
            onChange={(e) => onChange?.numerator(e.target.value)}
            className="w-12 h-12 border-2 border-purple-400 flex items-center justify-center text-2xl rounded-lg text-center"
          />
          <div className="w-12 border-t-2 border-black"></div>
          <input
            type="text"
            value={denominator}
            onChange={(e) => onChange?.denominator(e.target.value)}
            className="w-12 h-12 border-2 border-purple-400 flex items-center justify-center text-2xl rounded-lg text-center"
          />
        </div>
      </div>
    </div>
  );
};

export default FractionBox; 