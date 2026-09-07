import React, { useEffect, useState } from 'react';

export function ProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let animId = null;

    const handleScroll = () => {
      if (animId) return;

      animId = requestAnimationFrame(() => {
        const scrollElement = document.scrollingElement || document.documentElement;
        const totalHeight = scrollElement.scrollHeight - window.innerHeight;
        if (totalHeight > 0) {
          const currentScroll = window.scrollY || scrollElement.scrollTop || 0;
          const currentProgress = Math.min(Math.max((currentScroll / totalHeight) * 100, 0), 100);
          setProgress(currentProgress);
        } else {
          setProgress(0);
        }
        animId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll(); // Initial computation on mount

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-1 z-[100] pointer-events-none bg-black/10 dark:bg-white/5"
      aria-hidden="true"
    >
      <div
        className="h-full bg-gradient-to-r from-[#a1741a] via-[#D8B452] to-[#F3D887] shadow-[0_0_12px_rgba(216,180,82,0.9)] transition-[width] duration-150 ease-out will-change-[width] relative"
        style={{ width: `${progress}%` }}
      >
        {/* Luminous Leading Glow Head at the leading tip */}
        {progress > 0 && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#D8B452,0_0_14px_#D8B452]" />
        )}
      </div>
    </div>
  );
}
