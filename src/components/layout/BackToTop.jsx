import React from 'react';
import { ArrowUp } from 'lucide-react';

export function BackToTop({ show, onScrollToTop }) {
  if (!show) return null;

  return (
    <button
      onClick={onScrollToTop}
      aria-label="Back to top of page"
      className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-[#D8B452] hover:bg-[#E5C773] text-black shadow-2xl shadow-[#D8B452]/30 border border-[#F3D887]/50 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D8B452] group animate-fade-in"
    >
      <ArrowUp className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
    </button>
  );
}
