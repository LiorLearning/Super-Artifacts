import React, { useState } from "react"
import Image from 'next/image';
import GameLayout from "../GameLayout"
import type { MixedFraction } from "../../../game-state"

interface Step2Props {
  mixedFraction: MixedFraction
  onComplete: () => void
}

interface SlicerOption {
  value: number;
  text: string;
  icon: string;
}

const Step2: React.FC<Step2Props> = ({ mixedFraction, onComplete }) => {
  const [selectedSlice, setSelectedSlice] = useState(mixedFraction.denominator)
  const [isSliced, setIsSliced] = useState(false)

  const slicerOptions = [
    { 
      value: mixedFraction.denominator - 1, 
      text: `Slices the pie in ${mixedFraction.denominator - 1} pieces`, 
      icon: '/img/red-Slicer.png'
    },
    { 
      value: mixedFraction.denominator, 
      text: `Slices the pie in ${mixedFraction.denominator} pieces`, 
      icon: '/img/yellow-Slicer.png'
    },
    { 
      value: mixedFraction.denominator + 1, 
      text: `Slices the pie in ${mixedFraction.denominator + 1} pieces`, 
      icon: '/img/blue-Slicer.png'
    },
  ]

  const handleSlice = () => {
    if (selectedSlice === mixedFraction.denominator) {
      setIsSliced(true)
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

  return (
    <GameLayout
      mixedFraction={mixedFraction}
      stepNumber={2}
      level={1}
      stepTitle="Wholes to Fractions"
    >
        {/* Pies container with white background */}
        <div className="bg-white w-full p-8 mb-12">
          <div className="flex justify-center gap-8">
            {[...Array(mixedFraction.whole)].map((_, index) => (
              <div key={index} className="w-28 h-28">
                <svg 
                  viewBox="0 0 100 100" 
                  className="w-full h-full"
                >
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="48" 
                    fill="#C2F542" 
                    stroke="black" 
                    strokeWidth="0.5"
                  />
                  {isSliced && renderSliceLines(selectedSlice)}
                </svg>
              </div>
            ))}
          </div>
        </div>

        {/* Slicer options */}
        <div className="bg-white rounded-2xl p-8">
          <h3 className="font-bold text-xl mb-8">Choose your slicer</h3>
          <div className="flex flex-col gap-6 mb-8">
            {slicerOptions.map((option) => (
              <div
                key={option.value}
                className="flex items-center gap-6 cursor-pointer"
                onClick={() => setSelectedSlice(option.value)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center">
                    {selectedSlice === option.value && (
                      <div className="w-3 h-3 rounded-full bg-gray-600" />
                    )}
                  </div>
                  <Image 
                    src={option.icon} 
                    alt="slicer" 
                    width={32} 
                    height={32} 
                    className="w-8 h-8"
                  />
                </div>
                <span className="text-gray-600 text-lg">{option.text}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSlice}
              className="bg-[#FF497C] text-white px-12 py-3 rounded-xl text-lg font-medium hover:bg-opacity-90 transition-colors"
            >
              Slice
            </button>
          </div>
        </div>

        {isSliced && (
          <div className="mt-8 flex justify-center">
            <div className="relative w-[200px]">
              {/* Black shadow boxes */}
              <div className="absolute -bottom-2 -left-2 w-full h-full bg-black"></div>
              <div className="absolute -bottom-2 -left-2 w-full h-full bg-black opacity-60"></div>
              
              {/* Main button */}
              <button 
                onClick={onComplete}
                className="relative w-full border-[10px] border-[#FF497C] py-2 bg-white"
              >
                <span className="text-[#FF497C] text-[28px] tracking-wide">STEP 2&gt;&gt;</span>
              </button>
            </div>
          </div>
        )}
    </GameLayout>
  )
}

export default Step2