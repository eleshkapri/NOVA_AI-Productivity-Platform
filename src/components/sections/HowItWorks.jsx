import React from 'react';
import { Badge } from '../common/Badge';
import { MotionReveal } from '../common/MotionReveal';
import { howItWorksSteps } from '../../data/howItWorks';
import { Link2, Cpu, Sparkles, Rocket, CheckCircle2 } from 'lucide-react';

const iconMap = {
  Link2,
  Cpu,
  Sparkles,
  Rocket,
};

export function HowItWorks() {
  const stepMetrics = [
    'OAuth 2.0 // Latency 8ms',
    'AST Tree // 148 nodes/s',
    'Zero-Trust // CI Verified',
    'Continuous // 4.2x Burndown',
  ];

  return (
    <section id="how-it-works" className="py-12 md:py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Floria 2-Column Sticky Timeline Structure */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Sticky Column */}
          <div className="lg:col-span-5 lg:sticky lg:top-36 self-start space-y-6">
            <MotionReveal animation="fade-up">
              <Badge variant="orange" dot className="mb-4">
                The 4-Step Journey
              </Badge>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                From Initial Integration to{' '}
                <span className="text-orange-gradient italic">
                  Autonomous Mastery
                </span>
              </h2>

              <p className="mt-4 text-base text-slate-600 dark:text-zinc-400 leading-relaxed font-normal">
                Seamlessly onboard your entire engineering organization in under three minutes without disrupting active sprints or altering existing git branches.
              </p>

              {/* Workflow Pipeline Visual Showcase Card (workflow_cadence.jpg) */}
              <div className="mt-8 relative rounded-[2rem] overflow-hidden bg-zinc-950 border border-white/10 hover:border-[#FF5500]/40 transition-colors shadow-2xl group">
                <div className="aspect-16/9 overflow-hidden">
                  <img
                    src="/images/nova_sections/workflow_cadence.jpg"
                    alt="NOVA 4-Step Linear Delivery Pipeline Cadence"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent pointer-events-none" />
                </div>

                <div className="p-4 bg-zinc-950/90 border-t border-white/10 flex items-center justify-between text-[11px] font-mono">
                  <span className="flex items-center gap-1.5 text-orange-400 font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>SYNCHRONIZED PIPELINE</span>
                  </span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>ZERO-FRICTION HANDOFF</span>
                  </span>
                </div>
              </div>
            </MotionReveal>
          </div>

          {/* Right Column: Vertical Timeline Conduit */}
          <div className="lg:col-span-7">
            <div className="relative pl-6 sm:pl-10 border-l border-slate-200 dark:border-white/10 space-y-8 sm:space-y-10">
              {howItWorksSteps.map((stepItem, index) => {
                const Icon = iconMap[stepItem.iconName] || Sparkles;

                return (
                  <MotionReveal key={stepItem.step} delay={index * 90} animation="fade-up">
                    <div className="relative group">
                      {/* Numbered Node on Timeline Line */}
                      <div className="absolute -left-[31px] sm:-left-[47px] top-6 w-8 h-8 rounded-full bg-zinc-950 border-2 border-[#FF5500] text-orange-400 flex items-center justify-center font-mono text-xs font-black shadow-lg shadow-[#FF5500]/25 group-hover:scale-115 group-hover:bg-[#FF5500] group-hover:text-black transition-all duration-300">
                        0{index + 1}
                      </div>

                      {/* Step Glass Bento Card */}
                      <div className="bg-white/90 dark:bg-zinc-900/40 rounded-[2rem] p-7 sm:p-8 border border-slate-200/80 dark:border-white/10 hover:border-[#FF5500]/50 shadow-md dark:shadow-xl backdrop-blur-xl transition-all duration-500 ring-1 ring-inset ring-white/5">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-2xl bg-orange-500/10 dark:bg-zinc-950 border border-orange-500/25 flex items-center justify-center text-orange-500 group-hover:scale-110 group-hover:bg-[#FF5500] group-hover:text-black transition-all duration-300">
                              <Icon className="w-5 h-5" />
                            </div>
                            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-orange-500 dark:text-orange-400">
                              {stepItem.tag}
                            </span>
                          </div>
                          <span className="font-mono text-xs font-bold text-zinc-500 uppercase">
                            PHASE 0{index + 1} // 04
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors tracking-tight">
                          {stepItem.title}
                        </h3>

                        <p className="text-sm text-slate-600 dark:text-zinc-300 leading-relaxed font-normal">
                          {stepItem.description}
                        </p>

                        <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-xs font-mono">
                          <span className="text-zinc-500 text-[11px]">BENCHMARK:</span>
                          <span className="font-bold text-orange-500 dark:text-orange-400 bg-orange-500/10 px-2.5 py-0.5 rounded-full border border-orange-500/20 text-[11px]">
                            {stepMetrics[index]}
                          </span>
                        </div>
                      </div>
                    </div>
                  </MotionReveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
