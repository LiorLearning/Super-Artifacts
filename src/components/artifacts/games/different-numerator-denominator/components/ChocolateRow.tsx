import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { PocketKnifeIcon as Knife } from 'lucide-react'
import { FractionInput } from './FractionInput'
import { ChocolateBar } from './ChocolateBar'

interface ChocolateRowProps {
  multiplierSelected: boolean;
  onMultiplierClick: () => void;
  multiplier: number;
  originalPieces: number;
  originalFilled: number;
  multipliedPieces: number;
  multipliedFilled: number;
  fraction: {
    numerator: string;
    denominator: string;
    onNumeratorChange: (value: string) => void;
    onDenominatorChange: (value: string) => void;
    correctValues?: {
      numerator: string;
      denominator: string;
    };
  };
}

export const ChocolateRow = ({
  multiplierSelected,
  onMultiplierClick,
  multiplier,
  originalPieces,
  originalFilled,
  multipliedPieces,
  multipliedFilled,
  fraction
}: ChocolateRowProps) => {
  const [denominatorWasFocused, setDenominatorWasFocused] = useState(false);
  const [numeratorWasFocused, setNumeratorWasFocused] = useState(false);

  const updatedFraction = {
    ...fraction,
    focusDenominator: multiplierSelected && !denominatorWasFocused && fraction.numerator !== '',
    focusNumerator: multiplierSelected && !numeratorWasFocused && fraction.denominator !== '',
    onDenominatorChange: (value: string) => {
      fraction.onDenominatorChange(value);
      if (value !== '' && fraction.numerator === '') {
        setNumeratorWasFocused(false);
      }
    },
    onNumeratorChange: (value: string) => {
      fraction.onNumeratorChange(value);
      if (value !== '' && fraction.denominator === '') {
        setDenominatorWasFocused(false);
      }
    }
  };

  useEffect(() => {
    if (!multiplierSelected) {
      setDenominatorWasFocused(false);
      setNumeratorWasFocused(false);
    }
  }, [multiplierSelected]);

  return (
    <div className="flex items-center justify-center gap-8">
      <Button
        onClick={onMultiplierClick}
        className={`rounded-lg w-16 h-16 flex items-center justify-center ${multiplierSelected ? 'bg-[#2EA500]' : 'bg-gray-500'} hover:${multiplierSelected ? 'bg-[#2EA500]/90' : 'bg-gray-700'}`}
      >
        <div className="flex items-center gap-1">
          <Knife className="w-6 h-6" />
          <span className="text-xl font-bold">{multiplier}</span>
        </div>
      </Button>
      <div className="w-[480px]">
        {!multiplierSelected ? (
          <ChocolateBar pieces={originalPieces} filledPieces={originalFilled} />
        ) : (
          <ChocolateBar pieces={multipliedPieces} filledPieces={multipliedFilled} />
        )}
      </div>
      <FractionInput {...updatedFraction} />
    </div>
  );
}; 