import React, { useState } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { MotionReveal } from '../common/MotionReveal';
import { faqData } from '../../data/faq';
import { ChevronDown } from 'lucide-react';

export function FAQ({ onOpenDemo }) {
  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="py-16 md:py-24 relative backdrop-blur-xs">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <MotionReveal animation="fade-up">
          <SectionHeader
            eyebrow="Direct Knowledge Base"
            eyebrowVariant="gold"
            title="Frequently Addressed"
            titleHighlight="Inquiries"
            description="Everything you need to understand regarding repository integration, data security guarantees, and enterprise tier capabilities."
          />
        </MotionReveal>

        {/* FAQ Accordion List with Liquid Gold & Purple Accents */}
        <div className="space-y-4">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <MotionReveal key={item.id} animation="fade-up" delay={index * 60}>
                <div
                  className="group bg-white/95 dark:bg-[#07081e]/60 rounded-[2rem] border border-slate-200/90 dark:border-white/10 shadow-md dark:shadow-xl overflow-hidden transition-all duration-300 hover:border-[#D8B452]/50 hover:shadow-[0_20px_40px_-15px_rgba(104,51,255,0.2)] ring-1 ring-inset ring-white/5"
                >
                  <button
                    onClick={() => handleToggle(index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${item.id}`}
                    className="w-full px-7 py-6 flex items-center justify-between text-left gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8E6FFF]"
                  >
                    <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#D8B452] dark:group-hover:text-[#F3D887] tracking-tight transition-colors">
                      {item.question}
                    </span>
                    <div
                      className={`p-2 rounded-full bg-slate-100 dark:bg-zinc-950 text-[#D8B452] border border-slate-200 dark:border-[#D8B452]/30 group-hover:scale-110 group-hover:border-[#D8B452] transition-all duration-300 shrink-0 ${
                        isOpen ? 'rotate-180 bg-gradient-to-r from-[#6833FF] to-[#8E6FFF] text-white border-transparent' : ''
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
              onClick={() => onOpenDemo ? onOpenDemo('contact') : document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-[#D8B452] dark:text-[#F3D887] font-semibold underline hover:text-[#F3D887] hover:scale-105 inline-block transition-transform cursor-pointer"
            >
              Connect with our engineering specialists &rarr;
            </button>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
