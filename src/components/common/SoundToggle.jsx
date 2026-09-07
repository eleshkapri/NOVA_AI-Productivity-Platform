import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { soundService } from '../../services/SoundService';

export function SoundToggle() {
  const [isAudioEnabled, setIsAudioEnabled] = useState(() => soundService.isEnabled);

  const handleToggle = () => {
    const nextState = !isAudioEnabled;
    soundService.isEnabled = nextState;
    setIsAudioEnabled(nextState);
  };

  return (
    <div className="fixed bottom-6 left-4 sm:left-6 z-40">
      <button
        onClick={handleToggle}
        aria-label={isAudioEnabled ? 'Mute ambient sound' : 'Enable ambient sound'}
        title={isAudioEnabled ? 'Mute sound' : 'Enable sound'}
        className={`flex items-center gap-2 px-3.5 py-2.5 rounded-full border text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer shadow-lg hover:scale-105 hover:-translate-y-0.5 active:scale-95 hover:shadow-xl hover:shadow-[#D8B452]/25 ${
          isAudioEnabled
            ? 'bg-[#0b0c33] border-[#D8B452] text-[#D8B452] shadow-[#D8B452]/20'
            : 'bg-[#050614]/80 backdrop-blur-md border-white/10 text-slate-400 hover:text-[#D8B452] hover:border-[#D8B452]/50'
        }`}
      >
        {isAudioEnabled ? (
          <>
            <Volume2 className="w-4 h-4 text-[#D8B452] animate-pulse" />
            <span className="hidden sm:inline">Sound ON</span>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4" />
            <span className="hidden sm:inline">Sound OFF</span>
          </>
        )}
      </button>
    </div>
  );
}
