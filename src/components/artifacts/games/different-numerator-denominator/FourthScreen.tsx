'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { PocketKnifeIcon as Knife } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface FourthScreenProps {
  onNext: () => void;
  sendAdminMessage: (role: string, content: string) => void;
}


export default function FourthScreen({ onNext, sendAdminMessage }: FourthScreenProps) {
  const router = useRouter()
  const [multiplesOf2, setMultiplesOf2] = useState<string[]>(Array(5).fill(''))
  const [multiplesOf4, setMultiplesOf4] = useState<string[]>(Array(5).fill(''))
  const [isValid, setIsValid] = useState(false)

  const validateMultiplesOf2 = (values: string[]) => {
    return values.every((value, index) => {
      const num = parseInt(value)
      return !isNaN(num) && num === 2 * (index + 1)
    })
  }

  const validateMultiplesOf4 = (values: string[]) => {
    return values.every((value, index) => {
      const num = parseInt(value)
      return !isNaN(num) && num === 4 * (index + 1)
    })
  }

  const handleMultipleChange = (
    index: number,
    value: string,
    setter: (values: string[]) => void,
    values: string[]
  ) => {
    const newValues = [...values]
    newValues[index] = value
    setter(newValues)
  }

  useEffect(() => {
    const isValidMultiplesOf2 = validateMultiplesOf2(multiplesOf2)
    const isValidMultiplesOf4 = validateMultiplesOf4(multiplesOf4)
    setIsValid(isValidMultiplesOf2 && isValidMultiplesOf4)
  }, [multiplesOf2, multiplesOf4])

  const isCommonMultiple = (value: string) => {
    const num = parseInt(value)
    return !isNaN(num) && num % 2 === 0 && num % 4 === 0
  }

  const isLeastCommonMultiple = (value: string) => {
    const num = parseInt(value)
    return num === 4 // 4 is the LCM of 2 and 4
  }

  const getInputStyle = (value: string) => {
    if (!value) return "border-black"
    if (isLeastCommonMultiple(value)) return "bg-[#98FF98] border-[#98FF98]"
    if (isCommonMultiple(value)) return "bg-[#FFB6C1] border-[#FFB6C1]"
    return "border-red-500"
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
            <div className="text-4xl font-bold">4</div>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-white p-8 flex flex-col items-center gap-16">
        <section className="w-full flex flex-col items-center gap-8">
          <div className="flex items-center gap-4 h-14">
            <div className="border-2 border-[#FF497C] px-6 flex items-center h-full">
              <span className="text-[#FF497C] font-bold text-xl">
                STEP 1
              </span>
            </div>
            <div className="bg-[#FF497C] px-6 flex items-center h-full">
              <span className="text-white font-bold text-xl">
                FIND THE TOTAL PIECES
              </span>
            </div>
          </div>

          <div className="flex justify-center gap-16 w-full">
            {/* 1/2 Chocolate */}
            <div className="flex items-center gap-4">
              <div className="w-[240px] h-20 flex">
                {[...Array(2)].map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex-1 border-2 border-[#5d4037]",
                      i === 0 ? "bg-[#5d4037]" : "bg-[#8d6e63]"
                    )}
                  >
                    <div className="absolute inset-0 border-l-2 border-t-2 border-[#FFFFFF20]"></div>
                    <div className="absolute inset-0 border-r-2 border-b-2 border-[#00000040]"></div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold">1</span>
                <div className="w-8 border-t-2 border-black"></div>
                <span className="text-2xl font-bold">2</span>
              </div>
            </div>

            {/* 1/4 Chocolate */}
            <div className="flex items-center gap-4">
              <div className="w-[240px] h-20 flex">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex-1 border-2 border-[#5d4037]",
                      i === 0 ? "bg-[#5d4037]" : "bg-[#8d6e63]"
                    )}
                  >
                    <div className="absolute inset-0 border-l-2 border-t-2 border-[#FFFFFF20]"></div>
                    <div className="absolute inset-0 border-r-2 border-b-2 border-[#00000040]"></div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold">1</span>
                <div className="w-8 border-t-2 border-black"></div>
                <span className="text-2xl font-bold">4</span>
              </div>
            </div>
          </div>

          <div className="w-full max-w-3xl mt-8">
            {/* Vertical Layout using Flex */}
            <div className="flex flex-col gap-4">
              {/* Headers Row */}
              <div className="flex">
                <div className="w-48 mr-2"/> {/* Empty space for alignment */}
                <div className="flex gap-4 flex-1">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <div key={num} className="flex-1">
                      <div className="w-16 h-16 bg-[#F8E8FF] rounded-lg flex items-center justify-center">
                        <div className="flex items-center gap-1 -rotate-45">
                          <Knife className="w-6 h-6" />
                          <span className="text-xl font-bold">{num}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Multiples of 2 Row */}
              <div className="flex items-center">
                <div className="w-48 bg-[#FF497C] px-4 py-3 mr-2 rounded-lg">
                  <span className="text-white font-bold whitespace-nowrap">
                    Multiples of 2
                  </span>
                </div>
                <div className="flex z-10 gap-4 flex-1">
                  {multiplesOf2.map((value, index) => (
                    <div key={index} className="flex-1">
                      <Input
                        type="text"
                        value={value}
                        onChange={(e) => handleMultipleChange(index, e.target.value, setMultiplesOf2, multiplesOf2)}
                        className={cn(
                          "w-16 h-16 text-center text-xl font-bold border-2 rounded-lg",
                          getInputStyle(value)
                        )}
                        maxLength={2}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Multiples of 4 Row */}
              <div className="flex z-10 items-center">
                <div className="w-48 bg-[#FF497C] px-4 py-3 mr-2 rounded-lg">
                  <span className="text-white font-bold whitespace-nowrap">
                    Multiples of 4
                  </span>
                </div>
                <div className="flex gap-4 flex-1">
                  {multiplesOf4.map((value, index) => (
                    <div key={index} className="flex-1">
                      <Input
                        type="text"
                        value={value}
                        onChange={(e) => handleMultipleChange(index, e.target.value, setMultiplesOf4, multiplesOf4)}
                        className={cn(
                          "w-16 h-16 text-center text-xl font-bold border-2 rounded-lg",
                          getInputStyle(value)
                        )}
                        maxLength={2}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {isValid && (
            <Button
              onClick={() => onNext()}
              className="bg-[#FF497C] text-white px-8 py-2 text-xl font-bold border-2 border-black hover:bg-[#FF497C]/90"
            >
              PROCEED
            </Button>
          )}
        </section>
      </div>
    </div>
  )
}


