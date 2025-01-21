
import TemplateGame from './games/template/game';
import FractionAdditionGame from './games/add-fractions-with-common-denominator/game';
import FractionSubtractionGame from './games/subtract-fractions-with-common-denominator/game';
import AdditionGame from './games/addition-within-20-using-ten-frames/game';
import FractionsGame from './games/compare-fractions-with-same-numerator-or-denominator/game';
import EquivalentFractionsGame from './games/equivalent-fractions/game';
import MixedFractionGame from './games/add-and-subtract-mixed-numbers-without-regouping/game';
import LegoGame from './games/writing-improper-fractions-as-mixed-numbers/game';
import CommonDenominatorGame from './games/common-denominators/game';
import CompareFractionGame from './games/compare-fraction-with-the-different-numerator-and-denominator/game';

import { GameStateProvider as TemplateGameStateProvider, useGameState as TemplateGameState } from './games/template/state-utils'
import { GameStateProvider as FractionAdditionGameStateProvider, useGameState as FractionAdditionGameState } from './games/add-fractions-with-common-denominator/state-utils'
import { GameStateProvider as FractionSubtractionGameStateProvider, useGameState as FractionSubtractionGameState } from './games/subtract-fractions-with-common-denominator/state-utils'
import { GameStateProvider as AdditionGameStateProvider, useGameState as AdditionGameState } from './games/addition-within-20-using-ten-frames/state-utils'
import { GameStateProvider as FractionsGameStateProvider, useGameState as FractionsGameState } from './games/compare-fractions-with-same-numerator-or-denominator/state-utils'
import { GameStateProvider as EquivalentFractionsGameStateProvider, useGameState as EquivalentFractionsGameState } from './games/equivalent-fractions/state-utils'
import { GameStateProvider as LegoGameStateProvider, useGameState as LegoGameState } from './games/writing-improper-fractions-as-mixed-numbers/state-utils'
import { GameStateProvider as CommonDenominatorGameStateProvider, useGameState as CommonDenominatorGameState } from './games/common-denominators/state-utils'
import { GameStateProvider as MixedFractionGameStateProvider, useGameState as MixedFractionGameState } from './games/add-and-subtract-mixed-numbers-without-regouping/state-utils'
import { GameStateProvider as CompareFractionGameStateProvider, useGameState as CompareFractionGameState } from './games/compare-fraction-with-the-different-numerator-and-denominator/state-utils'

interface GameInfo {
  game: React.ComponentType<{ sendAdminMessage: (role: string, content: string) => void }>;
  useState: any;
  provider: React.ComponentType<{ children: React.ReactNode }>;
}

export const gameInfo: Record<string, GameInfo> = {
  'addition-within-20-using-ten-frames': {
    game: AdditionGame,
    useState: AdditionGameState,
    provider: AdditionGameStateProvider
  },
  // 'compare-fractions-with-same-numerator-or-denominator': {
  //   game: FractionsGame,
  //   desc: FractionsGameDesc,
  //   state: FractionsGameState,
  //   provider: FractionsGameStateProvider
  // },
  // 'equivalent-fractions': {
  //   game: EquivalentFractionsGame,
  //   desc: EquivalentFractionsGameDesc,
  //   state: EquivalentFractionsGameState,
  //   provider: EquivalentFractionsGameStateProvider
  // },
  'common-denominators': {
    game: CommonDenominatorGame,
    useState: CommonDenominatorGameState,
    provider: CommonDenominatorGameStateProvider
  },
  // 'subtract-fractions-with-common-denominator': {
  //   game: FractionSubtractionGame,
  //   desc: FractionSubtractionGameDesc,
  //   state: FractionSubtractionGameState,
  //   provider: FractionSubtractionGameStateProvider
  // },
  'add-fractions-with-common-denominator': {
    game: FractionAdditionGame,
    useState: FractionAdditionGameState,
    provider: FractionAdditionGameStateProvider
  },
  'add-and-subtract-mixed-numbers-without-regouping': {
    game: MixedFractionGame,
    useState: MixedFractionGameState,
    provider: MixedFractionGameStateProvider
  },
  'writing-mixed-numbers-as-improper-fractions': {
    game: LegoGame,
    useState: LegoGameState,
    provider: LegoGameStateProvider
  },
  'template-game': {
    game: TemplateGame,
    useState: TemplateGameState,
    provider: TemplateGameStateProvider
  },
  // 'compare-fractions-with-different-numerator-and-denominator': {
  //   game: CompareFractionGame,
  //   desc: CompareFractionGameDesc,
  //   state: CompareFractionGameState,
  //   provider: CompareFractionGameStateProvider
  // }
};
