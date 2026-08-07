import './tokens.css';
import './dc-links.css';
import './dc-map-sidebar.css';
import { DCButton } from './DCButton';
import { DCIcon } from './DCIcon';
import { DCMapProjectCard } from './DCMapProjectCard';
import type { DCMapProjectCardProps } from './DCMapProjectCard';
import { DCMapEssentialsCard } from './DCMapEssentialsCard';
import type { DCMapEssentialsCardProps } from './DCMapEssentialsCard';

export interface DCMapSidebarProps {
  schoolName: string;
  /** Need-level subhead, e.g. "Nearly all students from low-income households". */
  needDescription: string;
  city: string;
  state: string;
  /** Grade range label, e.g. "Grades Pre-K - 6". */
  grades?: string;
  numTeachers?: number;
  /** Show the "Historically Underfunded" equity-focus flair chip. */
  equityFocus?: boolean;
  projects?: DCMapProjectCardProps[];
  essentials?: DCMapEssentialsCardProps[];
  onGive?: () => void;
  onClose?: () => void;
}

/**
 * The **map sidebar** — the school-detail panel that overlays the "Discover
 * local need" map when a school marker is selected. School name + need-level
 * subhead, a chip row, "Give to this school", the "N requests at this school"
 * list of [Map Cards](/?path=/docs/components-cards-map-card--docs), and
 * [Essentials cards](/?path=/docs/components-cards-map-essentials-card--docs).
 *
 * Composed from `RequestList` → `SchoolSublist` → `MapSchoolCard` in
 * donorschoose-web's map-search app.
 */
export function DCMapSidebar({
  schoolName,
  needDescription,
  city,
  state,
  grades,
  numTeachers,
  equityFocus = false,
  projects = [],
  essentials = [],
  onGive,
  onClose,
}: DCMapSidebarProps) {
  const count = projects.length;

  return (
    <div className="dc-map-sidebar">
      <button type="button" className="dc-map-sidebar__close" aria-label="Close" onClick={onClose}>
        <DCIcon name="delete" size={16} />
      </button>

      <div className="dc-map-sidebar__scroll">
        <h3 className="dc-map-sidebar__title">
          <a href="#">{schoolName}</a>
        </h3>
        <div className="dc-map-sidebar__need">{needDescription}</div>

        <ul className="dc-map-sidebar__chips">
          {equityFocus && (
            <li className="dc-map-sidebar__chip dc-map-sidebar__chip--equity">
              Historically Underfunded
            </li>
          )}
          <li className="dc-map-sidebar__chip">
            {city}, {state}
          </li>
          {grades && <li className="dc-map-sidebar__chip">{grades}</li>}
          {numTeachers ? (
            <li className="dc-map-sidebar__chip">
              {numTeachers} {numTeachers === 1 ? 'Teacher' : 'Teachers'}
            </li>
          ) : null}
        </ul>

        <DCButton fullWidth className="dc-map-sidebar__give" onClick={onGive}>
          Give to this school
        </DCButton>
        <div className="dc-map-sidebar__gift-used">
          <span className="dc-subtle-link">How is my gift used?</span>
        </div>

        {count > 0 && (
          <p className="dc-map-sidebar__count">
            {count} request{count > 1 ? 's' : ''} at this school
          </p>
        )}

        <div className="dc-map-sidebar__list">
          {projects.map((p) => (
            <DCMapProjectCard key={p.title} {...p} />
          ))}
          {essentials.map((e) => (
            <DCMapEssentialsCard key={e.name} {...e} />
          ))}
        </div>
      </div>
    </div>
  );
}
