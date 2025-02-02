import { useGameState } from '../state-utils';
import Header from '../components/header';
import { BaseProps } from '../utils/types';
import { Button } from '@/components/ui/button';
import Bg from '../components/bg';
import {ConsoleUnit, Console} from '../components/console';
import { BlueBox, DoubleBlueBox } from '../components/blue';
import { MixedFractionBox } from '../components/mixedFraction';
import { useState } from 'react';

export default function FirstScreen({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { variable } = gameStateRef.current.state1;

  const [units, setUnits] = useState<ConsoleUnit[]>([]);

  return (
    <Bg>
      <Header text="Level 1 : Create Fractions" active={true} />
      <div className="max-w-screen-md mx-auto">
        <Console 
          units={units}
          setUnits={setUnits}
        />

        <BlueBox
          className="text-2xl mt-8"
        >
          Next &gt; &gt; 
        </BlueBox>


      </div>
    </Bg>
  );
}