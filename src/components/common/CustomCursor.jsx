import React, { useEffect, useState, useRef } from 'react';

/**
 * Luxury Custom Mouse Cursor (Inspired by Soufflet Malt & Awwwards sites)
 * - Pinpoint inner golden dot (instant 1:1 tracking)
 * - Fluid outer trailing halo ring (requestAnimationFrame linear interpolation)
 * - Expands & illuminates on buttons, links, and cards
 * - Tactile compression on mousedown click
 * - Guaranteed native cursor hiding on all desktop browsers & Windows touch screens
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
  const isVisibleRef = useRef(false);
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const animFrameId = useRef(null);

  useEffect(() => {
    // Hide system cursor immediately on mount
    document.documentElement.classList.add('custom-cursor-active');

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
        document.documentElement.classList.add('custom-cursor-active');
        // Synchronize ring position instantly on first detected motion
        ringPos.current = { x: e.clientX, y: e.clientY };
      }

      // Check if hovering over interactive element
      const target = e.target;
      if (target) {
        const isInteractive = target.closest(
          'a, button, [role="button"], [role="switch"], [role="tab"], .cursor-pointer, [data-cursor="pointer"], label, select, summary'
        );
        const isInput = target.closest('input, textarea, [contenteditable="true"]');

        setIsHovering(!!isInteractive && !isInput);
        setIsTextInput(!!isInput);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseLeave = () => {
      isVisibleRef.current = false;
      setIsVisible(false);
      document.documentElement.classList.remove('custom-cursor-active');
    };

    const handleMouseEnter = () => {
      isVisibleRef.current = true;
      setIsVisible(true);
      document.documentElement.classList.add('custom-cursor-active');
    };

    const handleTouchStart = () => {
      // If user physically touches the screen, disable custom cursor
      isVisibleRef.current = false;
      setIsVisible(false);
      document.documentElement.classList.remove('custom-cursor-active');
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });

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
      window.removeEventListener('touchstart', handleTouchStart);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      document.documentElement.classList.remove('custom-cursor-active');
    };
  }, []); // Run once on mount!

  return (
    <>
      {/* Fallback CSS to guarantee complete suppression of native OS cursor */}
      <style>{`
        html.custom-cursor-active,
        html.custom-cursor-active body,
        html.custom-cursor-active *,
        html.custom-cursor-active a,
        html.custom-cursor-active button,
        html.custom-cursor-active [role="button"],
        html.custom-cursor-active .cursor-pointer {
          cursor: none !important;
        }
        html.custom-cursor-active input,
        html.custom-cursor-active textarea,
        html.custom-cursor-active [contenteditable="true"] {
          cursor: text !important;
        }
      `}</style>

      <div
        className={`pointer-events-none fixed inset-0 z-[99999] transition-opacity duration-300 ${
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
    </>
  );
}
