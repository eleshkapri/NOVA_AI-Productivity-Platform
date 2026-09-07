import React, { useState } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { aboutData } from '../../data/about';
import { CheckCircle2, XCircle, Clock, Target, Shuffle } from 'lucide-react';

export function About() {
  const [activeTab, setActiveTab] = useState('after');

  const statIcons = [Clock, Target, Shuffle];

  return (
    <section id="about" className="py-20 md:py-32 bg-slate-50/60 dark:bg-slate-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="The NOVA Philosophy"
          title="Eliminating Developer Toil,"
          titleHighlight="Restoring Deep Engineering Focus"
          description={aboutData.description}
        />

        {/* 3 Metric Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
          {aboutData.stats.map((stat, idx) => {
            const Icon = statIcons[idx];
            return (
              <div
                key={stat.label}
                className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 text-center shadow-xs hover:border-indigo-500/40 transition-colors"
              >
                <div className="w-10 h-10 mx-auto rounded-xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Comparison Widget */}
        <div className="max-w-4xl mx-auto bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  The Workflow Transformation
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  See the difference between legacy project management and NOVA's autonomous workflow.
                </p>
              </div>

              {/* Toggle Pills */}
              <div className="inline-flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl self-start sm:self-auto">
                <button
                  onClick={() => setActiveTab('before')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'before'
                      ? 'bg-rose-500 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Legacy Chaos
                </button>
                <button
                  onClick={() => setActiveTab('after')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'after'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  ✨ With NOVA
                </button>
              </div>
            </div>

            {/* List of items based on activeTab */}
            <div className="pt-6">
              {activeTab === 'before' ? (
                <div className="space-y-4 animate-fade-in">
                  {aboutData.comparison.before.map((point, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200/70 dark:border-rose-900/40 flex items-start gap-3"
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
                      className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200/70 dark:border-indigo-800/60 flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
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
