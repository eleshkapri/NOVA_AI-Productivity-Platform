import React from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { Badge } from '../common/Badge';
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

export function Features() {
  return (
    <section id="features" className="py-24 md:py-36 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Autonomous Capabilities"
          title="Master Every Dimension of"
          titleHighlight="Modern Engineering"
          description="Eradicate tedious backlog grooming, chaotic sync meetings, and stale pull requests with our autonomous AI intelligence layer."
        />

        {/* 6 Luxury Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuresData.map((feature) => {
            const Icon = iconMap[feature.iconName] || Bot;
            return (
              <div
                key={feature.id}
                className="group relative bg-[#0b0c33]/50 rounded-3xl p-8 sm:p-9 border border-white/10 hover:border-[#D8B452]/60 shadow-xl hover:shadow-2xl hover:shadow-[#D8B452]/10 transition-all duration-400 hover:-translate-y-1.5 flex flex-col justify-between backdrop-blur-xl"
              >
                <div>
                  {/* Top Bar: Icon + Badge */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-13 h-13 rounded-2xl bg-[#050614] border border-[#D8B452]/30 flex items-center justify-center text-[#D8B452] group-hover:scale-110 group-hover:border-[#D8B452] group-hover:shadow-lg group-hover:shadow-[#D8B452]/20 transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <Badge variant="gold">{feature.badge}</Badge>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#D8B452] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed font-light">
                    {feature.description}
                  </p>
                </div>

                {/* Bottom Metric Pill */}
                <div className="mt-8 pt-5 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="font-semibold uppercase tracking-wider text-slate-400">Impact Metric</span>
                  <span className="font-bold text-[#D8B452] bg-[#D8B452]/10 px-3 py-1 rounded-full border border-[#D8B452]/30">
                    {feature.metric}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
