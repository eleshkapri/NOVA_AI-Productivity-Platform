import React from 'react';
import { trustedCompanies } from '../../data/logos';

export function TrustedBy() {
  const marqueeItems = [...trustedCompanies, ...trustedCompanies];

  return (
    <section className="py-14 border-y border-slate-200/80 dark:border-white/10 bg-amber-50/40 dark:bg-[#07081e]/60 transition-colors overflow-hidden relative">
      {/* Left and Right Fade Masks for Smooth Edge Dissolve */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-32 bg-gradient-to-r from-[#fcfbfa] dark:from-[#050614] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-32 bg-gradient-to-l from-[#fcfbfa] dark:from-[#050614] to-transparent z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#a1741a] dark:text-[#D8B452]">
          Trusted by high-velocity engineering leaders worldwide
        </p>
      </div>

      {/* Infinite Smooth Motion Marquee Track */}
      <div className="flex overflow-hidden">
        <div className="animate-marquee flex items-center gap-6 sm:gap-8">
          {marqueeItems.map((company, index) => (
            <div
              key={`${company.name}-${index}`}
              onClick={() => {
                const target = document.getElementById('testimonials');
                target?.scrollIntoView({ behavior: 'smooth' });
              }}
              title={`Read how ${company.name} scales velocity with NOVA`}
              className="flex items-center gap-3 px-6 py-3.5 rounded-2xl border border-slate-200/60 dark:border-white/10 bg-white/90 dark:bg-[#0b0c33]/80 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#D8B452]/15 hover:border-[#a1741a]/60 dark:hover:border-[#D8B452]/60 transition-all duration-300 cursor-pointer group shrink-0"
            >
              <span className="text-2xl font-bold text-slate-500 dark:text-slate-400 group-hover:text-[#a1741a] dark:group-hover:text-[#D8B452] group-hover:scale-115 transition-all duration-300">
                {company.symbol}
              </span>
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-wider uppercase text-slate-800 dark:text-slate-200 group-hover:text-slate-950 dark:group-hover:text-white transition-colors">
                  {company.name}
                </span>
                <span className="text-[9px] uppercase tracking-widest text-slate-400 dark:text-slate-500 group-hover:text-[#a1741a] dark:group-hover:text-[#D8B452] transition-colors">
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
