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
          {/* Connecting Line with Gold Accent */}
          <div className="hidden lg:block absolute top-1/2 left-12 right-12 h-0.5 bg-gradient-to-r from-[#a1741a]/20 via-[#a1741a]/50 to-[#a1741a]/20 dark:from-[#D8B452]/20 dark:via-[#D8B452]/60 dark:to-[#D8B452]/20 -translate-y-8 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {howItWorksSteps.map((stepItem, index) => {
              const Icon = iconMap[stepItem.iconName] || Sparkles;
              return (
                <MotionReveal key={stepItem.step} delay={index * 120} animation="fade-up" className="h-full">
                  <div
                    className="group bg-white/90 dark:bg-[#0b0c33]/60 p-7 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-md dark:shadow-xl hover:border-[#a1741a] dark:hover:border-[#D8B452] hover:shadow-2xl hover:shadow-[#D8B452]/20 transition-all duration-300 flex flex-col justify-between backdrop-blur-xl hover:-translate-y-2.5 hover:scale-[1.02] cursor-default h-full"
                  >
                  <div>
                    {/* Step Number & Icon */}
                    <div className="flex items-center justify-between mb-8">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#D8B452] to-[#B38722] text-black flex items-center justify-center font-black text-base shadow-md group-hover:scale-120 group-hover:rotate-6 group-hover:shadow-xl group-hover:shadow-[#D8B452]/30 transition-all duration-300">
                        <Icon className="w-6 h-6 text-black" />
                      </div>
                      <span className="font-mono text-3xl font-black text-[#a1741a]/30 dark:text-[#D8B452]/40 group-hover:text-[#a1741a] dark:group-hover:text-[#D8B452] transition-colors duration-300">
                        {stepItem.step}
                      </span>
                    </div>

                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#a1741a] dark:text-[#D8B452]">
                      {stepItem.tag}
                    </span>

                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1.5 mb-3 group-hover:text-[#a1741a] dark:group-hover:text-[#D8B452] transition-colors">
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
