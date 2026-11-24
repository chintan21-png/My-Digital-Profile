import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FiArrowUpRight } from 'react-icons/fi';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { useIsMobile } from '../../hooks/useIsMobile';
import { ScrollReveal } from '../common/ScrollReveal';
import DiagonalCarousel from '../ui/diagonal-carousel';
import TextAnimation from '../ui/TextAnimation';

const AUTO_ADVANCE_MS = 6500;

// Themed visual styling for each particular project card
const CARD_THEMES = [
  {
    id: 'project-1',
    // Azure / Indigo theme (E-Commerce & SaaS)
    cardBg: 'bg-gradient-to-br from-[#EEF4FF] via-[#F8FAFF] to-[#E2ECFF]',
    borderColor: 'border-blue-200/85 hover:border-blue-400/90',
    topGlow: 'from-blue-500/20 via-indigo-500/10 to-transparent',
    bottomGlow: 'from-indigo-500/15 via-blue-400/8 to-transparent',
    shadowHover: 'hover:shadow-[0_20px_45px_-12px_rgba(59,91,255,0.25)]',
    categoryBadge: 'bg-blue-100/90 text-blue-700 border-blue-200/80',
    categoryDot: 'bg-blue-600',
    numberColor: 'text-blue-600/85',
    titleHover: 'md:group-hover:text-blue-600',
    titleMobile: 'text-blue-700 md:text-neutral-950',
    highlightColor: 'text-blue-700 font-semibold',
    dividerColor: 'border-blue-200/60',
    tag: 'bg-white/95 text-blue-800 border-blue-200/80 hover:bg-blue-600 hover:text-white hover:border-blue-600',
    button:
      'bg-blue-600 text-white md:bg-white/90 md:text-blue-600 md:border md:border-blue-200/80 md:group-hover:bg-blue-600 md:group-hover:text-white md:group-hover:border-blue-600',
    ctaButton:
      'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/20',
    pillActive: 'bg-blue-600 text-white border-blue-600 shadow-xs',
    progressBar: 'bg-blue-600/80',
  },
  {
    id: 'project-2',
    // Amethyst / Royal Violet theme (MERN & Real-Time Workflow)
    cardBg: 'bg-gradient-to-br from-[#F6F0FF] via-[#FCF9FF] to-[#ECE1FF]',
    borderColor: 'border-purple-200/85 hover:border-purple-400/90',
    topGlow: 'from-purple-500/20 via-fuchsia-500/10 to-transparent',
    bottomGlow: 'from-fuchsia-500/15 via-purple-400/8 to-transparent',
    shadowHover: 'hover:shadow-[0_20px_45px_-12px_rgba(147,51,234,0.25)]',
    categoryBadge: 'bg-purple-100/90 text-purple-700 border-purple-200/80',
    categoryDot: 'bg-purple-600',
    numberColor: 'text-purple-600/85',
    titleHover: 'md:group-hover:text-purple-600',
    titleMobile: 'text-purple-700 md:text-neutral-950',
    highlightColor: 'text-purple-700 font-semibold',
    dividerColor: 'border-purple-200/60',
    tag: 'bg-white/95 text-purple-800 border-purple-200/80 hover:bg-purple-600 hover:text-white hover:border-purple-600',
    button:
      'bg-purple-600 text-white md:bg-white/90 md:text-purple-600 md:border md:border-purple-200/80 md:group-hover:bg-purple-600 md:group-hover:text-white md:group-hover:border-purple-600',
    ctaButton:
      'bg-purple-600 text-white hover:bg-purple-700 shadow-purple-500/20',
    pillActive: 'bg-purple-600 text-white border-purple-600 shadow-xs',
    progressBar: 'bg-purple-600/80',
  },
  {
    id: 'project-3',
    // Emerald / Mint Teal theme (Backend Architecture & Database)
    cardBg: 'bg-gradient-to-br from-[#EDFAF3] via-[#F6FCF8] to-[#DAF4E5]',
    borderColor: 'border-emerald-200/85 hover:border-emerald-400/90',
    topGlow: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    bottomGlow: 'from-teal-500/15 via-emerald-400/8 to-transparent',
    shadowHover: 'hover:shadow-[0_20px_45px_-12px_rgba(16,185,129,0.25)]',
    categoryBadge: 'bg-emerald-100/90 text-emerald-800 border-emerald-200/80',
    categoryDot: 'bg-emerald-600',
    numberColor: 'text-emerald-700/85',
    titleHover: 'md:group-hover:text-emerald-600',
    titleMobile: 'text-emerald-800 md:text-neutral-950',
    highlightColor: 'text-emerald-700 font-semibold',
    dividerColor: 'border-emerald-200/60',
    tag: 'bg-white/95 text-emerald-800 border-emerald-200/80 hover:bg-emerald-600 hover:text-white hover:border-emerald-600',
    button:
      'bg-emerald-600 text-white md:bg-white/90 md:text-emerald-700 md:border md:border-emerald-200/80 md:group-hover:bg-emerald-600 md:group-hover:text-white md:group-hover:border-emerald-600',
    ctaButton:
      'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-500/20',
    pillActive: 'bg-emerald-600 text-white border-emerald-600 shadow-xs',
    progressBar: 'bg-emerald-600/80',
  },
  {
    id: 'project-4',
    // Warm Amber / Sunset Coral fallback theme
    cardBg: 'bg-gradient-to-br from-[#FFF7ED] via-[#FFFAF5] to-[#FFEDD5]',
    borderColor: 'border-amber-200/85 hover:border-amber-400/90',
    topGlow: 'from-amber-500/20 via-orange-500/10 to-transparent',
    bottomGlow: 'from-orange-500/15 via-amber-400/8 to-transparent',
    shadowHover: 'hover:shadow-[0_20px_45px_-12px_rgba(245,158,11,0.25)]',
    categoryBadge: 'bg-amber-100/90 text-amber-800 border-amber-200/80',
    categoryDot: 'bg-amber-600',
    numberColor: 'text-amber-600/85',
    titleHover: 'md:group-hover:text-amber-600',
    titleMobile: 'text-amber-800 md:text-neutral-950',
    highlightColor: 'text-amber-700 font-semibold',
    dividerColor: 'border-amber-200/60',
    tag: 'bg-white/95 text-amber-800 border-amber-200/80 hover:bg-amber-600 hover:text-white hover:border-amber-600',
    button:
      'bg-amber-600 text-white md:bg-white/90 md:text-amber-800 md:border md:border-amber-200/80 md:group-hover:bg-amber-600 md:group-hover:text-white md:group-hover:border-amber-600',
    ctaButton:
      'bg-amber-600 text-white hover:bg-amber-700 shadow-amber-500/20',
    pillActive: 'bg-amber-600 text-white border-amber-600 shadow-xs',
    progressBar: 'bg-amber-600/80',
  },
];

