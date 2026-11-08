import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import {
  LuAtom,
  LuZap,
  LuMapPin,
  LuClock,
  LuAsterisk,
  LuArrowDown,
} from 'react-icons/lu';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

export const Hero = () => {
  const { hero, contact } = PORTFOLIO_DATA;
  const listRef = useRef(null);

  // Real-time local clock
  const [localTime, setLocalTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setLocalTime(
        now.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })
      );
    };

    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  // Subtle interactive mouse parallax
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = ((e.clientX - innerWidth / 2) / (innerWidth / 2)) * 1;
      const y = ((e.clientY - innerHeight / 2) / (innerHeight / 2)) * 1;
      setMouseOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Location resolution from user data or default
  const locationDisplay = contact?.location
    ? contact.location.split('(')[0].trim()
    : 'Amsterdam, NL';

  // Dynamic Name splitting from portfolioData (e.g. "Chintan Nakum" -> "CHINTAN" + "NAKUM")
  const nameString = (hero?.name || 'Chintan Nakum').trim();
  const nameWords = nameString.split(/\s+/);
  const firstName = nameWords[0]?.toUpperCase() || 'CHINTAN';
  const lastName =
    nameWords.length > 1
      ? nameWords.slice(1).join(' ').toUpperCase()
      : '';

  // Dynamic Title splitting from portfolioData (e.g. "Full - Stack Developer" -> "FULL-STACK" + "DEVELOPER")
  const titleString = (hero?.title || 'Full-Stack Developer')
    .replace(/\s*-\s*/g, '-')
    .trim();
  const titleWords = titleString.split(/\s+/);
  const rolePrefix =
    titleWords.length > 1
      ? titleWords.slice(0, -1).join(' ').toUpperCase()
      : titleWords[0].toUpperCase();
  const roleSuffix =
    titleWords.length > 1
      ? titleWords[titleWords.length - 1].toUpperCase()
      : '';

  // GSAP Gradient Text Intro and Interactive Hover Animation
  useEffect(() => {
    gsap.registerPlugin(CustomEase);

    // Exact custom cubic-bezier ease curve from the animation snippet
    const customEase = CustomEase.create(
      'heroGradientEase',
      'M0,0 C0.548,0.032 0.63,1 1,1 '
    );

    const ctx = gsap.context(() => {
      const items = listRef.current?.querySelectorAll('.hero-gradient-item');
      if (!items || items.length === 0) return;

      // Initialize stops to 0%
      gsap.set(items, { '--stop-hover': '0%', '--stop-active': '0%' });

      // Staggered intro timeline
      gsap
        .timeline({
          defaults: {
            duration: 0.48,
          },
        })
        .to(items, {
          '--stop-active': '100%',
          stagger: {
            each: 0.1,
            ease: customEase,
          },
        })
        .to(items, {
          '--stop-hover': '100%',
          stagger: {
            each: 0.1,
          },
        })
        .to(
          items,
          {
            '--stop-hover': '0%',
            stagger: {
              each: -0.1,
            },
          },
          '-=0.1'
        );

      // Interactive hover handlers on each list item
      items.forEach((item) => {
        const onMouseEnter = () => {
          gsap.to(item, {
            '--stop-hover': '100%',
            ease: customEase,
            duration: 0.36,
            overwrite: 'auto',
          });
        };

        const onMouseLeave = () => {
          gsap.to(item, {
            '--stop-hover': '0%',
            ease: customEase,
            duration: 0.36,
            overwrite: 'auto',
          });
        };

        item.addEventListener('mouseenter', onMouseEnter);
        item.addEventListener('mouseleave', onMouseLeave);
      });
    }, listRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      data-testid="hero"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden font-cabinet"
    >
      {/* Background Gradient Orbs */}
      {/* Orb 1: Soft Lavender / Periwinkle Blue at Top Left */}
      <div
        className="pointer-events-none absolute z-0 left-[-10%] top-[-14%] size-[46vw] min-w-[320px] min-h-[320px] transition-transform duration-700 ease-out"
        aria-hidden="true"
        style={{
          transform: `translateX(${mouseOffset.x * 12 + 9}px) translateY(${mouseOffset.y * -10 - 8}px)`,
        }}
      >
        <div className="size-full rounded-full opacity-80 blur-[90px] bg-[#DCE4FF]">
          <div
            className="size-full rounded-full transition-transform duration-1000 ease-out"
            style={{
              transform: `translateX(${mouseOffset.x * 8 + 8}px) translateY(${mouseOffset.y * -6 - 5}px) scale(1.027)`,
            }}
          />
        </div>
      </div>

      {/* Orb 2: Soft Peach / Warm Blush at Top Right */}
      <div
        className="pointer-events-none absolute z-0 right-[-12%] top-[4%] size-[38vw] min-w-[300px] min-h-[300px] transition-transform duration-700 ease-out"
        aria-hidden="true"
        style={{
          transform: `translateX(${mouseOffset.x * -10 - 7}px) translateY(${mouseOffset.y * 9 + 6}px)`,
        }}
      >
        <div className="size-full rounded-full opacity-80 blur-[90px] bg-[#FFE9DB]">
          <div
            className="size-full rounded-full transition-transform duration-1000 ease-out"
            style={{
              transform: `translateX(${mouseOffset.x * -3}px) translateY(${mouseOffset.y * 2}px) scale(0.999)`,
            }}
          />
        </div>
      </div>

      {/* Orb 3: Soft Spring Lime / Mint Green at Bottom Center */}
      <div
        className="pointer-events-none absolute z-0 bottom-[-18%] left-[26%] size-[34vw] min-w-[280px] min-h-[280px] transition-transform duration-700 ease-out"
        aria-hidden="true"
        style={{
          transform: `translateX(${mouseOffset.x * 7 + 5}px) translateY(${mouseOffset.y * -6 - 4}px)`,
        }}
      >
        <div className="size-full rounded-full opacity-80 blur-[90px] bg-[#EFFFD3]">
          <div
            className="size-full rounded-full transition-transform duration-1000 ease-out"
            style={{
              transform: `translateX(${mouseOffset.x * 2}px) translateY(${mouseOffset.y * -2}px) scale(1.0001)`,
            }}
          />
        </div>
      </div>

      {/* Floating Interactive Badge 1: Daily Stack (Top-Right) */}
      <div
        className="pointer-events-none absolute z-20 right-[3%] lg:right-[5%] xl:right-[6%] top-[12%] lg:top-[14%] hidden md:flex transition-transform duration-500 ease-out"
        aria-hidden="true"
        style={{
          transform: `translateX(${mouseOffset.x * 12}px) translateY(${mouseOffset.y * -10}px)`,
        }}
      >
        <div style={{ opacity: 1, transform: 'rotate(6deg)' }}>
          <div className="animate-float-1">
            <div className="bg-white flex items-center gap-3 rounded-2xl border border-black/[0.08] px-4 py-3 shadow-card">
              <LuAtom className="size-4 shrink-0 text-[#3B5BFF]" aria-hidden="true" />
              <div>
                <p className="whitespace-nowrap font-cabinet text-xs font-bold text-zinc-800">
                  React · TS
                </p>
                <p className="whitespace-nowrap font-cabinet text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
                  Daily stack
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Interactive Badge: Motion Craft (Upper-Right) */}
      <div
        className="pointer-events-none absolute z-20 right-[5%] lg:right-[7%] xl:right-[9%] top-[27%] lg:top-[29%] hidden md:flex transition-transform duration-500 ease-out"
        aria-hidden="true"
        style={{
          transform: `translateX(${mouseOffset.x * -10}px) translateY(${mouseOffset.y * 10}px)`,
        }}
      >
        <div style={{ opacity: 1, transform: 'rotate(-5deg)' }}>
          <div className="animate-float-2">
            <div className="bg-tint-peach flex items-center gap-3 rounded-2xl border border-black/[0.08] px-4 py-3 shadow-card">
              <LuZap className="size-4 shrink-0 text-[#3B5BFF]" aria-hidden="true" />
              <div>
                <p className="whitespace-nowrap font-cabinet text-xs font-bold text-zinc-800">
                  Motion freak
                </p>
                <p className="whitespace-nowrap font-cabinet text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
                  Framer · GSAP
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Interactive Badge 2: Location (Middle-Right) */}
      <div
        className="pointer-events-none absolute z-20 right-[2%] lg:right-[3%] xl:right-[4%] top-[43%] lg:top-[45%] hidden lg:flex transition-transform duration-500 ease-out"
        aria-hidden="true"
        style={{
          transform: `translateX(${mouseOffset.x * -8}px) translateY(${mouseOffset.y * 8}px)`,
        }}
      >
        <div style={{ opacity: 1, transform: 'rotate(-3deg)' }}>
          <div className="animate-float-2">
            <div className="bg-tint-blue flex items-center gap-3 rounded-2xl border border-black/[0.08] px-4 py-3 shadow-card">
              <LuMapPin className="size-4 shrink-0 text-[#3B5BFF]" aria-hidden="true" />
              <div>
                <p className="whitespace-nowrap font-cabinet text-xs font-bold text-zinc-800">
                  {locationDisplay}
                </p>
                <p className="whitespace-nowrap font-cabinet text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
                  Based in
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Interactive Badge 3: Local Time (Lower-Right) */}
      <div
        className="pointer-events-none absolute z-20 right-[4%] lg:right-[5%] xl:right-[6%] top-[59%] lg:top-[61%] hidden md:flex transition-transform duration-500 ease-out"
        aria-hidden="true"
        style={{
          transform: `translateX(${mouseOffset.x * 8}px) translateY(${mouseOffset.y * -8}px)`,
        }}
      >
        <div style={{ opacity: 1, transform: 'rotate(2deg)' }}>
          <div className="animate-float-1">
            <div className="bg-white flex items-center gap-3 rounded-2xl border border-black/[0.08] px-4 py-3 shadow-card">
              <LuClock className="size-4 shrink-0 text-[#3B5BFF]" aria-hidden="true" />
              <div>
                <p className="whitespace-nowrap font-cabinet text-xs font-bold text-zinc-800">
                  {localTime || '19:24'}
                </p>
                <p className="whitespace-nowrap font-cabinet text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
                  Local time
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area: Centered for Mobile View, Left-Aligned for Desktop */}
      <div className="relative z-10 flex min-h-[calc(100vh-4rem)] w-full max-w-7xl flex-col justify-center items-center md:items-start text-center md:text-left mx-auto px-4 sm:px-6 lg:px-8 pt-26 sm:pt-28 md:pt-32 pb-14 sm:pb-16 gap-7 sm:gap-8">
        
        {/* Availability Status Badge with vibrant green live dot */}
        <div className="flex items-center justify-center md:justify-start w-full">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-black/[0.06] bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm">
            {/* Live green dot with gentle pulsing aura */}
            <span className="relative flex h-2.5 w-2.5 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            <span className="font-cabinet text-xs font-bold uppercase tracking-[0.2em] text-zinc-800">
              Available for work, 2026
            </span>
          </span>
        </div>

        {/* Hero Headline with Syncopate font & GSAP Gradient Wipe Animation */}
        <h1
          className="flex flex-col items-center md:items-start text-center md:text-left w-full"
          data-testid="hero-heading"
          aria-label={`${nameString} - ${titleString}`}
        >
          <ul
            ref={listRef}
            className="flex flex-col gap-3.5 sm:gap-3 md:gap-2.5 p-0 m-0 list-none font-syncopate select-none"
          >
            {/* Name Row: CHINTAN NAKUM */}
            <div className="flex flex-wrap items-baseline justify-center md:justify-start gap-x-3.5 sm:gap-x-4.5 gap-y-2.5 sm:gap-y-0">
              <li
                data-gradient-item="1"
                className="hero-gradient-item font-syncopate text-[clamp(1.85rem,4.8vw,3.5rem)] font-bold leading-[1.15] sm:leading-[1.05] md:leading-[0.95] tracking-tight w-fit list-none p-0 m-0 cursor-default transition-transform duration-[480ms] ease-[cubic-bezier(0.475,0.425,0,0.995)] hover:translate-x-[0.3ch]"
              >
                {firstName}
              </li>
              {lastName && (
                <li
                  data-gradient-item="2"
                  className="hero-gradient-item font-syncopate text-[clamp(1.85rem,4.8vw,3.5rem)] font-bold leading-[1.15] sm:leading-[1.05] md:leading-[0.95] tracking-tight w-fit list-none p-0 m-0 cursor-default transition-transform duration-[480ms] ease-[cubic-bezier(0.475,0.425,0,0.995)] hover:translate-x-[0.3ch]"
                >
                  {lastName}
                </li>
              )}
            </div>

            {/* Role Row: FULL-STACK DEVELOPER */}
            <div className="flex flex-wrap items-baseline justify-center md:justify-start gap-x-3 sm:gap-x-4 gap-y-2.5 sm:gap-y-0">
              <li
                data-gradient-item="3"
                className="hero-gradient-item font-syncopate text-[clamp(1.5rem,3.8vw,2.75rem)] font-bold leading-[1.15] sm:leading-[1.05] md:leading-[0.95] tracking-tight w-fit list-none p-0 m-0 cursor-default transition-transform duration-[480ms] ease-[cubic-bezier(0.475,0.425,0,0.995)] hover:translate-x-[0.3ch]"
              >
                {rolePrefix}
              </li>
              {roleSuffix && (
                <li
                  data-gradient-item="4"
                  className="hero-gradient-item font-syncopate text-[clamp(1.5rem,3.8vw,2.75rem)] font-bold leading-[1.15] sm:leading-[1.05] md:leading-[0.95] tracking-tight w-fit list-none p-0 m-0 cursor-default transition-transform duration-[480ms] ease-[cubic-bezier(0.475,0.425,0,0.995)] hover:translate-x-[0.3ch]"
                >
                  {roleSuffix}
                </li>
              )}
            </div>
          </ul>
        </h1>

        {/* Subtitle Bio, CTAs & Circular Scroll Badge */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between w-full">
          <div className="max-w-xl flex flex-col gap-7 sm:gap-8 items-center md:items-start text-center md:text-left mx-auto md:mx-0">
            {/* Bio in Cabinet Grotesk */}
            <div className="max-w-lg md:max-w-none">
              <p className="font-cabinet text-base sm:text-lg md:text-lg leading-relaxed text-zinc-600">
                {hero.bio}
              </p>
            </div>

            {/* CTAs: Centered on Mobile with vibrant Accent Color (#3B5BFF), Sleek on Desktop */}
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3.5 sm:gap-4 w-full sm:w-auto">
              <a
                data-testid="hero-view-work"
                href="#work"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#3B5BFF] md:bg-[#111] px-8 py-4 font-cabinet text-xs font-bold uppercase tracking-[0.16em] text-white shadow-sm shadow-[#3B5BFF]/25 md:shadow-none transition-all duration-300 hover:bg-[#2D47D6] md:hover:bg-[#3B5BFF] w-full max-w-xs sm:w-auto text-center"
              >
                <span>View my work</span>
                <LuAsterisk
                  className="size-4 transition-transform duration-500 group-hover:rotate-90"
                  aria-hidden="true"
                />
              </a>

              <a
                data-testid="hero-download-cv"
                href="#contact"
                className="group inline-flex items-center justify-center gap-3 rounded-full border border-black/15 bg-white/70 px-8 py-4 font-cabinet text-xs font-bold uppercase tracking-[0.16em] text-zinc-800 backdrop-blur transition-all duration-300 hover:border-[#3B5BFF] hover:text-[#3B5BFF] w-full max-w-xs sm:w-auto text-center"
              >
                <span>Download CV</span>
                <LuArrowDown
                  className="size-4 transition-transform duration-300 group-hover:translate-y-1"
                  aria-hidden="true"
                />
              </a>
            </div>

            {/* Mobile Quick Highlights Strip: Centered & Balanced with Local time tag */}
            <div className="flex md:hidden flex-wrap items-center justify-center gap-2 pt-2 max-w-sm sm:max-w-md mx-auto">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.08] bg-white/90 px-3.5 py-1.5 font-cabinet text-xs font-medium text-zinc-700 shadow-sm">
                <span className="size-1.5 rounded-full bg-[#3B5BFF]" />
                React · TS
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.08] bg-tint-peach/90 px-3.5 py-1.5 font-cabinet text-xs font-medium text-zinc-700 shadow-sm">
                <span className="size-1.5 rounded-full bg-amber-500" />
                Framer · GSAP
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.08] bg-tint-blue/90 px-3.5 py-1.5 font-cabinet text-xs font-medium text-zinc-700 shadow-sm">
                <span className="size-1.5 rounded-full bg-sky-500" />
                {locationDisplay}
              </span>
              {localTime && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.08] bg-white/90 px-3.5 py-1.5 font-cabinet text-xs font-medium text-zinc-700 shadow-sm">
                  <LuClock className="size-3.5 shrink-0 text-[#3B5BFF]" aria-hidden="true" />
                  <span>
                    Local time : <strong className="font-bold text-zinc-800">{localTime}</strong>
                  </span>
                </span>
              )}
            </div>
          </div>

          {/* Rotating Circular Scroll Badge in Cabinet Grotesk */}
          <div className="hidden md:block shrink-0">
            <a
              href="#work"
              data-testid="hero-scroll-badge"
              aria-label="Scroll to work section"
              className="group relative block size-28 lg:size-32 cursor-pointer focus:outline-none"
            >
              <svg
                viewBox="0 0 100 100"
                className="size-full animate-spin-slow transition-transform duration-300 group-hover:scale-105"
              >
                <defs>
                  <path
                    id="badge-circle"
                    d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0"
                  />
                </defs>
                <text
                  className="fill-[#111111] font-cabinet font-bold text-[8.6px] uppercase"
                  style={{ letterSpacing: '0.14em' }}
                >
                  <textPath href="#badge-circle" textLength="236">
                    Scroll down • Scroll down • Scroll down
                  </textPath>
                </text>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <LuArrowDown
                  className="size-5 text-[#3B5BFF] transition-transform duration-300 group-hover:translate-y-1"
                  aria-hidden="true"
                />
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
