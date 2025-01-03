import LegoGame from '../lego-game';
import Header from '../components/header';
import { useGameState } from '../state-utils';

export default function FirstScreen() {
    const { gameStateRef } = useGameState();
    const { state1: { fraction } } = gameStateRef.current;

    return (
      <div className="mx-auto">
        <Header fraction={fraction} />
  
        {/* Main Content */}
        <div className="p-8 bg-white">
          <h2 className="text-3xl font-bold mb-16">
            Hey let us understand mixed fractions, with{' '}
            <span className="text-red-500 relative">
              LEGOS!
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500" />
            </span>
          </h2>
  
          <div className="relative">
            <LegoGame />
          </div>
        </div>
      </div>
    )
  }
  
  