// Soft radial glows without CSS filter: blur() so mobile GPUs avoid offscreen blur passes
const CardBackdrop = memo(function CardBackdrop({
  theme,
  compact = false,
  topGlowOpacity = 'opacity-80',
  bottomGlowOpacity = 'opacity-70',
}) {
  return (
    <>
      {/* Ambient Top-Right Radial Glow */}
      <div
        className={`pointer-events-none absolute rounded-full bg-radial ${theme.topGlow} to-70% transition-opacity duration-500 ${
          compact
            ? `-top-20 -right-20 h-48 w-48 ${topGlowOpacity}`
            : `-top-28 -right-28 h-72 w-72 ${topGlowOpacity}`
        }`}
        aria-hidden="true"
      />

      {/* Ambient Bottom-Left Radial Glow */}
      <div
        className={`pointer-events-none absolute rounded-full bg-radial ${theme.bottomGlow} to-70% transition-opacity duration-500 ${
          compact
            ? `-bottom-16 -left-16 h-40 w-40 ${bottomGlowOpacity}`
            : `-bottom-24 -left-24 h-64 w-64 ${bottomGlowOpacity}`
        }`}
        aria-hidden="true"
      />

      {/* Architectural Micro Dot-Grid Pattern */}
      <div
        className={`pointer-events-none absolute inset-0 bg-[radial-gradient(#000_1px,transparent_1px)] ${
          compact
            ? 'opacity-[0.04] [background-size:14px_14px]'
            : 'opacity-[0.035] [background-size:16px_16px]'
        }`}
        aria-hidden="true"
      />
    </>
  );
});

