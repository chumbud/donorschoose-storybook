import { useEffect, useRef, useState, type ReactNode } from 'react';
import './tokens.css';
import './dc-dropdown.css';
import { DCIcon } from './DCIcon';

export interface DCDropdownOption {
  /** Value reported to `onChange`. */
  value: string;
  label: string;
  /**
   * Parenthetical shown in italics under the label while this option is the
   * selected one, e.g. "lowest cost to complete + fewest days left".
   */
  description?: string;
}

export interface DCDropdownProps {
  options: DCDropdownOption[];
  /** Selected value. Omit to let the dropdown manage its own. */
  value?: string;
  onChange?: (value: string) => void;
  /** Text before the trigger, e.g. "81,168 projects sorted by". */
  children?: ReactNode;
  /** Which edge the panel hangs from. Defaults to `right`. */
  align?: 'left' | 'right';
  /** Accessible name for the trigger. */
  label?: string;
}

/**
 * The sort **dropdown** used above the search results — a link-styled trigger
 * that opens a panel restating the current choice (with its description) above
 * the alternatives. The panel animates in from the trigger's edge.
 */
export function DCDropdown({
  options,
  value,
  onChange,
  children,
  align = 'right',
  label = 'Sort results',
}: DCDropdownProps) {
  const [open, setOpen] = useState(false);
  const [ownValue, setOwnValue] = useState(options[0]?.value);
  const rootRef = useRef<HTMLDivElement>(null);

  const selectedValue = value ?? ownValue;
  const selected = options.find((o) => o.value === selectedValue) ?? options[0];
  const rest = options.filter((o) => o.value !== selected?.value);

  const choose = (next: string) => {
    if (value === undefined) setOwnValue(next);
    onChange?.(next);
    setOpen(false);
  };

  // Close on Escape or on a click outside the dropdown.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [open]);

  return (
    <div
      className={['dc-dropdown', `dc-dropdown--${align}`].join(' ')}
      ref={rootRef}
    >
      {children}{' '}
      <button
        type="button"
        className="dc-dropdown__trigger"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={label}
        onClick={() => setOpen((o) => !o)}
      >
        {selected?.label}
        <span className={['dc-dropdown__caret', open && 'is-open'].filter(Boolean).join(' ')}>
          <DCIcon name="navigatedown" size={12} />
        </span>
      </button>

      {open && (
        <div className="dc-dropdown__panel" role="menu">
          {selected && (
            <div className="dc-dropdown__current">
              <div className="dc-dropdown__current-label">{selected.label}</div>
              {selected.description && (
                <div className="dc-dropdown__current-desc">({selected.description})</div>
              )}
            </div>
          )}
          {rest.map((o) => (
            <button
              key={o.value}
              type="button"
              role="menuitem"
              className="dc-dropdown__option"
              onClick={() => choose(o.value)}
            >
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
