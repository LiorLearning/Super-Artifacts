'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { PocketKnifeIcon as Knife } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface ThirdScreenProps {
  onNext: () => void;
  sendAdminMessage: (role: string, content: string) => void;
}

export default function Question3({ onNext, sendAdminMessage }: ThirdScreenProps) {
  const router = useRouter()
  const [step, setStep] = useState<'1/3' | '1/5' | 'reflect'>('1/3')
  const [commonDenominator, setCommonDenominator] = useState('')
  const [showExplanation, setShowExplanation] = useState(false)
  const [selectedExplanation, setSelectedExplanation] = useState<number | null>(null)
  const [fractionStates, setFractionStates] = useState({
    '1/3': {
      pieces: 3,
      splits: Array(5).fill(1),
      answers: Array(5).fill(''),
      multipliers: Array(5).fill('')
    },
    '1/5': {
      pieces: 5,
      splits: Array(5).fill(1),
      answers: Array(5).fill(''),
      multipliers: Array(5).fill('')
    }
  })

  const getCorrectAnswer = (fraction: '1/3' | '1/5', index: number) => {
    const base = fraction === '1/3' ? 3 : 5
    return base * (index + 1)
  }

  const isAnswerCorrect = (fraction: '1/3' | '1/5', index: number) => {
    return fractionStates[fraction].answers[index] === getCorrectAnswer(fraction, index).toString()
  }

  const isMultiplierCorrect = (fraction: '1/3' | '1/5', index: number) => {
    return fractionStates[fraction].multipliers[index] === (index + 1).toString()
  }

  const handleKnifeClick = (fraction: '1/3' | '1/5', index: number) => {
    setFractionStates(prev => ({
      ...prev,
      [fraction]: {
        ...prev[fraction],
        splits: prev[fraction].splits.map(() => index + 1)
      }
    }))
  }

  const ChocolateBar = ({ fraction, pieces, splits }: { fraction: '1/3' | '1/5', pieces: number, splits: number[] }) => {
    const base = fraction === '1/3' ? 3 : 5
    const filledPieces = 1

    return (
      <div className="flex -space-x-[1px] w-[480px]">
        {[...Array(base)].map((_, pieceIndex) => (
          <div
            key={pieceIndex}
            className="flex -space-x-[1px]"
            style={{ width: `${100 / base}%` }}
          >
            {[...Array(splits[pieceIndex] || 1)].map((_, splitIndex) => (
              <div
                key={splitIndex}
                className={cn(
                  "h-20 relative border-2 border-[#5d4037]",
                  pieceIndex < filledPieces ? "bg-[#5d4037]" : "bg-[#8d6e63]"
                )}
                style={{ width: `${100 / splits[pieceIndex]}%` }}
              >
                <div className="absolute inset-0 border-l-2 border-t-2 border-[#FFFFFF20]"></div>
                <div className="absolute inset-0 border-r-2 border-b-2 border-[#00000040]"></div>
              </div>
            ))}
          </div>
        ))}
      </div>
    )
  }

  const KnifeRow = ({ fraction, index }: { fraction: '1/3' | '1/5', index: number }) => {
    const base = fraction === '1/3' ? 3 : 5
    const isFirstRow = index === 0

    return (
      <div className="flex items-center gap-4 bg-[#FFF1FF] p-4 rounded-lg w-full max-w-3xl">
        <Button
          onClick={() => handleKnifeClick(fraction, index)}
          className={cn(
            "w-16 h-16 rounded-lg flex items-center justify-center transition-colors",
            fractionStates[fraction].splits[0] > index
              ? "bg-[#2EA500] hover:bg-[#2EA500]/90"
              : "bg-[#FF497C] hover:bg-[#FF497C]/90"
          )}
        >
          <div className="flex items-center gap-1">
            <Knife className="w-6 h-6" />
            <span className="text-xl font-bold">{index + 1}</span>
          </div>
        </Button>
        <div className="flex items-center gap-2 text-xl">
          <span>{base} pieces, {isFirstRow ? 'not split any further' : `split into ${index + 1} each`}, give {base} X</span>
          {isFirstRow ? (
            <span>1 = {base}</span>
          ) : (
            <>
              <Input
                type="text"
                value={fractionStates[fraction].multipliers[index]}
                onChange={(e) => {
                  e.preventDefault();
                  setFractionStates(prev => ({
                    ...prev,
                    [fraction]: {
                      ...prev[fraction],
                      multipliers: prev[fraction].multipliers.map((m, i) => i === index ? e.target.value : m)
                    }
                  }))
                }}
                className={cn(
                  "w-16 h-12 text-center text-xl font-bold",
                  fractionStates[fraction].multipliers[index] && !isMultiplierCorrect(fraction, index) && "border-red-500 focus:border-red-500"
                )}
                maxLength={2}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') e.preventDefault()
                }}
              />
              <span>=</span>
              <Input
                type="text"
                value={fractionStates[fraction].answers[index]}
                onChange={(e) => {
                  e.preventDefault();
                  setFractionStates(prev => ({
                    ...prev,
                    [fraction]: {
                      ...prev[fraction],
                      answers: prev[fraction].answers.map((a, i) => i === index ? e.target.value : a)
                    }
                  }))
                }}
                className={cn(
                  "w-16 h-12 text-center text-xl font-bold",
                  fractionStates[fraction].answers[index] && !isAnswerCorrect(fraction, index) && "border-red-500 focus:border-red-500"
                )}
                maxLength={2}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') e.preventDefault()
                }}
              />
            </>
          )}
          <span>total pieces</span>
        </div>
      </div>
    )
  }

  const FractionSection = ({ fraction }: { fraction: '1/3' | '1/5' }) => {
    const isComplete = () => {
      return fractionStates[fraction].answers.slice(1).every((answer, index) =>
        isAnswerCorrect(fraction, index + 1)
      ) && fractionStates[fraction].multipliers.slice(1).every((multiplier, index) =>
        isMultiplierCorrect(fraction, index + 1)
      )
    }

    return (
      <section className="w-full flex flex-col items-center gap-8">
        <div className="flex items-center gap-4 h-14">
          <div className="border-2 border-[#FF497C] px-6 flex items-center h-full">
            <span className="text-[#FF497C] font-bold text-xl">
              STEP {fraction === '1/3' ? '1' : '2'}
            </span>
          </div>
          <div className="bg-[#FF497C] px-6 flex items-center h-full">
            <span className="text-white font-bold text-xl">
              FIND THE TOTAL PIECES
            </span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-8 w-full">
          <div className="flex flex-col items-center w-[480px]">
            <ChocolateBar
              fraction={fraction}
              pieces={fraction === '1/3' ? 3 : 5}
              splits={fractionStates[fraction].splits}
            />
            <div className="flex w-full justify-between mt-2">
              {[...Array(fraction === '1/3' ? 3 : 5)].map((_, index) => (
                <div key={index} className="flex-1 text-center font-bold">
                  {fractionStates[fraction].splits[index] > 1 ? fractionStates[fraction].splits[index] : ''}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center w-12">
            <div className="text-2xl font-bold">1</div>
            <div className="border-t-2 border-black w-8"></div>
            <div className="text-2xl font-bold">{fraction === '1/3' ? '3' : '5'}</div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-4 items-center">
          {[0, 1, 2, 3, 4].map((index) => (
            <KnifeRow key={index} fraction={fraction} index={index} />
          ))}
        </div>

        {isComplete() && (
          <Button
            onClick={() => {
              if (fraction === '1/3') {
                setStep('1/5');
              } else if (fraction === '1/5') {
                setStep('reflect');
              }
            }}
            className="bg-[#FF497C] text-white px-8 py-2 text-xl font-bold border-2 border-black hover:bg-[#FF497C]/90"
          >
            PROCEED
          </Button>
        )}
      </section>
    )
  }

  const ReflectSection = () => {
    const multiplesOf3 = [3, 6, 9, 12, 15]
    const multiplesOf5 = [5, 10, 15, 20, 25]

    return (
      <section className="w-full flex flex-col items-center gap-8">
        <div className="flex items-center gap-4 h-14">
          <div className="border-2 border-[#FF497C] px-6 flex items-center h-full">
            <span className="text-[#FF497C] font-bold text-xl">
              STEP 3
            </span>
          </div>
          <div className="bg-[#FF497C] px-6 flex items-center h-full">
            <span className="text-white font-bold text-xl">
              REFLECT
            </span>
          </div>
        </div>

        {!showExplanation ? (
          <>
            <div className="w-full max-w-3xl">
              <div className="flex justify-between px-[8px] mb-4">
                {[1, 2, 3, 4, 5].map((num) => (
                  <div key={num} className="w-16 h-16 bg-[#F8E8FF] rounded-lg flex items-center justify-center">
                    <div className="flex items-center gap-1 -rotate-45">
                      <Knife className="w-6 h-6" />
                      <span className="text-xl font-bold">{num}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="bg-[#FF497C] px-6 py-3 w-48">
                    <span className="text-white font-bold">Multiples of 3</span>
                  </div>
                  <div className="flex gap-2 ml-4">
                    {multiplesOf3.map((num, index) => (
                      <div
                        key={index}
                        className={`w-16 h-16 flex items-center justify-center border-2 border-black rounded-lg ${num === 15 ? 'bg-[#FF497C] text-white' : 'bg-white'
                          }`}
                      >
                        <span className="text-xl font-bold">{num}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="bg-[#FF497C] px-6 py-3 w-48">
                    <span className="text-white font-bold">Multiples of 5</span>
                  </div>
                  <div className="flex gap-2 ml-4">
                    {multiplesOf5.map((num, index) => (
                      <div
                        key={index}
                        className={`w-16 h-16 flex items-center justify-center border-2 border-black rounded-lg ${num === 15 ? 'bg-[#FF497C] text-white' : 'bg-white'
                          }`}
                      >
                        <span className="text-xl font-bold">{num}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-2xl font-bold mt-8">
              <span>Common denominator is</span>
              <Input
                type="text"
                value={commonDenominator}
                onChange={(e) => setCommonDenominator(e.target.value)}
                className={`w-16 h-12 text-center text-2xl font-bold ${commonDenominator && commonDenominator !== '15'
                  ? 'border-red-500 focus:border-red-500'
                  : ''
                  }`}
                maxLength={2}
              />
            </div>

            {commonDenominator === '15' && (
              <Button
                onClick={() => setShowExplanation(true)}
                className="bg-[#FF497C] text-white px-8 py-2 text-xl font-bold border-2 border-black hover:bg-[#FF497C]/90"
              >
                PROCEED
              </Button>
            )}
          </>
        ) : (
          <div className="w-full max-w-2xl flex flex-col items-center gap-8">
            <h2 className="text-2xl font-bold text-center">
              How did we find the common denominator?
            </h2>

            <div className="w-full space-y-4">
              {[
                "Split each chocolate until the denominators matched.",
                "Picked the greater of the two denominators."
              ].map((explanation, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedExplanation(index)}
                  className={`w-full p-4 text-left text-lg font-bold border-2 transition-colors ${selectedExplanation === index
                    ? selectedExplanation === 0
                      ? 'bg-green-500 text-white border-green-600'
                      : 'bg-red-500 text-white border-red-600'
                    : 'bg-[#FF497C] text-white border-[#FF497C]'
                    }`}
                >
                  {explanation}
                </button>
              ))}
            </div>

            {selectedExplanation === 0 && (
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
            <div className="text-4xl font-bold">3</div>
          </div>
          <span className="text-4xl font-bold">&</span>
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold">1</div>
            <div className="border-t-2 border-black w-8"></div>
            <div className="text-4xl font-bold">5</div>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-white p-8 flex flex-col items-center gap-16 overflow-y-auto">
        <FractionSection fraction="1/3" />
        {step !== '1/3' && <FractionSection fraction="1/5" />}
        {step === 'reflect' && <ReflectSection />}
      </div>
    </div>
  )
}

