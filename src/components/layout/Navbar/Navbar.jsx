import { useState, useCallback } from 'react';
import { FiArrowUpRight, FiMenu, FiX, FiGithub, FiLinkedin } from 'react-icons/fi';
import { BrandLogo } from './BrandLogo';
import { NavLinks } from './NavLinks';
import { MobileMenu } from './MobileMenu';
import { useScrollSpy } from '../../../hooks/useScrollSpy';
import { useScrollHeader } from '../../../hooks/useScrollHeader';
import { NAV_LINKS, CTA_CONFIG, SOCIAL_LINKS } from '../../../data/navigation';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isScrolled } = useScrollHeader(25);

  const sectionIds = NAV_LINKS.map((link) => link.id);
  const activeSection = useScrollSpy(sectionIds, 150);

  // Smooth scroll handler
  const handleScrollTo = useCallback((e, targetHref) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (targetHref === '#top' || targetHref === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const targetElement = document.querySelector(targetHref);
    if (targetElement) {
      const navOffset = 90;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }, []);

  return (
    <>
      <header
        aria-label="Primary"
        data-testid="navbar"
        className="fixed inset-x-0 top-0 z-[100] flex justify-center px-4 pt-3.5 pointer-events-none sm:px-6 sm:pt-4 transition-all duration-300"
      >
        {/* Floating Capsule integrated with Hero's pastel gradient atmosphere */}
        <nav
          className={`pointer-events-auto flex items-center justify-between gap-2.5 rounded-full border transition-all duration-300 ${
            isScrolled
              ? 'border-black/[0.12] bg-white/95 shadow-soft-lg backdrop-blur-2xl py-1.5 pl-3.5 sm:pl-4 pr-1.5 sm:pr-2'
              : 'border-black/[0.08] bg-white/70 shadow-card backdrop-blur-xl py-2 pl-4 sm:pl-5 pr-2'
          }`}
        >
          {/* Brand Identity / Logo */}
          <BrandLogo onClick={(e) => handleScrollTo(e, '#top')} />

          {/* Desktop Navigation Links */}
          <NavLinks
            activeId={activeSection}
            onItemClick={handleScrollTo}
          />

          {/* Right Action Group: Socials + CTA + Mobile Hamburger */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Quick Dev Social Icons on Desktop */}
            <div className="hidden items-center gap-1 xl:flex">
              <a
                href={SOCIAL_LINKS[0]?.href || 'https://github.com'}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Profile"
                className="flex h-8 w-8 items-center justify-center rounded-full text-[#666] transition-colors hover:bg-black/[0.05] hover:text-[#111]"
              >
                <FiGithub className="h-4 w-4" />
              </a>
              <a
                href={SOCIAL_LINKS[1]?.href || 'https://linkedin.com'}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn Profile"
                className="flex h-8 w-8 items-center justify-center rounded-full text-[#666] transition-colors hover:bg-black/[0.05] hover:text-[#111]"
              >
                <FiLinkedin className="h-4 w-4" />
              </a>
            </div>

            {/* Signature CTA Pill Button using #3B5BFF accent color */}
            <a
              href={CTA_CONFIG.href}
              data-testid="nav-cta"
              onClick={(e) => handleScrollTo(e, CTA_CONFIG.href)}
              className="group hidden sm:inline-flex items-center gap-2 rounded-full bg-[#3B5BFF] px-5 py-2.5 font-cabinet text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm transition-all duration-300 hover:bg-[#111] hover:shadow-md"
            >
              <span>{CTA_CONFIG.label}</span>
              <FiArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              data-testid="nav-toggle"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.08] bg-white/80 text-[#111] transition-colors hover:bg-black/[0.05] md:hidden"
            >
              {mobileMenuOpen ? (
                <FiX className="h-4 w-4 transition-transform duration-200" />
              ) : (
                <FiMenu className="h-4 w-4 transition-transform duration-200" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Accessible Mobile Navigation Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        activeId={activeSection}
        onItemClick={handleScrollTo}
      />
    </>
  );
};

export default Navbar;
