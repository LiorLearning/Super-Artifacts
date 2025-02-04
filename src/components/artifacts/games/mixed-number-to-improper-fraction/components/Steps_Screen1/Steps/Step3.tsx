import React, { useState, useRef, useEffect } from "react"
import GameLayout from "../GameLayout"
import type { MixedFraction } from "../../../game-state"

interface Step3Props {
  mixedFraction: MixedFraction
  onComplete: () => void
  sendAdminMessage: (role: string, content: string, onComplete?: () => void) => void
}

const Step3: React.FC<Step3Props> = ({ mixedFraction, onComplete, sendAdminMessage }) => {
  const [selectedSlices, setSelectedSlices] = useState<Set<string>>(new Set())
  const [showAwesome, setShowAwesome] = useState(false)
  const [showStepButton, setShowStepButton] = useState(false)
  const messageShown = useRef(false)
  const lastMessage = useRef<string>("")
  const totalPieces = mixedFraction.whole * mixedFraction.denominator

  useEffect(() => {
    if (!messageShown.current) {
      sendAdminMessage(
        "agent",
        "Click on each slice to count them. Let's see how many pieces we have in total!"
      )
      messageShown.current = true
    }
  }, [])

  const handlePieceClick = (pieIndex: number, sliceIndex: number) => {
    const sliceId = `${pieIndex}-${sliceIndex}`
    if (selectedSlices.has(sliceId)) return

    const newSelectedSlices = new Set(selectedSlices)
    newSelectedSlices.add(sliceId)
    setSelectedSlices(newSelectedSlices)
    
    if (newSelectedSlices.size === totalPieces) {
      setShowAwesome(true)
      sendAdminMessage("agent", "Wow! You've counted all the pieces perfectly!", () => {
        setTimeout(() => {
          sendAdminMessage(
            "agent",
            "Ready for the next exciting step? Click on Step 4 to continue our fraction adventure!",
            () => {
              setShowStepButton(true)
            }
          )
        }, 1000)
      })
    }
  }

  const renderSliceLines = (pieIndex: number) => {
    const center = 50
    const radius = 48
    const strokeWidth = 3
    const slices = Array(mixedFraction.denominator).fill(0)

    return (
      <>
        {/* Base circle */}
        <circle 
          cx={center} 
          cy={center} 
          r={radius} 
          fill="#90EE90" 
          stroke="black" 
          strokeWidth="1"
        />
        
        {/* Clickable slices */}
        {slices.map((_, index) => {
          const sliceId = `${pieIndex}-${index}`
          const isSelected = selectedSlices.has(sliceId)
          const angle = (360 / mixedFraction.denominator) * index
          const nextAngle = (360 / mixedFraction.denominator) * (index + 1)
          const startX = center + radius * Math.cos((angle - 90) * Math.PI / 180)
          const startY = center + radius * Math.sin((angle - 90) * Math.PI / 180)
          const endX = center + radius * Math.cos((nextAngle - 90) * Math.PI / 180)
          const endY = center + radius * Math.sin((nextAngle - 90) * Math.PI / 180)

          return (
            <path
              key={index}
              d={`M ${center} ${center} L ${startX} ${startY} A ${radius} ${radius} 0 0 1 ${endX} ${endY} Z`}
              fill={isSelected ? "#D3EA00" : "#90EE90"}
              stroke="white"
              strokeWidth={strokeWidth}
              style={{ cursor: 'pointer' }}
              onClick={() => handlePieceClick(pieIndex, index)}
              className="transition-colors duration-200"
            />
          )
        })}

        {/* Outer circle border */}
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
      stepNumber={3}
      level={1}
      stepTitle="Count the Pieces"
    >
      {/* Pies container with white background */}
      <div className="bg-white w-full p-8 mb-12">
        <div className="flex justify-center gap-8">
          {[...Array(mixedFraction.whole)].map((_, index) => (
            <div key={index} className="w-28 h-28">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {renderSliceLines(index)}
              </svg>
            </div>
          ))}
        </div>
      </div>

      {/* Display section */}
      <div className="bg-white rounded-2xl p-8">
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-center gap-3 text-xl">
            <span>So there are</span>
            <div className="w-16 h-12 border-2 border-gray-300 rounded-lg flex items-center justify-center text-xl">
              {selectedSlices.size}
            </div>
            <span>
              <sup>1</sup>⁄<sub>{mixedFraction.denominator}</sub> sized pieces in {mixedFraction.whole} wholes
            </span>
          </div>

          {/* Success feedback */}
          {showAwesome && (
            <div className="flex flex-col items-center gap-4">
              <div className="w-96 bg-[#d9f7be] py-3 text-center font-bold rounded-lg text-xl">
                AWESOME
              </div>
              <div className="w-96 bg-[#fffbe6] p-6 text-center rounded-lg text-xl">
                {mixedFraction.whole} wholes = {totalPieces}/{mixedFraction.denominator}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Next step button */}
      {showAwesome && showStepButton && (
        <div className="mt-8 flex justify-center pb-8">
          <div className="relative w-[180px] h-[90px]">
            <div className="absolute -bottom-2 left-2 w-full h-full bg-black"></div>
            <div className="absolute -bottom-2 left-2 w-full h-full bg-black opacity-60"></div>
            <button 
              onClick={onComplete}
              className="relative w-full h-full border-[10px] border-[#FF497C] bg-white flex items-center justify-center"
            >
              <span className="text-[#FF497C] text-[32px] tracking-wide font-bold">STEP 4 &gt;&gt;</span>
            </button>
          </div>
        </div>
      )}
    </GameLayout>
  )
}

export default Step3