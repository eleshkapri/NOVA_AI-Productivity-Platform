import React, { useState, useEffect, useRef } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { testimonialsData } from '../../data/testimonials';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = testimonialsData.length;
  const timeoutRef = useRef(null);

  // Auto-play interval (5 seconds) with pause on hover
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
      className="py-20 md:py-32 bg-slate-50/50 dark:bg-slate-900/30 relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Customer Endorsements"
          title="Loved by High-Growth"
          titleHighlight="Engineering Orgs"
          description="Hear how modern tech teams use NOVA to deliver predictable sprints and eliminate developer burnout."
        />

        {/* Carousel Container */}
        <div className="max-w-4xl mx-auto relative">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-200/80 dark:border-slate-800 shadow-xl transition-all duration-300">
            {/* Top Stars & Quote Icon */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-1">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <Quote className="w-8 h-8 text-indigo-200 dark:text-indigo-900/60" />
            </div>

            {/* Quote Body */}
            <p className="text-lg sm:text-2xl font-medium text-slate-800 dark:text-slate-100 leading-relaxed min-h-[100px] mb-8">
              "{current.quote}"
            </p>

            {/* Author Details & Highlight */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3.5">
                {/* Initials Avatar */}
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-tr ${current.avatarBg} flex items-center justify-center text-white font-bold text-sm shadow-md shadow-indigo-500/20`}
                >
                  {current.avatarInitials}
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    {current.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {current.role} &bull; <span className="font-semibold text-indigo-600 dark:text-indigo-400">{current.company}</span>
                  </p>
                </div>
              </div>

              {/* Highlight Metric */}
              <div className="inline-flex items-center px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/70 dark:border-emerald-800/60 text-xs font-bold text-emerald-700 dark:text-emerald-300 self-start sm:self-auto">
                ★ {current.highlight}
              </div>
            </div>
          </div>

          {/* Carousel Controls: Arrows & Dots */}
          <div className="flex items-center justify-between mt-8 px-2">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonialsData.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === i
                      ? 'w-8 bg-indigo-600'
                      : 'w-2.5 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>

            {/* Prev/Next Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous testimonial"
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors shadow-xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next testimonial"
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors shadow-xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
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
