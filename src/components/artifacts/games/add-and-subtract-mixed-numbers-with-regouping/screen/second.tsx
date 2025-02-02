import { useGameState } from '../state-utils';
import Header from '../components/header';
import { BaseProps } from '../utils/types';
import { ConsoleUnit, Console} from '../components/console';
import { BlueBox, BlueText, DoubleBlueBox } from '../components/blue';
import { MixedFractionBox } from '../components/mixedFraction';
import { useState, useEffect, useRef } from 'react';
import { goToStep } from '../utils/helper';
import Bg from '../components/bg';


export default function SecondScreen({ sendAdminMessage }: BaseProps) {
  const { gameStateRef } = useGameState();
  const { step  } = gameStateRef.current.state2;
  return (
    <div>
      {step < 5 ? (
        <Phase1 sendAdminMessage={sendAdminMessage} />
      ) : (
        <Phase2 sendAdminMessage={sendAdminMessage} />
      )}
    </div>
  )
}

function Phase1({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { step, question1 } = gameStateRef.current.state2;
  const [units, setUnits] = useState<ConsoleUnit[]>([]);

  const [whole, setWhole] = useState('');
  const [numerator, setNumerator] = useState('');
  const [denominator, setDenominator] = useState('');
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);

  const start = useRef(false);

  useEffect(() => {
    if (!start.current) {
      sendAdminMessage("agent",`Welcome to Level 2: Equivalence! See the pie illustration on the board? Your task is to figure out the fraction it represents!`, () => goToStep('second', setGameStateRef, 1));
      start.current = true;
    }
  }, []);

  useEffect(() => {
    const value: ConsoleUnit[] = [];
    
    // Add whole number units (type 1)
    for (let i = 0; i < question1.whole; i++) {
      value.push({ type: 1, number: [1] });
    }

    // Add fractional unit (type 2) if there's a numerator
    if (question1.numerator > 0) {
      const segments = Array.from({ length: question1.numerator }, (_, i) => i);
      value.push({ type: 2, number: segments });
    }

    setUnits(value);
  }, [question1]);

  useEffect(() => {
    if (whole === '' && numerator === '' && denominator === '') return;

    if (parseInt(whole)===question1.whole && parseInt(numerator)===question1.numerator && parseInt(denominator)===question1.denominator) {

      sendAdminMessage("agent",`Brilliant! You've figured it out! That's the correct mixed number.`, () => { 
        goToStep('second', setGameStateRef, 2)
        sendAdminMessage("agent",`Now let’s see if you can find an equivalent fraction for this number`)
      } );
    }
  }, [whole, numerator, denominator]);

  useEffect(() => {
    if (selectedAnswers.length === 0) return;

    if (selectedAnswers.length === 1 && ( selectedAnswers[0] === 1 || selectedAnswers[0] === 3)) {
      sendAdminMessage("agent",`Well done! You've created ${selectedAnswers[0] === 1 ? "1 9/4" : "2 5/4"}. That's one of the correct fractions`)
    }

    if (selectedAnswers.length === 2 && 
        selectedAnswers[0] === 1 && 
        selectedAnswers[1] === 3) {
          sendAdminMessage("agent",`antastic work! You’ve explored equivalence by playing with the tools.`)
          goToStep('second', setGameStateRef, 4)
    }
  }, [selectedAnswers]);

  const toggleAnswer = (answer: number) => {
    setSelectedAnswers(prev => {
      if (prev.includes(answer)) {
        return prev.filter(a => a !== answer);
      } else {
        return [...prev, answer];
      }
    });
  };

  return (
    <Bg>
      <Header text="Level 2 : Equivalance" active={true} />
      <div className="max-w-screen-md mx-auto">
        <Console 
          fraction={question1}
          units={units}
          setUnits={setUnits}
          variant={2}
          hidden={step < 1}
        />

        {step >= 1 && step <= 2 && (

          <div className="bg-[#0E94D3] flex justify-around m-12 items-center p-2 rounded-lg shadow-[-3px_3px_0px_rgba(0,0,0,1)]">
            <h2 className="text-4xl text-white font-bold mb-8">Identify the fraction</h2>
            
            <div className="flex items-center gap-4">
              <input 
                type="text"
                value={whole}
                onChange={(e) => setWhole(e.target.value)}
                className="w-16 h-16 text-3xl text-center bg-white border-2 border-black rounded-lg shadow-[-2px_2px_0px_rgba(0,0,0,1)]"
                placeholder="?"
              />
              
              <div className="flex flex-col items-center">
                <input 
                  type="text"
                  value={numerator}
                  onChange={(e) => setNumerator(e.target.value)}
                  className="w-16 h-16 text-3xl text-center bg-white border-2 border-black rounded-lg shadow-[-2px_2px_0px_rgba(0,0,0,1)]"
                  placeholder="?"
                />
                <div className="w-16 h-1 bg-white my-1"></div>
                <input 
                  type="text"
                  value={denominator}
                  onChange={(e) => setDenominator(e.target.value)}
                  className="w-16 h-16 text-3xl text-center bg-white border-2 border-black rounded-lg shadow-[-2px_2px_0px_rgba(0,0,0,1)]"
                  placeholder="?"
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 ? (
          <BlueBox
            className='cursor-pointer max-w-32 mx-auto mt-8 text-2xl text-center'
            onClick={() => {
              goToStep('second', setGameStateRef, 3)
              sendAdminMessage("agent",`Welcome to the next challenge! Your task: Use these tools to figure out which of these fractions—1 9/4, 2 3/4, or 2 5/4—you can create. 
              Remember, no adding or removing pies this time!`)
            }}
          >
            Next &gt;&gt;
          </BlueBox>

        ) : step === 3 || step === 4 ? (
          <div className='mt-8'>
            <BlueText>
              <p className='text-3xl text-center'>
              By using the tools, which of these can you create?
              </p>
              </BlueText>

              <div className='flex justify-center gap-6 mt-6 flex-col items-center'>
                <div className='flex gap-6'>
                  <MixedFractionBox
                    whole={2}
                    numerator={9}
                    denominator={4}
                    onClick={() => toggleAnswer(1)}
                    type={selectedAnswers.includes(1) ? 1 : 2}
                  />
                  <MixedFractionBox
                    whole={2}
                    numerator={3}
                    denominator={4}
                    onClick={() => toggleAnswer(2)}
                    type={selectedAnswers.includes(2) ? 1 : 2}
                  />
                  <MixedFractionBox
                    whole={2}
                    numerator={5}
                    denominator={4}
                    onClick={() => toggleAnswer(3)}
                    type={selectedAnswers.includes(3) ? 1 : 2}
                  />
                </div>

              </div>
          </div>
        ):null}

        { step === 4 && (
          <BlueBox
            className='cursor-pointer max-w-32 mx-auto mt-8 text-2xl text-center'
            onClick={() => {
              goToStep('second', setGameStateRef, 5)
            }}
          >
            Next &gt;&gt;
          </BlueBox>

        )}
      </div>
    </Bg>
  )
}

function Phase2({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { step, question2 } = gameStateRef.current.state2;
  const [units, setUnits] = useState<ConsoleUnit[]>([]);

  const [whole, setWhole] = useState('');
  const [numerator, setNumerator] = useState('');
  const [denominator, setDenominator] = useState('');
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);

  const start = useRef(false);

  useEffect(() => {
    if (!start.current) {
      sendAdminMessage("agent",`Great job! Now, take a look at the fraction displayed on the board. Fill the boxes just like last time`)
      start.current = true;
    }
  }, []);

  useEffect(() => {
    const value: ConsoleUnit[] = [];
    
    // Add whole number units (type 1)
    for (let i = 0; i < question2.whole; i++) {
      value.push({ type: 1, number: [1] });
    }

    // Add fractional unit (type 2) if there's a numerator
    if (question2.numerator > 0) {
      const noofwholes = Math.floor(question2.numerator / question2.denominator);
      for (let i = 0; i < noofwholes; i++) {
        value.push({ type: 2, number: [0,1,2,3] });
      }

      
      const segments = Array.from({ length: question2.numerator % question2.denominator }, (_, i) => i);
      value.push({ type: 2, number: segments });

    }
    setUnits(value);
  }, [question2]);

  useEffect(() => {
    if (whole === '' && numerator === '' && denominator === '') return;

    if (parseInt(whole)===question2.whole && parseInt(numerator)===question2.numerator && parseInt(denominator)===question2.denominator) {

      sendAdminMessage("agent",`Awesome work! You’ve identified ${question2.whole} ${question2.numerator}/${question2.denominator}`, () => { 
        goToStep('second', setGameStateRef, 6)
      } );
    }
  }, [whole, numerator, denominator]);

  useEffect(() => {
    if (selectedAnswers.length === 0) return;

    if (selectedAnswers.length === 1 && ( selectedAnswers[0] === 1 || selectedAnswers[0] === 3)) {
      sendAdminMessage("agent",`Well done! You've created ${selectedAnswers[0] === 1 ? "1 9/4" : "2 5/4"}. That's one of the correct fractions`)
    }

    if (selectedAnswers.length === 2 && 
        selectedAnswers[0] === 1 && 
        selectedAnswers[1] === 3) {
          sendAdminMessage("agent",`antastic work! You’ve explored equivalence by playing with the tools.`)
          goToStep('second', setGameStateRef, 8)
    }
  }, [selectedAnswers]);

  const toggleAnswer = (answer: number) => {
    setSelectedAnswers(prev => {
      if (prev.includes(answer)) {
        return prev.filter(a => a !== answer);
      } else {
        return [...prev, answer];
      }
    });
  };

  return (
    <Bg>
      <Header text="Level 2 : Equivalance" active={true} />
      <div className="max-w-screen-md mx-auto">
        <Console 
          fraction={question2}
          units={units}
          setUnits={setUnits}
          variant={2}
          hidden={step < 6}
        />

        { step <= 6 && (

          <div className="bg-[#0E94D3] flex justify-around m-12 items-center p-2 rounded-lg shadow-[-3px_3px_0px_rgba(0,0,0,1)]">
            <h2 className="text-4xl text-white font-bold mb-8">Identify the fraction</h2>
            
            <div className="flex items-center gap-4">
              <input 
                type="text"
                value={whole}
                onChange={(e) => setWhole(e.target.value)}
                className="w-16 h-16 text-3xl text-center bg-white border-2 border-black rounded-lg shadow-[-2px_2px_0px_rgba(0,0,0,1)]"
                placeholder="?"
              />
              
              <div className="flex flex-col items-center">
                <input 
                  type="text"
                  value={numerator}
                  onChange={(e) => setNumerator(e.target.value)}
                  className="w-16 h-16 text-3xl text-center bg-white border-2 border-black rounded-lg shadow-[-2px_2px_0px_rgba(0,0,0,1)]"
                  placeholder="?"
                />
                <div className="w-16 h-1 bg-white my-1"></div>
                <input 
                  type="text"
                  value={denominator}
                  onChange={(e) => setDenominator(e.target.value)}
                  className="w-16 h-16 text-3xl text-center bg-white border-2 border-black rounded-lg shadow-[-2px_2px_0px_rgba(0,0,0,1)]"
                  placeholder="?"
                />
              </div>
            </div>
          </div>
        )}

        {step === 6 ? (
          <BlueBox
            className='cursor-pointer max-w-32 mx-auto mt-8 text-2xl text-center'
            onClick={() => {
              goToStep('second', setGameStateRef, 7)
              sendAdminMessage("agent",`"Great job! You’re doing amazing. Now, let’s find which fractions are equivalent to ${question2.whole} ${question2.numerator}/${question2.denominator}.`)
            }}
          >
            Next &gt;&gt;
          </BlueBox>

        ) : step === 7 || step === 8 ? (
          <div className='mt-8'>
            <BlueText>
              <p className='text-3xl text-center'>
              By using the tools, which of these can you create?
              </p>
              </BlueText>

              <div className='flex justify-center gap-6 mt-6 flex-col items-center'>
                <div className='flex gap-6'>
                  <MixedFractionBox
                    whole={4}
                    numerator={3}
                    denominator={4}
                    onClick={() => toggleAnswer(1)}
                    type={selectedAnswers.includes(1) ? 1 : 2}
                  />
                  <MixedFractionBox
                    whole={3}
                    numerator={5}
                    denominator={4}
                    onClick={() => toggleAnswer(2)}
                    type={selectedAnswers.includes(2) ? 1 : 2}
                  />
                  <MixedFractionBox
                    whole={0}
                    numerator={19}
                    denominator={4}
                    onClick={() => toggleAnswer(3)}
                    type={selectedAnswers.includes(3) ? 1 : 2}
                  />
                </div>

              </div>
          </div>
        ):null}

        { step === 8 ? (
          <BlueBox
            className='cursor-pointer max-w-32 mx-auto mt-8 text-2xl text-center'
            onClick={() => {
              goToStep('second', setGameStateRef, 9 )
              sendAdminMessage("agent",`Great job! Now, take a look at the fraction displayed on the board`)
            }}
          >
            Next &gt;&gt;
          </BlueBox>

        ) : (
          <div className="text-2xl text-center mt-8 flex flex-col items-center">
            <p className="text-2xl text-center mt-8">
              <BlueText> Whats next? </BlueText>
            </p>
            <BlueBox
              className="text-2xl mt-8 cursor-pointer"
              onClick={() => goToStep('second', setGameStateRef, 0)}
            >
              I want to try Level 2 again
            </BlueBox>

            <BlueBox
              className="text-2xl mt-8 cursor-pointer"
              onClick={() => setGameStateRef(prev => ({ ...prev, screen: 'third' }))}
            >
              Take me to next level !
            </BlueBox>
          </div>
        )
      }



      </div>
    </Bg>
  )
}
