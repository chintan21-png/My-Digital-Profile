import { FiArrowUpRight } from 'react-icons/fi';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { ScrollReveal } from '../common/ScrollReveal';
import TextAnimation from '../ui/TextAnimation';

// Themed visual styling for each particular project card in the grid
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
    numberColor: 'text-blue-500/80',
    titleHover: 'md:group-hover:text-blue-600',
    titleMobile: 'text-blue-700 md:text-neutral-950',
    highlightColor: 'text-blue-700 font-semibold',
    dividerColor: 'border-blue-200/60',
    tag: 'bg-white/95 text-blue-800 border-blue-200/80 hover:bg-blue-600 hover:text-white hover:border-blue-600',
    button: 'bg-blue-600 text-white md:bg-white/90 md:text-blue-600 md:border md:border-blue-200/80 md:group-hover:bg-blue-600 md:group-hover:text-white md:group-hover:border-blue-600',
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
    numberColor: 'text-purple-500/80',
    titleHover: 'md:group-hover:text-purple-600',
    titleMobile: 'text-purple-700 md:text-neutral-950',
    highlightColor: 'text-purple-700 font-semibold',
    dividerColor: 'border-purple-200/60',
    tag: 'bg-white/95 text-purple-800 border-purple-200/80 hover:bg-purple-600 hover:text-white hover:border-purple-600',
    button: 'bg-purple-600 text-white md:bg-white/90 md:text-purple-600 md:border md:border-purple-200/80 md:group-hover:bg-purple-600 md:group-hover:text-white md:group-hover:border-purple-600',
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
    numberColor: 'text-emerald-600/80',
    titleHover: 'md:group-hover:text-emerald-600',
    titleMobile: 'text-emerald-800 md:text-neutral-950',
    highlightColor: 'text-emerald-700 font-semibold',
    dividerColor: 'border-emerald-200/60',
    tag: 'bg-white/95 text-emerald-800 border-emerald-200/80 hover:bg-emerald-600 hover:text-white hover:border-emerald-600',
    button: 'bg-emerald-600 text-white md:bg-white/90 md:text-emerald-700 md:border md:border-emerald-200/80 md:group-hover:bg-emerald-600 md:group-hover:text-white md:group-hover:border-emerald-600',
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
    numberColor: 'text-amber-500/80',
    titleHover: 'md:group-hover:text-amber-600',
    titleMobile: 'text-amber-800 md:text-neutral-950',
    highlightColor: 'text-amber-700 font-semibold',
    dividerColor: 'border-amber-200/60',
    tag: 'bg-white/95 text-amber-800 border-amber-200/80 hover:bg-amber-600 hover:text-white hover:border-amber-600',
    button: 'bg-amber-600 text-white md:bg-white/90 md:text-amber-800 md:border md:border-amber-200/80 md:group-hover:bg-amber-600 md:group-hover:text-white md:group-hover:border-amber-600',
  },
];

// Helper to highlight key points in description with italic and matching theme color
const renderHighlightedDescription = (text, highlights = [], highlightColor = 'text-[#3B5BFF]') => {
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

export const Work = () => {
  const { projects } = PORTFOLIO_DATA;

  return (
    <section id="work" className="py-14 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-start gap-2 mb-10 sm:mb-12">
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

      {/* Projects Grid with staggered reveal — 3 columns for medium and up */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {projects.map((project, idx) => {
          const theme = project.theme || CARD_THEMES[idx % CARD_THEMES.length];

          return (
            <ScrollReveal
              key={project.id}
              direction="up"
              distance="32px"
              duration={750}
              delay={idx * 100}
              className="h-full"
            >
              <article
                className={`group relative flex h-full flex-col justify-between rounded-3xl border ${theme.borderColor} ${theme.cardBg} p-5 sm:p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 ${theme.shadowHover} active:scale-[0.99] overflow-hidden`}
              >
                {/* Ambient Top-Right Radial Glow */}
                <div
                  className={`pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-gradient-to-br ${theme.topGlow} blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-70`}
                  aria-hidden="true"
                />

                {/* Ambient Bottom-Left Radial Glow */}
                <div
                  className={`pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-gradient-to-tr ${theme.bottomGlow} blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-60`}
                  aria-hidden="true"
                />

                {/* Architectural Micro Dot-Grid Pattern */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.035] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]"
                  aria-hidden="true"
                />

                {/* Card Content Top Body */}
                <div className="relative z-10">
                  {/* Category pill, project index & external link */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 font-mono text-[10px] sm:text-[10.5px] font-semibold uppercase tracking-[0.15em] border ${theme.categoryBadge} shadow-xs`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${theme.categoryDot} mr-1.5 animate-pulse`}
                        />
                        {project.category}
                      </span>
                      <span
                        className={`font-mono text-[11px] font-bold tracking-wider ${theme.numberColor}`}
                      >
                        0{idx + 1}
                      </span>
                    </div>

                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`View code and live project for ${project.title}`}
                      className={`flex h-9 w-9 min-h-[36px] min-w-[36px] items-center justify-center rounded-full transition-all duration-300 active:scale-95 group/link ${theme.button}`}
                    >
                      <FiArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 md:group-hover:translate-x-0.5 md:group-hover:-translate-y-0.5" />
                    </a>
                  </div>

                  {/* Title & Description with Sora typography */}
                  <h3
                    className={`mt-4 sm:mt-5 font-sora text-xl sm:text-2xl lg:text-[22px] xl:text-[24px] font-bold leading-snug tracking-tight ${theme.titleMobile} ${theme.titleHover} transition-colors`}
                  >
                    {project.title}
                  </h3>
                  <p className="mt-2.5 sm:mt-3 font-sora text-sm sm:text-[14.5px] lg:text-[15px] font-normal leading-relaxed text-neutral-700">
                    {renderHighlightedDescription(
                      project.description,
                      project.highlights,
                      theme.highlightColor
                    )}
                  </p>
                </div>

                {/* Tags Stack Footer */}
                <div
                  className={`relative z-10 mt-6 flex flex-wrap gap-1.5 sm:gap-2 pt-4 border-t ${theme.dividerColor}`}
                >
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`rounded-lg border px-2.5 py-1 font-mono text-[10px] sm:text-[10.5px] font-medium tracking-wide shadow-xs transition-all duration-200 active:scale-95 ${theme.tag}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
};

export default Work;
