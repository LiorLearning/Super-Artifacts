import React from 'react'
import Header from '../components/header'
import Fraction from '../components/Fraction'
import { cn } from '@/lib/utils'
import RedBox, { RedBox2 } from '../components/RedBox'
import { Triangle } from 'lucide-react'
import { useGameState } from '../state-utils'
import { useRef, useEffect } from 'react'
import { BaseProps } from '../utils/types'

export default function IntroScreen({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { numerator, denominator } = gameStateRef.current.question.question1;
  const start = useRef(false);

  useEffect(() => {
    if (!start.current) {
      sendAdminMessage('agent', `We need to convert ${numerator}/${denominator} into a decimal. But what really is a decimal? Let's explore together!`);
      start.current = true;
    }
  }, []);

  return (
    <div className='w-full space-y-16 flex flex-col'>
      <div className={cn('flex justify-center text-3xl font-bold py-10 items-center gap-4 bg-[#F9F871] shadow-[0_5px_1px_rgba(0,0,0,1)]')}>
          Convert fractions in base 10 to decimals
      </div>

      <div className='flex justify-center items-center gap-4'>
        <div className="flex items-center gap-4 h-20">
          <RedBox2 className="h-full text-3xl flex items-center">
            Question
          </RedBox2>
          <p className='text-2xl bg-[#FF497C] font-bold text-white px-4 py-2 h-full flex items-center'>
            Convert 
            <Fraction numerator={numerator} denominator={denominator} className='text-1xl bg-white text-black px-2 py-2 mx-2 h-full flex items-center' />
            to a decimal
          </p>
        </div>
      </div>
      <button
        onClick={() => {
          setGameStateRef(prev => ({
            ...prev,
            screen: 'first',
          }));
        }}

        className="flex gap-2 font-bold text-3xl justify-center items-center bg-transparent hover:bg-transparent"
      >
        Let's Figure out
        <Triangle className="w-8 h-8 text-green-500 fill-green-500 rotate-90" />
      </button>
    </div>
  ) 
}
