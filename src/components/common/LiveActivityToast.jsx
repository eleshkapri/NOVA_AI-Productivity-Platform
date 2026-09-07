import React, { useState, useEffect } from 'react';
import { Sparkles, X } from 'lucide-react';

const activities = [
  {
    company: 'HyperScale Cloud',
    action: 'auto-triaged 28 backlog user stories',
    time: '2m ago',
    icon: '⚡',
  },
  {
    company: 'Vertex AI Systems',
    action: 'approved PR with zero regression diffs',
    time: '4m ago',
    icon: '▲',
  },
  {
    company: 'Pulse Dynamics',
    action: 'forecasted sprint delivery date with 98% confidence',
    time: '7m ago',
    icon: '◆',
  },
  {
    company: 'FinTech Flow',
    action: 'upgraded 45 engineering seats to Pro tier',
    time: '11m ago',
    icon: '◈',
  },
];

export function LiveActivityToast() {
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) return;

    // Show initial toast after 3 seconds
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    // Rotate toast every 10 seconds
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % activities.length);
        setIsVisible(true);
      }, 800);
    }, 10000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [isDismissed]);

  if (isDismissed || !isVisible) return null;

  const current = activities[index];

  return (
    <div className="fixed bottom-6 right-20 sm:right-24 z-30 max-w-xs sm:max-w-sm animate-fade-in pointer-events-auto">
      <div className="bg-[#0b0c33]/95 backdrop-blur-xl border border-[#D8B452]/40 rounded-2xl p-3 sm:p-3.5 shadow-2xl flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-[#050614] border border-[#D8B452]/30 flex items-center justify-center text-[#D8B452] shrink-0 text-xs font-bold">
          {current.icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-white truncate">
            {current.company}{' '}
            <span className="font-normal text-slate-300">{current.action}</span>
          </p>
          <p className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1 font-mono">
            <Sparkles className="w-2.5 h-2.5 text-[#D8B452]" /> {current.time}
          </p>
        </div>
        <button
          onClick={() => setIsDismissed(true)}
          aria-label="Dismiss live notification"
          className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
