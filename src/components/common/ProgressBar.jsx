import React, { useEffect, useRef } from 'react';

export function ProgressBar() {
  const barRef = useRef(null);
  const containerRef = useRef(null);
  const targetProgress = useRef(0);
  const currentProgress = useRef(0);
  const isRunning = useRef(false);
  const animId = useRef(null);

  useEffect(() => {
    const calculateProgress = () => {
      const scrollElement = document.scrollingElement || document.documentElement;
      const totalHeight = scrollElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentScroll = window.scrollY || scrollElement.scrollTop || 0;
        return Math.min(Math.max((currentScroll / totalHeight) * 100, 0), 100);
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
      currentProgress.current += diff * 0.085;

      if (barRef.current) {
        barRef.current.style.width = `${currentProgress.current}%`;
      }
      if (containerRef.current) {
        containerRef.current.style.opacity = currentProgress.current > 0.2 ? '1' : '0';
      }

      // Continue animating until settled within sub-pixel threshold (0.01%)
      if (Math.abs(diff) > 0.01) {
        animId.current = requestAnimationFrame(animate);
      } else {
        currentProgress.current = targetProgress.current;
        if (barRef.current) {
          barRef.current.style.width = `${currentProgress.current}%`;
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
    if (barRef.current) {
      barRef.current.style.width = `${initial}%`;
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
        className="h-full bg-gradient-to-r from-[#6833FF] via-[#8E6FFF] to-[#D8B452] shadow-[0_0_14px_rgba(216,180,82,0.85)] will-change-[width] relative rounded-r-full"
        style={{ width: '0%' }}
      >
        {/* Sleek Pure Liquid Gold Leading Glow */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 rounded-full bg-[#D8B452] shadow-[0_0_8px_#D8B452,0_0_14px_#F3D887]" />
      </div>
    </div>
  );
}

export default ProgressBar;
