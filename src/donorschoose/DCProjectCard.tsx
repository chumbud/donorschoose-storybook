import './tokens.css';
import './dc-project-card.css';
import { usd } from './money';
import { DCButton } from './DCButton';
import { DCInput } from './DCInput';
import { DCIcon } from './DCIcon';
import matchStarUrl from './assets/match-offer-star.svg';

export type DCProjectStatus = 'active' | 'almost' | 'funded' | 'matched';

export interface DCProjectCardProps {
  title: string;
  teacher: string;
  school: string;
  location: string;
  /** Short "My students need…" blurb (rendered in curly quotes). */
  description?: string;
  /** Classroom photo URL. */
  imageUrl?: string;
  goal: number;
  raised: number;
  donors: number;
  /** Project state. Defaults to `active`. */
  status?: DCProjectStatus;
  /**
   * Name of the match funder, shown as "Thanks to {matchSponsor}." beside the
   * "Double your impact!" callout. Only rendered when `status` is `matched`.
   */
  matchSponsor?: string;
  /** `horizontal` (default, list row) or `vertical` (small card for grids). */
  layout?: 'horizontal' | 'vertical';
  /** Show the shimmering skeleton placeholder instead of content. */
  loading?: boolean;
  /**
   * Show an inline "give box" — an amount input to the left of the Give button.
   * Toggled off by default (the card shows just the Give button).
   */
  giveBox?: boolean;
  onGive?: () => void;
}

/** Shimmering skeleton shown while a card's data loads (both layouts). */
function ProjectCardSkeleton({ layout }: { layout: 'horizontal' | 'vertical' }) {
  if (layout === 'vertical') {
    return (
      <article
        className="dc-project-card dc-project-card--vertical dc-project-card--loading"
        aria-busy="true"
      >
        <div className="dc-skeleton" style={{ height: 200, borderRadius: 0 }} />
        <div className="dc-pc-v__body">
          <div className="dc-skeleton dc-pc-sk__line" style={{ width: '95%', height: 14 }} />
          <div className="dc-skeleton dc-pc-sk__line" style={{ width: '80%', height: 14, marginTop: 8 }} />
          <div className="dc-skeleton dc-pc-sk__line" style={{ width: '50%', marginTop: 18 }} />
          <div className="dc-skeleton dc-pc-sk__line" style={{ width: '65%', marginTop: 8 }} />
          <div className="dc-skeleton" style={{ height: 8, marginTop: 18 }} />
        </div>
      </article>
    );
  }
  return (
    <article className="dc-project-card dc-project-card--loading" aria-busy="true">
      <div className="dc-project-card__photo dc-skeleton" />
      <div className="dc-project-card__main">
        <div className="dc-skeleton dc-pc-sk__line" style={{ width: '80%', height: 18 }} />
        <div className="dc-skeleton dc-pc-sk__line" style={{ width: '95%', marginTop: 12 }} />
        <div className="dc-skeleton dc-pc-sk__line" style={{ width: '60%', marginTop: 8 }} />
        <div className="dc-skeleton dc-pc-sk__line" style={{ width: '45%', marginTop: 22 }} />
      </div>
      <div className="dc-project-card__funding">
        <div className="dc-skeleton" style={{ height: 9, margin: '0.5rem 0' }} />
        <div className="dc-skeleton dc-pc-sk__line" style={{ width: '70%', height: 16, marginTop: 14 }} />
        <div className="dc-skeleton dc-pc-sk__line" style={{ width: '50%', marginTop: 8 }} />
        <div
          className="dc-skeleton"
          style={{ height: 40, marginTop: 18, borderRadius: 'var(--dc-radius-button)' }}
        />
      </div>
    </article>
  );
}

/**
 * Match-offer seal — the `match-offer-star.svg` purple star with the multiplier
 * overlaid (mirrors `.match-offer-badge` in _projectCard.scss).
 */
function MatchSeal({ label = '2X' }: { label?: string }) {
  return (
    <span className="dc-pc-match__seal" aria-hidden="true">
      <img className="dc-pc-match__star" src={matchStarUrl} alt="" />
      <span className="dc-pc-match__x">{label}</span>
    </span>
  );
}

