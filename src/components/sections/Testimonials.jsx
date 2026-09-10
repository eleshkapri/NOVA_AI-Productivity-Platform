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
      className="py-14 md:py-20 bg-amber-50/15 dark:bg-[#07081e]/30 relative overflow-hidden backdrop-blur-xs"
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
          <div className="group bg-white/95 dark:bg-[#07081e]/60 rounded-[2.5rem] p-8 sm:p-14 border border-slate-200/90 dark:border-white/10 shadow-xl dark:shadow-2xl backdrop-blur-2xl transition-all duration-500 hover:border-[#D8B452]/50 hover:shadow-[0_20px_40px_-15px_rgba(104,51,255,0.25)] ring-1 ring-inset ring-white/5">
            {/* Top Stars & Gold Quote Icon */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-1.5 group-hover:scale-105 transition-transform duration-300">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#D8B452] text-[#D8B452]" />
                ))}
              </div>
              <Quote className="w-10 h-10 text-[#D8B452]/25 group-hover:text-[#D8B452]/50 group-hover:rotate-6 transition-all duration-300" />
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
                  className="w-13 h-13 rounded-full bg-gradient-to-tr from-[#6833FF] to-[#8E6FFF] flex items-center justify-center text-white font-extrabold text-sm shadow-md group-hover:scale-105 transition-transform duration-300"
                >
                  {current.avatarInitials}
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white tracking-wide">
                    {current.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                    {current.role} &bull; <span className="font-bold text-[#D8B452] dark:text-[#F3D887]">{current.company}</span>
                  </p>
                </div>
              </div>

              {/* Highlight Metric in Gold Badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-amber-50 dark:bg-[#D8B452]/10 border border-[#D8B452]/30 text-xs font-mono font-bold uppercase tracking-wider text-[#D8B452] dark:text-[#F3D887] self-start sm:self-auto hover:scale-105 transition-transform cursor-default">
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
                      ? 'w-9 bg-[#D8B452]'
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
                className="p-3 rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-[#07081e] text-slate-700 dark:text-zinc-300 hover:text-white dark:hover:text-white hover:bg-gradient-to-r hover:from-[#6833FF] hover:to-[#8E6FFF] hover:border-[#8E6FFF] hover:scale-115 active:scale-90 hover:shadow-lg hover:shadow-[#6833FF]/30 transition-all duration-300 shadow-sm cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8E6FFF]"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next testimonial"
                className="p-3 rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-[#07081e] text-slate-700 dark:text-zinc-300 hover:text-white dark:hover:text-white hover:bg-gradient-to-r hover:from-[#6833FF] hover:to-[#8E6FFF] hover:border-[#8E6FFF] hover:scale-115 active:scale-90 hover:shadow-lg hover:shadow-[#6833FF]/30 transition-all duration-300 shadow-sm cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8E6FFF]"
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
