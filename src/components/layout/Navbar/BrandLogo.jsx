import { RiCodeSSlashLine } from 'react-icons/ri';
import { NAV_BRAND } from '../../../data/navigation';

export const BrandLogo = ({ onClick }) => {
  return (
    <a
      href="#top"
      onClick={onClick}
      className="group relative inline-flex items-center gap-2.5 rounded-full py-1 pr-3 text-[#111] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B5BFF]"
      aria-label={`${NAV_BRAND.name} — Back to top`}
    >
      {/* Icon Badge */}
      <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#111] text-white shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:bg-[#3B5BFF]">
        <RiCodeSSlashLine className="h-4 w-4 transition-transform duration-300 group-hover:rotate-6" />

        {/* Pulsing green availability status dot matching Hero availability indicator */}
        {NAV_BRAND.statusActive && (
          <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />
          </span>
        )}
      </div>

      {/* Developer Name & Sub-status in Cabinet Grotesk font */}
      <div className="flex flex-col">
        <span className="font-cabinet text-sm font-extrabold tracking-tight text-[#111] transition-colors group-hover:text-[#3B5BFF] sm:text-[15px]">
          {NAV_BRAND.name}
        </span>
        <span className="hidden font-cabinet text-[10px] font-semibold uppercase tracking-[0.14em] text-[#888] lg:block">
          {NAV_BRAND.status}
        </span>
      </div>
    </a>
  );
};

export default BrandLogo;
