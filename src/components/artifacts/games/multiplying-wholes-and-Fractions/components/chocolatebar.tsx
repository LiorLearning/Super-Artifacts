import React from 'react'
import Fraction from './Fraction';
import { Button } from '@/components/custom_ui/button';

const ChocolateBar = (
  {
    numerator, 
    denominator, 
    handlePieceClick, 
    handleKnifeClick, 
    handleJoinClick,
    active
  }:{
    numerator: number, 
    denominator: number, 
    handlePieceClick: (index: number) => void, 
    handleKnifeClick: () => void, 
    handleJoinClick: () => void,
    active: boolean
  }) => {

  const selectedPieces = numerator;
  
  const handleClick = (index: number) => {
    handlePieceClick(index);
  };

  const handlesplit = () => {
    handleKnifeClick();
  }

  const handlejoin = () => {
    handleJoinClick();
  }

  return (
    <div className="flex max-w-screen-md my-4 mx-auto w-[60%] relative -space-x-[3px] min-w-52">
      <Fraction numerator={numerator} denominator={denominator} className='absolute right-[calc(100%+25px)] text-3xl text-black leading-none px-4 -top-4 flex items-center border-4 border-[#b9550b] mr-4' />
      <div className="flex w-full -space-x-[3px] min-w-52">
        {[...Array(denominator)].map((_, index) => (
          <div
            key={index}
            className={`w-full h-16 relative cursor-pointer border-[5px] border-[#906547] ${
              index < selectedPieces
                ? 'bg-gradient-to-br from-[#5B361B] to-[#432611]'
                : 'bg-gradient-to-br from-[#906547] to-[#785339] hover:bg-gradient-to-br hover:from-[#8d532a] hover:to-[#70401e]'
            }`}
            onClick={() => handleClick(index + 1)}
          >
            {/* 3D effect borders */}
            <div className="absolute inset-0 border-l-4 border-t-4 shadow-[-0px_0px_10px_rgba(0,0,0,.6)] border-[#FFFFFF20]"></div>
            <div className="absolute inset-0 border-r-4 border-b-4   border-[#00000040]"></div>
          </div>
        ))}
      </div>
      <div className="absolute -top-6 left-full flex flex-col gap-4 px-8 items-stretch">
        <Button
          id="split-button"
          className={`${active ? 'bg-[#fef149] hover:bg-[#fef149]/80' : 'bg-red-100 hover:bg-red-200/80'} text-black text-xl px-4 py-2 flex items-center rounded-none gap-2 shadow-[-3px_3px_0px_0px_rgba(0,0,0)]`}
          onClick={() => handlesplit()}
          disabled={!active}
        >
          Split 🔪
        </Button>
        <Button
          id="join-button"
          className={`${active ? 'bg-[#fef149] hover:bg-[#fef149]/80' : 'bg-red-100 hover:bg-red-100/80'} text-black text-xl  px-4 py-2 flex items-center rounded-none gap-2 shadow-[-3px_3px_0px_0px_rgba(0,0,0)] ${denominator === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => {
          if (denominator === 1) {
            return;
          }
          handlejoin()
          }}
          disabled={!active || denominator === 1}
        >
          Join 🍯
        </Button>

        </div>
      </div>
    )
}

export default ChocolateBar