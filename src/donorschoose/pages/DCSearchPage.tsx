import { useState } from 'react';
import '../tokens.css';
import './dc-search-page.css';
import { DCHeader } from '../DCHeader';
import { DCFooter } from '../DCFooter';
import { DCButton } from '../DCButton';
import { DCInput, DCCheck } from '../DCInput';
import { DCIcon } from '../DCIcon';
import { DCPagination } from '../DCPagination';
import { DCEssentialCard } from '../DCEssentialCard';
import { DCMap, DCMapPin, DCMapPopup } from '../DCMap';

const usd = (n: number) => `$${n.toLocaleString('en-US')}`;

const thumb = (hue: number) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><rect width='120' height='120' fill='hsl(${hue} 50% 60%)'/><circle cx='60' cy='46' r='20' fill='hsl(${hue} 55% 78%)'/><rect x='22' y='72' width='76' height='40' rx='8' fill='hsl(${hue} 55% 72%)'/></svg>`,
  )}`;

const FILTERS = [
  { title: 'Gift the essentials', options: ['Classroom essentials'] },
  {
    title: 'Maximize your impact',
    options: [
      'Matched donations',
      'Teachers celebrating a birthday today',
      'Never before funded teachers',
      'More than half of students from low-income households',
      'HBCU Alumni',
      'Projects with no donations',
      'Historically underfunded schools',
    ],
  },
  {
    title: 'Amount needed',
    options: ['$50 and under', '$100 and under', '$250 and under', '$500 and under', '$1,000 and under', 'Over $1,000'],
  },
  {
    title: 'Topic',
    options: [
      'Health, Sports & Wellness',
      'Life Skills',
      'Literacy & Language',
      'The Arts',
      'Racial Justice & Representation',
      'Social Studies',
      'Students with Disabilities',
      'Warmth, Care & Hunger',
      'Professional development',
    ],
  },
  { title: 'Grade level', options: ['Grades PreK-2', 'Grades 3-5', 'Grades 6-8', 'Grades 9-12'] },
  {
    title: 'Supplies',
    options: [
      'Art Supplies',
      'Books',
      'Classroom Basics',
      'Computers & Tablets',
      'Educational Kits & Games',
      'Flexible Seating',
      'Food, Clothing & Hygiene',
      'Instructional Technology',
      'Lab Equipment',
      'Musical Instruments',
      'Reading Nooks, Desks & Storage',
      'Sports & Exercise Equipment',
    ],
  },
  { title: 'Experiences', options: ['Virtual Trips', 'Virtual Visitors'] },
];

interface Result {
  title: string;
  desc: string;
  teacher: string;
  school: string;
  location: string;
  need: number;
  donors: number;
  pct: number;
  hue: number;
  matched?: string;
}

const RESULTS: Result[] = [
  { title: 'Where History Comes to Life', desc: 'Help me give my students paper, hot glue guns and glue sticks to help with hands-on learning.', teacher: 'Ms. P', school: 'Lively Middle School', location: 'Austin, TX', need: 65, donors: 9, pct: 82, hue: 20 },
  { title: 'Students Deserve Paper, not Promises', desc: 'Help me give my students essentials like notebooks, paper, markers, pencils, and a sharpener.', teacher: 'Ms. Roohi', school: 'YES Prep', location: 'Houston, TX', need: 68, donors: 15, pct: 74, hue: 140 },
  { title: 'Stronger Together: Providing Essential Resources for Our Dancers', desc: 'Help me give my students access to a physically demanding activity that requires energy. Having snacks replenishes energy.', teacher: 'Mrs. Levine', school: 'South Miami Senior High School', location: 'Miami, FL', need: 79, donors: 19, pct: 68, hue: 320 },
  { title: 'Increasing Learning Through Intentional Play', desc: 'Help me give my students access to tools, dress-up garments, puzzles, and games that drive standards-aligned play.', teacher: 'Ms. Sophie', school: 'Columbine Elementary School', location: 'Boulder, CO', need: 581, donors: 16, pct: 34, hue: 265 },
  { title: 'Sit, Speak, Soar: One-on-One Advisory Space', desc: 'Help me give my students a space where we can host valuable one-to-one conferences and Big Picture learning.', teacher: 'Ms. Maglia', school: 'Carlsbad Village Academy', location: 'Carlsbad, CA', need: 45, donors: 0, pct: 12, hue: 200 },
];

