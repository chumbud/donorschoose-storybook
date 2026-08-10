import { useLayoutEffect, useRef, useState } from 'react';
import './tokens.css';
import './dc-subnav.css';
import { DCButton } from './DCButton';

export interface DCSubnavItem {
  /** Target section id (without the leading #). */
  id: string;
  label: string;
}

export interface DCSubnavProps {
  /** In-page section links, in order. */
  items: DCSubnavItem[];
  /** Initially-active section id. Defaults to the first item. */
  defaultActive?: string;
  /** CTA button label (the "Give to this school" primary). Pass null to hide it. */
  giveLabel?: string | null;
  /** Render in the sticky/fixed state (shows the CTA + active bar). */
  sticky?: boolean;
  onGive?: () => void;
  onNavigate?: (id: string) => void;
}

/**
 * The **school-page sub-navigation** — a sticky secondary bar of in-page anchor
 * links with a sliding active indicator and a "Give to this school" CTA. Ported
 * from `#subnav-container` / `#subnav` / `#active-bar` (school_info.jsp +
 * schoolStatPage.scss + the InfoLandingPage scrollspy).
 *
 * Clicking a link sets it active and slides the bar; in-app it also scrolls to
 * the section and an IntersectionObserver keeps it in sync on scroll.
 */
export function DCSubnav({
  items,
  defaultActive,
  giveLabel = 'Give to this school',
  sticky = true,
  onGive,
  onNavigate,
}: DCSubnavProps) {
  const [active, setActive] = useState(defaultActive ?? items[0]?.id);
  const innerRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [bar, setBar] = useState<{ left: number; width: number } | null>(null);

  // Slide the active bar under the active link whenever it changes.
  useLayoutEffect(() => {
    const el = linkRefs.current[active];
    if (el) setBar({ left: el.offsetLeft, width: el.offsetWidth });
  }, [active, items, sticky]);

  return (
    <nav
      className={['dc-subnav', sticky && 'dc-subnav--sticky'].filter(Boolean).join(' ')}
      aria-label="Section navigation"
    >
      <div className="dc-subnav__inner" ref={innerRef}>
        {sticky && bar && (
          <span
            className="dc-subnav__active-bar"
            style={{ transform: `translateX(${bar.left}px)`, width: bar.width }}
            aria-hidden="true"
          />
        )}

        {sticky && giveLabel && (
          <DCButton size="small" className="dc-subnav__give" onClick={onGive}>
            {giveLabel}
          </DCButton>
        )}

        {items.map((it) => (
          <a
            key={it.id}
            ref={(el) => {
              linkRefs.current[it.id] = el;
            }}
            href={`#${it.id}`}
            data-target={`#${it.id}`}
            className={['dc-subnav__link', active === it.id && 'is-active'].filter(Boolean).join(' ')}
            aria-current={active === it.id ? 'page' : undefined}
            onClick={(e) => {
              e.preventDefault();
              setActive(it.id);
              onNavigate?.(it.id);
            }}
          >
            {it.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
