import React from 'react'
import Fraction from './Fraction';
import { Button } from '@/components/custom_ui/button';

const Bar = ({
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

  // Calculate number of complete rows and remaining pieces
  const completeRows = Math.floor(denominator / 10);
  const remainingPieces = denominator % 10;

  return (
    <div className="flex my-4 mx-auto w-full relative -space-x-[3px] min-w-52">
      <div className="flex flex-col w-full -space-y-[3px] min-w-52">
        {/* Complete rows of 10 */}
        {[...Array(completeRows)].map((_, rowIndex) => (
          <div key={`row-${rowIndex}`} className="flex w-full -space-x-[3px]">
            {[...Array(10)].map((_, colIndex) => {
              const index = rowIndex * 10 + colIndex;
              return (
                <div
                  key={`piece-${index}`}
                  className={`w-full h-24 relative cursor-pointer border-[5px] border-[#906547] ${
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
              );
            })}
          </div>
        ))}

        {/* Remaining pieces less than 10 */}
        {remainingPieces > 0 && (
          <div className="flex w-full -space-x-[3px]">
            {[...Array(remainingPieces)].map((_, index) => {
              const pieceIndex = completeRows * 10 + index;
              return (
                <div
                  key={`piece-${pieceIndex}`}
                  className={`w-full h-20 relative cursor-pointer border-[5px] border-[#906547] ${
                    pieceIndex < selectedPieces
                      ? 'bg-gradient-to-br from-[#5B361B] to-[#432611]'
                      : 'bg-gradient-to-br from-[#906547] to-[#785339] hover:bg-gradient-to-br hover:from-[#8d532a] hover:to-[#70401e]'
                  }`}
                  onClick={() => handleClick(pieceIndex + 1)}
                >
                  {/* 3D effect borders */}
                  <div className="absolute inset-0 border-l-4 border-t-4 shadow-[-0px_0px_10px_rgba(0,0,0,.6)] border-[#FFFFFF20]"></div>
                  <div className="absolute inset-0 border-r-4 border-b-4 shadow-[-0px_0px_10px_rgba(0,0,0,.6)] border-[#00000040]"></div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Bar




const Bar2d = ({
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

  // Calculate number of complete rows and remaining pieces
  const completeRows = Math.floor(denominator / 10);
  const remainingPieces = denominator % 10;

  return (
    <div className="flex my-4 mx-auto w-full aspect-square relative -space-x-[3px] min-w-52">
      <div className="flex flex-col w-full h-full -space-y-[3px] min-w-52">
        {/* Complete rows of 10 */}
        {[...Array(completeRows)].map((_, rowIndex) => (
          <div key={`row-${rowIndex}`} className="flex w-full h-full -space-x-[3px]">
            {[...Array(10)].map((_, colIndex) => {
              const index = rowIndex * 10 + colIndex;
              return (
                <div
                  key={`piece-${index}`}
                  className={`w-full h-full relative cursor-pointer border-[5px] border-[#906547] ${
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
              );
            })}
          </div>
        ))}

        {/* Remaining pieces less than 10 */}
        {remainingPieces > 0 && (
          <div className="flex w-full h-full -space-x-[3px]">
            {[...Array(remainingPieces)].map((_, index) => {
              const pieceIndex = completeRows * 10 + index;
              return (
                <div
                  key={`piece-${pieceIndex}`}
                  className={`w-full h-full relative cursor-pointer border-[5px] border-[#906547] ${
                    pieceIndex < selectedPieces
                      ? 'bg-gradient-to-br from-[#5B361B] to-[#432611]'
                      : 'bg-gradient-to-br from-[#906547] to-[#785339] hover:bg-gradient-to-br hover:from-[#8d532a] hover:to-[#70401e]'
                  }`}
                  onClick={() => handleClick(pieceIndex + 1)}
                >
                  {/* 3D effect borders */}
                  <div className="absolute inset-0 border-l-4 border-t-4 shadow-[-0px_0px_10px_rgba(0,0,0,.6)] border-[#FFFFFF20]"></div>
                  <div className="absolute inset-0 border-r-4 border-b-4 shadow-[-0px_0px_10px_rgba(0,0,0,.6)] border-[#00000040]"></div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  )
}



const VerticalBar = ({
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
    if (!active) return;
    handlePieceClick(index);
  };

  return (
    <div className="flex my-4 mx-auto w-full aspect-square relative min-w-52">
      <div className="flex flex-col w-full h-full -space-y-[3px] min-w-52">
        {[...Array(denominator)].map((_, index) => {
          return (
            <div
              key={`piece-${index}`}
              className={`w-full h-full relative cursor-pointer border-[5px] border-[#906547] ${
                index < selectedPieces
                  ? 'bg-gradient-to-br from-[#5B361B] to-[#432611]'
                  : active ? 'bg-gradient-to-br from-[#906547] to-[#785339] hover:bg-gradient-to-br hover:from-[#8d532a] hover:to-[#70401e]'
                  : 'bg-gradient-to-br from-[#906547] to-[#785339]'
              }`}
              onClick={() => handleClick(index + 1)}
            >
              {/* 3D effect borders */}
              <div className="absolute inset-0 border-l-4 border-t-4 shadow-[-0px_0px_10px_rgba(0,0,0,.6)] border-[#FFFFFF20]"></div>
              <div className="absolute inset-0 border-r-4 border-b-4 shadow-[-0px_0px_10px_rgba(0,0,0,.6)] border-[#00000040]"></div>
            </div>
          );
        })}
      </div>
    </div>
  )
}




export { Bar2d, VerticalBar };