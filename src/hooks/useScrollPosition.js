import { useState, useEffect } from 'react';
import { smoothScrollService } from '../services/SmoothScrollService';

export function useScrollPosition() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const shouldShow = currentScrollY > 400;
          setShowBackToTop((prev) => (prev !== shouldShow ? shouldShow : prev));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    smoothScrollService.scrollTo(0, { duration: 1.5 });
  };

  return {
    showBackToTop,
    scrollToTop,
  };
}
