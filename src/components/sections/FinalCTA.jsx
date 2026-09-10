import React from 'react';
import { Button } from '../common/Button';
import { MotionReveal } from '../common/MotionReveal';
import { ArrowRight, Play, Sparkles, CheckCircle2, Shield } from 'lucide-react';

export function FinalCTA({ onOpenDemo }) {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-noise">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MotionReveal animation="zoom-in" duration={800}>
          <div className="relative rounded-[2.5rem] sm:rounded-[3rem] overflow-hidden bg-[#07081e]/90 text-white p-10 sm:p-16 md:p-20 shadow-2xl border border-white/10 hover:border-[#D8B452]/50 transition-all duration-500 group ring-1 ring-inset ring-white/10">
            {/* Horizon Arc Background Artwork (cta_horizon.jpg) */}
            <div className="absolute inset-0 pointer-events-none opacity-40 group-hover:opacity-50 transition-opacity duration-700">
              <img
                src="/images/nova_sections/cta_horizon.jpg"
                alt="NOVA Infinite Horizon Launch Arc"
                className="w-full h-full object-cover object-center scale-105 group-hover:scale-100 transition-transform duration-1000 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050614] via-[#050614]/80 to-[#050614]/40" />
            </div>

            {/* Ambient Purple / Gold Glow */}
            <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-[#6833FF]/25 blur-3xl pointer-events-none group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 rounded-full bg-[#D8B452]/20 blur-3xl pointer-events-none group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative z-10 max-w-3xl mx-auto text-center">
              {/* Top Pill with Gold Glow */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D8B452]/15 border border-[#D8B452]/30 text-[#D8B452] dark:text-[#F3D887] text-xs font-mono font-bold tracking-wider uppercase mb-8 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#D8B452]" />
                <span>Elevate Your Engineering Cadence</span>
              </div>

              {/* Headline with Grand Editorial Typography */}
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.12] mb-6">
                Ready to Accelerate Sprint Velocity by{' '}
                <span className="text-gold-gradient italic font-black">
                  4.2x?
                </span>
              </h2>

              {/* Subtitle */}
              <p className="text-base sm:text-xl text-zinc-300 leading-relaxed mb-10 max-w-2xl mx-auto font-light">
                Join 500+ forward-thinking engineering organizations achieving predictable delivery, reduced meeting fatigue, and supreme code quality.
              </p>

              {/* Dual CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
                <Button
                  variant="purple"
                  size="lg"
                  icon={ArrowRight}
                  iconPosition="right"
                  onClick={() => onOpenDemo ? onOpenDemo('trial') : document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full sm:w-auto text-base shadow-xl shadow-[#6833FF]/30"
                >
                  Experience 14-Day Free Trial
                </Button>
                <button
                  onClick={() => onOpenDemo ? onOpenDemo('walkthrough') : null}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-base font-semibold tracking-wide rounded-full bg-white/5 hover:bg-white/10 border border-white/15 hover:border-[#D8B452]/50 text-white hover:text-[#F3D887] hover:scale-105 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8E6FFF] group/btn backdrop-blur-md"
                >
                  <Play className="w-4 h-4 text-[#D8B452] transition-transform duration-300 group-hover/btn:scale-125 group-hover/btn:rotate-12" /> Watch Product Walkthrough
                </button>
              </div>

              {/* Trust Highlights */}
              <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-mono font-medium tracking-wider uppercase text-zinc-400">
                <span className="flex items-center gap-2 hover:text-white transition-colors cursor-default">
                  <CheckCircle2 className="w-4 h-4 text-[#D8B452]" /> Complimentary 14-day trial
                </span>
                <span className="flex items-center gap-2 hover:text-white transition-colors cursor-default">
                  <CheckCircle2 className="w-4 h-4 text-[#D8B452]" /> Zero credit card required
                </span>
                <span className="flex items-center gap-2 hover:text-white transition-colors cursor-default">
                  <Shield className="w-4 h-4 text-emerald-400" /> SOC2 Type II Certified
                </span>
              </div>
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
