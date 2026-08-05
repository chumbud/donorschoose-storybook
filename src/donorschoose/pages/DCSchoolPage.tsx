import type { CSSProperties, ReactNode } from 'react';
import '../tokens.css';
import './dc-page.css';
import './dc-school-page.css';
import { DCHeader } from '../DCHeader';
import { DCFooter } from '../DCFooter';
import { DCButton } from '../DCButton';
import { DCProjectCard } from '../DCProjectCard';
import { DCHeading, DCText } from '../DCText';
import { DCAvatar } from '../DCAvatar';
import { DCIcon } from '../DCIcon';
import { DCShareTools } from '../DCShareTools';
import { projects } from '../mockProjects';
import { classroomPhoto } from '../placeholderPhotos';

const SCHOOL = 'Stuyvesant High School';
const LOCATION = 'New York, NY';

const TEACHERS = [
  'Ms. Arleen', 'Mr. Blay', 'Ms. Cruz', 'Mr. Citron', 'Ms. Crystal',
  'Teacher DiCatentina', 'Ms. Fang', 'Mr. Feola', 'Ms. G.', 'Ms. Guthrie',
  'Dr. Hornstein', 'Ms. Hax', 'Mr. Ling',
];

/* Donut chart via conic-gradient — percent fill over a track color. */
function Donut({
  percent,
  color = 'var(--dc-yellow)',
  track = 'var(--dc-subtle-stroke)',
  value,
  label,
}: {
  percent: number;
  color?: string;
  track?: string;
  value: ReactNode;
  label: ReactNode;
}) {
  const style = {
    background: `conic-gradient(${color} 0 ${percent}%, ${track} ${percent}% 100%)`,
  } as CSSProperties;
  return (
    <div>
      <div className="dc-donut" style={style} role="img" aria-label={`${percent}%`}>
        <div className="dc-donut__hole">
          <b>{value}</b>
          <span>{label}</span>
        </div>
      </div>
    </div>
  );
}

const RACE = [
  ['Asian', 66],
  ['White', 18],
  ['Hispanic / Latino', 8],
  ['Black', 4],
  ['Two or more races', 4],
];

const STAT_TILES: [string, string][] = [
  ['267', 'Projects funded'],
  ['45', 'Teachers who posted'],
  ['571', 'Supporters'],
  ['26', 'Projects this year'],
];

/**
 * School profile page — follows the DonorsChoose school page layout: centered
 * hero, about + info sidebar, teacher thank-you notes, current & funded
 * projects, an empower banner, the teacher roster, share tools, demographics
 * charts, a support/impact summary, and the trust band.
 */
