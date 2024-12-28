'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

interface ChocolateBarScreenProps {
  onProceed: () => void
}

export function ChocolateBarScreen({ onProceed }: ChocolateBarScreenProps) {
  const [selectedPieces, setSelectedPieces] = useState<number[]>([])
  const [step2Pieces, setStep2Pieces] = useState<number[]>([])
  const [numerator, setNumerator] = useState('')
  const [denominator, setDenominator] = useState('')
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  
  const [showStep2, setShowStep2] = useState(false);
  const [showStep3, setShowStep3] = useState(false);
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    setShowStep2(selectedPieces.length === 3);
  }, [selectedPieces]);

  useEffect(() => {
    setShowStep3(step2Pieces.length === 7 && numerator === '7' && denominator === '8');
  }, [step2Pieces, numerator, denominator]);

  useEffect(() => {
    setShowFooter(selectedOption === 0 && numerator === '7' && denominator === '8');
  }, [selectedOption, numerator, denominator]);

  const handlePieceClick = (index: number) => {
    if (selectedPieces.length === 3 && !selectedPieces.includes(index)) return
    if (selectedPieces.includes(index)) {
      setSelectedPieces(selectedPieces.filter(i => i !== index))
    } else if (selectedPieces.length < 3) {
      setSelectedPieces([...selectedPieces, index])
    }
  }

  const handleStep2PieceClick = (index: number) => {
    if (step2Pieces.includes(index)) {
      setStep2Pieces(step2Pieces.filter(i => i !== index))
    } else {
      setStep2Pieces([...step2Pieces, index])
    }
  }

  const handleOptionClick = (optionIndex: number) => {
    setSelectedOption(optionIndex)
  }

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Title */}
        <h2 className="text-xl font-medium text-center">Add fractions</h2>
        
        {/* Fraction Problem */}
        <div className="flex items-center justify-center gap-2 text-2xl">
          <div className="flex flex-col items-center">
            <span>3</span>
            <div className="border-t border-black w-4"></div>
            <span>8</span>
          </div>
          <span className="mx-2">+</span>
          <div className="flex flex-col items-center">
            <span>4</span>
            <div className="border-t border-black w-4"></div>
            <span>8</span>
          </div>
        </div>

        {/* Step 1 */}
        <div className="space-y-4">
          <p>
            <span className="font-bold">Step 1:</span> Select pieces to get 3/8ths of the chocolate bar.
          </p>

          <div className="flex gap-4 items-center">
            <div className="flex border-2 border-blue-400">
              {[...Array(8)].map((_, index) => (
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
              <span>3</span>
              <div className="border-t border-black w-4"></div>
              <span>8</span>
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
                  <p className="italic text-lg">4 more pieces</p>
                  <p className="italic text-lg">from a friend</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 items-center">
              <div className="flex">
                {[...Array(8)].map((_, index) => (
                  <div
                    key={index}
                    className={`
                      w-12 h-12 border border-black
                      ${index >= 3 && index <= 6 ? 'bg-[#5B361B]' : 'bg-[#AD9889]'}
                    `}
                  />
                ))}
              </div>

              <div className="flex flex-col items-center text-2xl">
                <span>4</span>
                <div className="border-t border-black w-4"></div>
                <span>8</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="space-y-4">
              <p>
                <span className="font-bold">Step 2:</span> Select the pieces you now have.
              </p>

              <div className="flex gap-4 items-center">
                <div className="flex">
                  {[...Array(8)].map((_, index) => (
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
                    onChange={(e) => setNumerator(e.target.value)}
                    className={`w-8 h-8 border-2 text-center rounded-md transition-colors duration-300
                      ${numerator === '7' ? 'bg-[#66CDAA] border-[#66CDAA]' : 'border-gray-300'}
                      ${step2Pieces.length === 7 && numerator === '' ? 'animate-pulse' : ''}
                    `}
                    placeholder={step2Pieces.length === 7 ? '?' : ''}
                    maxLength={1}
                  />
                  <div className="border-t border-black w-4"></div>
                  <input
                    type="text"
                    value={denominator}
                    onChange={(e) => setDenominator(e.target.value)}
                    className={`w-8 h-8 border-2 text-center rounded-md transition-colors duration-300
                      ${denominator === '8' ? 'bg-[#66CDAA] border-[#66CDAA]' : 'border-gray-300'}
                      ${step2Pieces.length === 7 && denominator === '' ? 'animate-pulse' : ''}
                    `}
                    placeholder={step2Pieces.length === 7 ? '?' : ''}
                    maxLength={1}
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

      {/* Footer */}
      {showFooter && (
        <div className="absolute bottom-0 left-0 right-0 bg-[#66CDAA] p-4">
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

