import { useState, useEffect } from 'react';

/**
 * Responsive hook to detect if the screen width is mobile (< 768px).
 * Re-evaluates smoothly on window resize and device orientation change.
 */
export const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(`(max-width: ${breakpoint - 1}px)`).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const updateMatch = (e) => setIsMobile(e.matches);

    const rafId = window.requestAnimationFrame(() => {
      setIsMobile((prev) => (prev === mql.matches ? prev : mql.matches));
    });

    if (mql.addEventListener) {
      mql.addEventListener('change', updateMatch);
      return () => {
        window.cancelAnimationFrame(rafId);
        mql.removeEventListener('change', updateMatch);
      };
    } else {
      mql.addListener(updateMatch);
      return () => {
        window.cancelAnimationFrame(rafId);
        mql.removeListener(updateMatch);
      };
    }
  }, [breakpoint]);

  return isMobile;
};

export default useIsMobile;
