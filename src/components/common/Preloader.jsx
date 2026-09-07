import React, { useEffect, useState } from 'react';

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    // Smooth progress count from 0 to 100%
    const startTime = performance.now();
    const duration = 1200; // 1.2 seconds

    let timer1 = null;
    let timer2 = null;
    let animId = null;

    const animateProgress = (currentTime) => {
      const elapsed = currentTime - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easedProgress = Math.floor((1 - Math.pow(1 - rawProgress, 3)) * 100);

      setProgress(easedProgress);

      if (rawProgress < 1) {
        animId = requestAnimationFrame(animateProgress);
      } else {
        setProgress(100);
        timer1 = setTimeout(() => {
          setIsDone(true);
          timer2 = setTimeout(() => {
            setIsMounted(false);
          }, 700); // Wait for curtain slide animation
        }, 200);
      }
    };

    animId = requestAnimationFrame(animateProgress);
    return () => {
      if (animId) cancelAnimationFrame(animId);
      if (timer1) clearTimeout(timer1);
      if (timer2) clearTimeout(timer2);
    };
  }, []);

  if (!isMounted) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between bg-[#050614] text-white p-8 sm:p-12 transition-transform duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${
        isDone ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      {/* Top Header of Preloader */}
      <div className="w-full flex items-center justify-between text-xs font-bold tracking-[0.25em] uppercase text-slate-500">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D8B452] animate-ping" />
          Autonomous System Initializing
        </span>
        <span className="font-mono text-[#D8B452]">{progress}%</span>
      </div>

      {/* Center: Golden Totem & Masked Headline */}
      <div className="flex flex-col items-center gap-8 text-center max-w-lg">
        {/* Animated Totem with Glowing Aura */}
        <div className="relative">
          <div className="absolute inset-0 bg-[#D8B452]/20 blur-2xl rounded-full scale-150 animate-pulse" />
          <div className="w-20 h-20 relative z-10 transition-transform duration-500 hover:rotate-180">
            <svg
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full drop-shadow-[0_0_15px_rgba(216,180,82,0.6)] animate-totem"
            >
              <path
                d="M4.919 20.0389L6.967 17.9751H13.918V24.9797L11.87 27.0435C8.72 30.2174 4.453 31.9999 0 31.9999C0 27.5126 1.769 23.2129 4.919 20.0389Z"
                fill="#D8B452"
              />
              <path
                d="M11.87 4.95635L13.918 7.0202V14.0248H6.967L4.919 11.9609C1.769 8.78697 0 4.4873 0 0C4.453 0 8.72 1.78241 11.87 4.95635Z"
                fill="#D8B452"
              />
              <path
                d="M26.843 11.9609L24.795 14.0248H17.844V7.0202L19.892 4.95635C23.042 1.78241 27.308 0 31.761 0C31.761 4.4873 29.993 8.78697 26.848 11.9609"
                fill="#D8B452"
              />
              <path
                d="M19.892 27.0489L17.844 24.985V17.9805H24.795L26.843 20.0443C29.993 23.2183 31.761 27.5179 31.761 32.0052C27.308 32.0052 23.042 30.2228 19.892 27.0489Z"
                fill="#D8B452"
              />
            </svg>
          </div>
        </div>

        {/* Brand Reveal */}
        <div className="overflow-hidden">
          <h1 className="text-3xl sm:text-4xl font-black tracking-[0.3em] uppercase text-white">
            NOVA
          </h1>
          <p className="text-xs tracking-[0.25em] uppercase text-[#D8B452] mt-2 font-serif italic">
            Build Better &bull; Work Smarter
          </p>
        </div>
      </div>

      {/* Bottom Progress Bar */}
      <div className="w-full max-w-md flex flex-col items-center gap-3">
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#D8B452] via-[#F3D887] to-[#D8B452] transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center justify-between w-full text-[11px] text-slate-400 font-mono">
          <span>Loading Engine Modules</span>
          <span>{progress === 100 ? 'Ready' : 'Calibrating...'}</span>
        </div>
      </div>
    </div>
  );
}
