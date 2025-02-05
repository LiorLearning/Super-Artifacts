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
            <div className="h-[2px] w-5 bg-black"></div>
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
            <div className="h-[2px] w-5 bg-black"></div>
            <span>{mixedFraction.denominator}</span>
          </div>
          <span>=</span>
          <span>{mixedFraction.whole}</span>
          <span>+</span>
          <div className="flex flex-col items-center">
            <span>{mixedFraction.numerator}</span>
            <div className="h-[px] w-5 bg-black"></div>
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
            <div className="h-[2px] w-5 bg-black"></div>
            <span>{mixedFraction.denominator}</span>
          </div>
          <span>=</span>
          <div className="flex flex-col items-center">
            <span>{mixedFraction.denominator * mixedFraction.whole}</span>
            <div className="h-[2px] w-5 bg-black"></div>
            <span>{mixedFraction.denominator}</span>
          </div>
          <span>+</span>
          <div className="flex flex-col items-center">
            <span>{mixedFraction.numerator}</span>
            <div className="h-[2px] w-5 bg-black"></div>
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
    <div className="flex justify-center items-center mt-[20px] mb-[60px]">
      <div className="flex items-center justify-center bg-[#FF497C] rounded-[20px] border-[7px] border-[#FF497C] overflow-hidden relative">
        {/* Level section */}
        <div className="w-[150px] h-[100px] bg-[#FF497C] flex flex-col items-center justify-center text-[45px] font-normal">
          <h2 className="text-white font-normal h-12">Level</h2>
          <h2 className="text-white font-normal">1</h2>
        </div>

        {/* Fraction section */}
        <div className="w-fit pr-44 h-[150px] bg-white flex items-center justify-left text-[45px] px-8 rounded-l-[20px]">
          <div className="flex items-center gap-4">
            {renderEquation()}
          </div>
        </div>

        {/* Emoji section */}
        <div className="w-[152px] h-[164px] border-[7px] border-r-0 border-[#FF497C] rounded-[20px] rounded-r-none bg-white flex items-center justify-center absolute right-0">
          <span className="text-[80px]">{getEmoji()}</span>
        </div>
      </div>
    </div>
  )
}

// Update fraction styles in renderEquation
const fractionStyle = "w-[52px] flex flex-col items-center justify-center text-center";
const lineStyle = "w-full border-b-4 border-black";

export default Level