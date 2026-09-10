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
    <div className={`relative py-6 md:py-8 flex items-center justify-center overflow-hidden pointer-events-none select-none ${className}`}>
      {/* Horizontal Ambient Laser Beam */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-[#8E6FFF]/30 dark:via-[#8E6FFF]/40 to-transparent" />
      <div className="absolute inset-x-1/4 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-[#D8B452]/40 dark:via-[#D8B452]/60 to-transparent blur-[1px]" />

      {/* Center Cybernetic Conduit Pill */}
      <div className="relative z-10 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 dark:bg-[#07081e]/90 border border-slate-200/80 dark:border-[#8E6FFF]/30 shadow-md backdrop-blur-md text-[11px] font-mono tracking-wider text-slate-700 dark:text-slate-300">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <Icon className="w-3.5 h-3.5 text-[#8E6FFF] dark:text-[#A78BFA]" />
        <span className="font-bold text-slate-900 dark:text-white uppercase">{badge}</span>
        <span className="text-slate-300 dark:text-slate-600">|</span>
        <span className="text-[10px] font-extrabold text-[#D8B452] uppercase">{metric}</span>
      </div>
    </div>
  );
}
