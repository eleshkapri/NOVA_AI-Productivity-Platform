import React, { useState, useEffect } from 'react';
import { VolumeX, Volume2 } from 'lucide-react';
import { soundService, RELAXING_TRACKS } from '../../services/SoundService';

export function SoundToggle() {
  const [isAudioEnabled, setIsAudioEnabled] = useState(() => soundService.isEnabled);
  const [isPlaying, setIsPlaying] = useState(() => soundService.isPlaying);
  const [volume, setVolume] = useState(() => soundService.volume);
  const [currentTrackId, setCurrentTrackId] = useState(() => soundService.currentTrackId);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    const unsubscribe = soundService.subscribe((state) => {
      setIsAudioEnabled(state.isEnabled);
      setIsPlaying(state.isPlaying);
      setVolume(state.volume);
      setCurrentTrackId(state.currentTrackId);
    });
    return unsubscribe;
  }, []);

  const handleToggle = () => {
    const nextState = soundService.toggleTheme();
    setIsAudioEnabled(nextState);
    if (!nextState) {
      setShowControls(false);
    }
  };

  const handleVolumeChange = (e) => {
    e.stopPropagation();
    const val = parseFloat(e.target.value);
    soundService.volume = val;
    setVolume(val);
  };

  const handleTrackSelect = (e, trackId) => {
    e.stopPropagation();
    soundService.setTrack(trackId);
  };

  const activeTrack =
    RELAXING_TRACKS.find((t) => t.id === currentTrackId) || RELAXING_TRACKS[0];

  return (
    <div
      className="fixed bottom-6 left-4 sm:left-6 z-40 flex flex-col sm:flex-row items-start sm:items-center gap-2 select-none"
      onMouseEnter={() => isAudioEnabled && setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Main Sound ON/OFF Button */}
      <button
        onClick={handleToggle}
        aria-label={isAudioEnabled ? 'Pause relaxing theme music' : 'Play relaxing feel-good theme music'}
        title={isAudioEnabled ? `Playing: ${activeTrack.name} • Click to pause` : 'Click to play relaxing feel-good music'}
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
            <span className="font-mono tracking-wider text-[11px] hidden xs:inline">SOUND ON</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-[#D8B452]/15 text-[#D8B452] border border-[#D8B452]/30 font-sans tracking-normal hidden md:inline">
              {activeTrack.icon} {activeTrack.name}
            </span>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4 text-slate-400 group-hover:text-[#D8B452] transition-colors" />
            <span className="font-mono tracking-wider text-[11px] hidden xs:inline">SOUND OFF</span>
          </>
        )}
      </button>

      {/* Relaxing Soundtrack Mood Controls & Volume Slider */}
      {isAudioEnabled && (
        <div
          className={`flex items-center gap-2.5 px-3 py-2 rounded-full bg-[#0b0c33]/90 backdrop-blur-md border border-[#D8B452]/30 shadow-lg shadow-[#D8B452]/10 transition-all duration-300 ${
            showControls
              ? 'opacity-100 translate-y-0 sm:translate-x-0 pointer-events-auto'
              : 'opacity-0 translate-y-1 sm:translate-y-0 sm:-translate-x-2 pointer-events-none hidden sm:flex sm:opacity-100 sm:translate-x-0 sm:pointer-events-auto'
          }`}
        >
          {/* Mood Track Selector */}
          <div className="flex items-center gap-1">
            {RELAXING_TRACKS.map((track) => {
              const isSelected = track.id === currentTrackId;
              return (
                <button
                  key={track.id}
                  onClick={(e) => handleTrackSelect(e, track.id)}
                  title={`${track.name} (${track.mood})`}
                  className={`px-2 py-1 rounded-full text-[10px] font-medium transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#D8B452] text-[#050614] font-semibold shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span className="mr-0.5">{track.icon}</span>
                  <span className="hidden sm:inline">{track.name.replace(' Chill', '').replace(' Ambient', '')}</span>
                </button>
              );
            })}
          </div>

          {/* Volume Slider */}
          <div className="flex items-center gap-1.5 pl-2 border-l border-white/10">
            <Volume2 className="w-3.5 h-3.5 text-[#D8B452]/70 shrink-0" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="w-14 sm:w-16 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#D8B452] outline-none"
              aria-label="Soundtrack volume slider"
              title={`Volume: ${Math.round(volume * 100)}%`}
            />
            <span className="text-[10px] font-mono text-[#D8B452]/80 w-6 text-right tabular-nums">
              {Math.round(volume * 100)}%
            </span>
          </div>
        </div>
      )}
    </div>
  );
}


