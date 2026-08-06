import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties } from 'react';
import '../tokens.css';
import { DCIcon } from '../DCIcon';

/**
 * # Illustrations
 *
 * Every illustration & spot-art SVG added across the site in the last two years,
 * in one grid. Each caption notes the page/component it comes from. Icon-style
 * assets (project, map, social) live in
 * [Components → Icons](?path=/story/components-icons--gallery).
 */
const meta = {
  title: 'Brand/Illustrations',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const urls = import.meta.glob('../assets/site-illustrations/**/*.svg', {
  query: '?url',
  import: 'default',
  eager: true,
}) as Record<string, string>;

/** Friendly "where it's from" label per source folder. */
const SOURCE_LABELS: Record<string, string> = {
  about: 'About page',
  funds: 'Funds',
  illustrations: 'Optional donation & empty states',
  project: 'Project page',
  school: 'School page',
  teacher: 'Thank-a-teacher',
  'recurring-donation': 'Recurring donation landing',
  vendor: 'Vendor landing',
  'donor-map': 'Donor map',
};

type Item = { name: string; url: string; source: string };
const items: Item[] = [];
for (const [path, url] of Object.entries(urls)) {
  const m = path.match(/site-illustrations\/([^/]+)\/(.+)\.svg$/);
  if (!m) continue;
  const [, source, name] = m;
  if (source === 'footer') continue; // footer/sponsor asset isn't an illustration
  items.push({ name, url, source });
}
items.sort((a, b) => a.name.localeCompare(b.name));

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

const wrap: CSSProperties = { fontFamily: 'var(--dc-font-body)', color: 'var(--dc-black)', padding: '2.5rem' };
const mono: CSSProperties = { fontFamily: 'ui-monospace, Consolas, monospace', fontSize: '0.72rem', color: 'var(--dc-grey)' };
const grid: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))',
  gap: '1rem',
  marginTop: '1.25rem',
};
const card: CSSProperties = {
  margin: 0,
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

function Card({ item }: { item: Item }) {
  return (
    <figure style={card}>
      <div style={thumb}>
        <button
          type="button"
          className="dc-illo-dl"
          title={`Download ${item.name}.svg`}
          aria-label={`Download ${item.name}.svg`}
          onClick={() => download(item.url, `${item.name}.svg`)}
        >
          <DCIcon name="download" size={16} />
        </button>
        <img src={item.url} alt={item.name} loading="lazy" style={{ maxWidth: '100%', maxHeight: 118, objectFit: 'contain' }} />
      </div>
      <figcaption style={{ padding: '0.7rem 0.85rem 0.9rem', borderTop: '1px solid var(--dc-grey-stroke)' }}>
        <div style={{ fontFamily: 'var(--dc-font-headline)', fontWeight: 700, fontSize: '0.9rem' }}>{item.name}</div>
        <div style={{ fontSize: '0.8rem', color: 'var(--dc-grey)', margin: '0.15rem 0 0.35rem' }}>
          {SOURCE_LABELS[item.source] ?? item.source}
        </div>
        <div style={mono}>{item.source}/{item.name}.svg</div>
      </figcaption>
    </figure>
  );
}

export const Gallery: Story = {
  render: () => (
    <div style={wrap}>
      <style>{`
        .dc-illo-dl {
          position: absolute; top: 6px; right: 6px; width: 28px; height: 28px;
          display: flex; align-items: center; justify-content: center;
          border: none; border-radius: 6px; cursor: pointer;
          color: var(--dc-blue-link); background: rgba(255,255,255,0.92);
          box-shadow: 0 1px 3px rgba(0,0,0,0.15);
        }
        .dc-illo-dl:hover { color: var(--dc-blue-link-hover); background: #fff; }
      `}</style>
      <h1 style={{ marginBottom: '0.25rem' }}>Illustrations</h1>
      <p style={{ fontSize: '1.05rem', color: 'var(--dc-grey)', maxWidth: 660, marginTop: 0 }}>
        {items.length} illustration &amp; spot-art SVGs added across the site in the last two years. Each
        caption notes where it's used. Icon-style assets live in{' '}
        <a href="?path=/story/components-icons--gallery">Components → Icons</a>.
      </p>
      <div style={grid}>
        {items.map((item) => (
          <Card key={`${item.source}/${item.name}`} item={item} />
        ))}
      </div>
    </div>
  ),
};
