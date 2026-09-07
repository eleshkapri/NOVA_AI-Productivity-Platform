import { storageService } from './StorageService';

/**
 * SoundService provides an OOP singleton controller for Web Audio synthesis & ambient soundtrack playback:
 * - Encapsulation: Audio element (#audio), AudioContext (#ctx), and synthesis nodes are strictly encapsulated.
 * - Resource Safety: Reuses single AudioContext and Audio instances, cleans up intervals and nodes safely.
 * - Autoplay Compliance: Initiates audio on explicit user interaction with smooth fade-in/fade-out ramps.
 * - Observer Pattern: Dispatches state updates (playing, volume, mute) to subscribers without polling.
 * - Dual-Engine Architecture:
 *    Primary: High-fidelity 320kbps Cyberpunk Ambient soundtrack (/audio/nova-theme.mp3).
 *    Fallback: Procedural Web Audio API generative synthesizer.
 * - Tab Visibility Awareness: Automatically suspends playback when tab is hidden, resumes when active.
 */
export class SoundService {
  #audio;
  #ctx;
  #masterGain;
  #isEnabled;
  #isPlaying;
  #volume;
  #fadeInterval;
  #synthInterval;
  #synthNodes;
  #listeners;
  #isUsingSynthFallback;

  constructor() {
    this.#audio = null;
    this.#ctx = null;
    this.#masterGain = null;
    this.#isEnabled = storageService.get('sound_enabled', false);
    this.#isPlaying = false;
    this.#volume = storageService.get('sound_volume', 0.35);
    this.#fadeInterval = null;
    this.#synthInterval = null;
    this.#synthNodes = [];
    this.#listeners = new Set();
    this.#isUsingSynthFallback = false;

    this.#initVisibilityListener();
  }

  get isEnabled() {
    return this.#isEnabled;
  }

