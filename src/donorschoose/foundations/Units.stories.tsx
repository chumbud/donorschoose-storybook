import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import '../tokens.css';

/**
 * # Units
 *
 * DonorsChoose sizes UI in **rem**, and **1rem = 16px**.
 *
 * The root font-size is pinned to `16px` in `src/index.css`, so every rem value
 * resolves against a 16px base — exactly as `donorschoose-web` assumes. Prefer
 * rem for type, spacing, and radii so everything scales from that single root.
 */
const meta = {
  title: 'Tokens/Units',
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

const typeScale = [
  ['--dc-font-size-tiny', '0.75rem', 12, 'tiny'],
  ['--dc-font-size-discreet', '0.875rem', 14, 'discreet — h4, fine print'],
  ['--dc-font-size-body', '1rem', 16, 'body (base)'],
  ['--dc-font-size-button', '1.125rem', 18, 'button label'],
  ['--dc-font-size-large', '1.25rem', 20, 'large — h3 (mobile)'],
  ['--dc-font-size-xlarge', '1.5rem', 24, 'xlarge — h3'],
  ['--dc-font-size-xxlarge', '2rem', 32, 'xxlarge — h2'],
  ['--dc-font-size-xxxlarge', '2.5rem', 40, 'xxxlarge — h1'],
  ['--dc-font-size-gigantic', '3rem', 48, 'gigantic — hero'],
] as const;

const radii = [
  ['--dc-radius-inner', '0.375rem', 6, 'inner elements'],
  ['--dc-radius-standard', '1rem', 16, 'cards, toasts'],
  ['--dc-radius-button', '2rem', 32, 'buttons (pill)'],
  ['--dc-radius-large', '3.75rem', 60, 'large surfaces'],
  ['--dc-radius-photo', '4.375rem', 70, 'photo frames'],
] as const;

const th: CSSProperties = {
  textAlign: 'left',
  fontSize: '0.75rem',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  color: 'var(--dc-grey)',
  fontWeight: 700,
  padding: '0.5rem 1rem',
  borderBottom: '1px solid var(--dc-grey-stroke)',
};
const td: CSSProperties = {
  padding: '0.6rem 1rem',
  borderBottom: '1px solid var(--dc-grey-stroke)',
  fontSize: '0.9rem',
  verticalAlign: 'middle',
};
const code: CSSProperties = {
  fontFamily: 'ui-monospace, Consolas, monospace',
  fontSize: '0.85rem',
  background: 'var(--dc-vlgrey)',
  padding: '0.15em 0.4em',
  borderRadius: 4,
};

export const Overview: Story = {
  render: () => (
    <div style={wrap}>
      <h1>Units</h1>
      <p style={{ fontSize: '1.125rem', lineHeight: 1.5, maxWidth: 640 }}>
        DonorsChoose sizes UI in <strong>rem</strong>, and{' '}
        <strong>1&nbsp;rem&nbsp;=&nbsp;16px</strong>.
      </p>

      {/* The rule, called out */}
      <div
        style={{
          margin: '1.5rem 0 2.5rem',
          padding: '1.25rem 1.5rem',
          background: 'rgba(0, 98, 253, 0.06)',
          border: '1px solid rgba(0, 98, 253, 0.25)',
          borderRadius: 'var(--dc-radius-standard)',
          maxWidth: 640,
        }}
      >
        <strong>The 16px rule.</strong> The document root is set to{' '}
        <span style={code}>font-size: 16px</span> (in{' '}
        <span style={code}>src/index.css</span>). That makes every rem resolve
        against 16px:{' '}
        <span style={code}>1rem = 16px</span>,{' '}
        <span style={code}>1.5rem = 24px</span>,{' '}
        <span style={code}>0.5rem = 8px</span>. Use rem so type, spacing, and
        radii all scale from that one root.
      </div>

      <h2>How we use rem</h2>
      <p style={{ maxWidth: 640, marginBottom: '1.5rem' }}>
        In <span style={code}>donorschoose-web</span>, the type scale, corner
        radii, and most block spacing are declared in rem (see{' '}
        <span style={code}>web/war/scss/modules</span>). Fixed control heights
        (e.g. a 50px button) stay in px; anything that should scale with the
        base font uses rem.
      </p>

      {/* Type scale */}
      <h3>Type scale</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', margin: '0.5rem 0 2.5rem' }}>
        <thead>
          <tr>
            <th style={th}>Token</th>
            <th style={th}>rem</th>
            <th style={th}>px</th>
            <th style={th}>Sample</th>
          </tr>
        </thead>
        <tbody>
          {typeScale.map(([token, rem, px, note]) => (
            <tr key={token}>
              <td style={td}>
                <span style={code}>{note}</span>
              </td>
              <td style={td}>{rem}</td>
              <td style={td}>{px}px</td>
              <td style={{ ...td, fontSize: `var(${token})`, fontFamily: 'var(--dc-font-headline)', fontWeight: 700, lineHeight: 1.1 }}>
                Aa
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Radii */}
      <h3>Corner radii</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', margin: '0.5rem 0 2.5rem' }}>
        <thead>
          <tr>
            <th style={th}>Token</th>
            <th style={th}>rem</th>
            <th style={th}>px</th>
            <th style={th}>Sample</th>
          </tr>
        </thead>
        <tbody>
          {radii.map(([token, rem, px, note]) => (
            <tr key={token}>
              <td style={td}>
                <span style={code}>{note}</span>
              </td>
              <td style={td}>{rem}</td>
              <td style={td}>{px}px</td>
              <td style={td}>
                <span
                  style={{
                    display: 'inline-block',
                    width: 80,
                    height: 40,
                    background: 'var(--dc-blue-link)',
                    borderTopLeftRadius: `var(${token})`,
                    borderBottomRightRadius: `var(${token})`,
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Quick converter */}
      <h3>rem → px (at 16px root)</h3>
      <p style={{ maxWidth: 640 }}>
        <span style={code}>px = rem × 16</span> &nbsp;·&nbsp;{' '}
        <span style={code}>rem = px ÷ 16</span>
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.75rem' }}>
        {[0.25, 0.5, 0.75, 1, 1.25, 1.5, 2, 2.5, 3].map((r) => (
          <span
            key={r}
            style={{
              ...code,
              padding: '0.4em 0.7em',
              borderRadius: 6,
              border: '1px solid var(--dc-grey-stroke)',
              background: '#fff',
            }}
          >
            {r}rem = {r * 16}px
          </span>
        ))}
      </div>
    </div>
  ),
};
