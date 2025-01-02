import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { Button } from '@/components/custom_ui/button';

interface CounterProps {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export const Counter: React.FC<CounterProps> = ({ value, onIncrement, onDecrement }) => {
  return (
    <div className="absolute h-10 flex flex-col w-full justify-center items-center top-10 left-1/2 transform -translate-x-1/2 gap-2">
      <p className="flex">
        <Button onClick={onDecrement} className="text-purple-500" id="decrement-button">
          <Minus size={24} />
        </Button>
        <p className="text-2xl px-4 mx-8 font-bold border-2 border-purple-500 bg-white text-purple-500">
          count
        </p>
        <Button onClick={onIncrement} className="text-purple-500" id="increment-button">
          <Plus size={24} />
        </Button>
      </p>
      <p className="text-4xl font-bold text-purple-500">
        {value}
      </p>
    </div>
  );
};