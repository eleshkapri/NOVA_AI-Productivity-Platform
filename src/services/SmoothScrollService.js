/**
 * SmoothScrollService provides fast, hardware-accelerated native scrolling
 * matching https://nova-ai-kapri.vercel.app/ with zero wheel latency,
 * 1:1 input tracking, and smooth programmatic navigation.
 */
class SmoothScrollService {
  constructor() {
    this.lenis = null;
  }

  /**
   * Initializes scroll service (native smooth scrolling is handled by browser compositor).
   */
  init() {
    return null;
  }

  /**
   * Smoothly scrolls to a target (selector, DOM element, or pixel number)
   * using native browser smooth scrolling at 60/120Hz.
   */
  scrollTo(target, options = {}) {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isImmediate = options.immediate || prefersReducedMotion;
    const behavior = isImmediate ? 'auto' : 'smooth';

    if (typeof target === 'number') {
      window.scrollTo({ top: target, behavior });
    } else {
      const el = typeof target === 'string' ? document.querySelector(target) : target;
      if (el) {
        const offset = options.offset !== undefined ? options.offset : -70;
        const targetY = el.getBoundingClientRect().top + window.scrollY + offset;
        window.scrollTo({ top: Math.max(0, targetY), behavior });
      }
    }
    options.onComplete?.();
  }

  /**
   * Recalculates document dimensions when view or content changes.
   */
  resize() {}

  /**
   * Cleanly destroys scroll listeners if any.
   */
  destroy() {}
}

export const smoothScrollService = new SmoothScrollService();
export default smoothScrollService;
