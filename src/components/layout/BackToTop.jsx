import React from 'react';
import { ArrowUp } from 'lucide-react';

export function BackToTop({ show, onScrollToTop, className = '' }) {
  if (!show) return null;

  return (
    <button
      onClick={onScrollToTop}
      aria-label="Back to top of page"
      className={`p-3.5 rounded-full bg-gradient-to-r from-[#D8B452] to-[#F3D887] text-black shadow-2xl shadow-amber-500/30 border border-amber-300/60 hover:scale-110 hover:-translate-y-1 hover:shadow-amber-500/50 active:scale-95 transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D8B452] group animate-fade-in ${className}`}
    >
      <ArrowUp className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1" />
    </button>
  );
}
