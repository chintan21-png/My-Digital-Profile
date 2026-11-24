import { FiArrowUpRight } from 'react-icons/fi';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { ScrollReveal } from '../common/ScrollReveal';
import TextAnimation from '../ui/TextAnimation';

// Helper to highlight key points in description with italic and brand color
const renderHighlightedDescription = (text, highlights = []) => {
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
          className="italic font-medium text-[#3B5BFF] transition-colors"
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
        {projects.map((project, idx) => (
          <ScrollReveal
            key={project.id}
            direction="up"
            distance="32px"
            duration={750}
            delay={idx * 120}
            className="h-full"
          >
            <article className="group relative flex h-full flex-col justify-between rounded-3xl border border-neutral-200/90 bg-white p-6 sm:p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-soft-lg">
              <div>
                {/* Category pill & link */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-neutral-500">
                    {project.category}
                  </span>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`View code for ${project.title}`}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-[#3B5BFF] text-white md:bg-neutral-100 md:text-neutral-600 md:group-hover:bg-[#3B5BFF] md:group-hover:text-white transition-colors"
                  >
                    <FiArrowUpRight className="h-4 w-4" />
                  </a>
                </div>

                {/* Title & Description with Sora */}
                <h3 className="mt-4 font-sora text-xl sm:text-2xl lg:text-[23px] xl:text-[25px] font-bold leading-snug tracking-tight text-[#3B5BFF] md:text-neutral-950 md:group-hover:text-[#3B5BFF] transition-colors">
                  {project.title}
                </h3>
                <p className="mt-2.5 sm:mt-3 font-sora text-sm sm:text-[14.5px] lg:text-[15px] font-normal leading-relaxed text-neutral-600">
                  {renderHighlightedDescription(project.description, project.highlights)}
                </p>
              </div>

              {/* Tags */}
              <div className="mt-6 flex flex-wrap gap-1.5 pt-4 border-t border-neutral-100">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[#3B5BFF] px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-wider text-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default Work;
