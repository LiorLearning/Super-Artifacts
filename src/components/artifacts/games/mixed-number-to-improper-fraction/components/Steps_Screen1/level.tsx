import React from "react"
import { MixedFraction } from "../../game-state"

interface LevelProps {
  mixedFraction: MixedFraction
  stepNumber?: number
}

const Level: React.FC<LevelProps> = ({ mixedFraction, stepNumber = 1 }) => {
  const renderEquation = () => {
    if (stepNumber === 1) {
      return (
        <div className="flex items-center gap-3">
          <span>{mixedFraction.whole}</span>
          <div className="flex flex-col items-center">
            <span>{mixedFraction.numerator}</span>
            <div className="w-4 h-[1.5px] bg-black"></div>
            <span>{mixedFraction.denominator}</span>
          </div>
          <span>=</span>
          <div className="flex flex-col items-center">
            <span>?</span>
            <div className="w-3 h-[1.5px] bg-black"></div>
            <span>?</span>
          </div>
        </div>
      )
    }

    if (stepNumber === 2 || stepNumber === 3) {
      return (
        <div className="flex items-center gap-3">
          <span>{mixedFraction.whole}</span>
          <div className="flex flex-col items-center">
            <span>{mixedFraction.numerator}</span>
            <div className="w-4 h-[1.5px] bg-black"></div>
            <span>{mixedFraction.denominator}</span>
          </div>
          <span>=</span>
          <span>{mixedFraction.whole}</span>
          <span>+</span>
          <div className="flex flex-col items-center">
            <span>{mixedFraction.numerator}</span>
            <div className="w-4 h-[1.5px] bg-black"></div>
            <span>{mixedFraction.denominator}</span>
          </div>
        </div>
      )
    }

    if (stepNumber === 4) {
      return (
        <div className="flex items-center gap-3">
          <span>{mixedFraction.whole}</span>
          <div className="flex flex-col items-center">
            <span>{mixedFraction.numerator}</span>
            <div className="w-4 h-[1.5px] bg-black"></div>
            <span>{mixedFraction.denominator}</span>
          </div>
          <span>=</span>
          <div className="flex flex-col items-center">
            <span>{mixedFraction.denominator * mixedFraction.whole}</span>
            <div className="w-4 h-[1.5px] bg-black"></div>
            <span>{mixedFraction.denominator}</span>
          </div>
          <span>+</span>
          <div className="flex flex-col items-center">
            <span>{mixedFraction.numerator}</span>
            <div className="w-4 h-[1.5px] bg-black"></div>
            <span>{mixedFraction.denominator}</span>
          </div>
        </div>
      )
    }
  }

  const getEmoji = () => {
    switch (stepNumber) {
      case 1:
        return "🤔"
      case 2:
      case 3:
        return "😀"
      case 4:
        return "🤩"
      default:
        return "🤔"
    }
  }

  return (
    <div 
      className="w-[565px] h-[120px] mx-auto flex items-center"
      style={{ backgroundColor: "#FF497C", borderRadius: "16px" }}
    >
      <div className="flex items-center w-full">
        {/* Level indicator */}
        <div className="text-white text-3xl font-bold px-8">
          Level 1
        </div>

        {/* Math problem - center section */}
        <div className="bg-white rounded-xl mx-2 h-[100px] flex-grow flex items-center justify-center">
          <div className="text-4xl font-bold">
            {renderEquation()}
          </div>
        </div>

        {/* Emoji container */}
        <div className="bg-white rounded-xl w-[100px] h-[100px] mr-2 flex items-center justify-center">
          <span className="text-5xl">{getEmoji()}</span>
        </div>
      </div>
    </div>
  )
}

export default Level