import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, type CSSProperties } from 'react';
import './tokens.css';
import { DCIcon, ICON_NAMES } from './DCIcon';

/**
 * # Icon gallery
 *
 * Every icon in the library in one grid — the **SS Junior** sprite plus the
 * standalone `project/icon`, map, and social SVGs. Recolorable icons follow the
 * chosen tint (`currentColor`); fixed-color icons (social + colored map markers)
 * keep their brand colors and are shown separately. Hover any tile to download
 * its SVG.
 */
const meta = {
  title: 'Components/Icons',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/* ---- standalone icon assets: ?raw for inline (recolor), ?url for download ---- */
type Rec = Record<string, string>;
const projectRaw = import.meta.glob('./assets/site-icons/project/*.svg', { query: '?raw', import: 'default', eager: true }) as Rec;
const projectUrl = import.meta.glob('./assets/site-icons/project/*.svg', { query: '?url', import: 'default', eager: true }) as Rec;
const mapRaw = import.meta.glob('./assets/site-icons/map/*.svg', { query: '?raw', import: 'default', eager: true }) as Rec;
const mapUrl = import.meta.glob('./assets/site-icons/map/*.svg', { query: '?url', import: 'default', eager: true }) as Rec;
const socialUrl = import.meta.glob('./assets/site-icons/social/*.svg', { query: '?url', import: 'default', eager: true }) as Rec;

const base = (p: string) => p.split('/').pop()!.replace(/\.svg$/, '');
const byName = (m: Rec) => Object.fromEntries(Object.entries(m).map(([p, v]) => [base(p), v]));

const projectRawByName = byName(projectRaw);
const projectUrlByName = byName(projectUrl);
const mapRawByName = byName(mapRaw);
const mapUrlByName = byName(mapUrl);
const socialUrlByName = byName(socialUrl);

// school-building is monochrome → recolorable; the rest of map is fixed-color.
const RECOLOR_MAP = ['school-building'];
const FIXED_MAP = Object.keys(mapUrlByName).filter((n) => !RECOLOR_MAP.includes(n)).sort();

/* ---------------------------------------------------------------- download -- */
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

let spriteDoc: Promise<Document> | null = null;
function getSprite() {
  spriteDoc ||= fetch('/icon-junior.svg')
    .then((r) => r.text())
    .then((t) => new DOMParser().parseFromString(t, 'image/svg+xml'));
  return spriteDoc;
}
async function downloadGlyph(name: string) {
  const doc = await getSprite();
  const sym = doc.getElementById(`icon-${name}`);
  if (!sym) return;
  const vb = sym.getAttribute('viewBox') ?? '0 0 23 32';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" fill="currentColor">${sym.innerHTML}</svg>`;
  const href = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
  const a = document.createElement('a');
  a.href = href;
  a.download = `${name}.svg`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(href);
}

/* ------------------------------------------------------------------ styles -- */
const wrap: CSSProperties = { fontFamily: 'var(--dc-font-body)', color: 'var(--dc-black)', padding: '2rem' };
const grid: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(92px, 1fr))',
  gap: '0.5rem',
};
const tile: CSSProperties = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: 6,
  padding: '1rem 0.5rem 0.7rem',
  border: '1px solid var(--dc-grey-stroke)',
  borderRadius: 'var(--dc-radius-inner)',
  background: '#fff',
};
const glyphBox: CSSProperties = { height: 30, display: 'flex', alignItems: 'center' };
const nameStyle: CSSProperties = { fontSize: 10, color: 'var(--dc-grey)', textAlign: 'center', wordBreak: 'break-all', lineHeight: 1.2 };
const mono: CSSProperties = { fontFamily: 'ui-monospace, Consolas, monospace', fontSize: '0.72rem', color: 'var(--dc-grey)' };

function DownloadBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      className="dc-ico-dl"
      title="Download SVG"
      aria-label="Download SVG"
      onClick={onClick}
    >
      ↓
    </button>
  );
}

function Tile({ name, children, onDownload }: { name: string; children: React.ReactNode; onDownload: () => void }) {
  return (
    <div style={tile} title={name} className="dc-ico-tile">
      <DownloadBtn onClick={onDownload} />
      <span style={glyphBox}>{children}</span>
      <span style={nameStyle}>{name}</span>
    </div>
  );
}

