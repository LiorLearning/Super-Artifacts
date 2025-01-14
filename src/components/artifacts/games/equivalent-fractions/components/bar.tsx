import React from 'react'
import { sounds } from '../utils/sounds';

const Bar = ({numerator, denominator, handlePieceClick}: {numerator: number, denominator: number, handlePieceClick: (index: number) => void}) => {
  const selectedPieces = numerator;
  
  const handleClick = (index: number) => {
    sounds.button();
    handlePieceClick(index);
  };

  return (
    <div className="flex w-full -space-x-[3px] min-w-52">
      {[...Array(denominator)].map((_, index) => (
        <div
          key={index}
          className={`w-full h-24 relative cursor-pointer border-[3px] border-[#906547] ${
            index < selectedPieces
              ? 'bg-gradient-to-br from-[#5B361B] to-[#432611]'
              : 'bg-gradient-to-br from-[#906547] to-[#785339]'
          }`}
          onClick={() => handleClick(index + 1)}
        >
          {/* 3D effect borders */}
          <div className="absolute inset-0 border-l-4 border-t-4 border-[#FFFFFF20]"></div>
          <div className="absolute inset-0 border-r-4 border-b-4 border-[#00000040]"></div>
        </div>
      ))}
    </div>
  )
}

export default Bar