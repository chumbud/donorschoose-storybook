import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
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

  // Close on Escape
  useEffect(() => {
    if (!mounted) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
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
      <div className="dc-modal__dialog" role="dialog" aria-modal="true">
        <button type="button" className="dc-modal__close" aria-label="close" onClick={onClose}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18.3 5.7a1 1 0 0 0-1.4 0L12 10.6 7.1 5.7a1 1 0 1 0-1.4 1.4L10.6 12l-4.9 4.9a1 1 0 1 0 1.4 1.4L12 13.4l4.9 4.9a1 1 0 0 0 1.4-1.4L13.4 12l4.9-4.9a1 1 0 0 0 0-1.4z" />
          </svg>
        </button>
        {title != null && <h2 className="dc-modal__title">{title}</h2>}
        <div className="dc-modal__body">{children}</div>
        {footer != null && <div className="dc-modal__footer">{footer}</div>}
      </div>
    </div>
  );
}
