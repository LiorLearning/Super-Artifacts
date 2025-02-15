import { useState } from 'react';
import { useGameState } from '../../state-utils';
import { BaseProps } from '../../utils/types';
import Chest from '../../assets/chest-with-key.png';
import background from '../../assets/bg-big-without-chest.png'
import yellowbar from '../../assets/yellow-key-bar.png'
import downbanner from '../../assets/down-banner.png'


export default function Screen1Step4({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { n, a, b, level } = gameStateRef.current.state1.key;

  return (
    <div className="mx-auto max-h-screen overflow-hidden " style={{ backgroundImage: `url(${background.src})`, backgroundSize: '100% 100%' }}>

        <div className='flex justify-center items-center gap-4 absolute left-1/2 transform -translate-x-1/2 translate-y-[60%]'>
          <div className='bg-[#f5f8e5] px-12 py-3 text-2xl leading-none rounded-[20px] flex items-center justify-center gap-4'>
            <div className='flex flex-col justify-center items-center'>
              <div className='bg-[#ffdc3e] w-8 text-center p-1 rounded-lg border border-black shadow-[#c98600] shadow-[-2px_2px_0px_0px_rgba(0,0,0)]'>{n}</div>
              <div className='px-6 border-b-2 my-2 border-[#8A1900]'></div>
              <div className='bg-[#ffdc3e] p-1 w-8 text-center rounded-lg border border-black shadow-[#c98600] shadow-[-2px_2px_0px_0px_rgba(0,0,0)]'>{a * b}</div>
            </div>
            <h1 className='text-[#8A1900] scale-y-125'>Key is ready...</h1>
          </div>
        </div>
      
        <div className='relative min-h-screen min-w-full pr-20 translate-y-28 flex justify-center items-center'>
          <img src={Chest.src} 
            className='absolute scale-[1.2]  z-10' 
            alt="chest" 
          />
          <div className='flex flex-wrap content-start absolute -translate-y-3 translate-x-[27px] w-[130px] h-[130px] z-20'>
            {Array.from({ length: (10/b) * n }, (_, i) => (
              true && (
                <img
                  key={`numerator-${i}`}
                  style={{ height: `${100 / a}%` }}
                  className='w-[13px]'
                  src={yellowbar.src}
                  alt="numerator"
                />
              )
            ))}
          </div>
        </div>


        <div style={{ backgroundImage: `url(${downbanner.src})`, backgroundSize: 'auto', backgroundRepeat: 'no-repeat' }} className='absolute h-[100px] left-1/2 transform -translate-x-1/2 -translate-y-28'>

        </div>
    </div>
  );
}