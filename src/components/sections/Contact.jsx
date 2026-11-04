import { FiMail, FiMapPin, FiSend, FiArrowUpRight } from 'react-icons/fi';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { ScrollReveal } from '../common/ScrollReveal';

export const Contact = () => {
  const { contact } = PORTFOLIO_DATA;

  return (
    <section id="contact" className="py-14 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <ScrollReveal direction="up" distance="32px" duration={800}>
        <div className="rounded-3xl border border-neutral-200 bg-white p-8 sm:p-12 lg:p-16 shadow-soft-lg flex flex-col items-center text-center">
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#3B5BFF]">
            Initiate Conversation
          </span>
          <h2 className="mt-3 font-cabinet text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-950 max-w-xl">
            Let’s build something extraordinary together.
          </h2>
          <p className="mt-4 text-base text-neutral-600 font-cabinet max-w-md">
            {contact.availability}
          </p>

          {/* Email action */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
            <a
              href={`mailto:${contact.email}`}
              className="group inline-flex items-center gap-2 rounded-full bg-[#3B5BFF] px-8 py-4 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-md transition-all hover:bg-neutral-950 hover:shadow-xl"
            >
              <FiMail className="h-4 w-4" />
              <span>Send an Email</span>
              <FiSend className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>

            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-6 py-4 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-neutral-800 transition-colors hover:border-neutral-900"
            >
              <span>GitHub Profile</span>
              <FiArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          {/* Location info */}
          <div className="mt-8 flex items-center gap-2 text-xs font-mono text-neutral-500">
            <FiMapPin className="h-3.5 w-3.5 text-neutral-400" />
            <span>{contact.location}</span>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default Contact;
