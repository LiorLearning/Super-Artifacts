import { BaseProps } from '../utils/types';
import { Button } from '@/components/ui/button';
import { useEffect, useRef, useState, DragEvent } from 'react';
import { useGameState } from '../state-utils';
import Bg from '../components/bg';
import { Console, ConsoleUnit, Merge, Delete, Split, consoletofraction, fractiontoconsole, Pieces } from '../components/console';
import { goToScreen, goToStep } from '../utils/helper';
import { BlueBox, BlueText, DoubleBlueBox, DoubleBlueBox2 } from '../components/blue';
import Header from '../components/header';
import MixedFraction, { checkEquivalentfraction, MixedFractionBox } from '../components/mixedFraction';

export default function ThirdScreen({sendAdminMessage}: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { step } = gameStateRef.current.state3;

  return (
    <Bg>
      <Header text={step < 10 ? "LEVEL 3 : Add" : "LEVEL 3 : Subtract"} active={true} />
      {step < 3 ? (
        <Step1 />
      ) : step < 6 ? (
        <Step2 />
      ) : step < 10 ? (
        <Step3 />
      ) : step < 13 ? (
        <Step4 />
      ) : <Step5 />
    }
      
    </Bg>
  )
}

function Step1() {
  const { gameStateRef, setGameStateRef } = useGameState();
  const {step, question1, question2 } = gameStateRef.current.state3;
  const [units1, setUnits1] = useState<ConsoleUnit[]>([]);
  const [units2, setUnits2] = useState<ConsoleUnit[]>([]);


  useEffect(() => {
    console.log(step);
    if (step === 0) {
      const { whole, numerator, denominator } = consoletofraction(units1);
      if (whole === question1.whole && numerator === question1.numerator) {
        goToStep('third', setGameStateRef, 1);
      }
    }
  }, [units1]);

  useEffect(() => {
    if (step === 1) {
      const { whole, numerator, denominator } = consoletofraction(units2);
      if (whole === question2.whole && numerator === question2.numerator) {
        goToStep('third', setGameStateRef, 2);
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
              goToStep('third', setGameStateRef, 3);
            }}
            className='mt-12 text-2xl cursor-pointer font-bold'
          >
            ADD <span className='text-3xl'>+</span>
          </BlueBox>
        )}

      </ div>
  )
}