export function DCProjectCard({
  title,
  teacher,
  school,
  location,
  description,
  imageUrl,
  goal,
  raised,
  donors,
  status = 'active',
  matchSponsor,
  layout = 'horizontal',
  loading = false,
  giveBox = false,
  onGive,
}: DCProjectCardProps) {
  if (loading) return <ProjectCardSkeleton layout={layout} />;

  const isFunded = status === 'funded' || raised >= goal;
  const isMatched = status === 'matched';
  const pct = Math.min(Math.round((raised / goal) * 100), 100);
  const stillNeeded = Math.max(goal - raised, 0);
  const donorWord = donors === 1 ? 'donor' : 'donors';

  const classes = [
    'dc-project-card',
    layout === 'vertical' && 'dc-project-card--vertical',
    `dc-project-card--${isFunded ? 'funded' : status}`,
  ]
    .filter(Boolean)
    .join(' ');

  const verticalCard = (
    <article className={classes}>
      <div
        className="dc-pc-v__photo"
        style={imageUrl ? { backgroundImage: `url("${imageUrl}")` } : undefined}
        role="img"
        aria-label={`${title} classroom`}
      >
        <button type="button" className="dc-pc-v__bookmark" aria-label="Follow project">
          <DCIcon name="bookmark" size={16} />
        </button>
        <h3 className="dc-pc-v__title">{title}</h3>
      </div>
      <div className="dc-pc-v__body">
        {description && <p className="dc-pc-v__desc">{description}</p>}
        <div className="dc-project-card__teacher">{teacher}</div>
        <div className="dc-project-card__school">
          {school} • {location}
        </div>
        {isFunded ? (
          <>
            <div className="dc-project-card__completed" style={{ margin: '0.75rem 0 0.5rem' }}>
              Fully funded!
            </div>
            <span className="dc-project-card__progress">
              <span className="dc-project-card__progress-fill" style={{ width: `${pct}%` }} />
            </span>
          </>
        ) : isMatched ? (
          /* Matched: progress on top, then the donor count, then the amount —
             mirrors the funding column of the matched horizontal card. */
          <>
            <span className="dc-project-card__progress">
              <span className="dc-project-card__progress-fill" style={{ width: `${pct}%` }} />
            </span>
            <div className="dc-pc-v__donors">
              <strong>{donors}</strong> {donorWord} so far
            </div>
            <div className="dc-pc-v__need">
              <strong>{usd(stillNeeded)}</strong> for now
            </div>
          </>
        ) : (
          <>
            <div className="dc-pc-v__need">
              <strong>{usd(stillNeeded)}</strong> still needed
            </div>
            <span className="dc-project-card__progress">
              <span className="dc-project-card__progress-fill" style={{ width: `${pct}%` }} />
            </span>
          </>
        )}
      </div>
    </article>
  );

  const horizontalCard = (
    <article className={classes}>
      <div
        className="dc-project-card__photo"
        style={imageUrl ? { backgroundImage: `url("${imageUrl}")` } : undefined}
        role="img"
        aria-label={`${title} classroom`}
      />

      <div className="dc-project-card__main">
        <h3 className="dc-project-card__title">{title}</h3>
        {description && <p className="dc-project-card__desc">{description}</p>}
        <p className="dc-project-card__intro">
          <span className="dc-project-card__teacher">{teacher}</span>
          <br />
          <span className="dc-project-card__school">
            {school}
            <span className="dc-project-card__school-sep">•</span>
            {location}
          </span>
        </p>
      </div>

      <div className="dc-project-card__funding">
        <span className="dc-project-card__progress">
          <span className="dc-project-card__progress-fill" style={{ width: `${pct}%` }} />
        </span>

        <ul className="dc-project-card__data">
          {isFunded ? (
            <>
              <li className="dc-project-card__completed">Fully funded!</li>
              <li>
                {donors} {donorWord} so far
              </li>
            </>
          ) : isMatched ? (
            /* Matched cards lead with the donor count, then the amount still
               needed — both set larger, since the match callout above already
               says the gift is doubled. */
            <>
              <li className="dc-project-card__donors">
                <strong>{donors}</strong> {donorWord} so far
              </li>
              <li className="dc-project-card__cost">
                <strong>{usd(stillNeeded)}</strong> for now
              </li>
            </>
          ) : (
            <>
              <li className="dc-project-card__cost">
                <strong>{usd(stillNeeded)}</strong> still needed
              </li>
              {status === 'almost' && <li>Almost there — {pct}% funded</li>}
              <li>
                {donors} {donorWord} so far
              </li>
            </>
          )}
        </ul>

        {!isFunded && giveBox && (
          <div className="dc-project-card__give-row">
            <DCInput
              type="text"
              inputMode="numeric"
              aria-label="Donation amount"
              placeholder="$25"
              className="dc-project-card__give-input"
            />
            <DCButton variant="secondary" size="small" onClick={onGive}>
              Give
            </DCButton>
          </div>
        )}
      </div>
    </article>
  );

  const card = layout === 'vertical' ? verticalCard : horizontalCard;

  // Matched projects get the colorful match frame *surrounding* the whole card,
  // with the "Double your impact!" callout sitting above it (outside the card).
  // Ported from `.matched` (conic-gradient ::after + .match-offer-section) in
  // _projectCard.scss.
  if (isMatched) {
    return (
      <div className={['dc-pc-matched', layout === 'vertical' && 'dc-pc-matched--vertical'].filter(Boolean).join(' ')}>
        <div className="dc-pc-matched__callout">
          <MatchSeal />
          <span className="dc-pc-matched__lines">
            <span className="dc-pc-matched__text">Double your impact!</span>
            {matchSponsor && (
              <span className="dc-pc-matched__sponsor">Thanks to {matchSponsor}.</span>
            )}
          </span>
        </div>
        {card}
      </div>
    );
  }

  return card;
}
