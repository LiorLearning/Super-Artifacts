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

      <div className='bg-[#f5f8e5] px-[4vw] py-[2vh] text-[1.7vw] leading-none rounded-[2vw] absolute left-1/2 transform -translate-x-1/2 translate-y-[10vh] shadow-lg opacity-90 flex justify-center items-center gap-[2vh]'>
        <div className='flex flex-col justify-center items-center'>
          <div className='bg-[#ffdc3e] w-[5vh] text-center p-[0.3vh] rounded-[1vh] border border-black shadow-[#c98600] shadow-[-2px_2px_0px_0px_rgba(0,0,0)]'>{n}</div>
          <div className='px-[3vh] border-b-[0.2vh] my-[0.8vh] border-[#8A1900]'></div>
          <div className='bg-[#ffdc3e] w-[5vh] text-center p-[0.3vh] rounded-[1vh] border border-black shadow-[#c98600] shadow-[-2px_2px_0px_0px_rgba(0,0,0)]'>{a * b}</div>
        </div>
        <h1 className='text-[#8A1900] scale-y-125'>Key is ready...</h1>
      </div>

      <div className='min-h-screen min-w-full pr-[5vw] translate-y-[10vh] flex flex-col justify-center items-center'>
        <img src={Chest.src}
          className='absolute scale-[1.2] z-10 h-[52vh] w-auto'
          alt="chest"
        />
        <div className='flex flex-wrap content-start absolute -translate-y-[1.5vh] translate-x-[3.7vh] w-[17vh] h-[17vh] z-20'>
          {Array.from({ length: (10 / b) * n }, (_, i) => (
            true && (
              <img
                key={`numerator-${i}`}
                style={{ height: `${100 / a}%` }}
                className='w-[1.7vh]'
                src={yellowbar.src}
                alt="numerator"
              />
            )
          ))}
        </div>
      </div>
    </div>
  );
}