/* -------------------------------------------------------------- the gallery -- */
const TINTS: [string, string][] = [
  ['Ink', 'var(--dc-black)'],
  ['Link blue', 'var(--dc-blue-link)'],
  ['Purple', 'var(--dc-blue)'],
  ['Green', 'var(--dc-green)'],
  ['Red', 'var(--dc-red-error)'],
];

export const Gallery: Story = {
  render: () => {
    const [tint, setTint] = useState('var(--dc-black)');
    return (
      <div style={wrap}>
        <style>{`
          .dc-ico-svg svg { height: 26px; width: auto; display: block; }
          .dc-ico-dl {
            position: absolute; top: 4px; right: 4px; width: 20px; height: 20px;
            display: flex; align-items: center; justify-content: center;
            border: none; border-radius: 4px; cursor: pointer; font-size: 13px;
            color: var(--dc-blue-link); background: var(--dc-vlgrey);
            opacity: 0; transition: opacity var(--dc-duration-fast) var(--dc-ease);
          }
          .dc-ico-tile:hover .dc-ico-dl, .dc-ico-dl:focus-visible { opacity: 1; }
        `}</style>

        <h1 style={{ marginBottom: '0.25rem' }}>Icon gallery</h1>
        <p style={{ color: 'var(--dc-grey)', maxWidth: 680, marginTop: 0 }}>
          The SS Junior sprite plus standalone project, map, and social icons. Hover a tile to download
          its SVG.
        </p>

        {/* tint control */}
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', margin: '1rem 0 1.5rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--dc-grey)' }}>Recolor:</span>
          {TINTS.map(([label, val]) => (
            <button
              key={label}
              onClick={() => setTint(val)}
              style={{
                ...mono, fontSize: '0.78rem', cursor: 'pointer', padding: '0.35em 0.8em',
                borderRadius: 'var(--dc-radius-button)', border: '1px solid var(--dc-grey-stroke)',
                background: tint === val ? 'var(--dc-vlgrey)' : '#fff', color: 'var(--dc-black)',
              }}
            >
              {label}
            </button>
          ))}
        </div>

        <h2>Recolorable</h2>
        <p style={{ ...mono, marginTop: 0 }}>SS Junior sprite · project/icon · map (mono) — follow the tint</p>
        <div style={{ ...grid, color: tint }}>
          {ICON_NAMES.map((name) => (
            <Tile key={`s-${name}`} name={name} onDownload={() => downloadGlyph(name)}>
              <DCIcon name={name} size={26} />
            </Tile>
          ))}
          {Object.keys(projectRawByName).sort().map((name) => (
            <Tile key={`p-${name}`} name={name} onDownload={() => download(projectUrlByName[name], `${name}.svg`)}>
              <span className="dc-ico-svg" dangerouslySetInnerHTML={{ __html: projectRawByName[name] }} />
            </Tile>
          ))}
          {RECOLOR_MAP.filter((n) => mapRawByName[n]).map((name) => (
            <Tile key={`m-${name}`} name={name} onDownload={() => download(mapUrlByName[name], `${name}.svg`)}>
              <span className="dc-ico-svg" dangerouslySetInnerHTML={{ __html: mapRawByName[name] }} />
            </Tile>
          ))}
        </div>

        <h2 style={{ marginTop: '2rem' }}>Fixed color</h2>
        <p style={{ ...mono, marginTop: 0 }}>social + colored map markers — brand colors, not tintable</p>
        <div style={grid}>
          {Object.keys(socialUrlByName).sort().map((name) => (
            <Tile key={`so-${name}`} name={name.replace(/^social-/, '')} onDownload={() => download(socialUrlByName[name], `${name}.svg`)}>
              <img src={socialUrlByName[name]} alt={name} style={{ height: 26, width: 'auto' }} />
            </Tile>
          ))}
          {FIXED_MAP.map((name) => (
            <Tile key={`fm-${name}`} name={name} onDownload={() => download(mapUrlByName[name], `${name}.svg`)}>
              <img src={mapUrlByName[name]} alt={name} style={{ height: 30, width: 'auto' }} />
            </Tile>
          ))}
        </div>
      </div>
    );
  },
};