// Helper to highlight key points in description with italic and matching theme color
const renderHighlightedDescription = (
  text,
  highlights = [],
  highlightColor = 'text-[#3B5BFF]'
) => {
  if (!text) return null;
  if (!highlights || highlights.length === 0) return text;

  const escaped = highlights
    .filter(Boolean)
    .map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));

  if (escaped.length === 0) return text;

  const regex = new RegExp(`(${escaped.join('|')})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, index) => {
    const isHighlight = highlights.some(
      (h) => h.toLowerCase() === part.toLowerCase()
    );

    if (isHighlight) {
      return (
        <span
          key={index}
          className={`italic ${highlightColor} transition-colors`}
        >
          {part}
        </span>
      );
    }
    return part;
  });
};

const getProjectTheme = (project, index) =>
  project?.theme || CARD_THEMES[index % CARD_THEMES.length];

const ProjectDetailBody = memo(function ProjectDetailBody({
  project,
  theme,
  index,
  total,
  compact = false,
  isActive = true,
  animateDot = true,
  footerEnd = null,
}) {
  const isRepoLink = project.link?.includes('github.com');

  const highlightedDescription = useMemo(
    () =>
      renderHighlightedDescription(
        project.description,
        project.highlights,
        theme.highlightColor
      ),
    [project.description, project.highlights, theme.highlightColor]
  );

  return (
    <>
      <div className="relative z-10">
        {/* Category Badge, Index & Link */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-1 font-mono font-semibold uppercase tracking-[0.15em] border ${theme.categoryBadge} shadow-xs ${
                compact ? 'text-[10px]' : 'text-[10.5px]'
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${theme.categoryDot} mr-1.5 ${
                  animateDot ? 'animate-pulse' : ''
                }`}
              />
              {project.category}
            </span>
            <span
              className={`font-mono text-[11px] font-bold tracking-wider ${theme.numberColor}`}
            >
              0{index + 1} / 0{total}
            </span>
          </div>

          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            tabIndex={isActive ? undefined : -1}
            aria-label={`View code and live project for ${project.title}`}
            className={`flex h-9 w-9 min-h-[36px] min-w-[36px] items-center justify-center rounded-full transition-all duration-300 active:scale-95 group/link ${theme.button}`}
          >
            <FiArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 md:group-hover:translate-x-0.5 md:group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Title & Description */}
        <h3
          className={`font-sora font-bold leading-snug tracking-tight ${theme.titleMobile} ${theme.titleHover} transition-colors ${
            compact ? 'mt-4 text-xl sm:text-2xl' : 'mt-6 text-[26px]'
          }`}
        >
          {project.title}
        </h3>

        <p
          className={`font-sora font-normal leading-relaxed text-neutral-700 ${
            compact ? 'mt-2.5 text-sm sm:text-[15px]' : 'mt-4 text-[15px]'
          }`}
        >
          {highlightedDescription}
        </p>

        {/* Tech Stack Tags */}
        <div className={compact ? 'mt-5' : 'mt-6'}>
          {!compact && (
            <p className="mb-2.5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
              Stack & Capabilities
            </p>
          )}
          <div className={`flex flex-wrap ${compact ? 'gap-1.5' : 'gap-2'}`}>
            {project.tags.map((tag) => (
              <span
                key={tag}
                className={`rounded-lg border px-2.5 py-1 font-mono font-medium tracking-wide shadow-xs transition-colors duration-200 ${theme.tag} ${
                  compact ? 'text-[10px]' : 'text-[10.5px]'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer CTA & Slot */}
      <div
        className={`relative z-10 flex flex-wrap items-center justify-between gap-3 border-t ${theme.dividerColor} ${
          compact ? 'mt-6 pt-4' : 'mt-8 pt-5'
        }`}
      >
        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          tabIndex={isActive ? undefined : -1}
          className={`inline-flex items-center gap-2 rounded-full font-mono font-semibold uppercase tracking-[0.14em] shadow-sm transition-all duration-200 active:scale-95 ${theme.ctaButton} ${
            compact ? 'px-4 py-2 text-[10.5px]' : 'px-5 py-2.5 text-[11px]'
          }`}
        >
          <span>{isRepoLink ? 'View Repository' : 'Visit Live Project'}</span>
          <FiArrowUpRight className="h-3.5 w-3.5" />
        </a>

        {footerEnd}
      </div>
    </>
  );
});

// Pure CSS GPU-composited progress bar (zero Framer Motion JS animation overhead)
const AutoAdvanceBar = memo(function AutoAdvanceBar({
  activeKey,
  isRunning,
  theme,
  show,
}) {
  if (!show) return null;

  return (
    <div
      className="pointer-events-none absolute top-0 left-0 right-0 z-20 h-[3px] bg-black/[0.04]"
      aria-hidden="true"
    >
      {isRunning ? (
        <div
          key={activeKey}
          className={`h-full origin-left ${theme.progressBar} animate-work-progress will-change-transform`}
          style={{ animationDuration: `${AUTO_ADVANCE_MS}ms` }}
        />
      ) : (
        <div className={`h-full origin-left scale-x-0 ${theme.progressBar}`} />
      )}
    </div>
  );
});

// Memoized static heading so TextAnimation never re-renders on carousel slide changes
const WorkHeading = memo(function WorkHeading() {
  return (
    <div className="flex flex-col items-start gap-2">
      <span className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-[#3B5BFF]">
        <TextAnimation delay={0} divideBy="word">
          Selected Projects
        </TextAnimation>
      </span>
      <h2 className="font-cabinet text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-950">
        <TextAnimation delay={0.1} divideBy="word">
          Featured Work & Architecture
        </TextAnimation>
      </h2>
    </div>
  );
});

export const Work = () => {
  const { projects = [] } = PORTFOLIO_DATA;
  const [{ index: activeIndex }, setSlideState] = useState({
    index: 0,
  });
  const [isAutoPaused, setIsAutoPaused] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(() =>
    typeof document === 'undefined' ? true : !document.hidden
  );
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    typeof window !== 'undefined'
      ? Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)
      : false
  );

  const sectionRef = useRef(null);
  const touchStartRef = useRef(null);
  const isTouchingRef = useRef(false);
  const pendingAdvanceRef = useRef(false);

  // Desktop paired view activates at lg (>= 1024px); below lg uses the unified mobile deck
  const isCompactView = useIsMobile(1024);
  const isDesktop = !isCompactView;

  const safeIndex = projects.length
    ? Math.min(Math.max(activeIndex, 0), projects.length - 1)
    : 0;

  const goToSlide = useCallback(
    (nextIndex) => {
      setSlideState((prev) => {
        const total = projects.length;
        if (!total) return prev;
        const resolved = ((nextIndex % total) + total) % total;
        if (resolved === prev.index) return prev;
        return { index: resolved };
      });
    },
    [projects.length]
  );

  // Pause carousel timers and animations whenever #work is off-screen or tab is hidden
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.05, rootMargin: '40px 0px' }
    );
    observer.observe(node);

    const handleVisibility = () => {
      setIsTabVisible(!document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const motionQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e) => setPrefersReducedMotion(e.matches);
    motionQuery?.addEventListener?.('change', handleMotionChange);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
      motionQuery?.removeEventListener?.('change', handleMotionChange);
    };
  }, []);

  const shouldAutoAdvance =
    isInView &&
    isTabVisible &&
    !isAutoPaused &&
    !prefersReducedMotion &&
    projects.length > 1;

  // Auto-advance slides every 6.5s ONLY while #work is visible in the viewport
  useEffect(() => {
    if (!shouldAutoAdvance) return undefined;

    const timer = window.setTimeout(() => {
      if (isTouchingRef.current) {
        pendingAdvanceRef.current = true;
        return;
      }
      setSlideState((prev) => ({
        index: (prev.index + 1) % projects.length,
      }));
    }, AUTO_ADVANCE_MS);

    return () => window.clearTimeout(timer);
  }, [shouldAutoAdvance, projects.length, safeIndex]);

  const carouselItems = useMemo(
    () =>
      projects.map((project, idx) => ({
        id: project.id,
        title: project.title,
        label: `0${idx + 1} · ${project.category}`,
        project,
        theme: getProjectTheme(project, idx),
      })),
    [projects]
  );

  if (!projects.length) {
    return null;
  }

  const activeProject = projects[safeIndex];
  const activeTheme = getProjectTheme(activeProject, safeIndex);

  const handleMobileTouchStart = (event) => {
    isTouchingRef.current = true;
    const touch = event.touches?.[0];
    if (touch) {
      touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    }
  };

  const handleMobileTouchEnd = (event) => {
    isTouchingRef.current = false;
    const start = touchStartRef.current;
    touchStartRef.current = null;
    const touch = event.changedTouches?.[0];

    let didSwipe = false;
    if (start && touch) {
      const dx = touch.clientX - start.x;
      const dy = touch.clientY - start.y;

      if (Math.abs(dx) > 42 && Math.abs(dx) > Math.abs(dy) * 1.2) {
        didSwipe = true;
        goToSlide(dx < 0 ? safeIndex + 1 : safeIndex - 1);
      }
    }

    if (!didSwipe && pendingAdvanceRef.current && shouldAutoAdvance) {
      pendingAdvanceRef.current = false;
      goToSlide(safeIndex + 1);
    } else {
      pendingAdvanceRef.current = false;
    }
  };

  const handleMobileTouchCancel = () => {
    isTouchingRef.current = false;
    touchStartRef.current = null;
    pendingAdvanceRef.current = false;
  };

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative isolate overflow-x-clip py-14 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto [contain:layout_paint]"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12">
        <WorkHeading />

        <div className="flex items-center gap-3">
          {projects.length > 1 && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200/90 bg-white px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-600 shadow-xs">
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  !shouldAutoAdvance
                    ? 'bg-neutral-400'
                    : 'bg-[#3B5BFF] animate-pulse'
                }`}
              />
              {isAutoPaused ? 'Paused' : 'Auto · 6.5s'}
            </span>
          )}
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-500">
            {isDesktop ? 'Click or use arrows' : 'Swipe or tap'} ·{' '}
            {String(safeIndex + 1).padStart(2, '0')} /{' '}
            {String(projects.length).padStart(2, '0')}
          </p>
        </div>
      </div>

      {isDesktop ? (
        /* Desktop Layout: Diagonal Carousel Stage + Synced Active Project Detail Card */
        <div
          className="grid grid-cols-12 gap-8 items-stretch"
          onMouseEnter={() => setIsAutoPaused(true)}
          onMouseLeave={() => setIsAutoPaused(false)}
          onFocusCapture={() => setIsAutoPaused(true)}
          onBlurCapture={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) {
              setIsAutoPaused(false);
            }
          }}
        >
          {/* Left: Diagonal Carousel */}
          <ScrollReveal
            direction="up"
            distance="28px"
            duration={750}
            className="col-span-7"
          >
            <div className="relative h-[520px] w-full overflow-hidden rounded-3xl border border-neutral-200/85 bg-white shadow-sm">
              {/* Subtle Architectural Grid Backdrop */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.04] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:18px_18px]"
                aria-hidden="true"
              />

              <DiagonalCarousel
                items={carouselItems}
                activeIndex={safeIndex}
                onActiveIndexChange={goToSlide}
                loop
                slideSize={250}
                rotationStep={28}
                verticalStep={108}
                inactiveScale={0.62}
                aria-label="Featured projects carousel"
                className="h-full bg-gradient-to-b from-white/75 via-[#FAFAFC]/60 to-[#F4F6FB]/90 text-neutral-900"
                labelClassName="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-neutral-600"
                controlsClassName="border-neutral-200/90 bg-white/85 text-neutral-800 shadow-md"
                renderSlide={(item, idx, { isActive }) => {
                  const { project, theme } = item;
                  const previewTags = project.tags.slice(0, 3);
                  const remainingTags = Math.max(
                    0,
                    project.tags.length - previewTags.length
                  );

                  return (
                    <div
                      className={`group relative flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl border p-5 text-left transition-all duration-300 ${theme.borderColor} ${theme.cardBg} ${
                        isActive
                          ? `shadow-xl ${theme.shadowHover} ring-1 ring-black/5`
                          : 'shadow-md opacity-90 hover:opacity-100'
                      }`}
                    >
                      <CardBackdrop
                        theme={theme}
                        compact
                        topGlowOpacity={isActive ? 'opacity-90' : 'opacity-50'}
                        bottomGlowOpacity={
                          isActive ? 'opacity-80' : 'opacity-40'
                        }
                      />

                      {/* Card Top Row */}
                      <div className="relative z-10 flex items-center justify-between gap-2">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-bold tracking-wider ${theme.categoryBadge}`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${theme.categoryDot}`}
                          />
                          0{idx + 1}
                        </span>

                        <span
                          className={`flex h-7 w-7 items-center justify-center rounded-full border transition-all duration-300 ${
                            isActive
                              ? 'border-black/10 bg-white text-neutral-900 shadow-xs'
                              : 'border-black/5 bg-white/70 text-neutral-400'
                          }`}
                          aria-hidden="true"
                        >
                          <FiArrowUpRight className="h-3.5 w-3.5" />
                        </span>
                      </div>

                      {/* Card Center Title */}
                      <div className="relative z-10 my-auto py-2">
                        <p
                          className={`mb-1.5 truncate font-mono text-[9.5px] font-semibold uppercase tracking-[0.14em] ${theme.numberColor}`}
                        >
                          {project.category}
                        </p>
                        <h3 className="font-sora text-[17px] font-bold leading-snug tracking-tight text-neutral-950 line-clamp-3">
                          {project.title}
                        </h3>
                      </div>

                      {/* Card Bottom Stack Preview */}
                      <div
                        className={`relative z-10 flex flex-wrap items-center gap-1 pt-2.5 border-t ${theme.dividerColor}`}
                      >
                        {previewTags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md border border-black/10 bg-white/90 px-1.5 py-0.5 font-mono text-[9px] font-medium text-neutral-700"
                          >
                            {tag}
                          </span>
                        ))}
                        {remainingTags > 0 && (
                          <span className="px-1 py-0.5 font-mono text-[9px] font-semibold text-neutral-500">
                            +{remainingTags}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                }}
              />
            </div>
          </ScrollReveal>

          {/* Right: Synced Active Project Detail Card */}
          <ScrollReveal
            direction="up"
            distance="32px"
            duration={750}
            delay={120}
            className="col-span-5"
          >
            <AnimatePresence mode="wait">
              <motion.article
                key={activeProject.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className={`group relative flex h-full min-h-[520px] flex-col justify-between rounded-3xl border ${activeTheme.borderColor} ${activeTheme.cardBg} p-8 shadow-sm transition-shadow duration-300 ${activeTheme.shadowHover} overflow-hidden`}
              >
                <CardBackdrop theme={activeTheme} />

                <AutoAdvanceBar
                  activeKey={safeIndex}
                  isRunning={shouldAutoAdvance}
                  theme={activeTheme}
                  show={projects.length > 1}
                />

                <ProjectDetailBody
                  project={activeProject}
                  theme={activeTheme}
                  index={safeIndex}
                  total={projects.length}
                  animateDot={isInView}
                  footerEnd={
                    <div
                      className="flex items-center gap-1.5"
                      role="tablist"
                      aria-label="Switch featured project"
                    >
                      {projects.map((project, idx) => {
                        const isSelected = idx === safeIndex;
                        return (
                          <button
                            key={project.id}
                            type="button"
                            role="tab"
                            aria-selected={isSelected}
                            aria-label={`Select project ${idx + 1}: ${project.title}`}
                            onClick={() => goToSlide(idx)}
                            className={`cursor-pointer rounded-full border px-2.5 py-1 font-mono text-[10px] font-bold transition-all duration-200 ${
                              isSelected
                                ? activeTheme.pillActive
                                : 'border-black/10 bg-white/80 text-neutral-600 hover:bg-white hover:text-neutral-950'
                            }`}
                          >
                            0{idx + 1}
                          </button>
                        );
                      })}
                    </div>
                  }
                />
              </motion.article>
            </AnimatePresence>
          </ScrollReveal>
        </div>
      ) : (
        /* Mobile / Compact Layout: Height-Locked GPU-Composited Stacked Swipe Deck */
        <ScrollReveal direction="up" distance="24px" duration={700}>
          <div className="mx-auto max-w-xl">
            <div
              className="relative overflow-x-clip px-3 pt-2 pb-6 touch-pan-y"
              onTouchStart={handleMobileTouchStart}
              onTouchEnd={handleMobileTouchEnd}
              onTouchCancel={handleMobileTouchCancel}
              onMouseEnter={() => setIsAutoPaused(true)}
              onMouseLeave={() => setIsAutoPaused(false)}
            >
              {/* All cards occupy the same grid cell so height stays locked to the tallest card (0px CLS) */}
              <div className="relative grid grid-cols-1">
                {projects.map((project, idx) => {
                  const total = projects.length;
                  const offset = (idx - safeIndex + total) % total;
                  const isActive = offset === 0;
                  const theme = getProjectTheme(project, idx);

                  let deckClasses =
                    'pointer-events-none opacity-0 scale-[0.91] translate-y-4 z-0';
                  if (isActive) {
                    deckClasses =
                      'pointer-events-auto opacity-100 scale-100 translate-y-0 rotate-0 z-20 shadow-md';
                  } else if (offset === 1) {
                    deckClasses =
                      'pointer-events-none opacity-85 scale-[0.965] translate-y-2 -rotate-[1.6deg] z-10 shadow-sm';
                  } else if (offset === 2) {
                    deckClasses =
                      'pointer-events-none opacity-55 scale-[0.93] translate-y-3.5 rotate-[2.2deg] z-[5] shadow-xs';
                  }

                  return (
                    <article
                      key={project.id}
                      aria-hidden={!isActive}
                      inert={!isActive ? true : undefined}
                      className={`group col-start-1 row-start-1 relative flex flex-col justify-between rounded-3xl border ${theme.borderColor} ${theme.cardBg} p-5 sm:p-7 overflow-hidden transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${deckClasses}`}
                    >
                      <CardBackdrop theme={theme} />

                      <AutoAdvanceBar
                        activeKey={safeIndex}
                        isRunning={isActive && shouldAutoAdvance}
                        theme={theme}
                        show={isActive && projects.length > 1}
                      />

                      <div
                        className={`flex flex-1 flex-col justify-between transition-opacity duration-200 ${
                          isActive ? 'opacity-100' : 'opacity-0 select-none'
                        }`}
                      >
                        <ProjectDetailBody
                          project={project}
                          theme={theme}
                          index={idx}
                          total={total}
                          compact
                          isActive={isActive}
                          animateDot={isActive && isInView}
                          footerEnd={
                            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-neutral-500">
                              Swipe card →
                            </span>
                          }
                        />
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            {/* Unified Deck Controls */}
            {projects.length > 1 && (
              <div className="mt-2 flex justify-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200/90 bg-white/95 md:backdrop-blur-sm px-2 py-1 text-neutral-800 shadow-sm">
                  <button
                    type="button"
                    aria-label="Show previous project"
                    onClick={() => goToSlide(safeIndex - 1)}
                    className="inline-flex size-8 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-neutral-100 active:scale-95"
                  >
                    <ChevronLeft className="size-4" />
                  </button>

                  <div className="flex items-center gap-1.5 px-1">
                    {projects.map((project, idx) => {
                      const isSelected = idx === safeIndex;
                      return (
                        <button
                          key={project.id}
                          type="button"
                          aria-label={`Show project ${idx + 1}: ${project.title}`}
                          aria-current={isSelected ? 'true' : undefined}
                          onClick={() => goToSlide(idx)}
                          className={`h-2 cursor-pointer rounded-full transition-[width,opacity,background-color] duration-300 ${
                            isSelected
                              ? 'w-7 bg-neutral-900 opacity-100'
                              : 'w-2 bg-neutral-400 opacity-45 hover:opacity-75'
                          }`}
                        />
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    aria-label="Show next project"
                    onClick={() => goToSlide(safeIndex + 1)}
                    className="inline-flex size-8 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-neutral-100 active:scale-95"
                  >
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </ScrollReveal>
      )}
    </section>
  );
};

export default Work;
