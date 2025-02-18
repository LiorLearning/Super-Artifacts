import { useGameState } from '../../state-utils';
import { BaseProps } from '../../utils/types';
import LeftArrow from '../../assets/LeftArrow.png';
import NewKey from '../../components/newKey';
import chest from '../../assets/chest-without-border.png';
import background from '../../assets/bg-small-with-hammer.png'


export default function Screen4Step1({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();

  return (
    <div className="mx-auto min-h-screen overflow-hidden" style={{ backgroundImage: `url(${background.src})`, backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat' }}>

      <div className='absolute flex items-center justify-center w-full gap-[3vh] translate-y-[5vh]'>
        <img src={LeftArrow.src} className='w-[3vh] h-auto' alt="left-arrow" />
        <div className='flex flex-col items-center justify-center'>
          <h1 className='translate-y-[4vh] text-[2.5vh]'>Level {gameStateRef.current.state2.key.level}</h1>
          <NewKey n={gameStateRef.current.state2.key.numerator} a={gameStateRef.current.state2.key.denominator_1} b={gameStateRef.current.state2.key.denominator_2} isActive={false} />
        </div>
        <div className='flex flex-col items-center justify-center'>
          <h1 className='-translate-y-[2vh] text-[3vh]'>Level {gameStateRef.current.state4.key.level}</h1>
          <NewKey  n={gameStateRef.current.state4.key.numerator} a={gameStateRef.current.state4.key.denominator_1} b={gameStateRef.current.state4.key.denominator_2} isActive={true} />
        </div>
        <div className='flex flex-col items-center justify-center'>
          <h1 className='translate-y-[4vh] text-[2.5vh]'>Level {gameStateRef.current.state3.key.level}</h1>
          <NewKey  n={gameStateRef.current.state3.key.numerator} a={gameStateRef.current.state3.key.denominator_1} b={gameStateRef.current.state3.key.denominator_2} isActive={false} />
        </div>
        <img src={LeftArrow.src} className='w-[3vh] h-auto transform rotate-180' alt="left-arrow" />
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