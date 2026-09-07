import React, { useState } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { solutionsData } from '../../data/solutions';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export function Solutions() {
  const [activePersonaId, setActivePersonaId] = useState('engineering');

  const currentSolution =
    solutionsData.find((s) => s.id === activePersonaId) || solutionsData[0];

  return (
    <section id="solutions" className="py-20 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Targeted Solutions"
          title="Tailored for Every Builder"
          titleHighlight="Across Your Organization"
          description="Whether you're an individual engineer writing code or a VP managing twenty squads, NOVA adapts to your exact workflow."
        />

        {/* Persona Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {solutionsData.map((sol) => {
            const isActive = sol.id === activePersonaId;
            return (
              <button
                key={sol.id}
                onClick={() => setActivePersonaId(sol.id)}
                className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25 scale-102'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-600 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {sol.title}
              </button>
            );
          })}
        </div>

        {/* Active Persona Showcase Card */}
        <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900/90 rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-slate-800 shadow-xl relative overflow-hidden animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left Column: Details */}
            <div className="md:col-span-7 space-y-4">
              <Badge variant="indigo">{currentSolution.badge}</Badge>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {currentSolution.subtitle}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                {currentSolution.description}
              </p>

              <div className="pt-4">
                <Button
                  variant="primary"
                  size="md"
                  icon={ArrowRight}
                  iconPosition="right"
                  onClick={() => {
                    const pricing = document.getElementById('pricing');
                    pricing?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {currentSolution.cta}
                </Button>
              </div>
            </div>

            {/* Right Column: Key Feature Highlights Checklist */}
            <div className="md:col-span-5 bg-slate-50 dark:bg-slate-950/60 p-5 sm:p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                Core Capabilities
              </div>

              {currentSolution.highlights.map((highlight, index) => (
                <div key={index} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
