import { useGameState } from '../state-utils';
import Header from '../components/header';
import { BaseProps } from '../utils/types';
import { MixedFractionProblem } from '../components/mixedFractionProblem';
import MixedFraction from '../components/mixedFraction';
import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function FirstScreen({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const {fraction1, fraction2} = gameStateRef.current.questions.question1;
  const { step, variable } = gameStateRef.current.state1;

  return (
    <div className="">
      <Header fraction1={fraction1} fraction2={fraction2} />
      {
        step === 0 ?
          <Step1 />
        : step === 1 ?
          <Step2 />
        : step === 2 ?
          <Step3 />
        : null
      }
    </div>
  );
}

const Step1 = () => {
  const { gameStateRef } = useGameState();
  const { fraction1, fraction2 } = gameStateRef.current.questions.question1;
  return (
    <div className="flex gap-8 flex-col w-full">
      <div className='flex max-w-5xl mx-auto items-center gap-4 mt-10'>
        <Image src='/img/pizzaboy.png' alt='pizzaboy' width={100} height={100} />
        <div className='flex flex-col p-8 border-2 border-black text-3xl rounded-lg'>
          Let us solve this by imagining a pizza factory! Suppose the question is nothing but a pizza order like this
        </div>
      </div>
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
    </div>
  );
}

const Step2 = () => {
  const { gameStateRef } = useGameState();
  const { fraction1, fraction2 } = gameStateRef.current.questions.question1;
  const [complete, setComplete] = useState(1);
  return (
    <div className="flex pb-8 gap-8 flex-col w-full scale-125 origin-top">

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
    { complete >= 1 &&
        <QuestionDescription whole={fraction1.whole} numerator={fraction1.numerator} denominator={fraction1.denominator} pizzaName='pepperoni' color='pink' onComplete={() => setComplete(2)} />
    }
    { complete >= 2 &&
        <QuestionDescription whole={fraction2.whole} numerator={fraction2.numerator} denominator={fraction2.denominator} pizzaName='cheese' color='yellow' onComplete={() => setComplete(3)} />
    }
    { complete >= 3 && 
      <Button 
        onClick={() => setComplete(4)}
        className='bg-lime-500 text-white font-bold w-16 mx-auto'
      >
        Next
      </Button> 
    }

    </div>
  )
}

const QuestionDescription = ({ whole, numerator, denominator, pizzaName, color, onComplete }: { whole: number, numerator: number, denominator: number, pizzaName: string, color: string, onComplete: () => void }) => {
  const [showSecondRow, setShowSecondRow] = useState(false);
  const [showThirdRow, setShowThirdRow] = useState(false);

  const [inputWhole, setInputWhole] = useState('');
  const [inputNumerator, setInputNumerator] = useState('');
  const [inputDenominator, setInputDenominator] = useState('');

  const [inputWhole2, setInputWhole2] = useState('');
  const [inputNumerator2, setInputNumerator2] = useState('');
  const [inputDenominator2, setInputDenominator2] = useState('');
  

  const handleWholeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputWhole(value);
    if (parseInt(value) === whole) {
      setShowSecondRow(true);
    } else {
      setShowSecondRow(false);
      setShowThirdRow(false);
    }
  };

  const handleNumeratorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputNumerator(value);
    if (parseInt(value) === numerator) {
      setShowThirdRow(true);
    } else {
      setShowThirdRow(false);
    }
  }

  const handleDenominatorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputDenominator(value);
    if (parseInt(value) === denominator) {
      setShowThirdRow(true);
    } else {
      setShowThirdRow(false);
    }
  }

  const handleWholeChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputWhole2(value);
    handleComplete(parseInt(value), parseInt(inputNumerator2), parseInt(inputDenominator2));
  }

  const handleNumeratorChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputNumerator2(value);
    handleComplete(parseInt(inputWhole2), parseInt(value), parseInt(inputDenominator2));
  }

  const handleDenominatorChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputDenominator2(value);
    handleComplete(parseInt(inputWhole2), parseInt(inputNumerator2), parseInt(value));
  }

  const handleComplete = (whole2: number, numerator2: number, denominator2: number) => {
    if (whole2 === whole && numerator2 === numerator && denominator2 === denominator) {
      console.log('complete');
      onComplete();
    }
  }

  return (
    <div className={`flex flex-col gap-4 max-w-3xl mx-auto`}>
      <div className="flex gap-4 items-center">
        <span className={`flex items-center w-full h-full justify-between border-2 border-${color}-800 bg-${color}-100 p-8 rounded-lg`}>
          <p className='text-xl w-2/3'>
            How many <span className='font-bold'>whole</span> {pizzaName} pizzas
            are ordered?
          </p>
          <input
            type="text"
            min={0}
            max={10}
            value={inputWhole}
            onChange={handleWholeChange}
            className={`border-2 text-center font-extrabold border-gray-600 rounded p-2 w-12 h-16 text-xl text-${color}-800`}
          />
        </span>

        <span className={`flex items-center w-full h-full justify-between border-2 border-${color}-800 bg-${color}-100 p-8 rounded-lg`}>
          <div className='flex gap-2'>
            {Array.from({ length: whole }).map((_, index) => (
              <div key={index} className={`flex flex-col items-center justify-center w-16 h-16 rounded-full border-2 border-${color}-800 bg-${color}-500`}>
                <div className={`w-14 h-14 bg-${color}-600 border-2 border-${color}-800 rounded-full`} />
              </div>
            ))}
          </div>
        </span>
      </div>
      {showSecondRow && (
        <div className="flex gap-4 items-center mt-4">
          <span className={`flex items-center w-full h-full justify-between border-2 border-${color}-800 bg-${color}-100 p-8 rounded-lg`}>
            <div className="flex justify-between items-center">
              <div className="mb-2 text-xl w-2/3">What fraction of {pizzaName} pizza is left?</div>
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  min={0}
                  max={10}
                  value={inputNumerator}
                  onChange={handleNumeratorChange}
                  className={`border-2 text-center font-extrabold border-${color}-600 rounded p-2 w-12 h-12 text-xl text-${color}-800`}
                />
                <span className='border-b-2 border-gray-600 w-12'></span>
                <input
                  type="text"
                  min={0}
                  max={10}
                  value={inputDenominator}
                  onChange={handleDenominatorChange}
                  className={`border-2 text-center font-extrabold border-${color}-600 rounded p-2 w-12 h-12 text-xl text-${color}-800`}
                />
              </div>
            </div>
          </span>

          <span className={`flex items-center w-full h-full justify-between border-2 border-${color}-800 bg-${color}-100 p-8 rounded-lg`}>
            <div className="relative w-16 h-16">
              <div className={`w-16 h-16 rounded-full border-2 border-${color}-800 bg-${color}-500 flex items-center justify-center`}>
                {numerator > 0 && denominator > 0 && (
                  <div className="absolute inset-0">
                    {Array.from({ length: denominator }).map((_, index) => (
                      <div
                        key={index}
                        className={`absolute w-1/2 h-1/2 origin-bottom-right transform -translate-x-1/2 -translate-y-1/2 
                          ${index < numerator ? `bg-${color}-600` : 'bg-transparent'}`}
                        style={{
                          transform: `rotate(${(360 / denominator) * index}deg) skewY(${90 - (360 / denominator)}deg)`
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </span>
        </div>
      )}
      {showThirdRow && (
        <div className={`bg-${color}-100 p-8 rounded-lg border-2 border-${color}-800`}>
          <div className="flex items-center justify-center gap-8">
            {/* Left side - Mixed Fraction */}
            <div className="flex items-center">
              <MixedFraction
                whole={whole}
                numerator={numerator}
                denominator={denominator}
                className='text-2xl font-extrabold'
              />
            </div>

            {/* Equals sign */}
            <div className="text-2xl font-bold">=</div>

            {/* Right side - Input fields */}
            <div className="flex items-center gap-4">
              {/* Whole number input */}
              <div className="flex flex-col items-center">
                <input 
                  type="text" 
                  value={inputWhole2} 
                  onChange={handleWholeChange2}
                  className={`border-2 text-center font-extrabold border-${color}-600 rounded p-2 w-12 h-12 text-xl text-${color}-800`} 
                />
                <span className="text-sm mt-1">Wholes</span>
              </div>

              <div className="text-2xl font-bold">+</div>

              {/* Fraction input */}
              <div className="flex flex-col items-center">
                <input 
                  type="text" 
                  value={inputNumerator2} 
                  onChange={handleNumeratorChange2}
                  className={`border-2 text-center font-extrabold border-${color}-600 rounded p-2 w-12 h-12 text-xl text-${color}-800`} 
                />
                <div className="w-12 border-b-2 border-gray-600 my-1"></div>
                <input 
                  type="text" 
                  value={inputDenominator2} 
                  onChange={handleDenominatorChange2}
                  className={`border-2 text-center font-extrabold border-${color}-600 rounded p-2 w-12 h-12 text-xl text-${color}-800`} 
                />
                <span className="text-sm mt-1">Slices</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

}

const Step3 = () => {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { fraction1, fraction2 } = gameStateRef.current.questions.question1;
  const [inputWhole, setInputWhole] = useState('');
  const [inputNumerator, setInputNumerator] = useState('');
  const [inputDenominator, setInputDenominator] = useState('');
  
  const [inputMixedNumerator, setInputMixedNumerator] = useState('');
  const [inputMixedDenominator, setInputMixedDenominator] = useState(''); 
  
  // Add state to track completion of each step
  const [showMixedForm, setShowMixedForm] = useState(false);
  const [showProceedButton, setShowProceedButton] = useState(false);

  const handleWholeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputWhole(value);
    checkFirstStepCompletion(value, inputNumerator, inputDenominator);
  }

  const handleNumeratorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputNumerator(value);
    checkFirstStepCompletion(inputWhole, value, inputDenominator);
  }

  const handleDenominatorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputDenominator(value);
    checkFirstStepCompletion(inputWhole, inputNumerator, value);
  }

  const handleMixedNumeratorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputMixedNumerator(value);
    checkMixedFormCompletion(value, inputMixedDenominator);
  }

  const handleMixedDenominatorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputMixedDenominator(value);
    checkMixedFormCompletion(inputMixedNumerator, value);
  }

  const checkFirstStepCompletion = (whole: string, numerator: string, denominator: string) => {
    if (
      parseInt(whole) === (fraction1.whole + fraction2.whole) &&
      parseInt(numerator) === (fraction1.numerator + fraction2.numerator) &&
      parseInt(denominator) === fraction1.denominator && // Assuming denominators are same
      denominator !== ''
    ) {
      setShowMixedForm(true);
    }
  }

  const checkMixedFormCompletion = (numerator: string, denominator: string) => {
    if (
      parseInt(inputWhole) === (fraction1.whole + fraction2.whole) &&
      parseInt(numerator) === (fraction1.numerator + fraction2.numerator) &&
      parseInt(denominator) === fraction1.denominator &&
      denominator !== ''
    ) {
      setShowProceedButton(true);
    }
  }

  const handleProceed = () => {
    // Update game state to move to next step
    const newGameState = { ...gameStateRef.current };
    newGameState.state1.step = 3; // or whatever the next step should be
    setGameStateRef(newGameState);
  }

  return (
    <div className='flex flex-col'>
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
        ].map((pizza) => (
          <div className='flex items-center mt-4 gap-4'>
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

      <div className='flex flex-col gap-4 p-8 my-4 bg-red-300'>

        <div className='shadow-[-5px_5px_0px_rgba(0,0,0)] max-w-3xl mx-auto border-2 border-black text-black bg-white p-4'>
          <p className='text-xl font-bold'>
            What is the total number of pizzas ordered?
          </p>
        </div>

        <div className='flex gap-4'>
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
              ].map((pizza) => (
                <div className='flex gap-2'>
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
                <div className='w-12 h-14 bg-white text-orange-600 font-extrabold flex items-center justify-center border-2 border-black'>{fraction1.whole}</div>
                <div>+</div>
                <div className='w-12 h-14 bg-white text-green-600 font-extrabold flex items-center justify-center border-2 border-black'>{fraction2.whole}</div>
                <div>=</div>
                <input 
                  type="text" 
                  value={inputWhole}
                  min={0}
                  max={10}
                  placeholder='?'
                  className='w-12 h-14 text-center rounded-lg border-2 border-black' 
                  onChange={handleWholeChange}
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
                  <div className="flex bg-white text-2xl flex-col items-center border-2 border-black rounded">
                    <input 
                      type="text" 
                      value={inputNumerator}
                      min={0}
                      max={10}
                      placeholder='?'
                      className='w-14 h-10 outline-none text-center rounded-lg pt-2'
                      onChange={handleNumeratorChange}
                    />
                    <div className="w-4 h-[2px] bg-black" />
                    <input 
                      type="text" 
                      value={inputDenominator}
                      min={0}
                      max={10}
                      placeholder='?'
                      className='w-14 h-10 outline-none text-center rounded-lg pt-2'
                      onChange={handleDenominatorChange}
                    />
                  </div>
                </div>
                <div className='text-3xl font-bold'>Slices</div>
              </div>
            </div>

          </div>


        </div>

        {showMixedForm && (
          <div className='flex flex-col p-4 bg-green-300'>
            <div className="flex items-center gap-4">
              <div className="text-xl font-bold">Write in mixed form</div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputWhole}
                  readOnly
                  className="w-12 h-12 outline-none text-center text-2xl border-2 border-green-800 rounded bg-gray-100"
                />
                <div className="flex flex-col items-center">
                  <input
                    type="text"
                    value={inputMixedNumerator}
                    min={0}
                    max={10} 
                    placeholder="?"
                    className="w-12 h-12 outline-none text-center text-2xl border-2 border-green-800 rounded"
                    onChange={handleMixedNumeratorChange}
                  />
                  <div className="w-4 h-[2px] bg-green-800" />
                  <input
                    type="text"
                    value={inputMixedDenominator}
                    min={0}
                    max={10}
                    placeholder="?"
                    className="w-12 h-12 outline-none text-center text-2xl border-2 border-green-800 rounded" 
                    onChange={handleMixedDenominatorChange}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {showProceedButton && (
          <Button 
            onClick={handleProceed}
            className='bg-green-500 text-white font-bold py-2 px-4 rounded mx-auto mt-4'
          >
            Proceed
          </Button>
        )}
      </div>
    </div>
  )
}