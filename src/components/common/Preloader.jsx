import React, { useEffect, useState, useRef } from 'react';
import { soundService } from '../../services/SoundService';

export function Preloader({ isDark }) {
  const [isDone, setIsDone] = useState(false);
  const [isMounted, setIsMounted] = useState(true);
  const progressBarRef = useRef(null);
  const percentTextRef = useRef(null);
  const statusTextRef = useRef(null);

  useEffect(() => {
    const startTime = performance.now();
    const duration = 1600; // 1.6s silky frictionless pace

    let timer1 = null;
    let timer2 = null;
    let animId = null;
    let lastPercent = -1;

    // Pure sinusoidal ease-out curve for frictionless, continuous glide
    const easeOutSine = (t) => Math.sin((t * Math.PI) / 2);

    const animateProgress = (currentTime) => {
      const elapsed = currentTime - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);
      const eased = easeOutSine(rawProgress);
      // Synchronize percentage text strictly with the visual eased progress
      const currentPercent = Math.min(Math.round(eased * 100), 100);

      // Direct GPU 3D transform without triggering React re-renders
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scale3d(${eased}, 1, 1)`;
      }

      if (currentPercent !== lastPercent) {
        lastPercent = currentPercent;
        if (percentTextRef.current) {
          percentTextRef.current.textContent = `${currentPercent.toString().padStart(2, '0')}%`;
        }
        if (statusTextRef.current) {
          statusTextRef.current.textContent = currentPercent === 100 ? 'System Ready' : 'Calibrating...';
        }
      }

      if (rawProgress < 1) {
        animId = requestAnimationFrame(animateProgress);
      } else {
        if (progressBarRef.current) {
          progressBarRef.current.style.transform = 'scale3d(1, 1, 1)';
        }
        if (percentTextRef.current) {
          percentTextRef.current.textContent = '100%';
        }
        if (statusTextRef.current) {
          statusTextRef.current.textContent = 'System Ready';
        }
        // Brief perceptible moment of 100% completion before lifting curtain
        timer1 = setTimeout(() => {
          setIsDone(true);
          // Only start autoplay when the user comes on the site as the curtain lifts
          soundService.startOnSiteEntry();
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
      data-theme={isDark ? 'dark' : 'light'}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between bg-[#F8FAFC] dark:bg-[#05060A] text-slate-900 dark:text-white p-8 sm:p-12 transition-all duration-900 ease-[cubic-bezier(0.76,0,0.24,1)] will-change-[transform,opacity] ${
        isDone ? '-translate-y-full opacity-90 pointer-events-none' : 'translate-y-0 opacity-100'
      }`}
    >
      {/* Background Ambience & Grid Pattern with Electric Orange Glow */}
      <div className="absolute inset-0 bg-grid-pattern opacity-35 dark:opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-radial from-orange-500/10 via-amber-500/5 to-transparent dark:from-[#FF5500]/15 dark:via-transparent dark:to-transparent pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-orange-500/15 dark:bg-[#FF5500]/15 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-amber-500/15 dark:bg-amber-600/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 left-1/4 w-96 h-96 rounded-full bg-orange-600/15 dark:bg-[#FF5500]/10 blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div
        className={`w-full flex items-center justify-between text-xs font-bold tracking-[0.25em] uppercase text-slate-500 dark:text-slate-400 transition-all duration-500 ${
          isDone ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'
        }`}
      >
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FF5500] animate-pulse shadow-[0_0_10px_#FF5500]" />
          Autonomous System Initializing
        </span>

        <span
          ref={percentTextRef}
          className="font-mono text-[#FF5500] text-sm tracking-normal font-bold"
        >
          00%
        </span>
      </div>

      {/* Center Content with Depth Parallax Exit */}
      <div
        className={`flex flex-col items-center gap-8 text-center max-w-lg transition-all duration-700 delay-75 ${
          isDone ? 'opacity-0 scale-95 -translate-y-6' : 'opacity-100 scale-100 translate-y-0'
        }`}
      >
        {/* Animated Totem with Glowing Aura & Silky Orbital Spinner Ring */}
        <div className="relative flex items-center justify-center">
          {/* Static Soft Ambient Glow Aura */}
          <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 via-[#FF5500]/30 to-amber-500/20 dark:from-[#FF5500]/30 dark:via-[#FF7700]/20 dark:to-orange-600/15 blur-2xl rounded-full scale-125 pointer-events-none" />

          {/* Outer Silky Smooth Orbital Ring */}
          <div className="w-24 h-24 rounded-full border border-slate-300/40 dark:border-white/10 flex items-center justify-center relative pointer-events-none">
            {/* Spinning Cyber-Orange Orbital Ring */}
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#FF5500] border-r-[#FF7700] border-b-orange-600 dark:border-t-[#FF5500] dark:border-r-[#FF8800] dark:border-b-amber-500 animate-spin-smooth" />

            {/* Inner Silky Hardware-Accelerated Totem */}
            <div className="w-14 h-14 relative z-10 flex items-center justify-center animate-totem">
              <svg
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full text-[#FF5500]"
                style={{ transformOrigin: 'center center' }}
              >
                <path
                  d="M4.919 20.0389L6.967 17.9751H13.918V24.9797L11.87 27.0435C8.72 30.2174 4.453 31.9999 0 31.9999C0 27.5126 1.769 23.2129 4.919 20.0389Z"
                  fill="currentColor"
                />
                <path
                  d="M11.87 4.95635L13.918 7.0202V14.0248H6.967L4.919 11.9609C1.769 8.78697 0 4.4873 0 0C4.453 0 8.72 1.78241 11.87 4.95635Z"
                  fill="currentColor"
                />
                <path
                  d="M26.843 11.9609L24.795 14.0248H17.844V7.0202L19.892 4.95635C23.042 1.78241 27.308 0 31.761 0C31.761 4.4873 29.993 8.78697 26.848 11.9609"
                  fill="currentColor"
                />
                <path
                  d="M19.892 27.0489L17.844 24.985V17.9805H24.795L26.843 20.0443C29.993 23.2183 31.761 27.5179 31.761 32.0052C27.308 32.0052 23.042 30.2228 19.892 27.0489Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Brand Reveal */}
        <div className="overflow-hidden">
          <h1 className="text-3xl sm:text-4xl font-black tracking-[0.3em] uppercase text-slate-900 dark:text-white">
            NOVA
          </h1>
          <p className="text-xs tracking-[0.25em] uppercase text-[#FF5500] mt-2 font-mono font-bold">
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
        <div className="w-full h-2 bg-slate-200/80 dark:bg-white/10 rounded-full overflow-hidden p-[1px] border border-slate-300/50 dark:border-white/5 relative shadow-inner">
          <div
            ref={progressBarRef}
            className="h-full w-full bg-gradient-to-r from-[#EA580C] via-[#FF5500] to-[#FF7700] rounded-full shadow-[0_0_14px_rgba(255,85,0,0.85)] relative overflow-hidden"
            style={{
              transform: 'scale3d(0, 1, 1)',
              transformOrigin: 'left center',
              willChange: 'transform',
              backfaceVisibility: 'hidden',
            }}
          >
            {/* Luminous leading laser tip */}
            <div className="absolute right-0 top-0 bottom-0 w-3 bg-white/90 rounded-full shadow-[0_0_8px_#ffffff] pointer-events-none" />
            {/* Shimmer liquid light beam across the progress bar */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer pointer-events-none" />
          </div>
        </div>
        <div className="flex items-center justify-between w-full text-[11px] text-slate-600 dark:text-slate-400 font-mono">
          <span>Loading Engine Modules</span>
          <span ref={statusTextRef} className="text-[#FF5500] font-semibold">
            Calibrating...
          </span>
        </div>
      </div>
    </div>
  );
}
