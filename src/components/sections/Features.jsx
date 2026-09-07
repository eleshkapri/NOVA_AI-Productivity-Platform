import React from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { Badge } from '../common/Badge';
import { MotionReveal } from '../common/MotionReveal';
import { featuresData } from '../../data/features';
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

export function Features({ onOpenDemo }) {
  const getFeatureTab = (idx) => {
    switch (idx) {
      case 0:
        return 'backlog';
      case 1:
        return 'pr';
      case 2:
        return 'velocity';
      case 3:
        return 'pr';
      case 4:
        return 'status';
      case 5:
        return 'docs';
      default:
        return 'backlog';
    }
  };

  return (
    <section id="features" className="py-24 md:py-36 relative">
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
          {featuresData.map((feature, i) => {
            const Icon = iconMap[feature.iconName] || Bot;
            const targetTab = getFeatureTab(i);
            return (
              <MotionReveal key={feature.id} delay={i * 80} animation="fade-up" className="h-full">
                <div
                  onClick={() => onOpenDemo && onOpenDemo(targetTab)}
                  title="Click to launch interactive walkthrough"
                  className="group relative bg-white/90 dark:bg-[#07081e]/80 rounded-3xl p-8 sm:p-9 border border-slate-200/80 dark:border-white/10 shadow-md dark:shadow-xl hover:border-transparent transition-all duration-300 flex flex-col justify-between backdrop-blur-xl cursor-pointer h-full orchid-card"
                >
                <div>
                  {/* Top Bar: Icon + Badge */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-[#050614] border border-[#a1741a]/30 dark:border-[#8E6FFF]/30 flex items-center justify-center text-[#a1741a] dark:text-[#A78BFA] group-hover:scale-120 group-hover:rotate-6 group-hover:bg-gradient-to-tr group-hover:from-[#6833FF] group-hover:to-[#D8B452] group-hover:text-white group-hover:shadow-lg group-hover:shadow-[#6833FF]/30 transition-all duration-300">
                      <Icon className="w-7 h-7" />
                    </div>
                    <Badge variant={i % 2 === 0 ? 'orchid' : 'gold'}>{feature.badge}</Badge>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-[#a1741a] dark:group-hover:text-[#C4B5FD] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {feature.description}
                  </p>
                </div>

                {/* Bottom Metric Pill & Interactive Arrow */}
                  <div className="mt-8 pt-5 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-xs">
                    <span className="font-bold text-[#a1741a] dark:text-[#D8B452] group-hover:underline flex items-center gap-1">
                      Explore walkthrough &rarr;
                    </span>
                    <span className="font-bold text-[#a1741a] dark:text-[#E0E7FF] bg-amber-50 dark:bg-[#6833FF]/15 px-3 py-1 rounded-full border border-[#a1741a]/20 dark:border-[#8E6FFF]/40 group-hover:bg-[#6833FF] group-hover:text-white group-hover:border-[#6833FF] transition-all duration-300 shadow-xs">
                      {feature.metric}
                    </span>
                  </div>
                </div>
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
