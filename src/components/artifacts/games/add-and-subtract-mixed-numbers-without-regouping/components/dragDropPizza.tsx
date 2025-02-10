"use client"

import React, { useState, useEffect } from 'react';
import PizzaSlices from './pizzaSlices';
import { sounds } from '../utils/sounds';
import MixedFraction from './mixedFraction';

interface DragDropPizzaProps {
  fraction1: {
    whole: number;
    numerator: number;
    denominator: number;
    color: string[];
    name: string;
  };
  fraction2: {
    whole: number;
    numerator: number;
    denominator: number;
    color: string[];
    name: string;
  };
  onComplete: () => void;
  sendAdminMessage: (role: string, content: string) => void;
}

const DragDropPizza: React.FC<DragDropPizzaProps> = ({
  fraction1,
  fraction2,
  onComplete,
  sendAdminMessage
}) => {
  // Track source pizzas
  const [sourcePizzas, setSourcePizzas] = useState({
    [fraction1.name]: {
      wholes: Array(fraction1.whole).fill(true),
      slices: true
    },
    [fraction2.name]: {
      wholes: Array(fraction2.whole).fill(true),
      slices: true
    }
  });

  // Track dropped pizzas
  const [droppedWholes, setDroppedWholes] = useState<{[key: string]: number}>({
    [fraction1.name]: 0,
    [fraction2.name]: 0
  });
  
  const [droppedSlices, setDroppedSlices] = useState<{[key: string]: number}>({
    [fraction1.name]: 0,
    [fraction2.name]: 0
  });

  // Add new state for input values
  const [answers, setAnswers] = useState({
    wholes: '',
    numerator: '',
    denominator: ''
  });

  // Check if all pieces are dropped
  const allPiecesDropped = 
    droppedWholes[fraction1.name] === fraction1.whole &&
    droppedWholes[fraction2.name] === fraction2.whole &&
    droppedSlices[fraction1.name] === fraction1.numerator &&
    droppedSlices[fraction2.name] === fraction2.numerator;

  // Calculate correct answers
  const correctWholes = fraction1.whole + fraction2.whole;
  const correctNumerator = fraction1.numerator + fraction2.numerator;
  const correctDenominator = fraction1.denominator; // assuming same denominator

  const handleDragStart = (e: React.DragEvent, type: 'whole' | 'slice', pizza: string, index?: number) => {
    sounds.drag(); // Play drag sound
    e.dataTransfer.setData('type', type);
    e.dataTransfer.setData('pizza', pizza);
    if (typeof index === 'number') {
      e.dataTransfer.setData('index', index.toString());
    }
  };

  const handleDropWhole = (e: React.DragEvent) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('type');
    const pizza = e.dataTransfer.getData('pizza');
    const index = parseInt(e.dataTransfer.getData('index'));
    
    if (type === 'whole' && sourcePizzas[pizza].wholes[index]) {
      sounds.drop(); // Play drop sound
      setSourcePizzas(prev => ({
        ...prev,
        [pizza]: {
          ...prev[pizza],
          wholes: prev[pizza].wholes.map((val, i) => i === index ? false : val)
        }
      }));

      setDroppedWholes(prev => ({
        ...prev,
        [pizza]: prev[pizza] + 1
      }));
    }
  };

  const handleDropSlice = (e: React.DragEvent) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('type');
    const pizza = e.dataTransfer.getData('pizza');
    
    if (type === 'slice' && sourcePizzas[pizza].slices) {
      sounds.drop(); // Play drop sound
      setSourcePizzas(prev => ({
        ...prev,
        [pizza]: {
          ...prev[pizza],
          slices: false
        }
      }));

      setDroppedSlices(prev => ({
        ...prev,
        [pizza]: pizza === fraction1.name ? fraction1.numerator : fraction2.numerator
      }));
    }
  };

  const allowDrop = (e: React.DragEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (allPiecesDropped) {
      sendAdminMessage("agent","Mamma mia!!, all the pizzas are served. Now just add the wholes separately and add the slices or fractions separately");
    }
  }, [allPiecesDropped]);

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAnswers(prev => ({
      ...prev,
      [name]: value
    }));

    // Check if all answers are correct
    const newAnswers = {
      ...answers,
      [name]: value
    };

    if (
      parseInt(newAnswers.wholes) === correctWholes &&
      parseInt(newAnswers.numerator) === correctNumerator &&
      parseInt(newAnswers.denominator) === correctDenominator
    ) {
      sounds.correct(); // Play correct sound
      onComplete();
    } else if (value !== '') {
      sounds.wrong(); // Play wrong sound when incorrect answer is entered
    }
  };

  // Input style based on whether pieces are dropped and answer correctness
  const getInputStyle = (value: string, correctValue: number) => {
    if (!allPiecesDropped) return 'bg-gray-100 text-gray-400 cursor-not-allowed';
    if (value === '') return 'bg-white';
    return parseInt(value) === correctValue ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };
 
  return (
    <div className='flex flex-col gap-4'>

      {/* Source Pizzas Display */}

      <div className='flex flex-col justify-evenly px-16 pt-4 gap-6'>

        {[
          { index: 0, pizza: fraction1, fraction: fraction1 },
          { index: 1, pizza: fraction2, fraction: fraction2 }
        ].map(({ index, pizza, fraction}) => (
          <div key={index} className={`min-h-32 flex gap-6 p-4 items-stretch border-2 border-gray-500 rounded-lg shadow-[-2px_2px_2px_rgba(0,0,0,0.8)]`} style={{ backgroundColor: pizza.color[2] }}>
            <span className='bg-white text-2xl rounded-lg px-2 pr-4  border-2 border-gray-500 flex items-center shadow-[inset_-2px_2px_2px_rgba(0,0,0,0.8)]'>
              <MixedFraction numerator={fraction.numerator} denominator={fraction.denominator} />
            </span>
            <p className='text-xl px-3 border-2 border-gray-500 bg-white rounded-lg flex-grow flex gap-2 items-center shadow-[inset_-2px_2px_2px_rgba(0,0,0,0.8)]'>
              {sourcePizzas[pizza.name].wholes.map((exists, index) => exists ? (
                <div
                  key={index}
                  draggable
                  onDragStart={(e) => handleDragStart(e, 'whole', pizza.name, index)}
                  className="flex flex-col items-center justify-center p-1 rounded-full border-[1px] border-black" style={{ backgroundColor: pizza.color[0] }}>
                  <div className="w-14 h-14 border-[1px] border-black shadow-[inset_0px_0px_4px_0px_rgba(0,0,0,0.5)] rounded-full" style={{ backgroundColor: pizza.color[1] }} />
                </div>


              ) : null)}
              {sourcePizzas[pizza.name].slices && (
                <div
                  draggable
                  onDragStart={(e) => handleDragStart(e, 'slice', pizza.name)}
                  className="cursor-move scale-75"
                >
                  <PizzaSlices
                    numerator={pizza.numerator}
                    denominator={pizza.denominator}
                    color={pizza === fraction1 ? ['#FFC5C6', '#E65A5A'] : ['#FFC98F','#E6DF5A']}
                  />
                  
                </div>
              )}
          </p>
          </div>
        ))}
           </div>

      {/* Drop Zones Container */}
      <div className='bg-orange-500 mt-4 p-8 px-16 flex flex-col gap-8'>

        {/* Instruction Banner */}
        <div className='bg-white border-2 border-black mx-auto p-1 shadow-[-3px_3px_0px_0px_rgba(0,0,0,1)]'>
          <p className='px-4 text-xl'>Drag wholes to the left and slices to the right</p>
        </div>

        <div className='flex text-xl gap-16'>
          {/* Whole Pizzas Drop Zone */}
          <div className='w-full bg-orange-50 rounded-2xl p-4 shadow-[-6px_6px_rgba(0,0,0,.7)]'>
            
            <div className='text-center py-2  border-2 border-black bg-white mb-2 shadow-[-2px_2px_0px_0px_rgba(0,0,0,1)]'>
              Whole Pizzas
            </div>

            <div className='text-sm text-gray-600  mb-4 text-center'>
              Drag the whole sections here
            </div>
            <div
              onDrop={handleDropWhole}
              onDragOver={allowDrop}
              className="flex flex-col gap-4 min-h-[120px]"
            >
              {/* Pepperoni Pizzas */}
              <div className="flex gap-2 flex-wrap">
                {Array.from({ length: droppedWholes[fraction1.name] }).map((_, i) => (
                  <div key={i} className="flex flex-col items-center justify-center p-1 rounded-full border-[1px] border-black" style={{ backgroundColor: fraction1.color[0] }}>
                  <div className="w-14 h-14 border-[1px] border-black shadow-[inset_0px_0px_4px_0px_rgba(0,0,0,0.5)] rounded-full" style={{ backgroundColor: fraction1.color[1] }} />
                </div>
                ))}
              </div>
              {/* Cheese Pizzas */}
              <div className="flex gap-2 flex-wrap">
                {Array.from({ length: droppedWholes[fraction2.name] }).map((_, i) => (
                  <div key={i} className="flex flex-col items-center justify-center p-1 rounded-full border-[1px] border-black" style={{ backgroundColor: fraction2.color[0] }}>
                    <div className="w-14 h-14 border-[1px] border-black shadow-[inset_0px_0px_4px_0px_rgba(0,0,0,0.5)] rounded-full" style={{ backgroundColor: fraction2.color[1] }} />
                  </div>
                ))}

              </div>
            </div>
            <div className='flex items-center justify-center gap-2 mt-4 text-xl '>
              <span
                className='border-2 border-black bg-white p-4 h-14'
              >{droppedWholes[fraction1.name]}</span>
              <span>+</span>
              <span
                className='border-2 border-black bg-white p-4 h-14'
              >{droppedWholes[fraction2.name]}</span>
              <span>=</span>
              <input
                type="text"
                name="wholes"
                placeholder={allPiecesDropped ? '?' : ''}
                value={answers.wholes}
                onChange={handleAnswerChange}
                disabled={!allPiecesDropped}
                className={`w-12 h-14 border-[3px] border-green-600 rounded text-center  ${getInputStyle(answers.wholes, correctWholes)}`}
              />
              <span className='ml-2'>Wholes</span>
            </div>
          </div>

          {/* Slices Drop Zone */}
          <div className='w-full bg-orange-50 rounded-2xl p-4 shadow-[-6px_6px_rgba(0,0,0,.7)]'>
            <div className='text-center py-2  border-2 border-black bg-white mb-2 shadow-[-2px_2px_0px_0px_rgba(0,0,0,1)]'>
              Slice Combiner
            </div>
            <div className='text-sm text-gray-600  mb-4 text-center'>
              Drag the sliced sections here
            </div>
            <div
              onDrop={handleDropSlice}
              onDragOver={allowDrop}
              className="flex justify-center gap-4 min-h-[120px]"
            >
              {Object.entries(droppedSlices).map(([pizza, count]) => count > 0 && (
                <PizzaSlices
                  key={`dropped-slice-${pizza}`}
                  numerator={count}
                  denominator={pizza === fraction1.name ? fraction1.denominator : fraction2.denominator}
                  // color={pizza === fraction1.name ? fraction1.color : fraction2.color}  
                  color={pizza === fraction1.name ? ['#FFC5C6', '#E65A5A'] : ['#FFC98F','#E6DF5A']}
                />
              ))}
            </div>
            <div className='flex items-center justify-center gap-2 mt-4 text-xl '>
              <div className='flex items-center gap-2'>
                <div className='flex flex-col items-center border-2 border-black px-4 py-2 bg-white justify-center'>
                  <span>{droppedSlices[fraction1.name]}</span>
                  <div className='w-4 h-[2px] bg-black'></div>
                  <span>{fraction1.denominator}</span>
                </div>
                <span>+</span>
                <div className='flex flex-col items-center border-2 border-black px-4 py-2 bg-white justify-center'>
                  <span>{droppedSlices[fraction2.name]}</span>
                  <div className='w-4 h-[2px] bg-black'></div>
                  <span>{fraction2.denominator}</span>
                </div>
                <span>=</span>
                <div className='flex flex-col items-center border-[3px] border-purple-500 rounded py-2 bg-white justify-center'>
                  <input
                    type="text"
                    name="numerator"
                    value={answers.numerator}
                    onChange={handleAnswerChange}
                    placeholder={allPiecesDropped ? '?' : ''}
                    disabled={!allPiecesDropped}
                    className={`w-12 border-none outline-none text-center  ${getInputStyle(answers.numerator, correctNumerator)}`}
                  />
                  <div className='w-8 h-[1px] bg-purple-500'></div>
                  <input
                    type="text"
                    name="denominator"
                    value={answers.denominator}
                    onChange={handleAnswerChange}
                    disabled={!allPiecesDropped}
                    placeholder={allPiecesDropped ? '?' : ''}
                    className={`w-12 border-none outline-none text-center  ${getInputStyle(answers.denominator, correctDenominator)}`}
                  />
                </div>
              </div>
              <span className='ml-2'>Fraction</span>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default DragDropPizza; 