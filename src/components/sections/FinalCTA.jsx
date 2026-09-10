import React from 'react';
import { Button } from '../common/Button';
import { MotionReveal } from '../common/MotionReveal';
import { ArrowRight, Play, Sparkles, CheckCircle2, Shield } from 'lucide-react';

export function FinalCTA({ onOpenDemo }) {
  return (
    <section className="py-14 md:py-20 relative overflow-hidden bg-noise">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MotionReveal animation="zoom-in" duration={900}>
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#07081e] via-[#090a26] to-[#050614] text-white p-10 sm:p-16 md:p-20 shadow-2xl border border-[#8E6FFF]/30 transition-all duration-500 hover:border-transparent group orchid-card">
          {/* Ambient Orchid Violet & Gold Radial Glow */}
          <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-[#6833FF]/35 blur-3xl pointer-events-none group-hover:opacity-100 transition-opacity duration-700" />
          <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 rounded-full bg-[#D8B452]/20 blur-3xl pointer-events-none group-hover:opacity-100 transition-opacity duration-700" />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            {/* Top Pill with Orchid Radiant Border */}
            <div className="orchid-tag-pill mb-8 cursor-default">
              <Sparkles className="w-3.5 h-3.5 text-[#A78BFA]" />
              <span>Elevate Your Engineering Cadence</span>
            </div>

            {/* Headline with Grand Editorial Typography */}
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.12] mb-8">
              Ready to Accelerate Sprint Velocity by{' '}
              <span className="text-gold-gradient font-serif italic font-normal">
                4.2x?
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-base sm:text-xl text-slate-300 leading-relaxed mb-12 max-w-2xl mx-auto font-light">
              Join 500+ forward-thinking engineering organizations achieving predictable delivery, reduced meeting fatigue, and supreme code quality.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-10">
              <Button
                variant="orchid"
                size="lg"
                icon={ArrowRight}
                iconPosition="right"
                onClick={() => onOpenDemo ? onOpenDemo('trial') : document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto text-base"
              >
                Experience 14-Day Free Trial
              </Button>
              <button
                onClick={() => onOpenDemo ? onOpenDemo('walkthrough') : null}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-base font-semibold tracking-wide rounded-full bg-[#07081e] hover:bg-[#0e1038] border border-[#8E6FFF]/40 hover:border-[#8E6FFF] text-white hover:text-[#E0E7FF] hover:scale-105 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#6833FF]/30 active:scale-95 transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8E6FFF] group/btn"
              >
                <Play className="w-4 h-4 text-[#A78BFA] transition-transform duration-300 group-hover/btn:scale-125 group-hover/btn:rotate-12" /> Watch Product Walkthrough
              </button>
            </div>

            {/* Trust Highlights */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-xs font-semibold tracking-wider uppercase text-slate-400">
              <span className="flex items-center gap-2 hover:text-white hover:scale-105 transition-all duration-200 cursor-default">
                <CheckCircle2 className="w-4 h-4 text-[#A78BFA]" /> Complimentary 14-day trial
              </span>
              <span className="flex items-center gap-2 hover:text-white hover:scale-105 transition-all duration-200 cursor-default">
                <CheckCircle2 className="w-4 h-4 text-[#D8B452]" /> Zero credit card required
              </span>
              <span className="flex items-center gap-2 hover:text-white hover:scale-105 transition-all duration-200 cursor-default">
                <Shield className="w-4 h-4 text-[#A78BFA]" /> SOC2 Type II Certified
              </span>
            </div>
          </div>
        </div>
        </MotionReveal>
      </div>
    </section>
  );
}
