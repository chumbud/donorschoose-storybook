import './tokens.css';
import './dc-fully-funded-card.css';
import ribbonUrl from './assets/ribbon.svg';
import { usd } from './money';

export interface DCFullyFundedCardProps {
  /** Date the project was fully funded (e.g. "5/6/2026"). */
  date: string;
  /** "Ms. Hillenbrand and their classroom received…" impact blurb. */
  description: string;
  /** Total dollars raised, e.g. 997. */
  raised: number;
  /** Teacher credited, e.g. "Ms. Hillenbrand". */
  teacher: string;
  /** Project page URL. */
  href?: string;
}

/**
 * A **fully-funded project card** — the celebratory tile shown under "Fully
 * funded projects at [school]". A green "FULLY FUNDED!" pill, the funding date,
 * an impact blurb, a "$X raised by [teacher]" line, a full green progress bar,
 * and the blue rosette in the corner.
 *
 * Ported from the `altViewForFullyFundedProjects` branch of `SmallProjectCard.js`
 * + `.completed-projects .fully-funded` in `schoolStatPage.scss`.
 */
export function DCFullyFundedCard({
  date,
  description,
  raised,
  teacher,
  href = '#',
}: DCFullyFundedCardProps) {
  return (
    <a className="dc-ff-card" href={href}>
      <img className="dc-ff-card__rosette" src={ribbonUrl} alt="" aria-hidden="true" />

      <div className="dc-ff-card__foreground">
        <span className="dc-ff-card__pill">Fully Funded!</span>
        <div className="dc-ff-card__date">{date}</div>
        <p className="dc-ff-card__desc">{description}</p>
        <div className="dc-ff-card__byline">
          <strong>{usd(raised)}</strong> raised by {teacher}
        </div>
        <div className="dc-ff-card__bar" />
      </div>
    </a>
  );
}
