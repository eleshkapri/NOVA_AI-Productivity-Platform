import React from 'react';
import { trustedCompanies } from '../../data/logos';
import { ShieldCheck, Zap, Rocket } from 'lucide-react';
import { smoothScrollService } from '../../services/SmoothScrollService';


export function TrustedBy() {
  const marqueeItems = [...trustedCompanies, ...trustedCompanies];

  return (
    <section id="trusted-by" className="py-8 md:py-12 border-y border-slate-200/50 dark:border-white/5 bg-white/40 dark:bg-[#05060A]/80 backdrop-blur-md transition-colors overflow-hidden relative">
      {/* Ambient Cyber-Orange Glow behind the conduit */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FF5500]/40 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#FF5500]/30 to-transparent" />

      {/* Edge Dissolve Gradient Masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-[#F8FAFC] dark:from-[#05060A] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-[#F8FAFC] dark:from-[#05060A] to-transparent z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 dark:bg-orange-500/10 border border-orange-300 dark:border-orange-500/20 text-orange-950 dark:text-orange-400 text-[11px] font-mono font-extrabold tracking-[0.2em] uppercase mb-4 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500] animate-pulse" />
          <span>CONDUIT OF TRUST // ENTERPRISE VALIDATION</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Powering Autonomous Sprints at{' '}
          <span className="text-orange-gradient italic">High-Velocity Scale</span>
        </h3>




        {/* 3 Telemetry Counters */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 py-2.5 px-4 rounded-2xl bg-white dark:bg-zinc-950/60 border border-slate-300 dark:border-white/5 backdrop-blur-md shadow-xs">
            <ShieldCheck className="w-4 h-4 text-[#FF5500] shrink-0" />
            <div className="text-left">
              <div className="text-sm font-black font-mono text-slate-900 dark:text-white">99.99%</div>
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Enterprise SLA</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 py-2.5 px-4 rounded-2xl bg-white dark:bg-zinc-950/60 border border-slate-300 dark:border-white/5 backdrop-blur-md shadow-xs">
            <Zap className="w-4 h-4 text-[#FF5500] shrink-0" />
            <div className="text-left">
              <div className="text-sm font-black font-mono text-slate-900 dark:text-white">4.2x</div>
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Faster Sprint Cycles</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 py-2.5 px-4 rounded-2xl bg-white dark:bg-zinc-950/60 border border-slate-300 dark:border-white/5 backdrop-blur-md shadow-xs">
            <Rocket className="w-4 h-4 text-[#FF5500] shrink-0" />
            <div className="text-left">
              <div className="text-sm font-black font-mono text-slate-900 dark:text-white">14,000+</div>
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Sprints Deployed</div>
            </div>
          </div>
        </div>
      </div>

      {/* Infinite Smooth Motion Marquee Track */}
      <div className="flex overflow-hidden relative">
        <div className="animate-marquee flex items-center gap-6 sm:gap-8 py-2">
          {marqueeItems.map((company, index) => (
            <div
              key={`${company.name}-${index}`}
              onClick={() => {
                smoothScrollService.scrollTo('#testimonials', { offset: -70, duration: 1.5 });
              }}
              title={`Read how ${company.name} scales velocity with NOVA`}
              className="flex items-center gap-3.5 px-6 py-4 rounded-2xl border border-slate-200/70 dark:border-white/10 bg-white/90 dark:bg-zinc-900/50 hover:border-[#FF5500]/50 hover:bg-zinc-900/80 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#FF5500]/15 transition-all duration-300 cursor-pointer group shrink-0 backdrop-blur-xl"
            >
              <span className="text-2xl font-bold text-slate-500 dark:text-zinc-400 group-hover:text-[#FF5500] group-hover:scale-115 transition-all duration-300">
                {company.symbol}
              </span>
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-wider uppercase text-slate-800 dark:text-slate-200 group-hover:text-slate-950 dark:group-hover:text-white transition-colors">
                  {company.name}
                </span>
                <span className="text-[9px] uppercase tracking-widest text-slate-400 dark:text-zinc-500 group-hover:text-orange-400 transition-colors font-mono">
                  {company.badge}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