const Step2 = () => {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { step, question1, question2 } = gameStateRef.current.state3; 
  const [sourceUnits1, setSourceUnits1] = useState<ConsoleUnit[]>([]);
  const [sourceUnits2, setSourceUnits2] = useState<ConsoleUnit[]>([]);
  const [droppedWholes, setDroppedWholes] = useState<ConsoleUnit[]>([]);
  const [droppedFractions, setDroppedFractions] = useState<ConsoleUnit[]>([]);
  const [answer, setAnswer] = useState<{whole: number, numerator: number, denominator: number}>({whole: 0, numerator: 0, denominator: 0});

  // Calculate total wholes
  const totalWholes = droppedWholes.length;

  useEffect(() => {
    setSourceUnits1(fractiontoconsole(question1));
    setSourceUnits2(fractiontoconsole(question2));
  }, [question1, question2]);

  const handleDragStart = (e: DragEvent<HTMLDivElement>, unit: ConsoleUnit, sourceIndex: number, fromArray: number) => {
    e.dataTransfer.setData('unitData', JSON.stringify({
      unit,
      sourceIndex,
      fromArray
    }));
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>, dropZone: 'wholes' | 'fractions') => {
    e.preventDefault();
    const data = e.dataTransfer.getData('unitData');
    if (!data) return;
    
    const { unit, sourceIndex, fromArray } = JSON.parse(data);
    
    if ((dropZone === 'wholes' && unit.type === 1) || 
        (dropZone === 'fractions' && unit.type === 2)) {
      
      if (fromArray === 1) {
        setSourceUnits1(prev => prev.filter((_, i) => i !== sourceIndex));
      } else {
        setSourceUnits2(prev => prev.filter((_, i) => i !== sourceIndex));
      }
      
      if (dropZone === 'wholes') {
        setDroppedWholes(prev => [...prev, unit]);
      } else {
        setDroppedFractions(prev => [...prev, unit]);
      }
    }

    console.log(droppedWholes.length+1, question1.whole+question2.whole, sourceUnits1.length-1);
    console.log( droppedWholes.length+1 === question1.whole+question2.whole, ( sourceUnits1.length + sourceUnits2.length === 0 ),
      (droppedWholes  .length === question1.numerator+question2.numerator), ( sourceUnits1.length + sourceUnits2.length === 1 )
    )
    if ( dropZone === 'wholes' ? 
      (droppedWholes.length+1 === question1.whole+question2.whole && ( sourceUnits1.length + sourceUnits2.length === 0 )) 
      :
      (droppedWholes.length === question1.numerator+question2.numerator && ( sourceUnits1.length + sourceUnits2.length === 1 ))
    ) {
      goToStep('third', setGameStateRef, 4);
    }
  };

  useEffect(() => {
    if (answer.whole === question1.whole + question2.whole && answer.numerator === question1.numerator + question2.numerator && answer.denominator === question1.denominator) {
      goToStep('third', setGameStateRef, 5);
      setTimeout(() => {
        goToStep('third', setGameStateRef, 6);
      }, 1000);
    }
  }, [answer]);

  return (
    <div className='flex flex-col gap-8 items-center justify-center w-full max-w-6xl mx-auto px-4'>
      <div className="bg-white w-full flex flex-col p-8 gap-8 rounded-lg shadow-[inset_-3px_3px_rgba(0,0,0,.7)]">
        {
          [
            { question: question1, units: sourceUnits1, arrayIndex: 1 },
            { question: question2, units: sourceUnits2, arrayIndex: 2 }
          ].map(({ question, units, arrayIndex }, qIndex) => (
            <div key={qIndex} className='flex items-center gap-8 w-full'>
              <div className="w-40 flex">
                <MixedFractionBox
                  whole={question.whole}
                  numerator={question.numerator}
                  denominator={question.denominator}
                  type={2}
                />
              </div>

              <div className="flex gap-4 flex-wrap">
                {units.map((unit, index) => (
                  <div
                    key={index}
                    draggable
                    onDragStart={(e) => handleDragStart(e, unit, index, arrayIndex)}
                    className="cursor-move"
                  >
                    <Pieces 
                      type={unit.type}
                      number={unit.number}
                      index={index}
                      selected={false}
                      onSelect={() => {}}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))
        }
      </div>

      <div className='flex flex-col items-center gap-4 w-full'>
        <div className='bg-[#0C88C4] text-white px-12 py-2 text-2xl font-bold rounded-lg shadow-[-2px_2px_rgba(0,0,0,.7)]'>
          ADD HERE
        </div>

        <div className='flex gap-8 w-full'>
          <div className='flex-1'>
            <div className='bg-[#0C88C4] flex flex-col rounded-xl p-4 shadow-[-2px_2px_rgba(0,0,0,.7)]'>
              <div 
                className='bg-white w-full h-[200px] rounded-xl shadow-[inset_-3px_3px_rgba(0,0,0,.7)] relative'
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, 'wholes')}
              >
                <div className='absolute inset-0 flex flex-col'>
                  <div className='flex-1 p-4'>
                    <div className="flex flex-wrap gap-4 mt-8">
                      {droppedWholes.map((unit, index) => (
                        <Pieces
                          key={index}
                          type={unit.type}
                          number={unit.number}
                          index={index}
                          selected={false}
                          onSelect={() => {}}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className='bg-[#0C88C4] text-white pt-4 flex items-center justify-center gap-4'>
                <span className='font-bold text-3xl'>WHOLES</span>
                <div className='bg-white text-[#0C88C4] w-8 text-3xl  h-8 flex items-center justify-center font-bold rounded'>
                  {totalWholes}
                </div>
              </div>
            </div>
          </div>

          <div className='flex-1'>
            <div className='bg-[#0C88C4] flex flex-col rounded-xl p-4 shadow-[-2px_2px_rgba(0,0,0,.7)]'>
              <div 
                className='bg-white w-full h-[200px] rounded-xl shadow-[inset_-3px_3px_rgba(0,0,0,.7)] relative'
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, 'fractions')}
              >
                <div className='absolute inset-0 flex flex-col'>
                  <div className='flex-1 p-4'>
                    <div className="flex flex-wrap gap-4 mt-8">
                      {droppedFractions.map((unit, index) => (
                        <Pieces
                          key={index}
                          type={unit.type}
                          number={unit.number}
                          index={index}
                          selected={false}
                          onSelect={() => {}}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className='bg-[#0C88C4] w-full text-center font-bold text-white text-3xl pt-4'>
                FRACTIONS
              </div>
            </div>
          </div>
        </div>

        {step >= 4 && (
          <div className="bg-[#0E94D3] flex gap-4 justify-around m-4 items-center p-2 rounded shadow-[-3px_3px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl h-full text-white font-bold">Answer = </h2>
            
            <div className="flex items-center gap-2">
              <input 
                type="text"
                value={answer.whole === 0 ? '' : answer.whole}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '') {
                    setAnswer(prev => ({ ...prev, whole: 0 }));
                  } else {
                    const num = parseInt(value);
                    if (!isNaN(num)) {
                      setAnswer(prev => ({ ...prev, whole: num }));
                    }
                  }
                }}
                disabled={step === 5}
                className={`w-12 h-12 text-3xl text-center border-2 border-black rounded-lg ${
                  answer.whole === 0 ? 'bg-white' : 
                  answer.whole === question1.whole + question2.whole ? 'bg-green-200' : 'bg-red-200'
                }`}
                placeholder="?"
              />  
              
              <div className="flex flex-col items-center">
                <input 
                  type="text"
                  value={answer.numerator === 0 ? '' : answer.numerator}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === '') {
                      setAnswer(prev => ({ ...prev, numerator: 0 }));
                    } else {
                      const num = parseInt(value);
                      if (!isNaN(num)) {
                        setAnswer(prev => ({ ...prev, numerator: num }));
                      }
                    }
                  }}
                  disabled={step === 5}
                  className={`w-12 h-12 text-3xl text-center border-2 border-black rounded-lg ${
                    answer.numerator === 0 ? 'bg-white' : 
                    answer.numerator === question1.numerator + question2.numerator ? 'bg-green-200' : 'bg-red-200'
                  }`}
                  placeholder="?"
                />
                <div className="w-12 h-[1px] bg-white my-2"></div>
                <input 
                  type="text"
                  value={answer.denominator === 0 ? '' : answer.denominator}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === '') {
                      setAnswer(prev => ({ ...prev, denominator: 0 }));
                    } else {
                      const num = parseInt(value);
                      if (!isNaN(num)) {
                        setAnswer(prev => ({ ...prev, denominator: num }));
                      }
                    }
                  }}
                  className={`w-12 h-12 text-3xl text-center border-2 border-black rounded-lg ${
                    answer.denominator === 0 ? 'bg-white' : 
                    answer.denominator === question1.denominator ? 'bg-green-200' : 'bg-red-200'
                  }`}
                  placeholder="?"
                  disabled={step === 5}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Step3 = () => { 
  const { gameStateRef, setGameStateRef } = useGameState();
  const { step, question1, question2 } = gameStateRef.current.state3;
  const [units1, setUnits1] = useState<ConsoleUnit[]>([]);
  const [answer1, setAnswer1] = useState<number[]>([]);
  const [answer2, setAnswer2] = useState<number>();
  const [answer3, setAnswer3] = useState<number>();

  // Define all equivalent fractions
  const options1 = [
    {
      option: 1,
      fraction: {
        whole: 3,
        numerator: 3,
        denominator: 4
      }
    },
    {
      option: 2,
      fraction: {
        whole: 6,
        numerator: 1,
        denominator: 4
      }
    },
    {
      option: 3,
      fraction: {
        whole: 3,
        numerator: 13,
        denominator: 4
      }
    }
  ];

  const options2 = [
    {
      option: 1,
      fraction: {
        whole: 3,
        numerator: 13,
        denominator: 4
      }
    },
    {
      option: 2,
      fraction: {
        whole: 6,
        numerator: 1,
        denominator: 4
      }
    }
  ];

  const options3 = [
    {
      option: 1,
      fraction: {
        whole: 3,
        numerator: 13,
        denominator: 4
      }
    },
    {
      option: 2,
      fraction: {
        whole: 6,
        numerator: 1,
        denominator: 4
      }
    }
  ];

  useEffect(() => {
    setUnits1(
      fractiontoconsole({
      whole: question1.whole + question2.whole,
      numerator: 0,
      denominator: question1.denominator
    }).concat(
      fractiontoconsole({
        whole: 0,
        numerator: question1.numerator,
        denominator: question1.denominator
      })
    ).concat(
      fractiontoconsole({
        whole: 0,
        numerator: question2.numerator,
        denominator: question2.denominator
      })
    ));
  }, [question1, question2]);

  const handleClick = (option: number) => {
    setAnswer1(prev => {
      if (prev.includes(option)) {
        return prev.filter(a => a !== option);
      }
      return [...prev, option];
    });
  };

  const handleClick2 = (option: number, fraction: {whole: number, numerator: number, denominator: number}) => {
    setAnswer2(option);

    if (fraction.whole > question2.whole) {
      goToStep('third', setGameStateRef, 8);
    }
  };

  const handleClick3 = (option: number, fraction: {whole: number, numerator: number, denominator: number}) => {
    setAnswer3(option);

    if (fraction.numerator > 0 && fraction.numerator < fraction.denominator) {
      goToStep('third', setGameStateRef, 9);
    }
  };

  // Check if all selected answers are correct
  useEffect(() => {
    if (answer1.length > 0) {
      const allCorrect = answer1.every(option => {
        const fraction = options1.find(f => f.option === option)?.fraction;
        return fraction && checkEquivalentfraction(question1, fraction);
      });

      if (answer1.length === 2) {
        goToStep('third', setGameStateRef, 7);
      }
    }
  }, [answer1]);

  return (
    <div className='flex flex-col items-center justify-center w-full max-w-6xl mx-auto px-4'>
      <Console
        fraction={{
          whole: question1.whole + question2.whole,
          numerator: question1.numerator + question2.numerator,
          denominator: question1.denominator
        }}
        units={units1}
        setUnits={setUnits1}
        variant={2}
      />

      <div className='mt-8'>
        <BlueText>
          <p className='text-3xl text-center'>
            Select all equivalent fractions
          </p>
        </BlueText>

        <div className='flex justify-center gap-6 mt-6 flex-col items-center'>
          <div className='flex gap-6'>
            {options1.map(({ option, fraction }) => (
              <MixedFractionBox
                key={option}
                whole={fraction.whole}
                numerator={fraction.numerator}
                denominator={fraction.denominator}
                onClick={() => handleClick(option)}
                type={answer1.includes(option) ? 1 : 2}
              />
            ))}
          </div>
        </div>
      </div>

      {step >= 7 && (
        <div className='mt-8'>
        <BlueText>
          <p className='text-3xl text-center'>
            Which one has more wholes?
          </p>
        </BlueText>

        <div className='flex justify-center gap-6 mt-6 flex-col items-center'>
          <div className='flex gap-6'>
            {options2.map(({ option, fraction }) => (
              <MixedFractionBox
                key={option}
                whole={fraction.whole}
                numerator={fraction.numerator}
                denominator={fraction.denominator}
                onClick={() => handleClick2(option, fraction)}
                type={answer2 === option ? 1 : 2}
              />
            ))}
          </div>
          </div>
        </div>
      )}

      {step >= 8 && (
        <div className='mt-8'>
        <BlueText>
          <p className='text-3xl text-center'>
            Which one has a proper fraction attached to it?          
          </p>
        </BlueText>

        <div className='flex justify-center gap-6 mt-6 flex-col items-center'>
          <div className='flex gap-6'>
            {options3.map(({ option, fraction }) => (
              <MixedFractionBox
                key={option}
                whole={fraction.whole}
                numerator={fraction.numerator}
                denominator={fraction.denominator}
                onClick={() => handleClick3(option, fraction)}
                type={answer3 === option ? 1 : 2}
              />
            ))}
          </div>
          </div>
        </div>
      )}

      {step >= 9 && (
        <div className='flex text-center items-center gap-2 justify-center text-3xl mt-8'>
          <MixedFractionBox
            whole={options3[answer3 ? answer3 - 1 : 0].fraction.whole}
            numerator={options3[answer3 ? answer3 - 1 : 0].fraction.numerator}
            denominator={options3[answer3 ? answer3 - 1 : 0].fraction.denominator}
            type={1}
          />
          is a <span className='text-3xl font-bold text-[#009700]'>REGROUPED MIXED FRACTION</span>
        </div>
      )}

      {step >= 9 && (
        <div className='flex text-center items-center gap-2 justify-center text-3xl mt-8'>
          <BlueBox
            className='cursor-pointer max-w-32 mx-auto mt-8 text-2xl text-center'
            onClick={() => {
              goToStep('third', setGameStateRef, 10 )
            }}
          >
            Next &gt;&gt;
          </BlueBox>
        </div>
      )}

    </div>
  );
};

