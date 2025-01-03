'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface FractionSubtractionProps {
  sendAdminMessage: (role: string, content: string) => void
  onProceed: () => void
}

export default function Screen2({ sendAdminMessage, onProceed }: FractionSubtractionProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [denominatorAnswer, setDenominatorAnswer] = useState<string | null>(null)
  const [numeratorAnswer, setNumeratorAnswer] = useState<string | null>(null)
  const [finalAnswer, setFinalAnswer] = useState('')
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [isStep3Correct, setIsStep3Correct] = useState(false)

  const handleDenominatorAnswer = (answer: string) => {
    setDenominatorAnswer(answer)
    if (answer === 'same') {
      setCompletedSteps(prev => [...prev, 1])
      setCurrentStep(2)
    }
  }

  const handleNumeratorAnswer = (answer: string) => {
    setNumeratorAnswer(answer)
    if (answer === 'subtracted') {
      setCompletedSteps(prev => [...prev, 2])
      setCurrentStep(3)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-[#F9F871] p-6 flex items-center justify-center gap-4 border-b-4 border-black">
        <span className="text-4xl font-bold">Subtract:</span>
        <div className="bg-white p-2 border-2 border-black">
          <div className="text-2xl font-bold">4</div>
          <div className="border-t-2 border-black"></div>
          <div className="text-2xl font-bold">5</div>
        </div>
        <span className="text-4xl font-bold">-</span>
        <div className="bg-white p-2 border-2 border-black">
          <div className="text-2xl font-bold">3</div>
          <div className="border-t-2 border-black"></div>
          <div className="text-2xl font-bold">5</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white pt-16 p-8 flex flex-col items-center gap-8">
        {[1, 2, 3].map(step => (
          (completedSteps.includes(step) || currentStep === step) && (
            <div key={step} className="w-full max-w-2xl mb-8 flex flex-col items-center">
              <div className="flex items-center gap-4 mb-4">
                <div className="border-2 border-[#FF497C] px-6 py-2">
                  <span className="text-[#FF497C] font-bold text-xl">STEP {step}</span>
                </div>
                <div className="bg-[#FF497C] px-6 py-2">
                  <span className="text-white font-bold text-xl">
                    {step === 1 ? 'DENOMINATOR' : step === 2 ? 'NUMERATOR' : 'ANSWER'}
                  </span>
                </div>
              </div>
              <div className="bg-[#FCF0FF] p-8 rounded-lg flex flex-col items-center gap-8">
                {step === 1 && (
                  <>
                    <h3 className="text-xl font-bold text-center">Mark the correct answer</h3>
                    <p className="text-lg font-bold text-center">
                      What will happen to the denominator?
                    </p>
                    <div className="flex gap-4">
                      <Button 
                        onClick={() => handleDenominatorAnswer('same')}
                        className={`px-8 py-2 text-lg font-bold border-2 border-black text-white
                          ${denominatorAnswer === 'same' 
                            ? 'bg-[#2EA500] hover:bg-[#2EA500]' 
                            : 'bg-[#FF497C] hover:bg-[#FF497C]/90'}`}
                        disabled={completedSteps.includes(1)}
                      >
                        Stays the same
                      </Button>
                      <Button 
                        onClick={() => handleDenominatorAnswer('subtracted')}
                        className={`px-8 py-2 text-lg font-bold border-2 border-black text-white
                          bg-[#FF497C] hover:bg-[#FF497C]/90`}
                        disabled={completedSteps.includes(1)}
                      >
                        It'll be subtracted
                      </Button>
                    </div>
                  </>
                )}
                {step === 2 && (
                  <>
                    <h3 className="text-xl font-bold text-center">Mark the correct answer</h3>
                    <p className="text-lg font-bold text-center">
                      What will happen to the numerator?
                    </p>
                    <div className="flex gap-4">
                      <Button 
                        onClick={() => handleNumeratorAnswer('same')}
                        className={`px-8 py-2 text-lg font-bold border-2 border-black text-white
                          bg-[#FF497C] hover:bg-[#FF497C]/90`}
                        disabled={completedSteps.includes(2)}
                      >
                        Stays the same
                      </Button>
                      <Button 
                        onClick={() => handleNumeratorAnswer('subtracted')}
                        className={`px-8 py-2 text-lg font-bold border-2 border-black text-white
                          ${numeratorAnswer === 'subtracted' 
                            ? 'bg-[#2EA500] hover:bg-[#2EA500]' 
                            : 'bg-[#FF497C] hover:bg-[#FF497C]/90'}`}
                        disabled={completedSteps.includes(2)}
                      >
                        It'll be subtracted
                      </Button>
                    </div>
                  </>
                )}
                {step === 3 && (
                  <>
                    <div className="flex items-center gap-4">
                      <div className="bg-white p-2 border-2 border-black">
                        <div className="text-2xl font-bold">4</div>
                        <div className="border-t-2 border-black"></div>
                        <div className="text-2xl font-bold">5</div>
                      </div>
                      <span className="text-4xl font-bold">-</span>
                      <div className="bg-white p-2 border-2 border-black">
                        <div className="text-2xl font-bold">3</div>
                        <div className="border-t-2 border-black"></div>
                        <div className="text-2xl font-bold">5</div>
                      </div>
                      <span className="text-4xl font-bold">=</span>
                      <div className="flex flex-col items-center gap-2">
                        <Input 
                          type="text"
                          value={finalAnswer}
                          onChange={(e) => {
                            setFinalAnswer(e.target.value)
                            setIsStep3Correct(e.target.value === '1')
                          }}
                          className="w-16 h-16 text-2xl font-bold text-center border-2 border-black"
                        />
                        <div className="w-16 border-t-2 border-black"></div>
                        <div className="text-2xl font-bold">5</div>
                      </div>
                    </div>
                    {isStep3Correct && (
                      <div className="mt-4 flex flex-col items-center">
                        <div className="px-4 py-2 bg-[#2EA500] text-white font-bold rounded-lg">
                          Correct 🎉
                        </div>
                        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                          <div className="relative w-full h-full">
                            {[...Array(50)].map((_, i) => (
                              <div
                                key={i}
                                className="absolute animate-fall"
                                style={{
                                  left: `${Math.random() * 100}%`,
                                  top: `-${Math.random() * 20 + 10}%`,
                                  animation: `fall ${Math.random() * 3 + 2}s linear infinite`,
                                  backgroundColor: ['#FFD700', '#FF6347', '#00CED1', '#FF69B4'][Math.floor(Math.random() * 4)],
                                  width: '10px',
                                  height: '10px',
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )
        ))}
      </div>
      <style jsx>{`
        @keyframes fall {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(100vh) rotate(360deg); }
        }
        .animate-fall {
          animation: fall 3s linear infinite;
        }
      `}</style>
    </div>
  )
}

