import React, { useState, useRef, useEffect } from "react"
import type { MixedFraction } from "../../../game-state"
import Level from "../level"
import PieVisualization from "../PieVisualization"
import redSlicer from "../../../../../../../../public/img/red-Slicer.png"
import Image from "next/image"

interface Step3Props {
  mixedFraction: MixedFraction
  onComplete: () => void
  sendAdminMessage: (role: string, content: string, onComplete?: () => void) => void
}

const Step3: React.FC<Step3Props> = ({ mixedFraction, onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [wholeInput, setWholeInput] = useState("")
  const [showHelp, setShowHelp] = useState(false)
  const [showHelpUI, setShowHelpUI] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const timerRef = useRef<NodeJS.Timeout>()
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setShowHelp(true)
    }, 10000)

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])

  const handleWholeInput = (value: string) => {
    setWholeInput(value)
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    
    const correctAnswer = (mixedFraction.whole * mixedFraction.denominator).toString()
    
    if (value.length >= correctAnswer.length) {
      if (value === correctAnswer) {
        setShowHelp(false)
        onComplete()
      } else {
        setShowHelp(true)
      }
    } else {
      setShowHelp(false)
      timerRef.current = setTimeout(() => {
        setShowHelp(true)
      }, 10000)
    }
  }

  const handleHelpClick = () => {
    setShowHelp(false)
    setShowHelpUI(true)
  }

  const handleSlicerClick = () => {
    setShowOptions(prev => !prev)
  }

  const handleOptionClick = (value: number) => {
    setSelectedOption(value)
    setShowOptions(false)
    
    if (value !== mixedFraction.denominator) {
      setIsError(true)
    } else {
      setIsError(false)
    }
  }

  return (
    <div ref={containerRef} className="w-full min-h-screen bg-pink-50 pt-16">
      <Level mixedFraction={mixedFraction} />

      <div className="w-full">
        <PieVisualization mixedFraction={mixedFraction} />
        {showHelpUI && (
          <div className="relative flex flex-col items-center mt-4">
            <button 
              onClick={handleSlicerClick}
              className="relative inline-flex"
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
      </div>

      {showHelpUI ? (
        <div className={`w-full max-w-4xl mx-auto mt-6`}>
          <div className={`flex items-center justify-center gap-5 text-5xl py-8 ${
            isError ? 'bg-[#FFB9B9]' : 
            selectedOption === mixedFraction.denominator ? 'bg-[#C9FFE0]' : 
            'bg-white'
          }`}>
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
                  isError && selectedOption ? 'text-red-500' : 
                  selectedOption === mixedFraction.denominator ? 'text-[#009C43]' :
                  ''
                }>
                  {selectedOption || mixedFraction.denominator}
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
      ) : (
        // Original input UI
        <div className="w-full max-w-4xl mx-auto mt-8">
          <div className="flex items-center justify-center text-5xl py-8 bg-white">
            <div className="flex items-center">
              <span>{mixedFraction.whole} wholes = </span>
              <div className="flex flex-col items-center ml-4">
                <div className="relative mb-2">
                  <div className="absolute -bottom-1 -left-1 w-full h-full bg-black rounded-lg"></div>
                  <div className="absolute -bottom-1 -left-1 w-full h-full bg-black opacity-60 rounded-lg"></div>
                  <input
                    type="text"
                    value={wholeInput}
                    onChange={(e) => handleWholeInput(e.target.value)}
                    className="relative w-16 h-16 border-2 border-gray-300 rounded-lg text-center text-4xl"
                  />
                </div>

                <div className="border-t-2 border-black w-20 text-center">{mixedFraction.denominator}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedOption === mixedFraction.denominator && (
        <div className="w-full max-w-4xl mx-auto mt-8 flex justify-center">
          <button 
            onClick={onComplete}
            className="px-16 py-4 bg-white border-2 border-[#FF497C] text-[#FF497C] text-3xl font-medium rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-[#FF497C] hover:text-white transition-colors"
          >
            Next
          </button>
        </div>
      )}

      {showHelp && (
        <div className="w-full max-w-4xl mx-auto mt-8 flex justify-center">
          <button 
            onClick={handleHelpClick}
            className="px-6 py-2 bg-white border-2 border-[#FF497C] text-[#FF497C] text-2xl rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            Need help!
          </button>
        </div>
      )}
    </div>
  );
};

export default Step3;