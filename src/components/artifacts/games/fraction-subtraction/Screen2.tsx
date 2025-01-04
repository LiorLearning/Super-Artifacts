'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useGameState } from './state-utils'
import { StepHeader } from './components/StepHeader'
import { FractionDisplay } from './components/FractionDisplay'
import { useEffect } from 'react'

interface FractionSubtractionProps {
  sendAdminMessage: (role: string, content: string) => void
  onProceed: () => void
}

const STEPS = [
  { id: 1, title: 'DENOMINATOR' },
  { id: 2, title: 'NUMERATOR' },
  { id: 3, title: 'ANSWER' }
];

export default function Screen2({ sendAdminMessage, onProceed }: FractionSubtractionProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { screen2State } = gameStateRef.current;
  const { fraction1, fraction2 } = gameStateRef.current.questions.question2;

  useEffect(() => {
    sendAdminMessage('agent', `Great, here's another question for you!`);
  },[]);
  
  const handleDenominatorAnswer = (answer: string) => {
    if (answer === 'same') {
      sendAdminMessage('agent', 'Correct! what about the numerator?');
      setGameStateRef({
        screen2State: {
          ...screen2State,
          denominatorAnswer: answer,
          completedSteps: [...screen2State.completedSteps, 1],
          currentStep: 2
        } 
      });
    } else {
      sendAdminMessage('agent', 'Ah, not quite. What do you think the denominator was before and after subtraction?');
    }
  }

  const handleNumeratorAnswer = (answer: string) => {
    if (answer === 'subtracted') {
      sendAdminMessage('agent', 'Correct! Now lets solve the problem.');
      setGameStateRef({
        screen2State: {
          ...screen2State,
          numeratorAnswer: answer,
          completedSteps: [...screen2State.completedSteps, 2],
          currentStep: 3
        }
      });
    } else {
      sendAdminMessage('agent', 'Not quite. What do you think the numerator was before and after subtraction?');
    }
  }

  const handleFinalAnswerChange = (value: string) => {
    const expectedAnswer = fraction1.numerator - fraction2.numerator;
    const isCorrect = value === String(expectedAnswer);
    if (isCorrect) {
      sendAdminMessage('agent', `Correct!`);
    }

    setGameStateRef({
      screen2State: {
        ...screen2State,
        finalAnswer: value,     
        isStep3Correct: isCorrect
      }
    });
  }

  return (
    <div className="min-h-screen maindiv flex flex-col">
      {/* Header */}
      <div className="bg-[#F9F871] p-6 flex items-center justify-between border-b-4 border-black">
        {/* Left side - Navigation buttons */}
        <div className="flex gap-2">
          {screen2State.currentStep > 1 && (
            <Button
              onClick={() => setGameStateRef({
                screen2State: {
                  ...screen2State,
                  currentStep: screen2State.currentStep - 1
                }
              })}
              className="bg-[#FF497C] text-white px-4 py-2 text-sm font-bold border-2 border-black hover:bg-[#FF497C]/90"
            >
              Previous Step
            </Button>
          )}
          {screen2State.currentStep < 3 && screen2State.completedSteps.includes(screen2State.currentStep) && (
            <Button
              onClick={() => setGameStateRef({
                screen2State: {
                  ...screen2State,
                  currentStep: screen2State.currentStep + 1
                }
              })}
              className="bg-[#FF497C] text-white px-4 py-2 text-sm font-bold border-2 border-black hover:bg-[#FF497C]/90"
            >
              Next Step
            </Button>
          )}
        </div>

        {/* Center - Original fraction display */}
        <div className="flex items-center gap-4">
          <span className="text-4xl font-bold">Subtract:</span>
          <FractionDisplay
            numerator={fraction1.numerator}
            denominator={fraction1.denominator}
          />
          <span className="text-4xl font-bold">-</span>
          <FractionDisplay
            numerator={fraction2.numerator}
            denominator={fraction2.denominator}
          />
        </div>
        
        {/* Right side - Empty div for balance */}
        <div className="w-[120px]"></div>
      </div>

      {/* Main Content */}
      <div className="flex-1 relative bg-white pt-16 p-8 flex flex-col items-center gap-8">
        {STEPS.map(step => (
          (screen2State.completedSteps.includes(step.id) || screen2State.currentStep === step.id) && (
            <div key={step.id} className="w-full max-w-2xl mb-8 flex flex-col gap-8 items-center">
              <StepHeader step={step.id} title={step.title} />
              {step.id === 1 && (
                <>
                  <h3 className="text-xl font-bold text-center">Mark the correct answer</h3>
                  <p className="text-lg font-bold text-center">
                    What will happen to the denominator?
                  </p>
                  <div className="flex gap-4">
                    <Button
                      onClick={() => handleDenominatorAnswer('same')}
                      className={`px-8 py-2 text-lg font-bold border-2 border-black text-white
                        ${screen2State.denominatorAnswer === 'same'
                          ? 'bg-[#2EA500] hover:bg-[#2EA500]'
                          : 'bg-[#FF497C] hover:bg-[#FF497C]/90'}`}
                      disabled={screen2State.completedSteps.includes(1)}
                    >
                      Stays the same
                    </Button>
                    <Button
                      onClick={() => handleDenominatorAnswer('subtracted')}
                      className={`px-8 py-2 text-lg font-bold border-2 border-black text-white
                        bg-[#FF497C] hover:bg-[#FF497C]/90`}
                      disabled={screen2State.completedSteps.includes(1)}
                    >
                      It'll be subtracted
                    </Button>
                  </div>
                </>
              )}
              {step.id === 2 && (
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
                      disabled={screen2State.completedSteps.includes(2)}
                    >
                      Stays the same
                    </Button>
                    <Button
                      onClick={() => handleNumeratorAnswer('subtracted')}
                      className={`px-8 py-2 text-lg font-bold border-2 border-black text-white
                        ${screen2State.numeratorAnswer === 'subtracted'
                          ? 'bg-[#2EA500] hover:bg-[#2EA500]'
                          : 'bg-[#FF497C] hover:bg-[#FF497C]/90'}`}
                      disabled={screen2State.completedSteps.includes(2)}
                    >
                      It'll be subtracted
                    </Button>
                  </div>
                </>
              )}
              {step.id === 3 && (
                <>
                  <div className="flex items-center gap-4">
                    <FractionDisplay
                      numerator={fraction1.numerator}
                      denominator={fraction1.denominator}
                    />
                    <span className="text-4xl font-bold">-</span>
                    <FractionDisplay
                      numerator={fraction2.numerator}
                      denominator={fraction2.denominator}
                    />
                    <span className="text-4xl font-bold">=</span>
                    <div className="flex flex-col items-center gap-2">
                      <Input
                        type="text"
                        value={screen2State.finalAnswer}
                        onChange={(e) => handleFinalAnswerChange(e.target.value)}
                        className="w-16 h-16 text-2xl font-bold text-center border-2 border-black"
                      />
                      <div className="w-16 border-t-2 border-black"></div>
                      <div className="text-2xl font-bold">{fraction1.denominator}</div>
                    </div>
                  </div>
                  {screen2State.isStep3Correct && (
                    <div className="mt-4 flex flex-col items-center">
                      <div className="px-4 py-2 bg-[#2EA500] text-white font-bold rounded-lg">
                        Correct 🎉
                      </div>
                      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                        <div className="relative overflow-hidden w-full h-full">
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
          )
        ))}
      </div>
      <style jsx>{`
        @keyframes fall {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(200vh) rotate(360deg); }
        }
        .animate-fall {
          animation: fall 6s linear infinite;
        }
      `}</style>
    </div>
  )
}

