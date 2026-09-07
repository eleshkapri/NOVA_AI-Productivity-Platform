import React, { useState } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { aboutData } from '../../data/about';
import { CheckCircle2, XCircle, Clock, Target, Shuffle } from 'lucide-react';

export function About() {
  const [activeTab, setActiveTab] = useState('after');

  const statIcons = [Clock, Target, Shuffle];

  return (
    <section id="about" className="py-24 md:py-36 bg-amber-50/30 dark:bg-[#07081e]/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="The NOVA Philosophy"
          title="Crafted to Eradicate Friction,"
          titleHighlight="Restoring Pure Engineering Velocity"
          description={aboutData.description}
        />

        {/* 3 Metric Badges with Dynamic Hover Lift */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-20 max-w-4xl mx-auto">
          {aboutData.stats.map((stat, idx) => {
            const Icon = statIcons[idx];
            return (
              <div
                key={stat.label}
                className="group bg-white/90 dark:bg-[#0b0c33]/60 p-7 rounded-3xl border border-slate-200/80 dark:border-white/10 text-center shadow-md dark:shadow-lg hover:border-[#a1741a] dark:hover:border-[#D8B452] hover:shadow-2xl hover:shadow-[#D8B452]/15 hover:-translate-y-2 hover:scale-[1.03] transition-all duration-300 cursor-default"
              >
                <div className="w-13 h-13 mx-auto rounded-2xl bg-amber-50 dark:bg-[#050614] border border-[#a1741a]/20 dark:border-[#D8B452]/30 flex items-center justify-center text-[#a1741a] dark:text-[#D8B452] mb-4 group-hover:scale-120 group-hover:rotate-6 group-hover:bg-[#D8B452] group-hover:text-black group-hover:shadow-md transition-all duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight group-hover:scale-105 transition-transform duration-300">
                  <span className="text-gold-gradient">{stat.value}</span>
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-2">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Comparison Widget with Hover Glow */}
        <div className="max-w-4xl mx-auto bg-white/95 dark:bg-[#0b0c33]/70 rounded-3xl border border-slate-200/90 dark:border-[#D8B452]/30 hover:border-[#a1741a] dark:hover:border-[#D8B452] shadow-xl dark:shadow-2xl hover:shadow-2xl hover:shadow-[#D8B452]/15 transition-all duration-300 overflow-hidden backdrop-blur-2xl">
          <div className="p-7 sm:p-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pb-8 border-b border-slate-200/80 dark:border-white/10">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                  The Workflow Transformation
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Contrast fragmented legacy task tracking against NOVA's autonomous intelligence.
                </p>
              </div>

              {/* Toggle Pills with Magnetic Hover */}
              <div className="inline-flex p-1.5 bg-slate-100 dark:bg-[#050614] rounded-full border border-slate-200 dark:border-white/10 self-start sm:self-auto">
                <button
                  onClick={() => setActiveTab('before')}
                  className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer hover:scale-105 active:scale-95 ${
                    activeTab === 'before'
                      ? 'bg-rose-500 text-white shadow-md'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Legacy Chaos
                </button>
                <button
                  onClick={() => setActiveTab('after')}
                  className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer hover:scale-105 active:scale-95 ${
                    activeTab === 'after'
                      ? 'bg-gradient-to-r from-[#D8B452] to-[#C49A32] text-black font-extrabold shadow-md'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  ✨ With NOVA
                </button>
              </div>
            </div>

            {/* List of items based on activeTab */}
            <div className="pt-8">
              {activeTab === 'before' ? (
                <div className="space-y-4 animate-fade-in">
                  {aboutData.comparison.before.map((point, index) => (
                    <div
                      key={index}
                      className="p-4.5 rounded-2xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 hover:border-rose-400 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex items-start gap-3.5 cursor-default"
                    >
                      <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4 animate-fade-in">
                  {aboutData.comparison.after.map((point, index) => (
                    <div
                      key={index}
                      className="p-4.5 rounded-2xl bg-amber-50/70 dark:bg-[#D8B452]/10 border border-amber-200 dark:border-[#D8B452]/30 hover:border-[#a1741a] dark:hover:border-[#D8B452] hover:shadow-md hover:shadow-[#D8B452]/10 hover:-translate-y-0.5 transition-all duration-200 flex items-start gap-3.5 cursor-default"
                    >
                      <CheckCircle2 className="w-5 h-5 text-[#a1741a] dark:text-[#D8B452] shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-slate-800 dark:text-slate-100">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
