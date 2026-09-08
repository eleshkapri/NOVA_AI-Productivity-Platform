import React, { useRef, useState, useCallback } from 'react';

function checkMotionDisabled() {
  if (typeof window === 'undefined') return false;
  try {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    return Boolean(prefersReduced || isTouch);
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
  const [isDisabled] = useState(checkMotionDisabled);
  const rafRef = useRef(null);

  const handleMouseMove = useCallback(
    (e) => {
      if (isDisabled || !cardRef.current) return;

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
    [isDisabled, maxTilt, scale, glare]
  );

  const handleMouseEnter = () => {
    if (isDisabled) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (isDisabled) return;
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
        transform: isDisabled ? undefined : transform,
        transformStyle: 'preserve-3d',
        transition: isHovered
          ? 'transform 0.08s ease-out'
          : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: isDisabled ? 'auto' : 'transform',
      }}
      className={`relative ${className}`}
      {...props}
    >
      {/* Moving Specular Holographic Glare Layer */}
      {glare && !isDisabled && (
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
