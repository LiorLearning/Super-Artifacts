import { useState } from 'react';
import { useGameState } from '../../state-utils';
import { BaseProps } from '../../utils/types';
import NewKey from '../../components/newKey';
import NewInput from '@/components/ui/newinput';
import chest from '../../assets/chest-without-border.png';
import background from '../../assets/bg-small-without-chest.png'


export default function Screen2Step2({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { n, a, b, level } = gameStateRef.current.state2.key;

  const [num, setNum] = useState('');
  const [den, setDen] = useState('');

  const inputClassName = 'p-[1vh] w-[3vw] text-center text-[1.7vw] leading-none bg-[#ffdc3e] text-center border border-black rounded-[1.2vh] outline-none shadow-[#c98600] shadow-[-0.15vw_0.15vw_0px_0px_rgba(0,0,0)]';

  return (
    <div className="mx-auto min-h-screen overflow-hidden" style={{ backgroundImage: `url(${background.src})`, backgroundSize: '100% 100%' }}>

      <div className='absolute flex justify-center items-center w-full translate-y-[7vh] gap-[4vh]'>
        <div className='flex flex-col justify-center items-center  mb-[15vh]'>
          <NewInput
            value={num}
            onValueChange={(value) => setNum(value)}
            className={inputClassName}
            correctValue={n.toString()}
            placeholder='?'
          />
          <div className='px-[3vh] my-[1.5vh] border-b-2 border-[#c98600]'></div>
          <NewInput
            value={den}
            onValueChange={(value) => setDen(value)}
            className={inputClassName}
            correctValue={(a*b).toString()}
            placeholder='?'
          />
        </div>
        <div className='mr-[11vh]'>
          <NewKey n={n} a={a} b={b} isActive={true} />
        </div>
      </div>

      <div className='relative min-h-screen min-w-full transform -translate-x-[4vh] translate-y-[27vh] flex justify-center items-center'>
        <img src={chest.src}
          className='absolute scale-[1.2] h-[48vh] w-auto z-10'
          alt="chest"
        />
      </div>    
    </div>
  );
}