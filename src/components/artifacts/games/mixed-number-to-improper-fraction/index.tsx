import { useGameState } from './state-utils';
import FirstScreen from './screen/first';
import SecondScreen from './screen/second';
import ThirdScreen from './screen/third';

export default function MixedNumberToImproperFraction() {
  const { gameStateRef } = useGameState();
  const currentScreen = gameStateRef.current.screen;

  return (
    <>
      {currentScreen === 'first' && <FirstScreen />}
      {currentScreen === 'second' && <SecondScreen />}
      {currentScreen === 'third' && <ThirdScreen />}
    </>
  );
} 