import React, { useEffect, useState, useRef } from 'react';

/**
 * Radar Target HUD Cursor
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

    let isRunning = false;

    const startAnimation = () => {
      if (!isRunning) {
        isRunning = true;
        animFrameId.current = requestAnimationFrame(animate);
      }
    };

    let lastTargetCheck = 0;
    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      setIsVisible((prev) => (!prev ? true : prev));
      startAnimation();

      // Check if hovering over clickable element (throttled to 40ms to avoid DOM traversal thrashing)
      const now = performance.now();
      if (now - lastTargetCheck > 40) {
        lastTargetCheck = now;
        const target = e.target;
        if (target) {
          const isInteractive = Boolean(
            target.closest(
              'a, button, [role="button"], [role="switch"], [role="tab"], .cursor-pointer, [data-cursor="pointer"], label, select, summary'
            )
          );
          setIsHovering((prev) => (prev !== isInteractive ? isInteractive : prev));
        }
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

    // Smooth Lerp loop for fluid trailing behind the cursor (pauses automatically when idle)
    const animate = () => {
      const targetX = mousePos.current.x;
      const targetY = mousePos.current.y;
      const dx = targetX - reticlePos.current.x;
      const dy = targetY - reticlePos.current.y;

      if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
        reticlePos.current.x = targetX;
        reticlePos.current.y = targetY;
        if (reticleRef.current) {
          reticleRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
        }
        isRunning = false;
        animFrameId.current = null;
        return;
      }

      reticlePos.current.x += dx * 0.25;
      reticlePos.current.y += dy * 0.25;

      if (reticleRef.current) {
        reticleRef.current.style.transform = `translate3d(${reticlePos.current.x}px, ${reticlePos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animFrameId.current = requestAnimationFrame(animate);
    };

    startAnimation();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

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
        {/* 1. Outer Dashed Radar Orbit Ring */}
        <div
          className={`rounded-full border border-dashed transition-all duration-300 ${
            isHovering
              ? 'w-18 h-18 border-[#FF5500] dark:border-[#FF7700] shadow-lg shadow-[#FF5500]/30'
              : 'w-14 h-14 border-orange-500/50 dark:border-[#FF5500]/60 shadow-xs'
          } animate-spin-slow`}
        >
          {/* Orbiting Satellite Star Accent at top */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-orange-600 dark:bg-[#FF7700] shadow-xs shadow-[#FF5500]" />
        </div>

        {/* 2. Inner Solid Concentric Ring */}
        <div
          className={`absolute rounded-full border transition-all duration-300 flex items-center justify-center ${
            isHovering
              ? 'w-9 h-9 border-orange-500 dark:border-[#FF7700] bg-orange-500/15 dark:bg-[#FF5500]/20 shadow-md shadow-[#FF5500]/30'
              : 'w-7 h-7 border-orange-500/60 dark:border-[#FF5500]/70 bg-orange-500/10 dark:bg-[#FF5500]/10'
          }`}
        >
          {/* 3. Center Target Core Dot */}
          <div
            className={`rounded-full bg-orange-600 dark:bg-[#FF5500] transition-all duration-200 ${
              isHovering ? 'w-2 h-2 scale-125' : 'w-1.5 h-1.5'
            }`}
          />
        </div>
      </div>
    </div>
  );
}
