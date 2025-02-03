import React from 'react';
import { MixedFraction } from '../../game-state';

interface DraggableNumberProps {
  fraction: MixedFraction;
  onDragStart: (e: React.DragEvent) => void;
}

export default function DraggableNumber({ fraction, onDragStart }: DraggableNumberProps) {
  return (
    <div
      draggable
      onDragStart={onDragStart}
      className="inline-flex items-center bg-white border-2 border-gray-300 rounded-md p-2 cursor-move"
    >
      <span className="text-2xl">{fraction.whole}</span>
      <div className="flex flex-col ml-1">
        <span className="text-sm">{fraction.numerator}</span>
        <div className="h-px bg-black my-1"></div>
        <span className="text-sm">{fraction.denominator}</span>
      </div>
    </div>
  );
}