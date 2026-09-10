import React, { useState, useEffect } from 'react';
import { Activity, Radio, Cpu, ShieldCheck } from 'lucide-react';
import { soundService } from '../../services/SoundService';
import { smoothScrollService } from '../../services/SmoothScrollService';

const SNAP_SECTIONS = [
  { id: 'hero', label: 'Hero Playground', index: '01' },
  { id: 'features', label: 'Autonomous Core', index: '02' },
  { id: 'about', label: 'Architecture', index: '03' },
  { id: 'how-it-works', label: '4-Step Pipeline', index: '04' },
  { id: 'stats', label: 'DORA Telemetry', index: '05' },
  { id: 'solutions', label: 'Squad Matrix', index: '06' },
  { id: 'pricing', label: 'Pricing Plans', index: '07' },
  { id: 'faq', label: 'Knowledge Base', index: '08' },
];

export function FlankTelemetryRails({
  activeSectionId,
  scrollProgress: controlledProgress,
  onSnapJump: controlledSnapJump,
}) {
  const [localActiveSection, setLocalActiveSection] = useState('hero');
  const [localProgress, setLocalProgress] = useState(0);

  const activeSection = activeSectionId || localActiveSection;
  const currentProgress = controlledProgress !== undefined ? controlledProgress : localProgress;

  useEffect(() => {
    if (activeSectionId !== undefined && controlledProgress !== undefined) {
      return; // controlled mode, skip duplicate observers
    }

    // 1. Intersection Observer for accurate active section detection
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setLocalActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    SNAP_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // 2. Scroll progress calculation with RAF throttling and cached layout height
    let ticking = false;
    let cachedTotalHeight = 0;

    const measureHeight = () => {
      cachedTotalHeight = document.documentElement.scrollHeight - window.innerHeight;
    };
    measureHeight();

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (cachedTotalHeight <= 0) measureHeight();
          if (cachedTotalHeight > 0) {
            const rawProgress = Math.min(100, Math.max(0, (window.scrollY / cachedTotalHeight) * 100));
            const roundedProgress = Math.round(rawProgress * 10) / 10;
            setLocalProgress((prev) => (Math.abs(prev - roundedProgress) >= 0.5 ? roundedProgress : prev));
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    // Fire immediately on mount so progress isn't stuck at 0%
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', measureHeight, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', measureHeight);
    };
  }, [activeSectionId, controlledProgress]);

  const handleSnapJump = (id) => {
    if (controlledSnapJump) {
      controlledSnapJump(id);
    } else {
      soundService.playChime('actionClick');
      if (id === 'hero') {
        smoothScrollService.scrollTo(0, { duration: 1.5 });
      } else {
        const el = document.getElementById(id);
        if (el) {
          smoothScrollService.scrollTo(el, { offset: -70, duration: 1.5 });
        }
      }
    }
  };


  return (
    <>
      {/* ========================================================
          LEFT FLANK TELEMETRY RAIL (Visible on xl+ screens)
          ======================================================== */}
      <aside
        aria-hidden="true"
        className="hidden xl:flex fixed left-3 2xl:left-6 top-28 bottom-24 z-20 flex-col items-center justify-between pointer-events-none select-none w-10 text-[10px] font-mono"
      >
        {/* Top Node Indicator */}
        <div className="flex flex-col items-center gap-1.5 opacity-70 hover:opacity-100 transition-opacity">
          <div className="w-6 h-6 rounded-full bg-white/80 dark:bg-zinc-950/80 border border-[#FF5500]/40 flex items-center justify-center shadow-xs backdrop-blur-md">
            <Radio className="w-3 h-3 text-[#FF5500] animate-pulse" />
          </div>
          <span className="text-[9px] font-bold tracking-widest text-[#FF5500] uppercase">
            EDGE
          </span>
        </div>

        {/* Vertical Metric Ruler Line with Live Scanner Pulse */}
        <div className="relative flex-1 my-4 w-px bg-gradient-to-b from-transparent via-slate-300 dark:via-white/15 to-transparent flex flex-col items-center justify-around py-4">
          <div className="absolute top-0 w-1.5 h-6 bg-gradient-to-b from-[#FF5500] to-transparent rounded-full animate-bounce duration-1000 opacity-80" />

          {/* Tick marks */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-px bg-slate-400 dark:bg-white/20 ${i % 3 === 0 ? 'w-3.5 bg-[#FF5500]' : ''}`}
            />
          ))}

          {/* Vertical Text Label */}
          <div className="rotate-180 [writing-mode:vertical-rl] tracking-[0.25em] text-[9px] font-semibold text-slate-400 dark:text-slate-500 uppercase">
            NOVA.OS // iad-01 : 8ms P99
          </div>
        </div>

        {/* Bottom Hardware Core */}
        <div className="flex flex-col items-center gap-1 opacity-70">
          <Cpu className="w-3.5 h-3.5 text-[#FF5500]" />
          <span className="text-[8px] font-extrabold text-[#FF5500] tracking-wider">
            99.99%
          </span>
        </div>
      </aside>

      {/* ========================================================
          RIGHT FLANK SNAP-SCROLL NAVIGATOR (Webflow Scroll-Snap Architecture)
          Visible on xl+ screens, fully interactive with tooltips
          ======================================================== */}
      <aside
        aria-label="Section Snap Scroll Navigation"
        className="hidden xl:flex fixed right-3 2xl:right-6 top-28 bottom-24 z-30 flex-col items-center justify-between w-10 text-[10px] font-mono select-none"
      >
        {/* Top Node: Progress Indicator */}
        <div className="flex flex-col items-center gap-1">
          <div className="w-6 h-6 rounded-full bg-white/90 dark:bg-zinc-950/90 border border-slate-300 dark:border-[#FF5500]/40 flex items-center justify-center shadow-xs backdrop-blur-md">
            <Activity className="w-3 h-3 text-[#FF5500]" />
          </div>
          <span className="text-[8px] font-bold tracking-widest text-slate-600 dark:text-zinc-400">
            {Math.round(currentProgress)}%
          </span>
        </div>

        {/* Vertical Rail with Snap Nodes */}
        <div className="relative flex-1 my-3 flex flex-col items-center justify-between py-2">
          {/* Background Wire */}
          <div className="absolute top-0 bottom-0 w-px bg-slate-200 dark:bg-white/10" />

          {/* Active Fill Line */}
          <div
            className="absolute top-0 w-px bg-[#FF5500] transition-all duration-300 ease-out shadow-[0_0_8px_#FF5500]"
            style={{ height: `${currentProgress}%` }}
          />

          {/* 8 Snap Nodes */}
          {SNAP_SECTIONS.map((sec, i) => {
            const isActive = activeSection === sec.id;
            const activeIdx = SNAP_SECTIONS.findIndex((s) => s.id === activeSection);
            const isPassed = i < activeIdx;

            return (
              <div key={sec.id} className="relative group z-10 flex items-center justify-center">
                {/* Clickable Node Trigger */}
                <button
                  type="button"
                  onClick={() => handleSnapJump(sec.id)}
                  aria-label={`Jump to ${sec.label}`}
                  title={`${sec.index} // ${sec.label}`}
                  className={`relative flex items-center justify-center transition-all duration-300 cursor-pointer outline-none ${
                    isActive
                      ? 'w-5 h-5 rounded-full bg-white dark:bg-zinc-950 border-2 border-[#FF5500] scale-110 shadow-md shadow-[#FF5500]/30'
                      : isPassed
                        ? 'w-3.5 h-3.5 rounded-full bg-[#FF5500] border border-[#FF5500] shadow-sm shadow-[#FF5500]/20 hover:scale-125'
                        : 'w-3 h-3 rounded-full bg-slate-300 dark:bg-zinc-800 border border-slate-400 dark:border-white/20 hover:scale-125 hover:bg-[#FF5500] hover:border-[#FF5500]'
                  }`}
                >
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500] animate-ping" />
                  )}
                </button>

                {/* Floating Tooltip Pill (Crency / Webflow style) */}
                <div className="absolute right-7 pointer-events-none opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200 ease-out whitespace-nowrap z-50">
                  <div className="bg-slate-900/95 dark:bg-zinc-950/95 text-white text-[10px] font-mono font-bold px-2.5 py-1 rounded-md border border-slate-700 dark:border-white/10 shadow-xl flex items-center gap-1.5 backdrop-blur-md">
                    <span className="text-[#FF5500]">{sec.index}</span>
                    <span>{sec.label}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Hardware Core */}
        <div className="flex flex-col items-center gap-1 opacity-80">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span className="text-[8px] font-extrabold text-emerald-600 dark:text-emerald-400 tracking-wider">
            SOC2
          </span>
        </div>
      </aside>
    </>
  );
}
