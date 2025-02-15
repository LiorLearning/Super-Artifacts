import { BaseProps } from "../../utils/types";
import { useEffect, useRef } from "react";
import { goToStep } from "../../utils/helper";
import { useGameState } from "../../state-utils";
import background1 from "../../assets/bg-big-without-chest.png"
import chest from '../../assets/chest-without-border.png'




export default function Screen1Step0({ sendAdminMessage }: BaseProps) {

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
    <div className="mx-auto max-h-screen overflow-hidden" style={{ backgroundImage: `url(${background1.src})`, backgroundSize: '100% 100%' }}>
       <div className='relative min-h-screen min-w-full pr-20 translate-y-20 flex justify-center items-center'>
        <img src={chest.src}
          className='absolute scale-[1.2]  z-10'
          alt="chest"
        />
      </div>
    </div>
  )

}