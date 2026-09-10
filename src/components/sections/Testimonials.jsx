import React, { useState } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { MotionReveal } from '../common/MotionReveal';
import { testimonialsData } from '../../data/testimonials';
import { Star, Quote, ShieldCheck, Zap, Sparkles, Play, Pause } from 'lucide-react';

export function Testimonials() {
  const [isPaused, setIsPaused] = useState(false);

  // Triple the data items to guarantee a 100% seamless, gapless infinite loop
  const marqueeCards = [...testimonialsData, ...testimonialsData, ...testimonialsData];

  return (
    <section
      id="testimonials"
      className="py-16 md:py-20 bg-amber-50/15 dark:bg-zinc-950/40 relative overflow-hidden backdrop-blur-xs"
    >
      {/* Ambient Cyber-Orange Glow behind the conduit */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FF5500]/30 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#FF5500]/20 to-transparent" />

      {/* Left & Right Edge Dissolve Gradient Masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-44 bg-gradient-to-r from-[#F8FAFC] dark:from-[#05060A] to-transparent z-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-44 bg-gradient-to-l from-[#F8FAFC] dark:from-[#05060A] to-transparent z-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MotionReveal animation="fade-up">
          <SectionHeader
            eyebrow="Industry Endorsements"
            title="Acclaimed by High-Growth"
            titleHighlight="Engineering Organizations"
            description="Discover how technical leaders accelerate their release cadences and cultivate deep developer focus with NOVA."
          />
        </MotionReveal>

        {/* Live Peer Validation Telemetry Bar */}
        <MotionReveal animation="fade-up" delay={80}>
          <div className="mt-8 mb-12 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs font-mono text-slate-600 dark:text-zinc-400">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-zinc-950/70 border border-slate-200 dark:border-white/10 shadow-xs backdrop-blur-md">
              <div className="flex items-center text-[#FF5500]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-current" />
                ))}
              </div>
              <span className="font-bold text-slate-900 dark:text-white">4.98 / 5.0</span>
              <span className="text-[10px] text-slate-400">(1,240+ Reviews)</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-zinc-950/70 border border-slate-200 dark:border-white/10 shadow-xs backdrop-blur-md">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span className="font-bold text-slate-900 dark:text-white">100% Verified Production Teams</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-zinc-950/70 border border-slate-200 dark:border-white/10 shadow-xs backdrop-blur-md">
              <Zap className="w-3.5 h-3.5 text-[#FF5500]" />
              <span className="font-bold text-slate-900 dark:text-white">14.2 hrs/week</span>
              <span className="text-[10px] text-slate-400">Saved per Dev</span>
            </div>

            {/* Play/Pause Motion Toggle Control */}
            <button
              type="button"
              onClick={() => setIsPaused((prev) => !prev)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-white/10 hover:border-[#FF5500]/40 text-slate-700 dark:text-zinc-300 hover:text-[#FF5500] transition-all duration-200 cursor-pointer text-[11px] font-mono active:scale-95 shadow-2xs"
              title={isPaused ? 'Resume ticker motion' : 'Pause ticker motion'}
              aria-label={isPaused ? 'Resume motion' : 'Pause motion'}
            >
              {isPaused ? (
                <>
                  <Play className="w-3 h-3 fill-current text-[#FF5500]" />
                  <span>RESUME</span>
                </>
              ) : (
                <>
                  <Pause className="w-3 h-3 fill-current text-slate-400" />
                  <span>PAUSE</span>
                </>
              )}
            </button>
          </div>
        </MotionReveal>
      </div>

      {/* Infinite Smooth Motion Marquee Track (Like in the photo) */}
      <div
        className="relative overflow-hidden py-3"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <div
          className="animate-marquee-slow flex items-center gap-5 sm:gap-7"
          style={{
            animationPlayState: isPaused ? 'paused' : 'running',
          }}
        >
          {marqueeCards.map((testimonial, idx) => (
            <div
              key={`${testimonial.id}-${idx}`}
              className="w-[340px] sm:w-[410px] shrink-0 group bg-white/95 dark:bg-zinc-900/60 rounded-[2rem] p-6 sm:p-7 border border-slate-200/80 dark:border-white/10 shadow-lg dark:shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-[#FF5500]/50 hover:shadow-2xl hover:shadow-[#FF5500]/15 hover:-translate-y-1 ring-1 ring-inset ring-white/5 select-none"
            >
              {/* Top Row: Stars + Quote Icon + Category */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1 group-hover:scale-105 transition-transform duration-200">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FF5500] text-[#FF5500]" />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    <Sparkles className="w-2.5 h-2.5" />
                    Verified
                  </span>
                  <Quote className="w-6 h-6 text-orange-500/25 group-hover:text-orange-500/50 group-hover:rotate-6 transition-all duration-300" />
                </div>
              </div>

              {/* Quote Body with Editorial Typography */}
              <p className="text-sm sm:text-[15px] font-medium text-slate-800 dark:text-slate-100 leading-relaxed min-h-[82px] mb-6 tracking-tight line-clamp-4">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Bottom Row: Author + Company + Highlight Badge */}
              <div className="pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  {/* Initials Avatar */}
                  <div
                    className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FF5500] to-[#CC4400] flex items-center justify-center text-black font-extrabold text-xs shadow-md group-hover:scale-105 transition-transform duration-300 shrink-0"
                  >
                    {testimonial.avatarInitials}
                  </div>
                  <div className="truncate">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white tracking-wide truncate">
                      {testimonial.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-zinc-400 truncate">
                      {testimonial.role} &bull; <span className="font-bold text-orange-500 dark:text-[#FF7700]">{testimonial.company}</span>
                    </p>
                  </div>
                </div>

                {/* Highlight Metric Badge */}
                <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-orange-50 dark:bg-orange-500/10 border border-orange-300 dark:border-orange-500/30 text-[10px] font-mono font-extrabold uppercase tracking-wider text-orange-950 dark:text-orange-400 shrink-0 group-hover:scale-105 transition-transform shadow-2xs whitespace-nowrap">
                  ★ {testimonial.highlight}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
