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
  Sparkles,
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
    <div className="py-16 md:py-24 relative">
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
            const isFlagship = i === 0;

            return (
              <MotionReveal
                key={feature.id}
                delay={i * 70}
                animation="fade-up"
                className={`h-full ${isFlagship ? 'md:col-span-2 lg:col-span-2' : 'col-span-1'}`}
              >
                <TiltCard
                  onClick={() => onOpenDemo && onOpenDemo(targetTab)}
                  title="Click to launch interactive walkthrough"
                  maxTilt={6}
                  scale={1.015}
                  glare={false}
                  className="group relative bg-white/90 dark:bg-zinc-900/40 rounded-[2.25rem] sm:rounded-[2.5rem] p-7 sm:p-9 border border-slate-200/80 dark:border-white/10 hover:border-[#FF5500]/50 shadow-md dark:shadow-2xl transition-all duration-500 flex flex-col justify-between backdrop-blur-xl cursor-pointer h-full ring-1 ring-inset ring-white/5 overflow-hidden"
                >
                  {/* Subtle Orange Hover Bloom in the Corner */}
                  <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 rounded-full bg-[#FF5500]/10 blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div>
                    {/* Top Bar: Icon + Badge + Monospace ID */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-13 h-13 rounded-2xl bg-orange-500/10 dark:bg-zinc-950/80 border border-orange-500/25 dark:border-orange-500/30 flex items-center justify-center text-orange-600 dark:text-[#FF7700] group-hover:scale-110 group-hover:bg-[#FF5500] group-hover:text-black group-hover:shadow-lg group-hover:shadow-[#FF5500]/30 transition-all duration-300">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider hidden sm:inline">
                          // MOD-0{i + 1}
                        </span>
                        <Badge variant="orange">{feature.badge}</Badge>
                      </div>
                    </div>

                    {/* Flagship Card Visual Integration (features_bento.jpg) */}
                    {isFlagship && (
                      <div className="mb-6 relative rounded-2xl overflow-hidden aspect-21/9 bg-zinc-950 border border-white/10 group-hover:border-[#FF5500]/40 transition-colors">
                        <img
                          src="/images/nova_sections/features_bento.jpg"
                          alt="NOVA 3D Illuminated Crystal AST Architecture"
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-white">
                          <span className="flex items-center gap-1.5 text-orange-400 font-bold">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>AST SYNTHESIS CORE</span>
                          </span>
                          <span className="px-2 py-0.5 rounded bg-black/60 border border-white/20 text-[10px] font-mono text-emerald-400">
                            ONLINE // 148 NODES/S
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Title & Description */}
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2.5 group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-zinc-300 leading-relaxed font-normal">
                      {feature.description}
                    </p>
                  </div>

                  {/* Bottom Metric Pill & Floria Slide-up Quick Action */}
                  <div className="mt-8 pt-5 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-xs">
                    <span className="font-bold text-orange-600 dark:text-orange-400 flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                      <span>Explore Sandbox</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                    <span className="font-mono text-[11px] font-bold text-orange-600 dark:text-orange-300 bg-orange-500/10 dark:bg-orange-500/15 px-3 py-1 rounded-full border border-orange-500/25 dark:border-orange-500/35 group-hover:bg-[#FF5500] group-hover:text-black group-hover:border-[#FF5500] transition-all duration-300 shadow-xs">
                      {feature.metric}
                    </span>
                  </div>
                </TiltCard>
              </MotionReveal>
            );
          })}
        </div>

        {/* Floria Ambient Laser Divider */}
        <div className="mt-20 max-w-4xl mx-auto flex items-center justify-center">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#FF5500]/40 to-transparent" />
        </div>
      </div>
    </div>
  );
}
