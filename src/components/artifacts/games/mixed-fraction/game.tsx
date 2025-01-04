import FirstScreen from './screen/first';
import SecondScreen from './screen/second';
import ThirdScreen from './screen/third';
import { useGameState } from './state-utils';

export default function Game() {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { screen, state1, state2, state3 } = gameStateRef.current;
  const { step } = state2;

  return (
    <>
      <div className="flex justify-between mt-4">
        <button className="bg-gray-500 text-white px-6 py-3 mx-2 shadow-lg text-xl rounded-none" onClick={() => {
          setGameStateRef(prev => ({ ...prev, state2: { ...prev.state2, step: prev.state2.step - 1 } }));
        }}>
          Previous Step
        </button>
        <span>{screen}: {step}</span>
        <button className="bg-blue-500 text-white px-6 py-3 mx-2 shadow-lg text-xl rounded-none" onClick={() => {
          setGameStateRef(prev => ({ ...prev, state2: { ...prev.state2, step: prev.state2.step + 1 } }));
        }}>
          Next Step
        </button>
      </div>

      <div className="mx-auto game font-jersey">
        {screen === 'first' && <FirstScreen />}
        {screen === 'second' && <SecondScreen />}
        {screen === 'third' && <ThirdScreen />}
        
        <style jsx global>{`
            @import url('https://fonts.googleapis.com/css2?family=Jersey+25&display=swap');
            .font-jersey {
              font-family: 'Jersey 25', cursive;
            }
          `}</style>
      </div>
    </>
  )
}