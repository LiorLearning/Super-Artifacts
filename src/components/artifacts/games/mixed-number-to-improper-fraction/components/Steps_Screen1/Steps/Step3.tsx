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


const Step3: React.FC<Step3Props> = ({ mixedFraction, onComplete, sendAdminMessage }) => {
  const [showOptions, setShowOptions] = useState(false)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [clickedPieStates, setClickedPieStates] = useState<boolean[]>(Array(mixedFraction.whole).fill(false))
  const [allPiesClicked, setAllPiesClicked] = useState(false)
  const [isCorrectOption, setIsCorrectOption] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [inputValue, setInputValue] = useState("")
  const [showHelpButton, setShowHelpButton] = useState(false)
  const [showSlicer, setShowSlicer] = useState(false)
  const [showErrorBox, setShowErrorBox] = useState(false)
  const [showSecondBox, setShowSecondBox] = useState(false)
  const messageShown = useRef(false)
  const secondMessageShown = useRef(false)
  const slicerMessageShown = useRef(false)
  const wrongSelectionMessageShown = useRef(false)
  const [numeratorInput, setNumeratorInput] = useState("")
  const [numeratorIsCorrect, setNumeratorIsCorrect] = useState(false)
  const [numeratorIsWrong, setNumeratorIsWrong] = useState(false)
  const [errorCount, setErrorCount] = useState(0)

  const handleSlicerClick = () => {
    setShowOptions(prev => !prev)
  }

  const handleOptionClick = (value: number) => {
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
      
      const allClicked = newStates.every(state => state)
      setAllPiesClicked(allClicked)
      
      return newStates
    })
  }

  const handleInputChange = (value: string) => {
    if (!/^\d*$/.test(value)) return;
    
    setInputValue(value)
    const correctAnswer = (mixedFraction.whole * mixedFraction.denominator).toString()
    
    if (value.length >= correctAnswer.length) {
      if (value === correctAnswer) {
        onComplete()
      } else {
        sendAdminMessage("agent", "Looks like you need some help.", () => {
          setShowHelpButton(true)
        })
      }
    }
  }

  const handleHelpClick = () => {
    setShowSlicer(true)
    if (!slicerMessageShown.current) {
      slicerMessageShown.current = true;
      sendAdminMessage("agent", "Use this slicer to divide each whole into equal number of pieces.")
    }
  }

  const handleNumeratorInput = (value: string) => {
    setNumeratorInput(value)
    if (value === '') {
      setNumeratorIsCorrect(false)
      setNumeratorIsWrong(false)
      return
    }

    const expectedValue = mixedFraction.whole * mixedFraction.denominator
    if (value === expectedValue.toString()) {
      setNumeratorIsCorrect(true)
      setNumeratorIsWrong(false)
      onComplete()
    } else if (value.length >= expectedValue.toString().length) {
      setNumeratorIsWrong(true)
      setNumeratorIsCorrect(false)
      setErrorCount(prev => {
        const newCount = prev + 1
        if (newCount === 2) {
          setShowHelpButton(true)
        }
        return newCount
      })
      sendAdminMessage("admin", `Answer is ${expectedValue}, diagnose wrt user's current game state and help the user to get the correct answer`)
    }
  }

  useEffect(() => {
    if (allPiesClicked && selectedOption) {
      if (selectedOption === mixedFraction.denominator) {
        onComplete()
      } else {
        setShowErrorBox(true)
      }
    }
  }, [allPiesClicked, selectedOption, mixedFraction.denominator, onComplete])

  useEffect(() => {
    if (!messageShown.current) {
      messageShown.current = true;
      sendAdminMessage("agent", "Great, so 3 2/4 is nothing but 3 plus 2/4", () => {
        setShowSecondBox(true)
      })
    }
  }, [sendAdminMessage])

  useEffect(() => {
    if (showSecondBox && !secondMessageShown.current) {
      secondMessageShown.current = true;
      sendAdminMessage("agent", "Look at the pies and tell how many quarters make up 3 wholes?", () => {
        setShowHelpButton(true)
      })
    }
  }, [showSecondBox, sendAdminMessage])

  useEffect(() => {
    if (allPiesClicked && 
        selectedOption && 
        selectedOption !== mixedFraction.denominator && 
        !wrongSelectionMessageShown.current) {
      wrongSelectionMessageShown.current = true;
      sendAdminMessage("agent", "Not quite. Think about it, how many slices are needed to match the fraction pie?")
    }
  }, [allPiesClicked, selectedOption, mixedFraction.denominator, sendAdminMessage])

  useEffect(() => {
    wrongSelectionMessageShown.current = false;
  }, [selectedOption])

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

        {showSlicer && (
          <div className="relative flex flex-col items-center mt-4 mb-4">
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
        )}

        <div className="w-full max-w-4xl mx-auto mt-6">
          <div className={`py-8 ${allPiesClicked && selectedOption ? 'bg-[#FFB9B9]' : 'bg-white'}`}>
            <div className="flex items-center justify-center gap-2 text-5xl">
              {/* Mixed fraction part */}
              <div className="flex items-center">
                <span>{mixedFraction.whole}</span>
                <div className="flex flex-col mx-2 justify-center items-center">
                  <span className="border-b-2 border-black">{mixedFraction.numerator}</span>
                  <span>{mixedFraction.denominator}</span>
                </div>
              </div>
              
              <span className="mx-4">=</span>
              
              {/* Whole number or selected option part */}
              {allPiesClicked && selectedOption ? (
                <div className="flex flex-col justify-center items-center">
                  <span className="border-b-2 border-black w-10">&nbsp;</span>
                  <span className="text-red-500">{selectedOption}</span>
                </div>
              ) : (
                <span className="text-[#009C43]">{mixedFraction.whole}</span>
              )}
              
              <span className="mx-4">+</span>
              
              {/* Last fraction part */}
              <div className="flex flex-col justify-center items-center">
                <span className="border-b-2 border-black">{mixedFraction.numerator}</span>
                <span>{mixedFraction.denominator}</span>
              </div>
            </div>
          </div>
        </div>

        {showSecondBox && (
          <div className="w-full max-w-4xl mx-auto mt-6">
            <div className="bg-white py-8">
              <div className="flex items-center justify-center gap-4 text-5xl">
                <span>{mixedFraction.whole} wholes = </span>
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <div className="absolute -bottom-1 -left-1 w-full h-full bg-black rounded-lg"></div>
                    <div className="absolute -bottom-1 -left-1 w-full h-full bg-black opacity-60 rounded-lg"></div>
                    <input
                      type="text"
                      value={numeratorInput}
                      onChange={(e) => handleNumeratorInput(e.target.value)}
                      className={`relative w-20 h-20 border-2 border-gray-300 rounded-lg text-center text-5xl
                        ${numeratorIsCorrect ? 'bg-green-100' : ''}
                        ${numeratorIsWrong ? 'bg-red-100' : ''}
                      `}
                    />
                  </div>
                  <div className="h-[2px] w-full bg-black mt-2"></div>
                  <span className="text-5xl">{mixedFraction.denominator}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {showHelpButton && (
          <div className="w-full flex justify-center pt-8">
            <button 
              className="relative bg-black rounded-xl"
              onClick={handleHelpClick}
            >
              <div className="relative bg-white border-2 border-[#FF497C] rounded-xl px-8 py-3 -translate-x-1 -translate-y-1">
                <span className="text-[#FF497C] text-2xl">Need help!</span>
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};


export default Step3;