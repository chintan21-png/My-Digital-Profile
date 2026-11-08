import { useState, useEffect, useRef, useMemo } from 'react';
import { FiCheckCircle, FiTerminal, FiLayers } from 'react-icons/fi';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { ScrollReveal } from '../common/ScrollReveal';
import profileImg from '../../assets/wmremove-transformed.png';

export const About = () => {
  const { about, hero, contact } = PORTFOLIO_DATA;

  // Words that receive the signature italic serif accent in headline & description
  const headlineAccentWords = ['meaningful', 'thoughtful', 'clean'];
  const descAccentWords = ['full-stack', 'scalable', 'reliable', 'intuitive'];

  // Ref and state for scroll-driven word opacity scrub
  const descriptionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Split paragraphs into individual word tokens for scroll scrubbing
  const paragraphWords = useMemo(() => {
    return (about.paragraphs || []).map((p) => p.split(/\s+/).filter(Boolean));
  }, [about.paragraphs]);

  const totalWords = useMemo(() => {
    return paragraphWords.reduce((acc, words) => acc + words.length, 0);
  }, [paragraphWords]);

  // Track viewport scroll progress to drive word-by-word reveal (down and up)
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (descriptionRef.current) {
            const rect = descriptionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Start revealing when the top of the description is 82% down the viewport
            const startY = windowHeight * 0.82;
            // Finish revealing when the top reaches 20% down the viewport
            const endY = windowHeight * 0.20;
            const distance = (startY - endY) + rect.height * 0.4;

            const current = startY - rect.top;
            const progress = Math.min(1, Math.max(0, current / distance));
            setScrollProgress(progress);
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

  // Compute opacity for each individual word (0.18 when dimmed, up to 1.0 when active)
  const getWordOpacity = (globalIndex) => {
    if (totalWords === 0) return 1;
    // Overlapping window for a fluid wave-like illumination
    const windowRatio = Math.max(0.04, 2.4 / totalWords);
    const start = (globalIndex / totalWords) * (1 - windowRatio);
    const end = start + windowRatio;

    if (scrollProgress <= start) return 0.18;
    if (scrollProgress >= end) return 1;

    const ratio = (scrollProgress - start) / (end - start);
    return 0.18 + 0.82 * ratio;
  };

  // Render headline with styled editorial serif spans
  const renderStyledHeadline = (text) => {
    if (!text) return null;
    const words = text.split(' ');
    return words.map((word, idx) => {
      const clean = word.toLowerCase().replace(/[^a-z]/g, '');
      const isAccent = headlineAccentWords.includes(clean);
      return (
        <span
          key={idx}
          className={`mr-[0.28em] inline-block ${isAccent ? 'serif-accent font-normal text-[#3B5BFF]' : ''
            }`}
        >
          {word}
        </span>
      );
    });
  };

  const stats = about.stats || [
    { value: '6+', label: 'Months experience', testId: 'stat-years-experience' },
    { value: '5+', label: 'Projects Built', testId: 'stat-projects-shipped' },
    { value: '100%', label: 'Code Quality', testId: 'stat-happy-clients' },
  ];

  const locationText = contact?.location
    ? contact.location.split('(')[0].trim()
    : 'Full-Stack Developer';

  return (
    <section
      id="about"
      data-testid="about"
      className="w-full bg-[#F3F1EC] px-6 py-20 sm:py-24 md:px-12 md:py-32 lg:px-20 transition-colors"
    >
      <div className="mx-auto max-w-7xl grid items-start gap-16 lg:grid-cols-[1.25fr_1fr] lg:gap-24">
        {/* Left Column: About label, headline, scroll-scrubbed description, badges, and stats */}
        <div>
          <ScrollReveal direction="up" distance="24px" duration={700}>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#3B5BFF]">
                (About me)
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" distance="28px" duration={750} delay={80}>
            <h2
              className="mt-8 max-w-2xl font-display text-[1.5rem] font-semibold leading-[1.28] tracking-[-0.01em] text-[#111] md:text-[2.3rem]"
              data-testid="about-text"
            >
              {renderStyledHeadline(about.headline)}
            </h2>
          </ScrollReveal>

          {/* Description Paragraphs with Scroll-Driven Word Opacity Animation */}
          <div
            ref={descriptionRef}
            data-testid="about-description"
            className="mt-8 space-y-6 max-w-2xl font-cabinet text-base sm:text-lg md:text-[1.22rem] leading-[1.65] text-[#111]"
          >
            {paragraphWords.map((words, pIdx) => {
              // Calculate starting global index for words in this paragraph
              let startIdx = 0;
              for (let i = 0; i < pIdx; i++) {
                startIdx += paragraphWords[i].length;
              }

              return (
                <p key={pIdx} className="leading-relaxed">
                  {words.map((word, wIdx) => {
                    const globalIdx = startIdx + wIdx;
                    const opacity = getWordOpacity(globalIdx);
                    const clean = word.toLowerCase().replace(/[^a-z]/g, '');
                    const isAccent = descAccentWords.includes(clean);

                    return (
                      <span
                        key={wIdx}
                        className={`mr-[0.28em] inline-block transition-opacity duration-150 ease-out ${isAccent ? 'serif-accent font-normal text-[#3B5BFF]' : 'text-[#111]'
                          }`}
                        style={{ opacity }}
                      >
                        {word}
                      </span>
                    );
                  })}
                </p>
              );
            })}
          </div>

          {/* Feature Badges */}
          <ScrollReveal direction="up" distance="28px" duration={750} delay={180}>
            <div className="mt-10 flex flex-wrap gap-3 pt-6 border-t border-black/10">
              <div className="inline-flex items-center gap-2 rounded-full bg-neutral-800/90 px-4 py-2 font-mono text-xs text-neutral-200 transition-all hover:bg-neutral-900 hover:scale-105 shadow-sm">
                <FiCheckCircle className="text-[#3B5BFF] h-4 w-4" />
                <span>Clean Code</span>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full bg-neutral-800/90 px-4 py-2 font-mono text-xs text-neutral-200 transition-all hover:bg-neutral-900 hover:scale-105 shadow-sm">
                <FiTerminal className="text-[#3B5BFF] h-4 w-4" />
                <span>Full-Stack Development</span>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full bg-neutral-800/90 px-4 py-2 font-mono text-xs text-neutral-200 transition-all hover:bg-neutral-900 hover:scale-105 shadow-sm">
                <FiLayers className="text-[#3B5BFF] h-4 w-4" />
                <span>Problem Solving</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Stat counters */}
          <ScrollReveal direction="up" distance="28px" duration={750} delay={240}>
            <div className="mt-14 grid grid-cols-3 gap-6 border-t border-black/10 pt-8">
              {stats.map((stat, idx) => (
                <div key={idx} data-testid={stat.testId || `stat-${idx}`}>
                  <span className="font-display text-4xl font-black tracking-[-0.02em] text-[#111] md:text-5xl lg:text-6xl">
                    {stat.value}
                  </span>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#555] md:text-[11px]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Right Column: Arched portrait & metadata */}
        <ScrollReveal direction="up" distance="32px" duration={850} delay={180}>
          <div className="relative mx-auto w-[min(420px,92%)] lg:w-full max-w-[420px] lg:sticky lg:top-28">
            {/* Arched image container */}
            <div className="aspect-[3/4] overflow-hidden rounded-b-[36px] rounded-t-[999px] shadow-xl ring-1 ring-black/5 bg-[#EEF2FF] group">
              <div className="relative h-full w-full overflow-hidden bg-gradient-to-b from-[#EEF2FF] via-[#E4ECFF] to-[#DCE4FF]/60 flex items-center justify-center">
                <img
                  alt={`Portrait of ${hero?.name || 'Chintan Nakum'}`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  src={profileImg}
                />
              </div>
            </div>

            {/* Photo caption / coordinates */}
            <div className="mt-4 flex items-center justify-between font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-[#555]">
              <span className="font-semibold text-neutral-800">{hero?.name || 'Chintan Nakum'}</span>
              <span>{locationText}</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default About;
