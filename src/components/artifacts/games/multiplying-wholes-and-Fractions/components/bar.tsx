import { useState } from "react";

interface BaseProps {
  numerator: number;
  denominator: number;
  handlePieceClick?: (index: number) => void;
}


export default function Bar({denominator, numerator, handlePieceClick} : BaseProps) {
  const [selectedPieces, setSelectedPieces] = useState<number>(numerator);

  const handleClick = (index: number) => {
    if(handlePieceClick){
      setSelectedPieces(index);
      handlePieceClick(index);
    }
  };

  return (
    <div className="flex w-full -space-x-[3px] min-w-52">
        {[...Array(denominator)].map((_, index) => (
          <div
            key={index}
              className={`w-full h-16  relative cursor-pointer border-[5px] border-[#906547] ${
              index < selectedPieces
                ? 'bg-gradient-to-br from-[#5B361B] to-[#432611]'
                : 'bg-gradient-to-br from-[#906547] to-[#785339] hover:bg-gradient-to-br hover:from-[#8d532a] hover:to-[#70401e]'
            }`}
            onClick={() => handleClick(index + 1)}
          >
            {/* 3D effect borders */}
            <div className="absolute inset-0 border-l-4 border-t-4 shadow-[-0px_0px_10px_rgba(0,0,0,.6)] border-[#FFFFFF20]"></div>
            <div className="absolute inset-0 border-r-4 border-b-4 shadow-[-0px_0px_10px_rgba(0,0,0,.6)] border-[#00000040]"></div>
          </div>
        ))}
      </div>
  )
}