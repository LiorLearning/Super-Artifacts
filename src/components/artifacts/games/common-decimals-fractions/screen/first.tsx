import { useState } from 'react';
import Background from '../components/background';
import Key from '../components/key';
import { useGameState } from '../state-utils';
import { BaseProps } from '../utils/types';
import ChestBox from '../components/chest';
import LeftArrow from '../assets/LeftArrow.png';
import RightArrow from '../assets/RightArrow.png';


export default function FirstScreen({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const fraction = gameStateRef.current.state1.fraction;

  const [keys, setKeys] = useState([
    { level: 1, numerator: 1, denominator: 2 },
    { level: 2, numerator: 1, denominator: 5 },
    { level: 3, numerator: 1, denominator: 6 }
  ]);

  const rotateLeft = () => {
    setKeys(prevKeys => {
      const newKeys = [...prevKeys];
      const lastKey = newKeys.pop()!;
      newKeys.unshift(lastKey);
      return newKeys;
    });
  };

  const rotateRight = () => {
    setKeys(prevKeys => {
      const newKeys = [...prevKeys];
      const firstKey = newKeys.shift()!;
      newKeys.push(firstKey);
      return newKeys;
    });
  };

  return (
    <div className="mx-auto min-h-screen relative" style={{ background: 'linear-gradient(to bottom, rgba(248, 245, 138, 1), rgba(57, 187, 240, 1))' }}>

      <div className='flex justify-center gap-10 items-center w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20'>
        <div className="cursor-pointer hover:scale-150 transition-transform" onClick={rotateLeft}>
          <img src={LeftArrow.src} alt="left-arrow" />
        </div>
        <div className='flex justify-center items-center  gap-10 z-10'>
          {keys.map((key, index) => (
            <Key key={index} numerator={key.numerator} denominator={key.denominator} columnKey={true} isActive={index === 1} level={key.level} />
          ))}
        </div>
        <div className="cursor-pointer hover:scale-150 transition-transform" onClick={rotateRight}>
          <img src={RightArrow.src} alt="right-arrow" />
        </div>
      </div>

      {/* <div className='absolute bottom-0 left-0 w-full flex justify-center z-10'>
        <ChestBox />
      </div> */}
      {/* <Background /> */}
    </div>
  );
}