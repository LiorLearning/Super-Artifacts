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
  const [showCompleteState, setShowCompleteState] = useState(false)

  const stepButtonRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!messageShown.current) {
      sendAdminMessage(
        "agent",
        "Can you drag and drop the numbers in the matching colour blocks below"
      )
      messageShown.current = true
    }
  }, [])

  useEffect(() => {
    if (showStepButton && stepButtonRef.current) {
      stepButtonRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [showStepButton]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, []);

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
      if (fraction !== null) {
        setShowCompleteState(true)
        sendAdminMessage(
          "agent",
          `Correct! ${mixedFraction.whole} ${mixedFraction.numerator}/${mixedFraction.denominator}th is a sum of ${mixedFraction.whole} wholes and ${mixedFraction.numerator}/${mixedFraction.denominator}th. Now let's change ${mixedFraction.whole} wholes to fraction, so that we can add these two easily`,
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
          "Great! You've placed the whole number correctly"
        )
      }
    } else if (type === "fraction" && zone === "fraction") {
      setFraction({
        numerator: mixedFraction.numerator,
        denominator: mixedFraction.denominator,
      })
      
      if (wholes !== null) {
        setShowCompleteState(true)
        sendAdminMessage(
          "agent",
          `Correct! ${mixedFraction.whole} ${mixedFraction.numerator}/${mixedFraction.denominator}th is a sum of ${mixedFraction.whole} wholes and ${mixedFraction.numerator}/${mixedFraction.denominator}th. Now let's change ${mixedFraction.whole} wholes to fraction, so that we can add these two easily`,
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
          "Great! You've placed the fraction correctly"
        )
      }
    } else {
      sendAdminMessage(
        "agent",
        "oops! the colours don't match, try again!"
      )
    }
  }

  const isComplete = wholes !== null && fraction !== null

  return (

    <div ref={containerRef} className="w-full">
      <GameLayout
        mixedFraction={mixedFraction}
        stepNumber={1}
        level={1}
        stepTitle="Sum of WHOLES & FRACTIONS"
      >
        <div className="max-w-1xl mx-auto">
          {showCompleteState && (
            <div className="bg-white px-8 py-4 rounded-xl mb-8">
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
          )}

          <div className="grid grid-cols-2 -mx-4 relative">
            <div className="bg-pink-100 p-4 flex flex-col items-center min-h-[320px]">

              <div className="flex items-center justify-center gap-12 mb-8 mt-12">
                <div className="relative">
                <div className="absolute -bottom-1 -left-1 w-full h-full bg-black rounded-2xl"></div>
                <div className="absolute -bottom-1 -left-1 w-full h-full bg-black opacity-60 rounded-2xl"></div>
                  
                  <div
                    draggable
                    onDragStart={(e) => handleDragStart("whole", e)}
                    onDragEnd={handleDragEnd}
                    className={`w-28 h-28 bg-white rounded-2xl flex items-center justify-center cursor-move relative
                      ${isDragging === "whole" ? "opacity-50 scale-95" : ""} 
                      transition-all duration-200`}
                  >
                    <span className="text-green-500 text-7xl">{mixedFraction.whole}</span>
                    <span className="absolute bottom-2 right-3 text-2xl">+</span>
                  </div>
                </div>

                <div className="relative">
                <div className="absolute -bottom-1 -left-1 w-full h-full bg-black rounded-2xl"></div>
                <div className="absolute -bottom-1 -left-1 w-full h-full bg-black opacity-60 rounded-2xl"></div>
                  

                  <div
                    draggable
                    onDragStart={(e) => handleDragStart("fraction", e)}
                    onDragEnd={handleDragEnd}

                    className={`flex flex-col items-center bg-white rounded-2xl p-6 cursor-move relative
                      ${isDragging === "fraction" ? "opacity-50 scale-95" : ""}
                      transition-all duration-200`}
                  >
                    <span className="text-4xl text-purple-500">{mixedFraction.numerator}</span>
                    <div className="w-10 h-0.5 bg-black my-2"></div>
                    <span className="text-4xl text-purple-500">{mixedFraction.denominator}</span>
                    <span className="absolute bottom-2 right-3 text-2xl">+</span>

                  </div>
                </div>
              </div>
              
              <span className="text-[#FF497C] text-3xl mt-10">pick from here</span>
            </div>


            <div className="bg-white p-4 min-h-[320px] flex flex-col justify-center">
              <div className="flex flex-col gap-2">
                <div className="relative">
                <div className="absolute -bottom-1 -left-1 w-full h-full bg-black rounded-2xl"></div>
                <div className="absolute -bottom-1 -left-1 w-full h-full bg-black opacity-60 rounded-2xl"></div>

                  <div
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop("whole", e)}
                    className={`border-2 ${isDragging === "whole" ? "border-green-600 bg-green-50" : "border-green-400"} 

                      rounded-2xl p-6 min-h-[120px] transition-colors duration-200 bg-white relative`}
                  >
                    <h4 className="text-green-500 font-medium tracking-widest mb-2 text-2xl">WHOLES</h4>
                    {wholes !== null && <div className="text-5xl text-center text-green-500">{wholes}</div>}
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="text-black text-5xl">+</div>
                </div>


                <div className="relative">
                <div className="absolute -bottom-1 -left-1 w-full h-full bg-black rounded-2xl"></div>
                <div className="absolute -bottom-1 -left-1 w-full h-full bg-black opacity-60 rounded-2xl"></div>

                  <div
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop("fraction", e)}
                    className={`border-2 ${isDragging === "fraction" ? "border-purple-600 bg-purple-50" : "border-purple-400"}
                      rounded-2xl p-6 min-h-[120px] transition-colors duration-200 bg-white relative`}
                  >
                    <h4 className="text-purple-500 font-medium tracking-widest mb-4 text-2xl">FRACTION</h4>
                    {fraction && (
                      <div className="flex flex-col items-center">
                        <span className="text-4xl text-purple-500">{fraction.numerator}</span>
                        <div className="w-10 h-0.5 bg-black my-2"></div>
                        <span className="text-4xl text-purple-500">{fraction.denominator}</span>

                      </div>
                    )}
                  </div>
                </div>
              </div>
              <span className="text-[#FF497C] mt-8 text-center text-3xl">drop here</span>
            </div>
          </div>

          {isComplete && showStepButton && (
            <div ref={stepButtonRef} className="mt-8 flex flex-col items-center gap-6 pb-8">
              <div className="relative w-[180px] h-[90px]">
                <div className="absolute -bottom-2 -left-2 w-full h-full bg-black"></div>
                <div className="absolute -bottom-2 -left-2 w-full h-full bg-black opacity-60"></div>
                
                <button 
                  onClick={onComplete}
                  disabled={!isComplete || !showStepButton}
                  className={`relative w-full h-full border-[10px] flex items-center justify-center
                    ${isComplete && showStepButton 
                      ? "border-[#FF497C] bg-white cursor-pointer" 
                      : "border-gray-400 bg-gray-100 cursor-not-allowed"
                    }`}
                >
                  <span className={`text-[32px] tracking-wide
                    ${isComplete && showStepButton ? "text-[#FF497C]" : "text-gray-400"}`}
                  >
                    STEP 2 &gt;&gt;
                  </span>
                </button>
              </div>

            </div>
          )}
        </div>
      </GameLayout>
    </div>
  )
}

export default Step1

