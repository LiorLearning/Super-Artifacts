import { useGameState } from '../state-utils';
import Header from '../components/header';
import { BaseProps } from '../utils/types';
import { Button } from '@/components/ui/button';
import Bg from '../components/bg';
import {consoletofraction, ConsoleUnit, Console} from '../components/console';
import { BlueBox, BlueText, DoubleBlueBox } from '../components/blue';
import { MixedFractionBox } from '../components/mixedFraction';
import { useState, useEffect, useRef } from 'react';
import { goToStep } from '../utils/helper';

export default function FirstScreen({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const {step, question1, question2 } = gameStateRef.current.state1;

  const [units, setUnits] = useState<ConsoleUnit[]>([]);

  const start = useRef(false);

  useEffect(() => {
    if (!start.current) {
      sendAdminMessage("agent",`Welcome to Level 1: Create Fractions! Your task is to create ${question1.whole} ${question1.numerator}/${question1.denominator} using the tools. Ready to make pies into fractions?`);
      start.current = true;
    }
  }, []);

  useEffect(() => {
    if (units.length > 0) {
      const { whole, numerator, denominator } = consoletofraction(units);
      console.log(whole, numerator, denominator);

      if (step === 0 && whole === question1.whole && numerator === question1.numerator && denominator === question1.denominator) {
        goToStep('first', setGameStateRef, 1);  
      } else if (step > 1 && whole === question2.whole && numerator === question2.numerator && denominator === question2.denominator) {
        console.log("Reached Step 2");
        sendAdminMessage("agent",`Amazing work! You've created ${question2.whole} ${question2.numerator}/${question2.denominator}. Now, what do you feel like doing next? Take your pick!`, () => goToStep('first', setGameStateRef, 3));
      }
    }
  }, [units]);

  return (
    <Bg>
      <Header text="Level 1 : Create Fractions" active={true} />
      <div className="max-w-screen-md mx-auto">
        <Console 
          fraction={step < 1 ? question1 : question2}
          units={units}
          setUnits={setUnits}
        />


        {step === 1 && (
          <BlueBox
            className="text-2xl mt-8 cursor-pointer text-center"
            onClick={() => {
              goToStep('first', setGameStateRef, 2);
              sendAdminMessage("agent",`This time, your task is to create ${question2.whole} ${question2.numerator}/${question2.denominator}. You already know the tools—let's see how you do!`);
            }}
          >
            Next &gt; &gt; 
          </BlueBox>
        )}

        {step === 3 && (
          <div className="text-2xl text-center mt-8 flex flex-col items-center">
            <p className="text-2xl text-center mt-8">
              <BlueText> What do you want to do now? </BlueText>
            </p>
            <BlueBox
              className="text-2xl mt-8 cursor-pointer"
            >
              I want to create more fractions
            </BlueBox>

            <BlueBox
              className="text-2xl mt-8 cursor-pointer"
              onClick={() => setGameStateRef(prev => ({ ...prev, screen: 'second' }))}
            >
              Ready for the next level !
            </BlueBox>
          </div>
        )}




      </div>
    </Bg>
  );
}