import React from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { Badge } from '../common/Badge';
import { MotionReveal } from '../common/MotionReveal';
import { TiltCard } from '../common/TiltCard';
import { featuresData } from '../../data/features';
import { FeatureModel } from '../../models/FeatureModel';
import {
  Bot,
  Code2,
  TrendingUp,
  GitPullRequest,
  Cpu,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';

const iconMap = {
  Bot,
  Code2,
  TrendingUp,
  GitPullRequest,
  Cpu,
  ShieldCheck,
};

const featureModels = featuresData.map((data, index) => new FeatureModel({ ...data, index }));

export function Features({ onOpenDemo }) {
  return (
    <section id="features" className="py-16 md:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MotionReveal animation="fade-up">
          <SectionHeader
            eyebrow="Autonomous Intelligence"
            eyebrowVariant="orange"
            title="Master Every Dimension of"
            titleHighlight="Modern Engineering"
            description="Eradicate tedious backlog grooming, chaotic sync meetings, and stale pull requests with our autonomous AI intelligence layer."
          />
        </MotionReveal>

        {/* Floria Bento Grid (6 Cards, First Card Flagship with 3D Crystal AST Visual) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 relative z-10">
          {featureModels.map((feature, i) => {
            const Icon = iconMap[feature.iconName] || Bot;
            const targetTab = feature.getTargetTab();

            return (
              <MotionReveal
                key={feature.id}
                delay={i * 70}
                animation="fade-up"
                className="h-full col-span-1"
              >
                <TiltCard
                  onClick={() => onOpenDemo && onOpenDemo(targetTab)}
                  title="Click to launch interactive walkthrough"
                  maxTilt={6}
                  scale={1.015}
                  glare={false}
                  className="group relative bg-white dark:bg-zinc-900/40 rounded-[2rem] sm:rounded-[2.25rem] p-6 sm:p-7 border border-slate-200 dark:border-white/10 hover:border-[#FF5500]/50 shadow-md dark:shadow-2xl transition-all duration-500 flex flex-col justify-between backdrop-blur-xl cursor-pointer h-full ring-1 ring-inset ring-white/5 overflow-hidden"
                >
                  {/* Subtle Orange Hover Bloom in the Corner */}
                  <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 rounded-full bg-[#FF5500]/10 blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div>
                    {/* Top Bar: Icon + Monospace ID on left, Capsule Badge on right */}
                    <div className="flex items-center justify-between gap-2.5 mb-6">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-orange-500/10 dark:bg-zinc-950/80 border border-orange-500/25 dark:border-orange-500/30 flex items-center justify-center text-orange-600 dark:text-[#FF7700] group-hover:scale-110 group-hover:bg-[#FF5500] group-hover:text-black group-hover:shadow-lg group-hover:shadow-[#FF5500]/30 transition-all duration-300 shrink-0">
                          <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-zinc-400 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-zinc-800/80 border border-slate-200 dark:border-white/5 whitespace-nowrap shrink-0">
                          // MOD-0{i + 1}
                        </span>
                      </div>
                      <Badge variant="orange" className="whitespace-nowrap shrink-0 text-[10px] sm:text-[11px] px-2.5 sm:px-3 py-1">
                        {feature.badge}
                      </Badge>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2.5 group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-zinc-300 leading-relaxed font-normal">
                      {feature.description}
                    </p>
                  </div>

                  {/* Bottom Metric Pill & Quick Action */}
                  <div className="mt-8 pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between gap-2 text-xs">
                    <span className="font-bold text-orange-700 dark:text-orange-400 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-50/80 dark:bg-white/5 border border-orange-200 dark:border-white/10 group-hover:bg-[#FF5500] group-hover:text-black group-hover:border-[#FF5500] transition-all duration-300 shadow-2xs whitespace-nowrap shrink-0 text-[11px] sm:text-xs">
                      <span>Explore Sandbox</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                    <span className="font-mono text-[10px] sm:text-[11px] font-bold text-orange-950 dark:text-orange-300 bg-orange-50 dark:bg-orange-500/15 px-2.5 sm:px-3 py-1 rounded-full border border-orange-300 dark:border-orange-500/35 group-hover:bg-[#FF5500] group-hover:text-black group-hover:border-[#FF5500] transition-all duration-300 shadow-xs whitespace-nowrap shrink-0">
                      {feature.metric}
                    </span>
                  </div>
                </TiltCard>
              </MotionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
