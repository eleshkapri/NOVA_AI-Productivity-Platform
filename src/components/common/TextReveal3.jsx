import React, { useEffect, useRef, useState, useMemo } from 'react';

/**
 * TextReveal3 — Ultra-Performant Staggered Slide Text Reveal
 * 
 * Features:
 * - Animation 3 horizontal slide-in (translateX: 24px -> 0px + opacity: 0 -> 1)
 * - Bi-directional scroll triggering (up & down) via lightweight IntersectionObserver
 * - Zero GPU compositor layer explosion (no permanent will-change on hundreds of spans)
 * - Smart 'words' mode for paragraphs/subtitles and 'chars' mode for titles/eyebrows
 * - Automatic mobile optimization and reduced-motion fallback
 */
export function TextReveal3({
  text = '',
  as: Component = 'span',
  delay = 0,
  stagger = 10,
  duration = 280,
  offsetDistance = 16,
  once = false,
  mode = 'auto', // 'auto' | 'words' | 'chars'
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
          setIsVisible(false);
        }
      },
      {
        threshold: 0.02,
        rootMargin: '0px 0px 40px 0px',
      }
    );

    observer.observe(currentEl);

    return () => {
      observer.unobserve(currentEl);
    };
  }, [once]);


  const rawString = typeof text === 'string' || typeof text === 'number' ? String(text) : '';

  // Determine split strategy: if auto and string is long (>45 chars), use 'words' to prevent DOM bloat
  const activeMode = useMemo(() => {
    if (mode === 'auto') {
      return rawString.length > 45 ? 'words' : 'chars';
    }
    return mode;
  }, [mode, rawString.length]);

  const splitData = useMemo(() => {
    if (!rawString) return [];
    const words = rawString.split(' ');

    if (activeMode === 'words') {
      return words.map((word, idx) => ({
        word,
        index: idx,
      }));
    }

    // Char-level splitting
    let charCounter = 0;
    return words.map((word) => {
      const chars = Array.from(word).map((char) => {
        const idx = charCounter;
        charCounter += 1;
        return { char, index: idx };
      });
      charCounter += 1;
      return { word, chars };
    });
  }, [rawString, activeMode]);

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
        {activeMode === 'words' ? (
          // Word-by-word reveal (Ultra lightweight for descriptions & long text)
          splitData.map((item, wordIdx) => {
            const wordDelay = delay + item.index * (stagger * 1.8);
            return (
              <span
                key={`w-${wordIdx}-${item.word}`}
                className="inline-block whitespace-nowrap"
              >
                <span
                  className={`inline-block transition-[transform,opacity] ${letterClassName}`}
                  style={{
                    transform: isVisible
                      ? 'translate3d(0, 0, 0)'
                      : `translate3d(${offsetDistance}px, 0, 0)`,
                    opacity: isVisible ? 1 : 0,
                    transitionDuration: `${duration}ms`,
                    transitionDelay: `${wordDelay}ms`,
                    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  {item.word}
                </span>
                {wordIdx < splitData.length - 1 && (
                  <span className="inline-block">&nbsp;</span>
                )}
              </span>
            );
          })
        ) : (
          // Char-by-char reveal (For titles, badges, and display headings)
          splitData.map((item, wordIdx) => (
            <span
              key={`w-${wordIdx}-${item.word}`}
              className="inline-block whitespace-nowrap"
            >
              {item.chars.map((charItem, charIdx) => {
                const charDelay = delay + charItem.index * stagger;
                return (
                  <span
                    key={`c-${charIdx}-${charItem.char}`}
                    className={`inline-block transition-[transform,opacity] ${letterClassName}`}
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
          ))
        )}
      </span>
    </Component>
  );
}


