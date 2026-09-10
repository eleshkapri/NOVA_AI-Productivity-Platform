import React, { useState } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { MotionReveal } from '../common/MotionReveal';
import { aboutData } from '../../data/about';
import { CheckCircle2, XCircle, Clock, Target, Shuffle, Cpu, Sparkles, Activity } from 'lucide-react';

export function About() {
  const [activeTab, setActiveTab] = useState('after');

  const statIcons = [Clock, Target, Shuffle];

  return (
    <section id="about" className="py-14 md:py-20 bg-amber-50/15 dark:bg-[#07081e]/30 relative backdrop-blur-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MotionReveal animation="fade-up">
          <SectionHeader
            eyebrow="The NOVA Philosophy"
            title="Crafted to Eradicate Friction,"
            titleHighlight="Restoring Pure Engineering Velocity"
            description={aboutData.description}
          />
        </MotionReveal>

        {/* 2-Column Responsive Layout: Left (Metrics + Transformation) | Right (Cybernetic Visual Architecture) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Stats & Transformation Widget */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            {/* 3 Metric Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {aboutData.stats.map((stat, idx) => {
                const Icon = statIcons[idx];
                return (
                  <MotionReveal key={stat.label} delay={idx * 80} animation="fade-up">
                    <div
                      className="group bg-white/90 dark:bg-[#0b0c33]/60 p-5 rounded-2xl border border-slate-200/80 dark:border-white/10 text-center shadow-sm dark:shadow-md hover:border-[#D8B452] hover:shadow-lg transition-all duration-300 h-full flex flex-col justify-between"
                    >
                      <div className="w-10 h-10 mx-auto rounded-xl bg-amber-50 dark:bg-[#050614] border border-[#D8B452]/30 flex items-center justify-center text-[#D8B452] mb-3 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                        <span className="text-gold-gradient">{stat.value}</span>
                      </div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1">
                        {stat.label}
                      </div>
                    </div>
                  </MotionReveal>
                );
              })}
            </div>

            {/* Interactive Comparison Card */}
            <MotionReveal animation="zoom-in" delay={120} className="flex-1">
              <div className="bg-white/95 dark:bg-[#0b0c33]/70 rounded-3xl border border-slate-200/90 dark:border-[#D8B452]/30 p-6 sm:p-8 shadow-xl backdrop-blur-xl h-full flex flex-col justify-between">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200/80 dark:border-white/10">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                        The Workflow Transformation
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Legacy task tracking vs. NOVA autonomous intelligence.
                      </p>
                    </div>

                    {/* Toggle Pills */}
                    <div className="inline-flex p-1 bg-slate-100 dark:bg-[#050614] rounded-full border border-slate-200 dark:border-white/10 self-start sm:self-auto">
                      <button
                        onClick={() => setActiveTab('before')}
                        className={`px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                          activeTab === 'before'
                            ? 'bg-rose-500 text-white shadow-xs'
                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        Legacy Chaos
                      </button>
                      <button
                        onClick={() => setActiveTab('after')}
                        className={`px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                          activeTab === 'after'
                            ? 'bg-gradient-to-r from-[#D8B452] to-[#C49A32] text-black font-extrabold shadow-xs'
                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        ✨ With NOVA
                      </button>
                    </div>
                  </div>

                  {/* Tab Content */}
                  <div className="pt-5 space-y-3">
                    {activeTab === 'before' ? (
                      <div className="space-y-3 animate-fade-in">
                        {aboutData.comparison.before.map((point, index) => (
                          <div
                            key={index}
                            className="p-3.5 rounded-xl bg-rose-50/80 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 flex items-start gap-3"
                          >
                            <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                            <span className="text-xs font-medium text-slate-800 dark:text-slate-200">
                              {point}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-3 animate-fade-in">
                        {aboutData.comparison.after.map((point, index) => (
                          <div
                            key={index}
                            className="p-3.5 rounded-xl bg-amber-50/80 dark:bg-[#D8B452]/10 border border-amber-200 dark:border-[#D8B452]/30 flex items-start gap-3"
                          >
                            <CheckCircle2 className="w-4 h-4 text-[#D8B452] shrink-0 mt-0.5" />
                            <span className="text-xs font-medium text-slate-800 dark:text-slate-100">
                              {point}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  <span>STATE: {activeTab === 'after' ? 'CONTINUOUS DELIVERY' : 'BATCH QUEUE'}</span>
                  <span className="font-bold text-[#D8B452]">MTTR: {activeTab === 'after' ? '7.8m' : '4.2d'}</span>
                </div>
              </div>
            </MotionReveal>
          </div>

          {/* Right Column: Unique 3D Cybernetic Architecture Visual Showcase */}
          <div className="lg:col-span-6 flex flex-col">
            <MotionReveal animation="fade-up" delay={150} className="h-full">
              <div className="group relative rounded-3xl overflow-hidden bg-white/95 dark:bg-[#07081e] border border-slate-200/90 dark:border-[#8E6FFF]/40 shadow-xl dark:shadow-2xl flex flex-col justify-between h-full orchid-card">
                {/* Visual Header Console Bar */}
                <div className="px-5 py-3.5 border-b border-slate-200 dark:border-white/10 bg-slate-50/80 dark:bg-[#050614]/80 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 text-[11px] font-mono font-bold tracking-wider text-slate-600 dark:text-slate-400 uppercase">
                      AST // INTELLIGENCE MESH ARCHITECTURE
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-1 text-[10px] font-mono text-[#8E6FFF] dark:text-[#A78BFA] font-bold">
                    <Activity className="w-3 h-3 animate-pulse" />
                    <span>60 FPS REAL-TIME</span>
                  </div>
                </div>

                {/* Main 3D Cybernetic Architecture Image */}
                <div className="relative overflow-hidden aspect-video sm:aspect-16/10 group-hover:shadow-2xl transition-all duration-500">
                  <img
                    src="/images/nova_architecture_mesh.jpg"
                    alt="NOVA 3D Cybernetic Autonomous Intelligence Mesh Architecture"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  {/* Subtle Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07081e]/90 via-transparent to-transparent pointer-events-none" />

                  {/* Floating Live Telemetry Badge */}
                  <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 p-3 rounded-2xl bg-black/70 border border-white/15 backdrop-blur-md text-white text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-[#D8B452]" />
                      <span className="font-bold">CORE ENGINE: ACTIVE</span>
                    </div>
                    <div className="flex items-center gap-1 text-[#A78BFA]">
                      <Sparkles className="w-3 h-3" />
                      <span>AST RESOLVER: ZERO DELAY</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Architectural Specification Matrix */}
                <div className="p-5 sm:p-6 bg-slate-50/50 dark:bg-[#07081e]/90 border-t border-slate-100 dark:border-white/10 grid grid-cols-3 gap-3 text-center">
                  <div className="p-2.5 rounded-xl bg-white dark:bg-[#050614] border border-slate-200 dark:border-white/10">
                    <div className="text-xs sm:text-sm font-black text-[#D8B452]">4,820</div>
                    <div className="text-[10px] font-mono text-slate-500 uppercase mt-0.5">AST Nodes/s</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white dark:bg-[#050614] border border-slate-200 dark:border-white/10">
                    <div className="text-xs sm:text-sm font-black text-[#8E6FFF] dark:text-[#A78BFA]">12ms</div>
                    <div className="text-[10px] font-mono text-slate-500 uppercase mt-0.5">P99 Latency</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white dark:bg-[#050614] border border-slate-200 dark:border-white/10">
                    <div className="text-xs sm:text-sm font-black text-emerald-500">100%</div>
                    <div className="text-[10px] font-mono text-slate-500 uppercase mt-0.5">Zero-Trust</div>
                  </div>
                </div>
              </div>
            </MotionReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
