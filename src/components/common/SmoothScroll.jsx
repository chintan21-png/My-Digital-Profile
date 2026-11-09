import { useEffect } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'lenis/dist/lenis.css';

/**
 * Synchronization bridge between Lenis and GSAP ScrollTrigger
 * Driven by GSAP's RAF ticker for zero-latency, stutter-free scroll animations.
 */
function LenisGsapSync() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    // Ensure ScrollTrigger is registered
    gsap.registerPlugin(ScrollTrigger);

    // Synchronize Lenis scroll updates with GSAP ScrollTrigger
    const handleScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on('scroll', handleScroll);

    // Drive Lenis RAF loop through GSAP's ticker
    const handleTicker = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(handleTicker);
    gsap.ticker.lagSmoothing(0);

    // Expose lenis instance globally for helper access
    window.__lenis = lenis;

    // Refresh dimensions once fonts finish loading to prevent layout shift miscalculations
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        lenis.resize();
        ScrollTrigger.refresh();
      });
    }

    return () => {
      lenis.off('scroll', handleScroll);
      gsap.ticker.remove(handleTicker);
      if (window.__lenis === lenis) {
        delete window.__lenis;
      }
    };
  }, [lenis]);

  return null;
}

/**
 * SmoothScroll component wrapping the application with Lenis smooth scrolling.
 */
export const SmoothScroll = ({ children }) => {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.2,
        autoRaf: false,
        anchors: {
          offset: -90,
        },
      }}
    >
      <LenisGsapSync />
      {children}
    </ReactLenis>
  );
};

export default SmoothScroll;
