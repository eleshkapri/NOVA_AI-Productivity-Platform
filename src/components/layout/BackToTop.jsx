import React from 'react';
import { ArrowUp } from 'lucide-react';

export function BackToTop({ show, onScrollToTop }) {
  if (!show) return null;

  return (
    <button
      onClick={onScrollToTop}
      aria-label="Back to top of page"
      className="fixed bottom-6 right-6 z-40 p-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-600/30 border border-indigo-400/30 hover:-translate-y-1 active:translate-y-0 transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 group animate-fade-in"
    >
      <ArrowUp className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
    </button>
  );
}
