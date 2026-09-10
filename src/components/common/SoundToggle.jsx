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
    soundService.toggle();
  };

  return (
    <div className="fixed bottom-6 left-4 sm:left-6 z-40 select-none">
      <button
        type="button"
        onClick={handleToggle}
        aria-label={isPlaying ? 'Turn sound off' : 'Turn sound on'}
        title={isPlaying ? 'Soundtrack is ON (M to stop)' : 'Soundtrack is OFF (M to start)'}
        className={`group flex items-center gap-2.5 px-3.5 py-2 rounded-full border text-xs font-semibold tracking-wider uppercase transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-md ${
          isPlaying
            ? 'bg-white/95 border-[#FF5500] text-[#FF5500] dark:bg-zinc-900/90 dark:border-[#FF5500] dark:text-[#FF5500] shadow-[0_0_15px_rgba(255,85,0,0.25)] ring-1 ring-[#FF5500]/40'
            : 'bg-white border-slate-300 text-slate-700 hover:text-[#FF5500] hover:border-[#FF5500]/60 hover:bg-slate-50 dark:bg-zinc-950/85 dark:border-white/10 dark:text-slate-400 dark:hover:text-[#FF5500] dark:hover:bg-zinc-900/60 shadow-md'
        }`}
      >
        {isPlaying ? (
          <>
            {/* Live 4-Bar Equalizer Visualizer */}
            <div className="flex items-end gap-[3px] h-3.5 w-3.5 pb-0.5" aria-hidden="true">
              <span className="w-0.5 bg-[#FF5500] rounded-full animate-sound-bar-1" />
              <span className="w-0.5 bg-[#FF5500] rounded-full animate-sound-bar-2" />
              <span className="w-0.5 bg-[#FF5500] rounded-full animate-sound-bar-3" />
              <span className="w-0.5 bg-[#FF5500] rounded-full animate-sound-bar-4" />
            </div>
            <span className="font-mono tracking-wider text-[11px] font-bold">SOUND ON</span>
            <kbd className="px-1.5 py-0.5 rounded bg-[#FF5500]/15 text-[10px] text-[#FF5500] font-bold font-mono border border-[#FF5500]/30">M</kbd>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4 text-slate-400 group-hover:text-[#FF5500] transition-colors" />
            <span className="font-mono tracking-wider text-[11px]">SOUND OFF</span>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/10 text-[10px] text-slate-500 dark:text-zinc-400 font-bold font-mono border border-slate-200 dark:border-white/10 group-hover:text-[#FF5500] group-hover:border-[#FF5500]/30 transition-colors">M</kbd>
          </>
        )}
      </button>
    </div>
  );
}

export default SoundToggle;
