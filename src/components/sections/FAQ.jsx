import React, { useState } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { faqData } from '../../data/faq';
import { ChevronDown } from 'lucide-react';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="py-24 md:py-36 bg-[#07081e]/80 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Direct Knowledge"
          title="Frequently Addressed"
          titleHighlight="Inquiries"
          description="Everything you need to understand regarding repository integration, data security guarantees, and enterprise tier capabilities."
        />

        {/* FAQ Accordion List with Gold Accents */}
        <div className="space-y-4">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={item.id}
                className="bg-[#0b0c33]/70 rounded-3xl border border-white/10 shadow-lg overflow-hidden transition-all duration-300 hover:border-[#D8B452]/40"
              >
                <button
                  onClick={() => handleToggle(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                  className="w-full px-7 py-6 flex items-center justify-between text-left gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D8B452]"
                >
                  <span className="text-base sm:text-lg font-bold text-white tracking-wide">
                    {item.question}
                  </span>
                  <div
                    className={`p-2 rounded-full bg-[#050614] text-[#D8B452] border border-[#D8B452]/30 transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180 bg-[#D8B452] text-black' : ''
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
                    <p className="px-7 pb-7 text-sm sm:text-base text-slate-300 leading-relaxed border-t border-white/10 pt-5 font-light">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Support Prompt */}
        <div className="mt-14 text-center text-sm text-slate-400">
          Have an inquiry not answered here?{' '}
          <a
            href="#footer"
            className="text-[#D8B452] font-semibold underline hover:text-[#F3D887]"
          >
            Connect with our engineering specialists &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
