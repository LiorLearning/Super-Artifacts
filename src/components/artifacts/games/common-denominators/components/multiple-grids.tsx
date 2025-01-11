import { COLORS } from '../utils/types';
import { Button } from '@/components/custom_ui/button';
import { useEffect, useState } from 'react';

interface BaseMultiplesGridProps {
  number1: number;
  number2: number;
  onSuccess: () => void;
  onSelectKnife?: (index: number) => void;
}

interface GCDMultiplesGridProps extends BaseMultiplesGridProps {
  gcd: number;
}

interface LCDECDMultiplesGridProps extends BaseMultiplesGridProps {
  lcd: number;
  ecd: number;
}

const renderMultiplesRow = (
  number: number, 
  getMultiples: (num: number) => number[], 
  selectedMultiple: number[],
) => (
  <div className="flex items-center gap-4 w-full">
    <div className="w-36 text-white px-4 py-2 text-center" style={{
      backgroundColor: COLORS.pink
    }}>
      Multiples of {number}
    </div>
    <div className="flex gap-4">
      {getMultiples(number).map((multiple) => (
        <Button
          key={multiple}
          className={`w-12 h-12 rounded-md border-2 flex items-center justify-center`}
          style={{
            backgroundColor: getColor(multiple, selectedMultiple)
          }}
        >
          {multiple}
        </Button>
      ))}
    </div>
  </div>
);

const getColor = (multiple: number, selectedMultiple: number[]) => {
  if (selectedMultiple.includes(multiple)) {
    if (multiple === selectedMultiple[0]) {
      return COLORS.lightPurple;
    } else if (multiple === selectedMultiple[1]) {
      return COLORS.lightGreen;
    }
    return COLORS.pink;
  }
  return COLORS.gray;
};

const GCDMultiplesGrid = ({ number1, number2, gcd, onSuccess, onSelectKnife }: GCDMultiplesGridProps) => {
  const maxMultiple = Math.max(number1, number2);
  const getMultiples = (num: number) => Array.from({ length: maxMultiple }, (_, i) => num * (i + 1));
  const selectedMultiple = [number1 * number2];
  const [answer, setAnswer] = useState<string>('');

  useEffect(() => {
    if (parseInt(answer) === gcd) {
      onSuccess();
    }
  }, [answer]);

  return (
    <div className="flex flex-col items-center gap-4 max-w-xl mx-auto m-4">
      {renderKnifeRow(maxMultiple, onSelectKnife)}
      {renderMultiplesRow(number1, getMultiples, selectedMultiple)}
      {renderMultiplesRow(number2, getMultiples, selectedMultiple)}
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

const LCDECDMultiplesGrid = ({ number1, number2, lcd, ecd, onSuccess, onSelectKnife }: LCDECDMultiplesGridProps) => {
  const maxMultiple = Math.max(number1, number2);
  const [answers, setAnswers] = useState({
    lcd: '',
    ecd: ''
  });

  const [showSecondRow, setShowSecondRow] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);

  useEffect(() => {
    if (answers.lcd === lcd.toString() && answers.ecd === ecd.toString()) {
      onSuccess();
    }
  }, [answers]);

  return (
    <div className="flex flex-col items-center gap-4 max-w-xl mx-auto m-4">
      {renderKnifeRow(maxMultiple, onSelectKnife)}
      <MultiplesInputRow number={number1} maxMultiple={maxMultiple} lcd={lcd} ecd={ecd} onSuccess={() => setShowSecondRow(true)} />
      {showSecondRow && <MultiplesInputRow number={number2} maxMultiple={maxMultiple} lcd={lcd} ecd={ecd} onSuccess={() => setShowQuestion(true)} />}
      {showQuestion && (
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
                backgroundColor: answers.lcd === lcd.toString() ? COLORS.lightGreen : COLORS.gray
              }}
              value={answers.lcd}
              onChange={(e) => setAnswers(prev => ({ ...prev, lcd: e.target.value }))}
            />
          </div>
          {showSecondRow && (
            <div className="flex items-center gap-2">
              <span className="text-2xl">Easiest common denominator (ECD) = product of {number1} and {number2}</span>
              <input
                type="text"
                className="w-16 h-12 border-2 rounded-md text-center text-lg"
                style={{
                  backgroundColor: answers.ecd === ecd.toString() ? COLORS.lightPurple : COLORS.gray
                }}
                value={answers.ecd}
                onChange={(e) => setAnswers(prev => ({ ...prev, ecd: e.target.value }))}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Helper functions for rendering common UI elements
const renderKnifeRow = (maxMultiple: number, onSelectKnife?: (index: number) => void) => (
  <div className="flex items-center gap-4 w-full">
    <div className="flex" style={{ marginLeft: '9.4rem' }}>
      {Array.from({ length: maxMultiple }, (_, index) => index + 1).map((multiplier) => (
        <Button 
          key={multiplier}
          className={`mx-2 w-12 h-12 rounded-lg flex items-center justify-center`}
          style={{ backgroundColor: COLORS.gray }}
          onClick={() => onSelectKnife?.(multiplier)}
        >
          <span className="text-2xl">🔪</span> {multiplier}
        </Button>
      ))}
    </div>
  </div>
);

const MultiplesInputRow: React.FC<{
  number: number, 
  maxMultiple: number,
  lcd: number,
  ecd: number,
  onSuccess: () => void
}> = ({ number, maxMultiple, lcd, ecd, onSuccess }) => {
  const [multiples, setMultiples] = useState<string[]>(Array(maxMultiple).fill(''));

  useEffect(() => {
    const allCorrect = multiples.every((multiple, index) => multiple === (number * (index + 1)).toString());  
    if (allCorrect) {
      onSuccess();
    }
  }, [multiples]);

  const getInputColor = (multiple: string, index: number) => {
    const answer = number * (index + 1);
    if (multiple === '' || answer.toString().length !== multiple.length) {
      return COLORS.white;
    }
    if (answer !== parseInt(multiple)) {
      return COLORS.lightRed;
    }
    if (multiple === lcd.toString()) {
      return COLORS.lightPurple;
    } else if (multiple === ecd.toString()) {
      return COLORS.lightGreen;
    }
    return COLORS.gray;
  };

  return (
    <div className="flex items-center gap-4 w-full">
      <div className="w-36 text-white px-4 py-2 text-center" style={{
        backgroundColor: COLORS.pink
      }}>
        Multiples of {number}
      </div>
      {multiples.map((multiple, index) => (
        <div className="flex flex-col items-center" key={`mult1-${index}`}>
          <input
            key={index}
            type="text"
            className="w-12 h-12 rounded-md border-2 text-center"
            value={multiple}
            style={{
              backgroundColor: getInputColor(multiple, index)
            }}
            onChange={(e) => {
              setMultiples(prev => {
                const newMultiples = [...prev];
                newMultiples[index] = e.target.value;
                return newMultiples;
              })
            }}
          />
        </div>
      ))}
    </div>
  );
};



export default function MultiplesGrid(props: GCDMultiplesGridProps | LCDECDMultiplesGridProps) {
  if ('gcd' in props) {
    return <GCDMultiplesGrid {...props} />;
  }
  return <LCDECDMultiplesGrid {...props} />;
}