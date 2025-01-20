import React from 'react';
import { useGameState } from '../state-utils';
import Bar from '../components/bar';
import Proceed from '../components/proceed';
import RedBox from '../components/RedBox';

interface FifthScreenProps {
  sendAdminMessage: (role: string, content: string) => void;
}

const FifthScreen: React.FC<FifthScreenProps> = ({ sendAdminMessage }) => {
  const { gameStateRef, setGameState } = useGameState();
  const { state5 } = gameStateRef.current;

  const handlePieceClick = (index: number) => {
    setGameState(draft => {
      draft.state5.selectedPieces = index;
    });
  };

  const handleProceed = () => {
    // Handle game completion
    sendAdminMessage('user', 'Completed the game');
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <RedBox className="mb-8">
        <h2 className="text-2xl mb-4">Final Screen</h2>
        <p>Complete the fraction conversion</p>
      </RedBox>

      <Bar
        numerator={state5.selectedPieces}
        denominator={1000}
        handlePieceClick={handlePieceClick}
        active={true}
      />

      <Proceed
        onClick={handleProceed}
        disabled={state5.selectedPieces === 0}
        text="Complete"
      />
    </div>
  );
};

export default FifthScreen; 