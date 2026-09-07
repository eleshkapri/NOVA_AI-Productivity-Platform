import React, { useEffect, useRef } from 'react';

export function ProgressBar() {
  const barRef = useRef(null);
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

      // Silky smooth dampening factor (0.085 creates a continuous liquid glide at 60fps/120fps)
      currentProgress.current += diff * 0.085;

      if (barRef.current) {
        barRef.current.style.width = `${currentProgress.current}%`;
      }

      // Continue animating until settled within sub-pixel threshold (0.01%)
      if (Math.abs(diff) > 0.01) {
        animId.current = requestAnimationFrame(animate);
      } else {
        currentProgress.current = targetProgress.current;
        if (barRef.current) {
          barRef.current.style.width = `${currentProgress.current}%`;
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

    return () => {
      window.removeEventListener('scroll', updateTarget);
      window.removeEventListener('resize', updateTarget);
      if (animId.current) cancelAnimationFrame(animId.current);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[3.5px] z-[100] pointer-events-none bg-black/10 dark:bg-white/5 overflow-visible"
      aria-hidden="true"
    >
      <div
        ref={barRef}
        className="h-full bg-gradient-to-r from-[#a1741a] via-[#D8B452] to-[#F3D887] shadow-[0_0_16px_rgba(216,180,82,1)] will-change-[width] relative rounded-r-full"
        style={{ width: '0%' }}
      >
        {/* Luminous Leading Glowing Head with radiant aura */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_#D8B452,0_0_20px_#D8B452] border border-[#F3D887]" />
      </div>
    </div>
  );
}
