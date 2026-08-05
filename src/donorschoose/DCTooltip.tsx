import type { ReactNode } from 'react';
import { useId } from 'react';
import './tokens.css';
import './dc-tooltip.css';

export type DCTooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface DCTooltipProps {
  /** Tooltip text (or nodes). */
  content: ReactNode;
  /** Side of the trigger the bubble appears on. Defaults to `top`. */
  placement?: DCTooltipPlacement;
  /** Bubble color. `dark` (default) or brand `blue`. */
  variant?: 'dark' | 'blue';
  /** Force the tooltip open (e.g. for documentation/demos). */
  open?: boolean;
  /** On mobile (≤46em), render the bubble as a fixed bottom sheet. */
  mobileSheet?: boolean;
  /** The trigger element. */
  children: ReactNode;
}

/**
 * DonorsChoose Tooltip — shows on hover and keyboard focus, or force it open.
 */
export function DCTooltip({
  content,
  placement = 'top',
  variant = 'dark',
  open = false,
  mobileSheet = false,
  children,
}: DCTooltipProps) {
  const id = useId();
  const classes = [
    'dc-tooltip',
    `dc-tooltip--${placement}`,
    variant === 'blue' && 'dc-tooltip--blue',
    mobileSheet && 'dc-tooltip--mobile-sheet',
    open && 'is-open',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes}>
      {/* Trigger — tabIndex makes it focusable so the tooltip is keyboard-accessible */}
      <span aria-describedby={id} tabIndex={0} style={{ display: 'inline-flex', outline: 'none' }}>
        {children}
      </span>
      <span className="dc-tooltip__bubble" role="tooltip" id={id}>
        {content}
      </span>
    </span>
  );
}
