import LegoGame from '../lego-game';
import Header from '../components/header';
import { useGameState } from '../state-utils';

const MainContent = () => {
  const { gameStateRef } = useGameState();
  const { step, fraction } = gameStateRef.current.state1;

  return (
    <div className="flex flex-col m-4">
      {step === 0 && (
        <div className="p-8 bg-white">
          <h2 className="text-3xl font-bold">
            Hey let us understand mixed fractions, with{' '}
            <span className="text-red-500 relative">
              LEGOS!
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500" />
            </span>
          </h2>
        </div>
      )}
      {step === 1 && (
        <div className="flex items-stretch justify-center gap-4">
          <div className="bg-white border-8 border-pink-500 px-6 py-2 flex items-center justify-center">
            <span className="text-xl font-bold">STEP 1</span>
          </div>
          <div className="flex-1 bg-pink-500 border-8 border-pink-500 flex items-center max-w-xl">
            <h2 className="text-white text-xl font-bold flex items-center gap-4 mx-auto">
              CREATE
              <div className="bg-white text-black px-3 py-1 inline-flex flex-col items-center">
                <span>{fraction.numerator}</span>
                <div className="w-3 h-px bg-black" />
                <span>{fraction.denominator}</span>
              </div>
              LEGO BLOCKS
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};

const Footer = () => {
  return (
    <div className="bg-white p-8">
      <h2 className="text-3xl font-bold">Footer</h2>
    </div>
  );
};


export default function FirstScreen() {
    const { gameStateRef } = useGameState();
    const { state1: { fraction } } = gameStateRef.current;

    return (
      <div className="mx-auto">
        <Header fraction={fraction} />
        <MainContent />
        <LegoGame />
        <Footer />
      </div>
    )
  }
  
  