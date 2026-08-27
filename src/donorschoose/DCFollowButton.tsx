import { useState } from 'react';
import './tokens.css';
import './dc-follow-button.css';

/**
 * Outlined bookmark glyph, unlike the filled `DCIcon` sprite version. Inside
 * `.dc-follow` the fill and stroke are driven by CSS (see `.favorite-link` in
 * donorschoose-web's search.scss); elsewhere it renders as a plain outline.
 */
export function BookmarkOutline({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4.5L5 21V4a1 1 0 0 1 1-1Z" />
    </svg>
  );
}

export interface DCFollowButtonProps {
  /** Controlled followed state. Omit to let the button manage its own. */
  followed?: boolean;
  /** Fires with the next state when the button is pressed. */
  onFollowedChange?: (followed: boolean) => void;
  /** Icon size in px. Defaults to 18. */
  size?: number;
  className?: string;
}

/**
 * The circular **follow** (favourite) button that sits on a project photo — an
 * outlined bookmark that fills in and pops when the project is followed.
 *
 * Ported from `.favorite-link` in donorschoose-web's `search.scss`: grey-stroke
 * hairline, 50px radius, white-filled glyph with a black outline, and a
 * `DCtransition` (all .15s on the default curve) into the $favOrange hover and
 * saved states.
 */
export function DCFollowButton({
  followed,
  onFollowedChange,
  size = 18,
  className,
}: DCFollowButtonProps) {
  const [ownFollowed, setOwnFollowed] = useState(false);
  const isFollowed = followed ?? ownFollowed;

  const toggle = () => {
    const next = !isFollowed;
    if (followed === undefined) setOwnFollowed(next);
    onFollowedChange?.(next);
  };

  return (
    <button
      type="button"
      className={['dc-follow', isFollowed && 'is-followed', className].filter(Boolean).join(' ')}
      aria-pressed={isFollowed}
      aria-label={isFollowed ? 'Unfollow project' : 'Follow project'}
      onClick={toggle}
    >
      <span className="dc-follow__glyph">
        <BookmarkOutline size={size} />
      </span>
    </button>
  );
}
