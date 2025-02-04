import React, { useState, useEffect, useRef } from "react"
import Image from 'next/image';
import GameLayout from "../GameLayout"
import type { MixedFraction } from "../../../game-state"

interface Step2Props {
  mixedFraction: MixedFraction
  onComplete: () => void
  sendAdminMessage: (role: string, content: string, onComplete?: () => void) => void
}


const Step2: React.FC<Step2Props> = ({ mixedFraction, onComplete, sendAdminMessage }) => {
  const [selectedSlice, setSelectedSlice] = useState(mixedFraction.denominator)
  const [isSliced, setIsSliced] = useState(false)
  const [canSlice, setCanSlice] = useState(false)
  const messageShown = useRef(false)
  const wrongAttempts = useRef(0)
  const [showStepButton, setShowStepButton] = useState(false)
  const stepButtonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!messageShown.current) {
      // First message
      sendAdminMessage(
        "agent",
        `This is what ${mixedFraction.whole} wholes look like. Can you slice them up into 1/${mixedFraction.denominator}th sized pieces?`,
        () => {
          // Send second message after first one completes
          sendAdminMessage(
            "agent",
            "Choose the right slicer to slice them perfectly!",
            () => {
              setCanSlice(true)
            }
          )
        }
      )
      messageShown.current = true
    }
  }, [])

  useEffect(() => {
    if (showStepButton && stepButtonRef.current) {
      stepButtonRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [showStepButton]);

  const slicerOptions = [
    { 
      value: mixedFraction.denominator - 1, 
      text: `Slices the pie in ${mixedFraction.denominator - 1} pieces`, 
      icon: '/img/red-Slicer.png'
    },
    { 
      value: mixedFraction.denominator, 
      text: `Slices the pie in ${mixedFraction.denominator} pieces`, 
      icon: '/img/yellow-Slicer.png'
    },
    { 
      value: mixedFraction.denominator + 1, 
      text: `Slices the pie in ${mixedFraction.denominator + 1} pieces`, 
      icon: '/img/blue-Slicer.png'
    },
  ]

  const handleSlice = () => {
    if (!canSlice) return;
    
    if (selectedSlice === mixedFraction.denominator) {
      setIsSliced(true)
      sendAdminMessage(
        "agent",
        "Perfect! Now we can see how many pieces are in each whole",
        () => {
          setTimeout(() => {
            sendAdminMessage(
              "agent",
              "Click on Step 3 to proceed",
              () => {
                setShowStepButton(true)
              }
            )
          }, 1000)
        }
      )
    } else {
      wrongAttempts.current += 1;
      if (wrongAttempts.current === 1) {
        sendAdminMessage(
          "agent",
          `We have to divide the pie in 1/${mixedFraction.denominator}th piece each`
        )
      } else {
        sendAdminMessage(
          "agent",
          "Choose the slicer to divide in as many pieces as the denominator!"
        )
      }
    }
  }

  const renderSliceLines = (numSlices: number) => {
    const lines = []
    const center = 50
    const radius = 48

    // Generate lines based on number of slices
    for (let i = 0; i < numSlices; i++) {
      const angle = (i * 360) / numSlices
      const radians = (angle * Math.PI) / 180
      const x = center + radius * Math.cos(radians)
      const y = center + radius * Math.sin(radians)

      lines.push(
        <line
          key={i}
          x1={center}
          y1={center}
          x2={x}
          y2={y}
          stroke="black"
          strokeWidth="0.5"
        />
      )
    }

    return lines
  }

  return (
    <GameLayout
      mixedFraction={mixedFraction}
      stepNumber={2}
      level={1}
      stepTitle="Wholes to Fractions"
    >
        {/* Pies container with white background and border lines */}
        <div className="bg-white w-full mb-12">
          <div className="w-full h-px bg-gray-300"></div>
          <div className="p-8">
            <div className="flex justify-center gap-8">
              {[...Array(mixedFraction.whole)].map((_, index) => (
                <div key={index} className="w-28 h-28">
                  <svg 
                    viewBox="0 0 100 100" 
                    className="w-full h-full"
                  >
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="48" 
                      fill="#90EE90" 
                      stroke="black" 
                      strokeWidth="0.5"
                    />
                    {isSliced && renderSliceLines(selectedSlice)}
                  </svg>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full h-px bg-gray-300"></div>
        </div>

        {/* Slicer options */}
        <div className="bg-white rounded-2xl p-8">
          <h3 className="font-bold text-xl mb-8">Choose your slicer</h3>
          <div className="border-2 border-black rounded-lg p-6">
            {/* Container for aligned images and text */}
            <div className="flex gap-6">
              {/* Vertical box for slicer images with divider lines */}
              <div className="border-2 border-black rounded-lg bg-white">
                {slicerOptions.map((option, index) => (
                  <React.Fragment key={option.value}>
                    <div className="p-4">
                      <Image 
                        src={option.icon} 
                        alt="slicer" 
                        width={32} 
                        height={32} 
                        className="w-8 h-8"
                      />
                    </div>
                    {index !== slicerOptions.length - 1 && (
                      <div className="w-full h-[1px] bg-black" />
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Clickable text options aligned with images */}
              <div className="flex flex-col justify-between py-4">
                {slicerOptions.map((option) => (
                  <div
                    key={option.value}
                    className={`cursor-pointer text-lg ${
                      selectedSlice === option.value ? 'text-blue-600 font-medium' : 'text-gray-600'
                    }`}
                    onClick={() => {
                      setSelectedSlice(option.value);
                    }}
                  >
                    {option.text}
                  </div>
                ))}
              </div>
            </div>

            {/* Slice button */}
            <div className="flex justify-end mt-6">
              <button
                onClick={handleSlice}
                className={`bg-[#FF497C] text-white px-12 py-3 rounded-xl text-lg font-medium transition-colors shadow-md
                  ${canSlice ? 'hover:bg-opacity-90' : 'opacity-50 cursor-not-allowed'}`}
              >
                Slice
              </button>
            </div>
          </div>
        </div>

        {isSliced && showStepButton && (
          <div ref={stepButtonRef} className="mt-8 flex justify-center pb-8">
            <div className="relative w-[180px] h-[90px]">
              <div className="absolute -bottom-2 left-2 w-full h-full bg-black"></div>
              <div className="absolute -bottom-2 left-2 w-full h-full bg-black opacity-60"></div>
              <button 
                onClick={onComplete}
                className="relative w-full h-full border-[10px] border-[#FF497C] bg-white flex items-center justify-center"
              >
                <span className="text-[#FF497C] text-[32px] tracking-wide font-bold">STEP 3 &gt;&gt;</span>
              </button>
            </div>
          </div>
        )}
    </GameLayout>
  )
}

export default Step2