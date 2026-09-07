import React from 'react';
import { Badge } from './Badge';

export function SectionHeader({
  eyebrow,
  eyebrowVariant = 'orchid',
  title,
  titleHighlight,
  description,
  align = 'center',
  className = '',
}) {
  const alignClasses = {
    center: 'text-center mx-auto items-center',
    left: 'text-left items-start',
  };

  return (
    <div className={`flex flex-col max-w-3xl mb-16 md:mb-20 ${alignClasses[align]} ${className}`}>
      {eyebrow && (
        <div className="mb-5">
          <Badge variant={eyebrowVariant} dot className="shadow-sm">
            {eyebrow}
          </Badge>
        </div>
      )}

      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
        {title}{' '}
        {titleHighlight && (
          <span className="text-gold-gradient font-serif italic font-normal">
            {titleHighlight}
          </span>
        )}
      </h2>

      {description && (
        <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-normal max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
}
