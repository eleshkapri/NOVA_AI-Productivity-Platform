import React from 'react';
import { trustedCompanies } from '../../data/logos';

export function TrustedBy() {
  return (
    <section className="py-12 border-y border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-8">
          Trusted by high-velocity engineering teams worldwide
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 items-center justify-items-center">
          {trustedCompanies.map((company) => (
            <div
              key={company.name}
              className="flex items-center gap-2 group opacity-60 hover:opacity-100 transition-opacity duration-200 cursor-default"
            >
              <span className="text-xl font-bold text-slate-400 group-hover:text-indigo-500 transition-colors">
                {company.symbol}
              </span>
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-tight text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                  {company.name}
                </span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500">
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
