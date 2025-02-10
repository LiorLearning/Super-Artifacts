import TemplateGame from './games/template/game';
import FractionAdditionGame from './games/add-fractions-with-common-denominator/game';
import FractionSubtractionGame from './games/subtract-fractions-with-common-denominator/game';
import AdditionGame from './games/addition-within-20-using-ten-frames/game';
import FractionsGame from './games/compare-fractions-with-same-numerator-or-denominator/game';
import EquivalentFractionsGame from './games/equivalent-fractions/game';
import MixedFractionGame from './games/add-and-subtract-mixed-numbers-without-regouping/game';
import LegoGame from './games/writing-improper-fractions-as-mixed-numbers/game';
import CommonDenominatorGame from './games/common-denominators/game';
import CompareFractionGame from './games/compare-fractions-with-different-numerator-and-denominator/game';
import DecimalGame from './games/fraction-to-decimal/game';
import MixedFractionGameWithRegouping from './games/add-and-subtract-mixed-numbers-with-regouping/game';
import MixedNumberToImproperFractionGame from './games/mixed-number-to-improper-fraction/game';
import MultiplyingWholesAndFractionsGame from './games/multiplying-wholes-and-Fractions/game';

import { initialGameState as templateInitialState } from './games/template/game-state';
import { initialGameState as fractionAdditionInitialState } from './games/add-fractions-with-common-denominator/game-state';
import { initialGameState as fractionSubtractionInitialState } from './games/subtract-fractions-with-common-denominator/game-state';
import { initialGameState as additionGameInitialState } from './games/addition-within-20-using-ten-frames/game-state';
import { initialGameState as fractionsGameInitialState } from './games/compare-fractions-with-same-numerator-or-denominator/game-state';
import { initialGameState as equivalentFractionsGameInitialState } from './games/equivalent-fractions/game-state';
import { initialGameState as legoGameInitialState } from './games/writing-improper-fractions-as-mixed-numbers/game-state';
import { initialGameState as commonDenominatorGameInitialState } from './games/common-denominators/game-state';
import { initialGameState as compareFractionGameInitialState } from './games/compare-fractions-with-different-numerator-and-denominator/game-state';
import { initialGameState as decimalGameInitialState } from './games/fraction-to-decimal/game-state';
import { initialGameState as mixedFractionGameWithRegoupingInitialState } from './games/add-and-subtract-mixed-numbers-with-regouping/game-state';
import { initialGameState as mixedNumberToImproperFractionGameInitialState } from './games/mixed-number-to-improper-fraction/game-state';
import { initialGameState as multiplyingWholesAndFractionsGameInitialState } from './games/multiplying-wholes-and-Fractions/game-state';
import { initialGameState as mixedFractionWithoutRegoupingInitialState } from './games/add-and-subtract-mixed-numbers-without-regouping/game-state';

import { GameStateProvider as TemplateGameStateProvider, useGameState as TemplateGameState } from './games/template/state-utils'
import { GameStateProvider as FractionAdditionGameStateProvider, useGameState as FractionAdditionGameState } from './games/add-fractions-with-common-denominator/state-utils'
import { GameStateProvider as FractionSubtractionGameStateProvider, useGameState as FractionSubtractionGameState } from './games/subtract-fractions-with-common-denominator/state-utils'
import { GameStateProvider as AdditionGameStateProvider, useGameState as AdditionGameState } from './games/addition-within-20-using-ten-frames/state-utils'
import { GameStateProvider as FractionsGameStateProvider, useGameState as FractionsGameState } from './games/compare-fractions-with-same-numerator-or-denominator/state-utils'
import { GameStateProvider as EquivalentFractionsGameStateProvider, useGameState as EquivalentFractionsGameState } from './games/equivalent-fractions/state-utils'
import { GameStateProvider as LegoGameStateProvider, useGameState as LegoGameState } from './games/writing-improper-fractions-as-mixed-numbers/state-utils'
import { GameStateProvider as CommonDenominatorGameStateProvider, useGameState as CommonDenominatorGameState } from './games/common-denominators/state-utils'
import { GameStateProvider as MixedFractionWithoutRegoupingGameStateProvider, useGameState as MixedFractionWithoutRegoupingGameState } from './games/add-and-subtract-mixed-numbers-without-regouping/state-utils'
import { GameStateProvider as CompareFractionGameStateProvider, useGameState as CompareFractionGameState } from './games/compare-fractions-with-different-numerator-and-denominator/state-utils'
import { GameStateProvider as DecimalGameStateProvider, useGameState as DecimalGameState } from './games/fraction-to-decimal/state-utils'
import { GameStateProvider as MixedFractionWithRegoupingGameStateProvider, useGameState as MixedFractionWithRegoupingGameState } from './games/add-and-subtract-mixed-numbers-with-regouping/state-utils'
import { GameStateProvider as MixedNumberToImproperFractionGameStateProvider, useGameState as MixedNumberToImproperFractionGameState } from './games/mixed-number-to-improper-fraction/state-utils'
import { GameStateProvider as MultiplyingWholesAndFractionsGameStateProvider, useGameState as MultiplyingWholesAndFractionsGameState } from './games/multiplying-wholes-and-Fractions/state-utils'

