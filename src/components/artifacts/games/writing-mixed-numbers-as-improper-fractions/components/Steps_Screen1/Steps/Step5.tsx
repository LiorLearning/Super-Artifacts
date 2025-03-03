import React, { useState, useRef, useEffect } from "react"
import type { MixedFraction } from "../../../game-state"
import Level from "../level"
import SuccessAnimation from '@/components/artifacts/utils/success-animate';
import { soundFiles } from '../../../utils/sound'

interface Step5Props {
  mixedFraction: MixedFraction
  onComplete: () => void
  sendAdminMessage: (role: string, content: string, onComplete?: () => void) => void
  updateStep: (step: number) => void
  navigateToScreen2: () => void
}

const Step5: React.FC<Step5Props> = ({ mixedFraction, onComplete, sendAdminMessage, updateStep, navigateToScreen2 }) => {
  const [numeratorInput, setNumeratorInput] = useState("")
  const [denominatorInput, setDenominatorInput] = useState("")
  const [showFinal, setShowFinal] = useState(false)
  const [isNumeratorCorrect, setIsNumeratorCorrect] = useState(false)
  const [numeratorIsCorrect, setNumeratorIsCorrect] = useState(false)
  const [numeratorIsWrong, setNumeratorIsWrong] = useState(false)
  const [denominatorIsCorrect, setDenominatorIsCorrect] = useState(false)
  const [denominatorIsWrong, setDenominatorIsWrong] = useState(false)
  const [errorCount, setErrorCount] = useState(0)
  const countMessageShown = useRef(false)
  const numeratorMessageShown = useRef(false)

  const messageShown = useRef(false)

  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    if (!messageShown.current) {
      messageShown.current = true;
      sendAdminMessage("agent", "3 wholes is now 12/4, let's add 2/4 to complete the fraction!")
    }
  }, [sendAdminMessage])

  const handleNumeratorInput = (value: string) => {
    setNumeratorInput(value)
    
    if (value === '') {
      setNumeratorIsCorrect(false)
      setNumeratorIsWrong(false)
      return
    }

    const correctNumerator = (mixedFraction.whole * mixedFraction.denominator + mixedFraction.numerator).toString()
    
    if (value.length >= correctNumerator.length) {
      if (value === correctNumerator) {
        setNumeratorIsCorrect(true)
        setNumeratorIsWrong(false)
        setIsNumeratorCorrect(true)
        // Add success message for correct numerator
        sendAdminMessage("agent", "Great! Now enter the denominator to complete the fraction.")
      } else {
        setNumeratorIsWrong(true)
        setNumeratorIsCorrect(false)
        setErrorCount(prev => {
          const newCount = prev + 1
          if (newCount === 1 && !numeratorMessageShown.current) {
            numeratorMessageShown.current = true
            sendAdminMessage("admin", `User answered incorrectly for the numerator pie, correct answer is ${correctNumerator}, but user answered ${value} . Diagnose socratically.`)
          } else if (newCount === 2 && !countMessageShown.current) {
            countMessageShown.current = true
            sendAdminMessage("admin", `User answered incorrectly for the denominator pie, correct answer is ${correctNumerator}, but user answered ${value} . Diagnose socratically.`)
          }
          return newCount
        })
      }
    }
  }

  const handleDenominatorInput = (value: string) => {
    if (!/^\d*$/.test(value)) return;
    
    setDenominatorInput(value)
    
    if (value === '') {
      setDenominatorIsCorrect(false)
      setDenominatorIsWrong(false)
      return
    }

    if (value.length >= mixedFraction.denominator.toString().length) {
      if (value === mixedFraction.denominator.toString()) {
        setDenominatorIsCorrect(true)
        setDenominatorIsWrong(false)
        if (isNumeratorCorrect) {
          setShowSuccess(true)
          const audio = new Audio(soundFiles.LevelComplete)
          audio.play()
          sendAdminMessage("agent", "Awesome, you have converted the mixed number to an improper fraction.", () => {
            setShowFinal(true)
            setTimeout(() => {
              setShowSuccess(false)
              sendAdminMessage("agent", "What to do next? Learn a quick way to solve this, or maybe do this again?")
            }, 1000)
          })
        }
      } else {
        setDenominatorIsWrong(true)
        setDenominatorIsCorrect(false)
        setErrorCount(prev => {
          const newCount = prev + 1
          if (newCount === 1) {
            sendAdminMessage("admin", `User answered incorrectly for the denominator pie, correct answer is ${mixedFraction.denominator}, but user answered ${value} . Diagnose socratically.`)
          } else if (newCount === 2 && !countMessageShown.current) {
            countMessageShown.current = true
            sendAdminMessage("agent", "Let's count the pieces one by one. Click each quarter to count them all.")
          }
          return newCount
        })
      }

    }
  }

  const renderSliceLines = () => (
    <>
      <line x1="50" y1="50" x2="50" y2="2" stroke="black" strokeWidth="0.5"/>
      <line x1="50" y1="50" x2="98" y2="50" stroke="black" strokeWidth="0.5"/>
      <line x1="50" y1="50" x2="50" y2="98" stroke="black" strokeWidth="0.5"/>
      <line x1="50" y1="50" x2="2" y2="50" stroke="black" strokeWidth="0.5"/>
    </>
  )

  const renderColoredQuarters = () => {

    return [...Array(4)].map((_, i) => {

      const startAngle = i * 90
      const endAngle = (i + 1) * 90
      const radius = 48

      return (
        <path
          key={`colored-quarter-${i}`}
          d={`
            M 50 50
            L ${50 + radius * Math.cos(startAngle * Math.PI / 180)} ${50 + radius * Math.sin(startAngle * Math.PI / 180)}
            A ${radius} ${radius} 0 0 1 ${50 + radius * Math.cos(endAngle * Math.PI / 180)} ${50 + radius * Math.sin(endAngle * Math.PI / 180)}
            Z
          `}

          fill={i < 2 ? "#98D400" : "white"}

          stroke="black"
          strokeWidth="0.5"
        />
      )
    })
  }

  return (
    <div className={showSuccess ? 'pointer-events-none relative' : ''}>
      <div className="w-full min-h-screen bg-pink-50 pt-4">
        <Level mixedFraction={mixedFraction} />

        {!showFinal ? (
          <div className="w-full">
            <div className="bg-white w-full max-w-4xl mx-auto min-h-[300px] border-2 border-gray-400">
              <div className="flex justify-center items-center gap-8 py-16">
                {[...Array(mixedFraction.whole + 1)].map((_, index) => (
                  <div key={`whole-${index}`} className="w-28 h-28">
                    <svg viewBox="0 0 100 100" className="w-full h-full">

                      <circle 
                        cx="50" 
                        cy="50" 
                        r="48" 
                        fill={index === mixedFraction.whole ? "white" : "#98D400"}
                        stroke="black" 
                        strokeWidth="0.5"
                      />

                      {renderSliceLines()}
                      {index === mixedFraction.whole && renderColoredQuarters()}
                    </svg>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full max-w-4xl mx-auto mt-6">
              <div className="flex items-center justify-center gap-5 text-5xl py-8 bg-white">
                <div className="flex items-center">
                  {mixedFraction.whole}
                  <div className="flex flex-col mx-2 justify-center items-center">
                    <span className="border-b-2 border-black">{mixedFraction.numerator}</span>
                    <span>{mixedFraction.denominator}</span>
                  </div>
                </div>

                <span className="mx-4">=</span>

                <div className="flex flex-col justify-center items-center">
                  <span className="border-b-2 border-black text-[#009C43]">12</span>
                  <span className="text-[#009C43]">4</span>
                </div>

                <span className="mx-4">+</span>

                <div className="flex flex-col justify-center items-center">
                  <span className="border-b-2 border-black">{mixedFraction.numerator}</span>
                  <span>{mixedFraction.denominator}</span>
                </div>

                <span className="mx-4">=</span>

                <div className="flex flex-col justify-center items-center gap-4">
                  <div className="relative">
                    <div className="absolute -bottom-1 -left-1 w-full h-full bg-black rounded-lg"></div>
                    <div className="absolute -bottom-1 -left-1 w-full h-full bg-black opacity-60 rounded-lg"></div>
                    <input
                      type="text"
                      value={numeratorInput}
                      onChange={(e) => handleNumeratorInput(e.target.value)}
                      className={`relative w-16 h-16 border-2 border-black rounded-lg text-center text-4xl
                        ${numeratorIsCorrect ? 'bg-green-100' : ''}
                        ${numeratorIsWrong ? 'bg-red-100' : ''}
                      `}
                      placeholder="?"
                    />
                  </div>
                  <div className="relative">
                    {isNumeratorCorrect && (
                      <>
                        <div className="absolute -bottom-1 -left-1 w-full h-full bg-black rounded-lg"></div>
                        <div className="absolute -bottom-1 -left-1 w-full h-full bg-black opacity-60 rounded-lg"></div>
                      </>
                    )}
                    <input
                      type="text"
                      value={denominatorInput}
                      onChange={(e) => handleDenominatorInput(e.target.value)}
                      className={`relative w-16 h-16 border-2 border-black rounded-lg text-center text-4xl
                        ${denominatorIsCorrect ? 'bg-green-100' : ''}
                        ${denominatorIsWrong ? 'bg-red-100' : ''}
                      `}
                      placeholder="?"
                      disabled={!isNumeratorCorrect}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full">
            <div className="bg-white w-full max-w-4xl mx-auto min-h-[300px] border-2 border-gray-400">
              <div className="flex justify-center items-center gap-8 py-16">
                {[...Array(mixedFraction.whole + 1)].map((_, index) => (
                  <div key={`whole-${index}`} className="w-28 h-28">
                    <svg viewBox="0 0 100 100" className="w-full h-full">

                      <circle 
                        cx="50" 
                        cy="50" 
                        r="48" 
                        fill={index === mixedFraction.whole ? "white" : "#98D400"}
                        stroke="black" 
                        strokeWidth="0.5"
                      />

                      {renderSliceLines()}
                      {index === mixedFraction.whole && renderColoredQuarters()}
                    </svg>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full max-w-4xl mx-auto mt-6 flex justify-center">
              <div className="bg-white border-4 border-[#FF497C] rounded-3xl p-6">
                <div className="flex items-center justify-center gap-5 text-5xl">
                  <div className="flex items-center">
                    {mixedFraction.whole}
                    <div className="flex flex-col mx-2 justify-center items-center">
                      <span className="border-b-2 border-black">{mixedFraction.numerator}</span>
                      <span>{mixedFraction.denominator}</span>
                    </div>
                  </div>
                  <span className="mx-4">=</span>
                  <div className="flex flex-col justify-center items-center">
                    <span className="border-b-2 border-black text-[#FF497C]">{numeratorInput}</span>
                    <span className="text-[#FF497C]">{denominatorInput}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center text-2xl mt-8 mb-8">
              What's your next step?
            </div>

            <div className="flex justify-center gap-8">
              <button 
                onClick={() => navigateToScreen2()}
                className="relative bg-black rounded-full"
              >
                <div className="relative bg-white border-2 border-[#FF497C] rounded-full px-8 py-3 -translate-x-1 -translate-y-1">
                  <span className="text-[#FF497C] text-xl font-medium">Learn a Hack!</span>
                </div>
              </button>
              <button 
                onClick={() => updateStep(0)}
                className="relative bg-black rounded-full"
              >
                <div className="relative bg-white border-2 border-[#FF497C] rounded-full px-8 py-3 -translate-x-1 -translate-y-1">
                  <span className="text-[#FF497C] text-xl font-medium">Try this Again...</span>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>

      {showSuccess && (
        <div className="fixed inset-0 z-50">
          <SuccessAnimation />
        </div>
      )}
    </div>
  )
}

export default Step5 