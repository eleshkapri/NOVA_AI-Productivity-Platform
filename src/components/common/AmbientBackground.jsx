import React, { useEffect, useState } from 'react';

/**
 * AmbientBackground — Clean Luxury Ambient Lighting System
 * Inspired by Soufflet Malt:
 * - Subtle geometric dot matrix grid pattern
 * - Soft filmic noise texture
 * - Interactive mouse ambient golden spotlight (non-intrusive)
 * - Deep organic floating lighting orbs with blur-120px
 * - Zero visual clutter or distracting icons behind typography
 */
export function AmbientBackground() {
  const [mousePos, setMousePos] = useState({ x: -200, y: -200 });

  useEffect(() => {
    let ticking = false;
    const handleMouseMove = (e) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setMousePos({ x: e.clientX, y: e.clientY });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      {/* 1. Subtle Dot Matrix Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 dark:opacity-40" />

      {/* 2. Interactive Mouse Ambient Spotlight */}
      <div
        className="absolute inset-0 transition-opacity duration-300 opacity-70 dark:opacity-50"
        style={{
          background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(216, 180, 82, 0.07), transparent 75%)`,
        }}
      />

      {/* 3. Floating Organic Ambient Blur Lighting Orbs */}
      <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#D8B452]/20 via-[#F3D887]/10 to-transparent blur-[120px] animate-orb-1" />
      <div className="absolute top-1/3 -right-40 w-[650px] h-[650px] rounded-full bg-gradient-to-bl from-indigo-500/10 via-[#0b0c33]/40 dark:via-[#0b0c33]/70 to-transparent blur-[140px] animate-orb-2" />
      <div className="absolute bottom-10 left-1/4 w-[500px] h-[500px] rounded-full bg-[#D8B452]/10 blur-[110px] animate-orb-1" />

      {/* 4. Filmic Noise Texture */}
      <div className="absolute inset-0 bg-noise opacity-30 dark:opacity-50" />
    </div>
  );
}
