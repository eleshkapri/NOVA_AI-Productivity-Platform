import { storageService } from './StorageService';

/**
 * SoundService provides an OOP singleton controller for Web Audio synthesis:
 * - Encapsulation: AudioContext instance (#ctx) is managed internally.
 * - Resource Safety: Reuses a single AudioContext to prevent "AudioContext quota exceeded" warnings.
 * - Autoplay Compliance: Safely handles user-gesture audio resumption.
 * - Polymorphism: Synthesizes distinct harmonic profiles based on event semantics.
 */
export class SoundService {
  #ctx;
  #masterGain;
  #isEnabled;

  constructor() {
    this.#ctx = null;
    this.#masterGain = null;
    this.#isEnabled = storageService.get('sound_enabled', false);
  }

  get isEnabled() {
    return this.#isEnabled;
  }

  set isEnabled(value) {
    this.#isEnabled = Boolean(value);
    storageService.set('sound_enabled', this.#isEnabled);
    if (this.#isEnabled) {
      this.playChime('goldChord');
    }
  }

  /**
   * Lazy initializes the AudioContext upon user interaction.
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
      this.#ctx.resume().catch(() => {
        // Resume non-blocking
      });
    }

    return this.#ctx;
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
          // Sharp, short telemetry blip
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(659.25, now);
          osc.frequency.exponentialRampToValueAtTime(880, now + 0.1);
          gain.gain.setValueAtTime(0.06, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
          osc.connect(gain);
          gain.connect(this.#masterGain);
          osc.start(now);
          osc.stop(now + 0.22);
          break;
        }

        case 'stepAdvance': {
          // Dual harmonic sequence
          const freqs = [587.33, 880];
          freqs.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + i * 0.05);
            gain.gain.setValueAtTime(0.05, now + i * 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35 + i * 0.05);
            osc.connect(gain);
            gain.connect(this.#masterGain);
            osc.start(now + i * 0.05);
            osc.stop(now + 0.35 + i * 0.05);
          });
          break;
        }

        case 'alert': {
          // Soft attention chime
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(440, now);
          osc.frequency.exponentialRampToValueAtTime(660, now + 0.15);
          gain.gain.setValueAtTime(0.08, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
          osc.connect(gain);
          gain.connect(this.#masterGain);
          osc.start(now);
          osc.stop(now + 0.4);
          break;
        }

        case 'goldChord':
        default: {
          // Soufflet luxury golden tri-tone chord (528Hz Solfeggio Love frequency, 660Hz, 792Hz)
          const freqs = [528, 660, 792];
          freqs.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + i * 0.07);
            gain.gain.setValueAtTime(0.04, now + i * 0.07);
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
   * Closes AudioContext when tearing down.
   */
  dispose() {
    if (this.#ctx) {
      try {
        this.#ctx.close();
      } catch {
        // Dispose non-blocking
      }
      this.#ctx = null;
      this.#masterGain = null;
    }
  }
}

// Export singleton instance
export const soundService = new SoundService();
export default soundService;