import { StateValidator } from './games/template/utils/state-validator';
import { TemplateStateValidator } from './games/template/state-limits';

interface GameInfo {
  game: React.ComponentType<{ sendAdminMessage: (role: string, content: string, onComplete?: () => void) => Promise<string> }>;
  useState: any;
  provider: React.ComponentType<{ children: React.ReactNode }>;
  initialGameState: any;
  validator: StateValidator;
}

export const gameInfo: Record<string, GameInfo> = {
  'addition-within-20-using-ten-frames': {
    game: AdditionGame,
    useState: AdditionGameState,
    provider: AdditionGameStateProvider,
    initialGameState: additionGameInitialState
  },
  'compare-fractions-with-same-numerator-or-denominator': {
    game: FractionsGame,
    useState: FractionsGameState,
    provider: FractionsGameStateProvider,
    initialGameState: fractionsGameInitialState
  },
  'equivalent-fractions': {
    game: EquivalentFractionsGame,
    useState: EquivalentFractionsGameState,
    provider: EquivalentFractionsGameStateProvider,
    initialGameState: equivalentFractionsGameInitialState
  },
  'common-denominators': {
    game: CommonDenominatorGame,
    useState: CommonDenominatorGameState,
    provider: CommonDenominatorGameStateProvider,
    initialGameState: commonDenominatorGameInitialState
  },
  'subtract-fractions-with-common-denominator': {
    game: FractionSubtractionGame,
    useState: FractionSubtractionGameState,
    provider: FractionSubtractionGameStateProvider,
    initialGameState: fractionSubtractionInitialState
  },
  'add-fractions-with-common-denominator': {
    game: FractionAdditionGame,
    useState: FractionAdditionGameState,
    provider: FractionAdditionGameStateProvider,
    initialGameState: fractionAdditionInitialState
  },
  'add-and-subtract-mixed-numbers-without-regouping': {
    game: MixedFractionGame,
    useState: MixedFractionWithoutRegoupingGameState,
    provider: MixedFractionWithoutRegoupingGameStateProvider,
    initialGameState: mixedFractionWithoutRegoupingInitialState
  },
  'writing-improper-fractions-as-mixed-numbers': {
    game: LegoGame,
    useState: LegoGameState,
    provider: LegoGameStateProvider,
    initialGameState: legoGameInitialState
  },
  'template-game': {
    game: TemplateGame,
    useState: TemplateGameState,
    provider: TemplateGameStateProvider,
    initialGameState: templateInitialState,
    validator: new TemplateStateValidator()
  },
  'compare-fractions-with-different-numerator-and-denominator': {
    game: CompareFractionGame,
    useState: CompareFractionGameState,
    provider: CompareFractionGameStateProvider,
    initialGameState: compareFractionGameInitialState
  },
  'fraction-to-decimal': {
    game: DecimalGame,
    useState: DecimalGameState,
    provider: DecimalGameStateProvider,
    initialGameState: decimalGameInitialState
  },
  'add-and-subtract-mixed-numbers-with-regouping': {
    game: MixedFractionGameWithRegouping,
    useState: MixedFractionWithRegoupingGameState,
    provider: MixedFractionWithRegoupingGameStateProvider,
    initialGameState: mixedFractionGameWithRegoupingInitialState
  },
  'mixed-number-to-improper-fraction': {
    game: MixedNumberToImproperFractionGame,
    useState: MixedNumberToImproperFractionGameState,
    provider: MixedNumberToImproperFractionGameStateProvider,
    initialGameState: mixedNumberToImproperFractionGameInitialState
  },
  'multiplying-wholes-and-fractions': {
    game: MultiplyingWholesAndFractionsGame,
    useState: MultiplyingWholesAndFractionsGameState,
    provider: MultiplyingWholesAndFractionsGameStateProvider,
    initialGameState: multiplyingWholesAndFractionsGameInitialState
  }
};