const RESULTS_2: Result[] = [
  { title: 'All the Small Things', desc: 'Help me give my students all the small things that make a classroom run smoothly.', teacher: 'Mrs. Watson', school: 'Pizza K-8 School', location: 'Tampa, FL', need: 41, donors: 8, pct: 78, hue: 40 },
  { title: 'Help Me Support My Students Academic and Social Emotional Learning', desc: 'Help me give my students a great start with supplies that create a welcoming and supportive environment.', teacher: 'Ms. Vidal', school: 'West Orange Stark Elementary School', location: 'Orange, TX', need: 114, donors: 7, pct: 55, hue: 265, matched: 'The Montgomery Family Fund' },
  { title: 'A Bookshelf For Growing Readers', desc: 'Help me give my students the classroom library they deserve! The books have been ordered!', teacher: 'Mrs. Lassiter', school: 'Duson Elementary School', location: 'Duson, LA', need: 57, donors: 2, pct: 40, hue: 90 },
  { title: 'Helping Students GROW!', desc: 'Help me give my students a gardening experience that enhances learning, engagement, and growth.', teacher: 'Mr. Bernard', school: 'Edward Hynes Charter School', location: 'New Orleans, LA', need: 90, donors: 6, pct: 48, hue: 120 },
  { title: 'Project Theatre Make Over', desc: 'Help me give my students a more organized space for our props and costumes.', teacher: 'Ms. Bloom', school: 'Apollo Ridge Elementary School', location: 'Spring Church, PA', need: 65, donors: 12, pct: 60, hue: 300, matched: 'An Anonymous Donor' },
];

const ESSENTIALS = [
  { price: 11, name: 'Crayons', who: 'For Mrs. Stephens · Avon, MS', hue: 30 },
  { price: 20, name: 'Bandages', who: 'For Ms. Rodriguez · Los Angeles, CA', hue: 200 },
  { price: 10, name: 'Crackers', who: 'For Ms. Hoffmann · Dallas, TX', hue: 10 },
];

function Row({ r }: { r: Result }) {
  return (
    <article className={`dc-sp__row ${r.matched ? 'dc-sp__row--matched' : ''}`}>
      {r.matched && (
        <div className="dc-sp__match-banner">
          <span className="dc-sp__match-badge">2×</span> Double your impact! Thanks to {r.matched}
        </div>
      )}
      <div className="dc-sp__thumb" style={{ backgroundImage: `url("${thumb(r.hue)}")` }} />
      <div>
        <h3 className="dc-sp__row-title">{r.title}</h3>
        <p className="dc-sp__row-desc">“{r.desc}”</p>
        <div className="dc-sp__row-teacher">{r.teacher}</div>
        <div className="dc-sp__row-school">
          {r.school} · {r.location}
        </div>
      </div>
      <div className="dc-sp__row-funding">
        <div className="dc-sp__miniprogress">
          <span style={{ width: `${r.pct}%` }} />
        </div>
        <div className="dc-sp__row-need">
          {usd(r.need)} {r.matched ? 'for now' : 'still needed'}
        </div>
        <div className="dc-sp__row-donors">{r.donors} donors so far</div>
      </div>
    </article>
  );
}

const MAP_PINS = [
  { x: 24, y: 40, c: 8 },
  { x: 46, y: 58, c: 3 },
  { x: 68, y: 34, c: 12 },
  { x: 58, y: 72, c: 5 },
  { x: 36, y: 66, c: 9 },
];

