import { useGameState } from '../state-utils';
import Header from '../components/header';
import { BaseProps, COLORS } from '../utils/types';
import { StepModule } from '../components/stepHeader';
import { useEffect, useState } from 'react';
import { Input } from '@/components/custom_ui/input';
import { goToStep } from '../utils/helper';
import SuccessAnimation from '@/components/artifacts/utils/success-animate';

export default function SixthScreen({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { step, fraction1, fraction2, lcd } = gameStateRef.current.state6;
  
  const [ecdInputs, setEcdInputs] = useState({
    denom1: '',
    denom2: '',
    result: ''
  });
  
  const [lcdInputs, setLcdInputs] = useState({
    multiples1: ['', '', '', '', ''],
    multiples2: ['', '', '', '', ''],
    result: ''
  });

  useEffect(() => {
    if (parseInt(lcdInputs.result) === lcd) {
      goToStep('sixth', setGameStateRef, 2);
    }
  }, [lcdInputs]);

  const handleLcdChange = (row: number, index: number, value: string) => {
    setLcdInputs(prev => {
      const newMultiples = row === 1 ? [...prev.multiples1] : [...prev.multiples2];
      newMultiples[index] = value;
      return {
        ...prev,
        [row === 1 ? 'multiples1' : 'multiples2']: newMultiples
      };
    });
  };

  useEffect(() => {
    if (parseInt(ecdInputs.denom1) * parseInt(ecdInputs.denom2) === parseInt(ecdInputs.result)) {
      console.log('correct');
      goToStep('sixth', setGameStateRef, 1);
    }
  }, [ecdInputs]);

  return (
    <div className="mx-auto pb-48">
      <Header fraction1={fraction1} fraction2={fraction2} />
      
      {/* Step 1 - ECD Section */}
      <div className="flex flex-col items-center justify-center m-4">
        <StepModule color={COLORS.pink} stepNumber={1} numerator1={parseInt(fraction1.numerator)} denominator1={parseInt(fraction1.denominator)} numerator2={parseInt(fraction2.numerator)} denominator2={parseInt(fraction2.denominator)} stepText="FIND ECD" />
        <div className="flex flex-col items-center justify-center mt-4">
          <span className="text-xl">Easiest Common Denominator</span>
        </div>
        <div className="flex items-center gap-4 mt-12">
          <Input
            type="text"
            value={ecdInputs.denom1}
            onChange={(e) => setEcdInputs(prev => ({ ...prev, denom1: e.target.value }))}
            className="w-12 h-12 border-2 border-gray-300 rounded text-center text-xl"
          />
          <span className="text-xl">×</span>
          <Input
            type="text"
            value={ecdInputs.denom2}
            onChange={(e) => setEcdInputs(prev => ({ ...prev, denom2: e.target.value }))}
            className="w-12 h-12 border-2 border-gray-300 rounded text-center text-xl"
          />
          <span className="text-xl">=</span>
          <Input
            type="text"
            value={ecdInputs.result}
            onChange={(e) => setEcdInputs(prev => ({ ...prev, result: e.target.value }))}
            className="w-12 h-12 border-2 border-gray-300 rounded text-center text-xl"
          />
        </div>
      </div>
      
      {step >= 1 &&
        <>
          {/* Step 2 - LCD Section */}
          <div className="flex flex-col items-center justify-center m-4 mt-8">
            <StepModule color={COLORS.pink} stepNumber={2} numerator1={parseInt(fraction1.numerator)} denominator1={parseInt(fraction1.denominator)} numerator2={parseInt(fraction2.numerator)} denominator2={parseInt(fraction2.denominator)} stepText="FIND LCD" />
            <div className="flex flex-col items-center justify-center mt-4">
              <span className="text-xl">Least Common Denominator</span>
            </div>
            
            {/* Multiples of first denominator */}
            <div className="flex flex-col gap-4 mt-4">
              <div className="flex items-center gap-2">
                  <div className="bg-white text-black px-3 py-1 inline-flex flex-col items-center">
                    <span>{fraction1.numerator}</span>
                    <div className="w-3 h-px bg-black" />
                    <span>{fraction1.denominator}</span>
                  </div>
                  <div className="bg-pink-100 px-2 py-1 rounded">
                  Multiples of {fraction1.denominator}
                </div>
                <div className="flex gap-2">
                  {lcdInputs.multiples1.map((value, index) => (
                    <div className="flex flex-col items-center" key={`mult1-${index}`}>
                      <Input
                        type="text"
                        value={value}
                        onChange={(e) => handleLcdChange(1, index, e.target.value)}
                        className="w-12 h-12 border-2 border-gray-300 rounded text-center"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Multiples of second denominator */}
              <div className="flex items-center gap-2">
                <div className="bg-white text-black px-3 py-1 inline-flex flex-col items-center">
                  <span>{fraction1.numerator}</span>
                  <div className="w-3 h-px bg-black" />
                  <span>{fraction2.denominator}</span>
                </div>
                <div className="bg-pink-100 px-2 py-1 rounded">
                  Multiples of {fraction2.denominator}
                </div>
                <div className="flex gap-2">
                  {lcdInputs.multiples2.map((value, index) => (
                    <div className="flex flex-col items-center" key={`mult2-${index}`}>
                      <Input
                        type="text"
                        value={value}
                        onChange={(e) => handleLcdChange(2, index, e.target.value)}
                        className="w-12 h-12 border-2 border-gray-300 rounded text-center"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* LCD Result */}
            <div className="flex items-center gap-2 mt-6">
              <span className="text-3xl">LCD is</span>
              <Input
                type="text"
                value={lcdInputs.result}
                onChange={(e) => setLcdInputs(prev => ({ ...prev, result: e.target.value }))}
                className="w-12 h-12 border-2 border-gray-300 rounded text-center text-xl"
              />
            </div>

            {/* Proceed Button */}
            {step === 2 && <SuccessAnimation />}
          </div>
        </>
      }
    </div>
  );
}