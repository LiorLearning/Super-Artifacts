import { useGameState } from "../state-utils";
import { BaseProps } from "../utils/types";
import Bg from "../components/bg";
import Header from "../components/header";
import { BlueBox, BlueText, DoubleBlueBox, DoubleBlueBox2 } from "../components/blue";
import { Console, ConsoleUnit, consoletofraction, fractiontoconsole, Pieces, Merge, Delete, Split } from "../components/console";
import { goToStep } from "../utils/helper";
import { useEffect, useState } from "react";
import MixedFraction, { MixedFractionBox } from "../components/mixedFraction";
import { goToScreen } from "../utils/helper";

export default function FourthScreen({sendAdminMessage}: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { step } = gameStateRef.current.state4;

  return (
    <Bg>
      <Header text="LEVEL 4 : SUBTRACT" active={true} />
      {step < 3 ? (
        <Step1 />
      ) : <Step2 />
    }
      
    </Bg>
  )
}


const Step1 = () => {
  const { gameStateRef, setGameStateRef } = useGameState();
  const {step, question1, question2 } = gameStateRef.current.state4;
  const [units1, setUnits1] = useState<ConsoleUnit[]>([]);
  const [units2, setUnits2] = useState<ConsoleUnit[]>([]);
  
  useEffect(() => {
    console.log(step);
    if (step === 0) {
      const { whole, numerator, denominator } = consoletofraction(units1);
      if (whole === question1.whole && numerator === question1.numerator) {
        goToStep('fourth', setGameStateRef, 1);
      }
    }
  }, [units1]);

  useEffect(() => {
    if (step === 1) {
      const { whole, numerator, denominator } = consoletofraction(units2);
      if (whole === question2.whole && numerator === question2.numerator) {
        goToStep('fourth', setGameStateRef, 2);
      }
    }
  }, [units2]);

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className="flex items-center gap-8 w-full max-w-3xl mx-auto mt-20">
        <Console
          fraction={question1}
          units={units1}
          setUnits={setUnits1}
          active={step === 0}
          
        />
        <Console
          fraction={question2}
          units={units2}
          setUnits={setUnits2}
          active={step === 1}
        />
      </div>
      {step === 2 && (
        <BlueBox
          onClick={() => {
            goToStep('fourth', setGameStateRef, 3);
          }}
          className='mt-12 text-2xl cursor-pointer font-bold'
        >
          Next &gt;&gt;
        </BlueBox>
      )}
    </ div>
  )
}

