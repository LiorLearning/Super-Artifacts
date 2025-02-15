import { useEffect, useState } from 'react';
import { useGameState } from '../../state-utils';
import { BaseProps } from '../../utils/types';
import background1 from '../../assets/bg-big-without-chest.png'
import background2 from '../../assets/bg-big-without-chest2.png'
import yellowbar from '../../assets/yellow-key-bar.png'
import levermovement from '../../assets/lever-movement.gif'
import chestopen from '../../assets/open-chest-without-lever.png'
import chestclose from '../../assets/close-chest-without-lever.png'
import leveropen from '../../assets/lever-open.png'
import leverclose from '../../assets/lever-close.png'
import { goToStep } from '../../utils/helper';
import SuccessAnimation from '@/components/artifacts/utils/success-animate';

export default function Screen1Step7({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { n, a, b, level } = gameStateRef.current.state1.key;

  const inputClassName = 'w-12 my-2 p-2 px-3 text-3xl leading-none bg-[#ffdc3e] text-center border border-black rounded-md outline-none shadow-[#c98600] shadow-[-2px_2px_0px_0px_rgba(0,0,0)]';
  const decimalClassName = 'w-10 text-2xl leading-none text-center bg-white outline-none border-4 border-[#9c9b9b] rounded-md';




  const [leverState, setLeverState] = useState("up");

  const handleLeverClick = () => {
    if (leverState === "up") {
      setLeverState("down");
    }
  };

  return (
    <div className="mx-auto max-h-screen overflow-hidden" style={{ backgroundImage: `url(${leverState === "up" ? background1.src : background2.src})`, backgroundSize: '100% 100%' }}>

      <div className='relative min-h-screen min-w-full pr-20 translate-y-20 flex justify-center items-center'>
        {leverState==='up' ? <img src={chestclose.src}
          className='absolute scale-[1.2] -translate-x-[53px]  z-10'
          alt="chest"
        /> : 
        <img src={chestopen.src}
          className='absolute scale-[1.2] -translate-y-[50px]  z-10'
          alt="chest"
        />
        }
        <div className='flex flex-wrap content-start absolute -translate-y-2.5 translate-x-[28px] w-[130px] h-[130px] z-20'>
          {Array.from({ length: (10 / b) * n }, (_, i) => (
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

        <div className={`absolute flex flex-row justify-center items-center transform  ${leverState === 'up' ? '-translate-y-[182px] translate-x-[25px]' : '-translate-y-[267px] translate-x-[30px]' } gap-2 z-10`}>
          <div className={decimalClassName}>0</div>
          <div className='border-4 h-0 rounded-full border-white'></div>
          <div className={decimalClassName}>{((10 / b) * n).toString()}</div>
        </div>

        <div className='absolute flex flex-col justify-center items-center pb-4 z-10 -translate-x-[108px] text-3xl'>
          <div className='bg-white px-3 p-2 w-12 text-center rounded-lg border border-black leading-none'>{n}</div>
          <div className='px-6 border-b-2 my-2 border-white'></div>
          <div className='bg-white px-3 p-2 w-12 text-center rounded-lg border border-black leading-none'>{a * b}</div>
        </div>

        <div className='absolute flex flex-col justify-center items-center pb-4 z-10 translate-x-[162px] text-3xl'>
          <div className={inputClassName}>{((10 / b) * n).toString()}</div>
          <div className='px-6 border-b-2 border-white'></div>
          <div className={inputClassName}>10</div>
        </div>
        <img
          src={leverState === "up" ? leveropen.src : leverclose.src}
          alt="Lever"
          className="absolute cursor-pointer  translate-x-[285px] -translate-y-[28px]"
          onClick={handleLeverClick}
        />
      </div>

      {leverState === 'down' && <SuccessAnimation/>}
    </div>
  );
}