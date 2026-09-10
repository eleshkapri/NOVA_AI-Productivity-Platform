import React, { useState, useEffect, useRef } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { MotionReveal } from '../common/MotionReveal';
import { testimonialsData } from '../../data/testimonials';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = testimonialsData.length;
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!isPaused) {
      timeoutRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % total);
      }, 5000);
    }

    return () => {
      if (timeoutRef.current) {
        clearInterval(timeoutRef.current);
      }
    };
  }, [isPaused, total]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const current = testimonialsData[currentIndex];

  return (
    <section
      id="testimonials"
      className="pt-12 md:pt-16 pb-4 md:pb-6 bg-amber-50/15 dark:bg-[#07081e]/30 relative overflow-hidden backdrop-blur-xs"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MotionReveal animation="fade-up">
          <SectionHeader
            eyebrow="Industry Endorsements"
            title="Acclaimed by High-Growth"
            titleHighlight="Engineering Organizations"
            description="Discover how technical leaders accelerate their release cadences and cultivate deep developer focus with NOVA."
          />
        </MotionReveal>

        {/* Carousel Container */}
        <MotionReveal animation="fade-up" delay={120}>
          <div className="max-w-4xl mx-auto relative">
          <div className="group bg-white/95 dark:bg-zinc-900/40 rounded-[2.5rem] p-8 sm:p-14 border border-slate-200/90 dark:border-white/10 shadow-xl dark:shadow-2xl backdrop-blur-2xl transition-all duration-500 hover:border-[#FF5500]/50 hover:shadow-2xl hover:shadow-[#FF5500]/15 ring-1 ring-inset ring-white/5">
            {/* Top Stars & Orange Quote Icon */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-1.5 group-hover:scale-105 transition-transform duration-300">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#FF5500] text-[#FF5500]" />
                ))}
              </div>
              <Quote className="w-10 h-10 text-orange-500/20 group-hover:text-orange-500/40 group-hover:rotate-6 transition-all duration-300" />
            </div>

            {/* Quote Body with Editorial Typography */}
            <p className="text-xl sm:text-2xl md:text-3xl font-medium text-slate-800 dark:text-slate-100 leading-relaxed min-h-[110px] mb-10 tracking-tight">
              "{current.quote}"
            </p>

            {/* Author Details & Highlight */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pt-8 border-t border-slate-100 dark:border-white/10">
              <div className="flex items-center gap-4">
                {/* Initials Avatar */}
                <div
                  className="w-13 h-13 rounded-full bg-gradient-to-tr from-[#FF5500] to-[#CC4400] flex items-center justify-center text-black font-extrabold text-sm shadow-md group-hover:scale-105 transition-transform duration-300"
                >
                  {current.avatarInitials}
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white tracking-wide">
                    {current.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                    {current.role} &bull; <span className="font-bold text-orange-500 dark:text-[#FF7700]">{current.company}</span>
                  </p>
                </div>
              </div>

              {/* Highlight Metric in Orange Badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-50 dark:bg-orange-500/10 border border-orange-500/30 text-xs font-mono font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400 self-start sm:self-auto hover:scale-105 transition-transform cursor-default">
                ★ {current.highlight}
              </div>
            </div>
          </div>

          {/* Carousel Controls: Arrows & Dots */}
          <div className="flex items-center justify-between mt-10 px-3">
            {/* Dots */}
            <div className="flex items-center gap-2.5">
              {testimonialsData.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer hover:scale-125 ${
                    currentIndex === i
                      ? 'w-9 bg-[#FF5500]'
                      : 'w-2 bg-slate-300 dark:bg-white/20 hover:bg-slate-400 dark:hover:bg-white/50'
                  }`}
                />
              ))}
            </div>

            {/* Prev/Next Arrows */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                aria-label="Previous testimonial"
                className="p-3 rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 hover:text-black dark:hover:text-black hover:bg-[#FF5500] dark:hover:bg-[#FF5500] hover:border-[#FF5500] hover:scale-115 active:scale-90 hover:shadow-lg hover:shadow-[#FF5500]/30 transition-all duration-300 shadow-sm cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5500]"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next testimonial"
                className="p-3 rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 hover:text-black dark:hover:text-black hover:bg-[#FF5500] dark:hover:bg-[#FF5500] hover:border-[#FF5500] hover:scale-115 active:scale-90 hover:shadow-lg hover:shadow-[#FF5500]/30 transition-all duration-300 shadow-sm cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5500]"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        </MotionReveal>
      </div>
    </section>
  );
}
