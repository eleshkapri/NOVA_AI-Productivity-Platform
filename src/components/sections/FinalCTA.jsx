import React from 'react';
import { Button } from '../common/Button';
import { MotionReveal } from '../common/MotionReveal';
import { TextReveal3 } from '../common/TextReveal3';
import { ArrowRight, Play, Sparkles, CheckCircle2, Shield } from 'lucide-react';
import { smoothScrollService } from '../../services/SmoothScrollService';

export function FinalCTA({ onOpenDemo }) {
  return (
    <section id="final-cta" className="py-16 md:py-20 relative overflow-hidden bg-noise">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MotionReveal animation="zoom-in" duration={800}>
          <div className="relative rounded-[2.5rem] sm:rounded-[3rem] overflow-hidden bg-zinc-950 text-white p-10 sm:p-16 md:p-20 shadow-2xl border border-white/10 hover:border-[#FF5500]/50 transition-all duration-500 group ring-1 ring-inset ring-white/10">
            {/* Luminous Cyber-Orange Horizon Arc Background (Zero-Text, Hardware-Accelerated) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {/* Radial glow bloom */}
              <div className="absolute -bottom-48 left-1/2 -translate-x-1/2 w-[800px] sm:w-[1200px] h-[500px] rounded-[100%] bg-gradient-to-t from-[#FF5500]/30 via-[#FF7700]/15 to-transparent blur-3xl group-hover:from-[#FF5500]/40 transition-colors duration-700" />
              {/* Luminous Horizon Laser Arc */}
              <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[700px] sm:w-[1000px] h-[300px] rounded-[100%] border-t-2 border-[#FF5500]/60 shadow-[0_0_60px_rgba(255,85,0,0.5)]" />
              <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[500px] sm:w-[800px] h-[200px] rounded-[100%] border-t border-amber-400/40 shadow-[0_0_40px_rgba(255,180,0,0.3)]" />
              {/* Subtle Atmospheric Top Corner Glows */}
              <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-[#FF5500]/20 blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 rounded-full bg-[#FF7700]/15 blur-3xl pointer-events-none" />
            </div>

            <div className="relative z-10 max-w-3xl mx-auto text-center">
              {/* Top Pill with Orange Glow */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 text-xs font-mono font-bold tracking-wider uppercase mb-8 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                <TextReveal3 text="Elevate Your Engineering Cadence" delay={20} stagger={8} duration={240} />
              </div>

              {/* Headline with Grand Editorial Typography */}
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.12] mb-6">
                <TextReveal3 text="Ready to Accelerate Sprint Velocity by" delay={40} stagger={10} duration={280} />{' '}
                <span className="text-orange-gradient italic font-black inline-block">
                  <TextReveal3 text="4.2x?" delay={140} stagger={10} duration={280} />
                </span>
              </h2>

              {/* Subtitle */}
              <p className="text-base sm:text-xl text-zinc-300 leading-relaxed mb-10 max-w-2xl mx-auto font-light">
                <TextReveal3
                  text="Join 500+ forward-thinking engineering organizations achieving predictable delivery, reduced meeting fatigue, and supreme code quality."
                  delay={80}
                  stagger={5}
                  duration={240}
                  offsetDistance={12}
                />
              </p>



              {/* Dual CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
                <Button
                  variant="orange"
                  size="lg"
                  icon={ArrowRight}
                  iconPosition="right"
                  onClick={() => onOpenDemo ? onOpenDemo('trial') : smoothScrollService.scrollTo('#pricing', { offset: -70, duration: 1.5 })}
                  className="w-full sm:w-auto text-base shadow-xl shadow-[#FF5500]/30"
                >
                  Experience 14-Day Free Trial
                </Button>
                <button
                  onClick={() => onOpenDemo ? onOpenDemo('walkthrough') : null}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-base font-semibold tracking-wide rounded-full bg-zinc-900/80 hover:bg-zinc-800 border border-white/15 hover:border-[#FF5500]/50 text-white hover:text-orange-300 hover:scale-105 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5500] group/btn backdrop-blur-md"
                >
                  <Play className="w-4 h-4 text-orange-400 transition-transform duration-300 group-hover/btn:scale-125 group-hover/btn:rotate-12" /> Watch Product Walkthrough
                </button>
              </div>

              {/* Trust Highlights */}
              <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-mono font-medium tracking-wider uppercase text-zinc-400">
                <span className="flex items-center gap-2 hover:text-white transition-colors cursor-default">
                  <CheckCircle2 className="w-4 h-4 text-orange-400" /> Complimentary 14-day trial
                </span>
                <span className="flex items-center gap-2 hover:text-white transition-colors cursor-default">
                  <CheckCircle2 className="w-4 h-4 text-[#FF5500]" /> Zero credit card required
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
