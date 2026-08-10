import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useState, type CSSProperties } from 'react';
import './tokens.css';
import './dc-overview.css';

/**
 * Landing page for the DonorsChoose design system.
 */
const meta = {
  title: 'Overview',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/* One-line descriptions for flagged components. */
const DESCRIPTIONS: Record<string, string> = {
  'Components/Map': 'Brand-styled map surface with pins, need-level markers, and popups.',
  'Components/Navigation': 'The global navigation bar — a redesign is in the works.',
  'Pages/Project': 'The classroom project page — hero, funding bar, teacher info, and essay.',
  'Pages/Fund': 'A designated-fund landing page with goal progress and a live activity feed.',
  'Pages/School': 'A school profile page with its projects and impact.',
  'Pages/Search': 'Project search results with filters and matched treatments.',
  'Pages/Teacher': 'A teacher profile page (logged-out and logged-in).',
  'Pages/All Elements': 'A kitchen-sink page showing every component together.',
};

/* Section table-of-contents. */
const SECTIONS = [
  { label: 'Brand', href: '/?path=/story/brand-illustrations--gallery', blurb: 'Illustrations, icons, photo treatment, and other brand assets.' },
  { label: 'Tokens', href: '/?path=/story/tokens-colors--palette', blurb: 'The foundations — color, type, spacing, breakpoints, and motion.' },
  { label: 'Components', href: '/?path=/story/components-button--primary', blurb: 'The reusable building blocks: buttons, inputs, cards, nav, and more.' },
  { label: 'Pages', href: '/?path=/story/pages-project--active', blurb: 'Full page compositions showing components in their real environment.' },
];

type StatusItem = { title: string; id: string };

const wrap: CSSProperties = {
  fontFamily: 'var(--dc-font-body)',
  color: 'var(--dc-black)',
  padding: '3rem 2.5rem',
  maxWidth: 860,
  margin: '0 auto',
  lineHeight: 1.5,
};
const h1: CSSProperties = {
  fontFamily: 'var(--dc-font-headline)',
  fontWeight: 900,
  fontSize: '2.5rem',
  letterSpacing: '-0.02em',
  margin: '0 0 0.5rem',
};
const lead: CSSProperties = { fontSize: '1.15rem', color: 'var(--dc-grey)', margin: '0 0 1.5rem' };
const h2: CSSProperties = { fontFamily: 'var(--dc-font-headline)', fontWeight: 700, fontSize: '1.4rem', margin: '2.5rem 0 1rem' };
const card: CSSProperties = {
  display: 'block',
  padding: '1rem 1.25rem',
  border: '1px solid var(--dc-grey-stroke)',
  borderRadius: 'var(--dc-radius-standard)',
  background: '#fff',
  textDecoration: 'none',
  color: 'var(--dc-black)',
};

/** Collect the first story id per component title carrying a given tag. */
function useTagged(tag: string): StatusItem[] {
  const [items, setItems] = useState<StatusItem[]>([]);
  useEffect(() => {
    let alive = true;
    fetch('/index.json', { cache: 'no-store' })
      .then((r) => r.json())
      .then((data: { entries: Record<string, { title: string; type: string; tags?: string[] }> }) => {
        if (!alive) return;
        const byTitle = new Map<string, string>();
        for (const [id, e] of Object.entries(data.entries)) {
          if (e.type === 'story' && e.tags?.includes(tag) && !byTitle.has(e.title)) {
            byTitle.set(e.title, id); // first story id for this title → deep link
          }
        }
        setItems([...byTitle.entries()].map(([title, id]) => ({ title, id })).sort((a, b) => a.title.localeCompare(b.title)));
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [tag]);
  return items;
}

function StatusList({ items }: { items: StatusItem[] }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.6rem' }}>
      {items.map((item) => (
        <li key={item.id}>
          <a href={`/?path=/story/${item.id}`} target="_top" className="dc-ov-card" style={{ padding: '0.85rem 1.1rem' }}>
            <span style={{ fontFamily: 'var(--dc-font-headline)', fontWeight: 700 }}>
              {item.title.replace(/^(Components|Pages)\//, '')}
              <span style={{ color: 'var(--dc-grey)', fontWeight: 400 }}> · {item.title.split('/')[0]}</span>
            </span>
            <span style={{ display: 'block', color: 'var(--dc-grey)', fontSize: '0.9rem', marginTop: 2 }}>
              {DESCRIPTIONS[item.title] ?? 'In progress.'}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

/* Design-system owners — who to contact. */
const OWNERS = [{ name: 'PJ Rosa', role: 'Owner', email: 'pj.rosa@donorschoose.org' }];

export const Welcome: Story = {
  name: 'Overview',
  render: () => {
    const wip = useTagged('wip');
    const deprecated = useTagged('deprecated');
    return (
      <div style={wrap}>
        <h1 style={h1}>DonorsChoose Design System</h1>
        <p style={lead}>
          A living library of the DonorsChoose web experience — brand foundations, reusable components,
          and full page compositions, ported to shared design tokens.
        </p>

        <p style={{ margin: '0 0 0.5rem' }}>
          <strong>What this is.</strong> A single source of truth for how DonorsChoose looks and behaves:
          colors, type, and motion tokens; the components built on them; and real pages that show those
          components in context. Placeholder copy for now — replace with your team's framing.
        </p>

        <h2 style={h2}>Why Storybook?</h2>
        <p style={{ marginTop: 0 }}>
          Storybook is our shared, always-current reference for the interface — every component and page in
          one place, isolated so it's easy to see, test, and talk about. It helps different people in
          different ways:
        </p>
        <ul style={{ margin: '0 0 0.5rem', paddingLeft: '1.2rem' }}>
          <li>
            <strong>Designers</strong> — browse the real, in-code patterns and states, check spacing, type,
            and color against the tokens, and hand off with confidence that what's built matches intent.
          </li>
          <li>
            <strong>Developers</strong> — see each component's props, variants, and edge cases, reuse instead
            of rebuilding, and catch visual regressions before they ship.
          </li>
          <li>
            <strong>Everyone else at DonorsChoose</strong> — PMs, content, marketing, and leadership can see
            what the product looks like and share a common vocabulary without needing a running app.
          </li>
        </ul>

        <h2 style={h2}>Explore</h2>
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {SECTIONS.map((s) => (
            <a key={s.label} href={s.href} target="_top" className="dc-ov-card">
              <span style={{ fontFamily: 'var(--dc-font-headline)', fontWeight: 700, fontSize: '1.05rem' }}>{s.label}</span>
              <span style={{ display: 'block', color: 'var(--dc-grey)', fontSize: '0.95rem', marginTop: 2 }}>{s.blurb}</span>
            </a>
          ))}
        </div>

        <h2 style={h2}>🚧 Under construction</h2>
        <p style={{ color: 'var(--dc-grey)', marginTop: 0 }}>
          Incomplete and still changing. {wip.length > 0 ? `(${wip.length})` : ''}
        </p>
        {wip.length === 0 ? (
          <p style={{ color: 'var(--dc-grey)' }}>Nothing under construction right now. 🎉</p>
        ) : (
          <StatusList items={wip} />
        )}

        <h2 style={h2}>⚠️ Redesign coming</h2>
        <p style={{ color: 'var(--dc-grey)', marginTop: 0 }}>
          Still in use, but slated to be revamped soon. {deprecated.length > 0 ? `(${deprecated.length})` : ''}
        </p>
        {deprecated.length === 0 ? (
          <p style={{ color: 'var(--dc-grey)' }}>Nothing queued for a redesign.</p>
        ) : (
          <StatusList items={deprecated} />
        )}

        <h2 style={h2}>Owners &amp; contact</h2>
        <p style={{ marginTop: 0, color: 'var(--dc-grey)' }}>
          Questions, requests, or something looks off? Reach out:
        </p>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.5rem' }}>
          {OWNERS.map((o) => (
            <li key={o.email} style={{ ...card, display: 'flex', alignItems: 'baseline', gap: '0.6rem' }}>
              <span style={{ fontFamily: 'var(--dc-font-headline)', fontWeight: 700 }}>{o.name}</span>
              <span style={{ color: 'var(--dc-grey)', fontSize: '0.9rem' }}>{o.role}</span>
              <a href={`mailto:${o.email}`} className="dc-ov-maillink">
                {o.email}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  },
};
