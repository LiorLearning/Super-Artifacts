import React, { useState, useRef, useEffect, createContext, ReactNode, useContext } from 'react';

const STREAM_CLOSE_DELAY = 500; // Time in milliseconds to wait before closing the stream after the last chunk
const BUFFER_QUEUE_THRESHOLD = 3; // Minimum number of chunks to queue before starting playback

interface AudioContextProps {
  isConnected: boolean;
  playAudio: (messageId: string, text: string, onComplete?: () => void) => void;
  stopAudio: (messageId?: string) => void;
}

export const AudioContext = createContext<AudioContextProps | null>(null);

interface AudioProviderProps {
  children: ReactNode;
  clientId: string;
  setIsPlaying: (messageId: string, isPlaying: boolean) => void;
}

export const AudioProvider: React.FC<AudioProviderProps> = ({ children, clientId, setIsPlaying }) => {
  const [isConnected, setIsConnected] = useState(false);
  const webSocketRef = useRef<WebSocket | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioBufferQueueRef = useRef<Float32Array[]>([]);
  const isPlayingRef = useRef<boolean>(false);
  const currentMessageIdRef = useRef<string | null>(null);
  const currentSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const streamCloseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize AudioContext when the component mounts
  useEffect(() => {
    try {
      const options = {
        sampleRate: 24000,
        latencyHint: 'interactive' as AudioContextLatencyCategory,
      };

      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)(options);

      // Attempt to resume the AudioContext
      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume().then(() => {
          console.log('AudioContext initialized and resumed:', audioContextRef.current?.state);
        });
      }
    } catch (error) {
      console.error('Failed to create AudioContext:', error);
    }

    // Cleanup function to close AudioContext
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
    };
  }, []);

  // // Function to unlock AudioContext on user interaction
  // const unlockAudioContext = () => {
  //   if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
  //     audioContextRef.current.resume().then(() => {
  //       console.log('AudioContext resumed on user interaction:', audioContextRef.current?.state);
  //     });
  //   }
  // };

  // // Add event listeners for user interaction to unlock AudioContext
  // useEffect(() => {
  //   ['touchstart', 'touchend', 'mousedown', 'keydown'].forEach((event) => {
  //     window.addEventListener(event, unlockAudioContext, false);
  //   });

  //   return () => {
  //     ['touchstart', 'touchend', 'mousedown', 'keydown'].forEach((event) => {
  //       window.removeEventListener(event, unlockAudioContext, false);
  //     });
  //   };
  // }, []);

  /**
   * Initiates audio playback by connecting to the WebSocket.
   * @param messageId Unique identifier for the message.
   * @param text Text to be converted to speech.
   * @param onComplete Optional callback to be executed when audio playback is complete.
   */
  const playAudio = async (messageId: string, text: string, onComplete?: () => void) => {
    currentMessageIdRef.current = messageId;
    setIsPlaying(messageId, true);

    if (!audioContextRef.current) {
      try {
        const options = {
          sampleRate: 24000,
          latencyHint: 'interactive' as AudioContextLatencyCategory,
        };

        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)(options);
      } catch (error) {
        console.error('Failed to create AudioContext:', error);
      }
    }

    if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
      try {
        await audioContextRef.current.resume();
        console.log('AudioContext resumed:', audioContextRef.current.state);
      } catch (error) {
        console.error('Failed to resume AudioContext:', error);
      }
    }

    connectWebSocket(messageId, text, onComplete);
  };

  /**
   * Stops audio playback by closing the WebSocket and clearing the buffer queue.
   * @param messageId Optional message ID to stop.
   */
  const stopAudio = (messageId?: string) => {
    if (webSocketRef.current) {
      webSocketRef.current.close();
      webSocketRef.current = null;
    }

    setIsPlaying(messageId || currentMessageIdRef.current || '', false);
    currentMessageIdRef.current = null;

    // Clear audio buffer queue
    audioBufferQueueRef.current = [];

    // Stop any currently playing source
    if (currentSourceRef.current) {
      currentSourceRef.current.stop();
      currentSourceRef.current.disconnect();
      currentSourceRef.current = null;
    }

    // Reset playing flag
    isPlayingRef.current = false;

    // Clear any pending stream close timeout
    if (streamCloseTimeoutRef.current) {
      clearTimeout(streamCloseTimeoutRef.current);
      streamCloseTimeoutRef.current = null;
    }
  };

  /**
   * Establishes a WebSocket connection and sets up event handlers.
   * @param messageId Unique identifier for the message.
   * @param text Text to be converted to speech.
   * @param onComplete Optional callback to be executed when audio playback is complete.
   */
  const connectWebSocket = (messageId: string, text: string, onComplete?: () => void) => {
    if (webSocketRef.current) {
      webSocketRef.current.close();
    }

    webSocketRef.current = new WebSocket(`${process.env.NEXT_PUBLIC_WS_BASE_URL}/eleven_labs/${clientId}/ws`);
    webSocketRef.current.binaryType = 'arraybuffer';

    webSocketRef.current.onopen = () => {
      setIsConnected(true);

      // Send TTS request
      webSocketRef.current?.send(
        JSON.stringify({
          type: 'tts_request',
          text: text.trim(),
          id: messageId,
        })
      );
    };

    webSocketRef.current.onclose = () => {
      setIsConnected(false);
    };

    webSocketRef.current.onerror = (error) => {
      console.error('WebSocket error:', error);
      setIsConnected(false);
    };

    webSocketRef.current.onmessage = (event) => {
      if (typeof event.data === 'string') {
        // Handle JSON messages
        try {
          const message = JSON.parse(event.data);
          if (message.type === 'stream_start') {
            initializeAudioPlayback(messageId, onComplete);
          } else if (message.type === 'stream_end') {
            processAudioQueue(message.id, onComplete, true);
          }
        } catch (error) {
          console.error('Error parsing JSON message:', error);
        }
      } else if (event.data instanceof ArrayBuffer) {
        // Handle binary PCM data
        const pcmData = new Uint8Array(event.data);
        // Convert PCM data to Float32Array
        const float32Data = pcm16ToFloat32(pcmData);
        // Enqueue the audio data
        audioBufferQueueRef.current.push(float32Data);
        // Attempt to play the queued audio
        processAudioQueue(messageId, onComplete);
      }
    };
  };

  /**
   * Initializes audio playback by setting the playing flag.
   */
  const initializeAudioPlayback = (messageId: string, onComplete?: () => void) => {
    isPlayingRef.current = true;
    processAudioQueue(messageId, onComplete);
  };

  /**
   * Finalizes audio playback by stopping any ongoing playback.
   */
  const finalizeAudioPlayback = (messageId: string, onComplete?: () => void) => {
    isPlayingRef.current = false;
    onComplete?.();
    stopAudio(messageId);
  };

  /**
   * Converts PCM16 data to Float32Array.
   * @param pcm Uint8Array of PCM16 little-endian data.
   * @returns Float32Array normalized to [-1, 1].
   */
  const pcm16ToFloat32 = (pcm: Uint8Array): Float32Array => {
    const float32 = new Float32Array(pcm.length / 2);
    const view = new DataView(pcm.buffer, pcm.byteOffset, pcm.byteLength);
    for (let i = 0; i < float32.length; i++) {
      const int16 = view.getInt16(i * 2, true); // Little endian
      float32[i] = int16 / 32768; // Normalize to [-1, 1]
    }
    return float32;
  };

  /**
   * Processes the audio buffer queue by playing the next buffer if not already playing.
   */
  const processAudioQueue = (messageId: string, onComplete?: () => void, is_end: boolean = false) => {
    if (!isPlayingRef.current) {
      return;
    }

    if (currentSourceRef.current) {
      return; // Already playing
    }

    if (!audioContextRef.current) {
      return;
    }

    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }

    if (audioBufferQueueRef.current.length < BUFFER_QUEUE_THRESHOLD && !is_end) {
      // Schedule stream close if no more chunks are received
      if (streamCloseTimeoutRef.current) {
        clearTimeout(streamCloseTimeoutRef.current);
        streamCloseTimeoutRef.current = null;
      }
      streamCloseTimeoutRef.current = setTimeout(() => {
        finalizeAudioPlayback(messageId, onComplete);
      }, STREAM_CLOSE_DELAY);
      return; // Not enough data to play yet
    }

    // Clear any existing stream close timeout since we have enough data
    if (streamCloseTimeoutRef.current) {
      clearTimeout(streamCloseTimeoutRef.current);
      streamCloseTimeoutRef.current = null;
    }

    // Combine all chunks into a single buffer
    const combinedData = new Float32Array(
      audioBufferQueueRef.current.reduce((total, chunk) => total + chunk.length, 0)
    );

    let offset = 0;
    while (audioBufferQueueRef.current.length > 0) {
      const chunk = audioBufferQueueRef.current.shift();
      if (chunk) {
        combinedData.set(chunk, offset);
        offset += chunk.length;
      }
    }

    const audioCtx = audioContextRef.current;
    const sampleRate = 24000; // Ensure this matches your PCM data's sample rate

    // Create an AudioBuffer
    const buffer = audioCtx.createBuffer(1, combinedData.length, sampleRate);
    buffer.copyToChannel(combinedData, 0, 0);

    // Create a BufferSource
    const bufferSource = audioCtx.createBufferSource();
    bufferSource.buffer = buffer;
    bufferSource.connect(audioCtx.destination);

    // When the buffer ends, play the next one in the queue
    bufferSource.onended = () => {
      currentSourceRef.current = null;
      processAudioQueue(messageId, onComplete, is_end);
    };

    // Start playback immediately
    bufferSource.start(0);
    currentSourceRef.current = bufferSource;
  };

  return (
    <AudioContext.Provider
      value={{
        isConnected,
        playAudio,
        stopAudio,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudioContext = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudioContext must be used within a AudioProvider');
  }
  return context;
};