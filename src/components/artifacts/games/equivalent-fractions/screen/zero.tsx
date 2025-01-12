import React, { useEffect, useRef } from 'react'
import { BaseProps } from '../utils/types'
import RedBox from '../components/RedBox'
import { cn } from '@/lib/utils'
import Fraction from '../components/Fraction'
import { useGameState } from '../state-utils'
import { Triangle } from 'lucide-react'

function Level0({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { screen1 } = gameStateRef.current;
  const { question } = screen1;
  const start = useRef(false);

  useEffect(() => {
    if (!start.current) {
      sendAdminMessage('agent', "2 out of 3 pieces is the same as how many out of 9?");
      start.current = true;
    }
  }, []);

  return (
    <div className="flex flex-col w-full">
      <div className={cn('flex w-full text-center text-3xl font-bold justify-center items-center gap-4 bg-[#F9F871] p-4 shadow-[0_5px_1px_rgba(0,0,0,1)]')}>
          Equivalent Fractions
      </div>

      <div className='flex justify-center items-center gap-4 p-8'>
        <div className="flex items-center text-3xl gap-4">
          <RedBox> Question </RedBox> 
          <p className='flex items-center gap-2 text-xl bg-red-500 font-bold text-white px-32 py-2'>
            <Fraction numerator={question.numerator1} denominator={question.denominator1} className='text-3xl bg-white p-4' />
            <span className='text-2xl'> = </span>
            <Fraction numerator={"?"} denominator={question.denominator2} className='text-3xl bg-white p-4' />
          </p>
        </div>
      </div>

      <p className='text-center text-2xl'>
        "2 out of 3 pieces is the same as how many out of 9?"
      </p>

      <div 
        className='flex justify-center items-center gap-4 p-8 cursor-pointer'
        onClick={() => {
          setGameStateRef(prev => ({
            ...gameStateRef.current,
            level: 1
          }));
        }}
      >
        <p className='text-center flex items-center gap-2 text-3xl font-bold'>
          Lets Find Out
          <Triangle className='text-3xl fill-green-500 text-green-500 rotate-90' />
        </p>
      </div>
    </div>    
  )
}

export default Level0