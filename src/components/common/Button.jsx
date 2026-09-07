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
    'group relative overflow-hidden inline-flex items-center justify-center font-bold tracking-wide rounded-full transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D8B452] focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed before:absolute before:inset-0 before:-translate-x-full hover:before:translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:transition-transform before:duration-700 before:pointer-events-none';

  const sizeStyles = {
    sm: 'text-xs px-4 py-2 gap-1.5',
    md: 'text-sm px-6 py-2.5 gap-2',
    lg: 'text-base px-8 py-3.5 gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-[#D8B452] via-[#F3D887] to-[#C7992A] hover:from-[#F3D887] hover:to-[#D8B452] text-black shadow-lg shadow-[#D8B452]/25 hover:shadow-2xl hover:shadow-[#D8B452]/40 hover:-translate-y-1 active:translate-y-0.5 hover:scale-[1.02] border border-[#F3D887]/60',
    secondary:
      'bg-slate-900 text-white dark:bg-[#0b0c33] hover:bg-slate-800 dark:hover:bg-[#121554] shadow-md hover:shadow-xl hover:shadow-[#D8B452]/10 hover:-translate-y-1 active:translate-y-0.5 hover:scale-[1.02] border border-[#a1741a]/40 dark:border-[#D8B452]/30 hover:border-[#D8B452]',
    outline:
      'border-2 border-[#a1741a]/60 dark:border-[#D8B452]/50 text-[#a1741a] dark:text-[#D8B452] hover:bg-gradient-to-r hover:from-[#D8B452] hover:to-[#C7992A] hover:text-black hover:border-transparent hover:shadow-lg hover:shadow-[#D8B452]/20 hover:-translate-y-1 active:translate-y-0.5',
    ghost:
      'text-slate-700 dark:text-slate-200 hover:text-[#a1741a] dark:hover:text-[#D8B452] hover:bg-[#D8B452]/10 hover:-translate-y-0.5 active:translate-y-0',
    glow:
      'bg-gradient-to-r from-[#D8B452] via-[#F3D887] to-[#D8B452] text-black shadow-xl shadow-[#D8B452]/30 hover:shadow-2xl hover:shadow-[#D8B452]/50 hover:scale-[1.03] active:scale-[0.98] hover:-translate-y-1',
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
