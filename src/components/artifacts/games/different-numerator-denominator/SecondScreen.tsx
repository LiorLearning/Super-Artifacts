'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Check, PocketKnifeIcon as Knife } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { ChocolateRow } from './components/ChocolateRow'
import { ChocolateBar } from './components/ChocolateBar'

interface SecondScreenProps {
  onNext: () => void;
  sendAdminMessage: (role: string, content: string) => void;
}

interface FractionInputProps {
  numerator: string;
  denominator: string;
  onNumeratorChange: (value: string) => void;
  onDenominatorChange: (value: string) => void;
  focusNumerator: boolean;
  focusDenominator: boolean;
  correctValues?: {
    numerator: string;
    denominator: string;
  };
}

const FractionInput = ({
  numerator,
  denominator,
  onNumeratorChange,
  onDenominatorChange,
  focusNumerator,
  focusDenominator,
  correctValues
}: FractionInputProps) => {
  const isCorrect = correctValues &&
    numerator === correctValues.numerator &&
    denominator === correctValues.denominator;

  return (
    <div className="relative flex flex-col items-center gap-2">
      <Input
        type="text"
        value={numerator}
        onChange={(e) => onNumeratorChange(e.target.value)}
        className="w-12 h-12 text-center text-2xl font-bold"
        maxLength={1}
        autoFocus={focusNumerator}
      />
      <div className="border-t-2 border-black w-8"></div>
      <Input
        type="text"
        value={denominator}
        onChange={(e) => onDenominatorChange(e.target.value)}
        className="w-12 h-12 text-center text-2xl font-bold"
        maxLength={2}
        autoFocus={focusDenominator}
      />
      {isCorrect && (
        <Check className="left-full absolute w-6 h-6 text-green-500" />
      )}
    </div>
  );
};


