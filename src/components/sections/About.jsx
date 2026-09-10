import React, { useState } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { MotionReveal } from '../common/MotionReveal';
import { aboutData } from '../../data/about';
import { CheckCircle2, XCircle, Clock, Target, Shuffle, Cpu, Sparkles, Activity, Maximize2, Minus, X, ZoomIn } from 'lucide-react';

export function About() {
  const [activeTab, setActiveTab] = useState('after');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isLightboxMinimized, setIsLightboxMinimized] = useState(false);

  const statIcons = [Clock, Target, Shuffle];

  return (
    <section id="about" className="pt-6 pb-14 md:pt-8 md:pb-18 bg-orange-500/[0.015] dark:bg-zinc-950/40 relative backdrop-blur-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MotionReveal animation="fade-up">
          <SectionHeader
            eyebrow="The NOVA Philosophy"
            eyebrowVariant="orange"
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
                      className="group bg-white/90 dark:bg-zinc-900/40 p-5 rounded-2xl border border-slate-200/80 dark:border-white/10 text-center shadow-sm dark:shadow-md hover:border-[#FF5500]/50 hover:shadow-lg transition-all duration-300 h-full flex flex-col justify-between backdrop-blur-xl"
                    >
                      <div className="w-10 h-10 mx-auto rounded-xl bg-orange-500/10 dark:bg-zinc-950 border border-orange-500/30 flex items-center justify-center text-[#FF5500] mb-3 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white font-mono">
                        <span className="text-orange-gradient">{stat.value}</span>
                      </div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 mt-1">
                        {stat.label}
                      </div>
                    </div>
                  </MotionReveal>
                );
              })}
            </div>

            {/* Interactive Comparison Card */}
            <MotionReveal animation="zoom-in" delay={120} className="flex-1">
              <div className="bg-white/95 dark:bg-zinc-900/40 rounded-[2.25rem] border border-slate-200/90 dark:border-white/10 p-6 sm:p-8 shadow-xl backdrop-blur-xl h-full flex flex-col justify-between ring-1 ring-inset ring-white/5">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200/80 dark:border-white/10">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                        The Workflow Transformation
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                        Legacy task tracking vs. NOVA autonomous intelligence.
                      </p>
                    </div>

                    {/* Toggle Pills */}
                    <div className="inline-flex p-1 bg-slate-100 dark:bg-zinc-950 rounded-full border border-slate-200 dark:border-white/10 self-start sm:self-auto">
                      <button
                        onClick={() => setActiveTab('before')}
                        className={`px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                          activeTab === 'before'
                            ? 'bg-rose-500 text-white shadow-xs'
                            : 'text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        Legacy Chaos
                      </button>
                      <button
                        onClick={() => setActiveTab('after')}
                        className={`px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                          activeTab === 'after'
                            ? 'bg-[#FF5500] text-black font-extrabold shadow-xs'
                            : 'text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
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
                            className="p-3.5 rounded-xl bg-orange-50/80 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/30 flex items-start gap-3"
                          >
                            <CheckCircle2 className="w-4 h-4 text-[#FF5500] shrink-0 mt-0.5" />
                            <span className="text-xs font-medium text-slate-800 dark:text-slate-100">
                              {point}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-zinc-400">
                  <span>STATE: {activeTab === 'after' ? 'CONTINUOUS DELIVERY' : 'BATCH QUEUE'}</span>
                  <span className="font-bold text-[#FF5500]">MTTR: {activeTab === 'after' ? '7.8m' : '4.2d'}</span>
                </div>
              </div>
            </MotionReveal>
          </div>

          {/* Right Column: Unique 3D Cybernetic Architecture Visual Showcase */}
          <div className="lg:col-span-6 flex flex-col">
            <MotionReveal animation="fade-up" delay={150} className="h-full">
              <div className="group relative rounded-[2.25rem] overflow-hidden bg-zinc-950 text-white border border-white/10 hover:border-[#FF5500]/50 shadow-2xl flex flex-col justify-between h-full ring-1 ring-inset ring-white/5 transition-all duration-500">
                {/* Ambient Orange Glow behind console */}
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-[#FF5500]/15 blur-3xl pointer-events-none" />

                {/* Visual Header Console Bar */}
                <div className="relative z-10 px-5 py-3.5 border-b border-white/10 bg-zinc-950/90 backdrop-blur-md flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/90" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/90" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/90" />
                    <span className="ml-2 text-[11px] font-mono font-bold tracking-wider text-zinc-300 uppercase">
                      AST // INTELLIGENCE MESH ARCHITECTURE
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono text-orange-400 font-bold">
                      <Activity className="w-3 h-3 animate-pulse" />
                      <span>60 FPS REAL-TIME</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsLightboxOpen(true)}
                      aria-label="Inspect uncompressed architecture diagram"
                      title="Inspect Architecture Diagram"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 hover:bg-[#FF5500]/20 border border-white/15 hover:border-[#FF5500]/50 text-slate-200 hover:text-white text-[10px] font-mono font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
                    >
                      <Maximize2 className="w-3 h-3 text-[#FF5500]" />
                      <span>Inspect</span>
                    </button>
                  </div>
                </div>

                {/* Main 3D Cybernetic Architecture Image Frame */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setIsLightboxOpen(true)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setIsLightboxOpen(true);
                    }
                  }}
                  className="relative overflow-hidden flex-1 min-h-[280px] sm:min-h-[340px] bg-zinc-950 flex items-center justify-center cursor-zoom-in group/img select-none"
                  title="Click to inspect AST diagram in full resolution"
                >
                  <img
                    src="/images/nova_sections/about_mesh.jpg"
                    alt="NOVA 3D Cybernetic Autonomous Intelligence Mesh Architecture"
                    className="w-full h-full object-cover object-center group-hover/img:scale-103 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  {/* Subtle Vignette Ring */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none" />

                  {/* Hover Quick Zoom Cue */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-[#FF5500]/60 text-white text-xs font-mono shadow-2xl backdrop-blur-md">
                      <ZoomIn className="w-3.5 h-3.5 text-[#FF5500]" />
                      <span>Click to inspect AST diagram</span>
                    </div>
                  </div>
                </div>

                {/* Clean Telemetry Strip Below Image */}
                <div className="relative z-10 px-4 py-2.5 bg-zinc-950/95 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-zinc-300">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-3.5 h-3.5 text-[#FF5500]" />
                    <span className="font-bold text-white">CORE ENGINE: ACTIVE</span>
                  </div>
                  <div className="flex items-center gap-1 text-orange-400">
                    <Sparkles className="w-3 h-3" />
                    <span>AST RESOLVER: ZERO DELAY</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-emerald-400 font-bold text-[10px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>SYNCHRONIZED</span>
                  </div>
                </div>

                {/* Bottom Architectural Specification Matrix */}
                <div className="p-4 sm:p-5 bg-zinc-950/80 border-t border-white/10 grid grid-cols-3 gap-3 text-center">
                  <div className="p-2.5 rounded-xl bg-zinc-900/80 border border-white/10">
                    <div className="text-xs sm:text-sm font-black text-[#FF5500] font-mono">4,820</div>
                    <div className="text-[10px] font-mono text-zinc-400 uppercase mt-0.5">AST Nodes/s</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-zinc-900/80 border border-white/10">
                    <div className="text-xs sm:text-sm font-black text-white font-mono">12ms</div>
                    <div className="text-[10px] font-mono text-zinc-400 uppercase mt-0.5">P99 Latency</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-zinc-900/80 border border-white/10">
                    <div className="text-xs sm:text-sm font-black text-emerald-400 font-mono">100%</div>
                    <div className="text-[10px] font-mono text-zinc-400 uppercase mt-0.5">Zero-Trust</div>
                  </div>
                </div>
              </div>
            </MotionReveal>
          </div>
        </div>
      </div>

      {/* Lightbox Minimized Dock Capsule */}
      {isLightboxMinimized && (
        <div className="fixed bottom-6 left-4 sm:left-6 z-50 animate-fade-in pointer-events-auto">
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/95 dark:bg-zinc-900/95 border border-[#FF5500]/50 shadow-2xl backdrop-blur-xl text-slate-900 dark:text-white">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5500] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF5500]" />
            </span>
            <span className="text-xs font-mono font-bold">
              AST Architecture Diagram
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => {
                  setIsLightboxMinimized(false);
                  setIsLightboxOpen(true);
                }}
                className="p-1.5 rounded-lg bg-orange-500/15 text-orange-500 hover:bg-[#FF5500] hover:text-black transition-all cursor-pointer"
                title="Restore diagram"
                aria-label="Restore diagram"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setIsLightboxMinimized(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-white/10 transition-all cursor-pointer"
                title="Close"
                aria-label="Close"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Full Inspection Modal */}
      {isLightboxOpen && !isLightboxMinimized && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 animate-fade-in pointer-events-auto"
          role="dialog"
          aria-modal="true"
          aria-label="AST Architecture Inspection Modal"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity cursor-pointer"
            onClick={() => setIsLightboxOpen(false)}
            aria-hidden="true"
          />

          {/* Modal Shell */}
          <div className="relative w-full max-w-5xl bg-zinc-950 rounded-3xl shadow-2xl border border-[#FF5500]/40 overflow-hidden z-10 flex flex-col max-h-[92vh] animate-modal-pop text-white">
            {/* Header with Traffic Lights, Title, Minimize and Close */}
            <div className="px-5 py-3.5 border-b border-white/10 bg-zinc-950 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="ml-2 text-xs font-mono font-bold tracking-wider text-zinc-300 uppercase">
                  NOVA AST INTELLIGENCE MESH // ULTRA-HD SPECIFICATION
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Minimize Button */}
                <button
                  type="button"
                  onClick={() => {
                    setIsLightboxOpen(false);
                    setIsLightboxMinimized(true);
                  }}
                  aria-label="Minimize architecture diagram"
                  title="Minimize Diagram"
                  className="p-1.5 rounded-full text-slate-400 hover:text-orange-400 hover:bg-white/10 transition-all cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(false)}
                  aria-label="Close architecture diagram"
                  title="Close Diagram"
                  className="p-1.5 rounded-full text-slate-400 hover:text-rose-400 hover:bg-white/10 transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content Area: Image */}
            <div className="relative overflow-auto p-4 bg-black flex items-center justify-center">
              <div className="relative max-w-4xl w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src="/images/nova_sections/about_mesh.jpg"
                  alt="NOVA AST Intelligence Mesh Full Diagram"
                  className="w-full h-auto object-contain select-none"
                />
              </div>
            </div>

            {/* Footer Bar */}
            <div className="px-5 py-3 bg-zinc-950 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-4">
                <span className="text-emerald-400 font-bold">&bull; 4,820 Nodes/s</span>
                <span className="text-orange-400">&bull; Sub-12ms Latency</span>
                <span className="text-white">&bull; Zero Context Loss</span>
              </div>
              <span className="text-[11px] text-zinc-500">ESC or Click Outside to Exit</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
