import React, { useState } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { aboutData } from '../../data/about';
import { CheckCircle2, XCircle, Clock, Target, Shuffle } from 'lucide-react';

export function About() {
  const [activeTab, setActiveTab] = useState('after');

  const statIcons = [Clock, Target, Shuffle];

  return (
    <section id="about" className="py-24 md:py-36 bg-[#07081e]/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="The NOVA Philosophy"
          title="Crafted to Eradicate Friction,"
          titleHighlight="Restoring Pure Engineering Velocity"
          description={aboutData.description}
        />

        {/* 3 Metric Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-20 max-w-4xl mx-auto">
          {aboutData.stats.map((stat, idx) => {
            const Icon = statIcons[idx];
            return (
              <div
                key={stat.label}
                className="bg-[#0b0c33]/60 p-7 rounded-3xl border border-white/10 text-center shadow-lg hover:border-[#D8B452]/50 transition-all duration-300"
              >
                <div className="w-12 h-12 mx-auto rounded-2xl bg-[#050614] border border-[#D8B452]/30 flex items-center justify-center text-[#D8B452] mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  <span className="text-gold-gradient">{stat.value}</span>
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-2">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Comparison Widget */}
        <div className="max-w-4xl mx-auto bg-[#0b0c33]/70 rounded-3xl border border-[#D8B452]/30 shadow-2xl overflow-hidden backdrop-blur-2xl">
          <div className="p-7 sm:p-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pb-8 border-b border-white/10">
              <div>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  The Workflow Transformation
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                  Contrast fragmented legacy task tracking against NOVA's autonomous intelligence.
                </p>
              </div>

              {/* Toggle Pills */}
              <div className="inline-flex p-1.5 bg-[#050614] rounded-full border border-white/10 self-start sm:self-auto">
                <button
                  onClick={() => setActiveTab('before')}
                  className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === 'before'
                      ? 'bg-rose-500 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Legacy Chaos
                </button>
                <button
                  onClick={() => setActiveTab('after')}
                  className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === 'after'
                      ? 'bg-gradient-to-r from-[#D8B452] to-[#C49A32] text-black font-extrabold shadow-md'
                      : 'text-slate-400 hover:text-white'
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
                      className="p-4.5 rounded-2xl bg-rose-950/20 border border-rose-900/40 flex items-start gap-3.5"
                    >
                      <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-slate-200">
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
                      className="p-4.5 rounded-2xl bg-[#D8B452]/10 border border-[#D8B452]/30 flex items-start gap-3.5"
                    >
                      <CheckCircle2 className="w-5 h-5 text-[#D8B452] shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-slate-100">
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
