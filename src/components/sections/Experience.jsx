import { useState, useEffect, useRef } from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { ScrollReveal } from '../common/ScrollReveal';

export const Experience = () => {
  const { experience, experienceSummary } = PORTFOLIO_DATA;

  const summary = experienceSummary || {
    badge: '(Career)',
    titlePrefix: 'Where I’ve',
    titleAccent: 'been',
    description:
      'Hands-on experience across internships, full-stack client development, and modern web applications — always close to the metal of the interface.',
    range: '2025 → Today',
  };

  const timelineRef = useRef(null);
  const [lineScale, setLineScale] = useState(0);

  // Scroll tracking to dynamically animate the vertical timeline indicator
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (timelineRef.current) {
            const rect = timelineRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Start scaling as soon as the top of timeline enters the lower viewport
            const startTrigger = windowHeight * 0.75;
            const scrolledDistance = startTrigger - rect.top;
            const totalDistance = Math.max(rect.height, 1);

            const progress = Math.min(1, Math.max(0, scrolledDistance / totalDistance));
            setLineScale(progress);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <section
      id="experience"
      data-testid="experience"
      className="w-full bg-white px-6 py-24 md:px-12 md:py-32 lg:px-20"
    >
      <div className="mx-auto max-w-7xl grid gap-16 lg:grid-cols-[1fr_1.35fr] lg:gap-24">
        {/* Left Column: Sticky Career Header */}
        <div className="self-start lg:sticky lg:top-28">
          <ScrollReveal direction="up" distance="16px" duration={600}>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#3B5BFF]">
                {summary.badge}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" distance="20px" duration={700} delay={80}>
            <div>
              <div className="mt-4 font-display text-[clamp(2.6rem,5.5vw,5rem)] font-black leading-[1.02] tracking-[-0.03em] text-[#111]">
                <span className="block overflow-hidden">
                  <span className="block will-change-transform">
                    <span>
                      {summary.titlePrefix}{' '}
                      <span className="serif-accent font-normal text-[#3B5BFF]">
                        {summary.titleAccent}
                      </span>
                    </span>
                  </span>
                </span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" distance="20px" duration={700} delay={160}>
            <div className="mt-8 max-w-sm">
              <p className="text-base leading-relaxed text-[#555]">
                {summary.description}
              </p>
              <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-[#888]">
                {summary.range}
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Right Column: Interactive Timeline */}
        <div
          ref={timelineRef}
          className="relative"
          data-testid="experience-timeline"
        >
          {/* Vertical Timeline Track & Dynamic Scale Line */}
          <div
            className="absolute bottom-0 left-[5px] top-0 w-px bg-black/10 md:left-1/2 md:-translate-x-1/2"
            aria-hidden="true"
          >
            <div
              className="h-full w-full origin-top bg-[#3B5BFF] transition-transform duration-100 ease-out"
              data-testid="experience-line"
              style={{ transform: `scaleY(${lineScale})` }}
            />
          </div>

          {/* Timeline Entries */}
          {experience.map((item, idx) => {
            const isEven = idx % 2 === 0;
            const tags = item.technologies || item.skills || item.tags || [];

            return (
              <div
                key={idx}
                className={`relative pb-16 pl-10 md:w-1/2 md:pl-0 last:pb-0 ${
                  isEven ? 'md:pr-14' : 'md:ml-auto md:pl-14'
                }`}
              >
                {/* Timeline Node Dot */}
                <span
                  className={`absolute left-0 top-2 size-[11px] rounded-full border-2 border-[#3B5BFF] bg-white transition-all duration-300 ${
                    isEven ? 'md:left-auto md:-right-[5px]' : 'md:-left-[5px]'
                  }`}
                  aria-hidden="true"
                />

                {/* Entry Content Card */}
                <ScrollReveal
                  direction="up"
                  distance="20px"
                  duration={650}
                  delay={idx * 120}
                >
                  <div data-testid={`experience-entry-${idx}`}>
                    <span className="inline-block rounded-full border border-black/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-[#555]">
                      {item.period}
                    </span>

                    <h3 className="mt-4 font-display text-2xl font-extrabold tracking-[-0.02em] text-[#111]">
                      {item.role}
                    </h3>

                    <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-[#3B5BFF]">
                      {item.company}
                    </p>

                    <p className="mt-3 max-w-md text-sm leading-relaxed text-[#555]">
                      {item.description}
                    </p>

                    {tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {tags.map((tag, tagIdx) => (
                          <span
                            key={tagIdx}
                            className="rounded-full bg-black/[0.04] px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-[#555]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
