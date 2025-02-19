import { useEffect, useState } from 'react';
import { useGameState } from '../../state-utils';
import { BaseProps } from '../../utils/types';
import background1 from '../../assets/bg-big-without-chest.png'
import yellowbar from '../../assets/yellow-key-bar.png'
import chestopen from '../../assets/chest-open.png'
import chestclose from '../../assets/chest-with-border.png'
import SuccessAnimation from '@/components/artifacts/utils/success-animate';
import coin from '../../assets/coin.png'

export default function Screen1Step7({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const n = gameStateRef.current.state1.key.numerator;
  const a = gameStateRef.current.state1.key.denominator_1;
  const b = gameStateRef.current.state1.key.denominator_2;

  const decimalClassName = 'w-[4vh] h-auto py-[0.4vh]  text-[3vh] leading-none text-center bg-white outline-none border-[0.2vh] border-[#9c9b9b] rounded-md'

  const [leverState, setLeverState] = useState("up");

  const handleLeverClick = () => {
    if (leverState === "up") {
      setLeverState("down");
    } else {
      setLeverState("up");
    }
  };

  return (
    <div className="mx-auto max-h-screen overflow-hidden" style={{ backgroundImage: `url(${background1.src})`, backgroundSize: '100% 100%' }}>

      <div className='min-h-screen min-w-full pr-[5vw] translate-y-[10vh] flex flex-col justify-center items-center'>
        {leverState==='up' ? <img src={chestclose.src}
          className='absolute scale-[1.2] z-10 w-[83vh] h-auto'
          alt="chest"
        /> : 
        <img src={chestopen.src}
          className='absolute scale-[1.2] z-10 w-[83vh] h-auto -translate-y-[6.2vh]'
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

        <div className={`absolute flex justify-center items-center gap-[0.5vw] z-10  ${leverState === 'up' ? 'translate-x-[3.2vh] -translate-y-[24.2vh]' : '-translate-y-[35vh] translate-x-[3.4vh]' }`}>
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

        {leverState === "down" && <img className='absolute translate-y-[20vh] translate-x-[27.2vw] w-[5vw] h-[6vh]' src={coin.src} alt="coin" />}

        <div className="absolute z-20 cursor-pointer w-[15vh] h-[20vh] -translate-y-[8vh]  translate-x-[45vh]"
          onClick={handleLeverClick}>
        </div>
      </div>

      {leverState === 'down' && <SuccessAnimation/>}
    </div>
  );
}