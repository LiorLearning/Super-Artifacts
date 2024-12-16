import React from 'react';
import { FaHammer } from 'react-icons/fa';
import { IoMdCheckmark } from 'react-icons/io';
import { MdJoinInner } from 'react-icons/md';

interface BarProps {
  parts: number;
  selectedParts: number[];
  onCut?: () => void;
  onJoin?: () => void;
  onSelect?: (part: number) => void;
  maxParts: number;
  numToSelect: number;
  label: string;
}

export default function Bar({
  parts,
  selectedParts,
  onCut,
  onJoin,
  onSelect,
  maxParts,
  numToSelect,
  label
}: BarProps) {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex items-center space-x-4 mb-2">
        <h3 className="text-lg font-semibold text-[#2c1810]">{label}</h3>
        {onCut && parts < maxParts && (
          <button
            onClick={onCut}
            className="p-2 bg-[#8B4513] text-white rounded-full hover:bg-[#654321] 
              transition-all duration-300 hover:scale-110 active:scale-95"
            title="Break into more pieces"
          >
            <FaHammer className="w-5 h-5 animate-hammer-swing" />
          </button>
        )}
        {onJoin && parts > 1 && (
          <button
            onClick={onJoin}
            className="p-2 bg-[#8B4513] text-white rounded-full hover:bg-[#654321] 
              transition-all duration-300 hover:scale-110 active:scale-95"
            title="Join pieces"
          >
            <MdJoinInner className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="flex w-full max-w-2xl bg-[#2c1810] p-1 rounded-xl">
        {Array.from({ length: parts }).map((_, index) => {
          const isSelected = selectedParts.includes(index);
          return (
            <div
              key={index}
              onClick={() => onSelect?.(index)}
              className={`
                flex-1 aspect-[2/1] relative cursor-pointer
                transition-all duration-300 ease-in-out
                ${index === 0 ? 'rounded-l-lg' : ''}
                ${index === parts - 1 ? 'rounded-r-lg' : ''}
                ${
                  isSelected
                    ? 'ring-4 ring-yellow-300 ring-opacity-70 scale-95 z-10'
                    : 'hover:ring-2 hover:ring-yellow-200 hover:ring-opacity-50 hover:scale-105'
                }
              `}
            >
              <div
                className={`
                  absolute inset-0 m-0.5 rounded-md
                  bg-gradient-to-br from-[#8B4513] to-[#654321]
                  transition-all duration-300
                  ${isSelected ? 'shadow-lg brightness-110' : 'hover:brightness-125'}
                `}
              >
                {isSelected && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <IoMdCheckmark 
                      className="w-6 h-6 text-yellow-300 animate-bounce-slow" 
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selection Counter */}
      {selectedParts.length > 0 && (
        <div className="text-center text-[#2c1810] font-semibold animate-fade-in">
          Selected: {selectedParts.length} / {numToSelect} pieces
        </div>
      )}
    </div>
  );
}
