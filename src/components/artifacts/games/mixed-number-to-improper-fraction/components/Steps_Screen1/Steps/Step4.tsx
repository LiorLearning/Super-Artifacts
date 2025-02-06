import React, { useState, useRef, useEffect } from "react"
import GameLayout from "../GameLayout"
import type { MixedFraction, GameState } from "../../../game-state"
import { useGameState } from "../../../state-utils"

interface Step4Props {
  mixedFraction: MixedFraction
  sendAdminMessage: (role: string, content: string, onComplete?: () => void) => void
  onComplete: () => void
}

const Step4: React.FC<Step4Props> = ({ mixedFraction, sendAdminMessage, onComplete }) => {
  const { setGameStateRef } = useGameState();
  const [selectedPieces, setSelectedPieces] = useState<Set<string>>(new Set())
  const totalPieces = mixedFraction.whole * mixedFraction.denominator
  const messageShown = useRef(false)
  const [shouldShowSuccess, setShouldShowSuccess] = useState(false)
  const [isAnswerChecked, setIsAnswerChecked] = useState(false)
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false)
  const [showFinalContent, setShowFinalContent] = useState(false)
  const [showDoneButton, setShowDoneButton] = useState(false)
  const [numeratorValue, setNumeratorValue] = useState('')
  const [denominatorValue, setDenominatorValue] = useState('')
  const [canEnterDenominator, setCanEnterDenominator] = useState(false)
  const [isAnswerComplete, setIsAnswerComplete] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null);


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

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, []);

  const handlePieClick = (index: number) => {
    if (showFinalContent) return; 
    
    const newSelectedPieces = new Set(selectedPieces)
    if (newSelectedPieces.has(index.toString())) {
      newSelectedPieces.delete(index.toString())
    } else if (newSelectedPieces.size < mixedFraction.numerator) {
      newSelectedPieces.add(index.toString())
    }
    setSelectedPieces(newSelectedPieces)
    if (newSelectedPieces.size === mixedFraction.numerator) {
      setShouldShowSuccess(true)
      setShowDoneButton(true) 
      setIsAnswerCorrect(true)
    } else {
      setShowDoneButton(false) 
      setIsAnswerCorrect(false)
    }
  }

  const handleSmallDoneClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowFinalContent(true)
    sendAdminMessage(
      "agent",
      "Now add these fractions. First, enter the numerator."
    )
  }

  const handleLearnHackClick = () => {
    setGameStateRef(prevState => ({
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
    }));
    onComplete();
  }

  const handleCheckAnswer = () => {
    setIsAnswerChecked(true)
    if (selectedPieces.size === mixedFraction.numerator) {
      setIsAnswerCorrect(true)
      sendAdminMessage(
        "agent",
        "Perfect! You've selected the right number of pieces.",
        () => {
          setTimeout(() => {
            sendAdminMessage(
              "agent",
              "Click Done to see what happens when we add these fractions!"
            )
          }, 1000)
        }
      )
    } else {
      setIsAnswerCorrect(false)
      sendAdminMessage(
        "agent",
        "That's not quite right. Try selecting a different number of pieces!"
      )
    }
  }

  const handleNumeratorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setNumeratorValue(value)
    
    const expectedValue = totalPieces + mixedFraction.numerator
    const expectedLength = expectedValue.toString().length

    // Only check and show narration if user has typed enough digits
    if (value.length >= expectedLength || value.length > expectedLength) {
      if (parseInt(value) === expectedValue) {
        setCanEnterDenominator(true)
        sendAdminMessage(
          "agent",
          "Perfect! The denominator stays the same. Enter it below."
        )
      } else {
        sendAdminMessage(
          "agent",
          "Not quite. Add the numerators: " + totalPieces + " + " + mixedFraction.numerator
        )
      }
    }
  }

  const handleDenominatorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!canEnterDenominator) {
      sendAdminMessage(
        "agent",
        "First enter the correct numerator above!"
      )
      return
    }

    const value = e.target.value
    setDenominatorValue(value)
    
    const expectedValue = mixedFraction.denominator
    const expectedLength = expectedValue.toString().length

    // Only check and show narration if user has typed enough digits
    if (value.length >= expectedLength || value.length > expectedLength) {
      if (parseInt(value) === expectedValue) {
        setIsAnswerComplete(true)
        sendAdminMessage(
          "agent",
          "You can either learn a quick hack for this or try another example!"
        )
      } else {
        sendAdminMessage(
          "agent",
          "Remember, the denominator stays the same when adding fractions with the same denominator!"
        )
      }

    }
  }

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
    <div ref={containerRef} className="w-full">
      <GameLayout
        mixedFraction={mixedFraction}
        stepNumber={4}
        level={1}
        stepTitle="ADD THE FRACTION"
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#FFD9D9] p-8 rounded-2xl">
            <div className="flex justify-center items-center gap-12">
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

              <div className="flex items-center text-4xl ">
                +
              </div>

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

          {showDoneButton && !showFinalContent && (
            <div className="relative w-[140px] mx-auto mt-6" onClick={(e) => e.stopPropagation()}>
              <div className="absolute -bottom-1 -left-1 w-full h-full bg-black rounded-xl"></div>
              <div className="absolute -bottom-1 -left-1 w-full h-full bg-black opacity-60 rounded-xl"></div>
              <button
                onClick={handleSmallDoneClick}
                className="relative w-full bg-[#FF497C] text-white px-8 py-3 rounded-xl text-xl"
              >
                Done
              </button>

            </div>
          )}
          {showFinalContent && (
            <div className="bg-[#FFD9D9] p-8 rounded-2xl mt-8">
              <div className="flex items-center justify-center gap-10 text-5xl">
                {/* First fraction */}
                <div className="flex flex-col items-center">
                  <span className=" tracking-wider">{totalPieces}</span>
                  <div className="w-12 h-[2px] bg-black my-1"></div>
                  <span className=" tracking-wider">{mixedFraction.denominator}</span>
                </div>

                <span className=" tracking-wider">+</span>

                {/* Second fraction */}

                <div className="flex flex-col items-center">
                  <span className=" tracking-wider">{mixedFraction.numerator}</span>
                  <div className="w-12 h-[2px] bg-black my-1"></div>
                  <span className=" tracking-wider">{mixedFraction.denominator}</span>
                </div>

                <span className=" tracking-wider">=</span>

                {/* Result fraction with input boxes */}
                <div className="flex flex-col items-center gap-2">
                  {/* Numerator input */}
                  <div className="relative w-12 h-12">
                  <div className="absolute -bottom-1 -left-1 w-full h-full bg-black rounded-lg"></div>
                  <div className="absolute -bottom-1 -left-1 w-full h-full bg-black opacity-60 rounded-lg"></div>
                    <input


                      type="text"
                      value={numeratorValue}
                      onChange={handleNumeratorChange}
                      className="relative w-full h-full text-center text-3xl  tracking-wider border-2 border-gray-300 rounded-lg"
                      placeholder="?"
                    />
                  </div>

                  <div className="w-12 h-[2px] bg-black"></div>

                  {/* Denominator input */}
                  <div className="relative w-12 h-12">
                  <div className="absolute -bottom-1 -left-1 w-full h-full bg-black rounded-lg"></div>
                  <div className="absolute -bottom-1 -left-1 w-full h-full bg-black opacity-60 rounded-lg"></div>
                    <input

                      type="text"
                      value={denominatorValue}
                      onChange={handleDenominatorChange}
                      disabled={!canEnterDenominator}
                      className={`relative w-full h-full text-center text-3xl  tracking-wider border-2 border-gray-300 rounded-lg
                        ${!canEnterDenominator ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                      placeholder="?"
                    />

                  </div>
                </div>
              </div>
            </div>
          )}

          {isAnswerComplete && (
            <div className="flex flex-col items-center gap-8 mt-8 pb-12">
              <h3 className="text-2xl font-medium">What's your next step?</h3>
              
              <div className="flex gap-8">
                <div className="relative">
                  <div className="absolute -bottom-1 -left-1 w-full h-full bg-black rounded-xl"></div>
                  <div className="absolute -bottom-1 -left-1 w-full h-full bg-black opacity-60 rounded-xl"></div>
                  <button
                    onClick={handleLearnHackClick}
                    className="relative px-8 py-3 rounded-xl text-xl border-2 border-[#FF497C] text-[#FF497C] bg-white hover:bg-[#FF497C] hover:text-white transition-colors"
                  >
                    Learn a Hack!
                  </button>
                </div>

                <div className="relative">
                  <div className="absolute -bottom-1 -left-1 w-full h-full bg-black rounded-xl"></div>
                  <div className="absolute -bottom-1 -left-1 w-full h-full bg-black opacity-60 rounded-xl"></div>
                  <button
                    onClick={() => {
                      setGameStateRef(prevState => ({
                        ...prevState,
                        screen: 'first',
                        state1: {
                          ...prevState.state1,
                          step: 1
                        }
                      }))
                    }}
                    className="relative px-8 py-3 rounded-xl text-xl border-2 border-[#FF497C] text-[#FF497C] bg-white hover:bg-[#FF497C] hover:text-white transition-colors"
                  >
                    Try this Again...
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </GameLayout>
    </div>

  )
}

export default Step4