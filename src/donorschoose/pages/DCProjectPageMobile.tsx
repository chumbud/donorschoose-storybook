import { useState } from 'react';
import '../tokens.css';
import '../dc-links.css';
import './dc-project-page-mobile.css';
import { DCHeader } from '../DCHeader';
import { DCAvatar } from '../DCAvatar';
import { DCIcon } from '../DCIcon';
import { DCProjectCard } from '../DCProjectCard';
import { projects as mockProjects } from '../mockProjects';
import { usd } from '../money';

export interface DCProjectPageMobileProps {
  title?: string;
  teacher?: string;
  school?: string;
  city?: string;
  state?: string;
  grade?: string;
  /** Short "My students need…" essay. */
  essay?: string;
  goal?: number;
  raised?: number;
  donors?: number;
  imageUrl?: string;
}

const SUGGESTED = [25, 50, 100, 200];

/**
 * The DonorsChoose **project page — mobile**. Single-column layout matching
 * production: blue title band, the classroom hero with the teacher photo,
 * "My students need…" essay, stats, a "Where your donation goes" accordion,
 * similar projects, and a **fixed bottom donation bar** that expands to
 * suggested amounts ($25 / $50 / $100 / $200 + complete-this-project).
 *
 * Structure ported from `proposal.jsp` + `features/project.scss` (the
 * `.proposal-mobile-v2-*` blocks and `.mobile-donation-box`).
 */
