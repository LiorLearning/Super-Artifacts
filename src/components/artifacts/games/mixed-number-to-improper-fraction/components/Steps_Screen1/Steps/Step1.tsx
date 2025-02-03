import type React from "react"
import { useState } from "react"
import type { MixedFraction } from "../../../game-state"
import GameLayout from "../GameLayout"

interface Step1Props {
  mixedFraction: MixedFraction
  onComplete: () => void
}

const Step1: React.FC<Step1Props> = ({ mixedFraction, onComplete }) => {
  const [wholes, setWholes] = useState<number | null>(null)
  const [fraction, setFraction] = useState<{ numerator: number; denominator: number } | null>(null)
  const [isDragging, setIsDragging] = useState<"whole" | "fraction" | null>(null)

  const handleDragStart = (type: "whole" | "fraction", e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("type", type)
    setIsDragging(type)
    
    // Create a custom drag image
    const dragElement = e.currentTarget.cloneNode(true) as HTMLDivElement
    dragElement.style.transform = 'rotate(4deg)'
    dragElement.style.opacity = '0.8'
    dragElement.style.position = 'fixed'
    dragElement.style.top = '-1000px'
    document.body.appendChild(dragElement)
    e.dataTransfer.setDragImage(dragElement, 20, 20)
    setTimeout(() => document.body.removeChild(dragElement), 0)
  }

  const handleDragEnd = () => {
    setIsDragging(null)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleDrop = (zone: "whole" | "fraction", e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const type = e.dataTransfer.getData("type")

    if (type === "whole" && zone === "whole") {
      setWholes(mixedFraction.whole)
    } else if (type === "fraction" && zone === "fraction") {
      setFraction({
        numerator: mixedFraction.numerator,
        denominator: mixedFraction.denominator,
      })
    }
  }

  const isComplete = wholes !== null && fraction !== null

  return (
    <GameLayout
      mixedFraction={mixedFraction}
      stepNumber={1}
      level={1}
      stepTitle="Sum of WHOLES & FRACTIONS"
    >

        {/* Main content with background split */}
        <div  className=" min-h-screen grid grid-cols-2 -mx-4">
          {/* Left side - Pink background */}
          <div className="bg-pink-100 p-8 flex flex-col items-center">
            <div className="flex flex-col items-center gap-8">
              {/* Whole number */}
              <div
                draggable
                onDragStart={(e) => handleDragStart("whole", e)}
                onDragEnd={handleDragEnd}
                className={`w-20 h-20 bg-white shadow-lg rounded-2xl flex items-center justify-center text-4xl cursor-move 
                  ${isDragging === "whole" ? "opacity-50 scale-95" : "hover:shadow-xl"} 
                  transition-all duration-200`}
              >
                {mixedFraction.whole}
              </div>

              {/* Fraction */}
              <div
                draggable
                onDragStart={(e) => handleDragStart("fraction", e)}
                onDragEnd={handleDragEnd}
                className={`flex flex-col items-center bg-white shadow-lg rounded-2xl p-4 cursor-move
                  ${isDragging === "fraction" ? "opacity-50 scale-95" : "hover:shadow-xl"}
                  transition-all duration-200`}
              >
                <span className="text-3xl">{mixedFraction.numerator}</span>
                <div className="w-8 h-0.5 bg-black my-1"></div>
                <span className="text-3xl">{mixedFraction.denominator}</span>
              </div>
            </div>
            <span className="text-[#FF497C] mt-8 text-lg">pick from here</span>
          </div>

          {/* Right side - White background */}
          <div className="bg-white p-8">
            <div className="flex flex-col gap-8">
              {/* Wholes drop zone */}
              <div
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop("whole", e)}
                className={`border-2 ${isDragging === "whole" ? "border-green-600 bg-green-50" : "border-green-400"} 
                  rounded-2xl p-6 min-h-[140px] transition-colors duration-200`}
              >
                <h4 className="text-green-500 font-medium tracking-widest mb-4 text-lg">WHOLES</h4>
                {wholes !== null && <div className="text-4xl text-center">{wholes}</div>}
              </div>

              <div className="text-4xl text-center font-bold">+</div>

              {/* Fraction drop zone */}
              <div
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop("fraction", e)}
                className={`border-2 ${isDragging === "fraction" ? "border-purple-600 bg-purple-50" : "border-purple-400"}
                  rounded-2xl p-6 min-h-[140px] transition-colors duration-200`}
              >
                <h4 className="text-purple-500 font-medium tracking-widest mb-4 text-lg">FRACTION</h4>
                {fraction && (
                  <div className="flex flex-col items-center">
                    <span className="text-3xl">{fraction.numerator}</span>
                    <div className="w-8 h-0.5 bg-black my-1"></div>
                    <span className="text-3xl">{fraction.denominator}</span>
                  </div>
                )}
              </div>
            </div>
            <span className="text-[#FF497C] mt-8 block text-center text-lg">drop here</span>
          </div>
        </div>

        {/* Complete state */}
        {isComplete && (
          <div className="mt-12 flex flex-col items-center gap-6">
            <div className="text-3xl text-center tracking-wide flex items-center justify-center gap-4">
              {mixedFraction.whole}
              <div className="flex flex-col items-center">
                <span>{mixedFraction.numerator}</span>
                <div className="w-6 h-0.5 bg-black"></div>
                <span>{mixedFraction.denominator}</span>
              </div>
              = <span className="text-green-600">{mixedFraction.whole} wholes</span> +
              <div className="flex flex-col items-center">
                <span>{mixedFraction.numerator}</span>
                <div className="w-6 h-0.5 bg-black"></div>
                <span>{mixedFraction.denominator}</span>
              </div>
            </div>
            <div className="relative w-[250px]">
          {/* Black shadow boxes */}
          <div className="absolute -bottom-2 -left-2 w-full h-full bg-black"></div>
          <div className="absolute -bottom-2 -left-2 w-full h-full bg-black opacity-60"></div>
          
          {/* Main button */}
          <button 
            onClick={onComplete}
            className="relative w-full border-[12.69px] border-[#FF497C] py-3 bg-white"
          >
            <span className="text-[#FF497C] text-[35px] tracking-wide">STEP 2 &gt;&gt;</span>
          </button>
        </div>
          </div>
        )}
    </GameLayout>
  )
}

export default Step1

