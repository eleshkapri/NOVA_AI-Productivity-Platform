import React, { useState } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { pricingPlans } from '../../data/pricing';
import { Check, X, Sparkles, ArrowRight } from 'lucide-react';

export function Pricing({ onOpenDemo }) {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section id="pricing" className="py-20 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Transparent & Predictable"
          title="Invest in Developer Velocity,"
          titleHighlight="Not Bloated Seat Licenses"
          description="Every plan includes access to our core autonomous AI engine. Scale smoothly as your engineering team expands."
        />

        {/* Monthly / Annual Billing Toggle (Bonus Feature) */}
        <div className="flex items-center justify-center gap-4 mb-14">
          <span
            className={`text-sm font-semibold cursor-pointer ${
              !isAnnual ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500'
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
            className="w-14 h-8 flex items-center bg-slate-200 dark:bg-slate-700 rounded-full p-1 cursor-pointer transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <div
              className={`bg-indigo-600 w-6 h-6 rounded-full shadow-md transform transition-transform duration-200 ${
                isAnnual ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>

          <div className="flex items-center gap-2">
            <span
              className={`text-sm font-semibold cursor-pointer ${
                isAnnual ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500'
              }`}
              onClick={() => setIsAnnual(true)}
            >
              Annual Billing
            </span>
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300/60 dark:border-emerald-800/60 animate-pulse">
              Save 20%
            </span>
          </div>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {pricingPlans.map((plan) => {
            const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;

            return (
              <div
                key={plan.id}
                className={`relative bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-9 border flex flex-col justify-between transition-all duration-300 hover:shadow-2xl ${
                  plan.isPopular
                    ? 'border-indigo-500 dark:border-indigo-500 shadow-xl shadow-indigo-500/10 scale-102 lg:-translate-y-2'
                    : 'border-slate-200/80 dark:border-slate-800 shadow-sm'
                }`}
              >
                {/* Popular Banner */}
                {plan.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-extrabold uppercase tracking-wider px-4 py-1 rounded-full shadow-md flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> Most Popular
                    </span>
                  </div>
                )}

                <div>
                  {/* Plan Name & Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {plan.name}
                    </h3>
                    <Badge variant={plan.isPopular ? 'indigo' : 'slate'}>
                      {plan.badge}
                    </Badge>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6 min-h-[40px]">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline gap-1.5 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">
                      ${price}
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
                      {plan.period === 'forever' ? '/ forever' : isAnnual ? '/ user / mo (billed yearly)' : '/ user / mo'}
                    </span>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
                      Included in {plan.name}:
                    </p>

                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}

                    {plan.notIncluded &&
                      plan.notIncluded.map((feature, i) => (
                        <div
                          key={`not-${i}`}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-400 dark:text-slate-600 line-through"
                        >
                          <X className="w-4 h-4 text-slate-300 dark:text-slate-700 shrink-0 mt-0.5" />
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
                    if (plan.id === 'enterprise') {
                      onOpenDemo();
                    } else {
                      alert(`Redirecting to registration for ${plan.name} plan...`);
                    }
                  }}
                >
                  {plan.ctaText}
                </Button>
              </div>
            );
          })}
        </div>

        {/* Enterprise Reassurance Footer */}
        <div className="mt-12 text-center text-xs text-slate-500 dark:text-slate-400">
          Need custom SOC2 compliance reports, custom data retention agreements, or invoice payment terms?{' '}
          <button
            onClick={onOpenDemo}
            className="text-indigo-600 dark:text-indigo-400 font-semibold underline hover:text-indigo-500 cursor-pointer"
          >
            Talk with our Enterprise Engineering team &rarr;
          </button>
        </div>
      </div>
    </section>
  );
}
