import React from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { MotionReveal } from '../common/MotionReveal';
import { statisticsData } from '../../data/stats';
import { useCountUp } from '../../hooks/useCountUp';
import { Activity, ShieldCheck } from 'lucide-react';

function StatCard({ stat }) {
  const [ref, displayValue] = useCountUp(stat.value, 1800, stat.decimals);

  return (
    <div
      ref={ref}
      className="group bg-white/90 dark:bg-[#07081e]/60 p-7 sm:p-9 rounded-[2.25rem] border border-slate-200/80 dark:border-white/10 shadow-md dark:shadow-2xl hover:border-[#D8B452]/50 hover:shadow-[0_20px_40px_-15px_rgba(104,51,255,0.2)] transition-all duration-500 text-center flex flex-col justify-between backdrop-blur-xl cursor-default h-full ring-1 ring-inset ring-white/5"
    >
      <div>
        <div className="text-4xl sm:text-5xl lg:text-6xl font-black font-mono tracking-tight mb-2 group-hover:scale-105 transition-transform duration-300">
          <span className="text-gold-gradient">
            {displayValue}
          </span>
          <span className="text-[#D8B452] font-extrabold ml-0.5">{stat.suffix}</span>
        </div>
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 tracking-wide group-hover:text-[#F3D887] transition-colors">
          {stat.label}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed font-normal">
          {stat.description}
        </p>
      </div>

      <div className="mt-8 pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-[#D8B452] dark:text-[#F3D887]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#D8B452] animate-pulse" /> Verified Metric
      </div>
    </div>
  );
}

export function Stats() {
  return (
    <section className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MotionReveal animation="fade-up">
          <SectionHeader
            eyebrow="Measurable Velocity Scale"
            eyebrowVariant="gold"
            title="Battle-Tested Scale &"
            titleHighlight="Performance Benchmarks"
            description="NOVA orchestrates high-throughput sprint pipelines for enterprise engineering squads demanding uncompromising stability."
          />
        </MotionReveal>

        {/* 4 Animated Count-up Cards with Tactile Hover Lift */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-10">
          {statisticsData.map((stat, idx) => (
            <MotionReveal key={stat.id} animation="fade-up" delay={idx * 80} className="h-full">
              <StatCard stat={stat} />
            </MotionReveal>
          ))}
        </div>

        {/* Kinetic Waveform Benchmarks Showcase (stats_waveform.jpg) */}
        <MotionReveal animation="fade-up" delay={180}>
          <div className="relative rounded-[2.5rem] overflow-hidden bg-zinc-950 border border-white/10 hover:border-[#D8B452]/40 transition-colors shadow-2xl group mb-8">
            <div className="aspect-21/8 overflow-hidden max-h-[300px]">
              <img
                src="/images/nova_sections/stats_waveform.jpg"
                alt="NOVA Kinetic Fluid Waveform Real-time Telemetry"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050614]/90 via-[#050614]/30 to-transparent pointer-events-none" />
            </div>

            {/* In-banner Telemetry HUD */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-[#07081e]/85 border border-white/10 backdrop-blur-md text-xs font-mono text-white">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#D8B452] animate-pulse" />
                <span className="font-bold tracking-wider">KINETIC WAVEFORM TELEMETRY</span>
              </div>
              <div className="flex items-center gap-4 text-zinc-300 text-[11px]">
                <span>BURNDOWN RESILIENCE: <strong className="text-emerald-400">OPTIMAL</strong></span>
                <span className="hidden md:inline">PEAK PACKET THROUGHPUT: <strong className="text-[#D8B452]">42.8 GB/S</strong></span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>SOC-2 TYPE II</span>
                </span>
              </div>
            </div>
          </div>
        </MotionReveal>

        {/* Global Edge Runtime Benchmark Strip */}
        <MotionReveal animation="fade-up" delay={220}>
          <div className="p-4 sm:p-5 rounded-[2rem] bg-white/70 dark:bg-[#07081e]/60 border border-slate-200/80 dark:border-white/10 shadow-xs backdrop-blur-md flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-600 dark:text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="font-bold text-slate-800 dark:text-slate-200 uppercase">EDGE CLUSTER STATUS</span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-[11px]">
              <span>iad-01: <strong className="text-emerald-400">12ms</strong></span>
              <span>sfo-02: <strong className="text-emerald-400">14ms</strong></span>
              <span>fra-01: <strong className="text-emerald-400">18ms</strong></span>
              <span>bom-01: <strong className="text-emerald-400">24ms</strong></span>
              <span className="hidden sm:inline font-bold text-[#D8B452]">99.99% SOC2 COMPLIANT</span>
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
