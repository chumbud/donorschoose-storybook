import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties } from 'react';
import '../tokens.css';

/**
 * # Photo treatment
 *
 * How DonorsChoose treats classroom & project photography — as seen on the
 * designated fund page, school page, and homepage. Photos are always shown
 * `cover` (never stretched), get generously rounded corners, and use a dark
 * scrim when text sits on top.
 */
const meta = {
  title: 'Brand/Photo Treatment',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const PHOTO = '/images/classroom/classroom-1.jpg';
const PHOTO2 = '/images/classroom/classroom-3.jpg';

const wrap: CSSProperties = { fontFamily: 'var(--dc-font-body)', color: 'var(--dc-black)', padding: '2.5rem', maxWidth: 1000 };
const mono: CSSProperties = { fontFamily: 'ui-monospace, Consolas, monospace', fontSize: '0.78rem', color: 'var(--dc-grey)' };
const lead: CSSProperties = { fontSize: '1.05rem', color: 'var(--dc-grey)', maxWidth: 680 };
const row: CSSProperties = { display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'flex-end', margin: '1rem 0 2.5rem' };
const cover = (url: string): CSSProperties => ({ background: `#d7d7d9 url("${url}") center/cover`, border: '1px solid var(--dc-grey-stroke)' });

function Spec({ children }: { children: React.ReactNode }) {
  return <div style={{ ...mono, marginTop: '0.5rem' }}>{children}</div>;
}

export const Overview: Story = {
  render: () => (
    <div style={wrap}>
      <h1 style={{ marginBottom: '0.25rem' }}>Photo treatment</h1>
      <p style={lead}>
        Classroom photography is the heart of our pages. Four rules keep it consistent: fill the frame,
        round the corners, scrim behind text, and always have a graceful fallback.
      </p>

      {/* 1 — Corner radius */}
      <h2 style={{ marginTop: '2.5rem' }}>1 · Corner radius</h2>
      <p style={lead}>
        Three radii by context. Hero &amp; feature photos get the signature soft{' '}
        <code style={mono}>--dc-radius-photo</code> (70px); cards use{' '}
        <code style={mono}>--dc-radius-standard</code> (16px); inline thumbnails use{' '}
        <code style={mono}>--dc-radius-inner</code> (6px).
      </p>
      <div style={row}>
        <figure style={{ margin: 0 }}>
          <div style={{ ...cover(PHOTO), width: 260, height: 170, borderRadius: 'var(--dc-radius-photo)' }} />
          <figcaption style={mono}>--dc-radius-photo · 70px · fund/hero</figcaption>
        </figure>
        <figure style={{ margin: 0 }}>
          <div style={{ ...cover(PHOTO), width: 200, height: 150, borderRadius: 'var(--dc-radius-standard)' }} />
          <figcaption style={mono}>--dc-radius-standard · 16px · cards</figcaption>
        </figure>
        <figure style={{ margin: 0 }}>
          <div style={{ ...cover(PHOTO), width: 130, height: 130, borderRadius: 'var(--dc-radius-inner)' }} />
          <figcaption style={mono}>--dc-radius-inner · 6px · thumbs</figcaption>
        </figure>
      </div>

      {/* 2 — Fill */}
      <h2>2 · Always fill, never stretch</h2>
      <p style={lead}>
        Photos are sized with <code style={mono}>background-size: cover</code> /{' '}
        <code style={mono}>object-fit: cover</code> and centered, so they fill any aspect ratio without
        distortion. The frame crops — the image never squishes.
      </p>
      <div style={row}>
        {[
          ['Square', 150, 150],
          ['Portrait', 130, 180],
          ['Landscape', 260, 150],
        ].map(([label, w, h]) => (
          <figure key={label as string} style={{ margin: 0 }}>
            <div style={{ ...cover(PHOTO2), width: w as number, height: h as number, borderRadius: 'var(--dc-radius-standard)' }} />
            <figcaption style={mono}>{label} — same photo, cover</figcaption>
          </figure>
        ))}
      </div>

      {/* 3 — Scrim */}
      <h2>3 · Scrim behind text</h2>
      <p style={lead}>
        When a headline sits on a photo (vertical project card, school hero), a bottom-up dark gradient
        keeps text legible over any image.
      </p>
      <div style={row}>
        <div style={{ position: 'relative', width: 280, height: 210, borderRadius: 'var(--dc-radius-standard)', overflow: 'hidden', ...cover(PHOTO) }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0) 55%)' }} />
          <h3 style={{ position: 'absolute', left: 16, right: 16, bottom: 12, margin: 0, color: '#fff', fontFamily: 'var(--dc-font-headline)', fontWeight: 900, fontSize: '1.25rem', lineHeight: 1.15 }}>
            Turn Up the Volume: Student Voices on Air!
          </h3>
        </div>
        <div>
          <Spec>background: linear-gradient(</Spec>
          <Spec>&nbsp;&nbsp;to top,</Spec>
          <Spec>&nbsp;&nbsp;rgba(0,0,0,0.7),</Spec>
          <Spec>&nbsp;&nbsp;rgba(0,0,0,0) 55%)</Spec>
        </div>
      </div>

      {/* 4 — Fallback */}
      <h2>4 · Placeholder &amp; empty state</h2>
      <p style={lead}>
        Before a photo loads it sits on a neutral grey (<code style={mono}>#d7d7d9</code>). When a project
        has no classroom photo, we show the <code style={mono}>no-classroom-photo</code> illustration
        rather than an empty box.
      </p>
      <div style={row}>
        <figure style={{ margin: 0 }}>
          <div style={{ width: 200, height: 150, borderRadius: 'var(--dc-radius-standard)', background: '#d7d7d9', border: '1px solid var(--dc-grey-stroke)' }} />
          <figcaption style={mono}>loading · #d7d7d9</figcaption>
        </figure>
        <figure style={{ margin: 0 }}>
          <div style={{ width: 200, height: 150, borderRadius: 'var(--dc-radius-standard)', background: 'var(--dc-vlgrey) url("/images/no-classroom-photo.png") center/contain no-repeat', border: '1px solid var(--dc-grey-stroke)' }} />
          <figcaption style={mono}>no classroom photo</figcaption>
        </figure>
      </div>
    </div>
  ),
};
