import React, { useState, useEffect } from 'react';
import { soundService } from '../../services/SoundService';

export function SoundToggle() {
  const [isPlaying, setIsPlaying] = useState(() => soundService.isPlaying);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const unsubscribe = soundService.subscribe((state) => {
      setIsPlaying(state.isPlaying);
      if (!state.isEnabled) {
        setIsDismissed(true);
      }
    });

    return unsubscribe;
  }, []);

  const handleTurnOff = (e) => {
    e?.stopPropagation?.();
    soundService.stopTheme();
    setIsDismissed(true);
  };

  // Only the OFF option is available when playing on site entry.
  // Once turned off or when not playing, remove the sound option completely.
  if (isDismissed || !isPlaying) {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-4 sm:left-6 z-40 select-none transition-opacity duration-300">
      <button
        type="button"
        onClick={handleTurnOff}
        aria-label="Turn sound off"
        title="Sound is ON • Click to turn OFF"
        className="group flex items-center gap-2.5 px-3.5 py-2 rounded-full border border-[#D8B452] bg-white/95 text-[#B45309] shadow-md dark:bg-[#0b0c33]/90 dark:border-[#D8B452] dark:text-[#D8B452] dark:shadow-[#D8B452]/25 ring-1 ring-[#D8B452]/40 text-xs font-semibold tracking-wider uppercase transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
      >
        {/* Live 4-Bar Equalizer Visualizer */}
        <div className="flex items-end gap-[3px] h-3.5 w-3.5 pb-0.5" aria-hidden="true">
          <span className="w-0.5 bg-[#B45309] dark:bg-[#D8B452] rounded-full animate-sound-bar-1" />
          <span className="w-0.5 bg-[#B45309] dark:bg-[#D8B452] rounded-full animate-sound-bar-2" />
          <span className="w-0.5 bg-[#B45309] dark:bg-[#D8B452] rounded-full animate-sound-bar-3" />
          <span className="w-0.5 bg-[#B45309] dark:bg-[#D8B452] rounded-full animate-sound-bar-4" />
        </div>
        <span className="font-mono tracking-wider text-[11px]">SOUND OFF</span>
      </button>
    </div>
  );
}

export default SoundToggle;
