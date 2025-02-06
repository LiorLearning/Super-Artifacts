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
  const stepButtonRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const totalPieces = mixedFraction.whole * mixedFraction.denominator
  const [inputValue, setInputValue] = useState<string>('')
  const [countMethod, setCountMethod] = useState<'click' | 'manual'>('click')
  const [autoSelectedCount, setAutoSelectedCount] = useState<number>(0)
  const [hasChecked, setHasChecked] = useState(false)

  useEffect(() => {
    if (!messageShown.current) {
      sendAdminMessage(
        "agent",
        `Can you count how many 1/${mixedFraction.denominator}th pieces does ${mixedFraction.whole} wholes have? You can either click on the pieces to count, or just enter the number manually`

      )
      messageShown.current = true

    }
  }, [])

  useEffect(() => {
    if (showStepButton && stepButtonRef.current) {
      stepButtonRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [showStepButton])

  useEffect(() => {
    setHasChecked(false)
    setAutoSelectedCount(0)
  }, [countMethod])

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }, [])

  const handlePieceClick = (pieIndex: number, sliceIndex: number) => {
    if (countMethod === 'manual') return;
    
    const sliceId = `${pieIndex}-${sliceIndex}`
    if (selectedSlices.has(sliceId)) return;

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

  const handleManualSubmit = () => {
    setHasChecked(true)
    const value = parseInt(inputValue) || 0
    
    if (value <= totalPieces) {
      setAutoSelectedCount(value)
    } else {
      setAutoSelectedCount(0)
    }


    if (value === totalPieces) {
      setShowAwesome(true)
      sendAdminMessage("agent", "Perfect! That's exactly right!", () => {
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
    } else {
      sendAdminMessage("agent", "That's not quite right. Try counting again or use the click method!")
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    setHasChecked(false)
  }

  const renderSliceLines = (pieIndex: number) => {

    const center = 50
    const radius = 48
    const strokeWidth = 3
    const slices = Array(mixedFraction.denominator).fill(0)
    
    const piecesPerPie = mixedFraction.denominator
    const fullPiesColored = Math.floor(autoSelectedCount / piecesPerPie)
    const remainingPieces = autoSelectedCount % piecesPerPie
    
    return (
      <>
        {/* Base circle */}
        <circle 
          cx={center} 
          cy={center} 
          r={radius} 
          fill="#98D400" 
          stroke="black" 
          strokeWidth="1"
        />
        
        {/* Clickable slices */}
        {slices.map((_, index) => {
          const sliceId = `${pieIndex}-${index}`
          const isManuallySelected = countMethod === 'manual' && 
            hasChecked &&
            parseInt(inputValue) <= totalPieces &&
            ((pieIndex < fullPiesColored) || 
             (pieIndex === fullPiesColored && index < remainingPieces))
          const isClickSelected = countMethod === 'click' && selectedSlices.has(sliceId)
          const isSelected = isManuallySelected || isClickSelected
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
              fill={isSelected ? "#98D400" : "#D3EA00"}
              stroke="white"
              strokeWidth={strokeWidth}
              style={{ cursor: countMethod === 'click' ? 'pointer' : 'default' }}
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
    <div ref={containerRef} className="w-full">
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
          <div className="flex flex-col items-center gap-6">
            {/* Text and input section */}
            <div className="flex items-center justify-center gap-3 text-xl">
              <span>So there are</span>
              {countMethod === 'click' ? (
                <div className="w-16 h-12 border-2 border-gray-300 rounded-lg flex items-center justify-center text-xl">
                  {selectedSlices.size}
                </div>
              ) : (
                <input
                  type="number"
                  value={inputValue}
                  onChange={handleInputChange}
                  className="w-16 h-12 border-2 border-gray-300 rounded-lg text-center text-xl"
                  placeholder="?"
                  min="0"
                  max={totalPieces}
                />
              )}
              <div className="flex flex-col items-center">
                <span className="text-xl">1</span>
                <div className="h-[2px] w-5 bg-black"></div>
                <span className="text-xl">{mixedFraction.denominator}</span>
              </div>
              <span>sized pieces in {mixedFraction.whole} wholes</span>
            </div>

            {/* Enter Manually button with shadow */}
            {countMethod === 'click' && (
              <div className="relative">
                <div className="absolute -bottom-1 -left-1 w-full h-full bg-black rounded-xl"></div>
                <div className="absolute -bottom-1 -left-1 w-full h-full bg-black opacity-60 rounded-xl"></div>
                <button
                  onClick={() => setCountMethod('manual')}
                  className="relative px-8 py-3 rounded-xl text-xl border-2 border-[#FF497C] text-[#FF497C] bg-white hover:bg-[#FF497C] hover:text-white transition-colors"
                >
                  Enter Manually
                </button>
              </div>
            )}

            {countMethod === 'manual' && (
              <div className="relative">
                <div className="absolute -bottom-1 -left-1 w-full h-full bg-black rounded-xl"></div>
                <div className="absolute -bottom-1 -left-1 w-full h-full bg-black opacity-60 rounded-xl"></div>
                <button
                  onClick={handleManualSubmit}
                  className="relative bg-[#FF497C] text-white px-8 py-3 rounded-xl text-xl"
                >
                  Check
                </button>
              </div>
            )}

            {/* Success feedback */}
            {showAwesome && (
              <div className="flex flex-col items-center gap-4">
                <div className="w-96 bg-[#d9f7be] py-3 text-center rounded-lg text-xl">
                  AWESOME
                </div>
                <div className="w-96 bg-[#fffbe6] p-6 text-center rounded-lg text-xl flex items-center justify-center gap-2">
                  {mixedFraction.whole} wholes = 
                  <div className="flex flex-col items-center">
                    <span>{totalPieces}</span>
                    <div className="h-[2px] w-5 bg-black"></div>
                    <span>{mixedFraction.denominator}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Next step button */}
        {showAwesome && showStepButton && (

          <div ref={stepButtonRef} className="mt-8 flex justify-center pb-8">
            <div className="relative w-[180px] h-[90px]">
            <div className="absolute -bottom-2 -left-2 w-full h-full bg-black"></div>
            <div className="absolute -bottom-2 -left-2 w-full h-full bg-black opacity-60"></div>

              <button 
                onClick={onComplete}
                className="relative w-full h-full border-[10px] border-[#FF497C] bg-white flex items-center justify-center"
              >

                <span className="text-[#FF497C] text-[32px] tracking-wide">STEP 4 &gt;&gt;</span>

              </button>
            </div>
          </div>
        )}
      </GameLayout>
    </div>
  )
}

export default Step3