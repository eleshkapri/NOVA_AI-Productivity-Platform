import React from 'react';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  iconPosition = 'left',
  onClick,
  type = 'button',
  disabled = false,
  ...props
}) {
  const baseStyles =
    'group relative overflow-hidden inline-flex items-center justify-center font-bold tracking-wide rounded-full transition-[transform,box-shadow,background-color,border-color] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D8B452] focus-visible:ring-offset-2 active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed before:absolute before:inset-0 before:-translate-x-full hover:before:translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:transition-transform before:duration-700 before:pointer-events-none';

  const sizeStyles = {
    sm: 'text-xs px-4 py-2 gap-1.5',
    md: 'text-sm px-6 py-2.5 gap-2',
    lg: 'text-base px-8 py-3.5 gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-[#6833FF] via-[#7B42FF] to-[#8E6FFF] hover:from-[#7B42FF] hover:to-[#6833FF] text-white shadow-lg shadow-violet-500/25 dark:shadow-[#6833FF]/40 hover:shadow-xl hover:shadow-[#6833FF]/60 hover:-translate-y-0.5 border border-violet-400/30 dark:border-[#A78BFA]/50',
    purple:
      'bg-gradient-to-r from-[#6833FF] to-[#8E6FFF] hover:from-[#7B42FF] hover:to-[#6833FF] text-white shadow-[0_0_25px_rgba(104,51,255,0.45)] hover:shadow-[0_0_35px_rgba(104,51,255,0.65)] hover:-translate-y-0.5 border border-[#8E6FFF]/50',
    secondary:
      'bg-white text-slate-800 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-sm hover:shadow-md dark:bg-[#0b0c33] dark:text-white dark:border-[#D8B452]/30 dark:hover:bg-[#121554] dark:hover:border-[#D8B452] hover:-translate-y-0.5',
    darkGlass:
      'bg-white/5 text-white border border-white/15 hover:bg-white/10 hover:border-white/30 backdrop-blur-md shadow-xs hover:-translate-y-0.5',
    orchid:
      'bg-gradient-to-r from-[#6D28D9] via-[#7C3AED] to-[#8B5CF6] hover:from-[#7C3AED] hover:to-[#6D28D9] dark:from-[#6833FF] dark:via-[#7B42FF] dark:to-[#8E6FFF] text-white shadow-lg shadow-violet-500/20 dark:shadow-[#6833FF]/35 hover:shadow-xl hover:shadow-violet-500/30 hover:-translate-y-0.5 border border-violet-400/30 dark:border-[#A78BFA]/50',
    orchidSecondary:
      'bg-white text-violet-900 border border-violet-200 hover:bg-violet-50 hover:border-violet-300 shadow-sm dark:bg-[#07081e] dark:text-white dark:border-[#8E6FFF]/40 dark:hover:bg-[#0e1038] dark:hover:border-[#8E6FFF] hover:-translate-y-0.5',
    gold:
      'bg-gradient-to-r from-[#D97706] via-[#F59E0B] to-[#B45309] hover:from-[#F59E0B] hover:to-[#D97706] dark:from-[#D8B452] dark:via-[#F3D887] dark:to-[#C7992A] text-white dark:text-black shadow-lg shadow-amber-500/20 dark:shadow-[#D8B452]/25 hover:shadow-xl hover:shadow-amber-500/30 hover:-translate-y-0.5 border border-amber-400/40 dark:border-[#F3D887]/60 font-extrabold',
    outline:
      'border-2 border-slate-300 text-slate-800 hover:bg-slate-100 hover:border-slate-400 dark:border-[#D8B452]/50 dark:text-[#D8B452] dark:hover:bg-gradient-to-r dark:hover:from-[#D8B452] dark:hover:to-[#C7992A] dark:hover:text-black dark:hover:border-transparent hover:-translate-y-0.5',
    ghost:
      'text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-[#D8B452] hover:bg-slate-100 dark:hover:bg-[#D8B452]/10 hover:-translate-y-0.5',
    glow:
      'bg-gradient-to-r from-[#D97706] via-[#F59E0B] to-[#D97706] dark:from-[#D8B452] dark:via-[#F3D887] dark:to-[#D8B452] text-white dark:text-black shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/35 hover:-translate-y-0.5',
    orange:
      'bg-[#FF5500] hover:bg-[#FF6600] text-black font-extrabold shadow-lg shadow-orange-500/35 hover:shadow-xl hover:shadow-orange-500/50 hover:-translate-y-0.5 border border-orange-400/40',
    orangeGhost:
      'bg-transparent text-white border border-white/20 hover:bg-white/10 hover:border-white/40 hover:-translate-y-0.5',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {Icon && iconPosition === 'left' && (
        <Icon className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:scale-120 group-hover:-rotate-6" />
      )}
      <span className="relative z-10">{children}</span>
      {Icon && iconPosition === 'right' && (
        <Icon className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1.5" />
      )}
    </button>
  );
}
