import React, { useEffect, useState, useRef } from 'react';

/**
 * Luxury Custom Mouse Cursor (Inspired by Soufflet Malt & Awwwards sites)
 * - Pinpoint inner golden dot (instant 1:1 tracking)
 * - Fluid outer trailing halo ring (requestAnimationFrame linear interpolation)
 * - Expands & illuminates on buttons, links, and cards
 * - Tactile compression on mousedown click
 * - Automatically disabled on touch / mobile devices
 * - Fully non-blocking (pointer-events: none)
 */
export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTextInput, setIsTextInput] = useState(false);

  // Position coordinates
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const animFrameId = useRef(null);

  useEffect(() => {
    // Only enable on desktop with fine mouse pointer
    const isTouchDevice =
      !window.matchMedia('(hover: hover) and (pointer: fine)').matches ||
      'ontouchstart' in window;

    if (isTouchDevice) {
      return;
    }

    // Add active class to hide native cursor cleanly
    document.documentElement.classList.add('custom-cursor-active');

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (!isVisible) {
        setIsVisible(true);
        // Instant sync on first mouse movement
        ringPos.current = { x: e.clientX, y: e.clientY };
      }

      // Check if hovering over interactive element
      const target = e.target;
      if (target) {
        const isInteractive = target.closest(
          'a, button, [role="button"], [role="switch"], [role="tab"], .cursor-pointer, [data-cursor="pointer"], label, select, summary'
        );
        const isInput = target.closest('input, textarea');

        setIsHovering(!!isInteractive && !isInput);
        setIsTextInput(!!isInput);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseLeave = () => {
      setIsVisible(false);
      document.documentElement.classList.remove('custom-cursor-active');
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
      document.documentElement.classList.add('custom-cursor-active');
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Smooth Lerp Animation Loop for Trailing Halo Ring
    const animate = () => {
      const targetX = mousePos.current.x;
      const targetY = mousePos.current.y;

      // Update inner dot immediately for 0ms response latency
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
      }

      // Lerp ring with fluid trailing easing (0.16)
      ringPos.current.x += (targetX - ringPos.current.x) * 0.16;
      ringPos.current.y += (targetY - ringPos.current.y) * 0.16;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
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
      document.documentElement.classList.remove('custom-cursor-active');
    };
  }, [isVisible]);

  // If on mobile/touch, do not render
  if (typeof window !== 'undefined') {
    const isTouch =
      !window.matchMedia('(hover: hover) and (pointer: fine)').matches ||
      'ontouchstart' in window;
    if (isTouch) return null;
  }

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* 1. Fluid Trailing Halo Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none will-change-transform transition-[width,height,background-color,border-color,box-shadow] duration-200 ease-out flex items-center justify-center ${
          isTextInput
            ? 'w-6 h-6 border border-[#a1741a]/40 dark:border-[#D8B452]/40 opacity-40'
            : isHovering
            ? 'w-14 h-14 border-2 border-[#a1741a] dark:border-[#D8B452] bg-amber-400/15 dark:bg-[#D8B452]/20 shadow-xl shadow-[#D8B452]/30 scale-100'
            : isClicking
            ? 'w-7 h-7 border border-[#a1741a] dark:border-[#D8B452] bg-amber-400/25 dark:bg-[#D8B452]/30 scale-90'
            : 'w-9 h-9 border border-[#a1741a]/60 dark:border-[#D8B452]/70 bg-transparent shadow-xs'
        }`}
        style={{
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* 2. Crisp Pinpoint Center Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none will-change-transform transition-[transform,opacity,width,height,background-color] duration-150 ease-out ${
          isTextInput
            ? 'opacity-0'
            : isHovering
            ? 'w-2 h-2 bg-[#a1741a] dark:bg-[#F3D887] shadow-sm shadow-[#D8B452]'
            : isClicking
            ? 'w-3 h-3 bg-[#8c6210] dark:bg-[#FFFFFF] scale-125'
            : 'w-2 h-2 bg-[#a1741a] dark:bg-[#D8B452] shadow-xs'
        }`}
        style={{
          transform: 'translate(-50%, -50%)',
        }}
      />
    </div>
  );
}
