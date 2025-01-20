import React from 'react';

interface DecimalBoxProps {
  wholes?: string;
  tenths?: string;
  className?: string;
}

const DecimalBox = ({ wholes = '', tenths = '', className = '' }: DecimalBoxProps) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <div className="text-center mb-2">
        <span className="text-lg font-bold bg-[#FFE4B5] px-4 py-1">Decimal</span>
      </div>
      <div className="border-2 border-black p-4 bg-white">
        <div className="flex items-center gap-2">
          <div className="flex flex-col items-center">
            <span className="text-sm font-bold">Wholes</span>
            <div className="w-12 h-12 border-4 border-green-600 flex items-center justify-center text-2xl">
              {wholes}
            </div>
          </div>
          <span className="text-4xl mb-6">.</span>
          <div className="flex flex-col items-center">
            <span className="text-sm font-bold">Tenths</span>
            <div className="w-12 h-12 border-4 border-pink-400 flex items-center justify-center text-2xl">
              {tenths}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DecimalBox; 