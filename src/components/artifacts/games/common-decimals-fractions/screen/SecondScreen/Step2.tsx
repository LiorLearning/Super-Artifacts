import { useState } from 'react';
import { useGameState } from '../../state-utils';
import { BaseProps } from '../../utils/types';
import NewKey from '../../components/newKey';
import NewInput from '@/components/ui/newinput';
import Chest from '../../assets/chest-without-border.png';
import background from '../../assets/bg-small-without-chest.png'


export default function Screen2Step2({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { n, a, b, level } = gameStateRef.current.state2.key;

  const [num, setNum] = useState('');
  const [den, setDen] = useState('');

  const inputClassName = 'w-10 my-2 text-2xl bg-[#ffdc3e] text-center border border-black rounded-md outline-none shadow-[#c98600] shadow-[-2px_2px_0px_0px_rgba(0,0,0)]';

  return (
    <div className="mx-auto min-h-screen relative overflow-hidden" style={{ backgroundImage: `url(${background.src})`, backgroundSize: '100% 100%' }}>

      <div className='flex justify-center items-center pt-24 shad mr-[104px]'>

        <div className='flex flex-col justify-center items-center mr-8 mb-[90px]'>
          <NewInput
            value={num}
            onValueChange={(value) => setNum(value)}
            className={inputClassName}
            correctValue={n.toString()}
            placeholder='?'
          />
          <div className='px-[28px] border-b-2 border-[#c98600]'></div>
          <NewInput
            value={den}
            onValueChange={(value) => setDen(value)}
            className={inputClassName}
            correctValue={(a*b).toString()}
            placeholder='?'
          />
        </div>
        <div className='scale-[1.1]'>
          <NewKey n={n} a={a} b={b} isActive={true} />
        </div>
      </div>

      <img src={Chest.src} className='absolute scale-[1.2] bottom-1 left-1/2 transform -translate-x-[55%] z-10' alt="chest" />
    </div>
  );
}