const Step4 = () => {
  const { gameStateRef, setGameStateRef } = useGameState();
  const {step, question3, question4 } = gameStateRef.current.state3;
  const [units1, setUnits1] = useState<ConsoleUnit[]>([]);
  const [units2, setUnits2] = useState<ConsoleUnit[]>([]);
  
  useEffect(() => {
    console.log(step);
    if (step === 0) {
      const { whole, numerator, denominator } = consoletofraction(units1);
      if (whole === question3.whole && numerator === question3.numerator) {
        goToStep('third', setGameStateRef, 11);
      }
    }
  }, [units1]);

  useEffect(() => {
    if (step === 1) {
      const { whole, numerator, denominator } = consoletofraction(units2);
      if (whole === question4.whole && numerator === question4.numerator) {
        goToStep('third', setGameStateRef, 12);
      }
    }
  }, [units2]);

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className="flex items-center gap-8 w-full max-w-3xl mx-auto mt-20">
        <Console
          fraction={question3}
          units={units1}
          setUnits={setUnits1}
          active={step === 10}
          
        />
        <Console
          fraction={question4}
          units={units2}
          setUnits={setUnits2}
          active={step === 11}
        />
      </div>
      {step === 12 && (
        <BlueBox
          onClick={() => {
            goToStep('third', setGameStateRef, 13);
          }}
          className='mt-12 text-2xl cursor-pointer font-bold'
        >
          SUBTRACT <span className='text-3xl'>-</span>
        </BlueBox>
      )}
    </ div>
  )
}

