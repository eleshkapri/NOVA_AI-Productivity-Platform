import React, { useState } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { Button } from '../common/Button';
import { MotionReveal } from '../common/MotionReveal';
import { pricingPlans } from '../../data/pricing';
import { PricingPlanModel } from '../../models/PricingPlanModel';
import { Check, Sparkles, ArrowRight, ShieldCheck, Zap, Lock, Terminal, Radio } from 'lucide-react';

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
    <section id="pricing" className="py-14 md:py-20 relative overflow-hidden bg-noise">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. Section Header */}
        <MotionReveal animation="fade-up">
          <SectionHeader
            eyebrow="Predictable Economics"
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
              onClick={() => setIsAnnual(false)}
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
              onClick={() => setIsAnnual(!isAnnual)}
              className="w-14 h-7 flex items-center bg-slate-200 dark:bg-zinc-900 border border-slate-300/80 dark:border-white/15 rounded-full p-0.5 cursor-pointer transition-all duration-300 hover:border-[#FF5500] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5500]"
            >
              <div
                className={`w-5.5 h-5.5 rounded-full bg-[#FF5500] shadow-md transform transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isAnnual ? 'translate-x-7' : 'translate-x-0.5'
                }`}
              />
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsAnnual(true)}
                className={`text-xs sm:text-sm font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  isAnnual ? 'text-[#FF5500]' : 'text-slate-500 hover:text-slate-800 dark:hover:text-zinc-300'
                }`}
              >
                Annual Commitment
              </button>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-orange-500/15 text-orange-600 dark:text-orange-400 border border-orange-500/30">
                Save <span className="font-mono">{proSavings}%</span>
              </span>
            </div>
          </div>
        </MotionReveal>

        {/* 3. Asymmetric Bento Rhythm (VARIANCE: 7) — Flagship Pro Anchor (7 cols) + Flank Duo (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch mb-8">
          {/* ========================================================
              LEFT COLUMN (7 COLS): FLAGSHIP PRO TIER (BENTO ANCHOR)
              ======================================================== */}
          <div className="lg:col-span-7 flex flex-col">
            <MotionReveal animation="fade-up" delay={120} className="h-full">
              <div className="relative rounded-[2.5rem] overflow-hidden bg-zinc-950 text-white border-2 border-[#FF5500] shadow-2xl shadow-[#FF5500]/20 p-7 sm:p-10 flex flex-col justify-between h-full group ring-1 ring-inset ring-white/10">
                {/* Ambient Cyber-Orange Radial Glow */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-[#FF5500]/20 blur-3xl pointer-events-none group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#FF5500]/10 blur-3xl pointer-events-none group-hover:opacity-100 transition-opacity duration-700" />

                <div>
                  {/* Top Status HUD Strip */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-white/10 mb-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/40 text-orange-400 text-[11px] font-mono font-bold uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                      <span>FLAGSHIP // SPRINT OPTIMIZER</span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      <span>RECOMMENDED FOR SQUADS</span>
                    </div>
                  </div>

                  {/* Plan Title & Value Prop */}
                  <div className="mb-6">
                    <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
                      <span>{proPlan.name}</span>
                      <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-md bg-orange-500/20 text-orange-300 border border-orange-500/30 uppercase">
                        Active Tier
                      </span>
                    </h3>
                    <p className="text-sm text-zinc-300 mt-2 max-w-xl font-light leading-relaxed">
                      {proPlan.description}
                    </p>
                  </div>

                  {/* Price Tag with High-Precision Monospace Numbers */}
                  <div className="p-5 rounded-2xl bg-zinc-900/80 border border-white/10 backdrop-blur-md mb-8 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl sm:text-6xl font-black font-mono text-orange-gradient tracking-tight">
                        ${proPrice}
                      </span>
                      <span className="text-xs sm:text-sm font-mono text-zinc-400 uppercase">
                        / user / month
                      </span>
                    </div>
                    <div className="text-left sm:text-right">
                      <span className="text-[11px] font-mono font-bold text-emerald-400 uppercase tracking-wider block">
                        {isAnnual ? `SAVES $${(29 - 24) * 12}/SEAT/YR` : 'BILLED MONTHLY'}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-500 uppercase">
                        14-DAY FULL SANDBOX INCLUDED
                      </span>
                    </div>
                  </div>

                  {/* 2-Column Feature Breakdown */}
                  <div className="mb-8">
                    <p className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#FF5500] mb-4 flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5" />
                      <span>Engine Capabilities Matrix:</span>
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-zinc-200">
                      {proPlan.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-2.5 p-2 rounded-xl bg-white/[0.03] border border-white/5">
                          <Check className="w-4 h-4 text-[#FF5500] shrink-0 mt-0.5" />
                          <span className="leading-snug">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card CTA & Reassurance */}
                <div className="pt-6 border-t border-white/10 space-y-4">
                  <Button
                    variant="orange"
                    size="lg"
                    icon={ArrowRight}
                    iconPosition="right"
                    className="w-full justify-center text-base font-bold shadow-xl shadow-[#FF5500]/25 cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-all"
                    onClick={() => onOpenDemo ? onOpenDemo('trial', { plan: 'pro' }) : null}
                  >
                    Start 14-Day Free Pro Trial
                  </Button>

                  <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                    <span>&bull; Zero credit card required</span>
                    <span>&bull; Instant GitHub / GitLab sync</span>
                    <span>&bull; Cancel anytime</span>
                  </div>
                </div>
              </div>
            </MotionReveal>
          </div>

          {/* ========================================================
              RIGHT COLUMN (5 COLS): FLANK DUO (STARTER & ENTERPRISE)
              ======================================================== */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            {/* TILE 1: STARTER / SOLO DEVELOPER SANDBOX */}
            <MotionReveal animation="fade-up" delay={180} className="flex-1">
              <div className="rounded-[2.25rem] p-6 sm:p-7 bg-white/95 dark:bg-zinc-900/40 border border-slate-200/90 dark:border-white/10 shadow-lg dark:shadow-xl flex flex-col justify-between h-full transition-all duration-300 hover:border-[#FF5500]/40 ring-1 ring-inset ring-white/5">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-orange-500 dark:text-orange-400" />
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                        {starterPlan.name}
                      </h4>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-zinc-300 uppercase">
                      {starterPlan.badge}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-zinc-400 mb-4 leading-relaxed font-light">
                    {starterPlan.description}
                  </p>

                  <div className="flex items-baseline gap-2 mb-4 pb-4 border-b border-slate-100 dark:border-white/10">
                    <span className="text-3xl sm:text-4xl font-black font-mono text-slate-900 dark:text-white tracking-tight">
                      ${starterPrice}
                    </span>
                    <span className="text-xs font-mono text-slate-500 uppercase">
                      / forever
                    </span>
                  </div>

                  <div className="space-y-2 mb-6 text-xs text-slate-700 dark:text-zinc-300">
                    {starterPlan.features.slice(0, 3).map((f, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#FF5500] shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenDemo ? onOpenDemo('trial', { plan: 'starter' }) : null}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-slate-100 dark:bg-zinc-800/80 text-slate-800 dark:text-white hover:bg-slate-200 dark:hover:bg-zinc-700 border border-slate-200 dark:border-white/10 transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
                >
                  Launch Solo Sandbox
                </button>
              </div>
            </MotionReveal>

            {/* TILE 2: ENTERPRISE ZERO-TRUST CLUSTER */}
            <MotionReveal animation="fade-up" delay={240} className="flex-1">
              <div className="rounded-[2.25rem] p-6 sm:p-7 bg-zinc-950 text-white border border-white/10 shadow-xl flex flex-col justify-between h-full transition-all duration-300 hover:border-[#FF5500]/50 ring-1 ring-inset ring-white/5">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-[#FF5500]" />
                      <h4 className="text-lg font-bold text-white tracking-tight">
                        {enterprisePlan.name}
                      </h4>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-orange-500/15 text-orange-400 border border-orange-500/30 uppercase">
                      {enterprisePlan.badge}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-300 mb-4 leading-relaxed font-light">
                    {enterprisePlan.description}
                  </p>

                  <div className="flex items-baseline gap-2 mb-4 pb-4 border-b border-white/10">
                    <span className="text-3xl sm:text-4xl font-black font-mono text-orange-gradient tracking-tight">
                      ${enterprisePrice}
                    </span>
                    <span className="text-xs font-mono text-zinc-400 uppercase">
                      / user / month
                    </span>
                  </div>

                  <div className="space-y-2 mb-6 text-xs text-zinc-300">
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#FF5500] shrink-0" />
                      <span>Zero-data retention guarantee (no training)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#FF5500] shrink-0" />
                      <span>Dedicated VPC, SCIM & granular RBAC</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#FF5500] shrink-0" />
                      <span><span className="font-mono font-bold text-[#FF5500]">99.99%</span> guaranteed uptime SLA</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenDemo ? onOpenDemo('contact', { plan: 'enterprise' }) : null}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-zinc-900 hover:bg-zinc-800 text-white border border-white/10 hover:border-[#FF5500]/50 transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-1.5"
                >
                  <Radio className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
                  <span>Consult Enterprise Team</span>
                </button>
              </div>
            </MotionReveal>
          </div>
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
