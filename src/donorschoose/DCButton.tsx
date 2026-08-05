import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './dc-button.css';

export type DCButtonVariant = 'primary' | 'secondary';
export type DCButtonSize = 'default' | 'small';

/**
 * DonorsChoose Button.
 *
 * Ported from donorschoose-web (`.button-primary` / `.button-secondary`),
 * preserving its variants and interaction states.
 */
export interface DCButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Visual variant. Primary = filled blue CTA, secondary = outlined. */
  variant?: DCButtonVariant;
  /** Size. `small` maps to the SCSS `.small` modifier. */
  size?: DCButtonSize;
  /** Stretch to fill the container width. */
  fullWidth?: boolean;
  /** Show the loading spinner and lock interaction. */
  loading?: boolean;
  /** Secondary-only: red destructive tone (SCSS `.button-warning`). */
  warning?: boolean;
  /** Secondary-only: light styling for dark/photo backgrounds (`.button-overlay`). */
  overlay?: boolean;
  /** Optional icon (e.g. an SVG) rendered alongside the label. */
  icon?: ReactNode;
  /** Which side the icon sits on. Defaults to `left`. */
  iconPosition?: 'left' | 'right';
  /** Button label. */
  children: ReactNode;
}

export function DCButton({
  variant = 'primary',
  size = 'default',
  fullWidth = false,
  loading = false,
  warning = false,
  overlay = false,
  icon,
  iconPosition = 'left',
  disabled = false,
  children,
  className,
  ...props
}: DCButtonProps) {
  // The `warning` and `overlay` tones are secondary-only. If one is selected on
  // a primary button, resolve to the compatible state (secondary) so the tone
  // actually shows rather than doing nothing.
  const effectiveVariant = warning || overlay ? 'secondary' : variant;

  const classes = [
    'dc-button',
    `dc-button--${effectiveVariant}`,
    size === 'small' && 'dc-button--small',
    fullWidth && 'dc-button--full-width',
    loading && 'dc-button--loading',
    icon && `dc-button--icon-${iconPosition}`,
    effectiveVariant === 'secondary' && warning && 'dc-button--warning',
    effectiveVariant === 'secondary' && overlay && 'dc-button--overlay',
    (disabled || loading) && 'dc-button--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const iconEl = icon && (
    <span className="dc-button__icon" aria-hidden="true">
      {icon}
    </span>
  );

  return (
    <button
      type="button"
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading && <span className="dc-button__spinner" aria-hidden="true" />}
      {!loading && iconPosition === 'left' && iconEl}
      {children}
      {!loading && iconPosition === 'right' && iconEl}
    </button>
  );
}
