import React, { useState } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { MotionReveal } from '../common/MotionReveal';
import { faqData } from '../../data/faq';
import { ChevronDown } from 'lucide-react';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="py-24 md:py-36 bg-amber-50/20 dark:bg-[#07081e]/80 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <MotionReveal animation="fade-up">
          <SectionHeader
            eyebrow="Direct Knowledge"
            title="Frequently Addressed"
            titleHighlight="Inquiries"
            description="Everything you need to understand regarding repository integration, data security guarantees, and enterprise tier capabilities."
          />
        </MotionReveal>

        {/* FAQ Accordion List with Gold Accents */}
        <div className="space-y-4">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <MotionReveal key={item.id} animation="fade-up" delay={index * 60}>
                <div
                  className="group bg-white/95 dark:bg-[#0b0c33]/70 rounded-3xl border border-slate-200/90 dark:border-white/10 shadow-md dark:shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-[#a1741a] dark:hover:border-[#D8B452] hover:shadow-xl hover:shadow-[#D8B452]/15"
                >
                  <button
                    onClick={() => handleToggle(index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${item.id}`}
                    className="w-full px-7 py-6 flex items-center justify-between text-left gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D8B452]"
                  >
                    <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#a1741a] dark:group-hover:text-[#F3D887] tracking-wide transition-colors">
                      {item.question}
                    </span>
                    <div
                      className={`p-2 rounded-full bg-slate-100 dark:bg-[#050614] text-[#a1741a] dark:text-[#D8B452] border border-slate-200 dark:border-[#D8B452]/30 group-hover:scale-110 group-hover:border-[#a1741a] dark:group-hover:border-[#D8B452] transition-all duration-300 shrink-0 ${
                        isOpen ? 'rotate-180 bg-[#D8B452] text-black border-transparent' : ''
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
                      <p className="px-7 pb-7 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-white/10 pt-5 font-normal">
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
          <div className="mt-14 text-center text-sm text-slate-500 dark:text-slate-400">
            Have an inquiry not answered here?{' '}
            <a
              href="#footer"
              className="text-[#a1741a] dark:text-[#D8B452] font-semibold underline hover:text-[#b8860b] dark:hover:text-[#F3D887] hover:scale-105 inline-block transition-transform"
            >
              Connect with our engineering specialists &rarr;
            </a>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
