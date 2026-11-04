import { useState, useEffect } from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

export const Hero = () => {
  const { hero, contact } = PORTFOLIO_DATA;

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

  // Dynamic Title splitting from portfolioData (e.g. "Full-Stack Developer" -> "FULL-STACK" + "developer")
  const titleString = (hero?.title || 'Frontend Developer').trim();
  const titleWords = titleString.split(/\s+/);
  const rolePrefix =
    titleWords.length > 1
      ? titleWords.slice(0, -1).join(' ').toUpperCase()
      : titleWords[0].toUpperCase();
  const roleSuffix =
    titleWords.length > 1
      ? titleWords[titleWords.length - 1].toLowerCase()
      : '';

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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-4 shrink-0 text-[#3B5BFF]"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="1" />
                <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z" />
                <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z" />
              </svg>
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
        className="pointer-events-none absolute z-20 right-[5%] lg:right-[7%] xl:right-[9%] top-[28%] lg:top-[30%] hidden md:flex transition-transform duration-500 ease-out"
        aria-hidden="true"
        style={{
          transform: `translateX(${mouseOffset.x * -10}px) translateY(${mouseOffset.y * 10}px)`,
        }}
      >
        <div style={{ opacity: 1, transform: 'rotate(-5deg)' }}>
          <div className="animate-float-2">
            <div className="bg-tint-peach flex items-center gap-3 rounded-2xl border border-black/[0.08] px-4 py-3 shadow-card">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-4 shrink-0 text-[#3B5BFF]"
                aria-hidden="true"
              >
                <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
              </svg>
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
        className="pointer-events-none absolute z-20 right-[2%] lg:right-[3%] xl:right-[4%] top-[48%] lg:top-[50%] hidden lg:flex transition-transform duration-500 ease-out"
        aria-hidden="true"
        style={{
          transform: `translateX(${mouseOffset.x * -8}px) translateY(${mouseOffset.y * 8}px)`,
        }}
      >
        <div style={{ opacity: 1, transform: 'rotate(-3deg)' }}>
          <div className="animate-float-2">
            <div className="bg-tint-blue flex items-center gap-3 rounded-2xl border border-black/[0.08] px-4 py-3 shadow-card">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-4 shrink-0 text-[#3B5BFF]"
                aria-hidden="true"
              >
                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                <circle cx="12" cy="10" r="3" />
              </svg>
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
        className="pointer-events-none absolute z-20 right-[4%] lg:right-[5%] xl:right-[6%] top-[68%] lg:top-[70%] hidden md:flex transition-transform duration-500 ease-out"
        aria-hidden="true"
        style={{
          transform: `translateX(${mouseOffset.x * 8}px) translateY(${mouseOffset.y * -8}px)`,
        }}
      >
        <div style={{ opacity: 1, transform: 'rotate(2deg)' }}>
          <div className="animate-float-1">
            <div className="bg-white flex items-center gap-3 rounded-2xl border border-black/[0.08] px-4 py-3 shadow-card">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-4 shrink-0 text-[#3B5BFF]"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
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

      {/* Main Content Area */}
      <div className="relative z-10 flex min-h-[calc(100vh-4rem)] w-full max-w-7xl flex-col justify-center mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 gap-6 sm:gap-8">
        {/* Availability Status Badge with vibrant green live dot */}
        <div className="flex items-center">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-black/[0.06] bg-white/70 px-3.5 py-1.5 shadow-sm backdrop-blur-sm">
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

        {/* Hero Headline with Cabinet Grotesk font */}
        <h1
          className="flex flex-col font-cabinet font-extrabold tracking-[-0.03em] leading-[0.98] text-zinc-800 text-[clamp(2.25rem,5vw,4.6rem)]"
          data-testid="hero-heading"
        >
          <div className="flex flex-col gap-1 sm:gap-1.5">
            <span className="block overflow-hidden">
              <span className="block will-change-transform text-zinc-800">
                {(hero.name || 'CHINTAN NAKUM').toUpperCase()}
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="block will-change-transform">
                <span className="flex flex-wrap items-baseline gap-x-2.5 sm:gap-x-3 text-[0.88em]">
                  <span className="text-zinc-800">{rolePrefix}</span>
                  <span className="font-cabinet font-normal text-[#3B5BFF]">
                    {roleSuffix}
                  </span>
                </span>
              </span>
            </span>
          </div>
        </h1>

        {/* Subtitle Bio, CTAs & Circular Scroll Badge */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl flex flex-col gap-6">
            {/* Bio in Cabinet Grotesk */}
            <div>
              <p className="font-cabinet text-base leading-relaxed text-zinc-600 md:text-lg">
                {hero.bio}
              </p>
            </div>

            {/* CTAs in Cabinet Grotesk */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                data-testid="hero-view-work"
                href="#work"
                className="group inline-flex items-center gap-3 rounded-full bg-[#111] px-8 py-4 font-cabinet text-xs font-bold uppercase tracking-[0.16em] text-white transition-colors duration-300 hover:bg-[#3B5BFF]"
              >
                <span>View my work</span>
                <svg
                  viewBox="0 0 64 64"
                  className="size-4 transition-transform duration-500 group-hover:rotate-90"
                  fill="none"
                  aria-hidden="true"
                >
                  <g stroke="currentColor" strokeWidth="6.5" strokeLinecap="round">
                    <path d="M32 13v38" />
                    <path d="M48.3 22.5 15.7 41.5" />
                    <path d="M15.7 22.5 48.3 41.5" />
                  </g>
                </svg>
              </a>

              <a
                data-testid="hero-download-cv"
                href="#contact"
                className="group inline-flex items-center gap-3 rounded-full border border-black/15 bg-white/60 px-8 py-4 font-cabinet text-xs font-bold uppercase tracking-[0.16em] text-zinc-800 backdrop-blur transition-colors duration-300 hover:border-[#3B5BFF] hover:text-[#3B5BFF]"
              >
                <span>Download CV</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-4 transition-transform duration-300 group-hover:translate-y-1"
                  aria-hidden="true"
                >
                  <path d="M12 5v14" />
                  <path d="m19 12-7 7-7-7" />
                </svg>
              </a>
            </div>

            {/* Mobile / Tablet Quick Highlights Strip (Flex Responsiveness) */}
            <div className="flex md:hidden flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.08] bg-white/80 px-3 py-1 font-cabinet text-xs font-medium text-zinc-700 shadow-sm">
                <span className="size-1.5 rounded-full bg-[#3B5BFF]" />
                React · TS
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.08] bg-tint-peach/80 px-3 py-1 font-cabinet text-xs font-medium text-zinc-700 shadow-sm">
                <span className="size-1.5 rounded-full bg-amber-500" />
                Framer · GSAP
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.08] bg-tint-blue/80 px-3 py-1 font-cabinet text-xs font-medium text-zinc-700 shadow-sm">
                <span className="size-1.5 rounded-full bg-sky-500" />
                {locationDisplay}
              </span>
              {localTime && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.08] bg-white/80 px-3 py-1 font-cabinet text-xs font-medium text-zinc-700 shadow-sm">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  {localTime}
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-5 text-[#3B5BFF] transition-transform duration-300 group-hover:translate-y-1"
                  aria-hidden="true"
                >
                  <path d="M12 5v14" />
                  <path d="m19 12-7 7-7-7" />
                </svg>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
