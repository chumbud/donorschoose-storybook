import type { ReactNode } from 'react';
import './tokens.css';
import './dc-avatar.css';

const TINTS = ['#0062fd', '#3804c1', '#6ea217', '#d81e5b', '#414142'];

/** DonorsChoose illustrated placeholder avatars (from /public/images). */
export const PLACEHOLDER_AVATARS = [
  ...Array.from({ length: 10 }, (_, i) => `teacher-${i + 1}`),
  ...Array.from({ length: 10 }, (_, i) => `donor-${i + 1}`),
] as const;

export type DCAvatarPlaceholder = (typeof PLACEHOLDER_AVATARS)[number];

/** Resolve a placeholder key (e.g. "teacher-3") to its image path. */
export function placeholderSrc(key: string) {
  const [type, n] = key.split('-');
  return `/images/placeholder-avatars/${type}-placeholder-${n}_272.png`;
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '')).toUpperCase();
}
function tintFor(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return TINTS[h % TINTS.length];
}

export interface DCAvatarProps {
  /** Name — used for initials fallback and the accessible label. */
  name: string;
  /** Photo URL. Takes priority over `placeholder`. */
  src?: string;
  /** DonorsChoose illustrated placeholder (e.g. "teacher-3"). Used when `src` is absent. */
  placeholder?: DCAvatarPlaceholder | string;
  /** Diameter in px. Defaults to 48. */
  size?: number;
  /** `circle` (default) or `rounded` square. */
  shape?: 'circle' | 'rounded';
  /** Show a brand ring around the avatar. */
  ring?: boolean;
}

export function DCAvatar({ name, src, placeholder, size = 48, shape = 'circle', ring = false }: DCAvatarProps) {
  const imgSrc = src ?? (placeholder ? placeholderSrc(placeholder) : undefined);
  const classes = [
    'dc-avatar',
    shape === 'rounded' && 'dc-avatar--rounded',
    ring && 'dc-avatar__ring',
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <span
      className={classes}
      style={{ width: size, height: size, fontSize: size * 0.4, background: imgSrc ? '#fff' : tintFor(name) }}
      title={name}
      role="img"
      aria-label={name}
    >
      {imgSrc ? <img src={imgSrc} alt="" /> : initials(name)}
    </span>
  );
}

export interface DCAvatarGroupProps {
  /** People to show. Extras beyond `max` collapse into a +N chip. */
  people: { name: string; src?: string; placeholder?: string }[];
  size?: number;
  max?: number;
}

export function DCAvatarGroup({ people, size = 40, max = 4 }: DCAvatarGroupProps): ReactNode {
  const shown = people.slice(0, max);
  const extra = people.length - shown.length;
  return (
    <span className="dc-avatar-group">
      {shown.map((p) => (
        <DCAvatar key={p.name} name={p.name} src={p.src} placeholder={p.placeholder} size={size} />
      ))}
      {extra > 0 && (
        <span className="dc-avatar-group__more" style={{ width: size, height: size, fontSize: size * 0.34 }}>
          +{extra}
        </span>
      )}
    </span>
  );
}