const Step2 = () => {
  const { gameStateRef, setGameStateRef } = useGameState();
  const {step, question1, question2 } = gameStateRef.current.state4;
  const [units1, setUnits1] = useState<ConsoleUnit[]>([]);
  const [units2, setUnits2] = useState<ConsoleUnit[]>([]);
  const [selectedUnits1, setSelectedUnits1] = useState<number[]>([]);
  const [selectedUnits2, setSelectedUnits2] = useState<number[]>([]);
  const [selectedSegments1, setSelectedSegments1] = useState<{index: number, segments: number[]}[]>([]);
  const [selectedSegments2, setSelectedSegments2] = useState<{index: number, segments: number[]}[]>([]);
  const [whole, setWhole] = useState<number>(0);
  const [numerator, setNumerator] = useState<number>(0);
  const [denominator, setDenominator] = useState<number>(0); 

  useEffect(() => {
    setUnits1(fractiontoconsole(question1));
    setUnits2(fractiontoconsole(question2));
  }, [question1, question2]);

  const handleSelect1 = (index: number, segment?: number) => {
    const unit = units1[index];
    
    if (unit.type === 1) {
      setSelectedUnits1(prev => {
        if (prev.includes(index)) {
          return prev.filter(i => i !== index);
        }
        return [...prev, index];
      });
    } else {
      if (segment !== undefined) {
        setSelectedSegments1(prev => {
          const existingSelection = prev.find(s => s.index === index);
          if (existingSelection) {
            const newSegments = existingSelection.segments.includes(segment)
              ? existingSelection.segments.filter(s => s !== segment)
              : [...existingSelection.segments, segment].sort();
            
            return newSegments.length === 0
              ? prev.filter(s => s.index !== index)
              : prev.map(s => s.index === index ? {...s, segments: newSegments} : s);
          } else {
            return [...prev, { index, segments: [segment] }];
          }
        });
      }
    }
  };

  const handleSelect2 = (index: number, segment?: number) => {
    const unit = units2[index];
    
    if (unit.type === 1) {
      setSelectedUnits2(prev => {
        if (prev.includes(index)) {
          return prev.filter(i => i !== index);
        }
        return [...prev, index];
      });
    } else {
      if (segment !== undefined) {
        setSelectedSegments2(prev => {
          const existingSelection = prev.find(s => s.index === index);
          if (existingSelection) {
            const newSegments = existingSelection.segments.includes(segment)
              ? existingSelection.segments.filter(s => s !== segment)
              : [...existingSelection.segments, segment].sort();
            
            return newSegments.length === 0
              ? prev.filter(s => s.index !== index)
              : prev.map(s => s.index === index ? {...s, segments: newSegments} : s);
          } else {
            return [...prev, { index, segments: [segment] }];
          }
        });
      }
    }
  };

  useEffect(() => {
    if (selectedUnits1.length > 0 && selectedUnits2.length > 0) {
      const selectedPieces1 = selectedUnits1.map(index => units1[index]);
      const selectedPieces2 = selectedUnits2.map(index => units2[index]);

      const matchFound = selectedPieces1.length === selectedPieces2.length &&
        selectedPieces1.every((piece1, i) => {
          const piece2 = selectedPieces2[i];
          return piece1.type === piece2.type;
        });

      if (matchFound) {
        setUnits1(prev => prev.filter((_, i) => !selectedUnits1.includes(i)));
        setUnits2(prev => prev.filter((_, i) => !selectedUnits2.includes(i)));
        setSelectedUnits1([]);
        setSelectedUnits2([]);
      }
    }

    if (selectedSegments1.length > 0 && selectedSegments2.length > 0) {
      const totalSegments1 = selectedSegments1.reduce((acc, curr) => acc + curr.segments.length, 0);
      const totalSegments2 = selectedSegments2.reduce((acc, curr) => acc + curr.segments.length, 0);

      if (totalSegments1 === totalSegments2) {
        // Update pieces by removing only the selected segments
        setUnits1(prev => prev.map((unit, idx) => {
          const selection = selectedSegments1.find(s => s.index === idx);
          if (!selection) return unit;
          
          return {
            ...unit,
            number: unit.number.filter(n => !selection.segments.includes(n))
          };
        }).filter(unit => unit.number.length > 0)); // Remove empty pieces

        setUnits2(prev => prev.map((unit, idx) => {
          const selection = selectedSegments2.find(s => s.index === idx);
          if (!selection) return unit;
          
          return {
            ...unit,
            number: unit.number.filter(n => !selection.segments.includes(n))
          };
        }).filter(unit => unit.number.length > 0)); // Remove empty pieces

        setSelectedSegments1([]);
        setSelectedSegments2([]);
      }
    }

    console.log(
      units1.filter(unit => unit.type === 1).length, 
      units1.filter(unit => unit.type === 2).length,
      units2.filter(unit => unit.type === 1).length, 
      units2.filter(unit => unit.type === 2).length
    );

    if ((units1.filter(unit => unit.type === 2).length === 0 && units2.filter(unit => unit.type === 2).length > 0) ||
        (units1.filter(unit => unit.type === 2).length > 0 && units2.filter(unit => unit.type === 2).length === 0)) {
      goToStep('fourth', setGameStateRef, 4);
    }
  }, [selectedUnits1, selectedUnits2, selectedSegments1, selectedSegments2]);


  return (
    <div className='flex flex-col max-w-3xl mx-auto items-center justify-center gap-4'>
      <div className='flex justify-center items-center gap-4'>
        <MixedFractionBox
          whole={question1.whole}
          numerator={question1.numerator}
          denominator={question1.denominator}
          type={2}
        />
        <span className='flex items-center font-bold text-xl'>-</span>
        <MixedFractionBox
          whole={question2.whole}
          numerator={question2.numerator}
          denominator={question2.denominator}
          type={2}
        />
      </div>

      <div className='mt-16 w-full flex flex-col items-center justify-center'>
        <BlueText>
            <p className='text-3xl mb-4 text-center'>
            DELETE PAIRS
          </p>
        </BlueText>

        <DoubleBlueBox
          className='w-full'
          first={
            <div className='flex items-center justify-center gap-2 my-4'>
              {units1.map((unit, index) => (
                <Pieces
                  key={index}
                  type={unit.type}
                  number={unit.number}
                  index={index}
                  selected={selectedUnits1.includes(index)}
                  selectedSegments={selectedSegments1.find(s => s.index === index)?.segments}
                  onSelect={(idx, segment) => handleSelect1(idx, segment)}
                />
              ))}
            </div>
          }
          second={
            <div className='flex flex-col text-center mt-2 text-2xl font-bold items-center justify-center'>
              <MixedFraction
                whole={question1.whole}
                numerator={question1.numerator}
                denominator={question1.denominator}
              />
            </div>
          }
          widthratio={80}
        />

        <BlueText className='text-5xl font-bold'>-</BlueText>

        <DoubleBlueBox
          className='w-full'
          first={
            <div className='flex items-center justify-center gap-2 py-4'>
              {units2.map((unit, index) => (
                <Pieces
                  key={index}
                  type={unit.type}
                  number={unit.number}
                  index={index}
                  selected={selectedUnits2.includes(index)}
                  selectedSegments={selectedSegments2.find(s => s.index === index)?.segments}
                  onSelect={(idx, segment) => handleSelect2(idx, segment)}
                />
              ))}
            </div>
          }
          second={
            <div className='flex flex-col text-center mt-2 text-2xl font-bold items-center justify-center'>
              <MixedFraction
                whole={question2.whole}
                numerator={question2.numerator}
                denominator={question2.denominator}
              />
            </div>
          }
          widthratio={80}
        />  
      </div>


      {step > 4 && step < 6 && (
        <div className='flex flex-col items-center justify-center mt-8 gap-4'>
          <BlueText>
            <p className='text-3xl text-center'>
              Do you think we can subtract more?            
            </p>
          </BlueText>

          <div className='flex items-center justify-center gap-4'>
            <BlueBox
              className='cursor-pointer'
              onClick={() => {
                goToStep('fourth', setGameStateRef, 5);
              }}
            >
              DEFINITELY
            </BlueBox>

            <BlueBox>
              IMPOSSIBLE
            </BlueBox>
          </div>
        </div>
      )}

      {step === 5 && (
        <div className='flex flex-col items-center justify-center mt-8 gap-4'>
          <BlueText>
            <p className='text-3xl text-center'>
              Which tool do you need?
            </p>
          </BlueText>

          <div className='flex items-center justify-center gap-4'>
            <Merge
              selected={null}
              setSelected={() => {}}
              units={[]}
              setUnits={() => {}}
              onClick={() => {
                // goToStep('fourth', setGameStateRef, 6);
              }}
            />

            <Split
              selected={null}
              setSelected={() => {}}
              units={[]}
              setUnits={() => {}}
              onClick={() => {
                goToStep('fourth', setGameStateRef, 6);
              }}
            />

            <Delete
              selected={null}
              setSelected={() => {}}
              units={[]}
              setUnits={() => {}}
              onClick={() => {
                // goToStep('fourth', setGameStateRef, 6);
              }}
            />
          </div>
        </div>
      )}

      {step === 6 && (
        <Split
          selected={null}
          setSelected={() => {}}
          units={[]}
          setUnits={() => {}}
          onClick={() => {
            
          }}
        />
      )}
    </div>
  )
}