import React, { useRef } from 'react';

/**
 * StackedCardSection
 * Encapsulates landing page sections into Floria-inspired stacking cards.
 * As the user scrolls down, each card pins at a sticky offset, and subsequent
 * cards slide up and stack on top of it with subtle scaling, rim lighting, and depth shadows.
 */
export function StackedCardSection({
  index = 0,
  total = 11,
  id,
  children,
  badge,
  eyebrow,
  className = '',
  topOffset,
}) {
  const cardRef = useRef(null);

  // Progressive sticky top offset: earlier cards pin slightly higher,
  // allowing a clean, layered deck-of-cards lip to remain visible at the top.
  // Desktop: 4.25rem + index * 6px (e.g. 68px, 74px, 80px...)
  // Mobile: 3.5rem + index * 2px
  const stickyTop = topOffset || `calc(4.25rem + ${Math.min(index * 6, 48)}px)`;

  // Dynamic z-index layering so subsequent cards smoothly glide over previous ones
  const zIndex = 10 + index * 5;

  return (
    <section
      id={id}
      style={{ zIndex }}
      className={`relative w-full ${className}`}
      aria-label={badge || `Section ${index + 1}`}
    >
      <div
        ref={cardRef}
        className="sticky w-full rounded-t-[2.5rem] sm:rounded-t-[3rem] md:rounded-t-[3.5rem] bg-[#F8FAFC] dark:bg-[#05060A] border-t border-slate-300/80 dark:border-white/15 border-x border-slate-200/50 dark:border-white/5 shadow-[0_-20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_-25px_60px_rgba(0,0,0,0.95)] transition-all duration-500 will-change-transform overflow-hidden floria-stack-card"
        style={{
          top: stickyTop,
        }}
      >
        {/* Luminous Cyber-Orange top rim edge (Floria signature ambient glow) */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF5500]/60 to-transparent pointer-events-none z-30" />

        {/* Card Header Conduit Shelf */}
        <div className="w-full flex items-center justify-between px-6 sm:px-12 pt-3.5 pb-2.5 border-b border-black/5 dark:border-white/5 bg-slate-100/50 dark:bg-zinc-950/50 backdrop-blur-md relative z-20 select-none">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#FF5500] shadow-[0_0_8px_#FF5500] animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-slate-700 dark:text-zinc-300">
              {badge || `SYSTEM // NODE 0${index + 1}`}
            </span>
          </div>

          <div className="flex items-center gap-3 text-[10px] font-mono text-slate-500 dark:text-zinc-500">
            {eyebrow && (
              <span className="hidden sm:inline-block font-medium text-slate-600 dark:text-zinc-400">
                {eyebrow}
              </span>
            )}
            <span className="px-2.5 py-0.5 rounded-full bg-slate-200/80 dark:bg-white/5 border border-slate-300/60 dark:border-white/10 font-bold text-slate-800 dark:text-zinc-200">
              {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Card Inner Content */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </section>
  );
}

export default StackedCardSection;
