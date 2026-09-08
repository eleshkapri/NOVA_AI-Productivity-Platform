import React, { useState, useEffect } from 'react';
import { Sparkles, X, ArrowRight } from 'lucide-react';
import { ActivityModel } from '../../models/ActivityModel';
import { soundService } from '../../services/SoundService';

const activities = [
  new ActivityModel({
    id: 'backlog',
    company: 'HyperScale Cloud',
    action: 'auto-triaged 28 backlog user stories',
    time: '2m ago',
    icon: '⚡',
    tab: 'backlog',
    stage: 0,
    targetSection: '#features',
    actionBadge: 'Inspect Backlog AI',
  }),
  new ActivityModel({
    id: 'pr',
    company: 'Vertex AI Systems',
    action: 'approved PR with zero regression diffs',
    time: '4m ago',
    icon: '▲',
    tab: 'pr',
    stage: 2,
    targetSection: '#features',
    actionBadge: 'Inspect PR Copilot',
  }),
  new ActivityModel({
    id: 'velocity',
    company: 'Pulse Dynamics',
    action: 'forecasted sprint delivery date with 98% confidence',
    time: '7m ago',
    icon: '◆',
    tab: 'velocity',
    stage: 3,
    targetSection: '#stats',
    actionBadge: 'Inspect Velocity Radar',
  }),
  new ActivityModel({
    id: 'pricing',
    company: 'FinTech Flow',
    action: 'upgraded 45 engineering seats to Pro tier',
    time: '11m ago',
    icon: '◈',
    tab: 'trial',
    plan: 'pro',
    targetSection: '#pricing',
    actionBadge: 'Explore Pro Tier',
  }),
];

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
    current.executeRedirection({
      onOpenDemo,
      playAudio: () => soundService.playChime('actionClick'),
    });
  };

  return (
    <div
      className="fixed bottom-20 left-4 right-4 sm:left-auto sm:right-24 sm:bottom-6 sm:max-w-sm z-30 animate-fade-in pointer-events-auto"
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
        className="bg-white/95 dark:bg-[#0b0c33]/95 backdrop-blur-xl border border-slate-200/90 dark:border-[#D8B452]/40 rounded-2xl p-3 sm:p-3.5 shadow-xl dark:shadow-2xl flex items-center gap-3 transition-all duration-300 hover:border-[#D8B452] focus-visible:border-[#D8B452] hover:scale-105 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#D8B452]/15 cursor-pointer group select-none outline-none focus:outline-none focus-visible:outline-none ring-0 focus:ring-0 focus-visible:ring-0"
      >
        <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-[#050614] border border-amber-200/80 dark:border-[#D8B452]/30 flex items-center justify-center text-[#B45309] dark:text-[#D8B452] shrink-0 text-xs font-bold group-hover:scale-110 group-hover:border-[#D8B452] group-hover:bg-[#D8B452]/10 transition-all duration-300 shadow-xs">
          {current.icon}
        </div>
        <div className="flex-1 min-w-0 pr-1">
          <p className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-[#B45309] dark:group-hover:text-[#D8B452] transition-colors">
            {current.company}{' '}
            <span className="font-normal text-slate-600 dark:text-slate-300">{current.action}</span>
          </p>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1 font-mono">
              <Sparkles className="w-2.5 h-2.5 text-[#B45309] dark:text-[#D8B452]" /> {current.time}
            </p>
            <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-[#B45309] bg-amber-50 border border-amber-200/80 dark:text-[#D8B452] dark:bg-[#D8B452]/15 dark:border-[#D8B452]/30 px-1.5 py-0.5 rounded-md group-hover:bg-[#D8B452] group-hover:text-black transition-all">
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
          className="text-slate-400 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white p-1 rounded-md transition-all hover:scale-120 active:scale-90 hover:bg-slate-100 dark:hover:bg-white/10 cursor-pointer shrink-0 outline-none focus:outline-none focus-visible:outline-none ring-0 focus:ring-0"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

