import { useState } from 'react';
import '../tokens.css';
import './dc-discover-local-need.css';
import { DCHeader } from '../DCHeader';
import { DCButton } from '../DCButton';
import { DCIcon } from '../DCIcon';
import { DCMap, DCSchoolMarker, DCMapNeedLegend } from '../DCMap';
import type { DCMapNeed } from '../DCMap';
import { DCMapSidebar } from '../DCMapSidebar';
import type { DCMapSidebarProps } from '../DCMapSidebar';

const IMG = '/images/essentials';

/** Need-level → subhead copy (mirrors getNeedDescription in the map-search app). */
const NEED_COPY: Record<DCMapNeed, string> = {
  fourth: 'Nearly all students from low-income households',
  third: 'At least three-quarters of students from low-income households',
  second: 'At least a third of students from low-income households',
  first: 'Under a quarter of students from low-income households',
};

interface MapSchool extends Omit<DCMapSidebarProps, 'needDescription'> {
  id: number;
  x: number;
  y: number;
  need: DCMapNeed;
  markerCount?: number;
}

const SCHOOLS: MapSchool[] = [
  {
    id: 1,
    x: 24,
    y: 30,
    need: 'fourth',
    markerCount: 3,
    schoolName: 'PS 1 Alfred E Smith',
    city: 'New York',
    state: 'NY',
    grades: 'Grades Pre-K - 6',
    numTeachers: 33,
    equityFocus: true,
    projects: [
      {
        title: 'Building a Space Made for Science',
        description:
          'Help me give my students a collaborative learning environment where they can work together as scientists.',
        teacher: 'Mrs. Shaolin',
        pct: 32,
        stillNeeded: 670,
      },
    ],
    essentials: [
      { name: 'Tissues', teacher: 'Ms. Bri', price: 18, imageUrl: `${IMG}/tissues.jpg` },
      { name: 'Crackers', teacher: 'Mrs. Shaolin', price: 24, imageUrl: `${IMG}/crackers.jpg` },
    ],
  },
  {
    id: 2,
    x: 52,
    y: 22,
    need: 'third',
    markerCount: 11,
    schoolName: 'PS 234 Independence School',
    city: 'New York',
    state: 'NY',
    grades: 'Grades K - 5',
    numTeachers: 18,
    projects: [
      {
        title: 'Cozy Corner for Big Feelings',
        description: 'A calm-down nook with cushions and books to help my students self-regulate.',
        teacher: 'Mr. Ellis',
        pct: 71,
        stillNeeded: 128,
      },
    ],
    essentials: [{ name: 'Markers (dry-erase)', teacher: 'Mr. Ellis', price: 14, imageUrl: `${IMG}/markers-dryerase.jpg` }],
  },
  {
    id: 3,
    x: 70,
    y: 44,
    need: 'fourth',
    markerCount: 6,
    schoolName: 'PS 42 Benjamin Altman',
    city: 'New York',
    state: 'NY',
    grades: 'Grades Pre-K - 5',
    numTeachers: 27,
    equityFocus: true,
    projects: [
      {
        title: 'Books That Look Like Us',
        description: 'A diverse classroom library so every student sees themselves in a story.',
        teacher: 'Ms. Nguyen',
        pct: 48,
        stillNeeded: 312,
      },
    ],
    essentials: [{ name: 'Pens', teacher: 'Ms. Nguyen', price: 10, imageUrl: `${IMG}/pens-felttip.jpg` }],
  },
  { id: 4, x: 38, y: 58, need: 'second', markerCount: 2, schoolName: 'PS 130 Hernando De Soto', city: 'New York', state: 'NY', grades: 'Grades K - 5', numTeachers: 9, projects: [], essentials: [] },
  { id: 5, x: 60, y: 66, need: 'third', markerCount: 5, schoolName: 'PS 124 Yung Wing', city: 'New York', state: 'NY', grades: 'Grades Pre-K - 5', numTeachers: 15, projects: [], essentials: [] },
  { id: 6, x: 30, y: 74, need: 'first', schoolName: 'PS 89', city: 'New York', state: 'NY', grades: 'Grades K - 5', numTeachers: 6, projects: [], essentials: [] },
  { id: 7, x: 82, y: 30, need: 'second', markerCount: 1, schoolName: 'PS 110 Florence Nightingale', city: 'New York', state: 'NY', grades: 'Grades Pre-K - 5', numTeachers: 11, projects: [], essentials: [] },
];

export interface DCDiscoverLocalNeedPageProps {
  /** Location shown in the search bar. */
  location?: string;
}

/**
 * The **Discover local need** map page (donorschoose.org/donors/map.html) — a
 * full-bleed map of nearby schools colored by need level, a location search, the
 * need-level legend, and the school-detail [Map Sidebar](/?path=/story/components-map-sidebar--default)
 * that opens when you select a school. Click the markers to switch schools.
 */
export function DCDiscoverLocalNeedPage({ location = 'Lower Manhattan, NY' }: DCDiscoverLocalNeedPageProps) {
  const [selectedId, setSelectedId] = useState<number | null>(1);
  const selected = SCHOOLS.find((s) => s.id === selectedId) ?? null;

  return (
    <div className="dc-dln">
      <DCHeader />

      <div className="dc-dln__stage">
        {/* Left: school-detail sidebar */}
        {selected && (
          <aside className="dc-dln__panel">
            <DCMapSidebar
              key={selected.id}
              schoolName={selected.schoolName}
              needDescription={NEED_COPY[selected.need]}
              city={selected.city}
              state={selected.state}
              grades={selected.grades}
              numTeachers={selected.numTeachers}
              equityFocus={selected.equityFocus}
              projects={selected.projects}
              essentials={selected.essentials}
              onClose={() => setSelectedId(null)}
            />
          </aside>
        )}

        {/* Right: the map */}
        <div className="dc-dln__mapwrap">
          <div className="dc-dln__searchbar">
            <span className="dc-dln__search-field">
              <DCIcon name="location" size={16} />
              <input
                className="dc-dln__search-input"
                type="search"
                defaultValue={location}
                aria-label="Search near a location"
              />
            </span>
            <DCButton size="small">Search</DCButton>
          </div>

          <DCMapNeedLegend className="dc-dln__legend" />

          <DCMap height={640} className="dc-dln__map">
            {SCHOOLS.map((s) => (
              <DCSchoolMarker
                key={s.id}
                x={s.x}
                y={s.y}
                need={s.need}
                count={s.markerCount}
                active={s.id === selectedId}
                title={s.schoolName}
                onClick={() => setSelectedId(s.id)}
              />
            ))}
          </DCMap>
        </div>
      </div>
    </div>
  );
}
