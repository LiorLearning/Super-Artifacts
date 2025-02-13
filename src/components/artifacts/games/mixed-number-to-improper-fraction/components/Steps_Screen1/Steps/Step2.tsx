import React, { useState, useRef, useEffect } from "react"
import type { MixedFraction } from "../../../game-state"
import Level from "../level"
import PieVisualization from "../PieVisualization"

interface Step2Props {
  mixedFraction: MixedFraction
  onComplete: () => void
  sendAdminMessage: (role: string, content: string, onComplete?: () => void) => void
}

const Step2: React.FC<Step2Props> = ({ mixedFraction, onComplete, sendAdminMessage }) => {
  const [wholeInput, setWholeInput] = useState("")
  const [numeratorInput, setNumeratorInput] = useState("")
  const [denominatorInput, setDenominatorInput] = useState("")
  const [canEnterNumerator, setCanEnterNumerator] = useState(false)
  const [canEnterDenominator, setCanEnterDenominator] = useState(false)
  const [wholeIsCorrect, setWholeIsCorrect] = useState(false)
  const [wholeIsWrong, setWholeIsWrong] = useState(false)
  const [numeratorIsCorrect, setNumeratorIsCorrect] = useState(false)
  const [numeratorIsWrong, setNumeratorIsWrong] = useState(false)
  const [denominatorIsCorrect, setDenominatorIsCorrect] = useState(false)
  const [denominatorIsWrong, setDenominatorIsWrong] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const messageShown = useRef(false)


  const handleWholeInput = (value: string) => {
    setWholeInput(value)
    if (value === '') {
      setWholeIsCorrect(false)
      setWholeIsWrong(false)
      return
    }
    if (value === mixedFraction.whole.toString()) {
      setWholeIsCorrect(true)
      setWholeIsWrong(false)
      setCanEnterNumerator(true)
      sendAdminMessage("agent", "Great! Now enter the numerator")
    } else if (value.length >= mixedFraction.whole.toString().length) {
      setWholeIsWrong(true)
      setWholeIsCorrect(false)
      sendAdminMessage("admin", `User answered incorrectly for the wholes pie, correct answer is ${mixedFraction.whole} but user answered ${value} . Diagnose socratically.`)

    }
  }


  const handleNumeratorInput = (value: string) => {
    setNumeratorInput(value)
    if (value === '') {
      setNumeratorIsCorrect(false)
      setNumeratorIsWrong(false)
      return
    }
    if (value === mixedFraction.numerator.toString()) {
      setNumeratorIsCorrect(true)
      setNumeratorIsWrong(false)
      setCanEnterDenominator(true)
    } else if (value.length >= mixedFraction.numerator.toString().length && value !== mixedFraction.numerator.toString()) {
      setNumeratorIsWrong(true)
      setNumeratorIsCorrect(false)
      sendAdminMessage("admin",  `User answered incorrectly for the numerator pie, correct answer is ${mixedFraction.numerator}, but user answered ${value} . Diagnose socratically.`)

    }
  }

  const handleDenominatorInput = (value: string) => {
    setDenominatorInput(value)
    if (value === '') {
      setDenominatorIsCorrect(false)
      setDenominatorIsWrong(false)
      return
    }
    if (value === mixedFraction.denominator.toString()) {
      onComplete();
    } else if (value.length >= mixedFraction.denominator.toString().length && value !== mixedFraction.denominator.toString()) {

      setDenominatorIsWrong(true)
      setDenominatorIsCorrect(false)
      sendAdminMessage("admin",  `User answered incorrectly for the denominator pie, correct answer is ${mixedFraction.denominator}, but user answered ${value} . Diagnose socratically.`)

    }
  }

  return (
    <div ref={containerRef} className="w-full min-h-screen bg-pink-50 pt-16">
      <Level mixedFraction={mixedFraction} />

      <PieVisualization mixedFraction={mixedFraction} />

      <div className="w-full max-w-4xl mx-auto mt-8">
        <div className="flex items-center justify-center gap-8 text-5xl">
          <div className="flex items-center">
            {mixedFraction.whole}
            <div className="flex flex-col mx-2 justify-center items-center">
              <span className="border-b-2 border-black">{mixedFraction.numerator}</span>
              <span>{mixedFraction.denominator}</span>
            </div>
            <span className="mx-4">=</span>
          </div>

          <div className="relative">
            <div className="absolute -bottom-1 -left-1 w-full h-full bg-black rounded-lg"></div>
            <div className="absolute -bottom-1 -left-1 w-full h-full bg-black opacity-60 rounded-lg"></div>
            <input
              type="text"
              value={wholeInput}
              onChange={(e) => handleWholeInput(e.target.value)}
              className={`relative w-20 h-20 border-2 border-gray-300 rounded-lg text-center text-5xl
                ${wholeIsCorrect ? 'bg-green-100' : ''}
                ${wholeIsWrong ? 'bg-red-100' : ''}
              `}
            />
          </div>

          <div>Wholes &</div>

          <div className="flex flex-col gap-2">
            <div className="relative">
              <div className="absolute -bottom-1 -left-1 w-full h-full bg-black rounded-lg"></div>
              <div className="absolute -bottom-1 -left-1 w-full h-full bg-black opacity-60 rounded-lg"></div>
              <input
                type="text"
                value={numeratorInput}
                onChange={(e) => handleNumeratorInput(e.target.value)}
                disabled={!canEnterNumerator}
                className={`relative w-20 h-20 border-2 border-gray-300 rounded-lg text-center text-5xl
                  ${!canEnterNumerator ? 'bg-gray-100' : ''}
                  ${numeratorIsCorrect ? 'bg-green-100' : ''}
                  ${numeratorIsWrong ? 'bg-red-100' : ''}
                `}
              />

            </div>
            <div className="relative">
              <div className="absolute -bottom-1 -left-1 w-full h-full bg-black rounded-lg"></div>
              <div className="absolute -bottom-1 -left-1 w-full h-full bg-black opacity-60 rounded-lg"></div>
              <input
                type="text"
                value={denominatorInput}
                onChange={(e) => handleDenominatorInput(e.target.value)}
                disabled={!canEnterDenominator}
                className={`relative w-20 h-20 border-2 border-gray-300 rounded-lg text-center text-5xl
                  ${!canEnterDenominator ? 'bg-gray-100' : ''}
                  ${denominatorIsCorrect ? 'bg-green-100' : ''}
                  ${denominatorIsWrong ? 'bg-red-100' : ''}
                `}
              />
            </div>
          </div>

          <div>Fraction</div>
        </div>
      </div>
    </div>
  );
};


export default Step2;