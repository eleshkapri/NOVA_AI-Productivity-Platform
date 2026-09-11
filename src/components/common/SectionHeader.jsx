import React from 'react';
import { Badge } from './Badge';
import { TextReveal3 } from './TextReveal3';

export function SectionHeader({
  eyebrow,
  eyebrowVariant = 'orange',
  title,
  titleHighlight,
  description,
  align = 'center',
  className = '',
  disableAnimation = false,
}) {
  const alignClasses = {
    center: 'text-center mx-auto items-center',
    left: 'text-left items-start',
  };

  return (
    <div className={`flex flex-col max-w-3xl mb-8 md:mb-12 ${alignClasses[align]} ${className}`}>
      {eyebrow && (
        <div className="mb-5">
          <Badge variant={eyebrowVariant} dot className="shadow-sm">
            {disableAnimation ? eyebrow : <TextReveal3 text={eyebrow} delay={20} stagger={10} duration={240} />}
          </Badge>
        </div>
      )}

      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
        {disableAnimation ? (
          <>
            {title}{' '}
            {titleHighlight && (
              <span className="text-orange-gradient italic font-extrabold">
                {titleHighlight}
              </span>
            )}
          </>
        ) : (
          <>
            {title && <TextReveal3 text={title} delay={40} stagger={10} duration={280} />}{' '}
            {titleHighlight && (
              <span className="text-orange-gradient italic font-extrabold inline-block">
                <TextReveal3
                  text={titleHighlight}
                  delay={80}
                  stagger={10}
                  duration={280}
                />
              </span>
            )}
          </>
        )}
      </h2>

      {description && (
        <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-normal max-w-2xl">
          {disableAnimation ? (
            description
          ) : (
            <TextReveal3
              text={description}
              delay={80}
              stagger={6}
              duration={260}
              offsetDistance={14}
            />
          )}
        </p>
      )}
    </div>
  );
}


