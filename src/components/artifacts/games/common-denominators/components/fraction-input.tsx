import { Input } from "@/components/custom_ui/input"
import { Check } from 'lucide-react'
import { useEffect } from "react";

interface FractionInputProps {
  numerator: string;
  denominator: string;
  onNumeratorChange: (value: string) => void;
  onDenominatorChange: (value: string) => void;
  focusNumerator: boolean;
  focusDenominator: boolean;
  correctValues?: {
    numerator: string;
    denominator: string;
  };
}

export const FractionInput = ({
  numerator,
  denominator,
  onNumeratorChange,
  onDenominatorChange,
  focusNumerator,
  focusDenominator,
  correctValues
}: FractionInputProps) => {
  const isCorrect = correctValues &&
    numerator === correctValues.numerator &&
    denominator === correctValues.denominator;
  
  useEffect(() => {
    if (numerator === '') {
      focusNumerator
    }
  }, [denominator])

  useEffect(() => {
    if (denominator === '') {
      focusDenominator && onDenominatorChange('')
    }
  }, [numerator])

  return (
    <div className="relative flex flex-col items-center gap-2">
      <Input
        type="text"
        value={numerator}
        onChange={(e) => onNumeratorChange(e.target.value)}
        className="w-12 h-12 text-center text-2xl font-bold border rounded-lg"
        maxLength={1}
        autoFocus={focusNumerator}
      />
      <div className="border-t-2 border-black w-8"></div>
      <Input
        type="text"
        value={denominator}
        onChange={(e) => onDenominatorChange(e.target.value)}
        className="w-12 h-12 text-center text-2xl font-bold border rounded-lg"
        maxLength={2}
        autoFocus={focusDenominator}
      />
      {isCorrect && (
        <Check className="left-full absolute w-6 h-6 text-green-500" />
      )}
    </div>
  );
}; 