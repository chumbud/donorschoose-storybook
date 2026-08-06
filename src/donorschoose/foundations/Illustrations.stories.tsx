import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties } from 'react';
import '../tokens.css';

/**
 * # Illustrations
 *
 * Illustration & spot-art SVGs added across the site in the last two years,
 * grouped by the feature they belong to. Icon-style assets (project, map, and
 * social) live in [Components → Icons](?path=/story/components-icons--brand-icons).
 */
const meta = {
  title: 'Brand/Illustrations',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const urls = import.meta.glob('../assets/site-illustrations/**/*.svg', {
  query: '?url',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const GROUP_LABELS: Record<string, string> = {
  about: 'About page',
  funds: 'Funds',
  illustrations: 'Optional donation & empty states',
  project: 'Project page',
  school: 'School page',
  teacher: 'Teacher (thank-a-teacher)',
  'recurring-donation': 'Recurring donation landing',
  vendor: 'Vendor landing',
  footer: 'Footer',
  'donor-map': 'Donor map',
};

type Item = { name: string; url: string };
const groups: Record<string, Item[]> = {};
for (const [path, url] of Object.entries(urls)) {
  const m = path.match(/site-illustrations\/([^/]+)\/(.+)\.svg$/);
  if (!m) continue;
  const [, group, name] = m;
  (groups[group] ||= []).push({ name, url });
}
for (const g of Object.values(groups)) g.sort((a, b) => a.name.localeCompare(b.name));
const groupKeys = Object.keys(groups).sort((a, b) => a.localeCompare(b));
const totalCount = Object.values(groups).reduce((n, g) => n + g.length, 0);

const wrap: CSSProperties = { fontFamily: 'var(--dc-font-body)', color: 'var(--dc-black)', padding: '2.5rem' };
const mono: CSSProperties = { fontFamily: 'ui-monospace, Consolas, monospace', fontSize: '0.72rem', color: 'var(--dc-grey)' };
const grid: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))',
  gap: '1rem',
  margin: '0.75rem 0 2rem',
};
const card: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid var(--dc-grey-stroke)',
  borderRadius: 'var(--dc-radius-standard)',
  background: '#fff',
  overflow: 'hidden',
};
const thumb: CSSProperties = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 150,
  padding: '1.25rem',
  background: 'repeating-conic-gradient(var(--dc-vlgrey) 0% 25%, #fff 0% 50%) 50% / 20px 20px',
};

async function download(url: string, filename: string) {
  const res = await fetch(url);
  const blob = await res.blob();
  const href = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = href;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(href);
}

function Card({ item, group }: { item: Item; group: string }) {
  return (
    <figure style={card} className="dc-illo-card">
      <div style={thumb}>
        <button
          type="button"
          className="dc-illo-dl"
          title="Download SVG"
          aria-label={`Download ${item.name}.svg`}
          onClick={() => download(item.url, `${item.name}.svg`)}
        >
          ↓
        </button>
        <img
          src={item.url}
          alt={item.name}
          loading="lazy"
          style={{ maxWidth: '100%', maxHeight: 118, objectFit: 'contain' }}
        />
      </div>
      <figcaption style={{ padding: '0.7rem 0.85rem 0.9rem', borderTop: '1px solid var(--dc-grey-stroke)' }}>
        <div style={{ fontFamily: 'var(--dc-font-headline)', fontWeight: 700, fontSize: '0.9rem' }}>{item.name}</div>
        <div style={mono}>{group}/{item.name}.svg</div>
      </figcaption>
    </figure>
  );
}

export const Gallery: Story = {
  render: () => (
    <div style={wrap}>
      <style>{`
        .dc-illo-dl {
          position: absolute; top: 6px; right: 6px; width: 26px; height: 26px;
          display: flex; align-items: center; justify-content: center;
          border: none; border-radius: 6px; cursor: pointer; font-size: 15px;
          color: var(--dc-blue-link); background: rgba(255,255,255,0.92);
          box-shadow: 0 1px 3px rgba(0,0,0,0.15);
          opacity: 0; transition: opacity var(--dc-duration-fast) var(--dc-ease);
        }
        .dc-illo-card:hover .dc-illo-dl, .dc-illo-dl:focus-visible { opacity: 1; }
      `}</style>
      <h1 style={{ marginBottom: '0.25rem' }}>Illustrations</h1>
      <p style={{ fontSize: '1.05rem', color: 'var(--dc-grey)', maxWidth: 660, marginTop: 0 }}>
        {totalCount} illustration &amp; spot-art SVGs added across the site in the last two years, grouped by
        feature. Icon-style assets live in{' '}
        <a href="?path=/story/components-icons--brand-icons">Components → Icons</a>.
      </p>
      {groupKeys.map((key) => (
        <section key={key}>
          <h2 style={{ margin: '1.5rem 0 0' }}>{GROUP_LABELS[key] ?? key}</h2>
          <p style={{ ...mono, margin: '0.25rem 0 0' }}>src/donorschoose/assets/site-illustrations/{key}/</p>
          <div style={grid}>
            {groups[key].map((item) => (
              <Card key={item.name} item={item} group={key} />
            ))}
          </div>
        </section>
      ))}
    </div>
  ),
};
