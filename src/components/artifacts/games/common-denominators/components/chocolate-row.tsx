import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { FractionInput } from './fraction-input';
import { ChocolateBar } from './chocolate-bar';
import { Fraction } from '../game-state';

interface ChocolateRowProps {
  multiplier: number;
  originalFraction: Fraction;
  onCorrect: () => void;
  sendAdminMessage: (role: string, content: string) => void;
}

export const ChocolateRow = ({ multiplier, originalFraction, onCorrect, sendAdminMessage }: ChocolateRowProps) => {
  const [multiplierSelected, setMultiplierSelected] = useState(false);
  const [incorrect, setIncorrect] = useState(false);
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
  };

  const handleNumeratorChange = (value: string) => {
    setInputFraction(prev => ({ ...prev, numerator: value }));
  };

  const handleIncorrect = () => {
    setIncorrect(true);
    sendAdminMessage('admin', "Diagnose socratically and ask the user to check the numerator or denominator and try using the knife");
  }

  const updatedFraction = {
    ...inputFraction,
    onDenominatorChange: handleDenominatorChange,
    onNumeratorChange: handleNumeratorChange,
    correctValues: correctFraction,
    onIncorrect: handleIncorrect
  };

  useEffect(() => {
    if (
      inputFraction.numerator === correctFraction.numerator && 
      inputFraction.denominator === correctFraction.denominator
    ) {
      onCorrect();
    }
  }, [inputFraction]);

  const handleMultiplierClick = () => setMultiplierSelected(true);

  return (
    <div className="flex items-center justify-center gap-8">
      <Button
        onClick={handleMultiplierClick}
        className={`rounded-lg w-16 h-16 flex items-center justify-center ${
          multiplierSelected ? 'bg-[#2EA500]' : 'bg-[#DDDDDD]'
        } hover:${multiplierSelected ? 'bg-[#2EA500]/90' : 'bg-[#DDDDDD]/90'}`}
      >
        <div className="flex items-center gap-1">
          <span className="text-2xl">🔪</span>
          <span className="text-xl text-black mb-4">{multiplier}</span>
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