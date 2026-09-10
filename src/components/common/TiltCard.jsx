import React, { useRef, useState, useCallback } from 'react';

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
  const [transform, setTransform] = useState(
    'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
  );
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [reducedMotion] = useState(checkReducedMotion);
  const [isTouch] = useState(checkIsTouchDevice);
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

        setTransform(
          `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(
            2
          )}deg) scale3d(${scale}, ${scale}, ${scale})`
        );

        if (glare) {
          const glareX = (x / rect.width) * 100;
          const glareY = (y / rect.height) * 100;
          setGlarePosition({ x: glareX, y: glareY });
        }
      });
    },
    [tiltDisabled, maxTilt, scale, glare]
  );

  const handleMouseEnter = () => {
    if (tiltDisabled) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (tiltDisabled) return;
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    setIsHovered(false);
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
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
        transform: reducedMotion ? undefined : transform,
        transformStyle: 'preserve-3d',
        transition: isHovered
          ? 'transform 0.08s ease-out'
          : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: reducedMotion ? 'auto' : 'transform',
      }}
      className={`relative active:scale-[0.98] active:transition-transform active:duration-150 ${className}`}
      {...props}
    >
      {/* Moving Specular Holographic Glare Layer */}
      {glare && !tiltDisabled && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden transition-opacity duration-300 z-20"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(circle 320px at ${glarePosition.x}% ${glarePosition.y}%, rgba(216, 180, 82, 0.16), rgba(104, 51, 255, 0.08) 45%, transparent 75%)`,
          }}
        />
      )}

      {children}
    </div>
  );
}
