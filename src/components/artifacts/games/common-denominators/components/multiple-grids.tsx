import { useGameState } from '../state-utils';
import { COLORS } from '../utils/types';
import { Button } from '@/components/custom_ui/button';
import { useEffect, useState } from 'react';
import { nextStep } from '../utils/helper';

interface MultiplesGridProps {
  number1: number;
  number2: number;
  onSelectCommonMultiple?: (multiple: number) => void;
  gcd: number;
}

export default function MultiplesGrid({ number1, number2, onSelectCommonMultiple, gcd }: MultiplesGridProps) {
  const maxMultiple = Math.max(number1, number2);
  const { setGameStateRef } = useGameState();
  const getMultiples = (num: number) => Array.from({ length: maxMultiple }, (_, i) => num * (i + 1));
  const [selectedMultiple, setSelectedMultiple] = useState<number | null>(null);
  const [answer, setAnswer] = useState<string>('');

  const handleSelectMultiple = (multiple: number) => {
    setSelectedMultiple(multiple);
    onSelectCommonMultiple?.(multiple);
  };

  useEffect(() => {
    console.log('answer', answer)
    console.log('gcd', gcd)
    if (parseInt(answer) === gcd) {
      console.log('correct')
      nextStep('third', setGameStateRef)
    }
  }, [answer])

  return (
    <div className="flex flex-col items-center gap-4 max-w-xl mx-auto m-4">
      {/* First row - multiples of first number */}
      <div className="flex items-center gap-4 w-full">
        <div className="w-36 text-white px-4 py-2 text-center" style={{
          backgroundColor: COLORS.pink
        }}>
          Multiples of {number1}
        </div>
        <div className="flex gap-4">
          {getMultiples(number1).map((multiple, index) => (
            <Button
              key={index}
              className={`w-12 h-12 rounded-md border-2 flex items-center justify-center
                ${multiple === selectedMultiple ? 'bg-pink-500 text-white' : 'bg-white'}`}
              onClick={() => handleSelectMultiple(multiple)}
            >
              {multiple}
            </Button>
          ))}
        </div>
      </div>

      {/* Second row - multiples of second number */}
      <div className="flex items-center gap-4 w-full">
        <div className="w-36 text-white px-4 py-2 text-center" style={{
          backgroundColor: COLORS.pink
        }}>
          Multiples of {number2}
        </div>
        <div className="flex gap-4">
          {getMultiples(number2).map((multiple, index) => (
            <Button
              key={index}
              className={`w-12 h-12 rounded-md border-2 flex items-center justify-center
                ${multiple === selectedMultiple ? 'bg-pink-500 text-white' : 'bg-white'}`}
              onClick={() => handleSelectMultiple(multiple)}
            >
              {multiple}
            </Button>
          ))}
        </div>
      </div>

      {/* Common denominator input */}
      <div className="flex items-center gap-2 mt-4">
        <span className="text-2xl">Common denominator is</span>
        <input
          type="text"
          className="w-16 h-12 border-2 rounded-md text-center text-lg"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
      </div>
    </div>
  );
};