import React, { useEffect, useRef, useState, useMemo } from 'react';

/**
 * TextReveal3 — Character-Level Staggered Slide Animation
 * 
 * Implements horizontal staggered character reveal (translateX + opacity)
 * with easeOutExpo spring physics on bi-directional scroll (up & down).
 *
 * Parameters:
 * - text: string | number
 * - as: HTML tag (default: 'span')
 * - delay: base start delay in ms (default: 0)
 * - stagger: delay between each character in ms (default: 20)
 * - duration: duration per character transition in ms (default: 800)
 * - offsetDistance: starting X translation distance in px (default: 32)
 * - once: false (animates whenever entering viewport on scroll up & down)
 * - className: wrapper CSS class
 * - letterClassName: CSS class applied to individual letters
 */
export function TextReveal3({
  text = '',
  as: Component = 'span',
  delay = 0,
  stagger = 20,
  duration = 800,
  offsetDistance = 32,
  once = false,
  className = '',
  letterClassName = '',
  ...props
}) {
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });
  const elementRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const currentEl = elementRef.current;
    if (!currentEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(currentEl);
          }
        } else if (!once) {
          // Reset when scrolled out of viewport so it re-triggers when scrolling back (up or down)
          setIsVisible(false);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -20px 0px',
      }
    );

    observer.observe(currentEl);

    return () => {
      observer.unobserve(currentEl);
    };
  }, [once]);

  const rawString = typeof text === 'string' || typeof text === 'number' ? String(text) : '';

  const splitData = useMemo(() => {
    if (!rawString) return [];
    const rawWords = rawString.split(' ');
    let charCounter = 0;
    return rawWords.map((word) => {
      const chars = Array.from(word).map((char) => {
        const idx = charCounter;
        charCounter += 1;
        return { char, index: idx };
      });
      charCounter += 1; // space accounting
      return { word, chars };
    });
  }, [rawString]);

  // If text is not a simple string, render as-is
  if (!rawString) {
    return (
      <Component ref={elementRef} className={className} {...props}>
        {text}
      </Component>
    );
  }

  return (
    <Component
      ref={elementRef}
      className={`inline-block select-text ${className}`}
      aria-label={rawString}
      {...props}
    >
      <span aria-hidden="true" className="inline">
        {splitData.map((item, wordIdx) => (
          <span
            key={`w-${wordIdx}-${item.word}`}
            className="inline-block whitespace-nowrap"
          >
            {item.chars.map((charItem, charIdx) => {
              const charDelay = delay + charItem.index * stagger;

              return (
                <span
                  key={`c-${charIdx}-${charItem.char}`}
                  className={`inline-block transition-[transform,opacity] will-change-[transform,opacity] ${letterClassName}`}
                  style={{
                    transform: isVisible
                      ? 'translate3d(0, 0, 0)'
                      : `translate3d(${offsetDistance}px, 0, 0)`,
                    opacity: isVisible ? 1 : 0,
                    transitionDuration: `${duration}ms`,
                    transitionDelay: `${charDelay}ms`,
                    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  {charItem.char}
                </span>
              );
            })}
            {wordIdx < splitData.length - 1 && (
              <span className="inline-block">&nbsp;</span>
            )}
          </span>
        ))}
      </span>
    </Component>
  );
}

