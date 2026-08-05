import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import '../tokens.css';

/**
 * # Breakpoints
 *
 * Responsive breakpoint variables from `globalConstants.scss`. The primary one
 * used across components is `$breakpoint-mobile-width` (max-width 46em ≈ 736px).
 * Values resolved from `donorschoose-web`.
 */
const meta = {
  title: 'Tokens/Breakpoints',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const wrap: CSSProperties = {
  fontFamily: 'var(--dc-font-body)',
  color: 'var(--dc-black)',
  padding: '2.5rem',
  maxWidth: 960,
};
const mono: CSSProperties = {
  fontFamily: 'ui-monospace, Consolas, monospace',
  fontSize: '0.75rem',
};

const BREAKPOINTS: [string, string, string][] = [
  ['$mobile-width-in-em', '46em', 'Mobile width as em (46em ≈ 736px)'],
  ['$breakpoint-mobile-width', 'screen and (max-width: 46em)', 'The primary mobile breakpoint'],
  ['$breakpoint-tablet-width', 'screen and (min-width: 46em) and (max-width: 52em)', 'Tablet range'],
  ['$breakpoint-desktop-width', '(min-width: 46.0625em)', 'Desktop and up'],
  ['$breakpoint-mobile-width-33', 'screen and (max-width: 33em)', 'Small phones'],
  ['$breakpoint-mobile-overlay-large-width', 'screen and (max-width: 30em)', 'Large overlay → mobile'],
  ['$breakpoint-mobile-device-width', 'screen and (max-device-width: 46em)', 'Mobile by device width'],
  ['$mobile-width', 'auto', 'Mobile element width'],
  ['$mobile-page-padding', '1em', 'Mobile page padding'],
  ['$mobile-page-padding-rev', '-1em', 'Negative mobile page padding'],
];

const th: CSSProperties = {
  textAlign: 'left',
  fontSize: '0.75rem',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  color: 'var(--dc-grey)',
  fontWeight: 700,
  padding: '0.5rem 0.75rem',
  borderBottom: '1px solid var(--dc-grey-stroke)',
};
const td: CSSProperties = {
  padding: '0.6rem 0.75rem',
  borderBottom: '1px solid var(--dc-grey-stroke)',
  fontSize: '0.85rem',
  verticalAlign: 'middle',
};

export const Breakpoints: Story = {
  render: () => (
    <div style={wrap}>
      <h1>Breakpoints</h1>
      <p style={{ maxWidth: 620, marginBottom: '1rem', color: 'var(--dc-grey)' }}>
        Responsive breakpoint variables from <span style={mono}>globalConstants.scss</span>. The
        primary one used across components is <span style={mono}>$breakpoint-mobile-width</span>{' '}
        (max-width 46em ≈ 736px).
      </p>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={th}>SCSS variable</th>
            <th style={th}>Value</th>
            <th style={th}>Notes</th>
          </tr>
        </thead>
        <tbody>
          {BREAKPOINTS.map(([scss, value, note]) => (
            <tr key={scss}>
              <td style={{ ...td, ...mono, color: 'var(--dc-blue-link)' }}>{scss}</td>
              <td style={{ ...td, ...mono, color: 'var(--dc-grey)' }}>{value}</td>
              <td style={{ ...td, color: 'var(--dc-grey)' }}>{note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
};
