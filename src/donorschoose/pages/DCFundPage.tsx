import '../tokens.css';
import './dc-fund-page.css';
import { DCHeader } from '../DCHeader';
import { DCFooter } from '../DCFooter';
import { DCGiveWidget } from '../DCGiveWidget';
import { DCShareTools } from '../DCShareTools';
import { DCButton } from '../DCButton';
import { DCIcon } from '../DCIcon';
import { classroomPhoto } from '../placeholderPhotos';

const usd = (n: number) => `$${n.toLocaleString('en-US')}`;

export interface DCFundPageProps {
  name?: string;
  subtitle?: string;
  raised?: number;
  goal?: number;
  donors?: number;
}

const ACTIVITY = [
  { date: 'Latest update', text: 'We just funded 6 more classrooms in the Bronx — 148 students reached this week!', latest: true },
  { date: 'Aug 1', text: 'The fund crossed 70% of its goal thanks to a weekend match.' },
  { date: 'Jul 22', text: 'Now funding! We launched this fund to support science classrooms nationwide.' },
];

export function DCFundPage({
  name = 'The Bright Futures Science Fund',
  subtitle = 'Fueling hands-on science learning in classrooms that need it most.',
  raised = 18240,
  goal = 25000,
  donors = 342,
}: DCFundPageProps) {
  const pct = Math.min(Math.round((raised / goal) * 100), 100);

  return (
    <div className="dc-fund">
      <DCHeader />

      {/* Hero */}
      <div className="dc-fund__hero">
        <div className="dc-fund__inner">
          <h1>{name}</h1>
          <p className="dc-fund__sub">{subtitle}</p>

          <div className="dc-fund__progress">
            <div className="dc-fund__bar">
              <span style={{ width: `${pct}%` }} />
            </div>
            <div className="dc-fund__figures">
              <span>
                <span className="dc-fund__raised">{usd(raised)}</span> raised
              </span>
              <span className="dc-fund__goal">{usd(goal)} goal</span>
              <span className="dc-fund__donors">{donors.toLocaleString('en-US')} donors</span>
            </div>
          </div>

          <div className="dc-fund__give">
            <DCGiveWidget
              title="Give to this fund"
              subtitle="100% of your gift supports classrooms in this fund."
              amounts={[50, 100, 250, 500]}
              defaultAmount={100}
              allowMonthly={false}
            />
          </div>

          <div
            className="dc-fund__image"
            role="img"
            aria-label="Fund classrooms"
            style={{
              backgroundImage: `url("${classroomPhoto('fund-page-classroom')}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <p className="dc-fund__caption">Students in a fund-supported classroom in Newark, NJ.</p>
        </div>
      </div>

      {/* Description + activity */}
      <div className="dc-fund__inner">
        <section className="dc-fund__section">
          <p>
            The Bright Futures Science Fund brings microscopes, lab kits, and hands-on materials to
            public school science classrooms across the country. Every donation is pooled and
            granted directly to teacher-created projects — no shopping cart, just classrooms getting
            what they need.
          </p>
          <h3>Fund activity</h3>
          <p style={{ color: 'var(--dc-grey)', marginTop: '-0.25rem' }}>
            Follow along as this fund reaches classrooms.
          </p>
          <ul className="dc-fund__activity">
            {ACTIVITY.map((a, i) => (
              <li key={i} className={a.latest ? 'latest' : ''}>
                <div className="date">{a.date}</div>
                <div>{a.text}</div>
              </li>
            ))}
          </ul>
        </section>

        {/* Share */}
        <section className="dc-fund__section">
          <DCShareTools
            heading="Share & help us grow support"
            description="A chain reaction of support starts with one share."
          />
        </section>

        {/* Out of pocket */}
        <div className="dc-fund__oop">
          <DCIcon name="banknote" size={36} />
          An average public school teacher will spend $624 out-of-pocket this year to keep their
          classroom running.
        </div>

        {/* Trust */}
        <section className="dc-fund__trust">
          <DCIcon name="star" size={40} style={{ fill: 'var(--dc-yellow)' }} />
          <h2>Most trusted by teachers</h2>
          <p style={{ color: 'var(--dc-grey)', maxWidth: 560, margin: '0 auto 1.25rem' }}>
            We're a teacher-founded nonprofit with top ratings from Charity Navigator, CharityWatch,
            and Guidestar.
          </p>
          <DCButton variant="secondary">Learn about DonorsChoose</DCButton>
        </section>

        {/* Learn more */}
        <div className="dc-fund__learn">
          <div className="l1">DonorsChoose works with schools and districts directly.</div>
          <div className="l2">100% of your donation is tax-deductible!</div>
        </div>
      </div>

      <DCFooter trustBanner={false} />
    </div>
  );
}
