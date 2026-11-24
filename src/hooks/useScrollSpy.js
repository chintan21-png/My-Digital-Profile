import { useState, useEffect } from 'react';

/**
 * Hook to spy on scrolling and detect which section ID is currently active.
 * Uses IntersectionObserver with fallback to scroll offset calculation.
 */
export const useScrollSpy = (sectionIds = [], offset = 120) => {
  const [activeId, setActiveId] = useState(sectionIds[0] || '');

  useEffect(() => {
    if (!sectionIds.length) return;

    let rafId = null;

    const evaluate = () => {
      rafId = null;
      const scrollPosition = window.scrollY + offset;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveId((prev) => (prev === id ? prev : id));
            return;
          }
        }
      }

      // Default to top section if above all sections
      if (window.scrollY < 100 && sectionIds.length > 0) {
        const fallback = sectionIds[0];
        setActiveId((prev) => (prev === fallback ? prev : fallback));
      }
    };

    const handleScroll = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(evaluate);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    evaluate(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, [sectionIds, offset]);

  return activeId;
};

