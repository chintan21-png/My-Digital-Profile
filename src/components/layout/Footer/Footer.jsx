import { useEffect, useRef } from 'react';
import { LuArrowUp } from 'react-icons/lu';
import { NAV_BRAND, SOCIAL_LINKS } from '../../../data/navigation';
import TechText from '../../ui/TechText';

export const Footer = () => {
  const footerRef = useRef(null);
  const progressCircleRef = useRef(null);

  useEffect(() => {
    let rafId = null;

    const updateProgress = () => {
      rafId = null;
      const circle = progressCircleRef.current;
      if (!circle) return;

      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        totalHeight > 0
          ? Math.min(Math.max(window.scrollY / totalHeight, 0), 1)
          : 0;
      const dashOffset = Math.max(0, Math.min(1, 1 - progress));
      circle.style.strokeDashoffset = dashOffset.toFixed(4);
    };

    const scheduleUpdate = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(updateProgress);
      }
    };

    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
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
      className="relative overflow-hidden border-t border-black/[0.08] bg-white px-6 pb-8 pt-4 sm:pt-6 md:pt-8 lg:px-20 font-cabinet"
    >
      {/* Interactive TechText Typography from React Bits */}
      <div className="relative w-full h-[160px] sm:h-[200px] md:h-[240px] lg:h-[280px] select-none flex items-center justify-center">
        <TechText
          text={NAV_BRAND.name.toUpperCase().replace(' ', '\u00A0\u00A0\u00A0')}
          fontFamily="'Panchang', -apple-system, BlinkMacSystemFont, sans-serif"
          fontWeight={800}
          fontSize={160}
          letterSpacing={0.08}
          color="#0B0C12"
          accentColor="#3B5BFF"
          reveal="letter"
          dashLength={4}
          dashGap={2}
          specks={15}
          intro="none"
          introDuration={2}
          clickKick
          guides={false}
        />
      </div>

      {/* Bottom Bar: Copyright, Tech/Socials, and Circular Progress Back-to-Top Button */}
      <div className="mt-4 sm:mt-6 flex flex-col items-center justify-between gap-6 border-t border-black/[0.08] pt-6 md:flex-row">
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
                ref={progressCircleRef}
                cx="28"
                cy="28"
                r="25"
                fill="none"
                stroke="#3B5BFF"
                strokeWidth="2"
                strokeLinecap="round"
                pathLength="1"
                strokeDasharray="1, 1"
                strokeDashoffset="1"
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
