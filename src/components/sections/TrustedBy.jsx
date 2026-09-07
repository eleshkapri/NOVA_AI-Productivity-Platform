import React from 'react';
import { trustedCompanies } from '../../data/logos';

export function TrustedBy() {
  return (
    <section className="py-14 border-y border-white/10 bg-[#07081e]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-[11px] font-bold tracking-[0.25em] uppercase text-[#D8B452] mb-10">
          Trusted by high-velocity engineering leaders worldwide
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 items-center justify-items-center">
          {trustedCompanies.map((company) => (
            <div
              key={company.name}
              className="flex items-center gap-2.5 px-4 py-3 rounded-2xl border border-transparent hover:border-slate-200/80 dark:hover:border-white/10 hover:bg-white/80 dark:hover:bg-[#0b0c33]/80 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#D8B452]/10 transition-all duration-300 cursor-default opacity-75 hover:opacity-100 group"
            >
              <span className="text-xl font-bold text-slate-400 group-hover:text-[#a1741a] dark:group-hover:text-[#D8B452] group-hover:scale-110 transition-all duration-300">
                {company.symbol}
              </span>
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-wider uppercase text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                  {company.name}
                </span>
                <span className="text-[9px] uppercase tracking-widest text-slate-400 group-hover:text-[#a1741a] dark:group-hover:text-[#D8B452] transition-colors">
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
