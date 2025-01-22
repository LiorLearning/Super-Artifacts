import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

export default function KnifeSelector({options, selectedKnife, setSelectedKnife}: {options: number[], selectedKnife: number, setSelectedKnife: (value: number) => void}) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (value: number) => {
    setSelectedKnife(value)
    setIsOpen(false)
  }

  const handleReset = () => {
    setSelectedKnife(1)
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex flex-col-reverse gap-2">
        <button
          className="text-lg py-4 bg-[#FF497C] flex-1 flex justify-center items-center outline-none border-none text-left px-4 rounded"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedKnife !== 1 && selectedKnife}
          <span className='text-lg'>
          🔪
          </span>
          <ChevronDown className="w-6 h-6 right-2 bottom-1" />
        </button>
        {/* {selectedKnife && ( */}
          <button
            onClick={handleReset}
            className="text-md bg-[#FF497C] flex justify-center items-center outline-none border-none px-4 rounded hover:bg-[#FF497C]/80"
            style={{opacity: selectedKnife ? 1 : 0.5}}
          >
            Reset
          </button>

      </div>
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded mt-1">
          {options.map((pieces) => (
            <div
              key={pieces}
              className="text-lg bg-[#FF497C]/40 hover:bg-[#FF497C]/60 cursor-pointer px-4 py-2 flex items-center"
              onClick={() => handleSelect(pieces)}
            >
              {pieces} 🔪
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
