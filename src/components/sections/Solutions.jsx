import React, { useState } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { MotionReveal } from '../common/MotionReveal';
import { solutionsData } from '../../data/solutions';
import { CheckCircle2, ArrowRight, Radio, Activity, Sparkles, Terminal } from 'lucide-react';

export function Solutions({ onOpenDemo }) {
  const [activePersonaId, setActivePersonaId] = useState('engineering');

  const currentSolution =
    solutionsData.find((s) => s.id === activePersonaId) || solutionsData[0];

  return (
    <section id="solutions" className="py-14 md:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MotionReveal animation="fade-up">
          <SectionHeader
            eyebrow="Bespoke Architecture"
            title="Engineered for Every Discipline"
            titleHighlight="Across Your Technical Stack"
            description="Whether you are an individual developer, a sprint leader, or a Chief Technology Officer, NOVA molds to your exact operational parameters."
          />
        </MotionReveal>

        {/* Persona Selector Tabs */}
        <MotionReveal animation="fade-up" delay={80}>
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-10 sm:mb-14">
            {solutionsData.map((sol) => {
              const isActive = sol.id === activePersonaId;
              return (
                <button
                  key={sol.id}
                  onClick={() => setActivePersonaId(sol.id)}
                  className={`px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer active:scale-95 ${
                    isActive
                      ? 'bg-[#FF5500] text-black font-extrabold shadow-lg shadow-[#FF5500]/25 border border-[#FF6600]'
                      : 'bg-white/80 dark:bg-zinc-900/50 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-white/10 hover:border-[#FF5500]/50 hover:text-black dark:hover:text-white shadow-xs'
                  }`}
                >
                  {sol.title}
                </button>
              );
            })}
          </div>
        </MotionReveal>

        {/* 12-Column Persona Showcase: Left Details & Checklist | Right 3D Holographic Visual Console */}
        <MotionReveal animation="zoom-in" delay={120}>
          <div className="bg-white/95 dark:bg-zinc-900/40 rounded-[2.5rem] p-6 sm:p-10 lg:p-12 border border-slate-200/90 dark:border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-2xl ring-1 ring-inset ring-white/5">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              {/* Left Column (5 cols): Details, Checklist, CTA */}
              <div className="lg:col-span-5 space-y-5">
                <Badge variant="orange">{currentSolution.badge}</Badge>
                
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
                  {currentSolution.subtitle}
                </h3>
                
                <p className="text-sm text-slate-600 dark:text-zinc-300 leading-relaxed font-normal">
                  {currentSolution.description}
                </p>

                {/* Core Capabilities Box */}
                <div className="bg-slate-50 dark:bg-zinc-950/80 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-white/10 space-y-2">
                  <div className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#FF5500] mb-2 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>Operational Capabilities</span>
                  </div>

                  {currentSolution.highlights.map((highlight, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-2.5 p-1.5 rounded-lg hover:bg-orange-500/10 transition-colors cursor-default"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#FF5500] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200">
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Persona CTA Button */}
                <div className="pt-2">
                  <Button
                    variant="orange"
                    size="md"
                    icon={ArrowRight}
                    iconPosition="right"
                    onClick={() => {
                      if (onOpenDemo) {
                        if (activePersonaId === 'enterprise') {
                          onOpenDemo('contact', { plan: 'enterprise' });
                        } else if (activePersonaId === 'pm') {
                          onOpenDemo('backlog');
                        } else {
                          onOpenDemo('trial', {
                            plan: activePersonaId === 'freelance' ? 'pro' : 'developer',
                          });
                        }
                      } else {
                        const pricing = document.getElementById('pricing');
                        pricing?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    {currentSolution.cta}
                  </Button>
                </div>
              </div>

              {/* Right Column (7 cols): Unique 3D Holographic Developer Console Image Frame */}
              <div className="lg:col-span-7">
                <div className="group relative rounded-[2rem] overflow-hidden bg-black border border-white/10 hover:border-[#FF5500]/40 shadow-2xl transition-colors">
                  {/* Top Hologram HUD Header */}
                  <div className="px-4 py-2.5 bg-zinc-950/90 border-b border-white/10 flex items-center justify-between text-[11px] font-mono">
                    <div className="flex items-center gap-2">
                      <Radio className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
                      <span className="font-bold text-slate-200 uppercase tracking-wider">
                        MISSION CONTROL // SPRINT 48
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-[10px]">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      <span>TELEMETRY ONLINE</span>
                    </div>
                  </div>

                  {/* 3D Hologram Image */}
                  <div className="relative overflow-hidden aspect-16/9">
                    <img
                      src="/images/nova_sprint_hologram.jpg"
                      alt="NOVA 3D Holographic Engineering Radar and Agile Burndown Dashboard"
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    {/* Subtle Scanline Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                    {/* Interactive Telemetry Pills on Image */}
                    <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-xl bg-black/75 border border-white/15 backdrop-blur-md text-[11px] font-mono text-white">
                      <div className="flex items-center gap-1.5 text-orange-400">
                        <Activity className="w-3.5 h-3.5" />
                        <span className="font-bold">VELOCITY: 88 PTS</span>
                      </div>
                      <div className="flex items-center gap-1 text-zinc-300">
                        <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                        <span>BURNDOWN: OPTIMAL</span>
                      </div>
                      <div className="text-emerald-400 font-bold">BUILD: PASS</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
