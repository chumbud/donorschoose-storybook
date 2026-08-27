import './tokens.css';
import './dc-search-toggle.css';
import { DCIcon, type DCIconName } from './DCIcon';

export interface DCSearchToggleOption {
  /** Value reported to `onChange`. */
  value: string;
  label: string;
  /** Optional leading glyph. */
  icon?: DCIconName;
  /** Small "pre"-wrapped note after the label (the Map segment uses one). */
  subtitle?: string;
}

export interface DCSearchToggleProps {
  /** The two (or more) views being switched between. */
  options: DCSearchToggleOption[];
  /** Currently selected value. */
  value: string;
  onChange?: (value: string) => void;
  /** Accessible name for the group. */
  label?: string;
}

/**
 * The **search toggle** — the pill segmented control that switches the search
 * results between list and map.
 *
 * Ported from `.search-toggle` in donorschoose-web
 * (`components/searchTools/_floatingSearch.scss`): a blue pill with an inset
 * shadow, where the selected segment carries its own white `::before` pill —
 * so it hugs that label's width rather than being a fixed fraction of the
 * control — and the whole thing is hidden below the mobile breakpoint.
 */
export function DCSearchToggle({
  options,
  value,
  onChange,
  label = 'Result view',
}: DCSearchToggleProps) {
  return (
    <div className="dc-search-toggle" role="group" aria-label={label}>
      {options.map((o) => {
        const checked = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            className={['dc-search-toggle__option', checked && 'is-check']
              .filter(Boolean)
              .join(' ')}
            aria-pressed={checked}
            onClick={() => onChange?.(o.value)}
          >
            {o.icon && (
              <DCIcon className="dc-search-toggle__icon" name={o.icon} size={16} />
            )}
            {o.label}
            {o.subtitle && <span className="dc-search-toggle__subtitle">{o.subtitle}</span>}
          </button>
        );
      })}
    </div>
  );
}
