import { Fraction } from '../game-state';
import { Button } from '@/components/custom_ui/button';
import { Input } from '@/components/custom_ui/input';
import { useEffect, useState } from 'react';
import { COLORS } from '../utils/types';


const InputBox = ({ value, setValue }: { value: string, setValue: (value: string) => void }) => {
  return (
    <Input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="w-12 h-12 text-center text-xl font-bold border border-black"
      maxLength={3}
    />
  )
}


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
        🔪 {index}
      </Button>
      {input === 'one' ? (
        <div className="flex items-center gap-2 text-xl p-4">
          <div className="flex items-center gap-2 text-xl">
            <span>{fraction.denominator} pieces, split into {index} each, give {fraction.denominator} X {index} =</span>
            <InputBox
              value={answer}
              setValue={setAnswer}
            />
            <span>total pieces</span>
          </div>
        </div>
      ) : input === 'two' ? (
        <div className="flex items-center gap-2 text-xl p-4">
          <div className="flex items-center gap-2 text-xl">
            <span>{fraction.denominator} pieces, split into {index} each, give {fraction.denominator} X</span>
            <InputBox
              value={factor}
              setValue={setFactor}
            />
            <span>=</span>
            <InputBox
              value={answer}
              setValue={setAnswer}
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