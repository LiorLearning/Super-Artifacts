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

export default function Screen2Step7({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { n, a, b, level } = gameStateRef.current.state2.key;

  const decimalClassName = 'w-[4vh] h-auto py-[0.4vh]  text-[3vh] leading-none text-center bg-white outline-none border-[0.2vh] border-[#9c9b9b] rounded-md'

  const [leverState, setLeverState] = useState("up");

  const handleLeverClick = () => {
    if (leverState === "up") {
      setLeverState("down");
    }
  };

  return (
    <div className="mx-auto max-h-screen overflow-hidden" style={{ backgroundImage: `url(${leverState === "up" ? background1.src : background2.src})`, backgroundSize: '100% 100%' }}>

      <div className='min-h-screen min-w-full pr-[5vw] translate-y-[10vh] flex flex-col justify-center items-center'>
        {leverState==='up' ? <img src={chestclose.src}
          className='absolute scale-[1.2] z-10 h-[52vh] -translate-x-[7vh] w-auto'
          alt="chest"
        /> : 
        <img src={chestopen.src}
          className='relative scale-[1.2] z-10 h-[64vh] w-auto -translate-y-[6.6vh]'
          alt="chest"
        />
        }
        <div className='flex flex-wrap content-start absolute -translate-y-[1.3vh] translate-x-[3.7vh] w-[17vh] h-[17.4vh] z-20'>
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

        <div className={`absolute flex justify-center items-center gap-[0.5vw] z-10  ${leverState === 'up' ? 'translate-x-[3.2vh] -translate-y-[24.2vh]' : '-translate-y-[35.7vh] translate-x-[3.8vh]' }`}>
          <div className={decimalClassName}>0</div>
          <div className='border-4 h-0 rounded-full border-white'></div>
          <div className={decimalClassName}>{((10 / b) * n).toString()}</div>
        </div>

        <div className='absolute flex flex-col justify-center items-center pb-[3vh] z-10 -translate-x-[15vh] text-[3.5vh]'>
          <div className='bg-white p-[1vh] w-[5.5vh] text-center rounded-[0.6vw] border border-black leading-none'>{n}</div>
          <div className='px-[2vw] border-b-[0.2vh] my-[1vh] border-white'></div>
          <div className='bg-white p-[1vh] w-[5.5vh] text-center rounded-[0.6vw] border border-black leading-none'>{a * b}</div>
        </div>

        <div className='absolute flex flex-col justify-center items-center pb-[3vh] z-10 translate-x-[22.5vh] text-[3.5vh]'>
          <div className='bg-[#ffdc3e] shadow-[#c98600] shadow-[-0.15vw_0.15vw_0px_0px_rgba(0,0,0)] p-[1vh] w-[5.5vh] text-center rounded-[0.6vw] border border-black leading-none'>{((10 / b) * n).toString()}</div>
          <div className='px-[2vw] border-b-[0.2vh] my-[1vh] border-white'></div>
          <div className='bg-[#ffdc3e] shadow-[#c98600] shadow-[-0.15vw_0.15vw_0px_0px_rgba(0,0,0)] p-[1vh] w-[5.5vh]  text-center rounded-[0.6vw] border border-black leading-none'>10</div>
        </div>

        <img
          src={leverState === "up" ? leveropen.src : leverclose.src}
          alt="Lever"
          className="absolute cursor-pointer w-auto h-[27vh] -translate-y-[3.7vh] translate-x-[38vh]"
          onClick={handleLeverClick}
        />
      </div>

      {leverState === 'down' && <SuccessAnimation/>}
    </div>
  );
}