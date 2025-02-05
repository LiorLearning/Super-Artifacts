import React from "react"
import type { MixedFraction } from "../../game-state"
import Level from "./level"

interface GameLayoutProps {
  mixedFraction: MixedFraction
  stepNumber: number
  level: number
  stepTitle: string
  children: React.ReactNode
}

const GameLayout: React.FC<GameLayoutProps> = ({
  mixedFraction,
  stepNumber,
  level,
  stepTitle,
  children
}) => {
  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center">
      <div className="w-full mx-auto pt-12">
        {/* Level component */}
        <div className="mb-14">
          <Level mixedFraction={mixedFraction} stepNumber={stepNumber} />
        </div>

        <div className="w-[793px] mx-auto flex items-center gap-6">
          {/* Step box */}
          <div className="bg-white h-[98px] w-[150px] border-[5px] rounded-xl flex items-center justify-center"
            style={{ borderColor: "#FF497C" }}>
            <span className="text-[35px] tracking-wide">Step {stepNumber}</span>
          </div>

          {/* Title box */}
          <div className="text-white rounded-xl flex-1 h-[98px] flex items-center justify-center"
            style={{ backgroundColor: "#FF497C" }}>
            <span className="text-[35px] tracking-wide font-normal">
              {stepTitle}
            </span>
          </div>
        </div>

        <div className="w-[793px] mx-auto border-b border-gray-300 my-8"></div>

        <div className="w-[793px] mx-auto">
          {children}
        </div>
      </div>
    </div>
  )
}

export default GameLayout