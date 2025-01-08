import { goToStep } from "../utils/helper";
import { useGameState } from '../state-utils';
import { COLORS } from '../utils/types';
import { Button } from '@/components/custom_ui/button';
import { useEffect, useState } from 'react';
import { nextStep } from '../utils/helper';
import { PocketKnife } from 'lucide-react';

interface MultiplesGridProps {
  number1: number;
  number2: number;
  onSelectCommonMultiple?: (multiple: number) => void;
  gcd?: number;
  lcd?: number;
  ecd?: number;
  onSuccess: () => void;
}

export default function MultiplesGrid({ number1, number2, onSelectCommonMultiple, gcd, lcd, ecd, onSuccess }: MultiplesGridProps) {
  const maxMultiple = Math.max(number1, number2);
  const getMultiples = (num: number) => Array.from({ length: maxMultiple }, (_, i) => num * (i + 1));
  const [selectedMultiple, setSelectedMultiple] = useState<number | null>(null);
  const [answer, setAnswer] = useState<string>('');
  const [answers, setAnswers] = useState({
    lcd: '',
    ecd: ''
  });

  const handleSelectMultiple = (multiple: number) => {
    setSelectedMultiple(multiple);
    onSelectCommonMultiple?.(multiple);
  };

  const getColor = (multiple: number, selectedMultiple: number) => {
    if (multiple === selectedMultiple) {
      if (multiple === lcd) {
        return COLORS.lightGreen;
      } else if (multiple === ecd) { 
        return COLORS.lightPurple;
      } else {
        return COLORS.pinkLight;
      }
    }
    return COLORS.gray;
  }

  useEffect(() => {
    if (gcd && parseInt(answer) === gcd) {
      onSuccess();
    }
  }, [answer]);

  useEffect(() => {
    if (answers.lcd === lcd?.toString() && answers.ecd === ecd?.toString()) {
      onSuccess();
    }
  }, [answers]);

  const renderAnswerInput = () => {
    if (gcd) {
      return (
        <div className="flex items-center gap-2 mt-4">
          <span className="text-2xl">Common denominator is</span>
          <input
            type="text"
            className="w-16 h-12 border-2 rounded-md text-center text-lg"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-4 mt-4">
        <div className="flex flex-col items-center justify-center text-2xl">
          Common denominators:
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl">Least common denominator (LCD) =</span>
          <input
            type="text"
            className="w-16 h-12 border-2 rounded-md text-center text-lg"
            style={{
              backgroundColor: answers.lcd === lcd!.toString() ? COLORS.lightGreen : COLORS.gray
            }}
            value={answers.lcd}
            onChange={(e) => setAnswers(prev => ({ ...prev, lcd: e.target.value }))}
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl">Easiest common denominator (ECD) = product of {number1} and {number2}</span>
          <input
            type="text"
            className="w-16 h-12 border-2 rounded-md text-center text-lg"
            style={{
              backgroundColor: answers.ecd === ecd!.toString() ? COLORS.lightPurple : COLORS.gray
            }}
            value={answers.ecd}
            onChange={(e) => setAnswers(prev => ({ ...prev, ecd: e.target.value }))}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center gap-4 max-w-xl mx-auto m-4">
      {/* Knife row */}
      <div className="flex items-center gap-4 w-full">
        <div className="flex" style={{ marginLeft: '9.4rem' }}>
          {Array.from({ length: maxMultiple }, (_, index) => index + 1).map((multiplier) => (
            <Button 
              key={multiplier} // Added key prop
              className={`mx-2 w-12 h-12 rounded-lg flex items-center justify-center`}
              style={{
                backgroundColor: COLORS.gray,
              }}
              onClick={() => {}}
            >
              <PocketKnife className="w-6 h-6" /> {multiplier}
            </Button>
          ))}
        </div>
      </div>
      
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
              key={multiple} // Added key prop
              className={`w-12 h-12 rounded-md border-2 flex items-center justify-center`}
              style={{
                backgroundColor: getColor(multiple, selectedMultiple!)
              }}
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
              key={multiple} // Added key prop
              className={`w-12 h-12 rounded-md border-2 flex items-center justify-center`}
              style={{
                backgroundColor: getColor(multiple, selectedMultiple!)
              }}
              onClick={() => handleSelectMultiple(multiple)}
            >
              {multiple}
            </Button>
          ))}
        </div>
      </div>

      {renderAnswerInput()}
    </div>
  );
}