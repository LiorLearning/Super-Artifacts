import React from 'react';

interface SlicerProps {
  options: number[];
  selected: number;
  onSelect: (value: number) => void;
}

export default function Slicer({ options, selected, onSelect }: SlicerProps) {
  return (
    <div className="border-2 border-gray-200 rounded-lg p-4">
      <h3 className="font-bold mb-2">Choose your slicer</h3>
      {options.map((option) => (
        <div
          key={option}
          onClick={() => onSelect(option)}
          className={`flex items-center p-2 cursor-pointer ${
            selected === option ? 'bg-pink-100' : ''
          }`}
        >
          <div className={`w-4 h-4 border-2 rounded-full mr-2 ${
            selected === option ? 'border-pink-500' : 'border-gray-300'
          }`} />
          <span>Slices the pie in {option} pieces</span>
        </div>
      ))}
    </div>
  );
}