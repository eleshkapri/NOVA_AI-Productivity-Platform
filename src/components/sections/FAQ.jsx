import React, { useState } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { MotionReveal } from '../common/MotionReveal';
import { faqData } from '../../data/faq';
import { ChevronDown } from 'lucide-react';
import { smoothScrollService } from '../../services/SmoothScrollService';

export function FAQ({ onOpenDemo }) {
  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="py-10 md:py-14 bg-orange-500/[0.015] dark:bg-zinc-950/40 relative backdrop-blur-xs">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <MotionReveal animation="fade-up">
          <SectionHeader
            eyebrow="Direct Knowledge Base"
            eyebrowVariant="orange"
            title="Frequently Addressed"
            titleHighlight="Inquiries"
            description="Everything you need to understand regarding repository integration, data security guarantees, and enterprise tier capabilities."
          />
        </MotionReveal>

        {/* FAQ Accordion List with Cyber-Orange Accents */}
        <div className="space-y-4">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <MotionReveal key={item.id} animation="fade-up" delay={index * 60}>
                <div
                  className="group bg-white/95 dark:bg-zinc-900/40 rounded-[2rem] border border-slate-200/90 dark:border-white/10 shadow-md dark:shadow-xl overflow-hidden transition-all duration-300 hover:border-[#FF5500]/50 hover:shadow-xl hover:shadow-[#FF5500]/10 ring-1 ring-inset ring-white/5"
                >
                  <button
                    onClick={() => handleToggle(index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${item.id}`}
                    className="w-full px-7 py-6 flex items-center justify-between text-left gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5500]"
                  >
                    <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-orange-500 dark:group-hover:text-orange-400 tracking-tight transition-colors">
                      {item.question}
                    </span>
                    <div
                      className={`p-2 rounded-full bg-slate-100 dark:bg-zinc-950 text-orange-600 dark:text-orange-500 border border-slate-300 dark:border-orange-500/30 group-hover:scale-110 group-hover:border-orange-500 transition-all duration-300 shrink-0 shadow-2xs ${
                        isOpen ? 'rotate-180 bg-[#FF5500] text-black border-transparent' : ''
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {/* Animated Body Container */}
                  <div
                    id={`faq-answer-${item.id}`}
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-7 pb-7 text-sm sm:text-base text-slate-600 dark:text-zinc-300 leading-relaxed border-t border-slate-100 dark:border-white/10 pt-5 font-normal">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </MotionReveal>
            );
          })}
        </div>

        {/* Support Prompt */}
        <MotionReveal animation="fade-up" delay={150}>
          <div className="mt-14 text-center text-sm text-slate-500 dark:text-zinc-400">
            Have an inquiry not answered here?{' '}
            <button
              onClick={() => onOpenDemo ? onOpenDemo('contact') : smoothScrollService.scrollTo('#footer', { duration: 1.5 })}
              className="text-orange-600 dark:text-orange-400 font-semibold underline hover:text-orange-500 dark:hover:text-orange-300 hover:scale-105 inline-block transition-transform cursor-pointer"
            >
              Connect with our engineering specialists &rarr;
            </button>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
