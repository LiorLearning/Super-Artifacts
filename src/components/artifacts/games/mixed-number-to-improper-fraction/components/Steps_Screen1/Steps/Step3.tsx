import React, { useState, useRef, useEffect } from "react"
import GameLayout from "../GameLayout"
import type { MixedFraction } from "../../../game-state"

interface Step3Props {
  mixedFraction: MixedFraction
  onComplete: () => void
  sendAdminMessage: (role: string, content: string, onComplete?: () => void) => void
}

const Step3: React.FC<Step3Props> = ({ mixedFraction, onComplete, sendAdminMessage }) => {
  const [piecesInput, setPiecesInput] = useState("")
  const [showAwesome, setShowAwesome] = useState(false)
  const [showStepButton, setShowStepButton] = useState(false)
  const messageShown = useRef(false)
  const timeoutRef = useRef<NodeJS.Timeout>()
  const lastMessage = useRef<string>("")

  const totalPieces = mixedFraction.whole * mixedFraction.denominator

  useEffect(() => {
    if (!messageShown.current) {
      sendAdminMessage(
        "agent",
        "Time for a counting adventure! Can you help me count all the slices in these pies? Put your answer in the box!"
      )
      messageShown.current = true
    }
  }, [])

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPiecesInput(value)

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    const totalPiecesStr = totalPieces.toString()
    
    // Only check answer if input length matches or exceeds answer length
    if (value.length >= totalPiecesStr.length) {
      // Set new timeout to check answer after 1 second
      timeoutRef.current = setTimeout(() => {
        if (Number.parseInt(value) === totalPieces) {
          setShowAwesome(true)
          const message = "Wow! You're an amazing slice counter! That's exactly right!"
          if (lastMessage.current !== message) {
            sendAdminMessage("agent", message, () => {
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
            lastMessage.current = message
          }
        } else if (value !== "") {
          const message = "Hmm... Let's count those slices one more time! You can do it!"
          if (lastMessage.current !== message) {
            sendAdminMessage("agent", message)
            lastMessage.current = message
          }
          setShowAwesome(false)
        }
      }, 1000)
    }
  }

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

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