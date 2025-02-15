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
  const { n, a, b, level } = gameStateRef.current.state1.key;

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

  const inputClassName = 'w-12 my-2 p-2 px-3 text-3xl leading-none bg-[#ffdc3e] text-center border border-black rounded-md outline-none shadow-[#c98600] shadow-[-2px_2px_0px_0px_rgba(0,0,0)]';
  const decimalClassName = 'w-10 text-2xl leading-none text-center bg-white outline-none border-4 border-[#9c9b9b] rounded-md'

  return (
    <div className="mx-auto max-h-screen overflow-hidden" style={{ backgroundImage: `url(${background.src})`, backgroundSize: '100% 100%' }}>

      <div className='bg-[#f5f8e5] px-12 py-3 text-2xl leading-none rounded-[20px] absolute left-1/2 transform -translate-x-1/2 top-[20%] shadow-lg'>
        <h1 className='text-[#8A1900] scale-y-125 py-5'>What fraction of the lock is covered?</h1>
      </div>


      <div className='relative min-h-screen min-w-full pr-20 translate-y-20 flex justify-center items-center'>
        <img src={Chest.src}
          className='absolute scale-[1.2]  z-10'
          alt="chest"
        />
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

        <div className={`absolute flex flex-row justify-center items-center transform translate-x-[25px] -translate-y-[182px] gap-2 z-10`}>
          <NewInput
            value={decimal.before}
            onValueChange={(value) => setDecimal({ ...decimal, before: value })}
            correctValue='0'
            className={decimalClassName}
          />
          <div className='border-4 h-0 rounded-full border-white '></div>
          <NewInput
            value={decimal.after}
            onValueChange={(value) => setDecimal({ ...decimal, after: value })}
            correctValue='0'
            className={decimalClassName}
          />
        </div>

        <div className='absolute flex flex-col justify-center items-center pb-4 z-10 -translate-x-[108px] text-3xl'>
          <div className='bg-white px-3 p-2 w-12 text-center  rounded-lg border border-black leading-none'>{n}</div>
          <div className='px-6 border-b-2 my-2 border-white'></div>
          <div className='bg-white  px-3 p-2 w-12 text-center rounded-lg border border-black leading-none'>{a * b}</div>
        </div>

        <div className='absolute flex flex-col justify-center items-center pb-4 z-10 translate-x-[162px] text-3xl'>
          <NewInput
            value={num}
            onValueChange={(value) => setNum(value)}
            className={inputClassName}
            correctValue={((10 / b) * n).toString()}
            placeholder='?'
          />
          <div className='px-6 border-b-2 border-white'></div>
          <NewInput
            value={den}
            onValueChange={(value) => setDen(value)}
            className={inputClassName}
            correctValue={'10'}
            placeholder='?'
          />
        </div>
      </div>

      <div style={{ backgroundImage: `url(${downbanner.src})`, backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat' }} className='absolute w-[400px] h-[150px] left-1/2 transform -translate-x-[57%] top-[100%] flex justify-center items-center gap-4'>
        <div className='flex flex-col justify-center items-center pb-4 pl-4 text-xl'>
          <div className='bg-[#ffdc3e] w-8 text-center  rounded-lg border border-black shadow-[#c98600] shadow-[-2px_2px_0px_0px_rgba(0,0,0)]'>{n}</div>
          <div className='px-6 border-b-2 my-1 border-[#8A1900]'></div>
          <div className='bg-[#ffdc3e]  w-8 text-center rounded-lg border border-black shadow-[#c98600] shadow-[-2px_2px_0px_0px_rgba(0,0,0)]'>{a * b}</div>
        </div>
        <h1 className='text-[#8A1900] text-2xl scale-y-125 pb-4'>Key ENGAGED</h1>
      </div>
    </div>
  );
}