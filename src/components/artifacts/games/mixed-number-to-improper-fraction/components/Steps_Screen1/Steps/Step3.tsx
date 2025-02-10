import React, { useState, useRef, useEffect } from "react"
import type { MixedFraction } from "../../../game-state"
import Level from "../level"
import Image from "next/image"
import redSlicer from "../../../../../../../../public/img/red-Slicer.png"

interface Step3Props {
  mixedFraction: MixedFraction
  onComplete: () => void
  sendAdminMessage: (role: string, content: string, onComplete?: () => void) => void
}

const Step3: React.FC<Step3Props> = ({ mixedFraction, onComplete }) => {
  const [showOptions, setShowOptions] = useState(false)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [clickedPieStates, setClickedPieStates] = useState<boolean[]>(Array(mixedFraction.whole).fill(false))
  const [allPiesClicked, setAllPiesClicked] = useState(false)
  const [isCorrectOption, setIsCorrectOption] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleSlicerClick = () => {
    setShowOptions(prev => !prev)
  }

  const handleOptionClick = (value: number) => {
    // Only block if correct option is selected and all pies are clicked
    if (isCorrectOption && allPiesClicked) return;
    
    setSelectedOption(value)
    setShowOptions(false)
    setClickedPieStates(Array(mixedFraction.whole).fill(false))
    setAllPiesClicked(false)
    
    if (value === mixedFraction.denominator) {
      setIsCorrectOption(true)
    }
  }

  const handlePieClick = (pieIndex: number) => {
    if (!selectedOption) return

    setClickedPieStates(prev => {
      const newStates = [...prev]
      newStates[pieIndex] = true
      
      // Check if all pies are clicked
      const allClicked = newStates.every(state => state)
      setAllPiesClicked(allClicked)
      
      return newStates
    })
  }

  const renderSliceLines = (numSlices: number) => {
    const lines = []
    for (let i = 0; i < numSlices; i++) {
      const angle = (i * 360) / numSlices
      const radians = (angle * Math.PI) / 180
      const x2 = 50 + 48 * Math.cos(radians)
      const y2 = 50 + 48 * Math.sin(radians)
      
      lines.push(
        <line 
          key={i}
          x1="50" 
          y1="50" 
          x2={x2} 
          y2={y2} 
          stroke="black" 
          strokeWidth="0.5"
        />
      )
    }
    return lines
  }

  return (
    <div ref={containerRef} className="w-full min-h-screen bg-pink-50 pt-16">
      <Level mixedFraction={mixedFraction} />

      <div className="w-full">
        <div className="bg-white w-full max-w-4xl mx-auto min-h-[300px] border-2 border-black">
          <div className="flex justify-center gap-8 py-16">
            {/* Whole pies */}
            {[...Array(mixedFraction.whole)].map((_, index) => (
              <div 
                key={`whole-${index}`} 
                className={`w-28 h-28 ${
                  selectedOption && !clickedPieStates[index] 
                    ? 'cursor-[url("/img/knife-cursor.png"),_pointer]' 
                    : ''
                }`}
                onClick={() => handlePieClick(index)}
              >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="48" 
                    fill="#98D400" 
                    stroke="black" 
                    strokeWidth="0.5"
                  />
                  {clickedPieStates[index] && selectedOption && renderSliceLines(selectedOption)}
                </svg>
              </div>
            ))}

            {/* Fraction pie */}
            <div className="w-28 h-28">
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
                {[...Array(mixedFraction.numerator)].map((_, i) => {
                  const startAngle = i * (360 / mixedFraction.denominator)
                  const endAngle = (i + 1) * (360 / mixedFraction.denominator)
                  const radius = 48
                  
                  return (
                    <path
                      key={i}
                      d={`
                        M 50 50
                        L ${50 + radius * Math.cos(startAngle * Math.PI / 180)} ${50 + radius * Math.sin(startAngle * Math.PI / 180)}
                        A ${radius} ${radius} 0 0 1 ${50 + radius * Math.cos(endAngle * Math.PI / 180)} ${50 + radius * Math.sin(endAngle * Math.PI / 180)}
                        Z
                      `}
                      fill="#98D400"
                      stroke="black"
                      strokeWidth="0.5"
                    />
                  )
                })}
              </svg>
            </div>
          </div>
        </div>

        {/* Slicer UI */}
        <div className="relative flex flex-col items-center mt-4">
          <button 
            onClick={handleSlicerClick}
            className={`relative inline-flex ${(isCorrectOption && allPiesClicked) ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isCorrectOption && allPiesClicked}
          >
            <div className="relative px-24 py-8 bg-black rounded-2xl">
              <div className="absolute inset-0 flex items-center justify-center bg-white border-2 border-[#FF497C] rounded-2xl -translate-x-1 -translate-y-1">
                <Image 
                  src={redSlicer} 
                  alt="slicer" 
                  width={44} 
                  height={44} 
                  className="w-11 h-11" 
                />
              </div>
            </div>
            {selectedOption && (
              <div className="absolute -right-14 top-1/2 -translate-y-1/2 bg-[#FF497C] text-white px-5 py-3 text-2xl rounded-lg">
                {selectedOption}
              </div>
            )}
          </button>

          {showOptions && (
            <div className="absolute top-full mt-2 flex flex-col gap-2 items-center">
              {[mixedFraction.denominator - 1, mixedFraction.denominator, mixedFraction.denominator + 1].map((value) => (
                <button 
                  key={value}
                  onClick={() => handleOptionClick(value)}
                  className="w-16 h-12 bg-white border-2 border-[#FF497C] rounded-lg text-xl font-medium shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                >
                  {value}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Formula section */}
        {selectedOption && allPiesClicked && (
          <div className="w-full max-w-4xl mx-auto mt-6">
            <div className={`flex items-center justify-center gap-5 text-5xl py-8 ${
              selectedOption === mixedFraction.denominator ? 'bg-[#C9FFE0]' : 'bg-[#FFB9B9]'
            }`}>
              {/* Formula JSX */}
              <div className="flex items-center">
                {mixedFraction.whole}
                <div className="flex flex-col mx-2 justify-center items-center">
                  <span className="border-b-2 border-black">{mixedFraction.numerator}</span>
                  <span>{mixedFraction.denominator}</span>
                </div>
              </div>

              <span className="mx-4">=</span>

              <div className="flex items-center">
                <div className="flex flex-col mx-2 justify-center items-center">
                  <span className="border-b-2 border-black w-10">&nbsp;</span>
                  <span className={
                    selectedOption === mixedFraction.denominator 
                      ? 'text-[#009C43]' 
                      : 'text-red-500'
                  }>
                    {selectedOption}
                  </span>
                </div>
                <span className="mx-4">+</span>
                <div className="flex flex-col mx-2 justify-center items-center">
                  <span className="border-b-2 border-black">{mixedFraction.numerator}</span>
                  <span>{mixedFraction.denominator}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedOption === mixedFraction.denominator && allPiesClicked && (
          <div className="w-full max-w-4xl mx-auto mt-8 flex justify-center">
            <button 
              onClick={onComplete}
              className="px-16 py-4 bg-white border-2 border-[#FF497C] text-[#FF497C] text-3xl font-medium rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-[#FF497C] hover:text-white transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Step3