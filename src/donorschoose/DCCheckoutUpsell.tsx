import { useEffect, useRef, useState } from 'react';
import './tokens.css';
import './dc-checkout-upsell.css';
import sparklesUrl from './assets/excite-item-marks.svg';

export interface DCCheckoutUpsellProps {
  /** What's being added on. `essentials` = a supply a teacher still needs. */
  kind?: 'essentials' | 'fund';
  /** Card heading. Defaults per `kind`. */
  title?: string;
  /** Teacher (essentials) or fund owner name — emphasized in the line. */
  teacher?: string;
  /** City, State. */
  location?: string;
  /** The item still needed, e.g. "markers". */
  item?: string;
  /** Add-on amount in dollars. */
  amount: number;
  /** Product / fund image URL. */
  imageUrl?: string;
  onAdd?: (amount: number) => void;
}

/**
 * Checkout **add-on upsell** — invites a donor to add a classroom-essentials
 * item (or a fund) to their gift. Uses the DonorsChoose purple, the essentials
 * "excite" sparkle marks, and a real supply photo.
 */
export function DCCheckoutUpsell({
  kind = 'essentials',
  title,
  teacher = 'Ms. Kristen',
  location = 'New York City, NY',
  item = 'markers',
  amount,
  imageUrl,
  onAdd,
}: DCCheckoutUpsellProps) {
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const heading = title ?? (kind === 'fund' ? 'Add on to a fund you love' : 'Add on basics for a teacher');

  const handleAdd = () => {
    onAdd?.(amount);
    setAdded(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 1800);
  };

  return (
    <section className="dc-addon" aria-label={heading}>
      <div className="dc-addon__body">
        <h3 className="dc-addon__title">{heading}</h3>
        <p className="dc-addon__line">
          <span className="dc-addon__teacher">{teacher}</span> in {location} needs {item}
        </p>
        <button type="button" className="dc-addon__cta" onClick={handleAdd} aria-pressed={added}>
          {added ? '✓ Added!' : `Add on for $${amount}`}
        </button>
      </div>

      <div className="dc-addon__media">
        <img className="dc-addon__sparkles" src={sparklesUrl} alt="" aria-hidden="true" />
        {imageUrl && <img className="dc-addon__photo" src={imageUrl} alt={item} />}
      </div>
    </section>
  );
}
