import React, { useState, useEffect } from 'react';
import { VolumeX, Volume2 } from 'lucide-react';
import { soundService } from '../../services/SoundService';

export function SoundToggle() {
  const [isAudioEnabled, setIsAudioEnabled] = useState(() => soundService.isEnabled);
  const [isPlaying, setIsPlaying] = useState(() => soundService.isPlaying);
  const [volume, setVolume] = useState(() => soundService.volume);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  useEffect(() => {
    const unsubscribe = soundService.subscribe((state) => {
      setIsAudioEnabled(state.isEnabled);
      setIsPlaying(state.isPlaying);
      setVolume(state.volume);
    });
    return unsubscribe;
  }, []);

  const handleToggle = () => {
    const nextState = soundService.toggleTheme();
    setIsAudioEnabled(nextState);
  };

  const handleVolumeChange = (e) => {
    e.stopPropagation();
    const val = parseFloat(e.target.value);
    soundService.volume = val;
    setVolume(val);
  };

  return (
    <div
      className="fixed bottom-6 left-4 sm:left-6 z-40 flex items-center gap-2 select-none"
      onMouseEnter={() => isAudioEnabled && setShowVolumeSlider(true)}
      onMouseLeave={() => setShowVolumeSlider(false)}
    >
      <button
        onClick={handleToggle}
        aria-label={isAudioEnabled ? 'Pause NOVA ambient theme soundtrack' : 'Play NOVA ambient theme soundtrack'}
        title={isAudioEnabled ? 'Click to pause theme song' : 'Click to play NOVA ambient theme'}
        className={`group flex items-center gap-2.5 px-3.5 py-2.5 rounded-full border text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer shadow-lg hover:scale-105 active:scale-95 ${
          isAudioEnabled
            ? 'bg-[#0b0c33]/90 border-[#D8B452] text-[#D8B452] shadow-[#D8B452]/25 ring-1 ring-[#D8B452]/40'
            : 'bg-[#050614]/85 backdrop-blur-md border-white/10 text-slate-400 hover:text-[#D8B452] hover:border-[#D8B452]/50 hover:bg-[#0b0c33]/60'
        }`}
      >
        {isAudioEnabled ? (
          <>
            {/* Live 4-Bar Equalizer Visualizer */}
            <div className="flex items-end gap-[3px] h-3.5 w-3.5 pb-0.5" aria-hidden="true">
              <span className={`w-0.5 bg-[#D8B452] rounded-full ${isPlaying ? 'animate-sound-bar-1' : 'h-1.5'}`} />
              <span className={`w-0.5 bg-[#D8B452] rounded-full ${isPlaying ? 'animate-sound-bar-2' : 'h-3'}`} />
              <span className={`w-0.5 bg-[#D8B452] rounded-full ${isPlaying ? 'animate-sound-bar-3' : 'h-2'}`} />
              <span className={`w-0.5 bg-[#D8B452] rounded-full ${isPlaying ? 'animate-sound-bar-4' : 'h-2.5'}`} />
            </div>
            <span className="hidden sm:inline font-mono tracking-wider text-[11px]">SOUND ON</span>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4 text-slate-400 group-hover:text-[#D8B452] transition-colors" />
            <span className="hidden sm:inline font-mono tracking-wider text-[11px]">SOUND OFF</span>
          </>
        )}
      </button>

      {/* Expandable Luxury Volume Controller */}
      {isAudioEnabled && (
        <div
          className={`flex items-center gap-2 px-3 py-2 rounded-full bg-[#0b0c33]/90 backdrop-blur-md border border-[#D8B452]/30 shadow-lg shadow-[#D8B452]/10 transition-all duration-300 ${
            showVolumeSlider
              ? 'opacity-100 translate-x-0 pointer-events-auto'
              : 'opacity-0 -translate-x-2 pointer-events-none hidden sm:flex sm:opacity-100 sm:translate-x-0 sm:pointer-events-auto'
          }`}
        >
          <Volume2 className="w-3.5 h-3.5 text-[#D8B452]/70 shrink-0" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={handleVolumeChange}
            className="w-16 sm:w-20 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#D8B452] outline-none"
            aria-label="Soundtrack volume slider"
            title={`Volume: ${Math.round(volume * 100)}%`}
          />
          <span className="text-[10px] font-mono text-[#D8B452]/80 w-6 text-right tabular-nums">
            {Math.round(volume * 100)}%
          </span>
        </div>
      )}
    </div>
  );
}

