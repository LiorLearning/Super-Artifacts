import React, { useState, useEffect, useRef } from "react"
import type { MixedFraction } from "../../../game-state"
import Level from "../level"

interface Step4Props {
  mixedFraction: MixedFraction
  onComplete: () => void
  sendAdminMessage: (role: string, content: string, onComplete?: () => void) => void
}


const Step4: React.FC<Step4Props> = ({ mixedFraction, onComplete, sendAdminMessage }) => {
  const [numeratorInput, setNumeratorInput] = useState("")
  const [isError, setIsError] = useState(false)
  const [errorCount, setErrorCount] = useState(0)
  const [clickedQuarters, setClickedQuarters] = useState(0)
  const [clickedQuarterStates, setClickedQuarterStates] = useState<boolean[][]>(
    Array(mixedFraction.whole).fill([]).map(() => Array(4).fill(false))
  )
  const messageShown = useRef<boolean>(false)
  const [numeratorIsCorrect, setNumeratorIsCorrect] = useState(false)
  const [numeratorIsWrong, setNumeratorIsWrong] = useState(false)
  const countMessageShown = useRef(false)

  useEffect(() => {
    if (!messageShown.current) {
      messageShown.current = true;
      sendAdminMessage("agent", "Observe the pies, and fill in the blank now. How many quarters make up 3 wholes?")
    }
  }, [sendAdminMessage])

  const handleNumeratorInput = (value: string) => {
    setNumeratorInput(value)
    
    if (value === '') {
      setNumeratorIsCorrect(false)
      setNumeratorIsWrong(false)
      return
    }

    const correctAnswer = (mixedFraction.whole * mixedFraction.denominator).toString()

    if (value.length >= correctAnswer.length) {
      if (value === correctAnswer) {
        setNumeratorIsCorrect(true)
        setNumeratorIsWrong(false)
        onComplete()
      } else {
        setNumeratorIsWrong(true)
        setNumeratorIsCorrect(false)
        setErrorCount(prev => {
          const newCount = prev + 1
          if (newCount === 1) {
            sendAdminMessage("admin", `Answer is ${correctAnswer}, diagnose wrt user's current game state and help the user to get the correct answer`)
          } else if (newCount === 2 && !countMessageShown.current) {
            countMessageShown.current = true;
            sendAdminMessage("agent", "Let's count the pieces one by one. Click each quarter to count them all.")
          }
          return newCount
        })
      }
    }
  }

  const handleQuarterClick = (pieIndex: number, quarterIndex: number) => {
    if (errorCount < 2) return
    
    if (clickedQuarterStates[pieIndex][quarterIndex]) return

    setClickedQuarterStates(prev => {
      const newStates = [...prev]
      newStates[pieIndex] = [...newStates[pieIndex]]
      newStates[pieIndex][quarterIndex] = true
      return newStates
    })
    
    const newCount = clickedQuarters + 1
    setClickedQuarters(newCount)
    const newValue = newCount.toString()
    setNumeratorInput(newValue)

    const correctAnswer = (mixedFraction.whole * mixedFraction.denominator).toString()
    if (newValue === correctAnswer) {
      onComplete()

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

  const renderClickableQuarters = (pieIndex: number) => {
    return [...Array(4)].map((_, i) => {
      const startAngle = i * 90
      const endAngle = (i + 1) * 90
      const radius = 48
      const isClicked = clickedQuarterStates[pieIndex][i]

      return (
        <path
          key={`pie-${pieIndex}-quarter-${i}`}
          d={`
            M 50 50
            L ${50 + radius * Math.cos(startAngle * Math.PI / 180)} ${50 + radius * Math.sin(startAngle * Math.PI / 180)}
            A ${radius} ${radius} 0 0 1 ${50 + radius * Math.cos(endAngle * Math.PI / 180)} ${50 + radius * Math.sin(endAngle * Math.PI / 180)}
            Z
          `}

          fill={isClicked ? "#98D400" : "transparent"}
          stroke="black"
          strokeWidth="0.5"
          className="cursor-pointer hover:fill-[#98D400] transition-colors"

          onClick={() => handleQuarterClick(pieIndex, i)}
        />
      )
    })
  }

  return (
    <div className="w-full min-h-screen bg-pink-50 pt-16">
      <Level mixedFraction={mixedFraction} />
      
      <div className="w-full">
        <div className="bg-white w-full max-w-4xl mx-auto min-h-[300px] border-2 border-black relative">
          {errorCount >= 2 && (
            <div className="absolute w-3/4 text-center top-2 left-1/4 -translate-x-1/4">
              <span className="bg-white px-4 text-[#FF497C] text-2xl">
                Click pieces to count
              </span>
            </div>
          )}
          
          <div className="flex justify-center items-center gap-8 py-16">
            {[...Array(mixedFraction.whole)].map((_, index) => (
              <div key={`whole-${index}`} className="w-28 h-28">
                <svg viewBox="0 0 100 100" className="w-full h-full">

                  <circle cx="50" cy="50" r="48" fill="white" stroke="black" strokeWidth="0.5"/>

                  {renderSliceLines()}
                  {errorCount >= 2 && renderClickableQuarters(index)}
                </svg>
              </div>
            ))}
            
            <span className="text-4xl">+</span>

            <div className="w-28 h-28 opacity-50">
              <svg viewBox="0 0 100 100" className="w-full h-full">

                <circle cx="50" cy="50" r="48" fill="white" stroke="black" strokeWidth="0.5"/>

                {renderSliceLines()}
                {[...Array(mixedFraction.numerator)].map((_, i) => {
                  const startAngle = i * (360 / mixedFraction.denominator);
                  const endAngle = (i + 1) * (360 / mixedFraction.denominator);
                  const radius = 48;
                  
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
                  );
                })}
              </svg>
            </div>
          </div>
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

          <div className="flex items-center">
            <div className="flex flex-col mx-2 justify-center items-center">
              <div className="relative mb-2">
                <div className="absolute -bottom-1 -left-1 w-full h-full bg-black rounded-lg"></div>
                <div className="absolute -bottom-1 -left-1 w-full h-full bg-black opacity-60 rounded-lg"></div>
                <input
                  type="text"
                  value={numeratorInput}
                  onChange={(e) => handleNumeratorInput(e.target.value)}
                  className={`relative w-16 h-16 border-2 border-[black] rounded-lg text-center text-4xl
                    ${numeratorIsCorrect ? 'bg-green-100' : ''}
                    ${numeratorIsWrong ? 'bg-red-100' : ''}
                  `}
                  placeholder="?"
                />
              </div>
              <span className="text-[#009C43]">{mixedFraction.denominator}</span>
            </div>
            <span className="mx-4">+</span>
            <div className="flex flex-col mx-2 justify-center items-center">
              <span className="border-b-2 border-black">{mixedFraction.numerator}</span>
              <span>{mixedFraction.denominator}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Step4