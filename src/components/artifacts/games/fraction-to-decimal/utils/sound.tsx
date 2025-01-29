const soundFiles = {
  join: 'https://mathtutor-images.s3.us-east-1.amazonaws.com/games/sound/join.mp3',
  break: 'https://mathtutor-images.s3.us-east-1.amazonaws.com/games/sound/chocolate-break.mp3',
  levelUp: 'https://mathtutor-images.s3.us-east-1.amazonaws.com/games/sound/level.mp3',
};

const soundVolumes: { [key: string]: number } = {
  join: 0.4,
  break: 0.5,
  levelUp: 0.7,
};


export const sounds = {
  join: () => {
    const audio = new Audio(soundFiles.join);
    audio.volume = soundVolumes.join;
    audio.play().catch(e => console.log('Audio play failed:', e));
  },
  break: () => {
    const audio = new Audio(soundFiles.break);
    audio.volume = soundVolumes.break;
    audio.play().catch(e => console.log('Audio play failed:', e));
  },
  levelUp: () => {
    const audio = new Audio(soundFiles.levelUp);
    audio.volume = soundVolumes.levelUp;
    audio.play().catch(e => console.log('Audio play failed:', e));
  }
}; 