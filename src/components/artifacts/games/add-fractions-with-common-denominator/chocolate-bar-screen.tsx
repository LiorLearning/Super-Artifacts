'use client'

import { useEffect, useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { useGameState } from './state-utils'

interface ChocolateBarScreenProps {
  onProceed: () => void;
  sendAdminMessage: (role: string, content: string) => void;
}

export function ChocolateBarScreen({ onProceed, sendAdminMessage }: ChocolateBarScreenProps) {
  const { gameStateRef } = useGameState()
  const { fraction1, fraction2 } = gameStateRef.current.state1

  const startedRef = useRef(false)
  const [ selectedPieces, setSelectedPieces ] = useState<number[]>([])
  const [ step2Pieces, setStep2Pieces ] = useState<number[]>([])
  const [ numerator, setNumerator ] = useState<string>('')
  const [ denominator, setDenominator ] = useState<string>('')
  const [ selectedOption, setSelectedOption ] = useState<number | null>(null)
  const [ showStep2, setShowStep2 ] = useState<boolean>(false)
  const [ showStep3, setShowStep3 ] = useState<boolean>(false)
  const [ showFooter, setShowFooter ] = useState<boolean>(false)

  const chocolateBarPieces = fraction1.denominator
  const correctAnswer = {
    numerator: fraction1.numerator + fraction2.numerator,
    denominator: fraction1.denominator,
  }

  useEffect(() => {
    if (startedRef.current === false) {
      sendAdminMessage('agent', `Let's select pieces to give you ${fraction1.numerator}/${fraction1.denominator}th of the chocolate bar`)
      startedRef.current = true
    }
  }, [])

  useEffect(() => {
    const isCorrect = selectedPieces.length === fraction1.numerator
    setShowStep2(isCorrect)
    if (isCorrect) {
      sendAdminMessage('agent', `Great! Now imagine you get ${fraction2.numerator} more ${fraction2.numerator <= 1 ? 'piece' : 'pieces'} from a friend. Try selecting the pieces you have now.`);
    }
  }, [selectedPieces, fraction1.numerator])

  useEffect(() => {
    const correct = step2Pieces.length === correctAnswer.numerator && numerator === correctAnswer.numerator.toString() && denominator === correctAnswer.denominator.toString()
    setShowStep3(correct)
  }, [step2Pieces, numerator, denominator])

  useEffect(() => {
    const isCorrect = selectedOption === 0 && numerator === correctAnswer.numerator.toString() && denominator === correctAnswer.denominator.toString()
    setShowFooter(isCorrect)
    if (isCorrect) {
      sendAdminMessage('agent', "You're right, why do you think the denominator remains the same?");
    }
  }, [selectedOption, numerator, denominator])

  const handlePieceClick = (index: number) => {
    if (selectedPieces.length === fraction1.numerator && !selectedPieces.includes(index)) return
    const newSelectedPieces = selectedPieces.includes(index)
      ? selectedPieces.filter((i: number) => i !== index)
      : [...selectedPieces, index]
    setSelectedPieces(newSelectedPieces)
  }

  const handleStep2PieceClick = (index: number) => {
    const newStep2Pieces = step2Pieces.includes(index)
      ? step2Pieces.filter((i: number) => i !== index)
      : [...step2Pieces, index]
    setStep2Pieces(newStep2Pieces)
  }

  const handleOptionClick = (optionIndex: number) => {
    setSelectedOption(optionIndex)
  }

  const handleNumeratorChange = (value: string) => {
    setNumerator(value)
  }

  const handleDenominatorChange = (value: string) => {
    setDenominator(value)
  }

  return (
    <div className="pt-16">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Title */}
        <h2 className="text-xl font-medium text-center">Add fractions</h2>
        
        {/* Fraction Problem */}
        <div className="flex items-center justify-center gap-2 text-2xl">
          <div className="flex flex-col items-center">
            <span>{fraction1.numerator}</span>
            <div className="border-t border-black w-4"></div>
            <span>{fraction1.denominator}</span>
          </div>
          <span className="mx-2">+</span>
          <div className="flex flex-col items-center">
            <span>{fraction2.numerator}</span>
            <div className="border-t border-black w-4"></div>
            <span>{fraction2.denominator}</span>
          </div>
        </div>

        {/* Step 1 */}
        <div className="space-y-4">
          <p>
            <span className="font-bold">Step 1:</span> Select pieces to get {fraction1.numerator}/{fraction1.denominator}ths of the chocolate bar.
          </p>

          <div className="flex gap-4 items-center">
            <div className="flex border-2 border-blue-400">
              {[...Array(chocolateBarPieces)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePieceClick(index)}
                  className={`
                    w-12 h-12 border border-black
                    ${selectedPieces.includes(index) ? 'bg-[#5B361B]' : 'bg-[#AD9889]'}
                    transition-colors duration-200
                  `}
                  aria-label={`Chocolate piece ${index + 1}`}
                />
              ))}
            </div>

            <div className="flex flex-col items-center text-2xl">
              <span>{selectedPieces.length}</span>
              <div className="border-t border-black w-4"></div>
              <span>{fraction1.denominator}</span>
            </div>
          </div>
        </div>

        {/* Friend's Pieces */}
        {showStep2 && (
          <>
            <div className="flex flex-col items-center my-8 -ml-8">
              <div className="flex items-center gap-4 mb-2">
                <span className="text-5xl font-medium">+</span>
                <div className="space-y-1">
                  <p className="italic text-lg">{fraction2.numerator} more piece(s)</p>
                  <p className="italic text-lg">from a friend</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 items-center">
              <div className="flex">
                {[...Array(chocolateBarPieces)].map((_, index) => (
                  <div
                    key={index}
                    className={`
                      w-12 h-12 border border-black
                      ${index >= fraction1.numerator && index < fraction1.numerator + fraction2.numerator ? 'bg-[#5B361B]' : 'bg-[#AD9889]'}
                    `}
                  />
                ))}
              </div>

              <div className="flex flex-col items-center text-2xl">
                <span>{fraction2.numerator}</span>
                <div className="border-t border-black w-4"></div>
                <span>{fraction2.denominator}</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="space-y-4">
              <p>
                <span className="font-bold">Step 2:</span> Select the pieces you now have.
              </p>

              <div className="flex gap-4 mb-4 items-center">
                <div className="flex">
                  {[...Array(chocolateBarPieces)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleStep2PieceClick(index)}
                      className={`
                        w-12 h-12 border border-black
                        ${step2Pieces.includes(index) ? 'bg-[#5B361B]' : 'bg-[#AD9889]'}
                        transition-colors duration-200
                      `}
                      aria-label={`Final chocolate piece ${index + 1}`}
                    />
                  ))}
                </div>

                <div className="flex flex-col items-center gap-2 text-2xl">
                  <input
                    type="text"
                    value={numerator}
                    onChange={(e) => handleNumeratorChange(e.target.value)}
                    className={`w-8 h-8 border-2 text-center rounded-md transition-colors duration-300
                      ${numerator === correctAnswer.numerator.toString() ? 'bg-[#66CDAA] border-[#66CDAA]' : 'border-gray-300'}
                      ${step2Pieces.length === correctAnswer.numerator && numerator === '' ? 'animate-pulse' : ''}
                    `}
                    placeholder={step2Pieces.length === correctAnswer.numerator ? '?' : ''}
                    maxLength={2}
                  />

                  <div className="border-t border-black w-4"></div>
                  <input
                    type="text"
                    value={denominator}
                    onChange={(e) => handleDenominatorChange(e.target.value)}
                    className={`w-8 h-8 border-2 text-center rounded-md transition-colors duration-300
                      ${denominator === correctAnswer.denominator.toString() ? 'bg-[#66CDAA] border-[#66CDAA]' : 'border-gray-300'}
                      ${step2Pieces.length === correctAnswer.numerator && denominator === '' ? 'animate-pulse' : ''}
                    `}
                    placeholder={step2Pieces.length === correctAnswer.numerator ? '?' : ''}
                    maxLength={2}
                  />
                </div>
              </div>
            </div>

            {/* Step 3 */}
            {showStep3 && (
              <div className="space-y-4">
                <p>
                  <span className="font-bold">Step 3:</span> Select the right options.
                </p>

                <div className="space-y-4">
                  <button
                    onClick={() => handleOptionClick(0)}
                    className={`w-full p-4 rounded-lg text-left transition-colors
                      ${selectedOption === 0 ? 'bg-[#66CDAA] text-black' : 'bg-[#E6E6FA]'}
                      ${selectedOption === null ? 'border-2 border-blue-400' : ''}
                    `}
                  >
                    <p>The denominator (bottom number) remained the same on addition.</p>
                  </button>
                  <button
                    onClick={() => handleOptionClick(1)}
                    className={`w-full p-4 rounded-lg text-left transition-colors
                      ${selectedOption === 1 ? 'bg-[#F08080] text-black' : 'bg-[#E6E6FA]'}
                      ${selectedOption === null ? 'border border-gray-300' : ''}
                    `}
                  >
                    <p>The denominators (bottom number) were added together.</p>
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {showFooter && (
        <div className="bg-[#66CDAA] p-4 mt-4">
          <div className="max-w-2xl mx-auto flex justify-between items-center">
            <p className="text-xl font-medium">Correct! 🎉</p>
            <Button 
              variant="secondary"
              className="bg-white hover:bg-gray-100"
              onClick={onProceed}
            >
              Proceed
            </Button>
          </div>
        </div>
      )}

      
    </div>
  )
}
