import React from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { MotionReveal } from '../common/MotionReveal';
import { howItWorksSteps } from '../../data/howItWorks';
import { Link2, Cpu, Sparkles, Rocket } from 'lucide-react';

const iconMap = {
  Link2,
  Cpu,
  Sparkles,
  Rocket,
};

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 md:py-36 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MotionReveal animation="fade-up">
          <SectionHeader
            eyebrow="The 4-Step Journey"
            title="From Initial Integration to"
            titleHighlight="Autonomous Mastery"
            description="Seamlessly onboard your entire engineering organization in under three minutes without disrupting active sprints."
          />
        </MotionReveal>

        {/* 4 Steps Grid with Interactive Hover States */}
        <div className="relative">
          {/* Orchid Active Pulsing Laser Line Conduit */}
          <div className="hidden lg:block absolute top-1/2 left-12 right-12 h-1 animate-laser-conduit rounded-full -translate-y-8 z-0 shadow-[0_0_15px_rgba(142,111,255,0.6)]" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {howItWorksSteps.map((stepItem, index) => {
              const Icon = iconMap[stepItem.iconName] || Sparkles;
              return (
                <MotionReveal key={stepItem.step} delay={index * 120} animation="fade-up" className="h-full">
                  <div
                    className="group bg-white/90 dark:bg-[#07081e]/85 p-7 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-md dark:shadow-xl hover:border-transparent transition-all duration-300 flex flex-col justify-between backdrop-blur-xl cursor-default h-full orchid-card"
                  >
                  <div>
                    {/* Step Number & Icon */}
                    <div className="flex items-center justify-between mb-8">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#6833FF] via-[#7B42FF] to-[#D8B452] text-white flex items-center justify-center font-black text-base shadow-md group-hover:scale-120 group-hover:rotate-6 group-hover:shadow-xl group-hover:shadow-[#6833FF]/35 transition-all duration-300">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="font-mono text-3xl font-black text-[#8E6FFF]/40 dark:text-[#A78BFA]/50 group-hover:text-[#A78BFA] transition-colors duration-300">
                        {stepItem.step}
                      </span>
                    </div>

                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8E6FFF] dark:text-[#C4B5FD]">
                      {stepItem.tag}
                    </span>

                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1.5 mb-3 group-hover:text-[#8E6FFF] dark:group-hover:text-[#C4B5FD] transition-colors">
                      {stepItem.title}
                    </h3>

                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                      {stepItem.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-slate-100 dark:border-white/10 text-xs font-semibold uppercase tracking-wider text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-colors">
                    Phase {index + 1} of 4
                  </div>
                </div>
              </MotionReveal>
            );
          })}
          </div>
        </div>
      </div>
    </section>
  );
}
