import { NAV_LINKS } from '../../../data/navigation';

export const NavLinks = ({ activeId, onItemClick }) => {
  return (
    <div className="hidden items-center gap-1 md:flex">
      {NAV_LINKS.map((item) => {
        const isActive = activeId === item.id;

        return (
          <a
            key={item.id}
            href={item.href}
            onClick={(e) => {
              if (onItemClick) onItemClick(e, item.href);
            }}
            data-testid={`nav-link-${item.id}`}
            className={`relative rounded-full px-3.5 py-1.5 font-cabinet text-xs font-bold uppercase tracking-[0.14em] transition-all duration-200 lg:px-4 lg:py-2 ${
              isActive
                ? 'bg-[#111] text-white shadow-sm'
                : 'text-[#555] hover:bg-black/[0.05] hover:text-[#111]'
            }`}
          >
            <span className="relative z-10">{item.label}</span>
          </a>
        );
      })}
    </div>
  );
};

export default NavLinks;
