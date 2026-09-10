import React from 'react';
import { Activity, Radio, Cpu, ShieldCheck } from 'lucide-react';

export function FlankTelemetryRails() {
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
          <div className="w-6 h-6 rounded-full bg-white/80 dark:bg-[#07081e]/80 border border-[#8E6FFF]/40 flex items-center justify-center shadow-xs backdrop-blur-md">
            <Radio className="w-3 h-3 text-[#8E6FFF] animate-pulse" />
          </div>
          <span className="text-[9px] font-bold tracking-widest text-[#8E6FFF] dark:text-[#A78BFA] uppercase">
            EDGE
          </span>
        </div>

        {/* Vertical Metric Ruler Line with Live Scanner Pulse */}
        <div className="relative flex-1 my-4 w-px bg-gradient-to-b from-transparent via-slate-300 dark:via-white/15 to-transparent flex flex-col items-center justify-around py-4">
          <div className="absolute top-0 w-1.5 h-6 bg-gradient-to-b from-[#8E6FFF] to-transparent rounded-full animate-bounce duration-1000 opacity-80" />
          
          {/* Tick marks */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-px bg-slate-400 dark:bg-white/20 ${i % 3 === 0 ? 'w-3.5 bg-[#8E6FFF] dark:bg-[#A78BFA]' : ''}`}
            />
          ))}

          {/* Vertical Text Label */}
          <div className="rotate-180 [writing-mode:vertical-rl] tracking-[0.25em] text-[9px] font-semibold text-slate-400 dark:text-slate-500 uppercase">
            NOVA.OS // iad-01 : 12ms P99
          </div>
        </div>

        {/* Bottom Hardware Core */}
        <div className="flex flex-col items-center gap-1 opacity-70">
          <Cpu className="w-3.5 h-3.5 text-[#D8B452]" />
          <span className="text-[8px] font-extrabold text-[#D8B452] tracking-wider">
            99.99%
          </span>
        </div>
      </aside>

      {/* ========================================================
          RIGHT FLANK TELEMETRY RAIL (Visible on xl+ screens)
          ======================================================== */}
      <aside
        aria-hidden="true"
        className="hidden xl:flex fixed right-3 2xl:right-6 top-28 bottom-24 z-20 flex-col items-center justify-between pointer-events-none select-none w-10 text-[10px] font-mono"
      >
        {/* Top Node Indicator */}
        <div className="flex flex-col items-center gap-1.5 opacity-70 hover:opacity-100 transition-opacity">
          <div className="w-6 h-6 rounded-full bg-white/80 dark:bg-[#07081e]/80 border border-[#D8B452]/40 flex items-center justify-center shadow-xs backdrop-blur-md">
            <Activity className="w-3 h-3 text-[#D8B452] animate-pulse" />
          </div>
          <span className="text-[9px] font-bold tracking-widest text-[#D8B452] uppercase">
            BURNDOWN
          </span>
        </div>

        {/* Vertical Metric Ruler Line with Live Scanner Pulse */}
        <div className="relative flex-1 my-4 w-px bg-gradient-to-b from-transparent via-slate-300 dark:via-white/15 to-transparent flex flex-col items-center justify-around py-4">
          <div className="absolute bottom-0 w-1.5 h-6 bg-gradient-to-t from-[#D8B452] to-transparent rounded-full animate-bounce duration-1000 opacity-80" />

          {/* Tick marks */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-px bg-slate-400 dark:bg-white/20 ${i % 3 === 0 ? 'w-3.5 bg-[#D8B452]' : ''}`}
            />
          ))}

          {/* Vertical Text Label */}
          <div className="[writing-mode:vertical-rl] tracking-[0.25em] text-[9px] font-semibold text-slate-400 dark:text-slate-500 uppercase">
            AUTONOMOUS ENGINE // 4.2X ACCEL
          </div>
        </div>

        {/* Bottom Hardware Core */}
        <div className="flex flex-col items-center gap-1 opacity-70">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span className="text-[8px] font-extrabold text-emerald-600 dark:text-emerald-400 tracking-wider">
            SOC2
          </span>
        </div>
      </aside>
    </>
  );
}
