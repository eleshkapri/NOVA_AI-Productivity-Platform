import React, { useEffect, useRef, useState } from 'react';

/**
 * MotionReveal — Luxury Scroll-Triggered Reveal Animation Component
 * - Smooth fade-up, blur-to-sharp, and progressive staggered reveals
 * - 60fps performance via IntersectionObserver and CSS transitions
 * - Automatically respects user preference for reduced motion
 */
export function MotionReveal({
  children,
  className = '',
  animation = 'fade-up', // 'fade-up' | 'fade-in' | 'zoom-in' | 'slide-right'
  delay = 0,
  duration = 350,
  threshold = 0.12,
  once = true,
}) {
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });
  const elementRef = useRef(null);

  useEffect(() => {
    // Skip observer if reduced motion preference is set
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold: typeof window !== 'undefined' && window.innerWidth < 768 ? 0.05 : threshold,
        rootMargin: typeof window !== 'undefined' && window.innerWidth < 768 ? '0px 0px 40px 0px' : '0px 0px -20px 0px',
      }
    );

    const currentEl = elementRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      if (currentEl) {
        observer.unobserve(currentEl);
      }
    };
  }, [threshold, once]);

  // Animation initial & active styles (pure GPU transform & opacity — no CPU blurs)
  const getAnimationStyles = () => {
    switch (animation) {
      case 'fade-up':
        return isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-3';
      case 'fade-in':
        return isVisible ? 'opacity-100' : 'opacity-0';
      case 'zoom-in':
        return isVisible
          ? 'opacity-100 scale-100'
          : 'opacity-0 scale-[0.98]';
      case 'slide-right':
        return isVisible
          ? 'opacity-100 translate-x-0'
          : 'opacity-0 -translate-x-3';
      default:
        return isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3';
    }
  };

  return (
    <div
      ref={elementRef}
      className={`transition-[transform,opacity] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,opacity] ${getAnimationStyles()} ${className}`}
      style={{
        transitionDuration: `${Math.min(duration, 380)}ms`,
        transitionDelay: `${Math.min(delay, 100)}ms`,
      }}
    >
      {children}
    </div>
  );
}
