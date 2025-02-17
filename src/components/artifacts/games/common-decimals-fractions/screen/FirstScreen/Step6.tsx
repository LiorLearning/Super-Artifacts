import { useEffect, useState } from 'react';
import { useGameState } from '../../state-utils';
import { BaseProps } from '../../utils/types';
import NewInput from '@/components/ui/newinput';
import Chest from '../../assets/chest-with-border.png';
import background from '../../assets/bg-big-without-chest.png'
import yellowbar from '../../assets/yellow-key-bar.png'
import downbanner from '../../assets/down-banner.png'
import { goToStep } from '../../utils/helper';



export default function Screen1Step6({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const n = gameStateRef.current.state1.key.numerator;
  const a = gameStateRef.current.state1.key.denominator_1;
  const b = gameStateRef.current.state1.key.denominator_2;

  const [num, setNum] = useState('');
  const [den, setDen] = useState('');
  const [decimal, setDecimal] = useState({
    before: '',
    after: ''
  });


  useEffect(() => {
    if (num === ((10 / b) * n).toString() && den === '10') {
      sendAdminMessage('agent', 'correct');
    }
  }, [num, den])


  useEffect(() => {
    if (num === ((10 / b) * n).toString() && den === '10') {
      if (decimal.before === '0' && decimal.after === ((10 / b) * n).toString()) {
        sendAdminMessage('agent', 'correct', () => goToStep('first', setGameStateRef, 7));
      }
    }
  }, [decimal])

  const inputClassName = 'px-[ p-[1vh] w-[5.5vh] text-center text-[3.5vh] leading-none bg-[#ffdc3e] text-center border border-black rounded-md outline-none shadow-[#c98600] shadow-[-0.15vw_0.15vw_0px_0px_rgba(0,0,0)]';
  const decimalClassName = 'w-[4vh] h-auto py-[0.4vh]  text-[3vh] leading-none text-center bg-white outline-none border-[0.2vh] border-[#9c9b9b] rounded-md'

  return (
    <div className="mx-auto max-h-screen overflow-hidden" style={{ backgroundImage: `url(${background.src})`, backgroundSize: '100% 100%' }}>

      <div className='bg-[#f5f8e5] px-[4vw] py-[2vh] text-[1.7vw] leading-none rounded-[2vw] absolute left-1/2 transform -translate-x-1/2 translate-y-[10vh] shadow-lg opacity-90'>
        <h1 className='text-[#8A1900] scale-y-125 py-[2vh]'>What fraction of the lock is covered?</h1>
      </div>


      <div className='min-h-screen min-w-full pr-[5vw] translate-y-[10vh] flex flex-col justify-center items-center'>
        <img src={Chest.src}
          className='absolute scale-[1.2] z-10 h-[52vh] w-auto'
          alt="chest"
        />
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
        <div className={`absolute flex justify-center items-center translate-x-[2vw] -translate-y-[24.2vh] gap-[0.5vw] z-10`}>
          <NewInput
            value={decimal.before}
            onValueChange={(value) => setDecimal({ ...decimal, before: value })}
            correctValue='0'
            className={decimalClassName}
          />
          <div className='border-[0.3vw] mt-[1.5vh] h-0 rounded-full border-white '></div>
          <NewInput
            value={decimal.after}
            onValueChange={(value) => setDecimal({ ...decimal, after: value })}
            correctValue='0'
            className={decimalClassName}
          />
        </div>
        <div className='absolute flex flex-col justify-center items-center pb-[3vh] z-10 -translate-x-[15vh] text-[3.5vh]'>
          <div className='bg-white p-[1vh] w-[5.5vh] text-center rounded-[0.6vw] border border-black leading-none'>{n}</div>
          <div className='px-[2vw] border-b-[0.2vh] my-[1vh] border-white'></div>
          <div className='bg-white p-[1vh] w-[5.5vh] text-center rounded-[0.6vw] border border-black leading-none'>{a * b}</div>
        </div>

        <div className='absolute flex flex-col justify-center items-center pb-[3vh] z-10 translate-x-[22.6vh] text-[2vw]'>
          <NewInput
            value={num}
            onValueChange={(value) => setNum(value)}
            className={inputClassName}
            correctValue={((10 / b) * n).toString()}
            placeholder='?'
          />
          <div className='px-[2vw] border-b-[0.2vh] my-[1vh] border-white'></div>
          <NewInput
            value={den}
            onValueChange={(value) => setDen(value)}
            className={inputClassName}
            correctValue={'10'}
            placeholder='?'
          />
        </div>
      </div>

      <div style={{ backgroundImage: `url(${downbanner.src})`, backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat' }}
        className='absolute w-[25vw] h-[18vh] left-1/2 transform -translate-x-[53%] -translate-y-[20vh] flex justify-center items-center gap-[1.5vw]'>
        <div className='flex flex-col justify-center items-center pb-[2.5vh] pl-[2vw] text-[1.5vw]'>
          <div className='bg-[#ffdc3e] w-[2.5vw] text-center rounded-lg border border-black shadow-[#c98600] shadow-[-0.2vw_0.2vw_0px_0px_rgba(0,0,0)]'>{n}</div>
          <div className='px-[2vw] border-b-2 my-[0.5vh] border-[#8A1900]'></div>
          <div className='bg-[#ffdc3e] w-[2.5vw] text-center rounded-lg border border-black shadow-[#c98600] shadow-[-0.2vw_0.2vw_0px_0px_rgba(0,0,0)]'>{a * b}</div>
        </div>
        <h1 className='text-[#8A1900] text-[1.7vw] scale-y-125 pb-[2vh]'>Key ENGAGED</h1>
      </div>
    </div>
  );
}