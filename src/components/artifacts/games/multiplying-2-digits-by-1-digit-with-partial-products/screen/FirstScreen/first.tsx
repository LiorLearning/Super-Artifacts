import MultiplyBox from '../../components/multiplybox';
import { useGameState } from '../../state-utils';
import { BaseProps } from '../../utils/types';


export default function FirstScreen({ sendAdminMessage }: BaseProps) {
  const { gameStateRef, setGameStateRef } = useGameState();

  return (
    <div className='bg-[#B9F7FF] min-h-screen flex justify-center items-center'>

      <div className=''>
        <MultiplyBox number1={23} number2={4} />
      </div>
    </div>
  ) 
}