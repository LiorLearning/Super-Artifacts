'use client'

import { useState, useEffect } from 'react'
import SuccessAnimation from '../../utils/success-animate'

export function DenominatorScreen() {
  const [denominatorOption, setDenominatorOption] = useState<number | null>(null)
  const [numeratorOption, setNumeratorOption] = useState<number | null>(null)
  const [answerNumerator, setAnswerNumerator] = useState('')
  const [answerDenominator, setAnswerDenominator] = useState('')
  
  const [showStep2, setShowStep2] = useState(false)
  const [showStep3, setShowStep3] = useState(false)
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false)

  useEffect(() => {
    setShowStep2(denominatorOption === 0)
  }, [denominatorOption])

  useEffect(() => {
    setShowStep3(showStep2 && numeratorOption === 0)
  }, [showStep2, numeratorOption])

  useEffect(() => {
    const correct = answerNumerator === '4' && answerDenominator === '5'
    setIsAnswerCorrect(correct)
  }, [answerNumerator, answerDenominator])

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Title */}
        <h2 className="text-xl font-medium text-center">Add fractions</h2>
        
        {/* Fraction Problem */}
        <div className="flex items-center justify-center gap-2 text-2xl">
          <div className="flex flex-col items-center">
            <span>1</span>
            <div className="border-t border-black w-4"></div>
            <span>5</span>
          </div>
          <span className="mx-2">+</span>
          <div className="flex flex-col items-center">
            <span>3</span>
            <div className="border-t border-black w-4"></div>
            <span>5</span>
          </div>
        </div>

        {/* Step 1 */}
        <div className="space-y-4">
          <p>
            <span className="font-bold">Step 1:</span> Select the right options for the denominator.
          </p>

          <div className="space-y-4">
            <button
              onClick={() => setDenominatorOption(0)}
              className={`w-full p-4 rounded-lg text-left transition-all duration-300 ease-in-out transform
                ${denominatorOption === 0 ? 'bg-[#66CDAA] text-black scale-100' : 'bg-[#E6E6FA] hover:scale-[1.02]'}
                ${denominatorOption === null ? 'border-2 border-blue-400' : ''}
              `}
            >
              <p>The denominator (bottom number) will remain the same.</p>
            </button>
            <button
              onClick={() => setDenominatorOption(1)}
              className={`w-full p-4 rounded-lg text-left transition-all duration-300 ease-in-out transform
                ${denominatorOption === 1 ? 'bg-[#F08080] text-black scale-100' : 'bg-[#E6E6FA] hover:scale-[1.02]'}
                ${denominatorOption === null ? 'border border-gray-300' : ''}
              `}
            >
              <p>The denominators (bottom numbers) will be added together.</p>
            </button>
          </div>
        </div>

        {/* Step 2 */}
        <div className={`space-y-4 transition-all duration-500 ease-in-out transform origin-top
          ${showStep2 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 hidden'}
        `}>
          <p>
            <span className="font-bold">Step 2:</span> Select the right options for the numerator.
          </p>

          <div className="space-y-4">
            <button
              onClick={() => setNumeratorOption(0)}
              className={`w-full p-4 rounded-lg text-left transition-all duration-300 ease-in-out transform
                ${numeratorOption === 0 ? 'bg-[#66CDAA] text-black scale-100' : 'bg-[#E6E6FA] hover:scale-[1.02]'}
                ${numeratorOption === null ? 'border-2 border-blue-400' : ''}
              `}
            >
              <p>The numerators (top numbers) will be added together.</p>
            </button>
            <button
              onClick={() => setNumeratorOption(1)}
              className={`w-full p-4 rounded-lg text-left transition-all duration-300 ease-in-out transform
                ${numeratorOption === 1 ? 'bg-[#F08080] text-black scale-100' : 'bg-[#E6E6FA] hover:scale-[1.02]'}
                ${numeratorOption === null ? 'border border-gray-300' : ''}
              `}
            >
              <p>The numerator (top number) will remain the same.</p>
            </button>
          </div>
        </div>

        {/* Step 3 */}
        <div className={`space-y-4 transition-all duration-500 ease-in-out transform origin-top
          ${showStep3 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 hidden'}
        `}>
          <p className="font-bold">Step 3</p>
          
          <div className="flex items-center justify-center gap-2 text-2xl">
            <div className="flex flex-col items-center">
              <span>1</span>
              <div className="border-t border-black w-4"></div>
              <span>5</span>
            </div>
            <span className="mx-2">+</span>
            <div className="flex flex-col items-center">
              <span>3</span>
              <div className="border-t border-black w-4"></div>
              <span>5</span>
            </div>
            <span className="mx-2">=</span>
            <div className="flex flex-col items-center">
              <input
                type="text"
                value={answerNumerator}
                onChange={(e) => setAnswerNumerator(e.target.value)}
                className={`w-8 h-8 border-2 text-center rounded-md transition-colors duration-300
                  ${answerNumerator === '4' ? 'bg-[#66CDAA] border-[#66CDAA]' : 'border-gray-300'}
                `}
                maxLength={1}
              />
              <div className="border-t border-black w-4 my-1"></div>
              <input
                type="text"
                value={answerDenominator}
                onChange={(e) => setAnswerDenominator(e.target.value)}
                className={`w-8 h-8 border-2 text-center rounded-md transition-colors duration-300
                  ${answerDenominator === '5' ? 'bg-[#66CDAA] border-[#66CDAA]' : 'border-gray-300'}
                `}
                maxLength={1}
              />
            </div>
            <div className="w-12 h-12 rounded-full ml-2 flex items-center justify-center">
              <span role="img" aria-label="party popper" className="text-2xl">🎉</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      {isAnswerCorrect && (
        <div className={`absolute bottom-0 left-0 right-0 bg-[#66CDAA] transition-all duration-500 ease-in-out transform`}>
          <div className="max-w-2xl mx-auto flex items-center p-4">
            <p className="text-xl font-medium">Correct! 🎉</p>
          </div>
        </div>
      )}
      {isAnswerCorrect && (
        <SuccessAnimation />
      )}
    </div>
  )
}