export default function SecondScreen({ onNext, sendAdminMessage }: SecondScreenProps) {
  const router = useRouter()
  const [step1Complete, setStep1Complete] = useState(false)
  const [step2Complete, setStep2Complete] = useState(false)
  const [multiplier2Selected, setMultiplier2Selected] = useState(false)
  const [numerator, setNumerator] = useState('')
  const [denominator, setDenominator] = useState('')
  const [multiplier3Selected, setMultiplier3Selected] = useState(false)
  const [numerator3, setNumerator3] = useState('')
  const [denominator3, setDenominator3] = useState('')
  const [selectedBars, setSelectedBars] = useState([false, false, false, false])
  const [showQuestion, setShowQuestion] = useState(false)
  const [denominatorAnswer, setDenominatorAnswer] = useState('')
  const [step2Multiplier3Selected, setStep2Multiplier3Selected] = useState(false)
  const [step2Multiplier2Selected, setStep2Multiplier2Selected] = useState(false)
  const [step2Numerator2, setStep2Numerator2] = useState('')
  const [step2Denominator2, setStep2Denominator2] = useState('')
  const [step2Numerator3, setStep2Numerator3] = useState('')
  const [step2Denominator3, setStep2Denominator3] = useState('')
  const [currentStep, setCurrentStep] = useState(1)
  const [focusNumerator, setFocusNumerator] = useState(false)
  const [focusNumerator3, setFocusNumerator3] = useState(false)
  const [focusStep2Numerator2, setFocusStep2Numerator2] = useState(false)
  const [focusStep2Numerator3, setFocusStep2Numerator3] = useState(false)

  useEffect(() => {
    if (numerator === '2' && denominator === '4') {
      setFocusNumerator(false)
    }
  }, [numerator, denominator])

  useEffect(() => {
    if (numerator3 === '3' && denominator3 === '6') {
      setFocusNumerator3(false)
    }
  }, [numerator3, denominator3])

  useEffect(() => {
    if (step2Numerator2 === '2' && step2Denominator2 === '6') {
      setFocusStep2Numerator2(false)
    }
  }, [step2Numerator2, step2Denominator2])

  useEffect(() => {
    if (step2Numerator3 === '3' && step2Denominator3 === '9') {
      setFocusStep2Numerator3(false)
    }
  }, [step2Numerator3, step2Denominator3])

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
          <ChocolateRow
            multiplierSelected={multiplier2Selected}
            onMultiplierClick={() => setMultiplier2Selected(true)}
            multiplier={2}
            originalPieces={2}
            originalFilled={1}
            multipliedPieces={4}
            multipliedFilled={2}
            fraction={{
              numerator,
              denominator,
              onNumeratorChange: setNumerator,
              onDenominatorChange: setDenominator,
              correctValues: {
                numerator: '2',
                denominator: '4'
              }
            }}
          />

          {/* ×3 Row */}
          <div className="relative flex items-center justify-center gap-8">
            <Button
              onClick={() => setMultiplier3Selected(true)}
              className={`rounded-lg w-16 h-16 flex items-center justify-center ${multiplier3Selected ? 'bg-[#2EA500]' : 'bg-gray-500'
                } hover:${multiplier3Selected ? 'bg-[#2EA500]/90' : 'bg-gray-700'}`}
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
            <div className="flex flex-col items-center gap-2">
              <Input
                type="text"
                value={numerator3}
                onChange={(e) => setNumerator3(e.target.value)}
                className="w-12 h-12 text-center text-2xl font-bold"
                maxLength={1}
                autoFocus={focusNumerator3}
              />
              <div className="border-t-2 border-black w-8"></div>
              <Input
                type="text"
                value={denominator3}
                onChange={(e) => {
                  setDenominator3(e.target.value)
                  if (e.target.value === '6') {
                    setFocusNumerator3(true)
                  }
                }}
                className="w-12 h-12 text-center text-2xl font-bold"
                maxLength={1}
                autoFocus={multiplier3Selected}
              />
              {numerator3 === '3' && denominator3 === '6' && (<Check className="left-full absolute w-6 h-6 text-green-500" />)}
            </div>
          </div>
        </div>

        {!step1Complete && multiplier2Selected && numerator === '2' && denominator === '4' &&
          multiplier3Selected && numerator3 === '3' && denominator3 === '6' && (
            <Button
              onClick={() => {
                setStep1Complete(true)
                setCurrentStep(2)
              }}
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
            Use the knife to make equivalent fractions from 1/3.
          </div>

          <div className="w-full flex flex-col items-center gap-16">
            {/* Original 1/3 */}
            <div className="flex items-center justify-center gap-8 w-full">
              <div className="w-16"></div>
              <div className="w-[480px]">
                <ChocolateBar pieces={3} filledPieces={1} />
              </div>
              <div className="flex flex-col items-center w-12">
                <div className="text-2xl font-bold">1</div>
                <div className="border-t-2 border-black w-8"></div>
                <div className="text-2xl font-bold">3</div>
              </div>
            </div>

            {/* ×2 Row */}
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
                  <ChocolateBar pieces={3} filledPieces={1} />
                ) : (
                  <ChocolateBar pieces={6} filledPieces={2} />
                )}
              </div>
              <div className="flex flex-col items-center gap-2">
                <Input
                  type="text"
                  value={step2Numerator2}
                  onChange={(e) => setStep2Numerator2(e.target.value)}
                  className="w-12 h-12 text-center text-2xl font-bold"
                  maxLength={1}
                  autoFocus={focusStep2Numerator2}
                />
                <div className="border-t-2 border-black w-8"></div>
                <Input
                  type="text"
                  value={step2Denominator2}
                  onChange={(e) => {
                    setStep2Denominator2(e.target.value)
                    if (e.target.value === '6') {
                      setFocusStep2Numerator2(true)
                    }
                  }}
                  className="w-12 h-12 text-center text-2xl font-bold"
                  maxLength={2}
                  autoFocus={step2Multiplier2Selected}
                />
              </div>
            </div>

            {/* ×3 Row */}
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
                  <ChocolateBar pieces={3} filledPieces={1} />
                ) : (
                  <ChocolateBar pieces={9} filledPieces={3} />
                )}
              </div>
              <div className="flex flex-col items-center gap-2">
                <Input
                  type="text"
                  value={step2Numerator3}
                  onChange={(e) => setStep2Numerator3(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') e.preventDefault();
                  }}
                  className="w-12 h-12 text-center text-2xl font-bold"
                  maxLength={1}
                  autoFocus={focusStep2Numerator3}
                />
                <div className="border-t-2 border-black w-8"></div>
                <Input
                  type="text"
                  value={step2Denominator3}
                  onChange={(e) => {
                    setStep2Denominator3(e.target.value)
                    if (e.target.value === '9') {
                      setFocusStep2Numerator3(true)
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') e.preventDefault();
                  }}
                  className="w-12 h-12 text-center text-2xl font-bold"
                  maxLength={2}
                  autoFocus={step2Multiplier3Selected}
                />
              </div>
            </div>
          </div>

          {step2Multiplier3Selected && step2Multiplier2Selected &&
            step2Numerator2 === '2' && step2Denominator2 === '6' &&
            step2Numerator3 === '3' && step2Denominator3 === '9' && (
              <Button
                onClick={() => {
                  setStep2Complete(true)
                  setCurrentStep(3)
                }}
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
          {[
            { pieces: 4, filled: 2, fraction: '2/4' },
            { pieces: 6, filled: 3, fraction: '3/6' },
            { pieces: 6, filled: 2, fraction: '2/6' },
            { pieces: 9, filled: 3, fraction: '3/9' }
          ].map((bar, index) => (
            <div key={index} className={`
              flex items-center justify-center gap-8 w-full 
              transition-all duration-200 ease-in-out
              ${selectedBars[index] ? 'scale-105 bg-blue-50 p-4 rounded-xl shadow-lg' : ''}
            `}>
              <ChocolateBar
                pieces={bar.pieces}
                filledPieces={bar.filled}
                selectable
                selected={selectedBars[index]}
                onSelect={() => toggleBarSelection(index)}
              />
              <div className="flex flex-col items-center w-12">
                <div className="text-2xl font-bold">{bar.fraction.split('/')[0]}</div>
                <div className="border-t-2 border-black w-8"></div>
                <div className="text-2xl font-bold">{bar.fraction.split('/')[1]}</div>
              </div>
            </div>
          ))}
        </div>

        {showQuestion && (
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 text-2xl">
              <span className="font-bold">Common denominator is</span>
              <Input
                type="text"
                value={denominatorAnswer}
                onChange={(e) => setDenominatorAnswer(e.target.value)}
                className="w-16 h-12 text-center text-2xl font-bold"
                maxLength={2}
                autoFocus={showQuestion}
              />
            </div>
            {denominatorAnswer === '6' && (
              <Button
                onClick={() => onNext()}
                className="bg-[#FF497C] text-white px-8 py-2 text-xl font-bold border-2 border-black hover:bg-[#FF497C]/90"
              >
                PROCEED TO NEXT QUESTION
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
            <div className="text-4xl font-bold">3</div>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-white p-8 flex flex-col items-center gap-16">
        {currentStep === 1 && <Step1And2 />}
        {currentStep === 2 && <Step1And2 />}
        {currentStep === 3 && <Step3 />}
      </div>
    </div>
  )
}

