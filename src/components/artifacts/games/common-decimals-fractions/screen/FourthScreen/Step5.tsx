import { useEffect, useState } from 'react';
import { useGameState } from '../../state-utils';
import { BaseProps } from '../../utils/types';
import Chest from '../../assets/chest-with-border.png';
import Chest2 from '../../assets/chest-100.png'
import background from '../../assets/bg-big-without-chest.png'
import yellowbar from '../../assets/red-key-bar.png'
import yellowsinglebar from '../../assets/yellow-single-bar.png'
import downbanner from '../../assets/attempt-failed-bg.png'
import Hammer from '../../assets/hammer.png'
import { getIfColored } from '../../components/getIfColored';


export default function Screen4Step5({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();
  const n = gameStateRef.current.state4.key.numerator;
  const a = gameStateRef.current.state4.key.denominator_1;
  const b = gameStateRef.current.state4.key.denominator_2;

  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [onHammer, setOnHammer] = useState(false);

  // Update cursor position
  useEffect(() => {
    const updateCursor = (e: any) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateCursor);

    return () => window.removeEventListener("mousemove", updateCursor);
  }, []);

  return (
    <div className="mx-auto min-h-screen overflow-hidden" style={{ backgroundImage: `url(${background.src})`, backgroundSize: '100% 100%' }}>

      <div className='bg-[#f5f8e5] px-[4vw] py-[2vh] text-[1.7vw] leading-none rounded-[2vw] absolute left-1/2 transform -translate-x-1/2 translate-y-[10vh] shadow-lg opacity-90 flex justify-center items-center gap-[2vh]'>
        <div className='flex flex-col justify-center items-center'>
          <div className='bg-[#ffdc3e] w-[5vh] text-center p-[0.3vh] rounded-[1vh] border border-black shadow-[#c98600] shadow-[-2px_2px_0px_0px_rgba(0,0,0)]'>{n}</div>
          <div className='px-[3vh] border-b-[0.2vh] my-[0.8vh] border-[#8A1900]'></div>
          <div className='bg-[#ffdc3e] w-[5vh] text-center p-[0.3vh] rounded-[1vh] border border-black shadow-[#c98600] shadow-[-2px_2px_0px_0px_rgba(0,0,0)]'>{a * b}</div>
        </div>
        <h1 className='text-[#8A1900] scale-y-125'>Key is ready...</h1>
      </div>

      <div className='min-h-screen min-w-full pr-[5vw] translate-y-[10vh] flex flex-col justify-center items-center'>
        {onHammer ? <img src={Chest2.src}
          className='absolute scale-[1.2] z-10 h-[52vh] w-auto'
          alt="chest"
        /> : <img src={Chest.src}
          className='absolute scale-[1.2] z-10 h-[52vh] w-auto'
          alt="chest"
        />}

        {!onHammer ?
          <div className='flex flex-wrap content-start absolute -translate-y-[1.3vh] translate-x-[3.65vh] w-[17vh] h-[17.2vh] z-20'>
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
          </div> :
          <div className='flex flex-col content-start absolute -translate-y-[1.35vh] translate-x-[3.69vh] h-[17.2vh] w-[17.2vh] z-20'>
          {Array.from({ length: 10 }, (_, i) => (
            <div 
              key={`row-${i}`}
              className='flex flex-wrap content-start w-[17.2vh] h-[1.72vh] z-20'
            >
              {Array.from({ length: 10 }, (_, j) => (
                getIfColored(i, j, a, b, n) && (
                  <img
                    key={`cell-${i}-${j}`}
                    className='w-[1.72vh] h-auto'
                    src={yellowsinglebar.src}
                    alt="numerator"
                  />
                )
              ))}
            </div>
          ))}
        </div>}

        <div className='flex flex-col content-start  absolute -translate-y-[1.35vh] translate-x-[3.69vh] h-[17.2vh] w-[17.2vh] z-30 cursor-pointer' onClick={() => setOnHammer(!onHammer)}>
        </div>
      </div>

      <img
        src={Hammer.src}
        alt="Hammer Cursor"
        className="pointer-events-none fixed w-[15vh] h-auto opacity-90"
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
          transform: "translate(-35%, -30%)", // Centers the image on the cursor
        }}
      />

      <div style={{ backgroundImage: `url(${downbanner.src})`, backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat' }}
        className='absolute w-[22vw] h-[10vh] left-1/2 transform -translate-x-[53%] -translate-y-[18vh] flex justify-center items-center gap-[1.5vw]'>
        <h1 className='text-[#8A1900] text-[1.7vw] scale-y-125'>HAMMER ACTIVATED</h1>
      </div>
    </div>
  );
}