export function DCSchoolPage() {
  const funded = projects.filter((p) => p.status === 'funded').concat(projects).slice(0, 3);

  return (
    <div className="dc-page">
      <DCHeader />

      {/* Hero */}
      <div className="dc-page__hero">
        <div className="dc-sch-hero">
          <div className="dc-sch-hero__eyebrow">
            <a href="#">New York</a> › <a href="#">New York City Dept Of Ed</a>
          </div>
          <h1 className="dc-sch-hero__title">{SCHOOL}</h1>
          <div className="dc-sch-hero__avatars">
            {[1, 2, 3, 4, 5].map((n) => (
              <DCAvatar key={n} name={TEACHERS[n]} placeholder={`teacher-${n}`} size={44} />
            ))}
          </div>
          <div className="dc-sch-hero__join">Join teachers supporting this school</div>
          <div className="dc-sch-hero__cta">
            <DCButton size="large">Give to this school</DCButton>
            <a className="dc-sch-hero__link" href="#">
              Teachers, get funded
            </a>
          </div>
        </div>
      </div>

      {/* About + info sidebar */}
      <div className="dc-page__container dc-sch-about">
        <div className="dc-page__two-col">
          <div>
            <DCHeading level={2}>About this school</DCHeading>
            <DCText>
              {SCHOOL} is an exam public school in New York, New York that is part of the New York
              City Dept Of Ed. It serves 3,299 students in grades 9–12 with a student-teacher ratio
              of 21.5:1. So far, teachers here have posted 297 projects to DonorsChoose.
            </DCText>
            <p className="dc-sch-note" style={{ marginTop: '1rem' }}>
              <a className="dc-sch-note" href="#">
                Supporting this school is directly linked to historically underfunded classrooms.
              </a>
            </p>
          </div>
          <aside className="dc-sch-panel">
            <DCButton
              variant="secondary"
              fullWidth
              icon={<DCIcon name="heart" size={16} />}
              style={{ background: 'var(--dc-white)' }}
            >
              Follow school
            </DCButton>
            <div style={{ marginTop: '1rem' }}>
              {[
                ['bank', 'Public school'],
                ['books', 'Grades 9–12'],
                ['users', '3,299 students'],
                ['flag', '297 projects'],
                ['location', '345 Chambers St, New York, NY 10282'],
                ['phone', '(212) 312-4800'],
              ].map(([icon, text]) => (
                <div className="dc-sch-info__row" key={text}>
                  <DCIcon name={icon} size={16} />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>

      {/* Teacher thank-you notes */}
      <section className="dc-sch-notes">
        <div className="dc-sch-notes__inner">
          <div className="dc-sch-notes__heading">Notes of thanks from the teachers of {SCHOOL}</div>
          <div className="dc-sch-note-card">
            <p className="dc-sch-note-card__quote">
              “Thank you again for making this project a reality. Because of your generosity, my
              students are charging up their learning with the tools they need to explore, build, and
              create together. We are endlessly grateful.”
            </p>
            <div className="dc-sch-note-card__by">
              <DCAvatar name="Ms. Perez" placeholder="teacher-6" size={40} />
              <div>
                <b>Ms. Perez</b>
                <span> · Charging Up Learning</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Current / funded projects */}
      <div className="dc-page__container">
        <DCHeading level={2} className="dc-sch-section-title">
          Give students at {SCHOOL} what they need most right now
        </DCHeading>
        <div className="dc-page__grid">
          {projects.slice(0, 3).map((p) => (
            <DCProjectCard key={p.title} {...p} school={SCHOOL} location={LOCATION} />
          ))}
        </div>

        {/* Empower banner */}
        <div className="dc-sch-empower">
          <div className="dc-sch-empower__body">
            <h2>Empower teachers at {SCHOOL} to request what their students need.</h2>
            <DCButton
              variant="secondary"
              style={{
                background: 'var(--dc-white)',
                color: 'var(--dc-blue-link)',
                borderColor: 'var(--dc-white)',
              }}
            >
              Give to this school
            </DCButton>
          </div>
          <div
            className="dc-sch-empower__media"
            role="img"
            aria-label="Students in a classroom"
            style={{ backgroundImage: `url("${classroomPhoto('school-empower')}")` }}
          />
        </div>

        <DCHeading level={2} className="dc-sch-section-title">
          Fully funded projects at {SCHOOL}
        </DCHeading>
        <div className="dc-page__grid">
          {funded.map((p, i) => (
            <DCProjectCard
              key={`${p.title}-${i}`}
              {...p}
              status="funded"
              raised={p.goal}
              school={SCHOOL}
              location={LOCATION}
            />
          ))}
        </div>

        {/* Teachers on DonorsChoose */}
        <DCHeading level={2} className="dc-sch-section-title">
          {SCHOOL} teachers on DonorsChoose
        </DCHeading>
        <div className="dc-sch-teachers">
          {TEACHERS.map((name, i) => (
            <div className="dc-sch-teacher" key={name}>
              <DCAvatar name={name} placeholder={`teacher-${(i % 10) + 1}`} size={72} />
              <span>{name}</span>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center' }}>
          <a className="dc-sch-hero__link" href="#">
            See more teachers from {SCHOOL} →
          </a>
        </div>

        {/* Share */}
        <div style={{ marginTop: '3rem' }}>
          <DCShareTools
            heading={`Share and help support ${SCHOOL}`}
            description="Every connection helps teachers get the supplies they need and shows how much your community cares about its students."
            url="https://www.donorschoose.org/school/stuyvesant-high-school"
          />
        </div>
      </div>

      {/* Purple trust band */}
      <section className="dc-sch-trust">
        <h2>DonorsChoose is the most trusted classroom funding site for public school teachers.</h2>
        <p>
          Every donation funds real classroom needs — books, supplies, and more — helping students
          learn and thrive. We ship supplies directly to the school, and 100% of every dollar goes
          exactly where you direct it.
        </p>
      </section>

      {/* Demographics */}
      <div className="dc-page__container">
        <DCHeading level={2} className="dc-sch-section-title">
          {SCHOOL} demographics
        </DCHeading>
        <div className="dc-sch-demo">
          <div>
            <Donut percent={76} value="76%" label="of students from low-income households" />
            <div className="dc-donut-caption">Students who qualify for free or reduced lunch</div>
          </div>
          <div className="dc-bars">
            {RACE.map(([label, pct]) => (
              <div className="dc-bars__row" key={label as string}>
                <span>{label}</span>
                <span className="dc-bars__track">
                  <span className="dc-bars__fill" style={{ width: `${pct}%` }} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Support / impact */}
      <div className="dc-page__container dc-sch-support">
        <DCHeading level={2} className="dc-sch-section-title">
          {SCHOOL} support on DonorsChoose
        </DCHeading>
        <div className="dc-sch-raised">$164,224</div>
        <div className="dc-sch-raised-sub">raised for this school all-time</div>
        <div className="dc-stat-tiles">
          {STAT_TILES.map(([n, label]) => (
            <div className="dc-stat-tile" key={label}>
              <b>{n}</b>
              <span>{label}</span>
            </div>
          ))}
        </div>
        <Donut
          percent={62}
          color="var(--dc-blue)"
          value="483"
          label="supporters"
        />
        <div className="dc-donut-caption">
          {SCHOOL} was supported by 300 individuals from New York and 183 individuals out-of-state.
        </div>
      </div>

      <DCFooter trustBanner={false} />
    </div>
  );
}
