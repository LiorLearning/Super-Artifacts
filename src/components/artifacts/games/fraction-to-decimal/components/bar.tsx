import React, { useState } from 'react'
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

const DecimalHintBar = ({
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
  const completeRows = Math.floor(numerator / 10);
  const remainingPieces = numerator % 10;

  console.log(completeRows, remainingPieces);

  return (
    <div className="flex my-4 mx-auto w-full aspect-square relative -space-x-[3px] min-w-52">
      <div className="flex flex-col w-full h-full -space-y-[3px] min-w-52">



        {[...Array(completeRows)].map((_, rowIndex) => (
          <div key={`row-${rowIndex}`} className="flex w-full h-full -space-x-[3px]">
            {[...Array(10)].map((_, colIndex) => {
              const index = rowIndex * 10 + colIndex;
              return (
                <div
                  key={`piece-${index}`}
                  className={`w-full h-full relative cursor-pointer border-[5px] border-[#906547] bg-gradient-to-br from-[#5B361B] to-[#432611]`}
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


          <div className="flex w-full h-full -space-x-[3px]">
            {[...Array(10)].map((_, colIndex) => {
              const index = completeRows*10 + colIndex;
              return (
                <div
                  key={`piece-${index}`}
                  className={`w-full text-center h-full relative cursor-pointer border-[5px] border-[#906547] ${
                    index < selectedPieces
                      ? 'bg-gradient-to-br from-[#5B361B] to-[#432611]'
                      : 'bg-gradient-to-br from-[#906547] to-[#785339] hover:bg-gradient-to-br hover:from-[#8d532a] hover:to-[#70401e]'
                  }`}
                  onClick={() => handleClick(index + 1)}
                >

                  <Fraction 
                    numerator={1} 
                    denominator={denominator} 
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-md font-bold `}
                    fontcolor={index < selectedPieces ? 'white' : 'black'}
                  />                  
                  {/* 3D effect borders */}
                  <div className="absolute inset-0 border-l-4 border-t-4 shadow-[-0px_0px_10px_rgba(0,0,0,.6)] border-[#FFFFFF20]"></div>
                  <div className="absolute inset-0 border-r-4 border-b-4 shadow-[-0px_0px_10px_rgba(0,0,0,.6)] border-[#00000040]"></div>
                </div>
              );
            })}
          </div>

        {[...Array(Math.floor(denominator/10 - completeRows - 1))].map((_, colIndex) => {
          const index = completeRows*10 + colIndex;
          return (
            <div
              key={`piece-${index}`}
              className={`w-full h-full relative cursor-pointer border-[5px] border-[#906547] bg-gradient-to-br from-[#906547] to-[#785339]`}
              onClick={() => handleClick(index + 1)}
            >
              <Fraction 
                numerator={1} 
                denominator={denominator/10} 
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-md font-bold`}
                fontcolor='black'
              />
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


const BarWithHint = ({
  numerator, 
  denominator, 
  handlePieceClick, 
  active,
  complete
}:{
  numerator: number, 
  denominator: number, 
  handlePieceClick: (index: number) => void, 
  active: boolean,
  complete: () => void
}) => {

  const selectedPieces = numerator;
  
  const handleClick = (index: number) => {
    handlePieceClick(index);
  };

  // Calculate number of complete rows and remaining pieces
  const completeRows = Math.floor(numerator / 10);
  const remainingPieces = numerator % 10;

  const [step,setStep] = useState(0);
  const [input1,setInput1] = useState('');
  const [input2,setInput2] = useState('');

  console.log(completeRows, remainingPieces);

  return (
    <div className="flex my-4 mx-auto w-full aspect-square -space-x-[3px] min-w-52">
      <div className="relative flex flex-col w-full h-full -space-y-[3px] min-w-52">


        {step === 0 ? 

          [...Array(denominator/10)].map((_, index) => {
            return (
              <div
                key={`piece-${index}`}
                className={`w-full h-full relative cursor-pointer border-[5px] border-[#906547] ${
                  index < Math.floor(numerator/10)
                    ? 'bg-gradient-to-br from-[#5B361B] to-[#432611]'
                    : active ? 'bg-gradient-to-br from-[#906547] to-[#785339] hover:bg-gradient-to-br hover:from-[#8d532a] hover:to-[#70401e]'
                    : 'bg-gradient-to-br from-[#906547] to-[#785339]'
                }`}
              >
                {/* 3D effect borders */}
                <div className="absolute inset-0 border-l-4 border-t-4 shadow-[-0px_0px_10px_rgba(0,0,0,.6)] border-[#FFFFFF20]"></div>
                <div className="absolute inset-0 border-r-4 border-b-4 shadow-[-0px_0px_10px_rgba(0,0,0,.6)] border-[#00000040]"></div>
              </div>
            );
          })

        :

        <div className="relative flex flex-col w-full h-full -space-y-[3px] min-w-52">
     
          {[...Array(completeRows)].map((_, rowIndex) => (
            <div key={`row-${rowIndex}`} className="flex w-full h-full -space-x-[3px]">
              {[...Array(10)].map((_, colIndex) => {
                const index = rowIndex * 10 + colIndex;
                return (
                  <div
                    key={`piece-${index}`}
                    className={`w-full h-full relative cursor-pointer border-[5px] border-[#906547] bg-gradient-to-br from-[#5B361B] to-[#432611]`}
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

            <div className="flex w-full h-full -space-x-[3px]">
              {[...Array(10)].map((_, colIndex) => {
                const index = completeRows*10 + colIndex;
                return (
                  <div
                    key={`piece-${index}`}
                    className={`w-full text-center h-full relative cursor-pointer border-[5px] border-[#906547] ${
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

          {[...Array(Math.floor(denominator/10 - completeRows - 1))].map((_, rowIndex) => (
            <div key={`row-${rowIndex}`} className="flex w-full h-full -space-x-[3px]">
              {[...Array(10)].map((_, colIndex) => {
                const index = rowIndex * 10 + colIndex;
                return (
                  <div
                  key={`piece-${index}`}
                  className={`w-full h-full relative cursor-pointer border-[5px] border-[#906547] bg-gradient-to-br from-[#906547] to-[#785339]`}
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

        </div>

        }


      <div className="absolute top-0 border-2 border-black left-full h-[20%] max-w-48 flex items-center p-4 bg-[#e4c3fc] rounded-r-lg shadow-md">
          <Fraction 
            numerator={Math.floor(numerator/10)*10} 
            denominator={denominator} 
            className="text-2xl font-bold text-black mr-2"
          />
          <span className='text-2xl font-bold text-black mx-2'>=</span>
          <div className="flex flex-col items-center">
            <input
              type='text'
              value={input1}
              onChange={(e) => {
                setInput1(e.target.value);
                if (parseInt(input1) === Math.floor(numerator/10)) {
                  setStep(1);
                }

              }}
              disabled={step != 0}
              className={`w-16 h-10 text-2xl text-center border-2 ${parseInt(input1) === Math.floor(numerator/10) ? 'bg-green-500' : ''} border-purple-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600`}
            />
            <div className='w-16 border-b-2 border-black my-1'></div>
            <span className="text-2xl font-bold text-black">{denominator/10}</span>
          </div>
      </div>

      {step >= 1 &&

        <div className="absolute top-[20%] left-full h-[10%] max-w-48 flex items-center p-4 bg-[#e4c3fc] border-2 border-black rounded-br-lg shadow-md">
            <div className="flex flex-col items-center">
              <input
                type='text'
                value={input2}
                onChange={(e) => {
                  setInput2(e.target.value);
                  if (parseInt(e.target.value) === numerator - Math.floor(numerator/10)*10) {
                    complete()
                    setStep(2);
                  }
                }}
                disabled={step != 1}
                className={`w-6 h-6 text-md text-center border-2 border-purple-400 ${parseInt(input2) === (numerator - Math.floor(numerator/10)*10) ? 'bg-green-500' : ''} rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600`}
              />
              <div className='w-6 border-b-2 border-black my-1'></div>
              <span className="text-md font-bold text-black">{denominator/10}</span>
            </div>
        </div>
      }

    </div>
  </div>
  )
}





export { Bar2d, VerticalBar, DecimalHintBar, BarWithHint };