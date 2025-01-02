'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"

interface GameProps {
  sendAdminMessage: (role: string, content: string) => void;
}


export default function Second({ sendAdminMessage }: GameProps) {

  const [greenMarbles, setGreenMarbles] = useState(0)
  const [blueMarbles, setBlueMarbles] = useState(0)
  const [blackMarbles, setBlackMarbles] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [answer, setAnswer] = useState(0)

  const maxGreenMarbles = 7
  const maxBlueMarbles = 5
  const totalMarbles = maxGreenMarbles + maxBlueMarbles

  // useEffect(() => {
  //   const timer = setTimeout(() => setShowAnswer(true), 1000)
  //   return () => clearTimeout(timer)
  // }, [])

  const handleMarbleClick = (color: 'green' | 'blue') => {
    if (color === 'green' && greenMarbles < maxGreenMarbles) {
      setGreenMarbles(prev => prev + 1)
    } else if (color === 'blue' && blueMarbles < maxBlueMarbles) {
      setBlueMarbles(prev => prev + 1)
    }
  }

  const handleBlackMarbleClick = (index: number) => {
    if (blackMarbles < 10 && index >= blackMarbles) {
      setBlackMarbles(prev => prev + 1)
    } else if (index === blackMarbles - 1) {
      setBlackMarbles(prev => prev - 1)
    }
  }

  const handleAnswer = (value: number) => {
    setAnswer(value)
    if (value === totalMarbles) {
      setShowAnswer(true)
      sendAdminMessage('student', 'Correct! 7 + 5 = 12')
    } else {
      sendAdminMessage('student', 'Try again!')
    }
  }

  return (
      <>
      <div className="text-3xl font-bold text-center py-8">
        7 + 5 = ?
      </div>

      <div className={`mx-auto text-xl bg-purple-100 border-2 shadow-[-5px_5px_0_0] border-black p-4 mb-10`}>
        <p className={`font-bold text-center text-purple-600`}>
          Select 7 green and 5 blue marbles
        </p>
      </div>

      <div className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="w-32 text-purple-600 text-lg font-bold leading-none">Pick Green Marbles</span>
            <div className="flex gap-1">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={`green-${i}`}
                  className={`w-6 h-6 rounded-full cursor-pointer transition-colors ${
                    i < greenMarbles ? 'bg-green-500' : 'bg-gray-200'
                  }`}
                  onClick={() => handleMarbleClick('green')}
                />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="w-32 text-purple-600 font-bold leading-none text-lg">Pick Blue Marbles</span>
            <div className="flex gap-1">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={`blue-${i}`}
                  className={`w-6 h-6 rounded-full cursor-pointer transition-colors ${
                    i < blueMarbles ? 'bg-blue-500' : 'bg-gray-200'
                  }`}
                  onClick={() => handleMarbleClick('blue')}
                />
              ))}
            </div>
          </div>
        </div>

        {(greenMarbles > 0 || blueMarbles > 0) && (
          <>
          <div className={`mx-auto text-lg bg-purple-100 border-2 shadow-[-5px_5px_0_0] border-black p-4 mt-16 mb-10`}>
            <p className={`font-bold text-center text-purple-600`}>              
              Select 10 marbles here to fill the container
            </p>
            </div>
            <div className="flex justify-center items-center gap-4">
              <div className="flex gap-1 flex-wrap max-w-[300px]">

                {blackMarbles === 10? 
                <div className='flex flex-col gap-1'>
                  <div className="flex gap-1">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div key={`black-${i}`} className="w-6 h-6 rounded-full bg-black" />
                    ))}
                    <span className="text-2xl">+</span>
                    {Array.from({ length: totalMarbles - 10 }).map((_, i) => (
                      <div key={`remaining-${i}`} className="w-6 h-6 rounded-full bg-blue-500" />
                    ))}
                  </div>
                  <div className='w-full text-center text-2xl font-bold'>
                    10 + {totalMarbles - 10}
                    </div>
                </div>

                :Array.from({ length: greenMarbles + blueMarbles }).map((_, i) => (
                  <div
                    key={`container-${i}`}
                    className={`w-6 h-6 rounded-full cursor-pointer transition-colors ${
                      i < blackMarbles 
                        ? 'bg-black' 
                        : i < greenMarbles 
                          ? 'bg-green-500' 
                          : 'bg-blue-500'
                    }`}
                    onClick={() => handleBlackMarbleClick(i)}
                  />
                ))}
              </div>
            </div>
          </>
        )}

        {greenMarbles === maxGreenMarbles && blueMarbles === maxBlueMarbles && blackMarbles === 10 && (
          <div className="flex justify-center mt-8">
            <span className="text-3xl font-bold text-black0">Answer</span>

            <input
              type='number'
              className="border-2 text-xl font-bold border-black w-16 text-center mx-4 placeholder:color-black"
              placeholder="?"
              value = {answer || ''}
              onChange={(e) => handleAnswer(e.target.value ? parseInt(e.target.value) : 0)}
              disabled={showAnswer}
            />
          </div>
        )}

        {showAnswer && (
          <div className="flex justify-center mt-8">
            <span className="text-3xl font-bold text-black">Correct Answer !!!!</span>
            </div>
        )}
      </> 
 )
}

