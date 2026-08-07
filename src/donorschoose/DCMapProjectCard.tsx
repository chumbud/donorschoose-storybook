import './tokens.css';
import './dc-map-project-card.css';
import { DCIcon } from './DCIcon';
import { usd } from './money';

export interface DCMapProjectCardProps {
  /** Project title, e.g. "Building a Space Made for Science". */
  title: string;
  /** "Help me give my students…" short blurb. */
  description: string;
  /** Teacher name, e.g. "Mrs. Shaolin". */
  teacher: string;
  /** Percent funded, 0–100. */
  pct: number;
  /** Dollars still needed. */
  stillNeeded: number;
  /** Project page URL. */
  href?: string;
  onFollow?: () => void;
}

/**
 * The **map card** — a classroom project as it appears in the "Discover local
 * need" map sidebar: a bordered tile with the project title, a "My students
 * need…" blurb, the teacher, a follow bookmark, and a progress bar with the
 * "$X still needed!" call to action.
 *
 * Ported from `MapProjectCard.js` + `.map-project-card` in map.scss.
 */
export function DCMapProjectCard({
  title,
  description,
  teacher,
  pct,
  stillNeeded,
  href = '#',
  onFollow,
}: DCMapProjectCardProps) {
  return (
    <a className="dc-map-project-card" href={href}>
      <div className="dc-map-project-card__body">
        <h3 className="dc-map-project-card__title">{title}</h3>
        <p className="dc-map-project-card__desc">{description}</p>
        <div className="dc-map-project-card__teacher">{teacher}</div>
      </div>

      <div className="dc-map-project-card__aside">
        <button
          type="button"
          className="dc-map-project-card__bookmark"
          aria-label="Follow project"
          onClick={(e) => {
            e.preventDefault();
            onFollow?.();
          }}
        >
          <DCIcon name="bookmark" size={18} />
        </button>

        <div className="dc-map-project-card__give">
          <span className="dc-map-project-card__progress">
            <span
              className="dc-map-project-card__progress-fill"
              style={{ width: `${Math.min(Math.max(pct, 0), 100)}%` }}
            />
          </span>
          <div className="dc-map-project-card__cost">
            <strong>{usd(stillNeeded)}</strong> still needed!
          </div>
        </div>
      </div>
    </a>
  );
}