export function DCProjectPageMobile({
  title = "Flexible Seating for Wiggly First Grade Learners",
  teacher = 'Ms. Crawford',
  school = 'Alfred E Smith Elementary School',
  city = 'New York',
  state = 'NY',
  grade = 'Grades PreK-2',
  essay = "My students are curious, energetic six-year-olds who learn best when they can move. Help me give my first graders flexible seating — wobble stools, floor cushions, and a cozy reading nook — so every learner has a comfortable place to focus, collaborate, and fall in love with learning.",
  goal = 748,
  raised = 372,
  donors = 9,
  imageUrl,
}: DCProjectPageMobileProps) {
  const [giveOpen, setGiveOpen] = useState(false);
  const [materialsOpen, setMaterialsOpen] = useState(true);
  const [activityOpen, setActivityOpen] = useState(false);
  const [readMore, setReadMore] = useState(false);

  const pct = Math.min(Math.round((raised / goal) * 100), 100);
  const stillNeeded = Math.max(goal - raised, 0);
  const photo = imageUrl ?? '/images/classroom/fallback-classroom@2x.png';

  return (
    <div className="dc-pm">
      <DCHeader />

      {/* 1. Blue title band */}
      <header className="dc-pm__title-band">
        <h1 className="dc-pm__title">{title}</h1>
        <p className="dc-pm__subheader">
          Help {teacher}&rsquo;s classroom get the supplies they need.
        </p>
      </header>

      {/* 2. Classroom hero + teacher */}
      <section className="dc-pm__hero">
        <div className="dc-pm__photo-wrap">
          <img className="dc-pm__photo" src={photo} alt="Classroom" loading="eager" />
          <button type="button" className="dc-pm__fav" aria-label="Follow project">
            <DCIcon name="heart" size={20} />
          </button>
        </div>
        <div className="dc-pm__teacher">
          <DCAvatar name={teacher} placeholder="teacher-1" size={56} />
          <div className="dc-pm__teacher-lines">
            <a className="dc-pm__teacher-name" href="#">
              {teacher}
            </a>
            <a className="dc-pm__school" href="#">
              {school}
            </a>
            <div className="dc-pm__loc">
              <span>
                {city}, {state}
              </span>
              <span className="dc-pm__dot">•</span>
              <span>{grade}</span>
            </div>
          </div>
        </div>
      </section>

      <div className="dc-pm__body">
        {/* 3. Share row */}
        <div className="dc-pm__share">
          <span className="dc-pm__share-label">Give this project a boost!</span>
          <div className="dc-pm__share-icons">
            {(['share', 'mail', 'link'] as const).map((ic) => (
              <button key={ic} type="button" className="dc-pm__share-btn" aria-label={`Share via ${ic}`}>
                <DCIcon name={ic} size={18} />
              </button>
            ))}
          </div>
        </div>

        {/* 4. Essay */}
        <section className="dc-pm__essay">
          <h3 className="dc-pm__essay-title">My students need</h3>
          <p className={`dc-pm__essay-body${readMore ? '' : ' dc-pm__essay-body--fade'}`}>{essay}</p>
          {!readMore && (
            <button type="button" className="dc-text-link dc-pm__readmore" onClick={() => setReadMore(true)}>
              Read more
            </button>
          )}
        </section>

        {/* 5. Stats chips */}
        <ul className="dc-pm__stats">
          <li className="dc-pm__stat">
            <span className="dc-pm__stat-value">Equity Focus</span>
            <span className="dc-pm__stat-label">Historically underfunded</span>
          </li>
          <li className="dc-pm__stat">
            <span className="dc-pm__stat-value">Highest poverty</span>
            <span className="dc-pm__stat-label">Most students from low-income households</span>
          </li>
          <li className="dc-pm__stat">
            <span className="dc-pm__stat-value">{donors}</span>
            <span className="dc-pm__stat-label">donors so far</span>
          </li>
        </ul>

        {/* 6. Tags + expiration */}
        <div className="dc-pm__tags">
          <span className="dc-pm__tag">Flexible Seating</span>
          <span className="dc-pm__tag">Special Needs</span>
          <span className="dc-pm__tag">Literacy</span>
        </div>
        <p className="dc-pm__expires">This project will reach its goal on June 30 — or expire.</p>

        {/* 7. Materials accordion */}
        <section className="dc-pm__accordion">
          <button
            type="button"
            className="dc-pm__accordion-trigger"
            aria-expanded={materialsOpen}
            onClick={() => setMaterialsOpen((v) => !v)}
          >
            <h4 className="dc-pm__accordion-title">Where your donation goes</h4>
            <DCIcon name={materialsOpen ? 'up' : 'down'} size={16} />
          </button>
          {materialsOpen && (
            <table className="dc-pm__materials">
              <tbody>
                <tr>
                  <td>4 Wobble stools</td>
                  <td className="dc-pm__mat-cost">{usd(236)}</td>
                </tr>
                <tr>
                  <td>6 Floor cushions</td>
                  <td className="dc-pm__mat-cost">{usd(114)}</td>
                </tr>
                <tr>
                  <td>1 Reading nook rug</td>
                  <td className="dc-pm__mat-cost">{usd(129)}</td>
                </tr>
                <tr className="dc-pm__mat-fee">
                  <td>Suggested donation to help DonorsChoose</td>
                  <td className="dc-pm__mat-cost">{usd(60)}</td>
                </tr>
                <tr className="dc-pm__mat-total">
                  <td>Total project cost</td>
                  <td className="dc-pm__mat-cost">{usd(goal)}</td>
                </tr>
              </tbody>
            </table>
          )}
        </section>

        {/* 8. Activity accordion */}
        <section className="dc-pm__accordion">
          <button
            type="button"
            className="dc-pm__accordion-trigger"
            aria-expanded={activityOpen}
            onClick={() => setActivityOpen((v) => !v)}
          >
            <h4 className="dc-pm__accordion-title">Project activity</h4>
            <DCIcon name={activityOpen ? 'up' : 'down'} size={16} />
          </button>
          {activityOpen && (
            <ul className="dc-pm__activity">
              <li>
                <b>Maria</b> donated $25 — “Wishing your class a wonderful year!”
              </li>
              <li>
                <b>Anonymous</b> donated $50
              </li>
              <li>
                <b>{teacher}</b> created this project.
              </li>
            </ul>
          )}
        </section>

        {/* 9. Similar projects */}
        <section className="dc-pm__similar">
          <h3 className="dc-pm__similar-title">Similar projects nearby</h3>
          <div className="dc-pm__similar-grid">
            {mockProjects.slice(0, 2).map((p) => (
              <DCProjectCard key={p.title} {...p} layout="vertical" />
            ))}
          </div>
        </section>
      </div>

      {/* 10. Trust footer */}
      <footer className="dc-pm__footer">
        <p>DonorsChoose is the most trusted classroom funding site for teachers.</p>
      </footer>

      {/* Fixed bottom donation bar */}
      <div className={`dc-pm__give${giveOpen ? ' is-open' : ''}`}>
        {!giveOpen ? (
          <div className="dc-pm__give-bar">
            <div className="dc-pm__give-progress">
              <div className="dc-pm__progress">
                <span className="dc-pm__progress-fill" style={{ width: `${pct}%` }} />
              </div>
              <div className="dc-pm__give-need">
                <strong>{usd(stillNeeded)}</strong> still needed
              </div>
            </div>
            <button type="button" className="dc-button dc-button--primary dc-pm__give-btn" onClick={() => setGiveOpen(true)}>
              Give
            </button>
          </div>
        ) : (
          <div className="dc-pm__give-open">
            <div className="dc-pm__give-open-head">
              <span>Choose an amount</span>
              <button type="button" className="dc-pm__give-close" aria-label="Close" onClick={() => setGiveOpen(false)}>
                <DCIcon name="delete" size={16} />
              </button>
            </div>
            <div className="dc-pm__amounts">
              {SUGGESTED.map((a) => (
                <button key={a} type="button" className="dc-button dc-button--secondary dc-pm__amount">
                  {usd(a)}
                </button>
              ))}
            </div>
            <button type="button" className="dc-button dc-button--primary dc-pm__complete">
              Complete this project · {usd(stillNeeded)}
            </button>
            <button type="button" className="dc-text-link dc-pm__custom">
              or give another amount
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
