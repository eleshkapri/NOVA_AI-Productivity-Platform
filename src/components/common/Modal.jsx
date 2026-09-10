import React, { useState, useEffect } from 'react';
import { X, Minus, Maximize2 } from 'lucide-react';

export function Modal({ isOpen, onClose, title, children, maxWidth = 'max-w-3xl', allowMinimize = true }) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);

  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setIsMinimized(false);
    }
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen && !isMinimized) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, isMinimized, onClose]);

  if (!isOpen) return null;

  // Minimized dock bar at bottom-left
  if (isMinimized) {
    return (
      <div className="fixed bottom-6 left-4 sm:left-6 z-50 animate-fade-in pointer-events-auto">
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/95 dark:bg-[#07081e]/95 border border-[#D8B452]/50 shadow-2xl backdrop-blur-xl text-slate-900 dark:text-white">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-xs font-bold max-w-[180px] sm:max-w-xs truncate">
            {title || 'NOVA Session'}
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setIsMinimized(false)}
              className="p-1.5 rounded-lg bg-amber-50 dark:bg-amber-500/15 text-[#B45309] dark:text-[#D8B452] hover:bg-[#D8B452] hover:text-black transition-all cursor-pointer"
              title="Restore dialog"
              aria-label="Restore dialog"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-white/10 transition-all cursor-pointer"
              title="Close dialog"
              aria-label="Close dialog"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 md:p-10 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div
        className={`relative w-full ${maxWidth} bg-white dark:bg-[#0b0c33] rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-[#D8B452]/40 overflow-hidden z-10 max-h-[94vh] sm:max-h-[90vh] flex flex-col animate-modal-pop`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-200 dark:border-white/10">
          <h3 id="modal-title" className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white truncate pr-2">
            {title}
          </h3>
          <div className="flex items-center gap-1.5 shrink-0">
            {allowMinimize && (
              <button
                type="button"
                onClick={() => setIsMinimized(true)}
                className="p-1.5 sm:p-2 rounded-full text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-[#D8B452] hover:bg-slate-100 dark:hover:bg-white/10 active:scale-90 transition-[transform,background-color,color] duration-150 ease-out cursor-pointer shrink-0"
                aria-label="Minimize dialog"
                title="Minimize"
              >
                <Minus className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-full text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-[#D8B452] hover:bg-slate-100 dark:hover:bg-white/10 active:scale-90 transition-[transform,background-color,color] duration-150 ease-out cursor-pointer shrink-0"
              aria-label="Close dialog"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-3.5 sm:p-6 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
