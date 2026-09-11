import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { smoothScrollService } from '../../services/SmoothScrollService';

export function BackToTop({ show: controlledShow, onScrollToTop, className = '' }) {
  const [internalShow, setInternalShow] = useState(false);

  useEffect(() => {
    if (controlledShow !== undefined) return;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const shouldShow = window.scrollY > 400;
          setInternalShow((prev) => (prev !== shouldShow ? shouldShow : prev));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [controlledShow]);

  const isVisible = controlledShow !== undefined ? controlledShow : internalShow;

  if (!isVisible) return null;

  const handleClick = () => {
    if (onScrollToTop) {
      onScrollToTop();
    } else {
      smoothScrollService.scrollTo(0, { duration: 1.5 });
    }
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Back to top of page"
      className={`p-3.5 rounded-full bg-[#FF5500] hover:bg-[#FF6600] text-black shadow-2xl shadow-[#FF5500]/40 border border-orange-400/60 hover:scale-110 hover:-translate-y-1 hover:shadow-[#FF5500]/60 active:scale-95 transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5500] group animate-fade-in ${className}`}
    >
      <ArrowUp className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1" />
    </button>
  );
}

export default BackToTop;
