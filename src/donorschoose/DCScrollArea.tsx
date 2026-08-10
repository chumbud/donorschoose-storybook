import type { CSSProperties, ReactNode } from 'react';
import './tokens.css';
import './dc-scroll.css';

export interface DCScrollAreaProps {
  /** Which axis scrolls. Defaults to `y`. */
  axis?: 'y' | 'x' | 'both';
  /** Max height before vertical scrolling kicks in. */
  maxHeight?: number | string;
  /** Max width before horizontal scrolling kicks in. */
  maxWidth?: number | string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

/**
 * A scroll container with the DonorsChoose **styled scrollbar** (grey thumb on a
 * light track), ported from `.projects-box` in map.scss. It's really just the
 * `dc-scroll` class — add that class to any overflowing element to get the same
 * scrollbar; this component is a convenience wrapper that also sets the overflow
 * axis and max size.
 */
export function DCScrollArea({
  axis = 'y',
  maxHeight,
  maxWidth,
  className,
  style,
  children,
}: DCScrollAreaProps) {
  const axisClass = axis === 'both' ? 'dc-scroll' : `dc-scroll dc-scroll--${axis}`;
  return (
    <div className={[axisClass, className].filter(Boolean).join(' ')} style={{ maxHeight, maxWidth, ...style }}>
      {children}
    </div>
  );
}
