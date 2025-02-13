import React from 'react';

interface DecimalBoxProps {
  wholes?: string;
  tenths?: string;
  className?: string;
  disabled?: boolean;
  onChange?: {
    wholes: (value: string) => void;
    tenths: (value: string) => void;
  };
  correctWholes?: string;
  correctTenths?: string;
}

const DecimalBox = ({ 
  wholes = '', 
  tenths = '', 
  className = '',
  disabled = false,
  onChange
}: DecimalBoxProps) => {
  return (
    <div className={`flex flex-col ${className} ${disabled ? 'opacity-50' : ''}`}>
      <div className="text-center mb-4">
        <span className="text-xl font-bold mb-2 bg-[#FFE4B5] shadow-[-5px_5px_0_0_rgba(0,0,0,1)] px-4 py-1">Decimal</span>
      </div>
      <div className="border-2 border-black p-4 bg-white">
        <div className="flex items-center gap-2">
          <div className="flex flex-col items-center">
            <span className="text-sm font-bold">Wholes</span>
            <input
              type="text"
              value={wholes}
              onChange={(e) => onChange?.wholes(e.target.value)}
              className="w-12 h-12 border-4 border-green-600 flex items-center justify-center text-2xl rounded-lg text-center"
              maxLength={1}
              disabled={disabled}
            />
          </div>
          <span className="text-4xl mb-6">.</span>
          <div className="flex flex-col items-center">
            <span className="text-sm font-bold">Tenths</span>
            <input
              type="text"
              value={tenths}
              onChange={(e) => onChange?.tenths(e.target.value)}
              className="w-12 h-12 border-4 border-pink-400 flex items-center justify-center text-2xl rounded-lg text-center"
              maxLength={1}
              disabled={disabled}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DecimalBox; 