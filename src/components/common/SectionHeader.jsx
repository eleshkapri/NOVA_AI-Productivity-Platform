import React from 'react';
import { Badge } from './Badge';

export function SectionHeader({
  eyebrow,
  eyebrowVariant = 'indigo',
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
    <div className={`flex flex-col max-w-3xl mb-14 md:mb-18 ${alignClasses[align]} ${className}`}>
      {eyebrow && (
        <div className="mb-4">
          <Badge variant={eyebrowVariant} dot>
            {eyebrow}
          </Badge>
        </div>
      )}

      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
        {title}{' '}
        {titleHighlight && (
          <span className="bg-gradient-to-r from-indigo-600 via-indigo-400 to-purple-600 dark:from-indigo-400 dark:via-purple-300 dark:to-pink-400 bg-clip-text text-transparent">
            {titleHighlight}
          </span>
        )}
      </h2>

      {description && (
        <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
          {description}
        </p>
      )}
    </div>
  );
}
