import { useState, useEffect } from 'react';

/**
 * Hook to spy on scrolling and detect which section ID is currently active.
 * Uses IntersectionObserver with fallback to scroll offset calculation.
 */
export const useScrollSpy = (sectionIds = [], offset = 120) => {
  const [activeId, setActiveId] = useState(sectionIds[0] || '');

  useEffect(() => {
    if (!sectionIds.length) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveId(id);
            return;
          }
        }
      }

      // Default to top section if above all sections
      if (window.scrollY < 100 && sectionIds.length > 0) {
        setActiveId(sectionIds[0]);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, offset]);

  return activeId;
};

