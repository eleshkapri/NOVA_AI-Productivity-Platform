import React, { useState, useEffect, useRef } from 'react';
import { SectionHeader } from '../common/SectionHeader';
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
      className="py-24 md:py-36 bg-[#07081e]/90 relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Industry Endorsements"
          title="Acclaimed by High-Growth"
          titleHighlight="Engineering Organizations"
          description="Discover how technical leaders accelerate their release cadences and cultivate deep developer focus with NOVA."
        />

        {/* Carousel Container */}
        <div className="max-w-4xl mx-auto relative">
          <div className="bg-[#0b0c33]/70 rounded-3xl p-8 sm:p-14 border border-[#D8B452]/25 shadow-2xl backdrop-blur-2xl transition-all duration-300">
            {/* Top Stars & Gold Quote Icon */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-1.5">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#D8B452] text-[#D8B452]" />
                ))}
              </div>
              <Quote className="w-10 h-10 text-[#D8B452]/25" />
            </div>

            {/* Quote Body with Editorial Typography */}
            <p className="text-xl sm:text-2xl md:text-3xl font-light text-slate-100 leading-relaxed min-h-[110px] mb-10 font-serif italic">
              "{current.quote}"
            </p>

            {/* Author Details & Highlight */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pt-8 border-t border-white/10">
              <div className="flex items-center gap-4">
                {/* Initials Avatar */}
                <div
                  className="w-13 h-13 rounded-full bg-gradient-to-tr from-[#D8B452] to-[#B38722] flex items-center justify-center text-black font-extrabold text-sm shadow-md shadow-[#D8B452]/25"
                >
                  {current.avatarInitials}
                </div>
                <div>
                  <h4 className="text-base font-bold text-white tracking-wide">
                    {current.name}
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {current.role} &bull; <span className="font-bold text-[#D8B452]">{current.company}</span>
                  </p>
                </div>
              </div>

              {/* Highlight Metric in Gold Badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#D8B452]/10 border border-[#D8B452]/30 text-xs font-bold uppercase tracking-wider text-[#D8B452] self-start sm:self-auto">
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
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === i
                      ? 'w-9 bg-[#D8B452]'
                      : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            {/* Prev/Next Arrows */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                aria-label="Previous testimonial"
                className="p-3 rounded-full border border-white/10 bg-[#0b0c33] text-slate-300 hover:text-[#D8B452] hover:border-[#D8B452]/50 transition-colors shadow-sm cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D8B452]"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next testimonial"
                className="p-3 rounded-full border border-white/10 bg-[#0b0c33] text-slate-300 hover:text-[#D8B452] hover:border-[#D8B452]/50 transition-colors shadow-sm cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D8B452]"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
