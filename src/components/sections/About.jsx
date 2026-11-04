import { FiCheckCircle, FiTerminal, FiLayers } from 'react-icons/fi';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { ScrollReveal } from '../common/ScrollReveal';

export const About = () => {
  const { about } = PORTFOLIO_DATA;

  return (
    <section id="about" className="py-14 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <ScrollReveal direction="up" distance="32px" duration={800}>
        <div className="rounded-3xl border border-neutral-200/80 bg-neutral-900 p-8 sm:p-12 lg:p-16 text-white shadow-xl">
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#3B5BFF]">
            Philosophy & Background
          </span>
          <h2 className="mt-3 font-cabinet text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-2xl leading-[1.15]">
            {about.headline}
          </h2>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-neutral-300 font-cabinet text-base sm:text-lg leading-relaxed">
            {about.paragraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {/* Feature Badges */}
          <div className="mt-10 flex flex-wrap gap-3 pt-6 border-t border-neutral-800">
            <div className="inline-flex items-center gap-2 rounded-full bg-neutral-800/90 px-4 py-2 font-mono text-xs text-neutral-200">
              <FiCheckCircle className="text-[#3B5BFF] h-4 w-4" />
              <span>Clean Architecture</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-neutral-800/90 px-4 py-2 font-mono text-xs text-neutral-200">
              <FiTerminal className="text-[#3B5BFF] h-4 w-4" />
              <span>Performance Driven</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-neutral-800/90 px-4 py-2 font-mono text-xs text-neutral-200">
              <FiLayers className="text-[#3B5BFF] h-4 w-4" />
              <span>Accessible & Scalable</span>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default About;
