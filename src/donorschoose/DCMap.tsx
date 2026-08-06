import type { ReactNode } from 'react';
import './tokens.css';
import './dc-map.css';

/* ---------------- Map surface ---------------- */
export interface DCMapProps {
  /** Height of the map surface. Defaults to 420px. */
  height?: number | string;
  /** Stagger pins/markers in with a drop-in animation when the map mounts. */
  animateChildren?: boolean;
  children?: ReactNode;
  className?: string;
}

export function DCMap({ height = 420, animateChildren = false, children, className }: DCMapProps) {
  return (
    <div
      className={['dc-map', animateChildren && 'dc-map--animate-children', className]
        .filter(Boolean)
        .join(' ')}
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

/* ---------------- School marker (need-level pill) ---------------- */
/** School need levels — lower need (`first`) → higher need (`fourth`). */
export type DCMapNeed = 'first' | 'second' | 'third' | 'fourth';

export interface DCSchoolMarkerProps {
  /** Horizontal position as a percent (0–100) of the map width. */
  x: number;
  /** Vertical position as a percent (0–100) of the map height. */
  y: number;
  /** Need level, drives the fill color (lower → higher need). Defaults to `third`. */
  need?: DCMapNeed;
  /** Optional request/cluster count shown next to the school icon. */
  count?: number | string;
  /** Highlighted/selected state. */
  active?: boolean;
  title?: string;
  onClick?: () => void;
}

export function DCSchoolMarker({
  x,
  y,
  need = 'third',
  count,
  active = false,
  title,
  onClick,
}: DCSchoolMarkerProps) {
  const style = { left: `${x}%`, top: `${y}%` } as React.CSSProperties;
  const classes = [
    'dc-school-marker',
    `dc-school-marker--${need}`,
    active && 'dc-school-marker--active',
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <button type="button" className={classes} style={style} title={title} onClick={onClick}>
      <span className="dc-school-marker__icon" aria-hidden="true" />
      {count != null && <span className="dc-school-marker__count">{count}</span>}
    </button>
  );
}

/* ---------------- Need-level legend ---------------- */
const NEED_LEVELS: DCMapNeed[] = ['first', 'second', 'third', 'fourth'];

export function DCMapNeedLegend({ className }: { className?: string }) {
  return (
    <div className={['dc-map__need-legend', className].filter(Boolean).join(' ')}>
      <span className="dc-map__need-legend-label">Lower need schools</span>
      <span className="dc-map__need-legend-scale" aria-hidden="true">
        {NEED_LEVELS.map((level) => (
          <span key={level} className={`dc-map__need-legend-dot dc-map__need-legend-dot--${level}`} />
        ))}
      </span>
      <span className="dc-map__need-legend-label">Higher need schools</span>
    </div>
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
