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
      <div className="w-full max-w-[600px] mx-auto pt-8 px-4">
        {/* Level component */}
        <div className="mb-14">
          <Level mixedFraction={mixedFraction} stepNumber={stepNumber} />
        </div>

        {/* Step header */}
        <div className="flex items-center gap-5 mb-12">
          <div
            className="bg-white border-[3px] rounded-lg px-8 py-2 text-xl font-medium"
            style={{ borderColor: "#FF497C" }}
          >
            Step {stepNumber}
          </div>
          <div
            className="text-white rounded-lg px-8 py-2 text-xl font-medium"
            style={{ backgroundColor: "#FF497C" }}
          >
            {stepTitle}
          </div>
        </div>

        {/* Divider line */}
        <div className="border-b border-gray-300 mb-12"></div>

        {/* Main content */}
        {children}
      </div>
    </div>
  )
}

export default GameLayout