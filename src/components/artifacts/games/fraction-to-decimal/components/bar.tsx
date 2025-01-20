import React from 'react'
import Fraction from './Fraction';
import { Button } from '@/components/custom_ui/button';

const Bar = (
  {
    numerator, 
    denominator, 
    handlePieceClick, 
    active
  }:{
    numerator: number, 
    denominator: number, 
    handlePieceClick: (index: number) => void, 
    active: boolean
  }) => {

  const selectedPieces = numerator;
  
  const handleClick = (index: number) => {
    handlePieceClick(index);
  };

  const calculateGridDimensions = (total: number) => {
    const sqrt = Math.sqrt(total);
    const rows = Math.ceil(sqrt);
    const cols = Math.ceil(total / rows);
    return { rows, cols };
  };

  const { rows, cols } = calculateGridDimensions(denominator);

  return (
    <div className="flex max-w-screen-md my-4 mx-auto w-full relative gap-4">
      <Fraction numerator={numerator} denominator={denominator} className='text-3xl text-black p-2 px-4 h-full flex items-center' />
      <div className="grid gap-[3px]" style={{ 
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
        aspectRatio: `${cols}/${rows}`
      }}>
        {[...Array(denominator)].map((_, index) => (
          <div
            key={index}
            className={`aspect-square relative cursor-pointer border-[5px] w-full border-[#906547] ${
              index < selectedPieces
                ? 'bg-gradient-to-br from-[#5B361B] to-[#432611]'
                : 'bg-gradient-to-br from-[#906547] to-[#785339] hover:bg-gradient-to-br hover:from-[#8d532a] hover:to-[#70401e]'
            }`}
            onClick={() => handleClick(index + 1)}
          >
            <div className="absolute inset-0 border-l-4 border-t-4 shadow-[-0px_0px_10px_rgba(0,0,0,.6)] border-[#FFFFFF20]"></div>
            <div className="absolute inset-0 border-r-4 border-b-4 shadow-[-0px_0px_10px_rgba(0,0,0,.6)] border-[#00000040]"></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Bar