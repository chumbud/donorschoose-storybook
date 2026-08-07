import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import './tokens.css';
import './dc-toast.css';
import { DCButton } from './DCButton';

export type DCToastPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
export type DCToastTone = 'black' | 'blue';

export interface DCToastAction {
  label: string;
  onClick?: () => void;
  /** `primary` = filled blue; `secondary` = light outline for the dark surface. */
  variant?: 'primary' | 'secondary';
}

/**
 * Best-practice cap for the message — about 3–4 lines at the 300px max width.
 * Longer copy belongs in a modal or inline, not a toast.
 */
export const TOAST_MAX_CHARS = 140;

export interface DCToastProps {
  /** The message. Keep it to ~{@link TOAST_MAX_CHARS} characters (3–4 lines). */
  message: ReactNode;
  /** Optional icon rendered on the left (e.g. `<DCIcon name="cart" />`). */
  icon?: ReactNode;
  /** Surface color. `black` (#212121) or DonorsChoose `blue` (#3804c1). */
  tone?: DCToastTone;
  /** Which corner it appears in. Drives the slide-in direction too. */
  position?: DCToastPosition;
  /**
   * Seconds until auto-dismiss. Shows a countdown bar at the top that shrinks
   * from full to empty over this time (paused on hover). `0` = stays until
   * dismissed.
   */
  duration?: number;
  /** Optional action button on the right. */
  action?: DCToastAction;
  /** Show a close (×) button. */
  showClose?: boolean;
  /**
   * `true` (default) pins the toast to the viewport corner. `false` positions it
   * absolutely inside the nearest positioned ancestor — handy for demos.
   */
  fixed?: boolean;
  /** Called after the toast finishes leaving (timer end or × click). */
  onDismiss?: () => void;
}

/**
 * A **toast** — brief, self-dismissing feedback (added to cart, followed a
 * school, an error) that slides in from the nearest corner. Icon on the left,
 * message in the middle, optional action button on the right, and a countdown
 * bar across the top. On mobile it docks to the top of the screen.
 */
export function DCToast({
  message,
  icon,
  tone = 'black',
  position = 'bottom-right',
  duration = 0,
  action,
  showClose = false,
  fixed = true,
  onDismiss,
}: DCToastProps) {
  const [leaving, setLeaving] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const dismissed = useRef(false);
  const onDismissRef = useRef(onDismiss);
  onDismissRef.current = onDismiss;

  if (
    import.meta.env?.DEV &&
    typeof message === 'string' &&
    message.length > TOAST_MAX_CHARS
  ) {
    console.warn(
      `DCToast: message is ${message.length} chars — over the ${TOAST_MAX_CHARS}-char best-practice limit (3–4 lines). Consider trimming.`,
    );
  }

  const dismiss = useCallback(() => {
    if (dismissed.current) return;
    dismissed.current = true;
    setLeaving(true);
    // Match the exit animation duration (--dc-duration-med = 0.3s).
    window.setTimeout(() => onDismissRef.current?.(), 300);
  }, []);

  // Auto-dismiss after `duration` seconds, pausing while hovered (which keeps
  // it in sync with the paused countdown bar).
  useEffect(() => {
    if (!duration || duration <= 0) return;
    const el = rootRef.current;
    let remaining = duration * 1000;
    let startedAt = Date.now();
    let timerId = window.setTimeout(dismiss, remaining);
    const pause = () => {
      window.clearTimeout(timerId);
      remaining -= Date.now() - startedAt;
    };
    const resume = () => {
      startedAt = Date.now();
      timerId = window.setTimeout(dismiss, Math.max(remaining, 0));
    };
    el?.addEventListener('mouseenter', pause);
    el?.addEventListener('mouseleave', resume);
    return () => {
      window.clearTimeout(timerId);
      el?.removeEventListener('mouseenter', pause);
      el?.removeEventListener('mouseleave', resume);
    };
  }, [duration, dismiss]);

  const classes = [
    'dc-toast',
    `dc-toast--${tone}`,
    `dc-toast--${position}`,
    fixed && 'dc-toast--fixed',
    leaving && 'is-leaving',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} role="status" aria-live="polite" ref={rootRef}>
      {duration > 0 && (
        <span className="dc-toast__timer" style={{ animationDuration: `${duration}s` }} />
      )}

      <div className="dc-toast__body">
        {icon && <span className="dc-toast__icon">{icon}</span>}
        <div className="dc-toast__msg">{message}</div>

        {action && (
          <DCButton
            className="dc-toast__action"
            size="small"
            variant={action.variant === 'secondary' ? 'secondary' : 'primary'}
            overlay={action.variant === 'secondary'}
            onClick={() => {
              action.onClick?.();
              dismiss();
            }}
          >
            {action.label}
          </DCButton>
        )}

        {showClose && (
          <button
            type="button"
            className="dc-toast__close"
            aria-label="Dismiss"
            onClick={dismiss}
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}
