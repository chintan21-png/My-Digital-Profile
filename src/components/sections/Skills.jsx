import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { ScrollReveal } from '../common/ScrollReveal';
import Iridescence from '../ui/Iridescence';

export const Skills = () => {
  const { skills } = PORTFOLIO_DATA;

  return (
    <section id="skills" className="py-14 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <ScrollReveal direction="up" distance="24px" duration={700}>
        <div className="flex flex-col items-start gap-2 mb-10 sm:mb-12">
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#3B5BFF]">
            Tooling & Stack
          </span>
          <h2 className="font-cabinet text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950">
            Technical Arsenal
          </h2>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {skills.map((group, idx) => (
          <ScrollReveal
            key={idx}
            direction="up"
            distance="32px"
            duration={750}
            delay={idx * 120}
            className="h-full"
          >
            <div className="group relative h-full rounded-3xl border border-neutral-200/90 bg-white/80 backdrop-blur-md p-6 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:border-[#3B5BFF]/30">
              {/* Iridescence Interactive Background Effect */}
              <div className="absolute inset-0 pointer-events-none opacity-40 transition-opacity duration-500 group-hover:opacity-65">
                <Iridescence
                  color="#3b82f6"
                  hueShift={0}
                  saturation={1}
                  brightness={1.5}
                  contrast={1}
                  speed={0.8}
                  scale={1}
                  detail={8}
                  warp={1}
                  rotation={0}
                  mouseReact={true}
                  amplitude={0.1}
                  stir={0.5}
                  sheen={0.3}
                  clickSwirl={true}
                  grain={0}
                  fade={0}
                />
              </div>

              <div className="relative z-10 flex flex-col h-full">
                <h3 className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-neutral-600 mb-4 pb-2 border-b border-neutral-200/60">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-xl border border-neutral-200/80 bg-white/80 backdrop-blur-sm px-3 py-1.5 font-cabinet text-sm font-medium text-neutral-800 transition-all duration-200 hover:border-[#3B5BFF] hover:bg-white hover:text-[#3B5BFF] hover:shadow-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default Skills;
