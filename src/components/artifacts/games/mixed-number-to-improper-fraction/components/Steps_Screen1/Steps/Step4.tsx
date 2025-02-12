import React, { useState, useRef, useEffect } from "react"
import GameLayout from "../GameLayout"
import type { MixedFraction, GameState } from "../../../game-state"
import { useGameState } from "../../../state-utils"

interface Step4Props {
  mixedFraction: MixedFraction
  onComplete: () => void
  sendAdminMessage: (role: string, content: string, onComplete?: () => void) => void
}

const Step4: React.FC<Step4Props> = ({ mixedFraction, onComplete, sendAdminMessage }) => {
  const { setGameStateRef } = useGameState();
  const [selectedPieces, setSelectedPieces] = useState<Set<string>>(new Set())
  const totalPieces = mixedFraction.whole * mixedFraction.denominator
  const messageShown = useRef(false)
  const [shouldShowSuccess, setShouldShowSuccess] = useState(false)

  // Initial message
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!messageShown.current) {
        sendAdminMessage(
          "agent",
          "Now select the remaining pieces to complete our fraction. Click on the pie to select pieces!"
        )
        messageShown.current = true
      }
    }, 0)
    return () => clearTimeout(timer)
  }, [])

  // Success message
  useEffect(() => {
    if (shouldShowSuccess) {
      sendAdminMessage(
        "agent",
        "Perfect! You've selected the right number of pieces. Click Done to continue!"
      )
      setShouldShowSuccess(false)
    }
  }, [shouldShowSuccess])


  const handlePieClick = (index: number) => {
    const newSelectedPieces = new Set(selectedPieces)
    if (newSelectedPieces.has(index.toString())) {
      newSelectedPieces.delete(index.toString())
    } else if (newSelectedPieces.size < mixedFraction.numerator) {
      newSelectedPieces.add(index.toString())
    }
    setSelectedPieces(newSelectedPieces)
    if (newSelectedPieces.size === mixedFraction.numerator) {
      setShouldShowSuccess(true)

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

  const renderSliceLines = (denominator: number) => {
    const lines = []
    const center = 50
    const radius = 48

    // Generate lines based on number of slices
    for (let i = 0; i < denominator; i++) {
      const angle = (i * 360) / denominator
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

  const renderSelectableSlices = () => {
    const slices = []
    const center = 50
    const radius = 48
    const strokeWidth = 3

    for (let i = 0; i < mixedFraction.denominator; i++) {
      const angle = (360 / mixedFraction.denominator) * i
      const nextAngle = (360 / mixedFraction.denominator) * (i + 1)
      const startX = center + radius * Math.cos((angle - 90) * Math.PI / 180)
      const startY = center + radius * Math.sin((angle - 90) * Math.PI / 180)
      const endX = center + radius * Math.cos((nextAngle - 90) * Math.PI / 180)
      const endY = center + radius * Math.sin((nextAngle - 90) * Math.PI / 180)

      slices.push(
        <path
          key={i}
          d={`M ${center} ${center} L ${startX} ${startY} A ${radius} ${radius} 0 0 1 ${endX} ${endY} Z`}
          fill={selectedPieces.has(i.toString()) ? "#98D400" : "#D3EA00"}
          stroke="white"
          strokeWidth={strokeWidth}
          style={{ cursor: 'pointer' }}
          onClick={() => handlePieClick(i)}
          className="transition-colors duration-200"
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
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#FFD9D9] p-8 rounded-2xl">
          <div className="flex justify-center items-center gap-12">
            {/* Left box with circles */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 flex-1 max-w-md">
              <div className="flex items-center justify-center gap-4">
                {[...Array(mixedFraction.whole)].map((_, index) => (
                  <div key={index} className="w-24 h-24">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <circle 
                        cx="50" 
                        cy="50" 
                        r="48" 
                        fill="#98D400" 
                        stroke="black" 
                        strokeWidth="1"
                      />
                      {renderSliceLines(mixedFraction.denominator)}
                    </svg>
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-4">
                <div className="flex flex-col items-center">
                  <span className="text-2xl">{totalPieces}</span>
                  <div className="h-[2px] w-5 bg-black"></div>
                  <span className="text-2xl">{mixedFraction.denominator}</span>
                </div>
              </div>
            </div>

            {/* Plus sign */}
            <div className="flex items-center text-4xl font-bold">
              +
            </div>

            {/* Right box for selecting fraction */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 flex-1 max-w-[280px] text-center">
              <div className="text-[#FF497C] text-2xl mb-4">
                Select {mixedFraction.numerator}/{mixedFraction.denominator}ths here
              </div>
              <div className="w-28 h-28 mx-auto">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="48" 
                    fill="#D3EA00" 
                    stroke="black" 
                    strokeWidth="1"
                  />
                  {renderSliceLines(mixedFraction.denominator)}
                  {renderSelectableSlices()}
                </svg>
              </div>
              <div className="flex justify-center mt-4">
                <div className="flex flex-col items-center">
                  <span className="text-2xl">{selectedPieces.size}</span>
                  <div className="h-[2px] w-5 bg-black"></div>
                  <span className="text-2xl">{mixedFraction.denominator}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Done button */}
        {selectedPieces.size === mixedFraction.numerator && (
          <div className="relative mt-6 w-[140px] mx-auto">
            <div className="absolute -bottom-1 -left-1 w-full h-full bg-black rounded-xl"></div>
            <div className="absolute -bottom-1 -left-1 w-full h-full bg-black opacity-60 rounded-xl"></div>
            <button
              onClick={handleDoneClick}
              className="relative w-full bg-[#FF497C] text-white px-8 py-3 rounded-xl text-xl"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </GameLayout>
  )
}

export default Step4