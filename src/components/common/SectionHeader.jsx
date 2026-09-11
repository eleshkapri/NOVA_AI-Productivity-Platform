import React from 'react';
import { Badge } from './Badge';
import { AnimatedSectionHeading } from './AnimatedSectionHeading';

export function SectionHeader({
  eyebrow,
  eyebrowVariant = 'orange',
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
    <div className={`flex flex-col max-w-3xl mb-5 md:mb-7 ${alignClasses[align]} ${className}`}>
      {eyebrow && (
        <div className="mb-2.5 sm:mb-3">
          <Badge variant={eyebrowVariant} dot className="shadow-xs">
            {eyebrow}
          </Badge>
        </div>
      )}

      <AnimatedSectionHeading
        title={title}
        titleHighlight={titleHighlight}
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]"
        highlightClassName="text-orange-gradient italic font-extrabold"
      />

      {description && (
        <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-normal max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
}




