import React, { useRef, useCallback } from 'react';

function checkReducedMotion() {
  if (typeof window === 'undefined') return false;
  try {
    return Boolean(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  } catch {
    return false;
  }
}

function checkIsTouchDevice() {
  if (typeof window === 'undefined') return false;
  try {
    return Boolean('ontouchstart' in window || navigator.maxTouchPoints > 0);
  } catch {
    return false;
  }
}

export function TiltCard({
  children,
  className = '',
  maxTilt = 8,
  scale = 1.02,
  glare = true,
  onClick,
  title,
  ...props
}) {
  const cardRef = useRef(null);
  const glareRef = useRef(null);
  const reducedMotion = checkReducedMotion();
  const isTouch = checkIsTouchDevice();
  const tiltDisabled = reducedMotion || isTouch;
  const rafRef = useRef(null);

  const handleMouseMove = useCallback(
    (e) => {
      if (tiltDisabled || !cardRef.current) return;

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = -((y - centerY) / centerY) * maxTilt;
        const rotateY = ((x - centerX) / centerX) * maxTilt;

        cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(
          2
        )}deg) scale3d(${scale}, ${scale}, ${scale})`;

        if (glare && glareRef.current) {
          const glareX = (x / rect.width) * 100;
          const glareY = (y / rect.height) * 100;
          glareRef.current.style.background = `radial-gradient(circle 320px at ${glareX.toFixed(1)}% ${glareY.toFixed(1)}%, rgba(216, 180, 82, 0.16), rgba(104, 51, 255, 0.08) 45%, transparent 75%)`;
        }
      });
    },
    [tiltDisabled, maxTilt, scale, glare]
  );

  const handleMouseEnter = () => {
    if (tiltDisabled || !cardRef.current) return;
    cardRef.current.style.willChange = 'transform';
    cardRef.current.style.transition = 'transform 0.08s ease-out';
    if (glare && glareRef.current) {
      glareRef.current.style.opacity = '1';
    }
  };

  const handleMouseLeave = () => {
    if (tiltDisabled || !cardRef.current) return;
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    cardRef.current.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    cardRef.current.style.willChange = 'auto';
    if (glare && glareRef.current) {
      glareRef.current.style.opacity = '0';
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      title={title}
      style={{
        transform: reducedMotion ? undefined : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className={`relative active:scale-[0.98] active:transition-transform active:duration-150 ${className}`}
      {...props}
    >
      {/* Moving Specular Holographic Glare Layer */}
      {glare && !tiltDisabled && (
        <div
          ref={glareRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden transition-opacity duration-300 z-20 opacity-0"
          style={{
            background:
              'radial-gradient(circle 320px at 50% 50%, rgba(216, 180, 82, 0.16), rgba(104, 51, 255, 0.08) 45%, transparent 75%)',
          }}
        />
      )}

      {children}
    </div>
  );
}

export default TiltCard;
