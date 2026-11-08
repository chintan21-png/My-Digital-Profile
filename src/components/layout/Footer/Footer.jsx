import { useState, useEffect, useRef } from 'react';
import { LuArrowUp } from 'react-icons/lu';
import { NAV_BRAND, SOCIAL_LINKS } from '../../../data/navigation';

export const Footer = () => {
  const footerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [clipProgress, setClipProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // 1. Calculate overall page scroll progress for back-to-top circular indicator
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = window.scrollY / totalHeight;
        setScrollProgress(Math.min(Math.max(currentProgress, 0), 1));
      }

      // 2. Calculate footer visibility progress for the liquid fill clip-path effect
      if (footerRef.current) {
        const rect = footerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        // Start revealing as footer enters viewport, fully revealed when well in view
        const totalDistance = rect.height * 0.75;
        const distanceScrolledIntoView = windowHeight - rect.top;
        const rawProgress = distanceScrolledIntoView / totalDistance;
        setClipProgress(Math.min(Math.max(rawProgress, 0), 1));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer
      ref={footerRef}
      data-testid="footer"
      className="relative overflow-hidden border-t border-black/[0.08] bg-white px-6 pb-8 pt-16 md:px-12 md:pt-24 lg:px-20 font-cabinet"
    >
      {/* Giant Typography Background with Stroke & Overlay Liquid Fill in Cabinet Grotesk */}
      <div className="relative select-none pointer-events-none" aria-hidden="true">
        <h2
          className="text-stroke whitespace-nowrap text-center font-cabinet text-[10vw] sm:text-[11vw] font-bold uppercase leading-[0.85] tracking-[-0.03em]"
          style={{ fontFamily: "'Cabinet Grotesk', -apple-system, BlinkMacSystemFont, sans-serif" }}
        >
          {NAV_BRAND.name}
        </h2>
        <h2
          className="absolute inset-0 whitespace-nowrap text-center font-cabinet text-[10vw] sm:text-[11vw] font-bold uppercase leading-[0.85] tracking-[-0.03em] text-black transition-[clip-path] duration-150 ease-out"
          style={{
            fontFamily: "'Cabinet Grotesk', -apple-system, BlinkMacSystemFont, sans-serif",
            clipPath: `inset(${(1 - clipProgress) * 100}% 0px 0px)`,
            willChange: 'clip-path',
          }}
        >
          {NAV_BRAND.name}
        </h2>
      </div>

      {/* Bottom Bar: Copyright, Tech/Socials, and Circular Progress Back-to-Top Button */}
      <div className="mt-10 flex flex-col items-center justify-between gap-6 border-t border-black/[0.08] pt-6 md:flex-row">
        {/* Left: Copyright & Location */}
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500 text-center md:text-left">
          © {currentYear} {NAV_BRAND.name} — Ahmedabad, IN
        </p>

        {/* Center: Tech Stack & Social Links */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500">
            React · Tailwind CSS · Vite
          </p>
          <span className="hidden sm:inline text-neutral-300 font-mono text-[10px]">·</span>
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.ariaLabel}
                className="font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500 transition-colors hover:text-[#3B5BFF]"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>

        {/* Right: Back to Top Button with Circular Scroll Progress Indicator */}
        <div className="flex items-center justify-center">
          <button
            type="button"
            onClick={scrollToTop}
            data-testid="back-to-top"
            aria-label="Back to top"
            className="group relative flex size-14 items-center justify-center rounded-full border border-black/10 bg-white transition-colors duration-300 hover:border-[#3B5BFF] cursor-pointer shadow-sm"
          >
            {/* Circular Progress SVG */}
            <svg
              viewBox="0 0 56 56"
              className="absolute inset-0 size-full -rotate-90 pointer-events-none"
              aria-hidden="true"
            >
              <circle
                cx="28"
                cy="28"
                r="25"
                fill="none"
                stroke="rgba(17,17,17,0.08)"
                strokeWidth="2"
              />
              <circle
                cx="28"
                cy="28"
                r="25"
                fill="none"
                stroke="#3B5BFF"
                strokeWidth="2"
                strokeLinecap="round"
                pathLength="1"
                style={{
                  strokeDasharray: '1, 1',
                  strokeDashoffset: Math.max(0, Math.min(1, 1 - scrollProgress)),
                }}
                className="transition-[stroke-dashoffset] duration-150 ease-out"
              />
            </svg>

            {/* Up Arrow Icon */}
            <LuArrowUp
              className="size-4 text-black transition-transform duration-300 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
