import React, { useState } from "react"
import GameLayout from "../GameLayout"
import type { MixedFraction } from "../../../game-state"

interface Step3Props {
  mixedFraction: MixedFraction
  onComplete: () => void
}

const Step3: React.FC<Step3Props> = ({ mixedFraction, onComplete }) => {
  const [piecesInput, setPiecesInput] = useState("")
  const [showAwesome, setShowAwesome] = useState(false)

  const totalPieces = mixedFraction.whole * mixedFraction.denominator

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPiecesInput(value)

    if (Number.parseInt(value) === totalPieces) {
      setShowAwesome(true)
    } else {
      setShowAwesome(false)
    }
  }

  return (
    <GameLayout
      mixedFraction={mixedFraction}
      stepNumber={3}
      level={1}
      stepTitle="Add the Fraction"
    >

      {/* Pies container with white background */}
      <div className="bg-white w-full p-8 mb-12">
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
                {/* Use the same slice rendering as Step2 */}
                {renderSliceLines(mixedFraction.denominator)}
              </svg>
            </div>
          ))}
        </div>
      </div>

      {/* Input section */}
      <div className="bg-white rounded-2xl p-8">
        <div className="flex flex-col gap-8">
          {/* Question and input */}
          <div className="flex items-center justify-center gap-3 text-xl">
            <span>So there are</span>
            <input
              type="text"
              value={piecesInput}
              onChange={handleInputChange}
              className="w-16 h-12 border-2 border-gray-300 rounded-lg text-center text-xl"
            />
            <span>
              <sup>1</sup>⁄<sub>{mixedFraction.denominator}</sub> sized pieces in {mixedFraction.whole} wholes
            </span>
          </div>

          {/* Awesome feedback */}
          {showAwesome && (
            <div className="flex flex-col items-center gap-4">
              <div className="w-96 bg-[#d9f7be] py-3 text-center font-bold rounded-lg text-xl">
                AWESOME
              </div>
              <div className="w-96 bg-[#fffbe6] p-6 text-center rounded-lg text-xl">
                {mixedFraction.whole} wholes =
                <input
                  type="text"
                  className="w-16 mx-2 text-center border-2 border-gray-300 rounded-lg"
                  readOnly
                  value={totalPieces}
                />
                /{mixedFraction.denominator}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Next step button */}
      {showAwesome && (
        <div className="mt-8 flex justify-center">
          <div className="relative w-[180px]">
            {/* Black shadow boxes */}
            <div className="absolute -bottom-1.5 -left-1.5 w-full h-full bg-black"></div>
            <div className="absolute -bottom-1.5 -left-1.5 w-full h-full bg-black opacity-60"></div>
            
            {/* Main button */}
            <button 
              onClick={onComplete}
              className="relative w-full border-[8px] border-[#FF497C] py-1.5 bg-white"
            >
              <span className="text-[#FF497C] text-[24px] tracking-wide">STEP 3 &gt;&gt;</span>
            </button>
          </div>
        </div>
      )}
    </GameLayout>
  )
}

export default Step3