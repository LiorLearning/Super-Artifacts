import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { PocketKnifeIcon as Knife } from 'lucide-react';
import { FractionInput } from './fraction-input';
import { ChocolateBar } from './chocolate-bar';
import { Fraction } from '../game-state';
import { nextStep } from '../utils/helper';
import { useGameState } from '../state-utils';

interface ChocolateRowProps {
  multiplier: number;
  originalFraction: Fraction;
}

export const ChocolateRow = ({ multiplier, originalFraction }: ChocolateRowProps) => {
  const { setGameStateRef } = useGameState();
  
  const [denominatorWasFocused, setDenominatorWasFocused] = useState(false);
  const [numeratorWasFocused, setNumeratorWasFocused] = useState(false);
  const [multiplierSelected, setMultiplierSelected] = useState(false);
  
  const multipliedPieces = parseInt(originalFraction.denominator) * multiplier;
  const multipliedFilled = parseInt(originalFraction.numerator) * multiplier;
  
  const correctFraction = {
    numerator: (parseInt(originalFraction.numerator) * multiplier).toString(),
    denominator: (parseInt(originalFraction.denominator) * multiplier).toString()
  };
  
  const [inputFraction, setInputFraction] = useState<Fraction>({
    numerator: '',
    denominator: ''
  });

  const handleDenominatorChange = (value: string) => {
    setInputFraction(prev => ({ ...prev, denominator: value }));
    if (value !== '' && inputFraction.numerator === '') {
      setNumeratorWasFocused(false);
    }
  };

  const handleNumeratorChange = (value: string) => {
    setInputFraction(prev => ({ ...prev, numerator: value }));
    if (value !== '' && inputFraction.denominator === '') {
      setDenominatorWasFocused(false);
    }
  };

  const updatedFraction = {
    ...inputFraction,
    focusDenominator: multiplierSelected && !denominatorWasFocused && inputFraction.numerator !== '',
    focusNumerator: multiplierSelected && !numeratorWasFocused && inputFraction.denominator !== '',
    onDenominatorChange: handleDenominatorChange,
    onNumeratorChange: handleNumeratorChange
  };

  useEffect(() => {
    if (!multiplierSelected) {
      setDenominatorWasFocused(false);
      setNumeratorWasFocused(false);
    }
  }, [multiplierSelected]);

  useEffect(() => {
    if (
      inputFraction.numerator === correctFraction.numerator && 
      inputFraction.denominator === correctFraction.denominator
    ) {
      nextStep('first', setGameStateRef);
    }
  }, [inputFraction]);

  const handleMultiplierClick = () => setMultiplierSelected(true);

  return (
    <div className="flex items-center justify-center gap-8">
      <Button
        onClick={handleMultiplierClick}
        className={`rounded-lg w-16 h-16 flex items-center justify-center ${
          multiplierSelected ? 'bg-[#2EA500]' : 'bg-gray-500'
        } hover:${multiplierSelected ? 'bg-[#2EA500]/90' : 'bg-gray-700'}`}
      >
        <div className="flex items-center gap-1">
          <Knife className="w-6 h-6" />
          <span className="text-xl font-bold">{multiplier}</span>
        </div>
      </Button>
      
      <div className="w-[480px]">
        {!multiplierSelected ? (
          <ChocolateBar 
            pieces={parseInt(originalFraction.denominator)} 
            filledPieces={parseInt(originalFraction.numerator)} 
          />
        ) : (
          <ChocolateBar 
            pieces={multipliedPieces} 
            filledPieces={multipliedFilled} 
          />
        )}
      </div>
      
      <FractionInput {...updatedFraction} />
    </div>
  );
}; 