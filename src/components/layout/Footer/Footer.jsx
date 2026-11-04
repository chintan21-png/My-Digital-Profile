import { FiGithub, FiLinkedin, FiTwitter, FiArrowUp } from 'react-icons/fi';
import { NAV_BRAND, SOCIAL_LINKS } from '../../../data/navigation';

const SOCIAL_ICONS = {
  github: FiGithub,
  linkedin: FiLinkedin,
  twitter: FiTwitter,
};

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-neutral-200/80 bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center sm:items-start">
          <span className="font-cabinet text-base font-bold text-neutral-950">
            {NAV_BRAND.name}
          </span>
          <p className="font-mono text-xs text-neutral-500 mt-1">
            © {new Date().getFullYear()} — Designed & Engineered with precision.
          </p>
        </div>

        {/* Social Links & Back to Top */}
        <div className="flex items-center gap-4">
          {SOCIAL_LINKS.map((item) => {
            const Icon = SOCIAL_ICONS[item.icon] || FiGithub;
            return (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.ariaLabel}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-neutral-50 text-neutral-600 transition-colors hover:border-neutral-400 hover:text-[#3B5BFF]"
              >
                <Icon className="h-4 w-4" />
              </a>
            );
          })}

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top of page"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-900 text-white transition-all hover:bg-[#3B5BFF]"
          >
            <FiArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
