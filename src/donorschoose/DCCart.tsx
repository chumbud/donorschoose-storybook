import { useEffect, useId, useRef, useState, type MouseEvent, type ReactNode } from 'react';
import './tokens.css';
import './dc-cart.css';
import { DCIcon } from './DCIcon';
import { usdHideZeroCents } from './money';

export interface DCCartProps {
  /** Number of classrooms/items in the cart — the badge count (`data-value`). */
  items: number;
  /** Cart total in dollars. Drives the message ("$45 for 2 classrooms"). */
  total: number;
  /**
   * When the whole cart is one teacher's classroom, the message names them
   * instead of counting: "$45 for Ms. Ramirez's classroom". Mirrors
   * `teacherScreenName` in the mini-cart payload.
   */
  teacherScreenName?: string;
  /** Override the composed message entirely. */
  message?: ReactNode;
  /**
   * Push the message open without a hover — the site's
   * `.mini-cart.show-message`, used for a few seconds right after an add so the
   * donor sees where their donation went.
   */
  showMessage?: boolean;
  /**
   * Hide the cart when it's empty, like the real header (`.mini-cart` only gets
   * `display: inline-block` once it's `.enabled`). Defaults to `true`.
   */
  hideWhenEmpty?: boolean;
  /** Show the divider that separates the cart from the account links. */
  divider?: boolean;
  /** Inert cart, for the checkout page (`.mini-cart.checkout`). */
  checkout?: boolean;
  /** Cart link. Defaults to the giving-cart URL's placeholder, `#`. */
  href?: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
}

/** How the message reads — the copy from `updateMiniCartDisplay`. */
function cartMessage(items: number, total: number, teacherScreenName?: string) {
  const formattedTotal = usdHideZeroCents(total);
  return teacherScreenName
    ? `${formattedTotal} for ${teacherScreenName}'s classroom`
    : `${formattedTotal} for ${items} classroom${items === 1 ? '' : 's'}`;
}

/**
 * The DonorsChoose **mini-cart** — the cart icon in the global nav with a count
 * badge and a message bubble summarizing what's inside.
 *
 * Ported from `genHeader.tag`'s `.cart-group` / `.mini-cart` / `.cart-message`,
 * with the count, total, and message copy from `miniCartFunctions.ts`. Because a
 * donor can stack several classrooms in one cart, the message pluralizes
 * ("$120 for 3 classrooms") unless every item belongs to one teacher.
 *
 * The bubble shows on hover and keyboard focus. `showMessage` pushes it open on
 * its own — which is what the project page does after an add-to-cart, so the
 * donor's eye gets pulled to the cart once the confirmation clears.
 */
export function DCCart({
  items,
  total,
  teacherScreenName,
  message,
  showMessage = false,
  hideWhenEmpty = true,
  divider = false,
  checkout = false,
  href = '#',
  onClick,
}: DCCartProps) {
  const id = useId();
  const enabled = items > 0;

  // Bump the badge whenever the count changes (but not on first render).
  const [popping, setPopping] = useState(false);
  const previousItems = useRef(items);
  useEffect(() => {
    if (previousItems.current === items) return;
    previousItems.current = items;
    if (items <= 0) return;
    setPopping(true);
    const timer = window.setTimeout(() => setPopping(false), 450);
    return () => window.clearTimeout(timer);
  }, [items]);

  if (!enabled && hideWhenEmpty) return null;

  const text = cartMessage(items, total, teacherScreenName);
  const classes = [
    'dc-cart',
    enabled && 'dc-cart--enabled',
    showMessage && 'dc-cart--show-message',
    divider && 'dc-cart--divider',
    checkout && 'dc-cart--checkout',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes}>
      <a
        className="dc-cart__link"
        href={href}
        onClick={onClick}
        data-value={items}
        /* The count and total live in the accessible name — the badge is
         * decorative and the bubble is `visibility: hidden` until hovered. */
        aria-label={enabled ? `Checkout donation — ${text}` : 'Checkout donation — cart is empty'}
        aria-describedby={enabled ? id : undefined}
      >
        <DCIcon name="cart" size={36} className="dc-cart__icon" />
        {enabled && (
          <span
            className={['dc-cart__badge', popping && 'dc-cart__badge--pop'].filter(Boolean).join(' ')}
            aria-hidden="true"
          >
            {items > 99 ? '99+' : items}
          </span>
        )}
      </a>
      <span className="dc-cart__message" role="tooltip" id={id}>
        {message ?? text}
      </span>
    </span>
  );
}
