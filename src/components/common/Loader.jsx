import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { RiCodeSSlashLine } from 'react-icons/ri';
import { NAV_BRAND } from '../../data/navigation';
import profileImg from '../../assets/wmremove-transformed.png';

/**
 * High-End Launch Loader / Preloader Component
 *
 * Ensures the portfolio only reveals after DOM readiness, web fonts,
 * and critical assets are fully loaded, with a smooth cinematic reveal.
 */
export const Loader = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [isReadyToExit, setIsReadyToExit] = useState(false);

  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const progressLineRef = useRef(null);

  // Derived status message based on progress percentages
  const statusText =
    progress < 25
      ? 'INITIALIZING ENVIRONMENT'
      : progress < 50
      ? 'LOADING ASSETS & TYPOGRAPHY'
      : progress < 75
      ? 'CONFIGURING UI COMPONENTS'
      : progress < 99
      ? 'FINALIZING PORTFOLIO'
      : 'PORTFOLIO READY';

  // Loading synchronization & progress progression
  useEffect(() => {
    let isMounted = true;
    let windowLoaded = document.readyState === 'complete';
    let fontsLoaded = false;
    let imagesLoaded = false;
    const startTime = Date.now();
    const MIN_LOAD_TIME = 1300; // Minimum aesthetic display time in ms

    // Lock body and lenis scrolling while loader is active
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    if (window.__lenis) {
      window.__lenis.stop();
    }

    // 1. Check window load
    const handleWindowLoad = () => {
      windowLoaded = true;
    };
    if (!windowLoaded) {
      window.addEventListener('load', handleWindowLoad);
    }

    // 2. Check font readiness
    if (document.fonts?.ready) {
      document.fonts.ready
        .then(() => {
          fontsLoaded = true;
        })
        .catch(() => {
          fontsLoaded = true;
        });
    } else {
      fontsLoaded = true;
    }

    // 3. Preload critical images & lazy components in background
    const img = new Image();
    img.src = profileImg;
    img.onload = () => {
      imagesLoaded = true;
    };
    img.onerror = () => {
      imagesLoaded = true;
    };

    // Preload top components
    import('../sections/Hero').catch(() => {});
    import('../sections/Work').catch(() => {});
    import('../sections/About').catch(() => {});

    // Progress counter animation loop
    let currentProgress = 0;
    const interval = setInterval(() => {
      if (!isMounted) return;

      const elapsed = Date.now() - startTime;
      const allResourcesLoaded = windowLoaded && fontsLoaded && imagesLoaded;
      const minTimePassed = elapsed >= MIN_LOAD_TIME;

      if (allResourcesLoaded && minTimePassed) {
        // Accelerate to 100% when everything is truly ready
        if (currentProgress < 100) {
          currentProgress += Math.max(2, Math.floor((100 - currentProgress) * 0.45));
          if (currentProgress >= 100) {
            currentProgress = 100;
            clearInterval(interval);
            setProgress(100);
            setIsReadyToExit(true);
            return;
          }
          setProgress(currentProgress);
        }
      } else {
        // Smoothly progress towards 90% while waiting
        if (currentProgress < 30) {
          currentProgress += Math.floor(Math.random() * 4) + 2;
        } else if (currentProgress < 65) {
          currentProgress += Math.floor(Math.random() * 3) + 1;
        } else if (currentProgress < 88) {
          currentProgress += 1;
        } else if (currentProgress < 94) {
          // Slow trickle near 94% until fully loaded
          currentProgress += 0.3;
        }
        setProgress(Math.floor(currentProgress));
      }
    }, 28);

    // Safety fallback timeout to never get stuck
    const safetyTimeout = setTimeout(() => {
      windowLoaded = true;
      fontsLoaded = true;
      imagesLoaded = true;
    }, 4500);

    return () => {
      isMounted = false;
      clearInterval(interval);
      clearTimeout(safetyTimeout);
      window.removeEventListener('load', handleWindowLoad);
    };
  }, []);

  // Exit animation when progress reaches 100%
  useEffect(() => {
    if (!isReadyToExit) return;

    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          defaults: { ease: 'power4.inOut' },
          onComplete: () => {
            // Restore smooth scrolling and refresh triggers
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
            if (window.__lenis) {
              window.__lenis.start();
              window.__lenis.resize();
            }
            window.dispatchEvent(new Event('resize'));
            if (onFinish) {
              onFinish();
            }
          },
        });

        // 1. Subtle content fade up
        tl.to(contentRef.current, {
          y: -25,
          opacity: 0,
          duration: 0.45,
          ease: 'power2.in',
        });

        // 2. Cinematic curtain slide up
        tl.to(
          containerRef.current,
          {
            yPercent: -100,
            duration: 0.85,
            ease: 'power4.inOut',
          },
          '-=0.15'
        );
      }, containerRef);

      return () => ctx.revert();
    }, 320);

    return () => clearTimeout(timer);
  }, [isReadyToExit, onFinish]);

  return (
    <aside
      ref={containerRef}
      aria-label="Loading portfolio"
      aria-live="polite"
      className="fixed inset-0 z-[99999] flex flex-col justify-between bg-[#0B0C12] text-white select-none overflow-hidden"
      style={{
        backgroundImage:
          'radial-gradient(circle at 50% 50%, rgba(59, 91, 255, 0.08) 0%, rgba(11, 12, 18, 0.95) 70%, #0B0C12 100%)',
      }}
    >
      {/* Background Tech Grid Pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      {/* Top Header Bar */}
      <div className="relative z-10 flex items-center justify-between px-6 py-6 sm:px-10 sm:py-8">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.06] border border-white/10 text-[#3B5BFF] shadow-inner">
            <RiCodeSSlashLine className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-cabinet text-sm font-extrabold tracking-wide uppercase text-white">
              {NAV_BRAND?.name || 'Chintan Nakum'}
            </span>
            <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
              Digital Portfolio
            </span>
          </div>
        </div>

        {/* Status Pill Indicator */}
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="font-mono text-[11px] font-medium tracking-wider text-zinc-300 uppercase">
            {progress < 100 ? 'Launching' : 'Ready'}
          </span>
        </div>
      </div>

      {/* Center Section: Animated Counter & Dynamic Status */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center justify-center text-center px-4 my-auto"
      >
        {/* Monogram Badge */}
        <div className="relative mb-6 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-white/[0.04] border border-white/10 shadow-[0_0_30px_rgba(59,91,255,0.15)]">
          <span className="font-syncopate text-lg sm:text-xl font-bold tracking-widest text-[#3B5BFF]">
            {NAV_BRAND?.monogram || 'CN'}
          </span>
          {/* Subtle spinning accent border */}
          <div className="absolute inset-0 rounded-2xl border border-[#3B5BFF]/30 animate-pulse" />
        </div>

        {/* Digital Percentage Display */}
        <div className="flex items-baseline justify-center font-syncopate text-6xl sm:text-8xl md:text-9xl font-extrabold tracking-tight text-white drop-shadow-[0_0_35px_rgba(59,91,255,0.35)]">
          <span>{String(progress).padStart(2, '0')}</span>
          <span className="text-3xl sm:text-4xl md:text-5xl font-light text-[#3B5BFF] ml-1 sm:ml-2">
            %
          </span>
        </div>

        {/* Dynamic Status Progress Message */}
        <div className="mt-5 flex items-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 backdrop-blur-sm">
          <div className="h-1.5 w-1.5 rounded-full bg-[#3B5BFF] animate-ping" />
          <span className="font-mono text-[11px] sm:text-xs tracking-[0.2em] text-zinc-400 uppercase">
            {statusText}
          </span>
        </div>
      </div>

      {/* Bottom Bar: Progress Track & System Details */}
      <div className="relative z-10 px-6 pb-6 sm:px-10 sm:pb-8 flex flex-col gap-4">
        {/* Sleek Gradient Progress Track */}
        <div className="w-full h-1 sm:h-1.5 bg-white/[0.08] rounded-full overflow-hidden">
          <div
            ref={progressLineRef}
            className="h-full bg-gradient-to-r from-[#3B5BFF] via-[#748DFF] to-[#3B5BFF] rounded-full transition-all duration-150 ease-out shadow-[0_0_12px_#3B5BFF]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Meta Information Footer */}
        <div className="flex items-center justify-between font-mono text-[10px] sm:text-[11px] text-zinc-500 uppercase tracking-widest">
          <span>{NAV_BRAND?.role || 'Full-Stack Developer'}</span>
          <span className="hidden sm:inline">Crafting High-Performance Web</span>
          <span>© 2026</span>
        </div>
      </div>
    </aside>
  );
};

export default Loader;
