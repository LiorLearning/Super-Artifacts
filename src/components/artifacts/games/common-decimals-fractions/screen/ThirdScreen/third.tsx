import { useGameState } from '../../state-utils';
import { BaseProps } from '../../utils/types';


export default function ThirdScreen({ sendAdminMessage }: BaseProps) {
  const { gameStateRef } = useGameState();
  return (
    <div className="mx-auto space-y-4 p-4">
      hello3
    </div>
  );
}