import { useGameState } from '../../state-utils';
import { BaseProps } from '../../utils/types';
import LeftArrow from '../../assets/LeftArrow.png';
import NewKey from '../../components/newKey';
import Chest from '../../assets/chest-without-border.png';
import background from '../../assets/bg-small-without-chest.png'


export default function Screen2Step1({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const level4 = {
    n: gameStateRef.current.state4.key.n,
    a: gameStateRef.current.state4.key.a,
    b: gameStateRef.current.state4.key.b
  }
  const level3 = {
    n: gameStateRef.current.state3.key.n,
    a: gameStateRef.current.state3.key.a,
    b: gameStateRef.current.state3.key.b
  }
  const level2 = {
    n: gameStateRef.current.state2.key.n,
    a: gameStateRef.current.state2.key.a,
    b: gameStateRef.current.state2.key.b
  }
  
  return (
    <div className="mx-auto min-h-screen overflow-hidden relative" style={{ backgroundImage: `url(${background.src})`, backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat'}}>

      <div className='flex justify-center items-center space-x-8 text-2xl leading-none py-24 relative'>
        <div>
          <img src={LeftArrow.src} alt="left-arrow" />
        </div>
        <div className='flex flex-col items-center'>  
          <h1 className='absolute top-[84px] text-xl'>Level 4</h1>
          <NewKey n={level4.n} a={level4.a} b={level4.b} isActive={false}/>
        </div>
        <div className='flex flex-col items-center'> 
          <h1 className='absolute top-[50px] '>Level 2</h1>
          <NewKey n={level2.n} a={level2.a} b={level2.b} isActive={true}/>
        </div>
        <div className='flex flex-col items-center'> 
          <h1 className='absolute top-[84px] text-xl'>Level 3</h1>
          <NewKey n={level3.n} a={level3.a} b={level3.b} isActive={false}/>
        </div>
        <div>
          <img className='rotate-180' src={LeftArrow.src} alt="left-arrow" />
        </div>
      </div>
      <img src={Chest.src} className='absolute scale-[1.2] bottom-1 left-1/2 transform -translate-x-[55%] z-10' alt="chest" />
    </div>
  );
}