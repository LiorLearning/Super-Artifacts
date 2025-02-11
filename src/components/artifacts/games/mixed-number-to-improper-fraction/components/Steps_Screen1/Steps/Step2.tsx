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
  const containerRef = useRef<HTMLDivElement>(null)
  const messageShown = useRef(false)


  const handleWholeInput = (value: string) => {
    setWholeInput(value)
    if (value === mixedFraction.whole.toString()) {
      setCanEnterNumerator(true)
      sendAdminMessage("agent", "Great! Now enter the numerator")
    } else if (value.length >= mixedFraction.whole.toString().length && value !== mixedFraction.whole.toString()) {
      sendAdminMessage("agent", "Answer is " + mixedFraction.whole)
    }
  }


  const handleNumeratorInput = (value: string) => {
    setNumeratorInput(value)
    if (value === mixedFraction.numerator.toString()) {
      setCanEnterDenominator(true)
    } else if (value.length >= mixedFraction.numerator.toString().length && value !== mixedFraction.numerator.toString()) {
      sendAdminMessage("agent", "Answer is " + mixedFraction.numerator)
    }
  }

  const handleDenominatorInput = (value: string) => {
    setDenominatorInput(value)
    if (value === mixedFraction.denominator.toString()) {
      onComplete();
    } else if (value.length >= mixedFraction.denominator.toString().length && value !== mixedFraction.denominator.toString()) {
      sendAdminMessage("agent", "Answer is " + mixedFraction.denominator)
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
              className="relative w-20 h-20 border-2 border-gray-300 rounded-lg text-center text-5xl"
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
                className={`relative w-20 h-20 border-2 border-gray-300 rounded-lg text-center text-5xl ${
                  !canEnterNumerator ? 'bg-gray-100' : ''
                }`}
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
                className={`relative w-20 h-20 border-2 border-gray-300 rounded-lg text-center text-3xl ${
                  !canEnterDenominator ? 'bg-gray-100' : ''
                }`}
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