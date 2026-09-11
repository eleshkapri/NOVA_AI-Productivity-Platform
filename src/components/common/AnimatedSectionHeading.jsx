import React, { useEffect, useRef, useState } from 'react';

/**
 * AnimatedSectionHeading — Animation 3 Style Word Slide-In Heading
 * - Pure compositor-accelerated translate3d + opacity word reveals
 * - Staggered entrance on scroll into view (scrolling up and down)
 * - Zero CLS, natural typography kerning and full gradient highlight support
 * - Respects prefers-reduced-motion
 */
export function AnimatedSectionHeading({
  title = '',
  titleHighlight = '',
  as: Component = 'h2',
  className = '',
  highlightClassName = 'text-orange-gradient italic',
  staggerMs = 36,
  durationMs = 520,
}) {
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });
  const containerRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.12,
        rootMargin: typeof window !== 'undefined' && window.innerWidth < 768 ? '0px 0px -20px 0px' : '0px 0px -40px 0px',
      }
    );

    const el = containerRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  const titleWords = title ? title.trim().split(/\s+/).filter(Boolean) : [];
  const highlightWords = titleHighlight ? titleHighlight.trim().split(/\s+/).filter(Boolean) : [];

  return (
    <Component ref={containerRef} className={className}>
      {titleWords.map((word, i) => (
        <span
          key={`tw-${i}`}
          className="inline-block overflow-hidden align-top mr-[0.24em] pb-[0.08em]"
        >
          <span
            className="inline-block transition-[transform,opacity] ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              transform: isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 110%, 0)',
              opacity: isVisible ? 1 : 0,
              transitionDuration: `${durationMs}ms`,
              transitionDelay: `${i * staggerMs}ms`,
              willChange: isVisible ? 'auto' : 'transform, opacity',
            }}
          >
            {word}
          </span>
        </span>
      ))}
      {highlightWords.length > 0 && (
        <span className="inline-block">
          {highlightWords.map((word, i) => {
            const delay = (titleWords.length + i) * staggerMs;
            return (
              <span
                key={`hw-${i}`}
                className="inline-block overflow-hidden align-top mr-[0.24em] last:mr-0 pb-[0.08em]"
              >
                <span
                  className={`inline-block ${highlightClassName} transition-[transform,opacity] ease-[cubic-bezier(0.16,1,0.3,1)]`}
                  style={{
                    transform: isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 110%, 0)',
                    opacity: isVisible ? 1 : 0,
                    transitionDuration: `${durationMs}ms`,
                    transitionDelay: `${delay}ms`,
                    willChange: isVisible ? 'auto' : 'transform, opacity',
                  }}
                >
                  {word}
                </span>
              </span>
            );
          })}
        </span>
      )}
    </Component>
  );
}
