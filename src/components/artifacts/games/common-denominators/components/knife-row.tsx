import { Fraction } from '../game-state';
import { Button } from '@/components/custom_ui/button';
import { Input } from '@/components/custom_ui/input';
import { PocketKnife } from 'lucide-react';
import { useEffect, useState } from 'react';
import { COLORS } from '../utils/types';


interface KnifeRowProps {
  fraction: Fraction;
  index: number;
  input: 'none' | 'one' | 'two';
  onSelectMultiplier: (multiplier: number) => void;
}

export default function KnifeRow({fraction, index, input, onSelectMultiplier} : KnifeRowProps) {
  const [factor, setFactor] = useState('')
  const [answer, setAnswer] = useState('')

  useEffect(() => {
    if (parseInt(fraction.denominator) * index === parseInt(answer)) {
      onSelectMultiplier(index)
    }
  }, [factor, answer])

  return (
    <div className="flex items-center gap-4 rounded-lg w-full max-w-3xl" style={{
      backgroundColor: COLORS.pinkLight
    }}>
      <Button 
        className={`mx-2 w-12 h-12 rounded-lg flex items-center justify-center`}
        style={{
          backgroundColor: COLORS.gray,
        }}
        onClick={() => {
          onSelectMultiplier(index)
        }}
      >
        <PocketKnife className="w-6 h-6" /> {index}
      </Button>
      {input === 'one' ? (
        <div className="flex items-center gap-2 text-xl p-4">
          <div className="flex items-center gap-2 text-xl">
            <span>{fraction.denominator} pieces, not split any further, give {fraction.denominator} X {index} =</span>
            <Input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-16 h-12 text-center text-xl font-bold"
              maxLength={3}
            />
            <span>total pieces</span>
          </div>
        </div>
      ) : input === 'two' ? (
        <div className="flex items-center gap-2 text-xl p-4">
          <div className="flex items-center gap-2 text-xl">
            <span>{fraction.denominator} pieces, not split any further, give {fraction.denominator} X</span>
            <Input
              type="text"
              value={factor}
              onChange={(e) => setFactor(e.target.value)}
              className="w-16 h-12 text-center text-xl font-bold"
              maxLength={3}
            />
            <span>=</span>
            <Input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-16 h-12 text-center text-xl font-bold"
              maxLength={3}
            />
            <span>total pieces</span>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-xl p-4">
          <span>{fraction.denominator} pieces, not split any further, give {fraction.denominator} X {fraction.numerator} = total pieces</span>
        </div>
      )}
    </div>
  )
}