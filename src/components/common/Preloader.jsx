import React, { useEffect, useState, useRef } from 'react';

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [isMounted, setIsMounted] = useState(true);
  const progressBarRef = useRef(null);

  useEffect(() => {
    const startTime = performance.now();
    const duration = 1400; // 1.4s silky smooth pace

    let timer1 = null;
    let timer2 = null;
    let animId = null;

    // Smooth easeInOutCubic for organic, weighted acceleration & deceleration
    const easeInOutCubic = (t) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const animateProgress = (currentTime) => {
      const elapsed = currentTime - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);
      const eased = easeInOutCubic(rawProgress);
      const currentPercent = Math.min(Math.round(eased * 100), 100);

      setProgress(currentPercent);

      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${eased})`;
      }

      if (rawProgress < 1) {
        animId = requestAnimationFrame(animateProgress);
      } else {
        setProgress(100);
        if (progressBarRef.current) {
          progressBarRef.current.style.transform = 'scaleX(1)';
        }
        // Brief perceptible moment of 100% completion before lifting curtain
        timer1 = setTimeout(() => {
          setIsDone(true);
          timer2 = setTimeout(() => {
            setIsMounted(false);
          }, 950); // Generous time for the silky curtain curve to finish
        }, 180);
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
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between bg-[#050614] text-white p-8 sm:p-12 transition-all duration-900 ease-[cubic-bezier(0.76,0,0.24,1)] will-change-[transform,opacity] ${
        isDone ? '-translate-y-full opacity-90 pointer-events-none' : 'translate-y-0 opacity-100'
      }`}
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-radial from-[#D8B452]/10 via-transparent to-transparent pointer-events-none" />

      {/* Top Header */}
      <div
        className={`w-full flex items-center justify-between text-xs font-bold tracking-[0.25em] uppercase text-slate-500 transition-all duration-500 ${
          isDone ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'
        }`}
      >
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D8B452] animate-pulse shadow-[0_0_8px_#D8B452]" />
          Autonomous System Initializing
        </span>
        <span className="font-mono text-[#D8B452] text-sm tracking-normal">
          {progress.toString().padStart(2, '0')}%
        </span>
      </div>

      {/* Center Content with Depth Parallax Exit */}
      <div
        className={`flex flex-col items-center gap-8 text-center max-w-lg transition-all duration-700 delay-75 ${
          isDone ? 'opacity-0 scale-95 -translate-y-6' : 'opacity-100 scale-100 translate-y-0'
        }`}
      >
        {/* Animated Totem with Glowing Aura */}
        <div className="relative">
          <div className="absolute inset-0 bg-[#D8B452]/25 blur-3xl rounded-full scale-150 animate-pulse" />
          <div className="w-20 h-20 relative z-10 transition-transform duration-500 hover:rotate-180">
            <svg
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full drop-shadow-[0_0_20px_rgba(216,180,82,0.7)] animate-totem"
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

      {/* Bottom Progress Bar with GPU Scale */}
      <div
        className={`w-full max-w-md flex flex-col items-center gap-3 transition-all duration-500 ${
          isDone ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
        }`}
      >
        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden p-[1px]">
          <div
            ref={progressBarRef}
            className="h-full w-full bg-gradient-to-r from-[#D8B452] via-[#F3D887] to-[#D8B452] rounded-full will-change-transform shadow-[0_0_10px_rgba(216,180,82,0.8)]"
            style={{ transform: 'scaleX(0)', transformOrigin: 'left' }}
          />
        </div>
        <div className="flex items-center justify-between w-full text-[11px] text-slate-400 font-mono">
          <span>Loading Engine Modules</span>
          <span className="text-[#D8B452] font-semibold">
            {progress === 100 ? 'System Ready' : 'Calibrating...'}
          </span>
        </div>
      </div>
    </div>
  );
}
