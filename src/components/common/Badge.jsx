import React from 'react';

export function Badge({
  children,
  variant = 'gold',
  dot = false,
  className = '',
}) {
  const variants = {
    gold:
      'bg-[#D8B452]/10 text-[#D8B452] border-[#D8B452]/30',
    orchid:
      'bg-[#6833FF]/15 text-[#C4B5FD] dark:text-[#E0E7FF] border-[#8E6FFF]/40 shadow-[0_0_12px_rgba(104,51,255,0.25)] hover:border-[#8E6FFF]/80',
    navy:
      'bg-[#0b0c33] text-slate-200 border-white/10',
    indigo:
      'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
    emerald:
      'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    slate:
      'bg-slate-800/80 text-slate-300 border-slate-700',
  };

  const dotColors = {
    gold: 'bg-[#D8B452]',
    orchid: 'bg-[#A78BFA] shadow-[0_0_8px_#A78BFA]',
    navy: 'bg-indigo-400',
    indigo: 'bg-indigo-500',
    emerald: 'bg-emerald-500',
    slate: 'bg-slate-400',
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
