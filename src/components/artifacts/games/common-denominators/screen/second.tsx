import { useGameState } from '../state-utils';
import Header from '../components/header';
import { BaseProps, COLORS } from '../utils/types';
import { StepModule } from '../components/stepHeader';
import { ChocolateBar, ChocolateBarWithFraction } from '../components/chocolate-bar';
import { Fraction } from '../game-state';
import { goToScreen, goToStep } from '../utils/helper';
import ProceedButton from '../components/proceed-button';

function SelectableChocolateBars({ fraction, selected, onSelect, id }: { fraction: Fraction, selected: boolean, onSelect: () => void, id: number }) {
  return (
    <div key={`chocolate-bar-${id}`} id={id.toString()} className="flex items-center justify-center gap-8 w-full">
      <div className="w-16"></div>
      <ChocolateBarWithFraction fraction={fraction} />
    </div>
  )
}


export default function SecondScreen({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { 
    step, 
    fraction1, 
    fraction2, 
    chocolateFractions,
    selectedChocolate,
    chocolatesWithSameDenominator
  } = gameStateRef.current.state2;

  const setSelectedChocolate = (index: number) => {
    setGameStateRef(prev => {
      const newSelectedChocolate = [...prev.state2.selectedChocolate];
      newSelectedChocolate[index] = !newSelectedChocolate[index];
      return {
        ...prev,
        state2: { 
          ...prev.state2, 
          selectedChocolate: newSelectedChocolate
        }
      };
    });

    chocolatesWithSameDenominator.forEach(index => {
      if (selectedChocolate[index]) {
        goToStep('second', setGameStateRef, 1);
      }
    });
  }

  return (
    <div className="mx-auto">
      <Header fraction1={fraction1} fraction2={fraction2} />
      <div className="flex flex-col items-center justify-center m-4">
        <StepModule color={COLORS.pink} stepNumber={3} stepText="Select chocolate with same denominator" />
      </div>

      <div className="flex flex-col items-center justify-center m-8">
        <span className="text-2xl font-bold">Select the chocolate bars that have the same denominator.</span>
      </div>

      <div className="w-full flex flex-col items-center gap-16">
        {chocolateFractions.map((fraction, index) => (
          <SelectableChocolateBars 
            key={`selectable-chocolate-bar-${index}`}
            fraction={fraction} 
            selected={selectedChocolate[index]} 
            onSelect={() => setSelectedChocolate(index)} 
            id={index}
          />
        ))}
      </div>

      {step === 1 && (
        <ProceedButton onClick={() => goToScreen('third', setGameStateRef)} />
      )}
    </div>
  );
}
