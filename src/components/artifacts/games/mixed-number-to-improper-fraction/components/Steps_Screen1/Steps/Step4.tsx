import React, { useState } from "react"
import GameLayout from "../GameLayout"
import type { MixedFraction } from "../../../game-state"

interface Step4Props {
  mixedFraction: MixedFraction
  onComplete: () => void
}

const Step4: React.FC<Step4Props> = ({ mixedFraction, onComplete }) => {
  const [selectedPieces, setSelectedPieces] = useState(0)
  const totalPieces = mixedFraction.whole * mixedFraction.denominator

  const handlePieClick = () => {
    if (selectedPieces < mixedFraction.numerator) {
      setSelectedPieces((prev) => prev + 1)
    } else {
      setSelectedPieces(0)
    }
  }

  const renderSliceLines = (numSlices: number) => {
    const lines = []
    const center = 50
    const radius = 48

    // Generate lines based on number of slices
    for (let i = 0; i < numSlices; i++) {
      const angle = (i * 360) / numSlices
      const radians = (angle * Math.PI) / 180
      const x = center + radius * Math.cos(radians)
      const y = center + radius * Math.sin(radians)

      lines.push(
        <line
          key={i}
          x1={center}
          y1={center}
          x2={x}
          y2={y}
          stroke="black"
          strokeWidth="0.5"
        />
      )
    }

    return lines
  }

  const renderSelectedSlices = (numSelected: number, totalSlices: number) => {
    const slices = []
    const anglePerSlice = 360 / totalSlices

    for (let i = 0; i < numSelected; i++) {
      const startAngle = i * anglePerSlice
      const endAngle = startAngle + anglePerSlice
      const startRad = (startAngle * Math.PI) / 180
      const endRad = (endAngle * Math.PI) / 180
      
      slices.push(
        <path
          key={i}
          d={`M 50 50 
              L ${50 + 48 * Math.cos(startRad)} ${50 + 48 * Math.sin(startRad)} 
              A 48 48 0 0 1 ${50 + 48 * Math.cos(endRad)} ${50 + 48 * Math.sin(endRad)} 
              Z`}
          fill="#C2F542"
        />
      )
    }

    return slices
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
          {/* Pies container with white background */}
          <div className="bg-white w-full p-8">
            <div className="flex justify-center gap-8">
              {[...Array(mixedFraction.whole)].map((_, index) => (
                <div key={index} className="w-28 h-28">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="48" 
                      fill="#C2F542" 
                      stroke="black" 
                      strokeWidth="0.5" 
                    />
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

        {/* Plus sign */}
        <div className="text-4xl font-bold">+</div>

        {/* Right side - Fraction selection */}
        <div className="bg-white rounded-2xl p-8">
          <div className="text-sm text-gray-500 mb-4 text-center">
            Select {mixedFraction.numerator}/{mixedFraction.denominator}ths here
          </div>
          <div className="w-28 h-28 cursor-pointer mx-auto" onClick={handlePieClick}>
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle 
                cx="50" 
                cy="50" 
                r="48" 
                fill="white" 
                stroke="black" 
                strokeWidth="0.5" 
              />
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
            onClick={onComplete}
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