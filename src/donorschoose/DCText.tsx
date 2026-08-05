import type { ElementType, ReactNode } from 'react';
import './tokens.css';
import './dc-text.css';

/* ---------------- Heading ---------------- */
export interface DCHeadingProps {
  /** Heading level 1–4, mapped to the SCSS `_typography.scss` sizes. */
  level?: 1 | 2 | 3 | 4;
  /** Render the display "thick" treatment (Sharp Sans 900, tight tracking). */
  thick?: boolean;
  /** Override the rendered tag (defaults to the matching h1–h4). */
  as?: ElementType;
  children: ReactNode;
  className?: string;
}

export function DCHeading({ level = 2, thick = false, as, children, className }: DCHeadingProps) {
  const Tag = (as ?? (`h${level}` as ElementType)) as ElementType;
  const classes = [`dc-heading dc-heading--${level}`, thick && 'dc-heading--thick', className]
    .filter(Boolean)
    .join(' ');
  return <Tag className={classes}>{children}</Tag>;
}

/* ---------------- Subheader ---------------- */
export function DCSubheader({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={['dc-subheader', className].filter(Boolean).join(' ')}>{children}</p>;
}

/* ---------------- Paragraph / body text ---------------- */
export interface DCTextProps {
  /** `body` (default), `discreet` (small grey), or `large`. */
  variant?: 'body' | 'discreet' | 'large';
  as?: ElementType;
  children: ReactNode;
  className?: string;
}

export function DCText({ variant = 'body', as, children, className }: DCTextProps) {
  const Tag = (as ?? 'p') as ElementType;
  const classes = [`dc-text dc-text--${variant}`, className].filter(Boolean).join(' ');
  return <Tag className={classes}>{children}</Tag>;
}
