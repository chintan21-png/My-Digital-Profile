import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { ScrollReveal } from '../common/ScrollReveal';

export const Experience = () => {
  const { experience } = PORTFOLIO_DATA;

  return (
    <section id="experience" className="py-14 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <ScrollReveal direction="up" distance="24px" duration={700}>
        <div className="flex flex-col items-start gap-2 mb-10 sm:mb-12">
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#3B5BFF]">
            Career History
          </span>
          <h2 className="font-cabinet text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950">
            Work Experience
          </h2>
        </div>
      </ScrollReveal>

      <div className="space-y-6">
        {experience.map((item, idx) => (
          <ScrollReveal
            key={idx}
            direction="up"
            distance="24px"
            duration={700}
            delay={idx * 100}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-2xl border border-neutral-200 bg-white p-6 transition-all hover:border-neutral-300 hover:shadow-soft">
              <div className="flex flex-col">
                <span className="font-mono text-xs uppercase tracking-wider text-neutral-400">
                  {item.period}
                </span>
                <h3 className="mt-1 font-cabinet text-xl font-bold text-neutral-950">
                  {item.role} <span className="text-[#3B5BFF]">@ {item.company}</span>
                </h3>
                <p className="mt-2 text-sm text-neutral-600 font-cabinet max-w-2xl">
                  {item.description}
                </p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default Experience;
