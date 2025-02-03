import React, { useState } from "react"
import GameLayout from "../GameLayout"
import type { MixedFraction, GameState } from "../../../game-state"
import { useGameState } from "../../../state-utils"

interface Step4Props {
  mixedFraction: MixedFraction
  onComplete: () => void
}

const Step4: React.FC<Step4Props> = ({ mixedFraction, onComplete }) => {
  const { setGameStateRef } = useGameState();
  const [selectedPieces, setSelectedPieces] = useState(0)
  const totalPieces = mixedFraction.whole * mixedFraction.denominator

  const handlePieClick = () => {
    if (selectedPieces < mixedFraction.numerator) {
      setSelectedPieces((prev) => prev + 1)
    } else {
      setSelectedPieces(0)
    }
  }

  const handleDoneClick = () => {
    console.log('Done button clicked');
    
    setGameStateRef(prevState => {
      const newState: GameState = {
        ...prevState,
        screen: 'second' as const,
        state1: {
          ...prevState.state1,
          step: 4
        },
        state2: {
          ...prevState.state2,
          step: 0,
          mixedFraction: mixedFraction
        }
      };
      
      console.log('New state:', newState);
      return newState;
    });
  };

  const renderSliceLines = (numSlices: number) => {
    const center = 50
    const radius = 48
    const strokeWidth = 3

    return (
      <>
        {/* Base circle with black outline */}
        <circle 
          cx={center} 
          cy={center} 
          r={radius} 
          fill="#D3EA00" 
          stroke="black" 
          strokeWidth="1"
        />
        
        {/* Draw cross lines with only white gaps */}
        {/* Vertical line */}
        <line 
          x1={center} 
          y1={center - radius} 
          x2={center} 
          y2={center + radius} 
          stroke="white" 
          strokeWidth={strokeWidth} 
        />

        {/* Horizontal line */}
        <line 
          x1={center - radius} 
          y1={center} 
          x2={center + radius} 
          y2={center} 
          stroke="white" 
          strokeWidth={strokeWidth} 
        />

        {/* Outer circle to maintain clean edge */}
        <circle 
          cx={center} 
          cy={center} 
          r={radius} 
          fill="none" 
          stroke="black" 
          strokeWidth="1"
        />
      </>
    )
  }

  const renderSelectedSlices = (count: number, total: number) => {
    const center = 50
    const radius = 48
    const strokeWidth = 3

    // First draw the base circle with slices
    return (
      <>
        {/* Base circle */}
        <circle 
          cx={center} 
          cy={center} 
          r={radius} 
          fill="white" 
          stroke="black" 
          strokeWidth="1"
        />
        
        {/* Draw cross lines */}
        <line 
          x1={center} 
          y1={center - radius} 
          x2={center} 
          y2={center + radius} 
          stroke="white" 
          strokeWidth={strokeWidth} 
        />
        <line 
          x1={center - radius} 
          y1={center} 
          x2={center + radius} 
          y2={center} 
          stroke="white" 
          strokeWidth={strokeWidth} 
        />

        {/* Draw selected slices */}
        {[...Array(count)].map((_, i) => {
          const startAngle = (i * 360) / total
          const endAngle = ((i + 1) * 360) / total
          const startRad = (startAngle * Math.PI) / 180
          const endRad = (endAngle * Math.PI) / 180

          return (
            <path
              key={i}
              d={`
                M ${center} ${center}
                L ${center + radius * Math.cos(startRad)} ${center + radius * Math.sin(startRad)}
                A ${radius} ${radius} 0 0 1 ${center + radius * Math.cos(endRad)} ${center + radius * Math.sin(endRad)}
                Z
              `}
              fill="#D3EA00"
              stroke="black"
              strokeWidth="1"
            />
          )
        })}

        {/* Outer circle for clean edge */}
        <circle 
          cx={center} 
          cy={center} 
          r={radius} 
          fill="none" 
          stroke="black" 
          strokeWidth="1"
        />
      </>
    )
  }

  return (
    <GameLayout
      mixedFraction={mixedFraction}
      stepNumber={4}
      level={1}
      stepTitle="ADD THE FRACTION"
    >
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-20">
        {/* Left side - Whole number pies */}
        <div>

          <div className="bg-white w-full p-8">
            <div className="flex justify-center gap-8">
              {[...Array(mixedFraction.whole)].map((_, index) => (
                <div key={index} className="w-28 h-28">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    {renderSliceLines(mixedFraction.denominator)}
                  </svg>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center mt-2 relative">
            <div className="h-0.5 w-full bg-black"></div>
            <div className="pt-2 text-lg">
              {totalPieces}/{mixedFraction.denominator}
            </div>
          </div>
        </div>


        <div className="text-4xl font-bold">+</div>

        {/* Right side - Fraction selection */}
        <div className="bg-white rounded-2xl p-8">
          <div className="text-sm text-[#FF2763] mb-4 text-center">
            Select {mixedFraction.numerator}/{mixedFraction.denominator}ths here
          </div>
          <div className="w-28 h-28 cursor-pointer mx-auto" onClick={handlePieClick}>
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {renderSliceLines(mixedFraction.denominator)}
              {renderSelectedSlices(selectedPieces, mixedFraction.denominator)}
            </svg>
          </div>
          <div className="text-center mt-4 relative">
            <div className="h-0.5 w-16 bg-black absolute top-0 left-1/2 -translate-x-1/2"></div>
            <div className="pt-2 text-lg">
              {selectedPieces}/{mixedFraction.denominator}
            </div>
          </div>
          
          {/* Next step button */}
          {selectedPieces === mixedFraction.numerator && (
            <button
              onClick={handleDoneClick}
              className="mt-4 w-full bg-pink-500 text-white py-2 rounded-xl font-medium tracking-wide text-base sm:text-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:opacity-90 transition-opacity"
            >
              Done
            </button>
          )}
        </div>
      </div>
    </GameLayout>
  )
}

export default Step4