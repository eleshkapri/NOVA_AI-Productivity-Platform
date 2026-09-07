import { storageService } from './StorageService';

/**
 * Curated list of relaxing, feel-good ambient soundtracks for the NOVA platform.
 */
export const RELAXING_TRACKS = Object.freeze([
  {
    id: 'serene',
    name: 'Serene Ambient',
    mood: 'Deep Calm & Peace',
    src: '/audio/relaxing.mp3',
    icon: '🌊'
  },
  {
    id: 'feel-good',
    name: 'Feel Good Chill',
    mood: 'Warm & Uplifting',
    src: '/audio/nova-theme.mp3',
    icon: '🌿'
  },
  {
    id: 'piano',
    name: 'Peaceful Piano',
    mood: 'Mindful Focus',
    src: '/audio/piano.mp3',
    icon: '🎹'
  }
]);

/**
 * SoundService provides an OOP singleton controller for Web Audio synthesis & relaxing soundtrack playback:
 * - Encapsulation: Audio element (#audio), AudioContext (#ctx), and synthesis nodes are strictly encapsulated.
 * - Resource Safety: Reuses single AudioContext and Audio instances, cleans up intervals and nodes safely.
 * - Autoplay Compliance: Initiates audio on explicit user interaction with smooth fade-in/fade-out ramps.
 * - Observer Pattern: Dispatches state updates (playing, volume, track) to subscribers without polling.
 * - Dual-Engine Architecture:
 *    Primary: High-fidelity relaxing feel-good soundtrack library.
 *    Fallback: Procedural Web Audio API peaceful generative synthesizer.
 * - Tab Visibility Awareness: Automatically suspends playback when tab is hidden, resumes when active.
 */
export class SoundService {
  #audio;
  #ctx;
  #masterGain;
  #isEnabled;
  #isPlaying;
  #volume;
  #currentTrackId;
  #fadeInterval;
  #synthInterval;
  #synthNodes;
  #listeners;
  #isUsingSynthFallback;

  constructor() {
    this.#audio = null;
    this.#ctx = null;
    this.#masterGain = null;
    this.#isEnabled = storageService.get('sound_enabled', true);
    this.#isPlaying = false;
    this.#volume = storageService.get('sound_volume', 0.15);
    this.#currentTrackId = storageService.get('sound_track_id', 'serene');
    this.#fadeInterval = null;
    this.#synthInterval = null;
    this.#synthNodes = [];
    this.#listeners = new Set();
    this.#isUsingSynthFallback = false;

    this.#initVisibilityListener();
    this.#initAutoPlayOnLoad();
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

  get currentTrackId() {
    return this.#currentTrackId;
  }

  get currentTrack() {
    return (
      RELAXING_TRACKS.find((t) => t.id === this.#currentTrackId) || RELAXING_TRACKS[0]
    );
  }

  get tracks() {
    return RELAXING_TRACKS;
  }

  /**
   * Switches the active soundtrack. Smoothly transitions if already playing.
   * @param {string} trackId
   */
  setTrack(trackId) {
    const track = RELAXING_TRACKS.find((t) => t.id === trackId);
    if (!track || track.id === this.#currentTrackId) return;

    this.#currentTrackId = track.id;
    storageService.set('sound_track_id', track.id);

    if (this.#audio) {
      const wasPlaying = !this.#audio.paused && this.#isEnabled;
      if (wasPlaying) {
        this.#fadeOutAudio(this.#audio, () => {
          if (this.#audio) {
            this.#audio.src = track.src;
            this.#audio.load();
            this.#fadeInAudio(this.#audio, this.#volume);
          }
        });
      } else {
        this.#audio.src = track.src;
        this.#audio.load();
      }
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
          volume: this.#volume,
          currentTrackId: this.#currentTrackId,
          currentTrack: this.currentTrack,
          tracks: RELAXING_TRACKS
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
        const activeTrack = this.currentTrack;
        this.#audio = new Audio(activeTrack.src);
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
   * Initializes automatic playback on site load with browser autoplay policy fallback.
   */
  #initAutoPlayOnLoad() {
    if (typeof window === 'undefined') return;

    if (this.#isEnabled) {
      const attemptAutoPlay = () => {
        if (!this.#isEnabled) return;
        const audio = this.#getOrCreateAudio();
        if (!audio) return;

        const activeTrack = this.currentTrack;
        if (!audio.src || !audio.src.endsWith(activeTrack.src)) {
          audio.src = activeTrack.src;
          audio.load();
        }

        audio.volume = this.#volume;
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              this.#isPlaying = true;
              this.#notify();
            })
            .catch(() => {
              // Browser policy requires user gesture before playing unmuted audio
              const onFirstInteraction = () => {
                if (this.#isEnabled && audio.paused) {
                  audio.volume = this.#volume;
                  audio.play().catch(() => {});
                }
                window.removeEventListener('click', onFirstInteraction);
                window.removeEventListener('keydown', onFirstInteraction);
                window.removeEventListener('touchstart', onFirstInteraction);
                window.removeEventListener('scroll', onFirstInteraction);
              };

              window.addEventListener('click', onFirstInteraction, { once: true, passive: true });
              window.addEventListener('keydown', onFirstInteraction, { once: true, passive: true });
              window.addEventListener('touchstart', onFirstInteraction, { once: true, passive: true });
              window.addEventListener('scroll', onFirstInteraction, { once: true, passive: true });
            });
        }
      };

      if (document.readyState === 'complete') {
        attemptAutoPlay();
      } else {
        window.addEventListener('DOMContentLoaded', attemptAutoPlay, { once: true });
      }
    }
  }

