import '../tokens.css';
import '../dc-links.css';
import './dc-support-a-school.css';
import { DCHeader } from '../DCHeader';
import { DCFooter } from '../DCFooter';
import { DCButton } from '../DCButton';
import { DCIcon } from '../DCIcon';
import { DCSchoolCard } from '../DCSchoolCard';
import type { DCSchoolCardProps } from '../DCSchoolCard';
import { DCFullyFundedCard } from '../DCFullyFundedCard';

export interface DCSupportASchoolPageProps {
  /** Location shown in the "Searching near…" line and the "Schools in…" heading. */
  city?: string;
  state?: string;
  /** Nearby schools shown under "Schools in [city]". */
  schools?: DCSchoolCardProps[];
  /** Fully-funded projects for the celebratory section (optional). */
  funded?: {
    school: string;
    projects: { date: string; description: string; raised: number; teacher: string }[];
  };
}

const DEFAULT_SCHOOLS: DCSchoolCardProps[] = [
  {
    schoolName: 'District 2 Pre-K Center at 52 Chambers Street',
    city: 'New York',
    state: 'NY',
    foundingSupporter: true,
  },
  {
    schoolName: 'South Bronx Classical Charter School III',
    city: 'New York',
    state: 'NY',
    numTeachers: 1,
    teachers: [{ name: 'Ms. Rivera' }],
  },
  {
    schoolName: 'District 2 Pre-K Center Reade Street',
    city: 'New York',
    state: 'NY',
    numTeachers: 1,
    teachers: [{ name: 'Ms. Gao' }],
  },
];

/**
 * The **Support a school** landing page (donorschoose.org/supportaschool) — a
 * school-level giving entry point. Hero + school search, a grid of nearby school
 * cards, and a "Fully funded projects" celebration section.
 *
 * Ported from `SchoolLevelGivingLanding.tsx` + `schoolLevelGivingLanding.scss`.
 */
export function DCSupportASchoolPage({
  city = 'New York City',
  state = 'NY',
  schools = DEFAULT_SCHOOLS,
  funded = {
    school: 'La Francis Hardiman Elementary School Annex',
    projects: [
      {
        date: '5/6/2026',
        raised: 997,
        teacher: 'Ms. Hillenbrand',
        description:
          'Ms. Hillenbrand and their classroom received a warm, welcoming music space where their voices can be heard, their basic needs met, and learning can happen with joy.',
      },
      {
        date: '2/11/2026',
        raised: 498,
        teacher: 'Mrs. Hecht',
        description:
          'Mrs. Hecht and their classroom received the tools and opportunity to lead a school-wide kindness initiative using their voices to support, include, and uplift others.',
      },
      {
        date: '5/6/2026',
        raised: 774,
        teacher: 'Ms. Enriquez',
        description:
          'Ms. Enriquez and their classroom received an iPad, clipboards, and creative supplies to support hands-on learning, classroom projects, and special kindergarten memories.',
      },
    ],
  },
}: DCSupportASchoolPageProps) {
  return (
    <div className="dc-sas">
      <DCHeader />

      <main className="dc-sas__main">
        <header className="dc-sas__hero">
          <h1 className="dc-sas__title">
            Support <em>any</em> public school through DonorsChoose
          </h1>
          <p className="dc-sas__subheader">
            Right now, hallways are buzzing with potential. With a little extra support,
            students can reach it.
          </p>

          <div className="dc-sas__location">
            <DCIcon name="location" size={16} />
            Searching near <b>{city}, {state}</b>
            <a className="dc-link" href="#" onClick={(e) => e.preventDefault()}>
              Change location
            </a>
          </div>

          <form className="dc-sas__search" onSubmit={(e) => e.preventDefault()}>
            <label className="dc-sas__search-label" htmlFor="dc-sas-school">
              Find a school to support
            </label>
            <div className="dc-sas__search-row">
              <input
                id="dc-sas-school"
                className="dc-sas__search-input"
                type="search"
                placeholder="Search schools by name"
              />
              <DCButton type="submit" className="dc-sas__search-btn">
                Search
              </DCButton>
            </div>
          </form>
        </header>

        <section className="dc-sas__schools">
          <h3 className="dc-sas__schools-title">
            Schools in{' '}
            <a className="dc-link-discreet" href="#" onClick={(e) => e.preventDefault()}>
              {city}, {state}
            </a>
          </h3>

          <div className="dc-sas__grid">
            {schools.map((s) => (
              <DCSchoolCard key={s.schoolName} {...s} />
            ))}
          </div>

          <div className="dc-sas__more">
            <DCButton variant="secondary">See all nearby schools</DCButton>
          </div>
        </section>

        {funded && funded.projects.length > 0 && (
          <section className="dc-sas__funded">
            <h2 className="dc-sas__funded-title">Fully funded projects at {funded.school}</h2>
            <div className="dc-sas__funded-grid">
              {funded.projects.map((p) => (
                <DCFullyFundedCard key={p.teacher} {...p} />
              ))}
            </div>
            <div className="dc-sas__more">
              <DCButton variant="secondary">See all fully-funded projects</DCButton>
            </div>
          </section>
        )}
      </main>

      <DCFooter trustBanner={false} />
    </div>
  );
}
