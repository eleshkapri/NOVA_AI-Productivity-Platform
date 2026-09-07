import React from 'react';
import { SectionHeader } from '../common/SectionHeader';
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
    <section id="how-it-works" className="py-20 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Simple 4-Step Onboarding"
          title="From Backlog Chaos to"
          titleHighlight="Predictable Shipping"
          description="Get your entire engineering squad up and running with NOVA in less than three minutes without retraining your team."
        />

        {/* 4 Steps Grid */}
        <div className="relative">
          {/* Connecting Line for Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-12 right-12 h-0.5 bg-gradient-to-r from-indigo-500/20 via-indigo-500/60 to-purple-500/20 -translate-y-8 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {howItWorksSteps.map((stepItem, index) => {
              const Icon = iconMap[stepItem.iconName] || Sparkles;
              return (
                <div
                  key={stepItem.step}
                  className="bg-white dark:bg-slate-900/80 p-6 sm:p-7 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Step Number & Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center font-extrabold text-base shadow-md shadow-indigo-500/25">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="font-mono text-2xl font-black text-slate-300 dark:text-slate-700">
                        {stepItem.step}
                      </span>
                    </div>

                    <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                      {stepItem.tag}
                    </span>

                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1 mb-2.5">
                      {stepItem.title}
                    </h3>

                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {stepItem.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 text-xs font-semibold text-slate-400 dark:text-slate-500">
                    Phase {index + 1} of 4
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
