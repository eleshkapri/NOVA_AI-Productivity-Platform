import React, { useState } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { Button } from '../common/Button';
import { MotionReveal } from '../common/MotionReveal';
import { pricingPlans } from '../../data/pricing';
import { PricingPlanModel } from '../../models/PricingPlanModel';
import { Check, Sparkles, ArrowRight, ShieldCheck, Zap, Lock, Radio } from 'lucide-react';
import { soundService } from '../../services/SoundService';

const planModels = pricingPlans.map((p) => new PricingPlanModel(p));

export function Pricing({ onOpenDemo }) {
  const [isAnnual, setIsAnnual] = useState(true);

  const starterPlan = planModels.find((p) => p.id === 'starter') || planModels[0];
  const proPlan = planModels.find((p) => p.id === 'pro') || planModels[1];
  const enterprisePlan = planModels.find((p) => p.id === 'enterprise') || planModels[2];

  const starterPrice = starterPlan.getEffectivePrice(isAnnual);
  const proPrice = proPlan.getEffectivePrice(isAnnual);
  const enterprisePrice = enterprisePlan.getEffectivePrice(isAnnual);
  const proSavings = proPlan.getAnnualSavingsPercent() || 20;

  return (
    <section id="pricing" className="pt-6 pb-14 md:pt-8 md:pb-18 relative overflow-hidden bg-noise">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. Section Header */}
        <MotionReveal animation="fade-up">
          <SectionHeader
            eyebrow="Predictable Economics"
            eyebrowVariant="orange"
            title="Invest in Velocity,"
            titleHighlight="Scale Without Surprises"
            description="Transparent tiering engineered for fast-moving engineering teams. Scale seamlessly from local sandbox experimentation to multi-squad autonomous pipelines."
          />
        </MotionReveal>

        {/* 2. Linear-Style Spring Billing Switcher */}
        <MotionReveal animation="fade-up" delay={80}>
          <div className="flex items-center justify-center gap-4 mb-12 sm:mb-16 select-none">
            <button
              type="button"
              onClick={() => {
                soundService.playChime('actionClick');
                setIsAnnual(false);
              }}
              className={`text-xs sm:text-sm font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                !isAnnual ? 'text-[#FF5500]' : 'text-slate-500 hover:text-slate-800 dark:hover:text-zinc-300'
              }`}
            >
              Monthly Billing
            </button>

            <button
              type="button"
              role="switch"
              aria-checked={isAnnual}
              aria-label="Toggle annual billing with 20% savings"
              onClick={() => {
                soundService.playChime('actionClick');
                setIsAnnual(!isAnnual);
              }}
              className="w-14 h-7 flex items-center bg-slate-200 dark:bg-zinc-900 border border-slate-300/80 dark:border-white/15 rounded-full p-0.5 cursor-pointer transition-all duration-300 hover:border-[#FF5500] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5500]"
            >
              <div
                className={`w-5.5 h-5.5 rounded-full bg-[#FF5500] shadow-[0_0_12px_rgba(255,85,0,0.6)] transform transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isAnnual ? 'translate-x-7' : 'translate-x-0.5'
                }`}
              />
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  soundService.playChime('actionClick');
                  setIsAnnual(true);
                }}
                className={`text-xs sm:text-sm font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  isAnnual ? 'text-[#FF5500]' : 'text-slate-500 hover:text-slate-800 dark:hover:text-zinc-300'
                }`}
              >
                Annual Commitment
              </button>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-orange-500/15 text-orange-500 dark:text-orange-400 border border-orange-500/30">
                Save <span className="font-mono">{proSavings}%</span>
              </span>
            </div>
          </div>
        </MotionReveal>

        {/* 3. Three Long Cards Side-by-Side (Starter · Professional · Enterprise) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-12">
          {/* ========================================================
              CARD 1: STARTER / SOLO DEVELOPER
              ======================================================== */}
          <MotionReveal animation="fade-up" delay={120} className="h-full">
            <div className="rounded-[2.25rem] p-7 sm:p-9 bg-white/90 dark:bg-zinc-900/50 border border-slate-200/80 dark:border-white/10 hover:border-[#FF5500]/40 transition-all duration-500 shadow-lg flex flex-col justify-between h-full backdrop-blur-xl ring-1 ring-inset ring-white/5">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500">
                      <Zap className="w-5 h-5" />
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                      {starterPlan.name}
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-zinc-300 uppercase">
                    {starterPlan.badge}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-zinc-400 mb-6 leading-relaxed font-normal min-h-[36px]">
                  {starterPlan.description}
                </p>

                {/* Price Display */}
                <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-slate-100 dark:border-white/10">
                  <span className="text-4xl sm:text-5xl font-black font-mono text-slate-900 dark:text-white tracking-tight">
                    ${starterPrice}
                  </span>
                  <span className="text-xs font-mono text-slate-500 uppercase">
                    / forever
                  </span>
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-8 text-xs text-slate-700 dark:text-zinc-300">
                  <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-3">
                    INCLUDED CAPABILITIES:
                  </p>
                  {starterPlan.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#FF5500] shrink-0 mt-0.5" />
                      <span className="leading-snug">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => onOpenDemo ? onOpenDemo('trial', { plan: 'starter' }) : null}
                className="w-full py-3 px-5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-slate-100 dark:bg-zinc-800/90 text-slate-800 dark:text-white hover:bg-slate-200 dark:hover:bg-zinc-700 border border-slate-200 dark:border-white/10 hover:border-[#FF5500]/50 transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
              >
                Launch Solo Sandbox
              </button>
            </div>
          </MotionReveal>

          {/* ========================================================
              CARD 2: PROFESSIONAL (FLAGSHIP / POPULAR TIER)
              ======================================================== */}
          <MotionReveal animation="fade-up" delay={180} className="h-full">
            <div className="rounded-[2.25rem] p-7 sm:p-9 bg-gradient-to-b from-zinc-900 via-zinc-950 to-black text-white border-2 border-[#FF5500] shadow-[0_0_40px_rgba(255,85,0,0.25)] flex flex-col justify-between h-full transition-all duration-500 relative overflow-hidden ring-1 ring-inset ring-white/10">
              {/* Subtle Ambient Radial Glow */}
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-[#FF5500]/20 blur-3xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-[#FF5500]/20 border border-[#FF5500]/40 flex items-center justify-center text-[#FF5500]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <h4 className="text-xl font-bold text-white tracking-tight">
                      {proPlan.name}
                    </h4>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-[#FF5500]/20 text-[#FF5500] border border-[#FF5500]/40 uppercase shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500] animate-pulse" />
                    {proPlan.badge}
                  </span>
                </div>

                <p className="text-xs text-zinc-300 mb-6 leading-relaxed font-normal min-h-[36px]">
                  {proPlan.description}
                </p>

                {/* Price Display */}
                <div className="p-4 rounded-2xl bg-zinc-900/80 border border-white/10 backdrop-blur-md mb-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-black font-mono text-orange-gradient tracking-tight">
                      ${proPrice}
                    </span>
                    <span className="text-xs font-mono text-zinc-400 uppercase">
                      / user / mo
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider">
                    {isAnnual ? `SAVES $${(29 - 24) * 12}/YR` : 'BILLED MONTHLY'}
                  </span>
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-8 text-xs text-zinc-200">
                  <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#FF5500] mb-3">
                    ALL STARTER FEATURES PLUS:
                  </p>
                  {proPlan.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#FF5500] shrink-0 mt-0.5" />
                      <span className="leading-snug">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/10">
                <Button
                  variant="orange"
                  size="lg"
                  icon={ArrowRight}
                  iconPosition="right"
                  className="w-full justify-center text-xs font-bold font-mono tracking-wider uppercase shadow-xl shadow-[#FF5500]/30 cursor-pointer"
                  onClick={() => onOpenDemo ? onOpenDemo('trial', { plan: 'pro' }) : null}
                >
                  Start 14-Day Free Pro Trial
                </Button>
                <p className="text-[10px] font-mono text-zinc-400 text-center uppercase tracking-wider">
                  No credit card &bull; 14-day full access
                </p>
              </div>
            </div>
          </MotionReveal>

          {/* ========================================================
              CARD 3: ENTERPRISE / ZERO-TRUST
              ======================================================== */}
          <MotionReveal animation="fade-up" delay={240} className="h-full">
            <div className="rounded-[2.25rem] p-7 sm:p-9 bg-white/90 dark:bg-zinc-900/50 border border-slate-200/80 dark:border-white/10 hover:border-[#FF5500]/40 transition-all duration-500 shadow-lg flex flex-col justify-between h-full backdrop-blur-xl ring-1 ring-inset ring-white/5">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500">
                      <Lock className="w-5 h-5" />
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                      {enterprisePlan.name}
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-orange-500/15 text-orange-500 dark:text-orange-400 border border-orange-500/30 uppercase">
                    {enterprisePlan.badge}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-zinc-400 mb-6 leading-relaxed font-normal min-h-[36px]">
                  {enterprisePlan.description}
                </p>

                {/* Price Display */}
                <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-slate-100 dark:border-white/10">
                  <span className="text-4xl sm:text-5xl font-black font-mono text-slate-900 dark:text-white tracking-tight">
                    ${enterprisePrice}
                  </span>
                  <span className="text-xs font-mono text-slate-500 uppercase">
                    / user / mo
                  </span>
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-8 text-xs text-slate-700 dark:text-zinc-300">
                  <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-3">
                    ENTERPRISE PROTOCOLS:
                  </p>
                  {enterprisePlan.features.slice(0, 6).map((f, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#FF5500] shrink-0 mt-0.5" />
                      <span className="leading-snug">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => onOpenDemo ? onOpenDemo('contact', { plan: 'enterprise' }) : null}
                className="w-full py-3 px-5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-zinc-900 hover:bg-zinc-800 text-white border border-white/10 hover:border-[#FF5500]/50 transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-1.5"
              >
                <Radio className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
                <span>Consult Enterprise Team</span>
              </button>
            </div>
          </MotionReveal>
        </div>

        {/* 4. Full-Width Cybernetic Security & Compliance Assurance Strip */}
        <MotionReveal animation="fade-up" delay={280}>
          <div className="rounded-2xl bg-white/90 dark:bg-zinc-950 border border-slate-200/90 dark:border-white/10 p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-600 dark:text-zinc-300">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#FF5500] shrink-0" />
              <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Enterprise Assurance Protocol
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-[11px] text-slate-500 dark:text-zinc-400">
              <span className="hover:text-slate-900 dark:hover:text-white transition-colors">[✓ SOC-2 TYPE II]</span>
              <span className="hover:text-slate-900 dark:hover:text-white transition-colors">[✓ ZERO MODEL RETENTION]</span>
              <span className="hover:text-slate-900 dark:hover:text-white transition-colors">[✓ 99.99% SLA]</span>
              <span className="hover:text-slate-900 dark:hover:text-white transition-colors">[✓ DEDICATED VPC]</span>
            </div>

            <button
              type="button"
              onClick={() => onOpenDemo && onOpenDemo('contact', { plan: 'enterprise' })}
              className="text-orange-600 dark:text-orange-400 font-bold uppercase tracking-wider hover:underline flex items-center gap-1 cursor-pointer shrink-0"
            >
              <span>Review Security Whitepaper</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
