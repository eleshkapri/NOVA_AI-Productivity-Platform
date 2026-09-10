import React from 'react';

export function Badge({
  children,
  variant = 'gold',
  dot = false,
  className = '',
}) {
  const variants = {
    gold:
      'bg-orange-50 text-orange-950 border-orange-300 font-extrabold shadow-xs dark:bg-[#FF5500]/15 dark:text-[#FF7700] dark:border-[#FF5500]/40 dark:shadow-[0_0_12px_rgba(255,85,0,0.25)] hover:border-orange-400 dark:hover:border-[#FF5500]/80',
    orange:
      'bg-orange-50 text-orange-950 border-orange-300 font-extrabold shadow-xs dark:bg-[#FF5500]/15 dark:text-[#FF7700] dark:border-[#FF5500]/40 dark:shadow-[0_0_12px_rgba(255,85,0,0.25)] hover:border-orange-400 dark:hover:border-[#FF5500]/80',
    orchid:
      'bg-violet-50 text-violet-950 border-violet-300 font-extrabold shadow-xs dark:bg-[#6833FF]/15 dark:text-[#E0E7FF] dark:border-[#8E6FFF]/40 dark:shadow-[0_0_12px_rgba(104,51,255,0.25)] hover:border-violet-400 dark:hover:border-[#8E6FFF]/80',
    navy:
      'bg-slate-100 text-slate-900 border-slate-300 font-extrabold shadow-xs dark:bg-zinc-900 dark:text-slate-200 dark:border-white/10',
    indigo:
      'bg-indigo-50 text-indigo-950 border-indigo-300 font-extrabold shadow-xs dark:bg-indigo-500/10 dark:text-indigo-400 dark:border-indigo-500/30',
    emerald:
      'bg-emerald-50 text-emerald-950 border-emerald-300 font-extrabold shadow-xs dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/30',
    slate:
      'bg-slate-100 text-slate-900 border-slate-300 font-extrabold shadow-xs dark:bg-slate-800/80 dark:text-slate-300 dark:border-slate-700',
  };

  const dotColors = {
    gold: 'bg-orange-600 dark:bg-[#FF5500] dark:shadow-[0_0_8px_#FF5500]',
    orange: 'bg-orange-600 dark:bg-[#FF5500] dark:shadow-[0_0_8px_#FF5500]',
    orchid: 'bg-violet-600 dark:bg-[#A78BFA] dark:shadow-[0_0_8px_#A78BFA]',
    navy: 'bg-slate-700 dark:bg-zinc-400',
    indigo: 'bg-indigo-600 dark:bg-indigo-500',
    emerald: 'bg-emerald-600 dark:bg-emerald-500',
    slate: 'bg-slate-600 dark:bg-slate-400',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase border shadow-xs transition-all duration-200 whitespace-nowrap shrink-0 ${variants[variant] || variants.orange} ${className}`}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant] || 'bg-[#FF5500]'} animate-pulse`} />
      )}
      {children}
    </span>
  );

}
