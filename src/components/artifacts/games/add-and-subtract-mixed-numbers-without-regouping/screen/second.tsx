import { useGameState } from '../state-utils';
import Addition from '../components/header';
import { BaseProps, MixedFractionProps } from '../utils/types';
import MixedFraction from '../components/mixedFraction';
import Proceed from '../components/proceed';
import QuestionDescription from '../components/questionDescription';
import React, { useEffect, useState, useRef } from 'react';
import Intro from '../components/intro';
import { Button } from '@/components/ui/button';
import DragDropPizza from '../components/dragDropPizza';

import { QuestionDescriptionProps } from '../game-state';
import { goToStep } from '../utils/helper';

export default function SecondScreen({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const {step, fraction1, fraction2} = gameStateRef.current.state2;

  return (
    <div className="">
      <Addition fraction1={fraction1} fraction2={fraction2} version={step===0 ? 1 : 2} type='addition' />
      {
        step === 0 ?
          <Step1 sendAdminMessage={sendAdminMessage} />
        : step === 1 ?
          <Step2 sendAdminMessage={sendAdminMessage} />
        : step === 2 ?
          <Step3 sendAdminMessage={sendAdminMessage} />
        : null
      }
    </div>  
  );
}

const Step1 = ({ sendAdminMessage }: BaseProps) => {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { fraction1, fraction2 } = gameStateRef.current.state2;
  const start = useRef(false);

  useEffect(() => {
    if (!start.current) {
      sendAdminMessage("agent","Come on! Let's complete another order! Click next to start");
    }
    start.current = true;
  }, []);
  return (
    <div className="flex gap-8 flex-col w-full">
      <div className="w-full max-w-3xl mx-auto mt-20">
        <div className="bg-[#F97315] text-white text-5xl py-4 mb-[2px] border-2 border-gray-800 px-4  text-center shadow-[-2px_2px_0px_rgba(0,0,0,1)]">
          PIZZA ORDER
        </div>
        <div className="flex items-center justify-center gap-4 mt-8 shadow-[inset_-3px_3px_1px_rgba(0,0,0,0.3)] p-8 border-2 border-gray-800">
          <div className="flex bg-[#FFC5C6] p-2 items-stretch gap-2 border-2 border-gray-500 rounded-lg shadow-[-3px_3px_1px_rgba(0,0,0,0.5)]">
            <span className='bg-white rounded-lg border-2 pr-2 border-gray-500 flex items-center shadow-[inset_-1px_1px_0px_rgba(0,0,0,0.7)]'>
              <MixedFraction
                whole={fraction1.whole}
                numerator={fraction1.numerator}
                denominator={fraction1.denominator}
                className='text-2xl p-2'
              />
            </span>
            <p className='text-2xl p-3 border-2 border-gray-500 bg-white rounded-lg flex-grow flex gap-2 items-center shadow-[inset_-1px_1px_0px_rgba(0,0,0,0.7)]'>
              <div className={`flex flex-col items-center justify-center p-1 rounded-full border-[1px] border-black bg-[#FFC98F]`}>
                <div className={`w-12 h-12 bg-[#E65A5A] border-[1px] shadow-[inset_0px_0px_4px_0px_rgba(0,0,0,0.5)] border-black rounded-full`} />
              </div>
              Pepperoni Pizza
            </p>
          </div>
          <span className="text-5xl font-bold text-black">+</span>
          <div className="flex bg-yellow-200 p-2 items-stretch gap-2 border-2 border-gray-500 rounded-lg shadow-[-3px_3px_1px_rgba(0,0,0,0.5)]">
            <span className='bg-white rounded-lg border-2 pr-2 border-gray-500 flex items-center shadow-[inset_-1px_1px_0px_rgba(0,0,0,0.7)]'>
              <MixedFraction
                whole={fraction2.whole}
                numerator={fraction2.numerator}
                denominator={fraction2.denominator}
                className='text-2xl p-2'
              />
            </span>
            <p className='text-2xl p-3 border-2 border-gray-500 bg-white rounded-lg flex-grow flex gap-2 items-center shadow-[inset_-1px_1px_0px_rgba(0,0,0,0.7)]'>
              <div className={`flex flex-col items-center justify-center p-1 rounded-full border-[1px] border-black bg-[#FFC98F]`}>
                <div className={`w-12 h-12 bg-yellow-200 border-[1px] shadow-[inset_0px_0px_4px_0px_rgba(0,0,0,0.5)] border-black rounded-full`} />
              </div>
              Cheese Pizza
            </p>
          </div>
        </div>
      </div>
      <Button 
      onClick={() => {
        goToStep(2, setGameStateRef, 1); 
        sendAdminMessage('agent', "Let's break it down! Start with the pepperoni pizzas")}
      } 
      className='m-2 p-6 mx-auto bg-[#F97315] text-3xl text-white shadow-[-3px_3px_0px_rgba(0,0,0,1)] hover:bg-[#F97315] max-w-3xl rounded-none'>
        NEXT &gt;&gt;
      </Button>
    </div>
  );
};

const Step2 = ({ sendAdminMessage }: BaseProps) => {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { substep } = gameStateRef.current.state2
  const [useEffectTrigger, setUseEffectTrigger] = useState(0);
  const setSubStep = (value: number) => {
    setGameStateRef(prev => ({ ...prev, state2: { ...prev.state2, substep: value } }));
  }
  const {fraction1, fraction2} = gameStateRef.current.state2;

  const [question1description, setQuestion1description] = useState({
    showFirstRow: true,
    showSecondRow: false,
    showThirdRow: false,
    inputWhole: '',
    inputNumerator: '',
    inputDenominator: '',
  } as QuestionDescriptionProps);

  const [question2description, setQuestion2description] = useState({
    showFirstRow: true,
    showSecondRow: false,
    showThirdRow: false,
    inputWhole: '',
    inputNumerator: '',
    inputDenominator: '',
  } as QuestionDescriptionProps);

  useEffect(() => {
    if (question1description.showSecondRow === true && useEffectTrigger === 0) {
      setUseEffectTrigger(1);
      sendAdminMessage('agent', "Now the slices");
    }
  }, [question1description.showSecondRow]);

  useEffect(() => {
    if (useEffectTrigger === 1 && question2description.showThirdRow === true) {
      setUseEffectTrigger(2);
      sendAdminMessage('agent', "Now quickly fill in the cheeze order");
      
    }
  }, [useEffectTrigger]);

  useEffect(() => {
    if (question1description.inputWhole !== '' && parseInt(question1description.inputWhole)!=fraction1.whole){
      sendAdminMessage('agent', `Count the pepperoni pizzas in the box.`);
    }
  }, [question1description.inputWhole]);

  useEffect(() => {
    if (question1description.inputNumerator !== '' && parseInt(question1description.inputNumerator)!=fraction1.numerator){
      sendAdminMessage('agent', `Almost! Count the leftover slices carefully—how many do you see?`);
    }
  }, [question1description.inputNumerator]);

  useEffect(() => {
    if (question1description.inputDenominator !== '' && parseInt(question1description.inputDenominator)!=fraction1.denominator){
      sendAdminMessage('agent', `Not quite! Think about how many slices make up a whole pizza. Try again!`);
    }
  }, [question1description.inputDenominator]);

  useEffect(() => {
    if (question1description.inputWhole !== '' && parseInt(question1description.inputWhole)===fraction2.whole){
      sendAdminMessage('agent', `Yes! There is ${fraction2.whole} whole cheeze pizza. Great job counting!`);
    } else if (question2description.inputWhole !== '' && parseInt(question2description.inputWhole)!=fraction2.whole){
      sendAdminMessage('agent', `Oops! Remember, whole pizzas are the complete ones. Look at the illustration with yellow pizzas and try again!`);
    }
  }, [question2description.inputWhole]);

  useEffect(() => {
    if((question2description.inputNumerator !== '' && parseInt(question2description.inputNumerator)!=fraction2.numerator) || (question2description.inputDenominator !== '' && parseInt(question2description.inputDenominator)!=fraction2.denominator)){
      sendAdminMessage('agent', `take a hint from the slices in the yellow box`);
    }
  }, [question2description.inputNumerator, question2description.inputDenominator]);


  return(
    <div className='flex flex-col gap-4 w-full'>
    <div className={`flex p-8 gap-8 ${substep<2 && 'flex-col'} max-w-3xl mx-auto`}>
    { substep >= 0 &&
        <QuestionDescription 
          showFirstRow={question1description.showFirstRow}
          setShowFirstRow={(value) => setQuestion1description(prev => ({ ...prev, showFirstRow: value }))}
          showSecondRow={question1description.showSecondRow}
          setShowSecondRow={(value) => setQuestion1description(prev => ({ ...prev, showSecondRow: value }))}
          showThirdRow={question1description.showThirdRow}
          setShowThirdRow={(value) => setQuestion1description(prev => ({ ...prev, showThirdRow: value }))}

          inputWhole={question1description.inputWhole}
          setInputWhole={(value) => setQuestion1description(prev => ({ ...prev, inputWhole: value }))}
          inputNumerator={question1description.inputNumerator}
          setInputNumerator={(value) => setQuestion1description(prev => ({ ...prev, inputNumerator: value }))}
          inputDenominator={question1description.inputDenominator}
          setInputDenominator={(value) => setQuestion1description(prev => ({ ...prev, inputDenominator: value }))}

          whole={fraction1.whole} 
          numerator={fraction1.numerator} 
          denominator={fraction1.denominator} 
          pizzaName='pepperoni' 
          color={['#FFE6E6','#E65A5A','#FFF0F0','#E65A5A']}
          pizzacolor={['#FFC5C6', '#E65A5A']}

          onComplete={() => {
            setSubStep(1)
            setQuestion2description(prev => ({ ...prev, showFirstRow: true }))
          }} 
        />
    }
    { substep >= 2 && (
        <div className="flex items-center justify-center w-full">
          <span className="text-5xl ">
            +
          </span>
        </div>
    )}
    { substep >= 1 &&
        <QuestionDescription 
          showFirstRow={question2description.showFirstRow}
          setShowFirstRow={(value) => setQuestion2description(prev => ({ ...prev, showFirstRow: value }))}
          showSecondRow={question2description.showSecondRow}
          setShowSecondRow={(value) => setQuestion2description(prev => ({ ...prev, showSecondRow: value }))}
          showThirdRow={question2description.showThirdRow}
          setShowThirdRow={(value) => setQuestion2description(prev => ({ ...prev, showThirdRow: value }))}

          inputWhole={question2description.inputWhole}
          setInputWhole={(value) => setQuestion2description(prev => ({ ...prev, inputWhole: value }))}
          inputNumerator={question2description.inputNumerator}
          setInputNumerator={(value) => setQuestion2description(prev => ({ ...prev, inputNumerator: value }))}
          inputDenominator={question2description.inputDenominator}
          setInputDenominator={(value) => setQuestion2description(prev => ({ ...prev, inputDenominator: value }))}

          whole={fraction2.whole} 
          numerator={fraction2.numerator} 
          denominator={fraction2.denominator} 
          pizzaName='Cheese' 

          color={['#FFFDD1', '#DBD556', '#FFFEE6', '#D39400']}
          pizzacolor={['#FFC98F','#E6DF5A']}

          onComplete={() => {
            sendAdminMessage('agent', `Perfect! You've broken down the order, Can you rearrange the wholes and slices together?`);
            setSubStep(2)
          }}
        />
      }
      </div>
      { substep >= 2 &&
        <CombineFractionInput onComplete={() => setSubStep(4)} fraction1={fraction1} fraction2={fraction2} sendAdminMessage={sendAdminMessage} />
      }
      { substep >= 4 &&
        <Proceed onComplete={() => setGameStateRef(prev => ({ ...prev, screen: 3 }))} />
      }
    </div>
  )

}

const Step3 = ({ sendAdminMessage }: BaseProps) => {
  return (
    <div />
  )
}

export const CombineFractionInput: React.FC<{ 
  onComplete: () => void, 
  fraction1: MixedFractionProps, 
  fraction2: MixedFractionProps, 
  sendAdminMessage: (role: string, content: string) => void 
}> = ({ onComplete, fraction1, fraction2, sendAdminMessage }) => {
  const [whole1, setWhole1] = useState<string>('');
  const [whole2, setWhole2] = useState<string>('');
  const [whole3, setWhole3] = useState<string>('');

  const [numerator1, setNumerator1] = useState<string>('');
  const [numerator2, setNumerator2] = useState<string>('');
  const [numerator3, setNumerator3] = useState<string>('');

  const [denominator1, setDenominator1] = useState<string>('');
  const [denominator2, setDenominator2] = useState<string>('');
  const [denominator3, setDenominator3] = useState<string>('');

  const [second, setSecond] = useState<number>(0);

  const handleWholeChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWhole1(e.target.value);
    checkfirst(e.target.value,whole2,numerator1,numerator2,denominator1,denominator2)
  }

  const handleWholeChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWhole2(e.target.value);
    checkfirst(whole1,e.target.value,numerator1,numerator2,denominator1,denominator2)
  }

  const handleNumeratorChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumerator1(e.target.value);
    checkfirst(whole1,whole2,e.target.value,numerator2,denominator1,denominator2)
  }

  const handleNumeratorChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumerator2(e.target.value);
    checkfirst(whole1,whole2,numerator1,e.target.value,denominator1,denominator2)
  }

  const handleDenominatorChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDenominator1(e.target.value);
    checkfirst(whole1,whole2,numerator1,numerator2,e.target.value,denominator2)
  }

  const handleDenominatorChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDenominator2(e.target.value);
    checkfirst(whole1,whole2,numerator1,numerator2,denominator1,e.target.value)
  }

  const checkfirst = (whole1: string, whole2: string, numerator1: string, numerator2: string, denominator1: string, denominator2: string) => {
    if (
      parseInt(whole1)===fraction1.whole && 
      parseInt(whole2)===fraction2.whole && 
      parseInt(numerator1)===fraction1.numerator && 
      parseInt(numerator2)===fraction2.numerator && 
      parseInt(denominator1)===fraction1.denominator && 
      parseInt(denominator2)===fraction2.denominator
    ) {
      sendAdminMessage('agent', "There you are, add the wholes and fractions now, and you will have your answer");
      sendAdminMessage('agent', "There you are, add the wholes and fractions now, and you will have your answer");
      setSecond(1);
    }
  }

  const handleWholeChange3 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWhole3(e.target.value);
    checksecond(e.target.value,numerator3,denominator3)
  }

  const handleNumeratorChange3 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumerator3(e.target.value);
    checksecond(whole3,e.target.value,denominator3)
  }

  const handleDenominatorChange3 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDenominator3(e.target.value);
    checksecond(whole3,numerator3,e.target.value)
  }


  const checksecond = (whole3: string, numerator3: string, denominator3: string) => {
    console.log(whole3, numerator3, denominator3)
    console.log(fraction1.whole + fraction2.whole, fraction1.numerator + fraction2.numerator, fraction1.denominator)
    if (
      parseInt(whole3) === (fraction1.whole + fraction2.whole) && 
      parseInt(numerator3) === (fraction1.numerator + fraction2.numerator) && 
      parseInt(denominator3) === fraction1.denominator
    ) {
      sendAdminMessage('agent', "Woah, two in a row. Let's move to the next one");
      onComplete();
    }
  }

  useEffect(() => {
    if (numerator1 !== '' && denominator1 !== '' && numerator2 !== '' && denominator2 !== ''){
    }
  }, [whole1, whole2, numerator1, numerator2, denominator1, denominator2])

  return (
    <div className='w-full bg-green-50 flex py-20 flex-col justify-center items-center'>
      <div className="flex flex-col gap-8 items-center">
        <p className='text-2xl '>
          Rearrange to add the portions
        </p>

        <div className="flex gap-8 items-center">
          <div className="flex flex-col gap-2">
            <div className="border-4 shadow-[-2px_2px_0px_rgba(0,150,0,1)] border-green-600 rounded-2xl p-4">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={whole1}
                  onChange={handleWholeChange1}
                  min={0}
                  max={10}
                  placeholder="?"
                  className={`w-12 h-24 outline-none text-center text-2xl  border-2 border-green-600 rounded ${whole1!=='' ? ( parseInt(whole1)===fraction1.whole ? 'bg-green-200' : 'bg-red-200') : ''}`}
                />
                <span className="text-2xl ">+</span>
                <input
                  type="text"
                  value={whole2}
                  onChange={handleWholeChange2}
                  min={0}
                  max={10}
                  placeholder="?"
                  className={`w-12 h-24 outline-none text-center text-2xl  border-2 border-green-600 rounded ${whole2!=='' ? ( parseInt(whole2)===fraction2.whole ? 'bg-green-200' : 'bg-red-200') : ''}`}
                />
              </div>
            </div>
            <p 
              className='text-2xl  text-center'
            >
              Wholes
            </p>
          </div>

          <span className="text-2xl ">+</span>

          <div className='flex flex-col gap-2'>         
            <div className="border-4 shadow-[-2px_2px_0px_rgba(150,0,0,1)] border-purple-600 rounded-2xl p-4">
              <div className="flex items-center gap-2">
                <div className="flex flex-col items-center">
                  <input
                    type="text"
                    value={numerator1}
                    onChange={handleNumeratorChange1}
                    min={0}
                    max={10}
                    placeholder="?"
                    className={`w-12 h-12 outline-none text-center text-2xl  border-2 border-purple-600 rounded ${numerator1!=='' ? ( parseInt(numerator1)===fraction1.numerator ? 'bg-green-200' : 'bg-red-200') : ''}`}
                  />
                  <div className="w-full my-1 h-[2px] bg-purple-600" />
                  <input
                    type="text"
                    value={denominator1}
                    onChange={handleDenominatorChange1}
                    min={0}
                    max={10}
                    placeholder="?"
                    className={`w-12 h-12 outline-none text-center text-2xl  border-2 border-purple-600 rounded ${denominator1!=='' ? ( parseInt(denominator1)===fraction1.denominator ? 'bg-green-200' : 'bg-red-200') : ''}`}
                  />
                </div>
                <span className="text-2xl ">+</span>
                <div className="flex flex-col items-center">
                  <input
                    type="text"
                    value={numerator2}
                    onChange={handleNumeratorChange2}
                    min={0}
                    max={10}
                    placeholder="?"
                    className={`w-12 h-12 outline-none text-center text-2xl  border-2 border-purple-600 rounded ${numerator2!=='' ? ( parseInt(numerator2)===fraction2.numerator ? 'bg-green-200' : 'bg-red-200') : ''}`}
                  />
                  <div className="w-full my-1 h-[2px] bg-purple-600" />
                  <input
                    type="text"
                    value={denominator2}
                    onChange={handleDenominatorChange2}
                    min={0}
                    max={10}
                    placeholder="?"
                    className={`w-12 h-12 outline-none text-center text-2xl  border-2 border-purple-600 rounded ${denominator2!=='' ? ( parseInt(denominator2)===fraction2.denominator ? 'bg-green-200' : 'bg-red-200') : ''}`}
                  />
                </div>
              </div>
            </div>
            <p 
              className='text-2xl text-center'
            >
              Fractions
            </p>
          </div>
        </div>

        {(numerator1 !== '' && denominator1 !== '' && numerator2 !== '' && denominator2 !== '') && (
          <>
            <hr className='w-full border-1 border-black' />

            <p className="text-2xl text-green-600">Write in mixed form</p>
            <div className='flex flex-col gap-2'>
              <div className="flex items-center gap-8">
                <input
                  type="text"
                  value={whole3}
                  onChange={handleWholeChange3}
                  min={0}
                  max={10}
                  placeholder="?"
                  className={`w-12 h-12 outline-none text-center text-2xl  border-4 border-green-600 rounded ${whole3!=='' ? ( parseInt(whole3)===(fraction1.whole + fraction2.whole) ? 'bg-green-200' : 'bg-red-200') : ''}`}
                />
                
                <div className="flex flex-col items-center">
                  <input
                    type="text"
                    value={numerator3}
                    onChange={handleNumeratorChange3}
                    min={0}
                    max={10}
                    placeholder="?"
                    className={`w-12 h-12 outline-none text-center text-2xl  border-4 border-purple-600 rounded ${numerator3!=='' ? ( parseInt(numerator3)===(fraction1.numerator + fraction2.numerator) ? 'bg-green-200' : 'bg-red-200') : ''}`}
                  />
                  <div className="w-full my-1 h-[2px] bg-purple-600" />
                  <input
                    type="text"
                    value={denominator3}
                    onChange={handleDenominatorChange3}
                    min={0}
                    max={10}
                    placeholder="?"
                    className={`w-12 h-12 outline-none text-center text-2xl  border-4 border-purple-600 rounded ${denominator3!=='' ? ( parseInt(denominator3)===fraction1.denominator ? 'bg-green-200' : 'bg-red-200') : ''}`}
                  />
                </div>
              </div>
              <span className='flex  justify-between'>
                <p>Whole</p>
                <p>Fraction</p>
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}