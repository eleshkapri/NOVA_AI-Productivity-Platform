import React from 'react';
import { Button } from '../common/Button';
import { ArrowRight, Play, Sparkles, CheckCircle2, Shield } from 'lucide-react';

export function FinalCTA({ onOpenDemo }) {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 text-white p-8 sm:p-12 md:p-16 shadow-2xl border border-indigo-700/50">
          {/* Subtle decorative background circles */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-purple-500/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-indigo-200 mb-6">
              <Sparkles className="w-4 h-4 text-amber-300" />
              Empower Your Engineering Squad Today
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.15] mb-6">
              Ready to Accelerate Your Sprint Delivery by 4.2x?
            </h2>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-indigo-100/90 leading-relaxed mb-10 max-w-2xl mx-auto">
              Join over 500+ fast-moving engineering teams shipping higher-quality software with less overhead. Setup takes under 60 seconds.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Button
                variant="glow"
                size="lg"
                icon={ArrowRight}
                iconPosition="right"
                onClick={() => {
                  const pricing = document.getElementById('pricing');
                  pricing?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto bg-white text-indigo-950 hover:bg-slate-100 shadow-xl"
              >
                Start Free 14-Day Trial
              </Button>
              <button
                onClick={onOpenDemo}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-medium rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Play className="w-4 h-4 text-white" /> Watch Product Walkthrough
              </button>
            </div>

            {/* Trust highlights */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-indigo-200/80">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Free 14-day trial
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> No credit card needed
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-emerald-400" /> SOC2 Type II Certified
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
