import './tokens.css';
import './dc-school-card.css';
import { DCIcon } from './DCIcon';

export interface DCSchoolTeacher {
  /** Teacher display name (used for the photo alt text). */
  name: string;
  /** Profile-photo URL. Falls back to a neutral placeholder circle. */
  avatarUrl?: string;
}

export interface DCSchoolCardProps {
  /** School name, e.g. "District 2 Pre-K Center at 52 Chambers Street". */
  schoolName: string;
  /** City, e.g. "New York". */
  city: string;
  /** Two-letter state code, e.g. "NY". */
  state: string;
  /** School page URL. */
  href?: string;
  /**
   * Teachers on DonorsChoose at this school. When empty (and `foundingSupporter`
   * is set) the card shows the "Become a Founding Supporter" state instead.
   */
  teachers?: DCSchoolTeacher[];
  /**
   * Total teachers who use DonorsChoose (drives the "N teacher(s) use…" line).
   * Defaults to `teachers.length`.
   */
  numTeachers?: number;
  /** Show the "Become a Founding Supporter" copy (no active teachers). */
  foundingSupporter?: boolean;
}

/**
 * A **school card** from the "Support a school" page — a school name, a location
 * pill, and either a row of teacher photos ("N teachers use DonorsChoose") or a
 * "Become a Founding Supporter" prompt when no teacher is active yet.
 *
 * Ported from `SchoolCard.tsx` + `_schoolCard.scss` in donorschoose-web.
 */
export function DCSchoolCard({
  schoolName,
  city,
  state,
  href = '#',
  teachers = [],
  numTeachers,
  foundingSupporter = false,
}: DCSchoolCardProps) {
  const count = numTeachers ?? teachers.length;
  const hasTeachers = teachers.length > 0 && !foundingSupporter;

  return (
    <div className="dc-school-card">
      <a href={href} className="dc-school-card__link">
        <div className="dc-school-card__location">
          <span className="dc-school-card__pill">
            <DCIcon name="location" size={14} />
            {city}, {state}
          </span>
        </div>

        <h3 className="dc-school-card__name">{schoolName}</h3>

        {hasTeachers ? (
          <div className="dc-school-card__teachers">
            <div className="dc-school-card__pfps">
              {teachers.slice(0, 4).map((t, i) => (
                <span
                  key={i}
                  className="dc-school-card__pfp"
                  style={t.avatarUrl ? { backgroundImage: `url("${t.avatarUrl}")` } : undefined}
                  role="img"
                  aria-label={t.name}
                />
              ))}
            </div>
            <div className="dc-school-card__uses">
              {count === 1 ? '1 teacher uses DonorsChoose' : `${count} teachers use DonorsChoose`}
            </div>
          </div>
        ) : (
          <div className="dc-school-card__founding">
            <p className="dc-school-card__founding-copy">
              <b>Become a Founding Supporter</b>
              <br />
              Proactively keep teachers stocked with supplies!
            </p>
          </div>
        )}
      </a>
    </div>
  );
}
