'use client';

import { useState } from 'react';
import './chocolate.css';
import useSound from 'use-sound';

export interface BarState {
    parts: number;
    selectedParts: number[];
  }
  
export function Bar({ 
  parts, 
  selectedParts,
  onCut, 
  onSelect,
  maxParts,
  numToSelect,
  label 
}: { 
  parts: number;
  selectedParts: number[];
  onCut?: () => void;
  onSelect?: (part: number) => void;
  maxParts: number;
  numToSelect: number;
  label: string;
}) {
  const isLargeDenominator = maxParts > 12;
  const [playBreakSound] = useSound('sounds/chocolate-break.mp3', {
    volume: 0.5,
    interrupt: true
  });
  const [isHammerSwinging, setIsHammerSwinging] = useState(false);

  // Handle break with sound
  const handleBreak = () => {
    setIsHammerSwinging(true);
    playBreakSound();
    if (onCut) onCut();
    setTimeout(() => setIsHammerSwinging(false), 300); // Match animation duration
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-6">
        {/* Label */}
        {/* <div className="w-24 text-right">
          <span className="text-lg font-semibold text-gray-700">{label}</span>
        </div>   */}

        {/* Chocolate Bar */}
        <div className="flex-1 relative">
          <div className={`${isLargeDenominator ? 'h-24' : 'h-32'} 
            bg-gradient-to-br from-[#654321] to-[#3c280d] 
            rounded-2xl overflow-hidden flex shadow-lg transform transition-transform duration-300
            border-4 border-[#2c1810]`}
            style={{
              boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.1), 0 4px 6px rgba(0,0,0,0.2)'
            }}>
            {Array.from({ length: parts }).map((_, index) => (
              <div
                key={index}
                className={`h-full relative transition-all duration-300 ease-bounce
                  ${selectedParts.includes(index) 
                    ? 'bg-gradient-to-b from-[#8B4513] to-[#654321] scale-y-105' 
                    : onSelect 
                      ? 'hover:bg-gradient-to-b hover:from-[#5c4033] hover:to-[#3c280d] hover:scale-y-105' 
                      : ''
                  }
                  ${onSelect && selectedParts.length < numToSelect ? 'cursor-pointer' : ''}`}
                style={{ 
                  width: `${100 / parts}%`,
                  borderRight: index < parts - 1 
                    ? `${isLargeDenominator ? 2 : 4}px dashed rgba(44, 24, 16, 0.8)` 
                    : 'none',
                  boxShadow: selectedParts.includes(index) 
                    ? 'inset 0 0 10px rgba(0,0,0,0.3)' 
                    : 'inset 0 1px 3px rgba(255,255,255,0.1)'
                }}
                onClick={() => {
                  if (onSelect && selectedParts.length < numToSelect && !selectedParts.includes(index)) {
                    onSelect(index);
                  }
                }}
              >
                {/* Chocolate texture */}
                <div className="absolute inset-0 grid grid-rows-3 gap-1 p-1">
                  {[0, 1, 2].map((row) => (
                    <div 
                      key={row}
                      className="w-full h-full rounded-sm bg-[#2c1810] opacity-20"
                    />
                  ))}
                </div>

                {selectedParts.includes(index) && !isLargeDenominator && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/90 rounded-full p-2 shadow-lg transform -rotate-12 animate-bounce-slow">
                      <span className="text-xl font-bold text-[#654321]">1/{parts}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Fraction display for large denominators */}
          {isLargeDenominator && selectedParts.length > 0 && (
            <div className="absolute -right-20 top-1/2 transform -translate-y-1/2">
              <div className="bg-white rounded-xl p-3 shadow-lg">
                <span className="text-xl font-bold text-[#654321]">
                  {selectedParts.length}/{parts}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Break Button */}
        <div className="w-24 mr-10">
        {onCut && (
          <button
            onClick={handleBreak}
            disabled={parts >= maxParts}
            className={`px-6 py-4 rounded-xl shadow-lg transition-all duration-300
              flex items-center gap-3 whitespace-nowrap
              ${parts >= maxParts 
                ? 'bg-gray-300 cursor-not-allowed' 
                : 'bg-gradient-to-r from-[#8B4513] to-[#654321] text-white hover:shadow-xl hover:scale-105 active:scale-95'}`}
          >
            {/* <span className={`text-2xl transform transition-transform duration-300 ${isHammerSwinging ? 'hammer-swing' : ''}`}>
              🔪
            </span> */}
            <span className="text-lg font-bold">Split!</span>
          </button>
        )}
        </div>
      </div>  

      {/* Progress indicators */}
      <div className="absolute -bottom-6 left-0 right-0 flex justify-center gap-4">

        {onSelect && (
          <div className="bg-[#654321] text-white rounded-full px-3 py-1 text-sm font-medium">
            Selected: {selectedParts.length} / {numToSelect}
          </div>
        )}
      </div>
    </div>
  );
}