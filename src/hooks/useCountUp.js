import { useState, useEffect, useRef } from 'react';

export function useCountUp(target, duration = 2000, decimals = 0) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    let animId = null;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = performance.now();

          const updateCount = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Cubic ease-out curve for natural deceleration
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            const currentCount = easeOutProgress * target;

            setCount(currentCount);

            if (progress < 1) {
              animId = requestAnimationFrame(updateCount);
            } else {
              setCount(target);
            }
          };

          animId = requestAnimationFrame(updateCount);
        }
      },
      { threshold: 0.25 }
    );

    const currentElem = elementRef.current;
    if (currentElem) {
      observer.observe(currentElem);
    }

    return () => {
      if (animId) {
        cancelAnimationFrame(animId);
      }
      if (currentElem) {
        observer.unobserve(currentElem);
      }
    };
  }, [target, duration]);

  return [elementRef, decimals > 0 ? count.toFixed(decimals) : Math.floor(count)];
}