  /**
   * Starts playback of the relaxing feel-good ambient soundtrack.
   * @param {boolean} [withChime=true]
   */
  startTheme(withChime = true) {
    this.#isEnabled = true;
    storageService.set('sound_enabled', true);
    this.#isUsingSynthFallback = false;

    if (withChime) {
      this.playChime('goldChord');
    }

    const audio = this.#getOrCreateAudio();
    if (audio) {
      const activeTrack = this.currentTrack;
      if (!audio.src || !audio.src.endsWith(activeTrack.src)) {
        audio.src = activeTrack.src;
        audio.load();
      }
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
    this.isEnabled = !this.#isEnabled;
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

  #fadeOutAudio(audio, onComplete = null) {
    if (!audio) return;
    this.#clearFade();

    const startVol = audio.volume;
    const steps = 10;
    const stepInterval = 40; // 400ms total
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
        if (typeof onComplete === 'function') {
          onComplete();
        }
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
   * Web Audio API generative peaceful feel-good major ambient fallback.
   */
  #startSynthTheme() {
    this.#stopSynthTheme();
    const ctx = this.#getOrCreateContext();
    if (!ctx) return;

    this.#isPlaying = true;
    this.#notify();

    // Warm, peaceful feel-good major pentatonic progressions
    const chordProgression = [
      [130.81, 196.00, 261.63, 329.63, 392.00], // Cmaj9 (Bright & peaceful)
      [174.61, 220.00, 261.63, 329.63, 392.00], // Fmaj7 (Gentle comfort)
      [220.00, 261.63, 329.63, 392.00, 440.00], // Am7 (Cozy warmth)
      [196.00, 246.94, 293.66, 392.00, 493.88]  // Gsus4 / G (Feel-good resolution)
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

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now);

          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(380 + idx * 50, now);
          filter.frequency.exponentialRampToValueAtTime(260, now + 4.8);

          gain.gain.setValueAtTime(0.001, now);
          gain.gain.exponentialRampToValueAtTime(0.025 * this.#volume, now + 1.5);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 5.5);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(this.#masterGain || ctx.destination);

          osc.start(now);
          osc.stop(now + 5.8);

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

