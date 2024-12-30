// Sound effects manager for the addition game
class SoundManager {
  private sounds: { [key: string]: HTMLAudioElement } = {};
  private isMuted: boolean = false;
  private isClient: boolean;

  constructor() {
    this.isClient = typeof window !== 'undefined';
    if (this.isClient) {
      this.initializeSounds();
    }
  }

  private initializeSounds() {
    if (!this.isClient) return;

    const soundFiles = {
      shoot: '/sounds/join.mp3',        // Ball shooting sound
      collect: '/sounds/join.mp3',    // Ball collected in container
      rotate: '/sounds/join.mp3',      // Container rotation sound
      score: '/sounds/join.mp3',        // Score increment sound
      complete: '/sounds/join.mp3',  // Game completion sound
      pop: '/sounds/join.mp3',           // Ball popping sound
    };

    // Preload all sounds
    Object.entries(soundFiles).forEach(([key, path]) => {
      if (typeof window !== 'undefined') {
        const audio = new window.Audio(path);
        audio.preload = 'auto';
        this.sounds[key] = audio;
      }
    });
  }

  play(soundName: keyof typeof this.sounds) {
    if (!this.isClient || this.isMuted || !this.sounds[soundName]) return;

    // Clone and play to allow overlapping sounds
    const sound = this.sounds[soundName].cloneNode() as HTMLAudioElement;
    sound.volume = this.getVolumeForSound(soundName);
    sound.play().catch(err => console.warn('Sound play failed:', err));
  }

  private getVolumeForSound(soundName: string): number {
    const volumes: { [key: string]: number } = {
      shoot: 0.7,
      collect: 0.5,
      rotate: 0.4,
      score: 0.6,
      complete: 0.8,
      pop: 0.3,
    };
    return volumes[soundName] || 0.5;
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  getMuted() {
    return this.isMuted;
  }

  setMute(mute: boolean) {
    this.isMuted = mute;
  }
}

// Create singleton instance
let soundManagerInstance: SoundManager | null = null;

export const getSoundManager = () => {
  if (typeof window === 'undefined') {
    return {
      play: () => {},
      toggleMute: () => false,
      getMuted: () => false,
      setMute: () => {},
    };
  }
  
  if (!soundManagerInstance) {
    soundManagerInstance = new SoundManager();
  }
  return soundManagerInstance;
};
