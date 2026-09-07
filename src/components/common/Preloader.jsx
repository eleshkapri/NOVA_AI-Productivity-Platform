import React, { useEffect, useState } from 'react';

export function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1100);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050614] text-white transition-opacity duration-700 pointer-events-none ${
        loading ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="flex flex-col items-center gap-6 animate-pulse">
        {/* Soufflet Malt 4-petal golden totem SVG */}
        <div className="w-16 h-16 animate-totem">
          <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path
              d="M4.919 20.0389L6.967 17.9751H13.918V24.9797L11.87 27.0435C8.72 30.2174 4.453 31.9999 0 31.9999C0 27.5126 1.769 23.2129 4.919 20.0389Z"
              fill="#D8B452"
            />
            <path
              d="M11.87 4.95635L13.918 7.0202V14.0248H6.967L4.919 11.9609C1.769 8.78697 0 4.4873 0 0C4.453 0 8.72 1.78241 11.87 4.95635Z"
              fill="#D8B452"
            />
            <path
              d="M26.843 11.9609L24.795 14.0248H17.844V7.0202L19.892 4.95635C23.042 1.78241 27.308 0 31.761 0C31.761 4.4873 29.993 8.78697 26.848 11.9609"
              fill="#D8B452"
            />
            <path
              d="M19.892 27.0489L17.844 24.985V17.9805H24.795L26.843 20.0443C29.993 23.2183 31.761 27.5179 31.761 32.0052C27.308 32.0052 23.042 30.2228 19.892 27.0489Z"
              fill="#D8B452"
            />
          </svg>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-sm font-extrabold tracking-[0.3em] uppercase text-[#D8B452]">
            NOVA
          </span>
          <span className="text-[10px] tracking-[0.25em] uppercase text-slate-400 mt-1">
            Autonomous AI Platform
          </span>
        </div>
      </div>
    </div>
  );
}
