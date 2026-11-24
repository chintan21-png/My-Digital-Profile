import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook to detect when an element scrolls into view.
 * Uses IntersectionObserver — mobile-safe rootMargin that never
 * exceeds the actual viewport so elements always get a chance to reveal.
 */
export const useScrollReveal = ({
  threshold = 0.08,
  rootMargin,
  triggerOnce = true,
} = {}) => {
  const ref = useRef(null);

  // Respect prefers-reduced-motion — reveal immediately
  const prefersReduced =
    typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  const [isRevealed, setIsRevealed] = useState(prefersReduced);

  useEffect(() => {
    if (isRevealed && triggerOnce) return;

    const node = ref.current;
    if (!node) return;

    // On mobile, trigger as soon as the element reaches the bottom edge
    // so cards don't stay hidden while scrolling.
    const safeMargin = (() => {
      if (rootMargin) return rootMargin;
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
      if (isMobile) return '0px 0px 20px 0px';
      const vh = window.innerHeight;
      const clampedPx = Math.min(30, Math.floor(vh * 0.05));
      return `0px 0px -${clampedPx}px 0px`;
    })();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          if (triggerOnce) observer.unobserve(entry.target);
        } else if (!triggerOnce) {
          setIsRevealed(false);
        }
      },
      { threshold, rootMargin: safeMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce, isRevealed]);

  return [ref, isRevealed];
};

export default useScrollReveal;

