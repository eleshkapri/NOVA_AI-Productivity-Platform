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
    <section id="features" className="py-14 md:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MotionReveal animation="fade-up">
          <SectionHeader
            eyebrow="Autonomous Capabilities"
            title="Master Every Dimension of"
            titleHighlight="Modern Engineering"
            description="Eradicate tedious backlog grooming, chaotic sync meetings, and stale pull requests with our autonomous AI intelligence layer."
          />
        </MotionReveal>

        {/* 6 Luxury Feature Cards Grid with Orchid Holographic Border Hover */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 relative z-10">
          {featureModels.map((feature, i) => {
            const Icon = iconMap[feature.iconName] || Bot;
            const targetTab = feature.getTargetTab();
            return (
              <MotionReveal key={feature.id} delay={i * 80} animation="fade-up" className="h-full">
                <TiltCard
                  onClick={() => onOpenDemo && onOpenDemo(targetTab)}
                  title="Click to launch interactive walkthrough"
                  maxTilt={8}
                  scale={1.02}
                  glare={true}
                  className="group relative bg-white/90 dark:bg-[#07081e]/80 rounded-3xl p-8 sm:p-9 border border-slate-200/80 dark:border-white/10 shadow-md dark:shadow-xl hover:border-transparent transition-all duration-300 flex flex-col justify-between backdrop-blur-xl cursor-pointer h-full orchid-card"
                >
                <div>
                  {/* Top Bar: Icon + Badge */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-amber-500/10 dark:bg-[#050614] border border-amber-500/20 dark:border-[#8E6FFF]/30 flex items-center justify-center text-amber-600 dark:text-[#A78BFA] group-hover:scale-120 group-hover:rotate-6 group-hover:bg-gradient-to-tr group-hover:from-[#6833FF] group-hover:to-[#D8B452] group-hover:text-white group-hover:shadow-lg group-hover:shadow-[#6833FF]/30 transition-all duration-300">
                      <Icon className="w-7 h-7" />
                    </div>
                    <Badge variant={i % 2 === 0 ? 'orchid' : 'gold'}>{feature.badge}</Badge>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-amber-600 dark:group-hover:text-[#C4B5FD] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {feature.description}
                  </p>
                </div>

                {/* Bottom Metric Pill & Interactive Arrow */}
                  <div className="mt-8 pt-5 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-xs">
                    <span className="font-bold text-amber-600 dark:text-[#D8B452] group-hover:underline flex items-center gap-1">
                      Explore walkthrough &rarr;
                    </span>
                    <span className="font-bold text-amber-700 dark:text-[#E0E7FF] bg-amber-500/10 dark:bg-[#6833FF]/15 px-3 py-1 rounded-full border border-amber-500/20 dark:border-[#8E6FFF]/40 group-hover:bg-[#6833FF] group-hover:text-white group-hover:border-[#6833FF] transition-all duration-300 shadow-xs font-mono">
                      {feature.metric}
                    </span>
                  </div>
                </TiltCard>
              </MotionReveal>
            );
          })}
        </div>

        {/* Orchid Scanning Laser Beam Divider */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="decor-laser-beam" />
        </div>
      </div>
    </section>
  );
}
