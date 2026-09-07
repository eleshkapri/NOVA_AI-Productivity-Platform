import React, { useState } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { MotionReveal } from '../common/MotionReveal';
import { pricingPlans } from '../../data/pricing';
import { Check, X, Sparkles, ArrowRight } from 'lucide-react';

export function Pricing({ onOpenDemo }) {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section id="pricing" className="py-24 md:py-36 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MotionReveal animation="fade-up">
          <SectionHeader
            eyebrow="Transparent Investment"
            title="Invest in Velocity,"
            titleHighlight="Unleash True Productivity"
            description="Every plan includes access to our core autonomous AI engine. Scale smoothly as your engineering team expands."
          />
        </MotionReveal>

        {/* Monthly / Annual Billing Toggle */}
        <MotionReveal animation="fade-up" delay={100}>
          <div className="flex items-center justify-center gap-5 mb-16">
            <span
              className={`text-sm font-bold uppercase tracking-wider cursor-pointer transition-all hover:scale-105 active:scale-95 ${
                !isAnnual ? 'text-[#a1741a] dark:text-[#D8B452]' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
              onClick={() => setIsAnnual(false)}
            >
              Monthly Billing
            </span>

            <button
              type="button"
              role="switch"
              aria-checked={isAnnual}
              aria-label="Toggle annual billing with 20% discount"
              onClick={() => setIsAnnual(!isAnnual)}
              className="w-16 h-8 flex items-center bg-slate-200 dark:bg-[#0b0c33] border border-slate-300 dark:border-white/20 rounded-full p-1 cursor-pointer transition-all hover:scale-105 active:scale-95 hover:border-[#a1741a] dark:hover:border-[#D8B452] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D8B452]"
            >
              <div
                className={`bg-gradient-to-r from-[#D8B452] to-[#C79A2B] w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
                  isAnnual ? 'translate-x-7' : 'translate-x-0'
                }`}
              />
            </button>

            <div className="flex items-center gap-2.5">
              <span
                className={`text-sm font-bold uppercase tracking-wider cursor-pointer transition-all hover:scale-105 active:scale-95 ${
                  isAnnual ? 'text-[#a1741a] dark:text-[#D8B452]' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
                onClick={() => setIsAnnual(true)}
              >
                Annual Billing
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-[#a1741a] border border-[#a1741a]/30 dark:bg-[#D8B452]/20 dark:text-[#D8B452] dark:border-[#D8B452]/40 animate-pulse hover:scale-105 transition-transform cursor-default">
                Save 20%
              </span>
            </div>
          </div>
        </MotionReveal>

        {/* 3 Luxury Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {pricingPlans.map((plan, idx) => {
            const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;

            return (
              <MotionReveal key={plan.id} animation="fade-up" delay={150 + idx * 100} className="h-full">
              <div
                key={plan.id}
                className={`group relative bg-white/95 dark:bg-[#0b0c33]/70 rounded-3xl p-8 sm:p-10 border flex flex-col justify-between transition-all duration-500 backdrop-blur-2xl ${
                  plan.isPopular
                    ? 'border-[#a1741a] dark:border-[#D8B452] shadow-xl shadow-[#D8B452]/15 scale-102 lg:-translate-y-2 hover:-translate-y-4 hover:scale-[1.03] hover:shadow-2xl hover:shadow-[#D8B452]/30 hover:border-[#b8860b] dark:hover:border-[#F3D887]'
                    : 'border-slate-200/90 dark:border-white/10 shadow-md hover:border-[#a1741a]/60 dark:hover:border-[#D8B452]/60 hover:-translate-y-2.5 hover:scale-[1.015] hover:shadow-2xl hover:shadow-[#D8B452]/15'
                }`}
              >
                {/* Popular Ribbon in Gold */}
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 group-hover:scale-105 transition-transform duration-300">
                    <span className="bg-gradient-to-r from-[#D8B452] via-[#E5C773] to-[#B88A23] text-black text-xs font-black uppercase tracking-widest px-5 py-1.5 rounded-full shadow-xl flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> Most Popular
                    </span>
                  </div>
                )}

                <div>
                  {/* Plan Name & Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-wide">
                      {plan.name}
                    </h3>
                    <Badge variant={plan.isPopular ? 'gold' : 'slate'}>
                      {plan.badge}
                    </Badge>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-8 min-h-[44px] font-normal">
                    {plan.description}
                  </p>

                  {/* Price with Gold Accents */}
                  <div className="flex items-baseline gap-2 mb-8 pb-8 border-b border-slate-100 dark:border-white/10">
                    <span className="text-5xl sm:text-6xl font-black tracking-tight font-serif italic text-gold-gradient">
                      ${price}
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
                      {plan.period === 'forever' ? '/ forever' : isAnnual ? '/ user / mo (billed yearly)' : '/ user / mo'}
                    </span>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3.5 mb-10">
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#a1741a] dark:text-[#D8B452] mb-4">
                      Included in {plan.name}:
                    </p>

                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                        <Check className="w-4 h-4 text-[#a1741a] dark:text-[#D8B452] shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}

                    {plan.notIncluded &&
                      plan.notIncluded.map((feature, i) => (
                        <div
                          key={`not-${i}`}
                          className="flex items-start gap-3 text-xs sm:text-sm text-slate-400 dark:text-slate-500 line-through"
                        >
                          <X className="w-4 h-4 text-slate-300 dark:text-slate-600 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Card CTA */}
                <Button
                  variant={plan.isPopular ? 'primary' : 'outline'}
                  size="md"
                  icon={ArrowRight}
                  iconPosition="right"
                  className="w-full justify-center"
                  onClick={() => {
                    if (onOpenDemo) {
                      if (plan.id === 'enterprise') {
                        onOpenDemo('contact', { plan: 'enterprise' });
                      } else {
                        onOpenDemo('trial', { plan: plan.id });
                      }
                    }
                  }}
                >
                  {plan.ctaText}
                </Button>
              </div>
              </MotionReveal>
            );
          })}
        </div>

        {/* Enterprise Reassurance Footer */}
        <MotionReveal animation="fade-up" delay={200}>
          <div className="mt-14 text-center text-xs tracking-wider text-slate-500 dark:text-slate-400">
            Need custom SOC2 compliance reporting, custom data retention agreements, or invoice terms?{' '}
            <button
              onClick={() => onOpenDemo && onOpenDemo('contact', { plan: 'enterprise' })}
              className="text-[#a1741a] dark:text-[#D8B452] font-semibold underline hover:text-[#b8860b] dark:hover:text-[#F3D887] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              Talk with our Enterprise Architecture Team &rarr;
            </button>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
