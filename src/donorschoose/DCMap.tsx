import type { ReactNode } from 'react';
import './tokens.css';
import './dc-map.css';

/* ---------------- Map surface ---------------- */
export interface DCMapProps {
  /** Height of the map surface. Defaults to 420px. */
  height?: number | string;
  children?: ReactNode;
  className?: string;
}

export function DCMap({ height = 420, children, className }: DCMapProps) {
  return (
    <div
      className={['dc-map', className].filter(Boolean).join(' ')}
      style={{ height: typeof height === 'number' ? `${height}px` : height }}
      role="img"
      aria-label="Map"
    >
      <div className="dc-map__surface" aria-hidden="true" />
      {children}
    </div>
  );
}

/* ---------------- Pin / marker ---------------- */
export interface DCMapPinProps {
  /** Horizontal position as a percent (0–100) of the map width. */
  x: number;
  /** Vertical position as a percent (0–100) of the map height. */
  y: number;
  /** Optional count/label shown inside the pin (e.g. cluster size). */
  count?: number | string;
  /** Highlighted/selected state (larger, elevated). */
  active?: boolean;
  /** Dimmed/visited state. */
  visited?: boolean;
  /** Pulsing "attention" ring. */
  pulse?: boolean;
  /** Marker fill color (any CSS color). Defaults to link blue. */
  color?: string;
  title?: string;
  onClick?: () => void;
}

export function DCMapPin({
  x,
  y,
  count,
  active = false,
  visited = false,
  pulse = false,
  color,
  title,
  onClick,
}: DCMapPinProps) {
  const style = {
    left: `${x}%`,
    top: `${y}%`,
    ...(color ? { background: color } : {}),
  } as React.CSSProperties;
  const classes = [
    'dc-map__pin',
    active && 'dc-map__pin--active',
    visited && 'dc-map__pin--visited',
    pulse && 'dc-map__pin--pulse',
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <button type="button" className={classes} style={style} title={title} onClick={onClick}>
      {count != null && <span className="dc-map__pin-count">{count}</span>}
    </button>
  );
}

/* ---------------- Popup card ---------------- */
export interface DCMapPopupProps {
  x: number;
  y: number;
  children: ReactNode;
}

export function DCMapPopup({ x, y, children }: DCMapPopupProps) {
  const style = { left: `${x}%`, top: `${y}%` } as React.CSSProperties;
  return (
    <div className="dc-map__popup" style={style} role="dialog">
      {children}
      <span className="dc-map__popup-arrow" aria-hidden="true" />
    </div>
  );
}