export function DCSearchPage() {
  const [view, setView] = useState<'list' | 'map'>('list');
  const [page, setPage] = useState(1);

  return (
    <div className="dc-sp">
      <DCHeader />

      {/* Toolbar */}
      <div className="dc-sp__toolbar">
        <div className="dc-sp__toolbar-inner">
          <div className="dc-sp__toggle">
            <button aria-pressed={view === 'list'} onClick={() => setView('list')}>
              <DCIcon name="list" size={16} /> List
            </button>
            <button aria-pressed={view === 'map'} onClick={() => setView('map')}>
              <DCIcon name="location" size={16} /> Map
            </button>
          </div>
          <div className="dc-sp__searchgroup">
            <DCInput className="dc-input" placeholder="Search topics, teachers & schools" style={{ flex: 1 }} defaultValue="" />
            <span className="dc-sp__near">near</span>
            <DCInput className="dc-sp__zip" placeholder="city, state, or zip" />
          </div>
          <button className="dc-sp__search-btn">Search</button>
        </div>
      </div>

      {/* Body */}
      <div className="dc-sp__body">
        {/* Filter rail */}
        <aside className="dc-sp__filters">
          {FILTERS.map((g) => (
            <div className="dc-sp__filter-group" key={g.title}>
              <h4>{g.title}</h4>
              {g.options.map((o) => (
                <DCCheck key={o} label={o} />
              ))}
            </div>
          ))}
          <a href="#" className="dc-sp__showtype">
            + Show school type
          </a>
          <div className="dc-sp__filter-actions">
            <DCButton variant="secondary" size="small" fullWidth>
              Pick a project for me
            </DCButton>
            <DCCheck label="Fully funded projects" />
            <DCCheck label="Show give box" />
          </div>
        </aside>

        {/* Results / Map */}
        <div>
          <div className="dc-sp__count">
            <b>81,168</b> projects sorted by most urgent{' '}
            <DCIcon name="navigatedown" size={12} />
          </div>

          {view === 'map' ? (
            <DCMap height={520}>
              {MAP_PINS.map((p, i) => (
                <DCMapPin key={i} x={p.x} y={p.y} count={p.c} active={i === 2} />
              ))}
              <DCMapPopup x={68} y={34}>
                <div style={{ fontFamily: 'var(--dc-font-headline)', fontWeight: 700 }}>Austin, TX</div>
                <div style={{ fontSize: '0.875rem', color: 'var(--dc-grey)' }}>12 projects need funding</div>
              </DCMapPopup>
            </DCMap>
          ) : (
            <div className="dc-sp__results">
              {RESULTS.map((r) => (
                <Row key={r.title} r={r} />
              ))}

              {/* Essentials promo */}
              <div className="dc-sp__essentials">
                <div className="dc-sp__essentials-head">
                  <h3>Help a teacher stock up on classroom basics</h3>
                  <a href="#" style={{ color: 'var(--dc-blue-link)', textDecoration: 'none', fontSize: '0.875rem' }}>
                    View all requests
                  </a>
                </div>
                <div className="dc-sp__products">
                  {ESSENTIALS.map((p) => (
                    <DCEssentialCard
                      key={p.name}
                      name={p.name}
                      price={p.price}
                      forWho={p.who}
                      imageUrl={thumb(p.hue)}
                    />
                  ))}
                </div>
              </div>

              {RESULTS_2.map((r) => (
                <Row key={r.title} r={r} />
              ))}

              {/* Pagination */}
              <DCPagination page={page} totalPages={10} onChange={setPage} />
            </div>
          )}

          {/* Purple promo banner */}
          <div className="dc-sp__promo">
            <div className="dc-sp__thumb" style={{ width: 120, height: 120, backgroundImage: `url("${thumb(255)}")` }} />
            <div>
              <div className="dc-sp__promo-text">
                Give teachers the <span className="accent">basic supplies</span> they need most.
              </div>
              <DCButton style={{ marginTop: '1rem' }}>Find a teacher</DCButton>
            </div>
          </div>
        </div>
      </div>

      <DCFooter trustBanner={false} />
    </div>
  );
}
