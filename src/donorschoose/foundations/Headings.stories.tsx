import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import '../tokens.css';

/**
 * # Headings
 *
 * h1–h4 mirror `web/war/scss/base/layout/_typography.scss`. h1–h3 use the
 * Sharp Sans headline face at 700; h4 is uppercase discreet grey. These styles
 * are applied globally in Storybook (see `.storybook/donorschoose-ui.css`), so
 * the tags below render exactly as they do on donorschoose-web.
 */
const meta = {
  title: 'Foundations/Tokens/Headings',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const wrap: CSSProperties = {
  fontFamily: 'var(--dc-font-body)',
  color: 'var(--dc-black)',
  padding: '2.5rem',
  maxWidth: 860,
};
const meta1: CSSProperties = {
  fontFamily: 'ui-monospace, Consolas, monospace',
  fontSize: '0.75rem',
  color: 'var(--dc-grey)',
  margin: '0 0 0.25rem',
};
const row: CSSProperties = {
  padding: '1.25rem 0',
  borderBottom: '1px solid var(--dc-grey-stroke)',
};
const subheader: CSSProperties = {
  color: 'var(--dc-grey)',
  lineHeight: 1.5,
  fontFamily: 'var(--dc-font-headline)',
  fontWeight: 500,
};

export const Scale: Story = {
  render: () => (
    <div style={wrap}>
      <h1>Headings</h1>
      <p style={{ fontSize: '1.125rem', maxWidth: 640, marginBottom: '2rem' }}>
        Synced with <span style={meta1 as CSSProperties}>_typography.scss</span>. Sizes are shown
        desktop-first; each collapses one step down at the mobile breakpoint
        (≤46em).
      </p>

      <div style={row}>
        <p style={meta1}>h1 · 2.5rem / 40px · Sharp Sans 700 · line-height 1.2</p>
        <h1 style={{ margin: 0 }}>Support a classroom today</h1>
      </div>

      <div style={row}>
        <p style={meta1}>h2 · 2rem / 32px · color $blue #3804c1</p>
        <h2 style={{ margin: 0 }}>Every gift makes a difference</h2>
        <p style={{ ...subheader, marginTop: '0.5rem' }}>
          .subheader — Sharp Sans 500, grey
        </p>
      </div>

      <div style={row}>
        <p style={meta1}>h3 · 1.5rem / 24px</p>
        <h3 style={{ margin: 0 }}>Browse projects near you</h3>
      </div>

      <div style={row}>
        <p style={meta1}>h4 · 0.875rem / 14px · uppercase · grey · weight 400</p>
        <h4 style={{ margin: 0 }}>Section label</h4>
      </div>

      <div style={row}>
        <p style={meta1}>body · 1rem / 16px · line-height 1.4 · Roboto/system</p>
        <p style={{ margin: 0, maxWidth: 640 }}>
          Body copy uses the DonorsChoose body stack. Teachers across the
          country submit classroom project requests, and donors can give any
          amount to fund the materials and experiences students need.
        </p>
      </div>

      <h2 style={{ marginTop: '2.5rem' }}>Thick variant</h2>
      <p style={{ maxWidth: 640, marginBottom: '1.25rem' }}>
        <span style={meta1 as CSSProperties}>.thick</span> — Sharp Sans 900 with tight tracking
        (letter-spacing -0.04em), for display moments.
      </p>
      <div
        style={{
          fontFamily: 'var(--dc-font-headline)',
          fontWeight: 900,
          letterSpacing: '-0.04em',
          lineHeight: 1.1,
          color: 'var(--dc-black)',
        }}
      >
        <div style={{ fontSize: 'var(--dc-font-size-gigantic)' }}>h1.thick — 3rem</div>
        <div style={{ fontSize: 'var(--dc-font-size-xxlarge)' }}>h2.thick — 2rem</div>
        <div style={{ fontSize: 'var(--dc-font-size-large)' }}>h3.thick — 1.25rem</div>
      </div>
    </div>
  ),
};
