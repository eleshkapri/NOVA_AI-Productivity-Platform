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
    'inline-flex items-center justify-center font-semibold tracking-wide rounded-full transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D8B452] focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const sizeStyles = {
    sm: 'text-xs px-4 py-2 gap-1.5',
    md: 'text-sm px-6 py-2.5 gap-2',
    lg: 'text-base px-8 py-3.5 gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-[#D8B452] via-[#E2C56F] to-[#C7992A] hover:from-[#E2C56F] hover:to-[#D8B452] text-black shadow-lg shadow-[#D8B452]/20 hover:shadow-[#D8B452]/40 hover:-translate-y-0.5 active:translate-y-0 border border-[#F3D887]/50',
    secondary:
      'bg-[#0b0c33] hover:bg-[#11134a] text-white shadow-md hover:-translate-y-0.5 active:translate-y-0 border border-[#D8B452]/30 hover:border-[#D8B452]/60',
    outline:
      'border border-[#D8B452]/40 hover:border-[#D8B452] text-[#D8B452] hover:bg-[#D8B452]/10 hover:-translate-y-0.5 active:translate-y-0',
    ghost:
      'text-slate-300 hover:text-[#D8B452] hover:bg-white/5',
    glow:
      'relative group overflow-hidden bg-gradient-to-r from-[#D8B452] via-[#F3D887] to-[#D8B452] text-black shadow-xl shadow-[#D8B452]/30 hover:scale-[1.02] active:scale-[0.98]',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />}
      {children}
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5" />}
    </button>
  );
}
