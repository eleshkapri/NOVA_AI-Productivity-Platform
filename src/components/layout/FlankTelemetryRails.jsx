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
        className="hidden xl:flex fixed left-3 2xl:left-6 top-24 bottom-24 z-20 flex-col items-center justify-between pointer-events-none select-none w-12 text-[10px] font-mono"
      >
        {/* Top Node Indicator & Mini Radar Dish */}
        <div className="flex flex-col items-center gap-2 opacity-80">
          <div className="flex items-center gap-1 text-[9px] font-bold tracking-widest text-[#8E6FFF] dark:text-[#A78BFA] uppercase">
            <Radio className="w-3 h-3 animate-pulse" />
            <span>EDGE</span>
          </div>

          {/* Circular Radar Sweep Instrument (from reference image) */}
          <div className="relative w-10 h-10 rounded-full border border-[#8E6FFF]/30 bg-[#07081e]/60 flex items-center justify-center overflow-hidden shadow-[0_0_12px_rgba(104,51,255,0.2)]">
            {/* Concentric radar ring */}
            <div className="absolute inset-1.5 rounded-full border border-[#8E6FFF]/20" />
            <div className="absolute inset-3 rounded-full border border-[#8E6FFF]/30" />
            {/* Crosshairs */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-px bg-[#8E6FFF]/20" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-full w-px bg-[#8E6FFF]/20" />
            </div>
            {/* Spinning radar sweep hand */}
            <div
              className="absolute inset-0 origin-center animate-spin"
              style={{ animationDuration: '4s', animationTimingFunction: 'linear' }}
            >
              <div className="w-1/2 h-1/2 ml-auto origin-bottom-left bg-gradient-to-tr from-transparent via-[#8E6FFF]/30 to-[#8E6FFF]/60 rounded-tr-full" />
            </div>
            {/* Center blip */}
            <div className="w-1.5 h-1.5 rounded-full bg-[#A78BFA] shadow-[0_0_6px_#A78BFA] relative z-10" />
          </div>
        </div>

        {/* Vertical Metric Ruler Line with Live Scanner Pulse */}
        <div className="relative flex-1 my-3 w-px bg-gradient-to-b from-transparent via-slate-300 dark:via-white/15 to-transparent flex flex-col items-center justify-around py-4">
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
            NOVA.OS // E40-D1 // 12MS-P09
          </div>
        </div>

        {/* Bottom Hardware Core */}
        <div className="flex flex-col items-center gap-1 opacity-80">
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
        className="hidden xl:flex fixed right-3 2xl:right-6 top-24 bottom-24 z-20 flex-col items-center justify-between pointer-events-none select-none w-12 text-[10px] font-mono"
      >
        {/* Top Node Indicator & Burndown Dial */}
        <div className="flex flex-col items-center gap-2 opacity-80">
          <div className="flex items-center gap-1 text-[9px] font-bold tracking-widest text-[#D8B452] uppercase">
            <Activity className="w-3 h-3 animate-pulse" />
            <span>BURNDOWN</span>
          </div>

          {/* Burndown Gauge Dial (from reference image) */}
          <div className="relative w-10 h-10 rounded-full border border-[#D8B452]/30 bg-[#07081e]/60 flex items-center justify-center overflow-hidden shadow-[0_0_12px_rgba(216,180,82,0.2)]">
            <div className="absolute inset-1.5 rounded-full border border-[#D8B452]/20" />
            {/* Angle tick marks */}
            <div className="absolute w-full h-px bg-[#D8B452]/25 rotate-45" />
            <div className="absolute w-full h-px bg-[#D8B452]/25 -rotate-45" />
            {/* Target indicator needle */}
            <div
              className="absolute w-4 h-0.5 bg-[#F3D887] shadow-[0_0_6px_#D8B452] origin-left left-1/2 top-1/2 rotate-45"
            />
            {/* Center hub */}
            <div className="w-2 h-2 rounded-full bg-[#D8B452] shadow-[0_0_6px_#D8B452] relative z-10" />
          </div>
        </div>

        {/* Vertical Metric Ruler Line with Live Scanner Pulse */}
        <div className="relative flex-1 my-3 w-px bg-gradient-to-b from-transparent via-slate-300 dark:via-white/15 to-transparent flex flex-col items-center justify-around py-4">
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
