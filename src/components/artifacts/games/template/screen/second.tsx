import { useGameState } from '../state-utils';
import Header from '../components/header';
import { BaseProps } from '../utils/types';
import { useEffect, useRef, useState } from 'react';
import {NewInput} from '@/components/ui/newinput';

export default function SecondScreen({ sendAdminMessage }: BaseProps) {
  const { gameStateRef } = useGameState();
  const hasGameStartedRef = useRef(false);
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');
  const [value4, setValue4] = useState('');
  const [value5, setValue5] = useState('');
  const [value6, setValue6] = useState('');
  const [value7, setValue7] = useState('');

  useEffect(() => {
    if (!hasGameStartedRef.current) {
      hasGameStartedRef.current = true;
      sendAdminMessage('agent', "Let's explore different input variations! 🎯")
    }
  }, []);

  const onIncorrect = () => {
    sendAdminMessage('agent', "Hmmm, let's give that another try!");
  }

  const onCorrect = () => {
    sendAdminMessage('agent', "Great job! That's correct!");
  }

  const nthIncorrect = 2;
  const inputStyling = 'w-16 p-2 text-center text-2xl border-2 border-black rounded-lg'
  const nameStyling = 'w-[90%] rounded-lg flex justify-center items-center gap-4 bg-black/80 text-white p-4 py-6 font-normal text-xl leading-none'

  return (
    <div className="mx-auto my-12 flex-col justify-center items-center">
      {/* All features enabled but the correct answer length is 2 eg.21*/}
      <div className='flex justify-center items-center m-8 gap-8'>
        <div className={nameStyling}>
          <div>bg-color✅</div>
          <div>nth-incorrect(2)✅</div>
          <div>correct-function✅</div>
          <div>incorrect-function✅</div>
          <div>correct-value(21)✅</div>
        </div>
        <NewInput  
          value={value1} 
          correctValue='21'
          useColor={true}
          onValueChange={(value) => setValue1(value)} 
          onCorrect={onCorrect}
          onIncorrect={onIncorrect}
          nthIncorrect={nthIncorrect}
          placeholder='?'
          className={inputStyling}
        />
      </div>

      {/* All features enabled but the correct answer length is 1 eg.5*/}
      <div className='flex justify-center items-center m-8 gap-8'>
        <div className={nameStyling}>
          <div>bg-color✅</div>
          <div>nth-incorrect(2)✅</div>
          <div>correct-function✅</div>
          <div>incorrect-function✅</div>
          <div>correct-value(5)✅</div>
        </div>
        <NewInput  
          value={value6} 
          correctValue='5'
          useColor={true}
          onValueChange={(value) => setValue6(value)} 
          onCorrect={onCorrect}
          onIncorrect={onIncorrect}
          nthIncorrect={nthIncorrect}
          placeholder='?'
          className={inputStyling}
        />
      </div>

      {/* All features enabled but the correct answer length is 1 eg.5*/}
      <div className='flex justify-center items-center m-8 gap-8'>
        <div className={nameStyling}>
          <div>bg-color✅</div>
          <div>nth-incorrect❌</div>
          <div>correct-function✅</div>
          <div>incorrect-function✅</div>
          <div>correct-value(5)✅</div>
        </div>
        <NewInput  
          value={value7} 
          correctValue='5'
          useColor={true}
          onValueChange={(value) => setValue7(value)} 
          onCorrect={onCorrect}
          onIncorrect={onIncorrect}
          placeholder='?'
          className={inputStyling}
        />
      </div>

      {/* No background color */}
      <div className='flex justify-center items-center m-8 gap-8'>
        <div className={nameStyling}>
          <div>bg-color❌</div>
          <div>nth-incorrect(2)✅</div>
          <div>correct-function✅</div>
          <div>incorrect-function✅</div>
          <div>correct-value(22)✅</div>
        </div>
        <NewInput  
          value={value2} 
          correctValue='22'
          useColor={false}
          onValueChange={(value) => setValue2(value)} 
          onCorrect={onCorrect}
          onIncorrect={onIncorrect}
          nthIncorrect={nthIncorrect}
          placeholder='?'
          className={inputStyling}
        />
      </div>

      {/* No nth incorrect and no incorrect function */}
      <div className='flex justify-center items-center m-8 gap-8'>
        <div className={nameStyling}>
          <div>bg-color✅</div>
          <div>nth-incorrect❌</div>
          <div>correct-function✅</div>
          <div>incorrect-function❌</div>
          <div>correct-value(23)✅</div>
        </div>
        <NewInput  
          value={value3} 
          correctValue='23'
          useColor={true}
          onValueChange={(value) => setValue3(value)} 
          onCorrect={onCorrect}
          placeholder='?'
          className={inputStyling}
        />
      </div>

      {/* Only correct value and color */}
      <div className='flex justify-center items-center m-8 gap-8'>
        <div className={nameStyling}>
          <div>bg-color✅</div>
          <div>nth-incorrect❌</div>
          <div>correct-function❌</div>
          <div>incorrect-function❌</div>
          <div>correct-value(24)✅</div>
        </div>
        <NewInput  
          value={value4} 
          correctValue='24'
          useColor={true}
          onValueChange={(value) => setValue4(value)} 
          placeholder='?'
          className={inputStyling}
        />
      </div>

      {/* Only correct value validation */}
      <div className='flex justify-center items-center m-8 gap-8'>
        <div className={nameStyling}>
          <div>bg-color❌</div>
          <div>nth-incorrect❌</div>
          <div>correct-function❌</div>
          <div>incorrect-function❌</div>
          <div>correct-value(25)✅</div>
        </div>
        <NewInput  
          value={value5} 
          correctValue='25'
          useColor={false}
          onValueChange={(value) => setValue5(value)} 
          placeholder='?'
          className={inputStyling}
        />
      </div>
    </div>
  )
}
  
  