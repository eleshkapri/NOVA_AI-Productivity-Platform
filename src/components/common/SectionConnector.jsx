import React from 'react';
import { Sparkles, Terminal, Activity, Shield, Cpu } from 'lucide-react';

const iconMap = {
  sparkles: Sparkles,
  terminal: Terminal,
  activity: Activity,
  shield: Shield,
  cpu: Cpu,
};

export function SectionConnector({
  badge = '// TELEMETRY PIPELINE',
  metric = 'NOMINAL',
  icon = 'cpu',
  className = '',
}) {
  const Icon = iconMap[icon] || Cpu;

  return (
    <div className={`relative py-3 md:py-4 flex items-center justify-center overflow-hidden pointer-events-none select-none ${className}`}>
      {/* Horizontal Ambient Laser Beam */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-[#FF5500]/30 to-transparent" />
      <div className="absolute inset-x-1/4 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-[#FF7700]/50 to-transparent blur-[1px]" />

      {/* Center Cybernetic Conduit Pill */}
      <div className="relative z-10 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 dark:bg-zinc-950 border border-slate-200/80 dark:border-white/10 shadow-md backdrop-blur-md text-[11px] font-mono tracking-wider text-slate-700 dark:text-zinc-300">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <Icon className="w-3.5 h-3.5 text-[#FF5500]" />
        <span className="font-bold text-slate-900 dark:text-white uppercase">{badge}</span>
        <span className="text-slate-300 dark:text-zinc-700">|</span>
        <span className="text-[10px] font-extrabold text-orange-400 uppercase">{metric}</span>
      </div>
    </div>
  );
}
