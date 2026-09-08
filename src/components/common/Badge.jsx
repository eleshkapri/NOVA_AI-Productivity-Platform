import React from 'react';

export function Badge({
  children,
  variant = 'gold',
  dot = false,
  className = '',
}) {
  const variants = {
    gold:
      'bg-amber-50 text-amber-800 border-amber-200/80 dark:bg-[#D8B452]/10 dark:text-[#D8B452] dark:border-[#D8B452]/30',
    orchid:
      'bg-violet-50 text-violet-900 border-violet-200/80 shadow-xs dark:bg-[#6833FF]/15 dark:text-[#E0E7FF] dark:border-[#8E6FFF]/40 dark:shadow-[0_0_12px_rgba(104,51,255,0.25)] hover:border-violet-300 dark:hover:border-[#8E6FFF]/80',
    navy:
      'bg-slate-100 text-slate-800 border-slate-200 dark:bg-[#0b0c33] dark:text-slate-200 dark:border-white/10',
    indigo:
      'bg-indigo-50 text-indigo-800 border-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-400 dark:border-indigo-500/30',
    emerald:
      'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/30',
    slate:
      'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800/80 dark:text-slate-300 dark:border-slate-700',
  };

  const dotColors = {
    gold: 'bg-amber-600 dark:bg-[#D8B452]',
    orchid: 'bg-violet-600 dark:bg-[#A78BFA] dark:shadow-[0_0_8px_#A78BFA]',
    navy: 'bg-slate-700 dark:bg-indigo-400',
    indigo: 'bg-indigo-600 dark:bg-indigo-500',
    emerald: 'bg-emerald-600 dark:bg-emerald-500',
    slate: 'bg-slate-600 dark:bg-slate-400',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase border shadow-xs transition-all duration-200 ${variants[variant] || variants.gold} ${className}`}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant] || 'bg-[#D8B452]'} animate-pulse`} />
      )}
      {children}
    </span>
  );
}
