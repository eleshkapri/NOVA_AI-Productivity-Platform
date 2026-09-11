import React, { useEffect, useRef } from 'react';

export function ProgressBar() {
  const barRef = useRef(null);
  const containerRef = useRef(null);
  const targetProgress = useRef(0);
  const currentProgress = useRef(0);
  const isRunning = useRef(false);
  const animId = useRef(null);

  useEffect(() => {
    let cachedHeight = 0;
    const measureHeight = () => {
      const scrollElement = document.scrollingElement || document.documentElement;
      cachedHeight = scrollElement.scrollHeight - window.innerHeight;
    };
    measureHeight();

    const calculateProgress = () => {
      if (cachedHeight <= 0) measureHeight();
      if (cachedHeight > 0) {
        const currentScroll = window.scrollY || 0;
        return Math.min(Math.max((currentScroll / cachedHeight) * 100, 0), 100);
      }
      return 0;
    };

    const updateTarget = () => {
      targetProgress.current = calculateProgress();
      startAnimation();
    };

    const animate = () => {
      const diff = targetProgress.current - currentProgress.current;

      // Silky smooth dampening factor
      currentProgress.current += diff * 0.1;

      const progressRatio = Math.max(0, Math.min(1, currentProgress.current / 100));
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progressRatio}) translateZ(0)`;
      }
      if (containerRef.current) {
        containerRef.current.style.opacity = currentProgress.current > 0.2 ? '1' : '0';
      }

      // Continue animating until settled within sub-pixel threshold (0.01%)
      if (Math.abs(diff) > 0.01) {
        animId.current = requestAnimationFrame(animate);
      } else {
        currentProgress.current = targetProgress.current;
        const finalRatio = Math.max(0, Math.min(1, currentProgress.current / 100));
        if (barRef.current) {
          barRef.current.style.transform = `scaleX(${finalRatio}) translateZ(0)`;
        }
        if (containerRef.current) {
          containerRef.current.style.opacity = currentProgress.current > 0.2 ? '1' : '0';
        }
        isRunning.current = false;
      }
    };

    const startAnimation = () => {
      if (!isRunning.current) {
        isRunning.current = true;
        animId.current = requestAnimationFrame(animate);
      }
    };

    window.addEventListener('scroll', updateTarget, { passive: true });
    window.addEventListener('resize', updateTarget, { passive: true });

    // Immediate initial computation
    const initial = calculateProgress();
    targetProgress.current = initial;
    currentProgress.current = initial;
    const initialRatio = Math.max(0, Math.min(1, initial / 100));
    if (barRef.current) {
      barRef.current.style.transform = `scaleX(${initialRatio}) translateZ(0)`;
    }
    if (containerRef.current) {
      containerRef.current.style.opacity = initial > 0.2 ? '1' : '0';
    }

    return () => {
      window.removeEventListener('scroll', updateTarget);
      window.removeEventListener('resize', updateTarget);
      if (animId.current) cancelAnimationFrame(animId.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 right-0 h-[2.5px] z-[100] pointer-events-none bg-transparent transition-opacity duration-300 opacity-0 overflow-visible"
      aria-hidden="true"
    >
      <div
        ref={barRef}
        className="w-full h-full bg-gradient-to-r from-[#EA580C] via-[#FF5500] to-[#FF7700] shadow-[0_0_14px_rgba(255,85,0,0.85)] will-change-transform relative rounded-r-full origin-left"
        style={{ transform: 'scaleX(0) translateZ(0)' }}
      >
        {/* Sleek Pure Cyber-Orange Leading Glow */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 rounded-full bg-[#FF5500] shadow-[0_0_8px_#FF5500,0_0_14px_#FF7700]" />
      </div>
    </div>
  );
}

export default ProgressBar;
