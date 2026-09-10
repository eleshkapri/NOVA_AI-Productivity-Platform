import React from 'react';
import { ArrowUp } from 'lucide-react';

export function BackToTop({ show, onScrollToTop, className = '' }) {
  if (!show) return null;

  return (
    <button
      onClick={onScrollToTop}
      aria-label="Back to top of page"
      className={`p-3.5 rounded-full bg-[#FF5500] hover:bg-[#FF6600] text-black shadow-2xl shadow-[#FF5500]/40 border border-orange-400/60 hover:scale-110 hover:-translate-y-1 hover:shadow-[#FF5500]/60 active:scale-95 transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5500] group animate-fade-in ${className}`}
    >
      <ArrowUp className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1" />
    </button>
  );
}
