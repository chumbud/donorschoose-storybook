import './tokens.css';
import './dc-project-card.css';
import { DCButton } from './DCButton';
import { DCIcon } from './DCIcon';

export type DCProjectStatus = 'active' | 'almost' | 'funded' | 'friends-family' | 'matched';

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
  /** `horizontal` (default, list row) or `vertical` (small card for grids). */
  layout?: 'horizontal' | 'vertical';
  onGive?: () => void;
}

const usd = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

const BADGE: Partial<Record<DCProjectStatus, string>> = {
  'friends-family': 'Friends & Family',
  matched: '2× Double your impact!',
};

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
  layout = 'horizontal',
  onGive,
}: DCProjectCardProps) {
  const isFunded = status === 'funded' || raised >= goal;
  const pct = Math.min(Math.round((raised / goal) * 100), 100);
  const stillNeeded = Math.max(goal - raised, 0);

  const classes = [
    'dc-project-card',
    layout === 'vertical' && 'dc-project-card--vertical',
    `dc-project-card--${isFunded ? 'funded' : status}`,
  ]
    .filter(Boolean)
    .join(' ');
  const badge = BADGE[status];

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
        {badge && <span className="dc-project-card__badge">{badge}</span>}
        <h3 className="dc-pc-v__title">{title}</h3>
      </div>
      <div className="dc-pc-v__body">
        {description && <p className="dc-pc-v__desc">{description}</p>}
        <div className="dc-project-card__teacher">{teacher}</div>
        <div className="dc-project-card__school">
          {school} • {location}
        </div>
        {isFunded ? (
          <div className="dc-project-card__completed" style={{ margin: '0.75rem 0 0.5rem' }}>
            Fully funded!
          </div>
        ) : (
          <div className="dc-pc-v__need">
            <strong>{usd(stillNeeded)}</strong> {status === 'matched' ? 'for now' : 'still needed'}
          </div>
        )}
        <span className="dc-project-card__progress">
          <span className="dc-project-card__progress-fill" style={{ width: `${pct}%` }} />
        </span>
      </div>
    </article>
  );

  const horizontalCard = (
    <article className={classes}>
      {badge && <span className="dc-project-card__badge">{badge}</span>}

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
            <li className="dc-project-card__completed">Fully funded!</li>
          ) : (
            <>
              <li className="dc-project-card__cost">
                <strong>{usd(stillNeeded)}</strong> {status === 'matched' ? 'for now' : 'still needed'}
              </li>
              {status === 'almost' && <li>Almost there — {pct}% funded</li>}
              {status === 'matched' && (
                <li className="dc-project-card__match-note">Your gift is matched!</li>
              )}
            </>
          )}
          <li>
            {donors} {donors === 1 ? 'donor' : 'donors'} so far
          </li>
        </ul>

        {isFunded ? (
          <DCButton variant="secondary" size="small" fullWidth onClick={onGive}>
            Say thanks
          </DCButton>
        ) : (
          <DCButton size="small" fullWidth onClick={onGive}>
            Give
          </DCButton>
        )}
      </div>
    </article>
  );

  const card = layout === 'vertical' ? verticalCard : horizontalCard;

  if (status === 'matched') {
    return (
      <div className="dc-pc-halo-wrap">
        <span className="dc-pc-halo" aria-hidden="true" />
        {card}
      </div>
    );
  }
  return card;
}