const Step5 = () => {
  const { gameStateRef, setGameStateRef } = useGameState();
  const {step, question3, question4 } = gameStateRef.current.state3;
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
    setUnits1(fractiontoconsole(question3));
    setUnits2(fractiontoconsole(question4));
  }, [question3, question4]);

  // Handle selection of pieces
  const handleSelect1 = (index: number, segment?: number) => {
    const unit = units1[index];
    
    if (unit.type === 1) {
      // For whole pieces, toggle selection
      setSelectedUnits1(prev => {
        if (prev.includes(index)) {
          return prev.filter(i => i !== index);
        }
        return [...prev, index];
      });
    } else {
      // For fractional pieces, handle segment selection
      if (segment !== undefined) {
        setSelectedSegments1(prev => {
          const existingSelection = prev.find(s => s.index === index);
          if (existingSelection) {
            // Toggle segment in existing selection
            const newSegments = existingSelection.segments.includes(segment)
              ? existingSelection.segments.filter(s => s !== segment)
              : [...existingSelection.segments, segment].sort();
            
            return newSegments.length === 0
              ? prev.filter(s => s.index !== index)
              : prev.map(s => s.index === index ? {...s, segments: newSegments} : s);
          } else {
            // Create new selection
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

  // Check and remove matching pairs
  useEffect(() => {
    // Check whole number matches
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

    // Check fraction segment matches
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

    if(units2.length === 0) {
      goToStep('third', setGameStateRef, 11);
    }
  }, [selectedUnits1, selectedUnits2, selectedSegments1, selectedSegments2]);

  useEffect(() => {
    if(whole === (question3.whole - question4.whole) && 
       numerator === (question3.numerator - question4.numerator) && 
       denominator === (question3.denominator)) {
      goToStep('third', setGameStateRef, 12);
    }
  }, [whole, numerator, denominator]);

  return (
    <div className='flex flex-col max-w-3xl mx-auto items-center justify-center gap-4'>
      <div className='flex justify-center items-center gap-4'>
        <MixedFractionBox
          whole={question3.whole}
          numerator={question3.numerator}
          denominator={question3.denominator}
          type={2}
        />
        <span className='flex items-center font-bold text-xl'>-</span>
        <MixedFractionBox
          whole={question4.whole}
          numerator={question4.numerator}
          denominator={question4.denominator}
          type={2}
        />
      </div>

      {step === 10 ? (
        <div className='mt-16 w-full flex flex-col items-center justify-center gap-6'>
          <BlueText>
            <p className='text-3xl text-center'>
            SELECT AND DELETE MATCHING PAIRS
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
            <div className='flex flex-col text-center text-2xl font-bold items-center justify-center'>
              <MixedFraction
                whole={question3.whole}
                numerator={question3.numerator}
                denominator={question3.denominator}
              />
            </div>
          }
          widthratio={80}
        />

        <BlueText className='text-5xl font-bold'>-</BlueText>

        <DoubleBlueBox
          className='w-full'
          first={
            <div className='flex items-center justify-center gap-2 my-4'>
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
            <div className='flex flex-col text-center text-2xl font-bold items-center justify-center'>
              <MixedFraction
                whole={question4.whole}
                numerator={question4.numerator}
                denominator={question4.denominator}
              />
            </div>
          }
          widthratio={80}
        />  
        </div>
      ) : (
        <div className='mt-16 w-full flex flex-col items-center justify-center gap-6'>
          <BlueText>
            <p className='text-3xl text-center'>
            PIES LEFT
          </p>
        </BlueText>
        <DoubleBlueBox2
          className='w-full'
          first={
            <div className='flex items-center justify-center gap-2 my-6'>
              {units1.map((unit, index) => (
                <Pieces key={index} type={unit.type} number={unit.number} index={index} selected={selectedUnits1.includes(index)} onSelect={() => {}} />
              ))}
            </div>
          }
          second={
            <div className='flex items-center h-full gap-2'>
              <span className='flex flex-col h-full items-center justify-center text-3xl font-bold'>=</span>
              <div className="flex items-center gap-4">
                <input 
                  type="text"
                  value={whole === 0 ? '' : whole}
                  onChange={(e) => { e.target.value === '' ? setWhole(0) : setWhole(parseInt(e.target.value))}}
                  className="w-16 h-16 text-3xl text-center bg-white border-2 border-black rounded-lg shadow-[-2px_2px_0px_rgba(0,0,0,1)]"
                  placeholder="?"
                />
                
                <div className="flex flex-col items-center">
                  <input 
                    type="text"
                    value={numerator === 0 ? '' : numerator}
                    onChange={(e) => { e.target.value === '' ? setNumerator(0) : setNumerator(parseInt(e.target.value))}}
                    className="w-16 h-16 text-3xl text-center bg-white border-2 border-black rounded-lg shadow-[-2px_2px_0px_rgba(0,0,0,1)]"
                    placeholder="?"
                  />
                  <div className="w-16 h-1 bg-white my-1"></div>
                  <input 
                    type="text"
                    value={denominator === 0 ? '' : denominator}
                    onChange={(e) => { e.target.value === '' ? setDenominator(0) : setDenominator(parseInt(e.target.value))}}
                    className="w-16 h-16 text-3xl text-center bg-white border-2 border-black rounded-lg shadow-[-2px_2pxREGROUPED_0px_rgba(0,0,0,1)]"
                    placeholder="?"
                  />
                </div>
              </div>
            </div>
          }
          widthratio={70}
        />

        {step === 11 && (
          <div className='flex flex-col items-center justify-center gap-4'>
            <BlueText>
              <p className='text-3xl text-center'>
                IS IT REGROUPED?
              </p>
            </BlueText>

            <div className='flex items-center justify-center gap-4'>
              <BlueBox
                className='cursor-pointer'
                onClick={() => {
                  goToScreen('fourth', setGameStateRef);
                }}
              >
                YES
              </BlueBox>

              <BlueBox>
                NO
              </BlueBox>
            </div>
          </div>
        )}
        </div>
      )}

    </div>
  )
}