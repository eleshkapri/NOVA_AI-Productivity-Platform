import React, { useEffect, useState, useRef } from 'react';

/**
 * Radar Target HUD Cursor (Exact design from user reference photo)
 * - Native mouse pointer (arrow) stays 100% visible & functional
 * - Inner solid amber/gold ring with center targeting dot
 * - Outer dashed radar orbit ring rotating smoothly
 * - Small orbiting satellite accent star
 * - Fluid lerp trailing following the cursor tip
 * - Expands & illuminates on buttons, links, and cards
 * - 100% non-blocking (pointer-events: none)
 */
export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const mousePos = useRef({ x: -100, y: -100 });
  const reticlePos = useRef({ x: -100, y: -100 });
  const reticleRef = useRef(null);
  const animFrameId = useRef(null);

  useEffect(() => {
    // Disable on touch devices
    const isTouchDevice =
      !window.matchMedia('(hover: hover) and (pointer: fine)').matches ||
      'ontouchstart' in window;

    if (isTouchDevice) return;

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (!isVisible) {
        setIsVisible(true);
        reticlePos.current = { x: e.clientX, y: e.clientY };
      }

      // Check if hovering over clickable element
      const target = e.target;
      if (target) {
        const isInteractive = target.closest(
          'a, button, [role="button"], [role="switch"], [role="tab"], .cursor-pointer, [data-cursor="pointer"], label, select, summary'
        );
        setIsHovering(!!isInteractive);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Smooth Lerp loop for fluid trailing behind the cursor
    const animate = () => {
      const targetX = mousePos.current.x;
      const targetY = mousePos.current.y;

      // Smooth trailing interpolation
      reticlePos.current.x += (targetX - reticlePos.current.x) * 0.22;
      reticlePos.current.y += (targetY - reticlePos.current.y) * 0.22;

      if (reticleRef.current) {
        reticleRef.current.style.transform = `translate3d(${reticlePos.current.x}px, ${reticlePos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animFrameId.current = requestAnimationFrame(animate);
    };

    animFrameId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isVisible]);

  // Touch screen safeguard
  if (typeof window !== 'undefined') {
    const isTouch =
      !window.matchMedia('(hover: hover) and (pointer: fine)').matches ||
      'ontouchstart' in window;
    if (isTouch) return null;
  }

  return (
    <div
      ref={reticleRef}
      className={`pointer-events-none fixed top-0 left-0 z-[9999] will-change-transform transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        transform: 'translate(-50%, -50%)',
      }}
      aria-hidden="true"
    >
      <div
        className={`relative flex items-center justify-center transition-transform duration-200 ease-out ${
          isClicking ? 'scale-85' : isHovering ? 'scale-120' : 'scale-100'
        }`}
      >
        {/* 1. Outer Dashed Radar Orbit Ring (Exactly like reference photo) */}
        <div
          className={`rounded-full border border-dashed transition-all duration-300 ${
            isHovering
              ? 'w-18 h-18 border-[#D8B452] dark:border-[#F3D887] shadow-lg shadow-[#D8B452]/30'
              : 'w-14 h-14 border-[#a1741a]/60 dark:border-[#D8B452]/70 shadow-xs'
          } animate-spin-slow`}
        >
          {/* Orbiting Satellite Star Accent at top */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#a1741a] dark:bg-[#F3D887] shadow-xs shadow-[#D8B452]" />
        </div>

        {/* 2. Inner Solid Concentric Ring */}
        <div
          className={`absolute rounded-full border transition-all duration-300 flex items-center justify-center ${
            isHovering
              ? 'w-9 h-9 border-[#a1741a] dark:border-[#F3D887] bg-amber-400/15 dark:bg-[#D8B452]/20 shadow-md shadow-[#D8B452]/30'
              : 'w-7 h-7 border-[#a1741a] dark:border-[#D8B452] bg-[#D8B452]/10 dark:bg-[#D8B452]/10'
          }`}
        >
          {/* 3. Center Target Core Dot */}
          <div
            className={`rounded-full bg-[#a1741a] dark:bg-[#F3D887] transition-all duration-200 ${
              isHovering ? 'w-2 h-2 scale-125' : 'w-1.5 h-1.5'
            }`}
          />
        </div>
      </div>
    </div>
  );
}
