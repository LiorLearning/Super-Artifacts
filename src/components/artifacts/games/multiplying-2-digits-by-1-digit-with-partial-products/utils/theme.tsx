import { images } from './image';
import { GameState } from '../game-state';

type ThemeImages = {
  backgroundAbstract?: string;
  background?: string;
  character?: string;
  characterHappy?: string;
  characterSad?: string;
};

export const getThemeImages = (gameState: GameState): ThemeImages => {
  const baseThemeImages: ThemeImages = {
    character: images.tilo,
    characterHappy: images.tiloHappy,
    characterSad: images.tiloSad,
    backgroundAbstract: images.practiceBg,
  };

  if (gameState.theme === 'jungle') {
    return {
      ...baseThemeImages,
      character: images.kidHappy,
      characterHappy: images.kidHappy,
      characterSad: images.kidSad,
      background: images.jungle,
    };
  } else {
    return baseThemeImages;
  }
};
