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
              className="flex items-center gap-2.5 group opacity-70 hover:opacity-100 transition-all duration-300 cursor-default"
            >
              <span className="text-xl font-bold text-slate-400 group-hover:text-[#D8B452] transition-colors">
                {company.symbol}
              </span>
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-wider uppercase text-slate-300 group-hover:text-white transition-colors">
                  {company.name}
                </span>
                <span className="text-[9px] uppercase tracking-widest text-[#D8B452]/70">
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
