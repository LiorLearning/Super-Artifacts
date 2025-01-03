'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { PocketKnifeIcon as Knife } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { ChocolateBar } from './components/ChocolateBar'

interface FiveScreenProps {
  onNext: () => void;
  sendAdminMessage: (role: string, content: string) => void;
}

interface PiecesCalculationProps {
  initialPieces: number;
  multiplier: number;
  value: string;
  onChange: (value: string) => void;
}

export default function FiveScreen({ onNext, sendAdminMessage }: FiveScreenProps) {
  const [step1Complete, setStep1Complete] = useState(false)
  const [step2Complete, setStep2Complete] = useState(false)
  const [multiplier2Selected, setMultiplier2Selected] = useState(false)
  const [totalPieces1, setTotalPieces1] = useState('')
  const [multiplier3Selected, setMultiplier3Selected] = useState(false)
  const [totalPieces2, setTotalPieces2] = useState('')
  // Step 2 states
  const [step2Multiplier2Selected, setStep2Multiplier2Selected] = useState(false)
  const [step2TotalPieces1, setStep2TotalPieces1] = useState('')
  const [step2Multiplier3Selected, setStep2Multiplier3Selected] = useState(false)
  const [step2TotalPieces2, setStep2TotalPieces2] = useState('')


  const PiecesCalculation = ({
    initialPieces,
    multiplier,
    value,
    onChange
  }: PiecesCalculationProps) => (
    <div className="flex items-center justify-center gap-2 text-xl font-bold mt-4">
      <span>{initialPieces} pieces split {multiplier === 2 ? 'twice' : 'thrice'} gives {initialPieces}</span>
      <span>X</span>
      <span>{multiplier}</span>
      <span>=</span>
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') e.preventDefault()
        }}
        className="w-16 h-10 text-center text-xl font-bold border-2 border-black"
        maxLength={2}
      />
      <span>total pieces</span>
    </div>
  )

  const Step1And2 = () => (
    <>
      {/* Step 1 */}
      <section className="w-full flex flex-col items-center gap-12">
        <div className="flex items-center gap-4 h-14">
          <div className="border-2 border-[#FF497C] px-6 flex items-center h-full">
            <span className="text-[#FF497C] font-bold text-xl">
              STEP 1
            </span>
          </div>
          <div className="bg-[#FF497C] px-6 flex items-center h-full">
            <span className="text-white font-bold text-xl">
              Create equivalent fractions
            </span>
          </div>
        </div>

        <div className="text-2xl font-bold text-center">
          Use the knife to make equivalent fractions from 1/2.
        </div>

        <div className="w-full flex flex-col items-center gap-16">
          {/* Original 1/2 */}
          <div className="flex items-center justify-center gap-8 w-full">
            <div className="w-16"></div>
            <div className="w-[480px]">
              <ChocolateBar pieces={2} filledPieces={1} />
            </div>
            <div className="flex flex-col items-center w-12">
              <div className="text-2xl font-bold">1</div>
              <div className="border-t-2 border-black w-8"></div>
              <div className="text-2xl font-bold">2</div>
            </div>
          </div>

          {/* ×2 Row */}
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center gap-8">
              <Button
                onClick={() => setMultiplier2Selected(true)}
                className={`rounded-lg w-16 h-16 flex items-center justify-center ${multiplier2Selected ? 'bg-[#2EA500]' : 'bg-gray-200'
                  } hover:${multiplier2Selected ? 'bg-[#2EA500]/90' : 'bg-gray-300'}`}
              >
                <div className="flex items-center gap-1">
                  <Knife className="w-6 h-6" />
                  <span className="text-xl font-bold">2</span>
                </div>
              </Button>
              <div className="w-[480px]">
                {!multiplier2Selected ? (
                  <ChocolateBar pieces={2} filledPieces={1} />
                ) : (
                  <ChocolateBar pieces={4} filledPieces={2} />
                )}
              </div>
              <div className="w-12"></div>
            </div>
            {multiplier2Selected && (
              <PiecesCalculation
                initialPieces={2}
                multiplier={2}
                value={totalPieces1}
                onChange={setTotalPieces1}
              />
            )}
          </div>

          {/* ×3 Row */}
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center gap-8">
              <Button
                onClick={() => setMultiplier3Selected(true)}
                className={`rounded-lg w-16 h-16 flex items-center justify-center ${multiplier3Selected ? 'bg-[#2EA500]' : 'bg-gray-200'
                  } hover:${multiplier3Selected ? 'bg-[#2EA500]/90' : 'bg-gray-300'}`}
              >
                <div className="flex items-center gap-1">
                  <Knife className="w-6 h-6" />
                  <span className="text-xl font-bold">3</span>
                </div>
              </Button>
              <div className="w-[480px]">
                {!multiplier3Selected ? (
                  <ChocolateBar pieces={2} filledPieces={1} />
                ) : (
                  <ChocolateBar pieces={6} filledPieces={3} />
                )}
              </div>
              <div className="w-12"></div>
            </div>
            {multiplier3Selected && (
              <PiecesCalculation
                initialPieces={2}
                multiplier={3}
                value={totalPieces2}
                onChange={setTotalPieces2}
              />
            )}
          </div>
        </div>

        {!step1Complete && multiplier2Selected && totalPieces1 === '4' &&
          multiplier3Selected && totalPieces2 === '6' && (
            <Button
              onClick={() => setStep1Complete(true)}
              className="bg-[#FF497C] text-white px-8 py-2 text-xl font-bold border-2 border-black hover:bg-[#FF497C]/90"
            >
              PROCEED
            </Button>
          )}
      </section>

      {/* Step 2 */}
      {step1Complete && (
        <section className="w-full flex flex-col items-center gap-12">
          <div className="flex items-center gap-4 h-14">
            <div className="border-2 border-[#FF497C] px-6 flex items-center h-full">
              <span className="text-[#FF497C] font-bold text-xl">
                STEP 2
              </span>
            </div>
            <div className="bg-[#FF497C] px-6 flex items-center h-full">
              <span className="text-white font-bold text-xl">
                Create equivalent fractions
              </span>
            </div>
          </div>

          <div className="text-2xl font-bold text-center">
            Use the knife to make equivalent fractions from 1/5.
          </div>

          <div className="w-full flex flex-col items-center gap-16">
            {/* Original 1/5 */}
            <div className="flex items-center justify-center gap-8 w-full">
              <div className="w-16"></div>
              <div className="w-[480px]">
                <ChocolateBar pieces={5} filledPieces={1} />
              </div>
              <div className="flex flex-col items-center w-12">
                <div className="text-2xl font-bold">1</div>
                <div className="border-t-2 border-black w-8"></div>
                <div className="text-2xl font-bold">5</div>
              </div>
            </div>

            {/* ×2 Row */}
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center gap-8">
                <Button
                  onClick={() => setStep2Multiplier2Selected(true)}
                  className={`rounded-lg w-16 h-16 flex items-center justify-center ${step2Multiplier2Selected ? 'bg-[#2EA500]' : 'bg-gray-200'
                    } hover:${step2Multiplier2Selected ? 'bg-[#2EA500]/90' : 'bg-gray-300'}`}
                >
                  <div className="flex items-center gap-1">
                    <Knife className="w-6 h-6" />
                    <span className="text-xl font-bold">2</span>
                  </div>
                </Button>
                <div className="w-[480px]">
                  {!step2Multiplier2Selected ? (
                    <ChocolateBar pieces={5} filledPieces={1} />
                  ) : (
                    <ChocolateBar pieces={10} filledPieces={2} />
                  )}
                </div>
                <div className="w-12"></div>
              </div>
              {step2Multiplier2Selected && (
                <PiecesCalculation
                  initialPieces={5}
                  multiplier={2}
                  value={step2TotalPieces1}
                  onChange={setStep2TotalPieces1}
                />
              )}
            </div>

            {/* ×3 Row */}
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center gap-8">
                <Button
                  onClick={() => setStep2Multiplier3Selected(true)}
                  className={`rounded-lg w-16 h-16 flex items-center justify-center ${step2Multiplier3Selected ? 'bg-[#2EA500]' : 'bg-gray-200'
                    } hover:${step2Multiplier3Selected ? 'bg-[#2EA500]/90' : 'bg-gray-300'}`}
                >
                  <div className="flex items-center gap-1">
                    <Knife className="w-6 h-6" />
                    <span className="text-xl font-bold">3</span>
                  </div>
                </Button>
                <div className="w-[480px]">
                  {!step2Multiplier3Selected ? (
                    <ChocolateBar pieces={5} filledPieces={1} />
                  ) : (
                    <ChocolateBar pieces={15} filledPieces={3} />
                  )}
                </div>
                <div className="w-12"></div>
              </div>
              {step2Multiplier3Selected && (
                <PiecesCalculation
                  initialPieces={5}
                  multiplier={3}
                  value={step2TotalPieces2}
                  onChange={setStep2TotalPieces2}
                />
              )}
            </div>
          </div>

          {step2Multiplier2Selected && step2TotalPieces1 === '10' &&
            step2Multiplier3Selected && step2TotalPieces2 === '15' && (
              <Button
                onClick={() => setStep2Complete(true)}
                className="bg-[#FF497C] text-white px-8 py-2 text-xl font-bold border-2 border-black hover:bg-[#FF497C]/90"
              >
                PROCEED
              </Button>
            )}
        </section>
      )}
    </>
  )

  const Step3 = () => {
    const [selectedBars, setSelectedBars] = useState([false, false, false, false])
    const [showQuestion, setShowQuestion] = useState(false)
    const [denominatorAnswer, setDenominatorAnswer] = useState('')

    const toggleBarSelection = (index: number) => {
      const newSelectedBars = [...selectedBars]
      newSelectedBars[index] = !newSelectedBars[index]
      setSelectedBars(newSelectedBars)

      if (newSelectedBars[1] && newSelectedBars[2] &&
        !newSelectedBars[0] && !newSelectedBars[3]) {
        setShowQuestion(true)
      } else {
        setShowQuestion(false)
        setDenominatorAnswer('')
      }
    }

    return (
      <section className="w-full flex flex-col items-center gap-12">
        <div className="flex items-center gap-4 h-14">
          <div className="border-2 border-[#FF497C] px-6 flex items-center h-full">
            <span className="text-[#FF497C] font-bold text-xl">
              STEP 3
            </span>
          </div>
          <div className="bg-[#FF497C] px-6 flex items-center h-full">
            <span className="text-white font-bold text-xl">
              Select chocolates with same denominator
            </span>
          </div>
        </div>

        <div className="text-2xl font-bold text-center">
          Select the chocolate bars that have the same denominator.
        </div>

        <div className="w-full flex flex-col items-center gap-16">
          <div className="flex items-center justify-center gap-8 w-full">
            <ChocolateBar pieces={4} filledPieces={2} selectable selected={selectedBars[0]} onSelect={() => toggleBarSelection(0)} />
            <div className="flex flex-col items-center w-12">
              <div className="text-2xl font-bold">2</div>
              <div className="border-t-2 border-black w-8"></div>
              <div className="text-2xl font-bold">4</div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-8 w-full">
            <ChocolateBar pieces={10} filledPieces={2} selectable selected={selectedBars[1]} onSelect={() => toggleBarSelection(1)} />
            <div className="flex flex-col items-center w-12">
              <div className="text-2xl font-bold">2</div>
              <div className="border-t-2 border-black w-8"></div>
              <div className="text-2xl font-bold">10</div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-8 w-full">
            <ChocolateBar pieces={10} filledPieces={4} selectable selected={selectedBars[2]} onSelect={() => toggleBarSelection(2)} />
            <div className="flex flex-col items-center w-12">
              <div className="text-2xl font-bold">4</div>
              <div className="border-t-2 border-black w-8"></div>
              <div className="text-2xl font-bold">10</div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-8 w-full">
            <ChocolateBar pieces={15} filledPieces={3} selectable selected={selectedBars[3]} onSelect={() => toggleBarSelection(3)} />
            <div className="flex flex-col items-center w-12">
              <div className="text-2xl font-bold">3</div>
              <div className="border-t-2 border-black w-8"></div>
              <div className="text-2xl font-bold">15</div>
            </div>
          </div>
        </div>

        {showQuestion && (
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 text-2xl">
              <span className="font-bold">Common denominator is</span>
              <Input
                type="text"
                value={denominatorAnswer}
                onChange={(e) => setDenominatorAnswer(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') e.preventDefault()
                }}
                className="w-16 h-12 text-center text-2xl font-bold"
                maxLength={2}
              />
            </div>
            {denominatorAnswer === '10' && (
              <Button
                onClick={() => {/* Handle completion */ }}
                className="bg-[#FF497C] text-white px-8 py-2 text-xl font-bold border-2 border-black hover:bg-[#FF497C]/90"
              >
                PROCEED
              </Button>
            )}
          </div>
        )}
      </section>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-[#F9F871] p-6 flex items-center justify-center gap-4 border-b-4 border-black">
        <span className="text-4xl font-bold">Common denominator: </span>
        <div className="flex items-center gap-2">
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold">1</div>
            <div className="border-t-2 border-black w-8"></div>
            <div className="text-4xl font-bold">2</div>
          </div>
          <span className="text-4xl font-bold">&</span>
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold">1</div>
            <div className="border-t-2 border-black w-8"></div>
            <div className="text-4xl font-bold">5</div>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-white p-8 flex flex-col items-center gap-16">
        {!step2Complete ? <Step1And2 /> : <Step3 />}
      </div>
    </div>
  )
}

