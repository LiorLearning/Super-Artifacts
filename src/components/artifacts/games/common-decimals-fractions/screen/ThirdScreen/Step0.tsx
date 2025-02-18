import { BaseProps } from "../../utils/types";
import { useEffect, useRef } from "react";
import { goToStep } from "../../utils/helper";
import { useGameState } from "../../state-utils";
import background from "../../assets/bg-big-with-hammer.png"
import chest from '../../assets/chest-without-border.png'
import hammer from '../../assets/hammer.png'




export default function Screen3Step0({ sendAdminMessage }: BaseProps) {

  const {gameStateRef, setGameStateRef} = useGameState();
  const hasGameStartedRef = useRef(false);

  useEffect(() => {
    if (!hasGameStartedRef.current) {
      hasGameStartedRef.current = true;
      // sendAdminMessage('agent',
      //   `Let's start the game`,
      //   () => {
      //     goToStep('first', setGameStateRef, 1);
      //   });
    }
  }, []);

  return (
    <div className="mx-auto max-h-screen overflow-hidden" style={{ backgroundImage: `url(${background.src})`, backgroundSize: '100% 100%' }}>
      <div className='relative min-h-screen min-w-full pr-[5vw] translate-y-[10vh] flex justify-center items-center'>
        <img src={chest.src}
          className='absolute scale-[1.2] w-[80vh] h-auto -z-10 select-none'
          alt="chest"
        />
      </div>

    </div>
  )
}