import { FiArrowUpRight } from 'react-icons/fi';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

export const Work = () => {
  const { projects } = PORTFOLIO_DATA;

  return (
    <section id="work" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-start gap-2 mb-12">
        <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#3B5BFF]">
          Selected Projects
        </span>
        <h2 className="font-cabinet text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950">
          Featured Work & Architecture
        </h2>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <article
            key={project.id}
            className="group relative flex flex-col justify-between rounded-3xl border border-neutral-200/90 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-soft-lg"
          >
            <div>
              {/* Category pill */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-neutral-500">
                  {project.category}
                </span>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`View code for ${project.title}`}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 transition-colors group-hover:bg-[#3B5BFF] group-hover:text-white"
                >
                  <FiArrowUpRight className="h-4 w-4" />
                </a>
              </div>

              {/* Title & Description */}
              <h3 className="mt-4 font-cabinet text-xl font-bold text-neutral-950 group-hover:text-[#3B5BFF] transition-colors">
                {project.title}
              </h3>
              <p className="mt-2 text-sm text-neutral-600 leading-relaxed font-cabinet">
                {project.description}
              </p>
            </div>

            {/* Tags */}
            <div className="mt-6 flex flex-wrap gap-1.5 pt-4 border-t border-neutral-100">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-neutral-100 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-neutral-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Work;
