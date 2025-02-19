export const soundFiles = {
  join: 'https://mathtutor-images.s3.us-east-1.amazonaws.com/games/sound/join.mp3',
  correct: 'https://mathtutor-images.s3.us-east-1.amazonaws.com/games/sound/CorrectAnswer2.mp3',
  Drag: 'https://mathtutor-images.s3.us-east-1.amazonaws.com/games/sound/DragAndDrop.mp3',
  Knife: 'https://mathtutor-images.s3.us-east-1.amazonaws.com/games/sound/KnifeCut.mp3',
  LevelComplete: 'https://mathtutor-images.s3.us-east-1.amazonaws.com/games/sound/LevelComplete.mp3',
  PartComplete: 'https://mathtutor-images.s3.us-east-1.amazonaws.com/games/sound/PartComplete.mp3'
};

const soundVolumes: { [key: string]: number } = {
  join: 0.7,
  correct: 0.7,
  Drag: 0.7,
  Knife: 0.7,
  LevelComplete: 0.7,
  PartComplete: 0.7
};

export const useSoundEffects = () => {
  const soundEffects = Object.entries(soundFiles).reduce((acc, [name, path]) => {
    const audio = new Audio(path);
    audio.volume = soundVolumes[name];
    acc[name as keyof typeof soundFiles] = {
      play: () => audio.play(),
      sound: audio
    };
    return acc;
  }, {} as {
    [K in keyof typeof soundFiles]: {
      play: () => Promise<void>,
      sound: HTMLAudioElement
    }
  });
  return soundEffects;
};