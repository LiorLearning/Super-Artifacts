import { useGameState } from '../state-utils';
import { HeaderAddition } from '../components/header';
import { BaseProps } from '../utils/types';
import MixedFraction from '../components/mixedFraction';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import QuestionDescription from '../components/questionDescription';
import Intro from '../components/intro';
import Proceed from '../components/proceed';

export default function FirstScreen({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const {fraction1, fraction2} = gameStateRef.current.questions.question1;
  const { step } = gameStateRef.current.state1;

  return (
    <div className="">
      <HeaderAddition fraction1={fraction1} fraction2={fraction2} />
      {
        step === 1 ?
          <Step1 />
        : step === 2 ?
          <Step2 />
        : step === 3 ?
          <Step3 />
        : null
      }
    </div>
  );
}

const Step1 = () => {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { fraction1, fraction2 } = gameStateRef.current.questions.question1;
  return (
    <div className="flex gap-8 flex-col w-full">
      <Intro text="Let us solve this by imagining a pizza factory! Suppose the question is nothing but a pizza order like this" />
      <div className="w-full max-w-3xl mx-auto">
        <div className="bg-lime-200 py-4 mb-[2px] border-2 font-extrabold border-gray-800 px-4 rounded-t-lg text-center">
          Total Order
        </div>
        <div className="flex items-center justify-center gap-4 p-8 border-2 border-gray-800 rounded-b-lg">
          <div className="flex items-center gap-2 border-2 border-gray-800 rounded-lg">
            <span className='bg-pink-100 rounded-lg'>
              <MixedFraction
                whole={fraction1.whole}
                numerator={fraction1.numerator}
                denominator={fraction1.denominator}
                className='text-xl font-extrabold p-3'
              />
            </span>
            <p className='text-xl font-extrabold p-3'>Pepperoni Pizza</p>
          </div>  
          <span className="text-5xl font-bold text-red-500">+</span>
          <div className="flex items-center gap-2 rounded-lg border-2 border-gray-800">
            <span className='bg-yellow-100 rounded-lg'>
              <MixedFraction
                whole={fraction2.whole}
                numerator={fraction2.numerator}
                denominator={fraction2.denominator}
                className='text-xl font-extrabold p-3'
              />
            </span>
            <p className='text-xl font-extrabold p-3'>Cheese Pizza</p>
          </div>
        </div>
      </div>
      <Button onClick={() => setGameStateRef(prev => ({ ...prev, state1: { ...prev.state1, step: 2 } }))} className='m-2 mx-auto bg-lime-500 hover:bg-lime-600 max-w-3xl'>Next Step</Button>
    </div>
  );
}

const Step2 = () => {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { fraction1, fraction2 } = gameStateRef.current.questions.question1;
  const complete = gameStateRef.current.state1.step2Substep
  const setComplete = (value: number) => {
    setGameStateRef(prev => ({ ...prev, state1: { ...prev.state1, step2Substep: value } }));
  }

  return (
    <div className="flex pb-8 gap-8 flex-col w-full">

      {/* question  */}
      <div className="w-full max-w-3xl mt-10 mx-auto">
        <div className="bg-lime-200 py-4 mb-[2px] border-2 font-extrabold border-gray-800 px-4 rounded-t-lg text-center">
          Total Order
        </div>
        <div className="flex items-center justify-center gap-4 p-8 border-2 border-gray-800 rounded-b-lg">
          <div className="flex w-full items-center gap-2 border-2 border-gray-800 rounded-lg">
            <span className='bg-pink-100 rounded-lg'>
              <MixedFraction
                whole={fraction1.whole}
                numerator={fraction1.numerator}
                denominator={fraction1.denominator}
                className='text-xl font-extrabold p-3'
              />
            </span>
            <p className='text-xl font-extrabold p-3'>Pepperoni Pizza</p>
          </div>  
          <span className="text-5xl font-bold text-red-500">+</span>
          <div className="flex w-full items-center gap-2 rounded-lg border-2 border-gray-800">
            <span className='bg-yellow-100 rounded-lg'>
              <MixedFraction
                whole={fraction2.whole}
                numerator={fraction2.numerator}
                denominator={fraction2.denominator}
                className='text-xl font-extrabold p-3'
              />
            </span>
            <p className='text-xl font-extrabold p-3'>Cheese Pizza</p>
          </div>
        </div>
      </div>

    {/* explaining inital pizzas */}
    { complete >= 0 &&
        <QuestionDescription whole={fraction1.whole} numerator={fraction1.numerator} denominator={fraction1.denominator} pizzaName='pepperoni' color='pink' onComplete={() => setComplete(1)} />
    }
    { complete >= 1 &&
        <QuestionDescription whole={fraction2.whole} numerator={fraction2.numerator} denominator={fraction2.denominator} pizzaName='cheese' color='yellow' onComplete={() => setComplete(2)} />
    }
    { complete >= 2 && 
      <Button 
        onClick={() => setGameStateRef(prev => ({ ...prev, state1: { ...prev.state1, step: 3 } }))}
        className='bg-lime-500 text-white font-bold w-16 mx-auto hover:bg-lime-600'
      >
        Next
      </Button> 
    }

    </div>
  )
}





const Step3 = () => {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { fraction1, fraction2 } = gameStateRef.current.questions.question1;
  const {screen} = gameStateRef.current;

  // States for first section (Whole Pizzas)
  const [wholeInputs, setWholeInputs] = useState({
    input: '',
    isCorrect: false
  });

  // States for second section (Slices)
  const [fractionInputs, setFractionInputs] = useState({
    numerator: '',
    denominator: '',
    isCorrect: false
  });

  // States for mixed form
  const [mixedFormInputs, setMixedFormInputs] = useState({
    whole: '',
    numerator: '',
    denominator: '',
    isCorrect: false
  });

  // Computed values
  const totalWhole = fraction1.whole + fraction2.whole;
  const totalNumerator = fraction1.numerator + fraction2.numerator;
  const commonDenominator = fraction1.denominator; // Assuming same denominator

  // Handle whole number input
  const handleWholeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const isCorrect = parseInt(value) === totalWhole;
    setWholeInputs({
      input: value,
      isCorrect
    });
  };

  // Handle fraction inputs
  const handleFractionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newInputs = {
      ...fractionInputs,
      [name]: value
    };

    const isCorrect = 
      parseInt(newInputs.numerator || '0') === totalNumerator && 
      parseInt(newInputs.denominator || '0') === commonDenominator;

    setFractionInputs({
      ...newInputs,
      isCorrect
    });
  };

  // Handle mixed form inputs
  const handleMixedFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newInputs = {
      ...mixedFormInputs,
      [name]: value
    };

    const isCorrect = 
      parseInt(newInputs.whole || '0') === totalWhole &&
      parseInt(newInputs.numerator || '0') === totalNumerator &&
      parseInt(newInputs.denominator || '0') === commonDenominator;

    setMixedFormInputs({
      ...newInputs,
      isCorrect
    });
  };

  // Show mixed form when both whole and fraction inputs are correct
  const showMixedForm = wholeInputs.isCorrect && fractionInputs.isCorrect;

  // Show proceed button when mixed form is correct
  const showProceedButton = mixedFormInputs.isCorrect;

  const handleProceed = () => {
    setGameStateRef(prev => ({ ...prev, screen: 2 }));
  };

  // Helper function to get input style based on correctness
  const getInputStyle = (isCorrect: boolean, baseColor: string) => {
    return `border-2 text-center font-extrabold rounded p-2 w-12 h-12 text-xl
      ${isCorrect ? 'border-green-600 bg-green-100' : `border-${baseColor}-600`}
      ${isCorrect ? 'text-green-800' : `text-${baseColor}-800`}`;
  };

  return (
    <div className='flex flex-col pb-16'>
      <div className='flex-col py-4 max-w-3xl mx-auto'>
        {[
          {
            pizzaName: 'Pepperoni',
            whole: fraction1.whole,
            numerator: fraction1.numerator,
            denominator: fraction1.denominator,
            color: 'pink',
          },
          {
            pizzaName: 'Mushroom',
            whole: fraction2.whole,
            numerator: fraction2.numerator,
            denominator: fraction2.denominator,
            color: 'yellow',
          }
        ].map((pizza, index) => (
          <div key={index} className='flex items-center mt-4 gap-4'>
            <span className='text-xl font-bold'>
              {pizza.pizzaName}
            </span>
            <span className='flex gap-2'>

              {Array.from({ length: pizza.whole }).map((_, index) => (
                <div key={index} className={`flex flex-col items-center justify-center w-16 h-16 rounded-full border-2 border-${pizza.color}-800 bg-${pizza.color}-200`}>
                  <div className={`w-14 h-14 bg-${pizza.color}-600 rounded-full border-2 border-${pizza.color}-800`} />
                </div>
              ))}

              {/* <div className='flex flex-col items-center justify-center w-16 h-16 rounded-full border-2 border-${pizza.color}-800 bg-${pizza.color}-500'>
                {Array.from({ length: pizza.denominator }).map((_, index) => (
                  <div key={index} className={`absolute w-1/2 h-1/2 origin-bottom-right transform -translate-x-1/2 -translate-y-1/2 
                    ${index < pizza.numerator ? `bg-${pizza.color}-600` : 'bg-transparent'}`}
                    style={{
                      transform: `rotate(${(360 / pizza.denominator) * index}deg) skewY(${90 - (360 / pizza.denominator)}deg)`
                    }}
                  />
                ))}
              </div> */}

            </span>
          </div>
        ))}
      </div>

      <div className='flex flex-col gap-16  p-8 my-4 bg-red-300'>

        <div className='shadow-[-5px_5px_0px_rgba(0,0,0)] max-w-3xl mx-auto border-2 border-black text-black bg-white p-4'>
          <p className='text-xl font-bold'>
            What is the total number of pizzas ordered?
          </p>
        </div>

        <div className='flex gap-8 mx-16'>
          <div className='flex flex-col bg-red-100 rounded-xl shadow-[-5px_5px_0px_rgba(150,0,0)] p-8 w-1/2'>
            <div className='shadow-[-5px_5px_0px_rgba(0,0,0)] max-w-3xl mx-auto border-2 border-black text-black bg-white p-4'>
              <p className='text-lg font-bold'>
                Whole Pizzas
              </p>
            </div>

            <div className='flex flex-col mt-8 mx-auto gap-4'>
              {[
                {
                  whole: fraction1.whole,
                  color: 'pink',
                },
                {
                  whole: fraction2.whole,
                  color: 'yellow',
                }
              ].map((pizza, index) => (
                <div key={index} className='flex gap-2'>
                  {Array.from({ length: pizza.whole }).map((_, index) => (
                    <div key={index} className={`flex flex-col items-center justify-center w-16 h-16 rounded-full border-2 border-${pizza.color}-800 bg-${pizza.color}-500`}>
                    <div className={`w-14 h-14 bg-${pizza.color}-600 border-2 border-${pizza.color}-800 rounded-full`} />
                      </div>
                    ))}
                </div>
              ))}
            </div>

            <div className='flex flex-col items-center mt-8'>
              <div className='flex items-center gap-4 text-4xl font-bold'>
                <div className='w-12 h-14 bg-white text-orange-600 font-extrabold flex items-center justify-center border-2 border-black'>
                  {fraction1.whole}
                </div>
                <div>+</div>
                <div className='w-12 h-14 bg-white text-green-600 font-extrabold flex items-center justify-center border-2 border-black'>
                  {fraction2.whole}
                </div>
                <div>=</div>
                <input 
                  type="text" 
                  name="whole"
                  value={wholeInputs.input}
                  onChange={handleWholeChange}
                  className="w-12 h-12 outline-none text-center text-2xl font-bold border-2 border-purple-600 rounded"
                  placeholder="?"
                />
                <div className='text-3xl font-bold'>Wholes</div>
              </div>
            </div>
            </div>


            <div className='flex flex-col bg-red-100 rounded-xl shadow-[-5px_5px_0px_rgba(150,0,0)] p-8 w-1/2'> 
              <div className='shadow-[-5px_5px_0px_rgba(0,0,0)] max-w-3xl mx-auto border-2 border-black text-black bg-white p-4'>
                <p className='text-lg font-bold'>
                  Slice Combiner
                </p>
              </div>

              <div className='flex justify-center items-center gap-8 mt-8'>
                {[
                  {
                    numerator: fraction1.numerator,
                    denominator: fraction1.denominator,
                    color: 'pink',
                  },
                  {
                    numerator: fraction2.numerator,
                    denominator: fraction2.denominator,
                    color: 'yellow',
                  }
                ].map((pizza, idx) => (
                  <div key={idx} className='flex flex-col items-center gap-4'>
                    <div className={`relative w-32 h-32 rounded-full border-4 border-${pizza.color}-800 bg-${pizza.color}-200 overflow-hidden`}>
                      {Array.from({ length: pizza.denominator }).map((_, index) => {
                        const angle = (360 / pizza.denominator);
                        return (
                          <div
                            key={index}
                            className={`absolute w-1/2 h-1/2 left-1/2 top-1/2
                              ${index < pizza.numerator ? `bg-${pizza.color}-500` : 'bg-transparent'}`}
                            style={{
                              transformOrigin: '0% 100%',
                              transform: `rotate(${angle * index}deg) skewY(${angle >= 90 ? angle - 90 : angle}deg)`,
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center items-center gap-4 mt-8">
                <div className="flex items-center gap-2">
                  <div className="flex bg-white text-2xl p-2 px-4 flex-col items-center border-2 border-pink-800 rounded">
                    <div className="">{fraction1.numerator}</div>
                    <div className="w-4 h-[2px] bg-pink-800" />
                    <div className="">{fraction1.denominator}</div>
                  </div>
                    <div className="text-2xl">+</div>
                    <div className="flex bg-white text-2xl p-2 px-4 flex-col items-center border-2 border-yellow-800 rounded">
                    <div className="">{fraction2.numerator}</div>
                    <div className="w-4 h-[2px] bg-yellow-800" />
                    <div className="">{fraction2.denominator}</div>
                  </div>
                  <div className="text-2xl">=</div>
                  <div className="flex text-2xl flex-col items-center rounded">
                    <input 
                      type="text" 
                      name="numerator"
                      value={fractionInputs.numerator}
                      onChange={handleFractionChange}
                      className={`border-2 text-center font-extrabold border-gray-600 rounded p-2 w-12 h-16 text-xl`}
                      placeholder="?"
                    />
                    <div className="h-[2px] bg-black" />
                    <input 
                      type="text" 
                      name="denominator"
                      value={fractionInputs.denominator}
                      onChange={handleFractionChange}
                      className={`border-2 text-center font-extrabold border-gray-600 rounded p-2 w-12 h-16 text-xl`}
                      placeholder="?"
                    />
                  </div>
                </div>
                <div className='text-3xl font-bold'>Slices</div>
              </div>
            </div>

          </div>    


        </div>

        {showMixedForm && (
          <div className='flex flex-col py-16 items-center gap-4 p-4 bg-green-100'>
              <div className="text-3xl font-bold text-green-600">Write in mixed form</div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  name="whole"
                  value={mixedFormInputs.whole}
                  onChange={handleMixedFormChange}
                  className={getInputStyle(mixedFormInputs.isCorrect, 'green')}
                  placeholder="?"
                />
                <div className="flex flex-col items-center">
                  <input
                    type="text"
                    name="numerator"
                    value={mixedFormInputs.numerator}
                    onChange={handleMixedFormChange}
                    className={getInputStyle(mixedFormInputs.isCorrect, 'pink')}
                    placeholder="?"
                  />
                  <div className="w-full my-2 h-[2px] bg-green-800" />
                  <input
                    type="text"
                    name="denominator"
                    value={mixedFormInputs.denominator}
                    onChange={handleMixedFormChange}
                    className={getInputStyle(mixedFormInputs.isCorrect, 'pink')}
                    placeholder="?"
                  />
                </div>
              </div>
          </div>
        )}

        {showProceedButton && <Proceed onComplete={handleProceed} />}
      </div>
  );
};


