import { useEffect, useRef } from 'react';
import {
  FiFolder,
  FiUser,
  FiBriefcase,
  FiCpu,
  FiMail,
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiX,
} from 'react-icons/fi';
import { RiSendPlaneFill } from 'react-icons/ri';
import { NAV_LINKS, NAV_BRAND, CTA_CONFIG, SOCIAL_LINKS } from '../../../data/navigation';

const ICONS_MAP = {
  work: FiFolder,
  about: FiUser,
  experience: FiBriefcase,
  skills: FiCpu,
  contact: FiMail,
};

const SOCIAL_ICONS = {
  github: FiGithub,
  linkedin: FiLinkedin,
  twitter: FiTwitter,
};

export const MobileMenu = ({ isOpen, onClose, activeId, onItemClick }) => {
  const menuRef = useRef(null);

  // Close when pressing Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-40 flex flex-col justify-start px-4 pt-20 pb-6 md:hidden font-cabinet"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation"
      data-lenis-prevent
    >
      {/* Dimmed backdrop */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Glassmorphic Container */}
      <div
        ref={menuRef}
        className="relative z-50 mx-auto w-full max-w-md overflow-hidden rounded-3xl border border-black/[0.08] bg-white/95 p-5 shadow-2xl backdrop-blur-2xl transition-all duration-300"
        data-lenis-prevent
      >
        {/* Top Header inside Menu with live green dot */}
        <div className="flex items-center justify-between border-b border-black/[0.06] pb-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            <span className="font-cabinet text-xs font-semibold uppercase tracking-[0.14em] text-[#666]">
              {NAV_BRAND.status}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-black/[0.05] text-[#111] transition-colors hover:bg-black/[0.1]"
          >
            <FiX className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation Links in Cabinet Grotesk */}
        <nav className="mt-3 flex flex-col gap-1.5" aria-label="Mobile Primary">
          {NAV_LINKS.map((item) => {
            const Icon = ICONS_MAP[item.id] || FiFolder;
            const isActive = activeId === item.id;

            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  if (onItemClick) onItemClick(e, item.href);
                  onClose();
                }}
                className={`flex items-center justify-between rounded-xl px-4 py-3 font-cabinet text-base font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-[#111] text-white shadow-sm'
                    : 'text-[#333] hover:bg-black/[0.04]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`h-4 w-4 ${
                      isActive ? 'text-[#3B5BFF]' : 'text-[#888]'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                <span className="font-cabinet text-[10px] font-medium uppercase tracking-widest opacity-60">
                  {item.id}
                </span>
              </a>
            );
          })}
        </nav>

        {/* Action CTA in Cabinet Grotesk using #3B5BFF accent */}
        <div className="mt-4 pt-3 border-t border-black/[0.06]">
          <a
            href={CTA_CONFIG.href}
            onClick={(e) => {
              if (onItemClick) onItemClick(e, CTA_CONFIG.href);
              onClose();
            }}
            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#3B5BFF] py-3.5 px-4 font-cabinet text-xs font-bold uppercase tracking-[0.16em] text-white shadow-md transition-all duration-300 hover:bg-[#111]"
          >
            <span>{CTA_CONFIG.label}</span>
            <RiSendPlaneFill className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>
        </div>

        {/* Social Links Row */}
        <div className="mt-3 flex items-center justify-center gap-4 pt-2">
          {SOCIAL_LINKS.map((social) => {
            const SocialIcon = SOCIAL_ICONS[social.icon] || FiGithub;
            return (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.ariaLabel}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.08] bg-black/[0.02] text-[#666] transition-all hover:border-black/20 hover:bg-white hover:text-[#3B5BFF]"
              >
                <SocialIcon className="h-4 w-4" />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
