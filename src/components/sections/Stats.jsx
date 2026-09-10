import React from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { MotionReveal } from '../common/MotionReveal';
import { statisticsData } from '../../data/stats';
import { useCountUp } from '../../hooks/useCountUp';

function StatCard({ stat }) {
  const [ref, displayValue] = useCountUp(stat.value, 1800, stat.decimals);

  return (
    <div
      ref={ref}
      className="group bg-white/90 dark:bg-[#07081e]/85 p-8 sm:p-9 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-md dark:shadow-xl hover:border-transparent transition-all duration-300 text-center flex flex-col justify-between backdrop-blur-xl cursor-default h-full orchid-card"
    >
      <div>
        <div className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-2 group-hover:scale-105 transition-transform duration-300">
          <span className="orchid-number-gradient font-sans">
            {displayValue}
          </span>
          <span className="orchid-lavender-gradient font-sans font-extrabold ml-0.5">{stat.suffix}</span>
        </div>
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 tracking-wide group-hover:text-[#A78BFA] transition-colors">
          {stat.label}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
          {stat.description}
        </p>
      </div>

      <div className="mt-8 pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#8E6FFF] dark:text-[#C4B5FD]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#8E6FFF] dark:bg-[#A78BFA] animate-pulse" /> Verified Metric
      </div>
    </div>
  );
}

export function Stats() {
  return (
    <section className="py-14 md:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MotionReveal animation="fade-up">
          <SectionHeader
            eyebrow="Measurable Business Scale"
            title="Battle-Tested Scale &"
            titleHighlight="Performance Benchmarks"
            description="NOVA orchestrates high-throughput sprint pipelines for enterprise engineering squads demanding uncompromising stability."
          />
        </MotionReveal>

        {/* 4 Animated Count-up Cards with Tactile Hover Lift */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {statisticsData.map((stat, idx) => (
            <MotionReveal key={stat.id} animation="fade-up" delay={idx * 80} className="h-full">
              <StatCard stat={stat} />
            </MotionReveal>
          ))}
        </div>

        {/* Global Edge Runtime Benchmark Strip */}
        <MotionReveal animation="fade-up" delay={200}>
          <div className="mt-8 p-3.5 sm:p-4 rounded-2xl bg-white/70 dark:bg-[#07081e]/80 border border-slate-200/80 dark:border-white/10 shadow-xs backdrop-blur-md flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="font-bold text-slate-800 dark:text-slate-200 uppercase">EDGE CLUSTER STATUS</span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-[11px]">
              <span>iad-01: <strong className="text-emerald-500">12ms</strong></span>
              <span>sfo-02: <strong className="text-emerald-500">14ms</strong></span>
              <span>fra-01: <strong className="text-emerald-500">18ms</strong></span>
              <span>bom-01: <strong className="text-emerald-500">24ms</strong></span>
              <span className="hidden sm:inline font-bold text-[#D8B452]">99.99% SOC2 COMPLIANT</span>
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
