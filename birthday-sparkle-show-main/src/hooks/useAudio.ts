import { useRef, useEffect } from "react";

// Web Audio API context
let audioContext: AudioContext | null = null;

const getAudioContext = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
};

// Create simple synthesized sounds
const playTone = (frequency: number, duration: number, type: OscillatorType = "sine", volume: number = 0.3) => {
  try {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;
    gainNode.gain.setValueAtTime(volume, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  } catch (e) {
    console.log("Audio play error:", e);
  }
};

// Chime effect for buttons
const playChime = (baseFreq: number = 800) => {
  const frequencies = [baseFreq, baseFreq * 1.25, baseFreq * 1.5];
  frequencies.forEach((freq, i) => {
    setTimeout(() => playTone(freq, 0.15, "sine", 0.2), i * 50);
  });
};

// Sparkle sound for ignition
const playSparkle = () => {
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      playTone(1000 + Math.random() * 2000, 0.1, "sine", 0.15);
    }, i * 30);
  }
};

// Celebration pop sound
const playCelebrationPop = () => {
  playTone(150, 0.1, "square", 0.4);
  setTimeout(() => {
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        playTone(400 + Math.random() * 800, 0.15, "triangle", 0.1);
      }, i * 20);
    }
  }, 50);
};

// Gift unwrap sound
const playUnwrap = () => {
  playTone(600, 0.05, "sawtooth", 0.15);
  setTimeout(() => playTone(800, 0.08, "sine", 0.25), 50);
  setTimeout(() => playTone(1200, 0.15, "sine", 0.3), 100);
};

// Firework explosion sound
const playFireworkSound = () => {
  playTone(300, 0.3, "sawtooth", 0.1);
  setTimeout(() => {
    playTone(100, 0.2, "square", 0.3);
    for (let i = 0; i < 12; i++) {
      setTimeout(() => {
        playTone(200 + Math.random() * 600, 0.2, "triangle", 0.15);
      }, i * 25);
    }
  }, 200);
};

// Play melody function
const playMelody = () => {
  const notes = [523, 523, 587, 523, 698, 659];
  const durations = [0.3, 0.3, 0.6, 0.6, 0.6, 1.2];
  
  let time = 0;
  notes.forEach((note, i) => {
    setTimeout(() => {
      playTone(note, durations[i] * 0.8, "sine", 0.15);
    }, time * 1000);
    time += durations[i];
  });
};

// Stable audio functions object
const audioFunctions = {
  playMusic: () => {
    playMelody();
    const interval = setInterval(playMelody, 4000);
    (window as any).__birthdayMusicInterval = interval;
  },
  
  pauseMusic: () => {
    if ((window as any).__birthdayMusicInterval) {
      clearInterval((window as any).__birthdayMusicInterval);
      (window as any).__birthdayMusicInterval = null;
    }
  },
  
  playButtonClick: () => {
    playChime(600);
    playSparkle();
  },
  
  playCakeCut: () => {
    playCelebrationPop();
    setTimeout(() => playChime(800), 200);
  },
  
  playGiftOpen: () => {
    playUnwrap();
    setTimeout(() => playChime(1000), 150);
  },
  
  playFirework: () => {
    playFireworkSound();
    setTimeout(() => playFireworkSound(), 500);
    setTimeout(() => playFireworkSound(), 1200);
  },
};

export const useAudio = () => {
  const functionsRef = useRef(audioFunctions);

  useEffect(() => {
    return () => {
      audioFunctions.pauseMusic();
    };
  }, []);

  return functionsRef.current;
};
