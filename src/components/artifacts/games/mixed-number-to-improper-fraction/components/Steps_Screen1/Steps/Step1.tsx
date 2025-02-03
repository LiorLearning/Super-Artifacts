import type React from "react"
import { useState, useEffect, useRef } from "react"
import type { MixedFraction } from "../../../game-state"
import GameLayout from "../GameLayout"

interface Step1Props {
  mixedFraction: MixedFraction
  onComplete: () => void
  sendAdminMessage: (role: string, content: string, onComplete?: () => void) => void
}

const Step1: React.FC<Step1Props> = ({ mixedFraction, onComplete, sendAdminMessage }) => {
  const [wholes, setWholes] = useState<number | null>(null)
  const [fraction, setFraction] = useState<{ numerator: number; denominator: number } | null>(null)
  const [isDragging, setIsDragging] = useState<"whole" | "fraction" | null>(null)
  const [showStepButton, setShowStepButton] = useState(false)
  const messageShown = useRef(false)

  useEffect(() => {
    if (!messageShown.current) {
      // Initial instruction when step loads
      sendAdminMessage(
        "agent",
        "Can you drag and drop the numbers in the matching colour blocks below"
      )
      messageShown.current = true
    }
  }, [])

  const handleDragStart = (type: "whole" | "fraction", e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("type", type)
    setIsDragging(type)
    
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
      sendAdminMessage(
        "agent",
        "Great! You've placed the whole number correctly"
      )
    } else if (type === "fraction" && zone === "fraction") {
      setFraction({
        numerator: mixedFraction.numerator,
        denominator: mixedFraction.denominator,
      })
      sendAdminMessage(
        "agent",
        `Correct! ${mixedFraction.whole} ${mixedFraction.numerator}/${mixedFraction.denominator}ths is a sum of ${mixedFraction.whole} wholes and ${mixedFraction.numerator}/${mixedFraction.denominator}ths. Now let's change ${mixedFraction.whole} wholes to fraction, so that we can add these two easily`,
        () => {
          setShowStepButton(true)
          setTimeout(() => {
            sendAdminMessage(
              "agent",
              "Click on Step 2 to proceed"
            )
          }, 1000)
        }
      )
    } else {
      sendAdminMessage(
        "agent",
        "oops! the colours don't match, try again!"
      )
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
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2 -mx-4">
          <div className="bg-pink-100 p-4 flex flex-col items-center min-h-[320px]">
            <div className="flex flex-col items-center gap-6">
              {/* Whole number with shadow */}
              <div className="relative">
                {/* Shadow boxes */}
                <div className="absolute -bottom-1 -right-1 w-full h-full bg-black rounded-2xl"></div>
                <div className="absolute -bottom-1 -right-1 w-full h-full bg-black opacity-60 rounded-2xl"></div>
                
                {/* Main draggable box */}
                <div
                  draggable
                  onDragStart={(e) => handleDragStart("whole", e)}
                  onDragEnd={handleDragEnd}
                  className={`w-20 h-20 bg-white rounded-2xl flex items-center justify-center cursor-move relative
                    ${isDragging === "whole" ? "opacity-50 scale-95" : ""} 
                    transition-all duration-200`}
                >
                  <span className="text-green-500 text-5xl font-bold">{mixedFraction.whole}</span>
                  <span className="absolute bottom-1 right-2 text-lg">+</span>
                </div>
              </div>

              {/* Fraction with shadow */}
              <div className="relative">
                {/* Shadow boxes */}
                <div className="absolute -bottom-1 -right-1 w-full h-full bg-black rounded-2xl"></div>
                <div className="absolute -bottom-1 -right-1 w-full h-full bg-black opacity-60 rounded-2xl"></div>
                
                {/* Main draggable box */}
                <div
                  draggable
                  onDragStart={(e) => handleDragStart("fraction", e)}
                  onDragEnd={handleDragEnd}
                  className={`flex flex-col items-center bg-white rounded-2xl p-4 cursor-move relative
                    ${isDragging === "fraction" ? "opacity-50 scale-95" : ""}
                    transition-all duration-200`}
                >
                  <span className="text-3xl text-purple-500 font-bold">{mixedFraction.numerator}</span>
                  <div className="w-8 h-0.5 bg-black my-1"></div>
                  <span className="text-3xl text-purple-500 font-bold">{mixedFraction.denominator}</span>
                  <span className="absolute bottom-1 right-2 text-lg">+</span>
                </div>
              </div>
            </div>
            <span className="text-[#FF497C] mt-4 text-lg">pick from here</span>
          </div>

          <div className="bg-white p-4 min-h-[320px]">
            {/* Drop zones with shadow effect */}
            <div className="relative">
              {/* Black shadow box */}
              <div className="absolute -right-1 -bottom-1 w-full h-full bg-black opacity-20 rounded-2xl"></div>
              
              {/* Main drop zones */}
              <div className="flex flex-col gap-4 relative">
                {/* Wholes drop zone */}
                <div
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop("whole", e)}
                  className={`border-2 ${isDragging === "whole" ? "border-green-600 bg-green-50" : "border-green-400"} 
                    rounded-2xl p-4 min-h-[100px] transition-colors duration-200 bg-white`}
                >
                  <h4 className="text-green-500 font-medium tracking-widest mb-2 text-lg">WHOLES</h4>
                  {wholes !== null && <div className="text-4xl text-center text-green-500 font-bold">{wholes}</div>}
                </div>

                {/* Fraction drop zone */}
                <div
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop("fraction", e)}
                  className={`border-2 ${isDragging === "fraction" ? "border-purple-600 bg-purple-50" : "border-purple-400"}
                    rounded-2xl p-4 min-h-[100px] transition-colors duration-200 bg-white`}
                >
                  <h4 className="text-purple-500 font-medium tracking-widest mb-2 text-lg">FRACTION</h4>
                  {fraction && (
                    <div className="flex flex-col items-center">
                      <span className="text-3xl text-purple-500 font-bold">{fraction.numerator}</span>
                      <div className="w-8 h-0.5 bg-black my-1"></div>
                      <span className="text-3xl text-purple-500 font-bold">{fraction.denominator}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <span className="text-[#FF497C] mt-4 block text-center text-lg">drop here</span>
          </div>
        </div>

        {/* Complete state */}
        {isComplete && showStepButton && (
          <div className="mt-8 flex flex-col items-center gap-6 pb-8">
            <div className="bg-white px-8 py-4 rounded-xl">
              <div className="text-3xl text-[#FF497C] text-center tracking-wide flex items-center justify-center gap-4">
                {mixedFraction.whole}
                <div className="flex flex-col items-center">
                  <span className="text-[#FF497C]">{mixedFraction.numerator}</span>
                  <div className="w-6 h-0.5 bg-[#FF497C]"></div>
                  <span className="text-[#FF497C]">{mixedFraction.denominator}</span>
                </div>
                = <span className="text-green-600">{mixedFraction.whole} wholes</span> +
                <div className="flex flex-col items-center ">
                  <span className="text-[#FF497C]">{mixedFraction.numerator}</span>
                  <div className="w-6 h-0.5 bg-[#FF497C]"></div>
                  <span className="text-[#FF497C]">{mixedFraction.denominator}</span>
                </div>
              </div>
            </div>
            <div className="relative w-[180px] h-[90px]">

              <div className="absolute -bottom-2 left-2 w-full h-full bg-black"></div>
              <div className="absolute -bottom-2 left-2 w-full h-full bg-black opacity-60"></div>
              
              {/* Main button */}
              <button 
                onClick={onComplete}
                className="relative w-full h-full border-[10px] border-[#FF497C] bg-white flex items-center justify-center"
              >
                <span className="text-[#FF497C] text-[32px] tracking-wide font-bold">STEP 2 &gt;&gt;</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </GameLayout>
  )
}

export default Step1

