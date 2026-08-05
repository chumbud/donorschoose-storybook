import { useState } from 'react';
import '../tokens.css';
import './dc-project-page.css';
import { DCHeader } from '../DCHeader';
import { DCFooter } from '../DCFooter';
import { DCButton } from '../DCButton';
import { DCAvatar } from '../DCAvatar';
import { DCIcon } from '../DCIcon';
import { DCInput } from '../DCInput';
import { DCModal } from '../DCModal';
import { DCText } from '../DCText';
import { DCShareTools } from '../DCShareTools';
import type { DCProjectCardProps } from '../DCProjectCard';
import { byStatus } from '../mockProjects';

const usd = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
const usdCents = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });

const MATERIALS = [
  { name: 'Pacon Super Value Poster Board, 22 x 28 Inches, White, Pack of 50', cost: 26.17, qty: 2, vendor: 'School Specialty' },
  { name: 'School Smart Poster Board, 11 x 14 Inches, White, Pack of 25', cost: 8.99, qty: 5, vendor: 'School Specialty' },
  { name: 'Gorilla Glue Mini Hot Glue Sticks, Pack of 30', cost: 7.64, qty: 5, vendor: 'School Specialty' },
  { name: 'Aigyobo 240 Count Washable Markers Bulk, 12 Assorted Colors', cost: 35.99, qty: 1, vendor: 'Amazon Business' },
  { name: "Elmer's CraftBond Hot Glue Sticks, Full Size, Pack of 24", cost: 11.09, qty: 3, vendor: 'School Specialty' },
];

const TAGS = ['Austin, TX', 'Grades 6-8', 'Social Sciences', 'Traditional School', 'Art Supplies', 'More than half of students from low-income households'];

export interface DCProjectPageProps {
  /** The project supplying the funding state. Defaults to an active project. */
  project?: DCProjectCardProps;
}

