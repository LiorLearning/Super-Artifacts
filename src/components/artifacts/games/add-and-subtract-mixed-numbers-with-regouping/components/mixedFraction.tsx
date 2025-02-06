import React from 'react';

interface MixedFractionProps {
    whole: number;
    numerator: number;
    denominator: number;
}

function MixedFraction({ whole, numerator, denominator, className , textcolor}: MixedFractionProps & { className?: string, textcolor?: string }) {
    return (
        <div className={`gap-2 flex items-center ${className}`}>
            {whole !== 0 && <span className={`text-${textcolor}`}>{whole}</span>}
            <div className="flex flex-col justify-center items-center">
                <div className={` text-${textcolor} mb-1`}>{numerator}</div>
                <div className={`border-t-2 border-${textcolor} w-full mb-1`}></div>
                <div className={`text-${textcolor}`}>{denominator}</div>
            </div>
        </div>
    );
}

export function MixedFractionBox({ whole, numerator, denominator, onClick, type=1}: MixedFractionProps & {onClick?: () => void, type?: number }) {
    return (
        <div className={`gap-2 py-1 px-4 border-[1px] border-[black] rounded-lg shadow-[-3px_3px_0_rgba(0,_0,_0,_1)] flex items-center ${type === 1 ? 'bg-[#009700]' : 'bg-[#fff]'}`} onClick={onClick}>
            {whole !== 0 && <span className={`${type===1 ? 'text-white' : 'text-[#1E9AD6]'} font-bold text-2xl`}>{whole}</span>}
            <div className="flex flex-col justify-center items-center">
                <div className={` ${type===1 ? 'text-white' : 'text-[#1E9AD6]'} font-bold text-2xl`}>{numerator}</div>
                <div className={`border-t-[.2px] ${type===1 ? 'border-white' : 'border-[#1E9AD6]'} px-2 w-full`}></div>
                <div className={` ${type===1 ? 'text-white' : 'text-[#1E9AD6]'} font-bold text-2xl`}>{denominator}</div>
            </div>
        </div>
    );
}

export const checkEquivalentfraction = (fraction1: MixedFractionProps, fraction2: MixedFractionProps) => {
  const improperFraction1 = (fraction1.whole * fraction1.denominator + fraction1.numerator) / fraction1.denominator;
  const improperFraction2 = (fraction2.whole * fraction2.denominator + fraction2.numerator) / fraction2.denominator;

  if (fraction1.denominator !== fraction2.denominator) return false;
  return improperFraction1 === improperFraction2;
}

MixedFraction.defaultProps = {
    whole: 0,
    numerator: 0,
    denominator: 1,
    className: 'text-4xl'
};

export default MixedFraction;