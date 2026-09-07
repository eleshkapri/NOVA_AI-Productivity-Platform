import React, { useState, useEffect } from 'react';
import { Sparkles, X, ArrowRight } from 'lucide-react';

const activities = [
  {
    id: 'backlog',
    company: 'HyperScale Cloud',
    action: 'auto-triaged 28 backlog user stories',
    time: '2m ago',
    icon: '⚡',
    tab: 'backlog',
    stage: 0,
    targetSection: '#features',
    actionBadge: 'Inspect Backlog AI',
  },
  {
    id: 'pr',
    company: 'Vertex AI Systems',
    action: 'approved PR with zero regression diffs',
    time: '4m ago',
    icon: '▲',
    tab: 'pr',
    stage: 2,
    targetSection: '#features',
    actionBadge: 'Inspect PR Copilot',
  },
  {
    id: 'velocity',
    company: 'Pulse Dynamics',
    action: 'forecasted sprint delivery date with 98% confidence',
    time: '7m ago',
    icon: '◆',
    tab: 'velocity',
    stage: 3,
    targetSection: '#stats',
    actionBadge: 'Inspect Velocity Radar',
  },
  {
    id: 'pricing',
    company: 'FinTech Flow',
    action: 'upgraded 45 engineering seats to Pro tier',
    time: '11m ago',
    icon: '◈',
    tab: 'trial',
    plan: 'pro',
    targetSection: '#pricing',
    actionBadge: 'Explore Pro Tier',
  },
];

const playToastChime = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(659.25, ctx.currentTime); // E5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12); // A5
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.28);
    }
  } catch {
    // Audio optional
  }
};

export function LiveActivityToast({ onOpenDemo }) {
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isDismissed) return;

    let rotateTimer = null;

    // Show initial toast after 3 seconds
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    // Rotate toast every 10 seconds (paused when hovering)
    const interval = setInterval(() => {
      if (isPaused) return;
      setIsVisible(false);
      rotateTimer = setTimeout(() => {
        setIndex((prev) => (prev + 1) % activities.length);
        setIsVisible(true);
      }, 800);
    }, 10000);

    return () => {
      clearTimeout(initialTimer);
      if (rotateTimer) clearTimeout(rotateTimer);
      clearInterval(interval);
    };
  }, [isDismissed, isPaused]);

  if (isDismissed || !isVisible) return null;

  const current = activities[index];

  const handleClick = () => {
    playToastChime();

    // 1. Smoothly scroll page to the respected section
    if (current.targetSection) {
      try {
        const targetElement = document.querySelector(current.targetSection);
        if (targetElement) {
          const offset = 80;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = targetElement.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      } catch {
        // Fallback
      }
    }

    // 2. Open interactive demo modal focused on the respective feature & stage
    if (onOpenDemo) {
      onOpenDemo(current.tab, {
        plan: current.plan || 'pro',
        stage: current.stage !== undefined ? current.stage : 0,
      });
    }
  };

  return (
    <div
      className="fixed bottom-6 right-20 sm:right-24 z-30 max-w-xs sm:max-w-sm animate-fade-in pointer-events-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        role="button"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        }}
        style={{ outline: 'none' }}
        className="bg-[#0b0c33]/95 backdrop-blur-xl border border-[#D8B452]/40 rounded-2xl p-3 sm:p-3.5 shadow-2xl flex items-center gap-3 transition-all duration-300 hover:border-[#D8B452] focus-visible:border-[#D8B452] hover:scale-105 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#D8B452]/25 cursor-pointer group select-none outline-none focus:outline-none focus-visible:outline-none ring-0 focus:ring-0 focus-visible:ring-0"
      >
        <div className="w-8 h-8 rounded-xl bg-[#050614] border border-[#D8B452]/30 flex items-center justify-center text-[#D8B452] shrink-0 text-xs font-bold group-hover:scale-110 group-hover:border-[#D8B452] group-hover:bg-[#D8B452]/10 transition-all duration-300 shadow-sm">
          {current.icon}
        </div>
        <div className="flex-1 min-w-0 pr-1">
          <p className="text-xs font-bold text-white truncate group-hover:text-[#D8B452] transition-colors">
            {current.company}{' '}
            <span className="font-normal text-slate-300">{current.action}</span>
          </p>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-[10px] text-slate-400 flex items-center gap-1 font-mono">
              <Sparkles className="w-2.5 h-2.5 text-[#D8B452]" /> {current.time}
            </p>
            <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-[#D8B452] bg-[#D8B452]/15 border border-[#D8B452]/30 px-1.5 py-0.5 rounded-md group-hover:bg-[#D8B452] group-hover:text-black transition-all">
              {current.actionBadge}
              <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsDismissed(true);
          }}
          aria-label="Dismiss live notification"
          title="Dismiss"
          className="text-slate-400 hover:text-white p-1 rounded-md transition-all hover:scale-120 active:scale-90 hover:bg-white/10 cursor-pointer shrink-0 outline-none focus:outline-none focus-visible:outline-none ring-0 focus:ring-0"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

