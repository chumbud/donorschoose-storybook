import type { ReactNode } from 'react';
import { useEffect, useId, useRef, useState } from 'react';
import './tokens.css';
import './dc-modal.css';

export interface DCModalProps {
  /** Whether the modal is open. */
  open: boolean;
  /** Called when the user requests close (scrim click, Esc, or the X). */
  onClose: () => void;
  /** Optional title rendered as the modal heading. */
  title?: ReactNode;
  /** Optional footer (typically action buttons). */
  footer?: ReactNode;
  /** `default` (462px) or `large` (631px). */
  size?: 'default' | 'large';
  children: ReactNode;
}

const EXIT_MS = 320;

export function DCModal({ open, onClose, title, footer, size = 'default', children }: DCModalProps) {
  // `mounted` keeps the node in the DOM through the exit animation;
  // `visible` toggles the .is-open class that drives the transitions.
  const [mounted, setMounted] = useState(open);
  const [visible, setVisible] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (open) {
      clearTimeout(timer.current);
      setMounted(true);
      // next frame so the enter transition runs
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    }
    setVisible(false);
    timer.current = setTimeout(() => setMounted(false), EXIT_MS);
    return () => clearTimeout(timer.current);
  }, [open]);

  // Focus management: move focus into the dialog on open and restore it to the
  // previously-focused element on close. (Base UI: components manage focus.)
  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    // `preventScroll` because the dialog is fixed-position — there's nothing to
    // scroll to. Without it, a docs page (where every story mounts at once) jumps
    // down to whichever modal story is open.
    const raf = requestAnimationFrame(() =>
      dialogRef.current?.focus({ preventScroll: true }),
    );
    return () => {
      cancelAnimationFrame(raf);
      previouslyFocused?.focus?.();
    };
  }, [open]);

  // Close on Escape; trap Tab focus within the dialog while open.
  useEffect(() => {
    if (!mounted) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusable = dialog.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) {
        e.preventDefault();
        dialog.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || active === dialog)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [mounted, onClose]);

  if (!mounted) return null;

  const classes = [
    'dc-modal',
    size === 'large' && 'dc-modal--large',
    visible ? 'is-open' : 'is-closing',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      <div className="dc-modal__scrim" onClick={onClose} />
      <div
        className="dc-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={title != null ? titleId : undefined}
        tabIndex={-1}
        ref={dialogRef}
      >
        <button type="button" className="dc-modal__close" aria-label="Close" onClick={onClose}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18.3 5.7a1 1 0 0 0-1.4 0L12 10.6 7.1 5.7a1 1 0 1 0-1.4 1.4L10.6 12l-4.9 4.9a1 1 0 1 0 1.4 1.4L12 13.4l4.9 4.9a1 1 0 0 0 1.4-1.4L13.4 12l4.9-4.9a1 1 0 0 0 0-1.4z" />
          </svg>
        </button>
        {title != null && <h2 className="dc-modal__title" id={titleId}>{title}</h2>}
        <div className="dc-modal__body">{children}</div>
        {footer != null && <div className="dc-modal__footer">{footer}</div>}
      </div>
    </div>
  );
}
