import { useState, useEffect, useRef } from 'react';
import { useLenis } from 'lenis/react';
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
import { LightLines } from '../ui/light-lines';

export const Hero = () => {
  const { hero, contact } = PORTFOLIO_DATA;
  const listRef = useRef(null);
  const lenis = useLenis();

  // Smooth scroll to Work section without altering URL route/hash
  const handleScrollToWork = (e) => {
    if (e && e.preventDefault) e.preventDefault();

    const targetElement = document.querySelector('#work');
    if (targetElement) {
      const navOffset = window.innerWidth < 768 ? 85 : 95;
      if (lenis) {
        lenis.scrollTo(targetElement, {
          offset: -navOffset,
          duration: 1.2,
        });
      } else {
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }
  };

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
    : 'India';

  // Helper to capitalize first letter of each word (Title Case)
  const capitalizeWord = (word) =>
    word ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : '';

  // Dynamic Name splitting (first letter of each word capital)
  const nameString = (hero?.name || 'Chintan Nakum').trim();
  const nameWords = nameString.split(/\s+/);
  const firstName = capitalizeWord(nameWords[0]) || 'Chintan';
  const lastName =
    nameWords.length > 1
      ? nameWords.slice(1).map(capitalizeWord).join(' ')
      : '';

  // Dynamic Title splitting (first letter of each word capital)
  const titleString = (hero?.title || 'Full Stack Developer')
    .replace(/\s*-\s*/g, ' ')
    .trim();
  const titleWords = titleString.split(/\s+/);
  const rolePrefix =
    titleWords.length > 1
      ? titleWords.slice(0, -1).map(capitalizeWord).join(' ')
      : capitalizeWord(titleWords[0]);
  const roleSuffix =
    titleWords.length > 1
      ? capitalizeWord(titleWords[titleWords.length - 1])
      : '';

  // Highlighted phrase in hero bio description
  const highlightPhrase = 'building responsive, scalable web applications';
  const bioText = hero?.bio || '';
  const bioParts = bioText.includes(highlightPhrase)
    ? bioText.split(highlightPhrase)
    : null;

  // GSAP Gradient Text Intro and Interactive Hover Animation
  useEffect(() => {
    gsap.registerPlugin(CustomEase);

    const customEase = CustomEase.create(
      'heroGradientEase',
      'M0,0 C0.548,0.032 0.63,1 1,1 '
    );

    const ctx = gsap.context(() => {
      const items = listRef.current?.querySelectorAll('.hero-gradient-item');
      if (!items || items.length === 0) return;

      gsap.set(items, { '--stop-hover': '0%', '--stop-active': '0%' });

      gsap
        .timeline({ defaults: { duration: 0.48 } })
        .to(items, {
          '--stop-active': '100%',
          stagger: { each: 0.1, ease: customEase },
        })
        .to(items, { '--stop-hover': '100%', stagger: { each: 0.1 } })
        .to(items, { '--stop-hover': '0%', stagger: { each: -0.1 } }, '-=0.1');

      items.forEach((item) => {
        const onMouseEnter = () =>
          gsap.to(item, {
            '--stop-hover': '100%',
            ease: customEase,
            duration: 0.36,
            overwrite: 'auto',
          });
        const onMouseLeave = () =>
          gsap.to(item, {
            '--stop-hover': '0%',
            ease: customEase,
            duration: 0.36,
            overwrite: 'auto',
          });
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
      {/* ── LightLines blue gradient background ── */}
      <LightLines
        className="z-0"
        gradientFrom="#2462F6"
        gradientTo="#5999F8"
        lineColor="#ffffff"
        lightColor="#ffffff"
        linesOpacity={0.18}
        lightsOpacity={0.9}
        speedMultiplier={0.65}
      />

      {/* Subtle depth orbs — tone-on-tone blue */}
      <div
        className="pointer-events-none absolute z-0 left-[-10%] top-[-14%] size-[46vw] min-w-[320px] min-h-[320px] transition-transform duration-700 ease-out"
        aria-hidden="true"
        style={{
          transform: `translateX(${mouseOffset.x * 12 + 9}px) translateY(${mouseOffset.y * -10 - 8}px)`,
        }}
      >
        <div className="size-full rounded-full opacity-30 blur-[120px] bg-[#1340c0]" />
      </div>

      <div
        className="pointer-events-none absolute z-0 right-[-12%] top-[4%] size-[38vw] min-w-[300px] min-h-[300px] transition-transform duration-700 ease-out"
        aria-hidden="true"
        style={{
          transform: `translateX(${mouseOffset.x * -10 - 7}px) translateY(${mouseOffset.y * 9 + 6}px)`,
        }}
      >
        <div className="size-full rounded-full opacity-20 blur-[100px] bg-[#7ab4ff]" />
      </div>

      {/* ── Floating Badges — frosted glass on blue ── */}

      {/* Badge 1: Daily Stack */}
      <div
        className="pointer-events-none absolute z-20 right-[3%] lg:right-[5%] xl:right-[6%] top-[12%] lg:top-[14%] hidden md:flex transition-transform duration-500 ease-out"
        aria-hidden="true"
        style={{ transform: `translateX(${mouseOffset.x * 12}px) translateY(${mouseOffset.y * -10}px)` }}
      >
        <div style={{ opacity: 1, transform: 'rotate(6deg)' }}>
          <div className="animate-float-1">
            <div className="bg-white/15 backdrop-blur-md flex items-center gap-3 rounded-2xl border border-white/30 px-4 py-3">
              <LuAtom className="size-4 shrink-0 text-white" aria-hidden="true" />
              <div>
                <p className="whitespace-nowrap font-cabinet text-xs font-bold text-white">React · TS</p>
                <p className="whitespace-nowrap font-cabinet text-[10px] font-semibold uppercase tracking-[0.14em] text-white/60">Daily stack</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Badge 2: Motion Craft */}
      <div
        className="pointer-events-none absolute z-20 right-[5%] lg:right-[7%] xl:right-[9%] top-[27%] lg:top-[29%] hidden md:flex transition-transform duration-500 ease-out"
        aria-hidden="true"
        style={{ transform: `translateX(${mouseOffset.x * -10}px) translateY(${mouseOffset.y * 10}px)` }}
      >
        <div style={{ opacity: 1, transform: 'rotate(-5deg)' }}>
          <div className="animate-float-2">
            <div className="bg-white/15 backdrop-blur-md flex items-center gap-3 rounded-2xl border border-white/30 px-4 py-3">
              <LuZap className="size-4 shrink-0 text-white" aria-hidden="true" />
              <div>
                <p className="whitespace-nowrap font-cabinet text-xs font-bold text-white">Motion freak</p>
                <p className="whitespace-nowrap font-cabinet text-[10px] font-semibold uppercase tracking-[0.14em] text-white/60">Framer · GSAP</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Badge 3: Location */}
      <div
        className="pointer-events-none absolute z-20 right-[2%] lg:right-[3%] xl:right-[4%] top-[43%] lg:top-[45%] hidden lg:flex transition-transform duration-500 ease-out"
        aria-hidden="true"
        style={{ transform: `translateX(${mouseOffset.x * -8}px) translateY(${mouseOffset.y * 8}px)` }}
      >
        <div style={{ opacity: 1, transform: 'rotate(-3deg)' }}>
          <div className="animate-float-2">
            <div className="bg-white/15 backdrop-blur-md flex items-center gap-3 rounded-2xl border border-white/30 px-4 py-3">
              <LuMapPin className="size-4 shrink-0 text-white" aria-hidden="true" />
              <div>
                <p className="whitespace-nowrap font-cabinet text-xs font-bold text-white">{locationDisplay}</p>
                <p className="whitespace-nowrap font-cabinet text-[10px] font-semibold uppercase tracking-[0.14em] text-white/60">Based in</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Badge 4: Local Time */}
      <div
        className="pointer-events-none absolute z-20 right-[4%] lg:right-[5%] xl:right-[6%] top-[59%] lg:top-[61%] hidden md:flex transition-transform duration-500 ease-out"
        aria-hidden="true"
        style={{ transform: `translateX(${mouseOffset.x * 8}px) translateY(${mouseOffset.y * -8}px)` }}
      >
        <div style={{ opacity: 1, transform: 'rotate(2deg)' }}>
          <div className="animate-float-1">
            <div className="bg-white/15 backdrop-blur-md flex items-center gap-3 rounded-2xl border border-white/30 px-4 py-3">
              <LuClock className="size-4 shrink-0 text-white" aria-hidden="true" />
              <div>
                <p className="whitespace-nowrap font-cabinet text-xs font-bold text-white">{localTime || '19:24'}</p>
                <p className="whitespace-nowrap font-cabinet text-[10px] font-semibold uppercase tracking-[0.14em] text-white/60">Local time</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="relative z-10 flex min-h-[calc(100vh-4rem)] w-full max-w-7xl flex-col justify-center items-center md:items-start text-center md:text-left mx-auto px-4 sm:px-6 lg:px-8 pt-26 sm:pt-28 md:pt-32 pb-14 sm:pb-16 gap-7 sm:gap-8">

        {/* Availability Badge */}
        <div className="flex items-center justify-center md:justify-start w-full">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/10 px-4 py-2 shadow-sm backdrop-blur-sm">
            <span className="relative flex h-2.5 w-2.5 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            <span className="font-cabinet text-xs font-bold uppercase tracking-[0.2em] text-white">
              Available for work, 2026
            </span>
          </span>
        </div>

        {/* Hero Headline — white on blue */}
        <h1
          className="flex flex-col items-center md:items-start text-center md:text-left w-full"
          data-testid="hero-heading"
          aria-label={`${nameString} - ${titleString}`}
        >
          <ul
            ref={listRef}
            className="flex flex-col gap-2.5 sm:gap-3 md:gap-3.5 p-0 m-0 list-none font-clash-grotesk select-none"
          >
            {/* Name Row */}
            <div className="flex flex-nowrap whitespace-nowrap items-baseline justify-center md:justify-start gap-x-2.5 sm:gap-x-4 lg:gap-x-5">
              <li
                data-gradient-item="1"
                className="hero-gradient-item font-clash-grotesk font-semibold text-[clamp(2.35rem,7.5vw,4rem)] sm:text-[clamp(4rem,7.5vw,7.25rem)] leading-none tracking-tight w-fit list-none p-0 m-0 cursor-default text-white/90 drop-shadow-sm transition-transform duration-[480ms] ease-[cubic-bezier(0.475,0.425,0,0.995)] hover:translate-x-[0.3ch]"
              >
                {firstName}
              </li>
              {lastName && (
                <li
                  data-gradient-item="2"
                  className="hero-gradient-item font-clash-grotesk font-semibold text-[clamp(2.35rem,7.5vw,4rem)] sm:text-[clamp(4rem,7.5vw,7.25rem)] leading-none tracking-tight w-fit list-none p-0 m-0 cursor-default text-white/90 drop-shadow-sm transition-transform duration-[480ms] ease-[cubic-bezier(0.475,0.425,0,0.995)] hover:translate-x-[0.3ch]"
                >
                  {lastName}
                </li>
              )}
            </div>

            {/* Role Row */}
            <div className="flex flex-wrap sm:flex-nowrap whitespace-nowrap items-baseline justify-center md:justify-start gap-x-2 sm:gap-x-3.5">
              <li
                data-gradient-item="3"
                className="hero-gradient-item font-clash-grotesk font-medium text-[clamp(1.5rem,4.8vw,2.25rem)] sm:text-[clamp(2.25rem,4.2vw,4rem)] leading-[1.12] tracking-normal w-fit list-none p-0 m-0 cursor-default text-white/85 drop-shadow-sm transition-transform duration-[480ms] ease-[cubic-bezier(0.475,0.425,0,0.995)] hover:translate-x-[0.3ch]"
              >
                {rolePrefix}
              </li>
              {roleSuffix && (
                <li
                  data-gradient-item="4"
                  className="hero-gradient-item font-clash-grotesk font-medium text-[clamp(1.5rem,4.8vw,2.25rem)] sm:text-[clamp(2.25rem,4.2vw,4rem)] leading-[1.12] tracking-normal w-fit list-none p-0 m-0 cursor-default text-white/85 drop-shadow-sm transition-transform duration-[480ms] ease-[cubic-bezier(0.475,0.425,0,0.995)] hover:translate-x-[0.3ch]"
                >
                  {roleSuffix}
                </li>
              )}
            </div>
          </ul>
        </h1>

        {/* Bio, CTAs & Scroll Badge */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between w-full">
          <div className="max-w-xl flex flex-col gap-7 sm:gap-8 items-center md:items-start text-center md:text-left mx-auto md:mx-0">

            {/* Bio / Description */}
            <div className="max-w-lg md:max-w-none">
              <p className="font-sora font-normal text-[16px] sm:text-[17px] md:text-[18px] leading-[1.75] text-white/80">
                {bioParts ? (
                  <>
                    {bioParts[0]}
                    <span className="font-sora italic font-normal text-amber-300">
                      {highlightPhrase}
                    </span>
                    {bioParts[1]}
                  </>
                ) : (
                  bioText
                )}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3.5 sm:gap-4 w-full sm:w-auto">
              {/* Primary — solid white */}
              <a
                data-testid="hero-view-work"
                href="#work"
                onClick={handleScrollToWork}
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-white px-8 py-4 font-cabinet text-xs font-bold uppercase tracking-[0.16em] text-[#2462F6] shadow-md transition-all duration-300 hover:bg-white/90 w-full max-w-xs sm:w-auto text-center cursor-pointer"
              >
                <span>View my work</span>
                <LuAsterisk
                  className="size-4 transition-transform duration-500 group-hover:rotate-90"
                  aria-hidden="true"
                />
              </a>

              {/* Secondary — frosted outline */}
              <a
                data-testid="hero-download-cv"
                href={hero?.resumeUrl || '/Chintan_Nakum_Resume.pdf'}
                download="Chintan_Nakum_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 rounded-full border border-white/40 bg-white/10 px-8 py-4 font-cabinet text-xs font-bold uppercase tracking-[0.16em] text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:border-white/60 w-full max-w-xs sm:w-auto text-center"
              >
                <span>Download CV</span>
                <LuArrowDown
                  className="size-4 transition-transform duration-300 group-hover:translate-y-1"
                  aria-hidden="true"
                />
              </a>
            </div>

            {/* Mobile Quick Highlights Strip */}
            <div className="flex md:hidden flex-wrap items-center justify-center gap-2 pt-2 max-w-sm sm:max-w-md mx-auto">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 font-cabinet text-xs font-medium text-white shadow-sm backdrop-blur-sm">
                <span className="size-1.5 rounded-full bg-white/80" />
                React · TS
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 font-cabinet text-xs font-medium text-white shadow-sm backdrop-blur-sm">
                <span className="size-1.5 rounded-full bg-amber-300" />
                Framer · GSAP
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 font-cabinet text-xs font-medium text-white shadow-sm backdrop-blur-sm">
                <span className="size-1.5 rounded-full bg-sky-300" />
                {locationDisplay}
              </span>
              {localTime && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 font-cabinet text-xs font-medium text-white shadow-sm backdrop-blur-sm">
                  <LuClock className="size-3.5 shrink-0 text-white/70" aria-hidden="true" />
                  <span>
                    Local time : <strong className="font-bold text-white">{localTime}</strong>
                  </span>
                </span>
              )}
            </div>
          </div>

          {/* Rotating Circular Scroll Badge */}
          <div className="hidden md:block shrink-0">
            <a
              href="#work"
              onClick={handleScrollToWork}
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
                  className="fill-white font-cabinet font-bold text-[8.6px] uppercase"
                  style={{ letterSpacing: '0.14em' }}
                >
                  <textPath href="#badge-circle" textLength="236">
                    Scroll down • Scroll down • Scroll down
                  </textPath>
                </text>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <LuArrowDown
                  className="size-5 text-white transition-transform duration-300 group-hover:translate-y-1"
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
