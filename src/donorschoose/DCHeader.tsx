import { useState } from 'react';
import './tokens.css';
import './dc-header.css';
import { DCButton } from './DCButton';

export interface DCHeaderUser {
  name: string;
}

export interface DCHeaderProps {
  /** Logged-in user, if any. */
  user?: DCHeaderUser;
  onSignIn?: () => void;
  onFindClassroom?: () => void;
  /** Custom header background color (mirrors the `color-nav` mixin). */
  background?: string;
  /** Nav text + CTA color when on a custom background. Defaults to white. */
  color?: string;
  /** Logo tint. Defaults to `color` (so it matches the nav text). */
  logoColor?: string;
}

const LINKS = [
  { label: 'TEACHERS: Get funded', href: '#' },
  { label: 'Partner with us', href: '#' },
  { label: 'About us', href: '#' },
  { label: 'Other ways to give', href: '#' },
  { label: 'Help', href: '#', divider: true },
];

export function DCHeader({
  user,
  onSignIn,
  onFindClassroom,
  background,
  color = '#ffffff',
  logoColor,
}: DCHeaderProps) {
  const [open, setOpen] = useState(false);

  const colored = Boolean(background);
  const style = colored
    ? ({
        '--dc-header-bg': background,
        '--dc-header-fg': color,
        '--dc-header-logo': logoColor ?? color,
        '--dc-header-border': 'transparent',
      } as React.CSSProperties)
    : undefined;

  const nav = (
    <nav className="dc-header__nav">
      <DCButton variant="secondary" size="small" onClick={onFindClassroom}>
        Find a classroom to support
      </DCButton>
      {LINKS.map((l) => (
        <a
          key={l.label}
          href={l.href}
          className={['dc-header__link', l.divider && 'dc-header__link--divider']
            .filter(Boolean)
            .join(' ')}
        >
          {l.label}
        </a>
      ))}
      <span className="dc-header__spacer" />
      <span className="dc-header__account">
        {user ? (
          <span className="dc-header__greeting">
            Hi, <strong>{user.name}</strong>
          </span>
        ) : (
          <a href="#" className="dc-header__link" onClick={onSignIn}>
            Sign in
          </a>
        )}
      </span>
    </nav>
  );

  return (
    <header
      className={['dc-header', colored && 'dc-header--colored', open && 'is-open'].filter(Boolean).join(' ')}
      style={style}
    >
      {/* Mobile bar */}
      <div className="dc-header__mobile">
        <a href="#" className="dc-header__logo" aria-label="DonorsChoose">
          <span className="dc-header__logo-mark" />
        </a>
        <DCButton variant="secondary" size="small" onClick={() => setOpen((o) => !o)}>
          Menu
        </DCButton>
      </div>

      {/* Desktop bar (also the expanded mobile drawer) */}
      <div className="dc-header__inner">
        <a href="#" className="dc-header__logo" aria-label="DonorsChoose">
          <span className="dc-header__logo-mark" />
        </a>
        {nav}
      </div>
    </header>
  );
}
