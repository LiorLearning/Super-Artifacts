import FirstScreen from './screen/first';
import { useGameState } from './state-utils';
export default function Game() {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { step } = gameStateRef.current.state1;

  return (
    <div className="mx-auto game font-jersey">
      <div className="flex space-x-4">
        <button onClick={() => setGameStateRef(prev => ({ ...prev, state1: { ...prev.state1, step: prev.state1.step - 1 } }))} className="bg-blue-500 text-white px-4 py-2 rounded-md" disabled={step <= 0}>Prev</button>
        <button onClick={() => setGameStateRef(prev => ({ ...prev, state1: { ...prev.state1, step: prev.state1.step + 1 } }))} className="bg-blue-500 text-white px-4 py-2 rounded-md">Next: {step}</button>
      </div>
      
      <FirstScreen />
      <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=Jersey+25&display=swap');
          .font-jersey {
            font-family: 'Jersey 25', cursive;
          }
        `}</style>
    </div>
  )
}