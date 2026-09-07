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
    <section className="py-24 md:py-36 relative">
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
            <MotionReveal key={idx} animation="fade-up" delay={idx * 100} className="h-full">
              <StatCard stat={stat} />
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
