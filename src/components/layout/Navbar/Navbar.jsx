import { useState, useCallback, useEffect, useMemo } from 'react';
import {
  FiHome,
  FiFolder,
  FiUser,
  FiBriefcase,
  FiCpu,
  FiMail,
  FiGithub,
  FiLinkedin,
  FiSend,
} from 'react-icons/fi';
import { RiCodeSSlashLine } from 'react-icons/ri';
import PillNav from './PillNav';
import { useScrollSpy } from '../../../hooks/useScrollSpy';
import { useScrollHeader } from '../../../hooks/useScrollHeader';
import { NAV_LINKS, NAV_BRAND, CTA_CONFIG, SOCIAL_LINKS } from '../../../data/navigation';
import { useLenis } from 'lenis/react';

export const Navbar = () => {
  const { isScrolled } = useScrollHeader(25);
  const [isMobile, setIsMobile] = useState(false);
  const lenis = useLenis();

  // Responsive breakpoint detector for mobile navigation view
  useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)');
    const updateMobile = () => setIsMobile(mql.matches);
    updateMobile();
    mql.addEventListener('change', updateMobile);
    return () => mql.removeEventListener('change', updateMobile);
  }, []);

  // Section IDs for active scroll spy tracking
  const sectionIds = useMemo(() => ['top', ...NAV_LINKS.map((link) => link.id)], []);
  const activeSection = useScrollSpy(sectionIds, 150);
  const activeHref = activeSection ? `#${activeSection}` : '#top';

  // Smooth scroll handler with offset for floating navbar integrated with Lenis
  const handleScrollTo = useCallback((e, targetHref) => {
    if (e && e.preventDefault) e.preventDefault();

    const navOffset = isMobile ? 85 : 95;

    if (!targetHref || targetHref === '#top' || targetHref === '/') {
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    const targetElement = document.querySelector(targetHref);
    if (targetElement) {
      if (lenis) {
        lenis.scrollTo(targetElement, {
          offset: -navOffset,
          duration: 1.2,
        });
      } else {
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }
  }, [isMobile, lenis]);

  // Custom link renderer to integrate smooth scrolling & test IDs
  const CustomNavLink = useCallback(
    ({ href, children, onClick, ...rest }) => (
      <a
        href={href}
        onClick={(e) => {
          handleScrollTo(e, href);
          if (onClick) onClick(e);
        }}
        {...rest}
      >
        {children}
      </a>
    ),
    [handleScrollTo]
  );

  // Navigation items with semantic icons and accessible labels
  const navItems = useMemo(
    () => [
      {
        id: 'top',
        label: 'Home',
        href: '#top',
        icon: (
          <FiHome className="h-4 w-4 text-[#3B5BFF] md:text-[#888] md:group-hover/slot:text-[#3B5BFF] md:group-data-[hover]/slot:text-[#3B5BFF] transition-colors duration-200" />
        ),
        ariaLabel: 'Scroll to Home',
      },
      ...NAV_LINKS.map((link) => {
        let Icon = FiFolder;
        if (link.id === 'about') Icon = FiUser;
        else if (link.id === 'experience') Icon = FiBriefcase;
        else if (link.id === 'skills') Icon = FiCpu;
        else if (link.id === 'contact') Icon = FiMail;

        return {
          id: link.id,
          label: link.label,
          href: link.href,
          icon: (
            <Icon className="h-4 w-4 text-[#3B5BFF] md:text-[#888] md:group-hover/slot:text-[#3B5BFF] md:group-data-[hover]/slot:text-[#3B5BFF] transition-colors duration-200" />
          ),
          ariaLabel: `Navigate to ${link.label} section`,
        };
      }),
    ],
    []
  );

  // Interactive spinning Brand Logo with live availability indicator
  const brandLogo = useMemo(
    () => (
      <div className="relative flex h-full w-full items-center justify-center">
        <RiCodeSSlashLine className="h-5 w-5 transition-colors duration-300 text-[#3B5BFF] md:text-[#111] md:group-hover/logo:text-[#3B5BFF]" />
        {NAV_BRAND.statusActive && (
          <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full border border-white bg-emerald-500" />
          </span>
        )}
      </div>
    ),
    []
  );

  // Rich footer content for mobile dropdown panel
  const renderPanelFooter = useCallback(
    ({ close }) => (
      <div className="flex flex-col gap-3 font-cabinet px-1 pt-1 pb-1">
        {/* Availability Status */}
        <div className="flex items-center justify-between px-2 py-1 text-xs">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="font-semibold uppercase tracking-[0.14em] text-[#666] text-[11px]">
              {NAV_BRAND.status}
            </span>
          </div>
          <span className="text-[11px] font-medium text-[#888]">
            {NAV_BRAND.name}
          </span>
        </div>

        {/* Action CTA Button */}
        <a
          href={CTA_CONFIG.href}
          data-testid="nav-cta"
          onClick={(e) => {
            handleScrollTo(e, CTA_CONFIG.href);
            close?.();
          }}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#3B5BFF] py-3 px-4 font-cabinet text-xs font-bold uppercase tracking-[0.16em] text-white shadow-md transition-all duration-300 hover:bg-[#111]"
        >
          <span>{CTA_CONFIG.label}</span>
          <FiSend className="h-3.5 w-3.5" />
        </a>

        {/* Social Links Row */}
        <div className="flex items-center justify-center gap-3 pt-1">
          {SOCIAL_LINKS.map((social) => {
            const Icon = social.icon === 'github' ? FiGithub : FiLinkedin;
            return (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.ariaLabel}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.08] bg-black/[0.02] text-[#3B5BFF] transition-all hover:border-[#3B5BFF]/30 hover:bg-[#3B5BFF]/10 hover:scale-105"
              >
                <Icon className="h-4 w-4" />
              </a>
            );
          })}
        </div>
      </div>
    ),
    [handleScrollTo]
  );

  return (
    <header
      aria-label="Primary"
      data-testid="navbar"
      className="fixed inset-x-0 top-0 z-[100] flex justify-center px-4 pt-3.5 pointer-events-none sm:px-6 sm:pt-4 transition-all duration-300"
    >
      <PillNav
        logo={brandLogo}
        logoAlt={`${NAV_BRAND.name} — Back to top`}
        logoHref="#top"
        items={navItems}
        activeHref={activeHref}
        itemStyle="pill"
        hoverEffect="fill"
        indicator="dot"
        theme="light"
        layout="split"
        surface="glass"
        size={isMobile ? 'md' : 'lg'}
        bounce={0.3}
        stretch={0.5}
        intro={true}
        collapse={isMobile ? 'always' : 'auto'}
        onItemClick={(item, index, e) => handleScrollTo(e, item.href)}
        linkComponent={CustomNavLink}
        panelFooter={renderPanelFooter}
        className={`pointer-events-auto transition-shadow duration-300 max-w-md w-full sm:max-w-none sm:w-auto ${
          isScrolled ? 'shadow-soft-lg' : 'shadow-soft'
        }`}
        style={{
          '--pn-dot': '#3B5BFF',
          fontFamily: "'Cabinet Grotesk', -apple-system, sans-serif",
        }}
      />
    </header>
  );
};

export default Navbar;
