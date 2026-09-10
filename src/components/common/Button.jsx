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
  menuRoll = false,
  ...props
}) {
  const baseStyles =
    'group relative overflow-hidden inline-flex items-center justify-center font-bold tracking-wide rounded-full transition-[transform,box-shadow,background-color,border-color] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5500] focus-visible:ring-offset-2 active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed before:absolute before:inset-0 before:-translate-x-full hover:before:translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:transition-transform before:duration-700 before:pointer-events-none';

  const sizeStyles = {
    sm: 'text-xs px-4 py-2 gap-1.5',
    md: 'text-sm px-6 py-2.5 gap-2',
    lg: 'text-base px-8 py-3.5 gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-[#FF5500] hover:bg-[#FF6600] text-black font-extrabold shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/50 hover:-translate-y-0.5 border border-orange-400/40',
    secondary:
      'bg-white text-slate-800 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-sm hover:shadow-md dark:bg-zinc-900 dark:text-white dark:border-white/10 dark:hover:bg-zinc-800 dark:hover:border-white/20 hover:-translate-y-0.5',
    orchid:
      'bg-gradient-to-r from-[#6D28D9] via-[#7C3AED] to-[#8B5CF6] hover:from-[#7C3AED] hover:to-[#6D28D9] dark:from-[#6833FF] dark:via-[#7B42FF] dark:to-[#8E6FFF] text-white shadow-lg shadow-violet-500/20 dark:shadow-[#6833FF]/35 hover:shadow-xl hover:shadow-violet-500/30 hover:-translate-y-0.5 border border-violet-400/30 dark:border-[#A78BFA]/50',
    orchidSecondary:
      'bg-white text-violet-900 border border-violet-200 hover:bg-violet-50 hover:border-violet-300 shadow-sm dark:bg-zinc-900 dark:text-white dark:border-[#8E6FFF]/40 dark:hover:bg-zinc-800 dark:hover:border-[#8E6FFF] hover:-translate-y-0.5',
    outline:
      'border-2 border-slate-300 text-slate-800 hover:bg-slate-100 hover:border-slate-400 dark:border-white/20 dark:text-white dark:hover:border-[#FF5500] dark:hover:text-[#FF5500] dark:hover:bg-[#FF5500]/10 hover:-translate-y-0.5',
    ghost:
      'text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-[#FF5500] hover:bg-slate-100 dark:hover:bg-[#FF5500]/10 hover:-translate-y-0.5',
    glow:
      'bg-gradient-to-r from-[#EA580C] via-[#FF5500] to-[#FF7700] text-black font-extrabold shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/50 hover:-translate-y-0.5',
    orange:
      'bg-[#FF5500] hover:bg-[#FF6600] text-black font-extrabold shadow-lg shadow-orange-500/35 hover:shadow-xl hover:shadow-orange-500/50 hover:-translate-y-0.5 border border-orange-400/40',
    orangeGhost:
      'bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-300 hover:border-[#FF5500]/60 dark:bg-white/5 dark:text-white dark:border-white/20 dark:hover:bg-white/10 dark:hover:border-white/40 hover:-translate-y-0.5 shadow-sm dark:shadow-none [&>svg]:text-[#FF5500]',
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
      {menuRoll && typeof children === 'string' ? (
        <span className="relative z-10 menu-roll">
          <span className="menu-roll-stack">
            <span className="menu-roll-line">{children}</span>
            <span className="menu-roll-line">{children}</span>
          </span>
        </span>
      ) : (
        <span className="relative z-10">{children}</span>
      )}
      {Icon && iconPosition === 'right' && (
        <Icon className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1.5" />
      )}
    </button>
  );
}
