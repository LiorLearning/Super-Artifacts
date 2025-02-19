import React from 'react';

interface DecimalBoxProps {
  wholes?: string;
  tenths?: string;
  hundredths?: string;
  className?: string;
  disabled?: boolean;
  onChange?: {
    wholes: (value: string) => void;
    tenths: (value: string) => void;
    hundredths?: (value: string) => void;
  };
  correctWholes?: string;
  correctTenths?: string;
  correctHundredths?: string;
  showHundredths?: boolean;
  tenthsRef?: React.RefObject<HTMLInputElement>;
  hundredthsRef?: React.RefObject<HTMLInputElement>;
}

const DecimalBox = ({ 
  wholes = '', 
  tenths = '', 
  hundredths = '', 
  className = '',
  disabled = false,
  onChange,
  correctWholes,
  correctTenths,
  correctHundredths,
  showHundredths = false,
  tenthsRef,
  hundredthsRef
}: DecimalBoxProps) => {
  return (
    <div className={`flex flex-col ${className} ${disabled ? 'opacity-50' : ''}`}>
      <div className="text-center mb-4">
        <span className="text-xl  mb-2 bg-[#FFE4B5] shadow-[-5px_5px_0_0_rgba(0,0,0,1)] px-4 py-1">Decimal</span>
      </div>
      <div className="border-2 border-black p-4 bg-white">
        <div className="flex items-center gap-2">
          <div className="flex flex-col items-center">
            <span className="text-sm ">Wholes</span>
            <input
              type="text"
              value={wholes}
              onChange={(e) => onChange?.wholes(e.target.value)}
              className={`w-12 h-12 border-4 flex items-center justify-center text-2xl rounded-lg text-center ${
                wholes.length > 0 
                  ? parseInt(wholes) === parseInt(correctWholes || '0')
                    ? 'border-green-600' 
                    : 'border-red-500'
                  : 'border-green-600'
              } bg-white`}
              maxLength={1}
              disabled={disabled}
            />
          </div>
          <span className="text-6xl font-bold mb-2">.</span>
          <div className="flex flex-col items-center">
            <span className="text-sm ">Tenths</span>
            <input
              type="text"
              value={tenths}
              onChange={(e) => onChange?.tenths(e.target.value)}
              className={`w-12 h-12 border-4 flex items-center justify-center text-2xl rounded-lg text-center ${
                tenths.length > 0 
                  ? parseInt(tenths) === parseInt(correctTenths || '0')
                    ? 'border-pink-400' 
                    : 'border-red-500'
                  : 'border-pink-400'
              } bg-white`}
              maxLength={1}
              disabled={disabled}
              ref={tenthsRef}
            />
          </div>
          {showHundredths && (
            <>
              <div className="flex flex-col items-center">
                <span className="text-sm ">Hundredths</span>
                <input
                  type="text"
                  value={hundredths}
                  onChange={(e) => onChange?.hundredths?.(e.target.value)}
                  className={`w-12 h-12 border-4 flex items-center justify-center text-2xl rounded-lg text-center ${
                    hundredths?.length > 0 
                      ? parseInt(hundredths) === parseInt(correctHundredths || '0')
                        ? 'border-pink-400' 
                        : 'border-red-500'
                      : 'border-pink-400'
                  } bg-white`}
                  maxLength={1}
                  disabled={disabled}
                  ref={hundredthsRef}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DecimalBox; 