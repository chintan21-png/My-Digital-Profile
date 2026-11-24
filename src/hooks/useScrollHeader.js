import { useState, useEffect } from 'react';

/**
 * Hook to track scroll state for dynamic header styling.
 * Only triggers a React state update when crossing the threshold
 * (unless trackScrollY is explicitly enabled).
 */
export const useScrollHeader = (threshold = 20, { trackScrollY = false } = {}) => {
  const [isScrolled, setIsScrolled] = useState(() =>
    typeof window !== 'undefined' ? window.scrollY > threshold : false
  );
  const [scrollY, setScrollY] = useState(() =>
    trackScrollY && typeof window !== 'undefined' ? window.scrollY : 0
  );

  useEffect(() => {
    let rafId = null;

    const update = () => {
      rafId = null;
      const currentY = window.scrollY;
      const nextScrolled = currentY > threshold;
      setIsScrolled((prev) => (prev === nextScrolled ? prev : nextScrolled));
      if (trackScrollY) {
        setScrollY((prev) => (prev === currentY ? prev : currentY));
      }
    };

    const onScroll = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(update);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, [threshold, trackScrollY]);

  return { isScrolled, scrollY };
};

