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

  return (
    <section
      id="top"
      data-testid="hero"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 pb-16 pt-32 md:px-12 md:pt-36 lg:px-20 font-cabinet"
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
        className="pointer-events-none absolute z-20 right-[5%] top-[16%] hidden md:flex transition-transform duration-500 ease-out"
        aria-hidden="true"
        style={{
          transform: `translateX(${mouseOffset.x * 22 + 20}px) translateY(${mouseOffset.y * -20 - 18}px)`,
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
                <p className="whitespace-nowrap font-cabinet text-xs font-bold text-[#111]">
                  React · TS
                </p>
                <p className="whitespace-nowrap font-cabinet text-[10px] font-semibold uppercase tracking-[0.14em] text-[#888]">
                  Daily stack
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Interactive Badge 2: Location (Middle-Right) */}
      <div
        className="pointer-events-none absolute z-20 right-[2%] top-[60%] hidden lg:flex transition-transform duration-500 ease-out"
        aria-hidden="true"
        style={{
          transform: `translateX(${mouseOffset.x * -16 - 15}px) translateY(${mouseOffset.y * 15 + 14}px)`,
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
                <p className="whitespace-nowrap font-cabinet text-xs font-bold text-[#111]">
                  {locationDisplay}
                </p>
                <p className="whitespace-nowrap font-cabinet text-[10px] font-semibold uppercase tracking-[0.14em] text-[#888]">
                  Based in
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Interactive Badge 3: Local Time (Lower-Right) */}
      <div
        className="pointer-events-none absolute z-20 right-[6%] top-[80%] hidden md:flex transition-transform duration-500 ease-out"
        aria-hidden="true"
        style={{
          transform: `translateX(${mouseOffset.x * 14 + 12}px) translateY(${mouseOffset.y * -13 - 11}px)`,
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
                <p className="whitespace-nowrap font-cabinet text-xs font-bold text-[#111]">
                  {localTime || '19:24'}
                </p>
                <p className="whitespace-nowrap font-cabinet text-[10px] font-semibold uppercase tracking-[0.14em] text-[#888]">
                  Local time
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Interactive Badge 4: Motion Craft (Bottom-Left) */}
      <div
        className="pointer-events-none absolute z-20 left-[38%] bottom-[5%] hidden xl:flex transition-transform duration-500 ease-out"
        aria-hidden="true"
        style={{
          transform: `translateX(${mouseOffset.x * -22 - 20}px) translateY(${mouseOffset.y * 21 + 19}px)`,
        }}
      >
        <div style={{ opacity: 1, transform: 'rotate(-6deg)' }}>
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
                <p className="whitespace-nowrap font-cabinet text-xs font-bold text-[#111]">
                  Motion freak
                </p>
                <p className="whitespace-nowrap font-cabinet text-[10px] font-semibold uppercase tracking-[0.14em] text-[#888]">
                  Framer · GSAP
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10">
        {/* Availability Status Badge with vibrant green live dot */}
        <div className="mb-8">
          <span className="block overflow-hidden">
            <span className="block will-change-transform">
              <span className="flex items-center gap-2.5 font-cabinet text-xs font-bold uppercase tracking-[0.2em] text-[#111]">
                {/* Live green dot with gentle pulsing aura */}
                <span className="relative flex h-2.5 w-2.5 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                </span>
                Available for work, 2026
              </span>
            </span>
          </span>
        </div>

        {/* Hero Headline with Cabinet Grotesk font */}
        <h1
          className="font-cabinet font-black leading-[0.93] tracking-[-0.03em] text-[#111] text-[clamp(2.5rem,10.5vw,10rem)]"
          data-testid="hero-heading"
        >
          <div>
            <span className="block overflow-hidden">
              <span className="block will-change-transform">
                <span>{(hero.name || 'ALEX CARTER').toUpperCase()}</span>
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="block will-change-transform">
                <span className="text-[0.85em]">
                  FRONTEND&nbsp;
                  <span className="font-cabinet font-normal text-[#3B5BFF]">
                    developer
                  </span>
                </span>
              </span>
            </span>
          </div>
        </h1>

        {/* Subtitle Bio, CTAs, Stats & Circular Scroll Badge */}
        <div className="mt-10 flex flex-col gap-12 md:mt-16 md:flex-row md:items-end md:justify-between">
          <div className="max-w-md">
            {/* Bio in Cabinet Grotesk */}
            <div>
              <p className="font-cabinet text-base leading-relaxed text-[#555] md:text-lg">
                {hero.bio}
              </p>
            </div>

            {/* CTAs in Cabinet Grotesk */}
            <div>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <div>
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
                </div>

                <div>
                  <a
                    data-testid="hero-download-cv"
                    href="#contact"
                    className="group inline-flex items-center gap-3 rounded-full border border-black/15 bg-white/60 px-8 py-4 font-cabinet text-xs font-bold uppercase tracking-[0.16em] text-[#111] backdrop-blur transition-colors duration-300 hover:border-[#3B5BFF] hover:text-[#3B5BFF]"
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
              </div>
            </div>

            {/* Stats Grid in Cabinet Grotesk */}
            {hero.stats && hero.stats.length > 0 && (
              <div className="mt-8 grid grid-cols-3 gap-6 border-t border-black/[0.08] pt-6 w-full">
                {hero.stats.map((stat, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="font-cabinet text-2xl sm:text-3xl font-extrabold text-[#111]">
                      {stat.value}
                    </span>
                    <span className="font-cabinet text-[11px] font-semibold uppercase tracking-wider text-[#888] mt-0.5">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Rotating Circular Scroll Badge in Cabinet Grotesk */}
          <div className="hidden md:block">
            <a
              href="#work"
              data-testid="hero-scroll-badge"
              aria-label="Scroll to work section"
              className="group relative block size-32 cursor-pointer focus:outline-none"
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
