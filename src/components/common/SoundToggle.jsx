import React, { useState, useEffect } from 'react';
import { VolumeX } from 'lucide-react';
import { soundService } from '../../services/SoundService';

export function SoundToggle() {
  const [isPlaying, setIsPlaying] = useState(() => soundService.isPlaying);

  useEffect(() => {
    const unsubscribe = soundService.subscribe((state) => {
      setIsPlaying(state.isPlaying);
    });

    return unsubscribe;
  }, []);

  const handleToggle = (e) => {
    e?.stopPropagation?.();
    if (isPlaying) {
      soundService.stopTheme();
    } else {
      soundService.startTheme(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-4 sm:left-6 z-40 select-none">
      <button
        type="button"
        onClick={handleToggle}
        aria-label={isPlaying ? 'Turn sound off' : 'Turn sound on'}
        title={isPlaying ? 'Sound is ON • Click to turn OFF' : 'Sound is OFF • Click to turn ON'}
        className={`group flex items-center gap-2.5 px-3.5 py-2 rounded-full border text-xs font-semibold tracking-wider uppercase transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-md ${
          isPlaying
            ? 'bg-white/95 border-[#D8B452] text-[#B45309] dark:bg-[#0b0c33]/90 dark:border-[#D8B452] dark:text-[#D8B452] dark:shadow-[#D8B452]/25 ring-1 ring-[#D8B452]/40'
            : 'bg-white/95 backdrop-blur-md border-slate-200 text-slate-500 hover:text-[#B45309] hover:border-[#D8B452]/50 hover:bg-slate-50 dark:bg-[#050614]/85 dark:border-white/10 dark:text-slate-400 dark:hover:text-[#D8B452] dark:hover:bg-[#0b0c33]/60'
        }`}
      >
        {isPlaying ? (
          <>
            {/* Live 4-Bar Equalizer Visualizer */}
            <div className="flex items-end gap-[3px] h-3.5 w-3.5 pb-0.5" aria-hidden="true">
              <span className="w-0.5 bg-[#B45309] dark:bg-[#D8B452] rounded-full animate-sound-bar-1" />
              <span className="w-0.5 bg-[#B45309] dark:bg-[#D8B452] rounded-full animate-sound-bar-2" />
              <span className="w-0.5 bg-[#B45309] dark:bg-[#D8B452] rounded-full animate-sound-bar-3" />
              <span className="w-0.5 bg-[#B45309] dark:bg-[#D8B452] rounded-full animate-sound-bar-4" />
            </div>
            <span className="font-mono tracking-wider text-[11px]">SOUND ON</span>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4 text-slate-400 group-hover:text-[#B45309] dark:group-hover:text-[#D8B452] transition-colors" />
            <span className="font-mono tracking-wider text-[11px]">SOUND OFF</span>
          </>
        )}
      </button>
    </div>
  );
}

export default SoundToggle;