export function DCProjectPage({ project = byStatus('active') }: DCProjectPageProps) {
  const [open, setOpen] = useState(false);
  const isFunded = project.status === 'funded' || project.raised >= project.goal;
  const isMatched = project.status === 'matched';
  const pct = Math.min(Math.round((project.raised / project.goal) * 100), 100);
  const stillNeeded = Math.max(project.goal - project.raised, 0);

  const stateMod = isFunded ? 'dc-pp--funded' : isMatched ? 'dc-pp--matched' : '';

  return (
    <div className={`dc-pp ${stateMod}`}>
      <DCHeader />

      {/* Hero */}
      <div className="dc-pp__hero">
        <h1>{project.title}</h1>
        <p>Help me give my students the supplies they need for hands-on, project-based learning.</p>
      </div>

      {/* Sticky funding bar */}
      <div className="dc-pp__fundbar">
        <div className="dc-pp__fundbar-row">
          <span className="dc-pp__donors">{project.donors} donors</span>
          <span className={`dc-pp__needed ${isFunded ? 'is-funded' : ''}`}>
            {isFunded ? 'Fully funded!' : `${usd(stillNeeded)} still needed`}
          </span>
          <span className="dc-pp__fund-spacer" />
          <span className="dc-pp__expires">
            Expires
            <br />
            Nov 27
          </span>
          <DCInput className="dc-pp__amount" aria-label="Donation amount" defaultValue="$" />
          <DCButton onClick={() => setOpen(true)}>Give to this classroom</DCButton>
        </div>
        <div className="dc-pp__fundbar-progress">
          <div className="dc-pp__fundbar-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* Body */}
      <div className="dc-pp__body">
        {/* Left column */}
        <aside>
          <div
            className="dc-pp__photo"
            style={project.imageUrl ? { backgroundImage: `url("${project.imageUrl}")` } : undefined}
          >
            <div className="dc-pp__follow">
              <DCButton variant="secondary" size="small" icon={<DCIcon name="flag" size={16} />}>
                Follow project for updates
              </DCButton>
            </div>
          </div>
          <div className="dc-pp__avatar">
            <DCAvatar name={project.teacher} placeholder="teacher-1" size={68} ring />
          </div>
          <a href="#" className="dc-pp__teacher-name">
            {project.teacher}
          </a>
          <div className="dc-pp__teacher-sub">
            {project.school}
            <br />
            Grades 6-8
          </div>
          <p className="dc-pp__impact-note">
            This project will directly impact historically underfunded classrooms.
          </p>
          <ul className="dc-pp__meta">
            <li>
              <DCIcon name="location" size={18} />
              <span>
                {project.location} - <a href="#">View local requests</a>
              </span>
            </li>
            <li>
              <DCIcon name="users" size={18} />
              <em>More than half of students from low-income households</em>
            </li>
            <li>
              <DCIcon name="flag" size={18} />
              <span>Never Before Funded</span>
            </li>
            <li>
              <DCIcon name="masculineuser" size={18} />
              <span>150 students impacted</span>
            </li>
            <li>
              <DCIcon name="heart" size={18} />
              <span>{project.donors} donors</span>
            </li>
          </ul>
        </aside>

        {/* Right column */}
        <div>
          {/* Boost / share card */}
          <div style={{ marginBottom: '1.5rem' }}>
            <DCShareTools url="https://www.donorschoose.org/si/Gr9jZ9RG6w" />
          </div>

          {/* Story */}
          <div className="dc-pp__story">
            <h2>My Project</h2>
            <p>
              Project-based learning is one of my favorite ways to help students connect with what
              they're learning. Simple supplies like paper, tape, and hot glue guns give students
              the chance to build, create, and bring their ideas to life.
            </p>
            <p>
              Whether they're making models, designing posters, or working together on a history
              project, these materials make learning more engaging and memorable. Having these
              supplies on hand means my students can spend less time worrying about what they have to
              work with and more time collaborating, creating, and learning by doing.
            </p>
            <p className="dc-pp__thanks">Thank you for considering.</p>

            <div className="dc-pp__tags-label">Project tagged as</div>
            <div className="dc-pp__tags">
              {TAGS.map((t) => (
                <span className="dc-pp__tag" key={t}>
                  #{t}
                </span>
              ))}
            </div>
            <p className="dc-pp__deadline">
              {project.teacher} will only receive her materials if this project is fully funded by
              November 27.
            </p>
          </div>
        </div>
      </div>

      {/* Where your donation goes */}
      <section className="dc-pp__section">
        <div className="dc-pp__section-inner">
          <h2>Where Your Donation Goes</h2>
          <div className="dc-pp__donation-grid">
            <div>
              <table className="dc-pp__materials">
                <thead>
                  <tr>
                    <th>Materials</th>
                    <th className="num">Cost</th>
                    <th className="num">Quantity</th>
                    <th className="num">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {MATERIALS.map((m) => (
                    <tr key={m.name}>
                      <td>
                        {m.name}
                        <span className="dc-pp__vendor">{m.vendor}</span>
                      </td>
                      <td className="num">{usdCents(m.cost)}</td>
                      <td className="num">{m.qty}</td>
                      <td className="num">{usdCents(m.cost * m.qty)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="dc-pp__viewall">
                <a href="#">View complete list ⌄</a>
              </div>
            </div>
            <aside className="dc-pp__inspire">
              <small>Teachers, feeling inspired?</small>
              <p>You can start a project with the same resources being requested here!</p>
              <DCButton size="small" fullWidth>
                Copy this cart
              </DCButton>
            </aside>
          </div>
        </div>
      </section>

      {/* Activity */}
      <section className="dc-pp__section">
        <div className="dc-pp__section-inner">
          <div className="dc-pp__activity-head">
            <h2 style={{ margin: 0 }}>Project Activity</h2>
            <DCButton variant="secondary" size="small" icon={<DCIcon name="flag" size={16} />}>
              Follow project for updates
            </DCButton>
          </div>
          <DCText variant="discreet" style={{ marginTop: '1rem' }}>
            If you donated to this project, you can <a href="#">sign in</a> to leave a comment for{' '}
            {project.teacher}.
          </DCText>
          <div className="dc-pp__backtotop">
            <DCButton variant="secondary" size="small" icon={<DCIcon name="up" size={16} />}>
              Back to top
            </DCButton>
          </div>
        </div>
      </section>

      <DCFooter />

      <DCModal
        open={open}
        onClose={() => setOpen(false)}
        title="Support this classroom"
        footer={
          <>
            <DCButton variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </DCButton>
            <DCButton onClick={() => setOpen(false)}>Give $25</DCButton>
          </>
        }
      >
        <DCText>100% of your donation reaches {project.teacher}'s classroom.</DCText>
        <DCInput label="Donation amount" defaultValue="$25" />
      </DCModal>
    </div>
  );
}
