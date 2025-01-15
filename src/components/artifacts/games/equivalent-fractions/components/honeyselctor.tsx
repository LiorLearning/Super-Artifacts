import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import { sounds } from '../utils/sounds';

export default function HoneySelector({options, selectedHoney, setSelectedHoney}: {options: number[], selectedHoney: number | null, setSelectedHoney: (value: number) => void}) {
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
    sounds.button()
    setSelectedHoney(value)
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="text-2xl py-4 bg-red-500 flex justify-center items-center outline-none border-none w-full text-left px-4 rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedHoney && selectedHoney}
        <span>
        🍯
        </span>
        <ChevronDown className="w-6 h-6 right-2 bottom-1" />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded mt-1">
          {options.map((pieces) => (
            <div
              key={pieces}
              className="text-2xl bg-red-200 hover:bg-red-300 cursor-pointer px-4 py-2 flex items-center"
              onClick={() => handleSelect(pieces)}
            >
              {pieces} 🍯
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