  set isEnabled(value) {
    const next = Boolean(value);
    if (this.#isEnabled === next) return;
    this.#isEnabled = next;
    storageService.set('sound_enabled', this.#isEnabled);
    if (this.#isEnabled) {
      this.startTheme();
    } else {
      this.stopTheme();
    }
    this.#notify();
  }

  get isPlaying() {
    return this.#isPlaying;
  }

  get volume() {
    return this.#volume;
  }

  set volume(value) {
    const clamped = Math.max(0, Math.min(1, Number(value) || 0));
    this.#volume = clamped;
    storageService.set('sound_volume', clamped);
    if (this.#audio && !this.#fadeInterval) {
      this.#audio.volume = clamped;
    }
    if (this.#masterGain && this.#ctx) {
      this.#masterGain.gain.setValueAtTime(clamped * 0.25, this.#ctx.currentTime);
    }
    this.#notify();
  }

  /**
   * Subscribes a listener to audio state changes.
   * @param {() => void} listener
   * @returns {() => void} Unsubscribe function
   */
  subscribe(listener) {
    if (typeof listener !== 'function') return () => {};
    this.#listeners.add(listener);
    return () => {
      this.#listeners.delete(listener);
    };
  }

  #notify() {
    for (const listener of this.#listeners) {
      try {
        listener({
          isEnabled: this.#isEnabled,
          isPlaying: this.#isPlaying,
          volume: this.#volume
        });
      } catch {
        // Observer listener failure non-blocking
      }
    }
  }

  /**
   * Lazy initializes the HTML5 Audio element.
   * @returns {HTMLAudioElement | null}
   */
  #getOrCreateAudio() {
    if (typeof window === 'undefined') return null;
    if (!this.#audio) {
      try {
        this.#audio = new Audio('/audio/nova-theme.mp3');
        this.#audio.loop = true;
        this.#audio.preload = 'auto';
        this.#audio.volume = 0;

        this.#audio.addEventListener('play', () => {
          this.#isPlaying = true;
          this.#notify();
        });

        this.#audio.addEventListener('pause', () => {
          this.#isPlaying = false;
          this.#notify();
        });

        this.#audio.addEventListener('error', () => {
          this.#isUsingSynthFallback = true;
          if (this.#isEnabled) {
            this.#startSynthTheme();
          }
        });
      } catch {
        this.#isUsingSynthFallback = true;
      }
    }
    return this.#audio;
  }

  /**
   * Lazy initializes the AudioContext for UI chimes & generative fallback.
   * @returns {AudioContext | null}
   */
  #getOrCreateContext() {
    if (typeof window === 'undefined') return null;

    if (!this.#ctx) {
      try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return null;

        this.#ctx = new AudioContextClass();
        this.#masterGain = this.#ctx.createGain();
        this.#masterGain.gain.setValueAtTime(0.08, this.#ctx.currentTime);
        this.#masterGain.connect(this.#ctx.destination);
      } catch {
        return null;
      }
    }

    if (this.#ctx.state === 'suspended') {
      this.#ctx.resume().catch(() => {});
    }

    return this.#ctx;
  }

  /**
   * Starts playback of the NOVA ambient theme soundtrack.
   */
  startTheme() {
    this.#isEnabled = true;
    storageService.set('sound_enabled', true);

    // Play golden confirmation chime
    this.playChime('goldChord');

    const audio = this.#getOrCreateAudio();
    if (audio && !this.#isUsingSynthFallback) {
      this.#fadeInAudio(audio, this.#volume);
    } else {
      this.#startSynthTheme();
    }
    this.#notify();
  }

  /**
   * Stops playback with gentle fade-out.
   */
  stopTheme() {
    this.#isEnabled = false;
    storageService.set('sound_enabled', false);

    if (this.#audio && !this.#audio.paused) {
      this.#fadeOutAudio(this.#audio);
    }
    this.#stopSynthTheme();
    this.#notify();
  }

  /**
   * Toggles theme music playback.
   * @returns {boolean} New isEnabled state
   */
  toggleTheme() {
    if (this.#isEnabled) {
      this.stopTheme();
    } else {
      this.startTheme();
    }
    return this.#isEnabled;
  }

  #fadeInAudio(audio, targetVolume) {
    if (!audio) return;
    this.#clearFade();

    audio.volume = 0;
    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise.catch(() => {
        this.#isUsingSynthFallback = true;
        this.#startSynthTheme();
      });
    }

    const steps = 16;
    const stepInterval = 50; // 800ms total
    let step = 0;

    this.#fadeInterval = setInterval(() => {
      step++;
      const current = Math.min(targetVolume, (step / steps) * targetVolume);
      if (audio) {
        audio.volume = current;
      }
      if (step >= steps) {
        this.#clearFade();
      }
    }, stepInterval);
  }

  #fadeOutAudio(audio) {
    if (!audio) return;
    this.#clearFade();

    const startVol = audio.volume;
    const steps = 10;
    const stepInterval = 50; // 500ms total
    let step = 0;

    this.#fadeInterval = setInterval(() => {
      step++;
      const current = Math.max(0, startVol * (1 - step / steps));
      if (audio) {
        audio.volume = current;
      }
      if (step >= steps) {
        this.#clearFade();
        if (audio) {
          audio.pause();
        }
        this.#isPlaying = false;
        this.#notify();
      }
    }, stepInterval);
  }

  #clearFade() {
    if (this.#fadeInterval) {
      clearInterval(this.#fadeInterval);
      this.#fadeInterval = null;
    }
  }

  /**
   * Web Audio API generative ambient synth fallback.
   */
  #startSynthTheme() {
    this.#stopSynthTheme();
    const ctx = this.#getOrCreateContext();
    if (!ctx) return;

    this.#isPlaying = true;
    this.#notify();

    // Chords: Am9 -> Fmaj7 -> Cmaj9 -> Em7
    const chordProgression = [
      [220, 261.63, 329.63, 392.00, 493.88], // Am9
      [174.61, 220, 261.63, 329.63, 369.99], // Fmaj7#11
      [130.81, 196.00, 246.94, 329.63, 440], // Cmaj9
      [164.81, 246.94, 293.66, 392.00, 440]  // Em7
    ];

    let chordIndex = 0;

    const playChordStep = () => {
      if (!this.#isEnabled) return;
      const notes = chordProgression[chordIndex % chordProgression.length];
      chordIndex++;

      const now = ctx.currentTime;
      notes.forEach((freq, idx) => {
        try {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const filter = ctx.createBiquadFilter();

          osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(freq, now);

          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(450 + (idx * 70), now);
          filter.frequency.exponentialRampToValueAtTime(300, now + 4.5);

          gain.gain.setValueAtTime(0.001, now);
          gain.gain.exponentialRampToValueAtTime(0.02 * this.#volume, now + 1.2);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 5.8);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(this.#masterGain || ctx.destination);

          osc.start(now);
          osc.stop(now + 6.0);

          this.#synthNodes.push({ osc, gain });
        } catch {
          // Synthesis step non-blocking
        }
      });
    };

    playChordStep();
    this.#synthInterval = setInterval(playChordStep, 5000);
  }

  #stopSynthTheme() {
    if (this.#synthInterval) {
      clearInterval(this.#synthInterval);
      this.#synthInterval = null;
    }
    this.#synthNodes.forEach(({ osc, gain }) => {
      try {
        if (this.#ctx) {
          gain.gain.setValueAtTime(0.0001, this.#ctx.currentTime);
        }
        osc.stop();
      } catch {
        // Node cleanup non-blocking
      }
    });
    this.#synthNodes = [];
    if (this.#isUsingSynthFallback) {
      this.#isPlaying = false;
      this.#notify();
    }
  }

  #initVisibilityListener() {
    if (typeof document === 'undefined') return;
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        if (this.#audio && !this.#audio.paused) {
          this.#audio.pause();
        }
        this.#stopSynthTheme();
      } else {
        if (this.#isEnabled) {
          const audio = this.#getOrCreateAudio();
          if (audio && !this.#isUsingSynthFallback) {
            this.#fadeInAudio(audio, this.#volume);
          } else {
            this.#startSynthTheme();
          }
        }
      }
    });
  }

  /**
   * Synthesizes audio chimes based on requested harmonic profile.
   * @param {'goldChord' | 'actionClick' | 'stepAdvance' | 'alert'} [type='goldChord']
   */
  playChime(type = 'goldChord') {
    if (!this.#isEnabled) return;

    const ctx = this.#getOrCreateContext();
    if (!ctx || !this.#masterGain) return;

    try {
      const now = ctx.currentTime;

      switch (type) {
        case 'actionClick': {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(659.25, now);
          osc.frequency.exponentialRampToValueAtTime(880, now + 0.1);
          gain.gain.setValueAtTime(0.06 * this.#volume, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
          osc.connect(gain);
          gain.connect(this.#masterGain);
          osc.start(now);
          osc.stop(now + 0.22);
          break;
        }

        case 'stepAdvance': {
          const freqs = [587.33, 880];
          freqs.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + i * 0.05);
            gain.gain.setValueAtTime(0.05 * this.#volume, now + i * 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35 + i * 0.05);
            osc.connect(gain);
            gain.connect(this.#masterGain);
            osc.start(now + i * 0.05);
            osc.stop(now + 0.35 + i * 0.05);
          });
          break;
        }

        case 'alert': {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(440, now);
          osc.frequency.exponentialRampToValueAtTime(660, now + 0.15);
          gain.gain.setValueAtTime(0.08 * this.#volume, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
          osc.connect(gain);
          gain.connect(this.#masterGain);
          osc.start(now);
          osc.stop(now + 0.4);
          break;
        }

        case 'goldChord':
        default: {
          const freqs = [528, 660, 792];
          freqs.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + i * 0.07);
            gain.gain.setValueAtTime(0.04 * this.#volume, now + i * 0.07);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.75 + i * 0.07);
            osc.connect(gain);
            gain.connect(this.#masterGain);
            osc.start(now + i * 0.07);
            osc.stop(now + 0.8 + i * 0.07);
          });
          break;
        }
      }
    } catch {
      // Audio playback non-blocking
    }
  }

  /**
   * Closes AudioContext & pauses audio when tearing down.
   */
  dispose() {
    this.stopTheme();
    if (this.#audio) {
      try {
        this.#audio.pause();
        this.#audio.src = '';
      } catch {
        // Teardown non-blocking
      }
      this.#audio = null;
    }
    if (this.#ctx) {
      try {
        this.#ctx.close();
      } catch {
        // Dispose non-blocking
      }
      this.#ctx = null;
      this.#masterGain = null;
    }
    this.#listeners.clear();
  }
}

// Export singleton instance
export const soundService = new SoundService();
export default soundService;

