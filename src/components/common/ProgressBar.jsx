import React, { useEffect, useRef } from 'react';

export function ProgressBar() {
  const barRef = useRef(null);
  const targetProgress = useRef(0);
  const currentProgress = useRef(0);
  const isRunning = useRef(false);
  const animId = useRef(null);

  useEffect(() => {
    const updateTarget = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        targetProgress.current = Math.min(Math.max(window.scrollY / totalHeight, 0), 1);
      } else {
        targetProgress.current = 0;
      }
      startLerp();
    };

    const loop = () => {
      const diff = targetProgress.current - currentProgress.current;
      // Continue interpolation while there is meaningful distance
      if (Math.abs(diff) > 0.0004) {
        // Silky smooth dampening factor
        currentProgress.current += diff * 0.14;
        if (barRef.current) {
          barRef.current.style.transform = `scaleX(${currentProgress.current})`;
        }
        animId.current = requestAnimationFrame(loop);
      } else {
        currentProgress.current = targetProgress.current;
        if (barRef.current) {
          barRef.current.style.transform = `scaleX(${currentProgress.current})`;
        }
        isRunning.current = false;
      }
    };

    const startLerp = () => {
      if (!isRunning.current) {
        isRunning.current = true;
        animId.current = requestAnimationFrame(loop);
      }
    };

    window.addEventListener('scroll', updateTarget, { passive: true });
    window.addEventListener('resize', updateTarget, { passive: true });
    updateTarget();

    return () => {
      window.removeEventListener('scroll', updateTarget);
      window.removeEventListener('resize', updateTarget);
      if (animId.current) cancelAnimationFrame(animId.current);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-50 pointer-events-none bg-transparent overflow-hidden">
      <div
        ref={barRef}
        className="h-full w-full bg-gradient-to-r from-[#D8B452] via-[#F3D887] to-[#D8B452] shadow-[0_0_12px_rgba(216,180,82,0.9)] origin-left will-change-transform"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
}
