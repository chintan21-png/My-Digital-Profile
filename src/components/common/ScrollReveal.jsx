import { useScrollReveal } from '../../hooks/useScrollReveal';

/**
 * ScrollReveal component that smoothly animates its children into view
 * as the user scrolls down the page.
 *
 * Mobile-optimised:
 * - rootMargin is NOT forwarded; the hook calculates a safe clamp automatically.
 * - willChange is removed once the element is revealed to free GPU memory.
 * - Reduced motion is respected at the hook level.
 */
export const ScrollReveal = ({
  children,
  className = '',
  delay = 0,
  duration = 750,
  distance = '24px',
  direction = 'up', // 'up' | 'down' | 'left' | 'right' | 'none'
  threshold = 0.08,
  as: Component = 'div',
  ...rest
}) => {
  const [ref, isRevealed] = useScrollReveal({ threshold });

  const getTransform = () => {
    if (isRevealed) return 'translate3d(0, 0, 0)';
    switch (direction) {
      case 'up':    return `translate3d(0, ${distance}, 0)`;
      case 'down':  return `translate3d(0, -${distance}, 0)`;
      case 'left':  return `translate3d(${distance}, 0, 0)`;
      case 'right': return `translate3d(-${distance}, 0, 0)`;
      case 'none':
      default:      return 'translate3d(0, 0, 0)';
    }
  };

  return (
    <Component
      ref={ref}
      className={className}
      style={{
        opacity: isRevealed ? 1 : 0,
        transform: getTransform(),
        transitionProperty: 'opacity, transform',
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        transitionDelay: `${delay}ms`,
      }}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default ScrollReveal;

