import React, { useEffect, useState } from 'react';

/**
 * AmbientBackground — Pure CSS/SVG Luxury Motion Background (Zero Canvas)
 * Inspired by Soufflet Malt & Modern Awwwards Platforms:
 * - Fluid drifting animated gradient mesh orbs (animate-mesh-1, animate-mesh-2, animate-mesh-3)
 * - Sweeping angled aurora ambient light beams (animate-aurora-beam)
 * - Constellation of floating golden light motes & embers (animate-mote)
 * - Interactive mouse ambient spotlight tracking cursor
 * - Geometric dot matrix grid and filmic analog grain
 * - 100% pure CSS/SVG hardware accelerated, zero canvas clutter
 */

// Stable positions and delays for floating light motes
const LIGHT_MOTES = [
  { id: 1, left: '12%', top: '35%', size: 3.5, delay: '0s', duration: '9s' },
  { id: 2, left: '28%', top: '75%', size: 2.5, delay: '2.5s', duration: '11s' },
  { id: 3, left: '42%', top: '20%', size: 4, delay: '4s', duration: '10s' },
  { id: 4, left: '65%', top: '60%', size: 3, delay: '1.2s', duration: '12s' },
  { id: 5, left: '78%', top: '28%', size: 3.5, delay: '5s', duration: '9.5s' },
  { id: 6, left: '88%', top: '82%', size: 2.5, delay: '3.2s', duration: '10.5s' },
  { id: 7, left: '50%', top: '90%', size: 3, delay: '6.5s', duration: '11.5s' },
  { id: 8, left: '18%', top: '85%', size: 2, delay: '7s', duration: '8.5s' },
];

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

      {/* 2. Sweeping Angled Aurora Light Beams */}
      <div className="absolute -top-40 left-1/4 w-[700px] h-[1200px] bg-gradient-to-b from-[#D8B452]/15 via-[#F3D887]/5 to-transparent blur-[90px] animate-aurora-beam pointer-events-none" />
      <div className="absolute -top-60 right-1/4 w-[600px] h-[1100px] bg-gradient-to-b from-indigo-500/10 via-[#D8B452]/5 to-transparent blur-[100px] animate-aurora-beam pointer-events-none [animation-delay:4s]" />

      {/* 3. Fluid Animated Gradient Mesh Orbs (Pure CSS Motion) */}
      {/* Orb 1: Upper Golden Radiance */}
      <div className="absolute -top-32 -left-32 w-[720px] h-[720px] rounded-full bg-gradient-to-br from-[#D8B452]/25 via-[#F3D887]/15 to-transparent blur-[130px] animate-mesh-1" />

      {/* Orb 2: Cosmic Midnight Indigo Beam */}
      <div className="absolute top-1/4 -right-44 w-[780px] h-[780px] rounded-full bg-gradient-to-bl from-indigo-600/15 via-[#0b0c33]/45 dark:via-[#0b0c33]/75 to-transparent blur-[140px] animate-mesh-2" />

      {/* Orb 3: Central Champagne Gold Pulse */}
      <div className="absolute top-1/2 left-1/5 w-[620px] h-[620px] rounded-full bg-gradient-to-tr from-[#D8B452]/18 via-[#C49A32]/10 to-transparent blur-[120px] animate-mesh-3" />

      {/* Orb 4: Lower Warm Horizon Glow */}
      <div className="absolute -bottom-40 right-1/3 w-[700px] h-[700px] rounded-full bg-gradient-to-tl from-amber-400/15 via-[#07081e]/40 dark:via-[#07081e]/70 to-transparent blur-[130px] animate-mesh-1" />

      {/* 4. Constellation of Floating Golden Light Motes (Pure CSS Particles) */}
      <div className="absolute inset-0 pointer-events-none">
        {LIGHT_MOTES.map((mote) => (
          <span
            key={mote.id}
            className="absolute rounded-full bg-gradient-to-tr from-[#D8B452] to-[#FFF] shadow-md shadow-[#D8B452]/40 animate-mote"
            style={{
              left: mote.left,
              top: mote.top,
              width: `${mote.size}px`,
              height: `${mote.size}px`,
              animationDelay: mote.delay,
              animationDuration: mote.duration,
            }}
          />
        ))}
      </div>

      {/* 5. Interactive Mouse Ambient Spotlight */}
      <div
        className="absolute inset-0 transition-opacity duration-300 opacity-70 dark:opacity-50"
        style={{
          background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(216, 180, 82, 0.08), transparent 75%)`,
        }}
      />

      {/* 6. Filmic Luxury Noise Texture */}
      <div className="absolute inset-0 bg-noise opacity-30 dark:opacity-50" />
    </div>
  );
}
