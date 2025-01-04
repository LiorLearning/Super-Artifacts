import FirstScreen from './screen/first';
import SecondScreen from './screen/second';
import ThirdScreen from './screen/third';
import { useGameState } from './state-utils';

export default function Game() {
  const { gameStateRef, setGameStateRef } = useGameState();
  const { screen } = gameStateRef.current;

  return (
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
  )
}