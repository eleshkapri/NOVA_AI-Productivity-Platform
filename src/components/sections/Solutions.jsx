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
    <section id="solutions" className="py-24 md:py-36 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Bespoke Architecture"
          title="Engineered for Every Discipline"
          titleHighlight="Across Your Technical Stack"
          description="Whether you are an individual developer, a sprint leader, or a Chief Technology Officer, NOVA molds to your exact operational parameters."
        />

        {/* Persona Selector Tabs with Magnetic Hover */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
          {solutionsData.map((sol) => {
            const isActive = sol.id === activePersonaId;
            return (
              <button
                key={sol.id}
                onClick={() => setActivePersonaId(sol.id)}
                className={`px-6 py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#D8B452] to-[#B88A23] text-black shadow-lg shadow-[#D8B452]/25 scale-102'
                    : 'bg-white/80 dark:bg-[#0b0c33]/70 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:border-[#a1741a] dark:hover:border-[#D8B452] hover:text-black dark:hover:text-white shadow-xs hover:shadow-md'
                }`}
              >
                {sol.title}
              </button>
            );
          })}
        </div>

        {/* Active Persona Showcase Card with Glow Hover */}
        <div className="max-w-4xl mx-auto bg-white/95 dark:bg-[#0b0c33]/70 rounded-3xl p-8 sm:p-12 border border-slate-200/90 dark:border-[#D8B452]/30 hover:border-[#a1741a] dark:hover:border-[#D8B452] shadow-xl dark:shadow-2xl hover:shadow-2xl hover:shadow-[#D8B452]/15 relative overflow-hidden backdrop-blur-2xl transition-all duration-300 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left Column: Details */}
            <div className="md:col-span-7 space-y-5">
              <Badge variant="gold">{currentSolution.badge}</Badge>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
                {currentSolution.subtitle}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
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
            <div className="md:col-span-5 bg-slate-50 dark:bg-[#050614] p-6 sm:p-7 rounded-2xl border border-slate-200 dark:border-white/10 space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#a1741a] dark:text-[#D8B452] mb-3">
                Core Capabilities
              </div>

              {currentSolution.highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-2 rounded-xl hover:bg-amber-500/10 hover:translate-x-1 transition-all duration-200 cursor-default"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#a1741a] dark:text-[#D8B452] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200">
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
